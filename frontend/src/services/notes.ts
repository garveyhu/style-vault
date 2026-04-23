import { apiFetch, invalidateCache } from './http';

export const notesApi = {
  get(entryId: string): Promise<{ content: string }> {
    return apiFetch<{ content: string }>(`/api/notes/${entryId}`);
  },
  async upsert(entryId: string, content: string): Promise<void> {
    await apiFetch<{ content: string }>(`/api/notes/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
    invalidateCache(`/api/notes/${entryId}`);
  },
};
