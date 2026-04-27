import { apiFetch, invalidateCache } from './http';

export type User = {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
};

/**
 * /api/auth/me 是全局幂等资源：用 globalThis 做单例 promise 缓存。
 *
 * 不用 module-level let 变量——auth.ts 可能被 Vite 以不同 ?t= 参数
 * 多次 eval，每次 eval 都会重置 let 变量。globalThis 属性在单次 page
 * load 内稳定，对我们足够。
 */
type GlobalCache = {
  __sv_mePromise?: Promise<{ user: User }> | null;
};

const G: GlobalCache = globalThis as GlobalCache;

export const authApi = {
  me(): Promise<{ user: User }> {
    if (!G.__sv_mePromise) {
      G.__sv_mePromise = apiFetch<{ user: User }>('/api/auth/me').catch((e) => {
        G.__sv_mePromise = null;
        throw e;
      });
    }
    return G.__sv_mePromise;
  },

  async google(access_token: string): Promise<{ token: string; user: User }> {
    const r = await apiFetch<{ token: string; user: User }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    });
    G.__sv_mePromise = Promise.resolve({ user: r.user });
    invalidateCache('/api/auth/me');
    return r;
  },

  async logout(): Promise<void> {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    G.__sv_mePromise = null;
    invalidateCache('/api/auth/me');
  },

  async updateMe(name: string): Promise<{ user: User }> {
    const r = await apiFetch<{ user: User }>('/api/auth/me', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    G.__sv_mePromise = Promise.resolve(r);
    invalidateCache('/api/auth/me');
    return r;
  },

  invalidateMe() {
    G.__sv_mePromise = null;
  },
};
