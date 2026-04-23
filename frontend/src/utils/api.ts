const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const TOKEN_KEY = 'style-vault-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * 并发 & 短期去重缓存：同一 URL+method 的 in-flight 请求合并，
 * 完成后 200ms 内的相同请求直接复用结果（抗 React StrictMode /
 * Vite HMR / 多个消费者同时 mount 导致的重复 fetch）。
 */
type CacheEntry = { promise: Promise<unknown>; expireAt: number };
const fetchCache = new Map<string, CacheEntry>();
const DEDUP_TTL_MS = 200;

async function doFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const json = await res
    .json()
    .catch(() => ({ code: res.status, message: 'bad json', data: null }));
  if (!res.ok || json.code !== 0) {
    const err: Error & { code?: number; status?: number } = new Error(
      json.message || `HTTP ${res.status}`,
    );
    err.code = json.code;
    err.status = res.status;
    throw err;
  }
  return json.data as T;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
  // 只对幂等方法做 dedup
  const cacheable = method === 'GET';
  const key = `${method} ${path}`;

  if (cacheable) {
    const existing = fetchCache.get(key);
    if (existing && existing.expireAt > Date.now()) {
      return existing.promise as Promise<T>;
    }
  }

  const promise = doFetch<T>(path, init);

  if (cacheable) {
    fetchCache.set(key, { promise, expireAt: Date.now() + DEDUP_TTL_MS });
    promise
      .then(() => {
        // 保留短暂 TTL 内的结果，过期后自动失效
        setTimeout(() => {
          const curr = fetchCache.get(key);
          if (curr?.promise === promise) fetchCache.delete(key);
        }, DEDUP_TTL_MS);
      })
      .catch(() => {
        // 失败立即失效，允许重试
        fetchCache.delete(key);
      });
  }

  return promise;
}

/**
 * multipart/form-data 上传。与 apiFetch 共用 Result 解包，只是不设 JSON header。
 */
async function apiFetchForm<T>(path: string, form: FormData): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    body: form,
    headers,
  });
  const json = await res
    .json()
    .catch(() => ({ code: res.status, message: 'bad json', data: null }));
  if (!res.ok || json.code !== 0) {
    const err: Error & { code?: number; status?: number } = new Error(
      json.message || `HTTP ${res.status}`,
    );
    err.code = json.code;
    err.status = res.status;
    throw err;
  }
  return json.data as T;
}

/* ============================================================
 * 业务 API 封装
 * entry_id 带斜杠，直接拼接；后端用 :path converter 接住。
 * ============================================================ */

export const favoritesApi = {
  async list(): Promise<string[]> {
    const d = await apiFetch<{ items: string[] }>('/api/favorites');
    return d.items ?? [];
  },
  toggle(entryId: string): Promise<{ favorited: boolean }> {
    return apiFetch<{ favorited: boolean }>(`/api/favorites/${entryId}`, {
      method: 'POST',
    });
  },
};

export const notesApi = {
  get(entryId: string): Promise<{ content: string }> {
    return apiFetch<{ content: string }>(`/api/notes/${entryId}`);
  },
  async upsert(entryId: string, content: string): Promise<void> {
    await apiFetch<{ content: string }>(`/api/notes/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  },
};

export type Screenshot = {
  id: number;
  entry_id: string;
  object_name: string;
  url: string;
  caption: string | null;
  created_at: string | null;
};

export type ScreenshotCreatePayload = {
  object_name: string;
  url: string;
  caption?: string | null;
};

export const screenshotsApi = {
  async list(entryId: string): Promise<Screenshot[]> {
    const d = await apiFetch<{ items: Screenshot[] }>(
      `/api/screenshots/${entryId}`,
    );
    return d.items ?? [];
  },
  create(entryId: string, payload: ScreenshotCreatePayload): Promise<Screenshot> {
    return apiFetch<Screenshot>(`/api/screenshots/${entryId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async remove(id: number): Promise<void> {
    await apiFetch<null>(`/api/screenshots/${id}`, { method: 'DELETE' });
  },
};

export type UploadedFile = {
  object_name: string;
  url: string;
  size: number;
  content_type: string;
};

export const filesApi = {
  upload(file: File): Promise<UploadedFile> {
    const form = new FormData();
    form.append('file', file);
    return apiFetchForm<UploadedFile>('/api/files/upload', form);
  },
};
