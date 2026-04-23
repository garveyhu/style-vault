/** 环境变量统一访问入口 */

export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) || 'http://localhost:8000';

export const GOOGLE_CLIENT_ID =
  '160104575584-magsnq73oenb32fs90r65avlce16ec5p.apps.googleusercontent.com';
