import { apiFetch, invalidateCache } from './http';

export type User = {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
};

/**
 * /api/auth/me 是全局幂等资源——无论多少组件、多少 Provider、多少次 HMR
 * 重建触发 authApi.me()，都复用同一 promise（挂 globalThis 跨模块重载
 * 保持）。只有 logout / login / invalidateMe 时才会重置。
 */

type MePromise = Promise<{ user: User }> | null;

declare global {
  // eslint-disable-next-line no-var
  var __sv_mePromise: MePromise;
}

function getStore() {
  return globalThis as unknown as { __sv_mePromise?: MePromise };
}

export const authApi = {
  me(): Promise<{ user: User }> {
    const g = getStore();
    if (!g.__sv_mePromise) {
      g.__sv_mePromise = apiFetch<{ user: User }>('/api/auth/me').catch((e) => {
        // 失败不 cache，让下次可重试
        g.__sv_mePromise = null;
        throw e;
      });
    }
    return g.__sv_mePromise;
  },

  async google(access_token: string): Promise<{ token: string; user: User }> {
    const r = await apiFetch<{ token: string; user: User }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    });
    // 登录成功后，新 user 信息作为 me 的结果挂回 singleton
    getStore().__sv_mePromise = Promise.resolve({ user: r.user });
    invalidateCache('/api/auth/me');
    return r;
  },

  async logout(): Promise<void> {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    getStore().__sv_mePromise = null;
    invalidateCache('/api/auth/me');
  },

  /** 外部主动失效（如 401 后） */
  invalidateMe() {
    getStore().__sv_mePromise = null;
  },
};
