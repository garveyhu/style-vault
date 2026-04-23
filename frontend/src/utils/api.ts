const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const TOKEN_KEY = 'style-vault-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
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
