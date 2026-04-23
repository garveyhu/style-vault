import { apiFetch, invalidateCache } from './http';

export type User = {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
};

export const authApi = {
  me(): Promise<{ user: User }> {
    return apiFetch<{ user: User }>('/api/auth/me');
  },
  google(access_token: string): Promise<{ token: string; user: User }> {
    return apiFetch<{ token: string; user: User }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    });
  },
  async logout(): Promise<void> {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    invalidateCache('/api/auth/me');
  },
};
