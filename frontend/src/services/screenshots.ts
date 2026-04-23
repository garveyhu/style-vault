import { apiFetch, invalidateCache, invalidateCacheByPrefix } from './http';

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
  async create(
    entryId: string,
    payload: ScreenshotCreatePayload,
  ): Promise<Screenshot> {
    const r = await apiFetch<Screenshot>(`/api/screenshots/${entryId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    invalidateCache(`/api/screenshots/${entryId}`);
    return r;
  },
  async remove(id: number): Promise<void> {
    await apiFetch<null>(`/api/screenshots/${id}`, { method: 'DELETE' });
    // 不知道具体 entry_id，批量失效所有 screenshots 缓存
    invalidateCacheByPrefix('/api/screenshots/');
  },
};
