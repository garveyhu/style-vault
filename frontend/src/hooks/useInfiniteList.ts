import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 手动翻页 Hook · 用户点击底部按钮加载下一批
 *
 * - 适配屏宽：列数越多每"页"加载越多（按 cols * rowsPerPage）
 * - 不再用 IntersectionObserver 自动触发 —— 改成 loadMore 函数交给 UI 调用（用户点按钮）
 * - 翻页位置按 `cacheKey` 跨切换缓存：模块切换回来时还原翻页进度，不用从头翻
 *
 * 用法：
 *   const { visible, loadMore, hasMore } = useInfiniteList(items, cols, { cacheKey: 'block' });
 *   {visible.map(...)}
 *   {hasMore && <button onClick={loadMore}>下一页</button>}
 */

// 模块顶层缓存：cacheKey → visibleCount · 跨组件重 mount 持久
const visibleCountCache = new Map<string, number>();

export function useInfiniteList<T>(
  items: T[],
  cols: number,
  options: {
    rowsPerPage?: number;
    cacheKey?: string;       // 持久化翻页进度的标识（如 'block' / 'page' / 'component'）
  } = {},
) {
  const { rowsPerPage = 4, cacheKey } = options;
  const pageSize = Math.max(8, cols * rowsPerPage);

  // 初始 visibleCount：cache 里有就用 cache，否则 pageSize
  const [visibleCount, setVisibleCount] = useState(() => {
    if (cacheKey && visibleCountCache.has(cacheKey)) {
      return Math.min(items.length, visibleCountCache.get(cacheKey)!);
    }
    return pageSize;
  });

  const isLoadingRef = useRef(false);

  // cacheKey 变化（模块切换）时：从 cache 恢复 visibleCount
  useEffect(() => {
    if (cacheKey && visibleCountCache.has(cacheKey)) {
      const cached = visibleCountCache.get(cacheKey)!;
      setVisibleCount(Math.min(items.length, Math.max(pageSize, cached)));
    } else {
      setVisibleCount(pageSize);
    }
    isLoadingRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  // items 内容变化（同模块筛选变化）：clamp visibleCount 到 items.length
  useEffect(() => {
    setVisibleCount(c => Math.min(c, items.length || pageSize));
  }, [items.length, pageSize]);

  // 同步写入 cache
  useEffect(() => {
    if (cacheKey) {
      visibleCountCache.set(cacheKey, visibleCount);
    }
  }, [cacheKey, visibleCount]);

  const total = items.length;
  const hasMore = visibleCount < total;
  const visible = items.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    // 锁定当前滚动位置 —— 不管浏览器/React 因为新内容渲染做了什么 anchor / focus-into-view，
    // 连续 15 帧把 scrollY 强行拽回点击瞬间的位置，保持用户阅读视角稳定。
    const lockedY = window.scrollY;
    setVisibleCount(c => Math.min(total, c + pageSize));

    let frames = 0;
    const lockScroll = () => {
      if (frames++ < 15) {
        if (Math.abs(window.scrollY - lockedY) > 1) window.scrollTo(0, lockedY);
        requestAnimationFrame(lockScroll);
      } else {
        isLoadingRef.current = false;
      }
    };
    requestAnimationFrame(lockScroll);
  }, [total, pageSize]);

  return { visible, loadMore, hasMore, total, visibleCount };
}
