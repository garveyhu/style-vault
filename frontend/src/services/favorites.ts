import { apiFetch, invalidateCache } from './http';

/**
 * /api/favorites 用 globalThis 单例 promise + 当前登录用户 id 绑定。
 * 多次 list() 调用共享同一 promise；toggle 后失效让下次重拉。
 */

type FavState = {
  uid: number | null;
  promise: Promise<string[]> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __sv_favState: FavState | undefined;
}

function getStore(): FavState {
  const g = globalThis as unknown as { __sv_favState?: FavState };
  if (!g.__sv_favState) g.__sv_favState = { uid: null, promise: null };
  return g.__sv_favState;
}

export const favoritesApi = {
  async list(uid: number | null): Promise<string[]> {
    const store = getStore();
    // 用户切换或首次加载：重置 singleton
    if (store.uid !== uid || !store.promise) {
      store.uid = uid;
      if (uid === null) {
        store.promise = Promise.resolve([]);
      } else {
        store.promise = apiFetch<{ items: string[] }>('/api/favorites')
          .then((d) => d.items ?? [])
          .catch((e) => {
            store.promise = null;
            throw e;
          });
      }
    }
    return store.promise;
  },

  async toggle(entryId: string): Promise<{ favorited: boolean }> {
    const r = await apiFetch<{ favorited: boolean }>(
      `/api/favorites/${entryId}`,
      { method: 'POST' },
    );
    // 失效 singleton 和底层 cache，下次 list 拿新状态
    getStore().promise = null;
    invalidateCache('/api/favorites');
    return r;
  },

  invalidate() {
    const s = getStore();
    s.promise = null;
  },
};
