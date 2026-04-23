import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 不开 StrictMode：dev 双发会让 effect 重复触发 /api/auth/me、/api/favorites
// 等网络请求，前端反复 remount 也容易让 iframe/组件重载体验变差。
// StrictMode 主要帮 catch effect 清理 bug，当前代码已稳定。
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
