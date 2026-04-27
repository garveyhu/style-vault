import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// 双 store：
// - byKey：按 history 唯一 key · 浏览器后退 / 前进时还原（同一 pathname 多次访问可分开记）
// - byPath：按 pathname · 内部 nav 切换 tab 回来时还原（如 /browse/block → /browse/component → /browse/block）
const byKey = new Map<string, number>();
const byPath = new Map<string, number>();

const getY = () =>
  window.scrollY ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

const setY = (y: number) => {
  window.scrollTo(0, y);
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
};

export function ScrollToTop() {
  const { key, pathname } = useLocation();
  const navType = useNavigationType();
  const currentKeyRef = useRef(key);
  const currentPathRef = useRef(pathname);

  // capture 阶段监听所有 scroll · 内层 overflow 容器也覆盖
  useEffect(() => {
    const onScroll = () => {
      const y = getY();
      byKey.set(currentKeyRef.current, y);
      byPath.set(currentPathRef.current, y);
    };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, []);

  useLayoutEffect(() => {
    currentKeyRef.current = key;
    currentPathRef.current = pathname;

    let cancelled = false;
    let attempts = 0;

    // 恢复目标 scrollY 的优先级：
    //   POP（浏览器后退/前进）→ 用 byKey（精准还原历史条目）
    //   PUSH/REPLACE         → 用 byPath（同一 pathname 之前访问过就还原；否则顶部）
    let target = 0;
    if (navType === 'POP') {
      target = byKey.get(key) ?? byPath.get(pathname) ?? 0;
    } else {
      target = byPath.get(pathname) ?? 0;
    }

    const tryRestore = () => {
      if (cancelled) return;
      setY(target);
      attempts++;
      // 异步内容长高 / 浏览器 anchor 干扰 → 多帧持续设置
      if (target > 0) {
        // 还原目标位置：连续重试直到到达或超时
        if (attempts < 60 && Math.abs(getY() - target) > 1) {
          requestAnimationFrame(tryRestore);
        }
      } else {
        // 钉顶：连续 30 帧防止内容异步长高时被自动 anchor 拉回
        if (attempts < 30) {
          requestAnimationFrame(tryRestore);
        }
      }
    };
    tryRestore();
    return () => { cancelled = true; };
  }, [key, pathname, navType]);

  return null;
}

export default ScrollToTop;
