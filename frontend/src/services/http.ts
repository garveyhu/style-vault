import { API_BASE } from '@/config/env';
import { ApiError } from '@/types/api';

/* ============================================================
 *  Token 存取（localStorage）
 * ============================================================ */

const TOKEN_KEY = 'style-vault-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

/* ============================================================
 *  in-flight dedup（5s TTL）
 *
 *  fetchCache 挂在 window 上，跨 Vite HMR module 重载也能保留 promise，
 *  避免 Provider / StrictMode / HMR 导致的重复请求。
 *  写操作后调 invalidateCache 让下次 GET 拿到新状态。
 * ============================================================ */

type CacheEntry = { promise: Promise<unknown>; expireAt: number };

type CacheStore = Map<string, CacheEntry>;

declare global {
  // eslint-disable-next-line no-var
  var __sv_fetchCache: CacheStore | undefined;
}

const fetchCache: CacheStore =
  (globalThis as unknown as { __sv_fetchCache?: CacheStore }).__sv_fetchCache ??
  ((globalThis as unknown as { __sv_fetchCache: CacheStore }).__sv_fetchCache =
    new Map());

const DEDUP_TTL_MS = 5_000;

export function invalidateCache(path: string, method: string = 'GET') {
  fetchCache.delete(`${method.toUpperCase()} ${path}`);
}

export function invalidateCacheByPrefix(prefix: string, method: string = 'GET') {
  const p = `${method.toUpperCase()} ${prefix}`;
  for (const key of Array.from(fetchCache.keys())) {
    if (key.startsWith(p)) fetchCache.delete(key);
  }
}

/* ============================================================
 *  底层 fetch（单次请求，不带缓存）
 * ============================================================ */

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
    throw new ApiError(json.message || `HTTP ${res.status}`, json.code, res.status);
  }
  return json.data as T;
}

/* ============================================================
 *  apiFetch：GET 走 dedup cache；其他方法直接透传
 * ============================================================ */

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
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
        // 保留 TTL 内的成功结果，到期后清理
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

/* ============================================================
 *  multipart/form-data 上传（不走缓存）
 * ============================================================ */

export async function apiFetchForm<T>(path: string, form: FormData): Promise<T> {
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
    throw new ApiError(json.message || `HTTP ${res.status}`, json.code, res.status);
  }
  return json.data as T;
}
