/** 统一 services 入口——业务代码只从 @/services 导入，不直接碰 http 层。 */

export { apiFetch, apiFetchForm, getToken, setToken, invalidateCache } from './http';
export { authApi, type User } from './auth';
export { favoritesApi } from './favorites';
export { notesApi } from './notes';
export {
  screenshotsApi,
  type Screenshot,
  type ScreenshotCreatePayload,
} from './screenshots';
export { filesApi, type UploadedFile } from './files';
