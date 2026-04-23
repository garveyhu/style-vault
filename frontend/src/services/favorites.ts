import { apiFetch, invalidateCache } from './http';

export const favoritesApi = {
  async list(): Promise<string[]> {
    const d = await apiFetch<{ items: string[] }>('/api/favorites');
    return d.items ?? [];
  },
  async toggle(entryId: string): Promise<{ favorited: boolean }> {
    const r = await apiFetch<{ favorited: boolean }>(
      `/api/favorites/${entryId}`,
      { method: 'POST' },
    );
    // toggle 后使 list 缓存失效，下次 list 拿到新状态
    invalidateCache('/api/favorites');
    return r;
  },
};
