import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 自动懒加载 Hook · sentinel + IntersectionObserver
 *
 * - 适配屏宽：列数越多每"页"加载越多（按 cols * rowsPerPage）
 * - 用 callback ref 自动 re-observe，sentinel mount/unmount/replace 都能挂回 IO
 * - cacheKey 跨切换持久化翻页位置（模块切回来不用从头翻）
 *
 * 用法：
 *   const { visible, sentinelRef, hasMore } = useInfiniteList(items, cols, { cacheKey: 'block' });
 *   {visible.map(...)}
 *   {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
 */

const visibleCountCache = new Map<string, number>();

export function useInfiniteList<T>(
  items: T[],
  cols: number,
  options: {
    rowsPerPage?: number;
    cacheKey?: string;
  } = {},
) {
  const { rowsPerPage = 4, cacheKey } = options;
  const pageSize = Math.max(8, cols * rowsPerPage);

  const [visibleCount, setVisibleCount] = useState(() => {
    if (cacheKey && visibleCountCache.has(cacheKey)) {
      return Math.min(items.length, visibleCountCache.get(cacheKey)!);
    }
    return pageSize;
  });

  const isLoadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // cacheKey 切换：从 cache 恢复
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

  // items 内容变化（同模块筛选）：clamp
  useEffect(() => {
    setVisibleCount(c => Math.min(c, items.length || pageSize));
  }, [items.length, pageSize]);

  // 写 cache
  useEffect(() => {
    if (cacheKey) visibleCountCache.set(cacheKey, visibleCount);
  }, [cacheKey, visibleCount]);

  const total = items.length;
  const hasMore = visibleCount < total;
  const visible = items.slice(0, visibleCount);

  const stateRef = useRef({ hasMore, total, pageSize });
  stateRef.current = { hasMore, total, pageSize };

  const loadMore = useCallback(() => {
    const s = stateRef.current;
    if (!s.hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setVisibleCount(c => Math.min(s.total, c + s.pageSize));
    // 等渲染完一帧再开锁，避免 IO 立刻再触发
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isLoadingRef.current = false;
      });
    });
  }, []);

  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;

  const sentinelRef = useCallback((el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            loadMoreRef.current();
            break;
          }
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    observerRef.current = io;
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return { visible, sentinelRef, loadMore, hasMore, total, visibleCount };
}
