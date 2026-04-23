import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由切换时把窗口滚动条重置到顶部。
 * 挂在 BrowserRouter 内、Routes 外即可。
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default ScrollToTop;
