/** 环境变量统一访问入口 */

export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) || 'http://localhost:7001';

export const GOOGLE_CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) ||
  '160104575584-v151folc3f63k2kfkmh6chuejll5i0o4.apps.googleusercontent.com';
