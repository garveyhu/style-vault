import { useSyncExternalStore } from 'react';

/**
 * 响应式列数 hook · 按 Tailwind 断点映射 1 → 6
 *
 *   base  < 640px   : 1
 *   sm    >= 640    : 2
 *   md    >= 768    : 3
 *   lg    >= 1024   : 4
 *   xl    >= 1280   : 5
 *   2xl   >= 1536   : 6
 *
 * 用法（配合 slice 做"只展 1 行"）：
 *   const cols = useCols();
 *   <div style={{ display: 'grid', gap: '1rem',
 *     gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
 *     {items.slice(0, cols).map(...)}
 *   </div>
 */
const BREAKPOINTS = [
  { query: '(min-width: 1536px)', cols: 6 },
  { query: '(min-width: 1280px)', cols: 5 },
  { query: '(min-width: 1024px)', cols: 4 },
  { query: '(min-width: 768px)',  cols: 3 },
  { query: '(min-width: 640px)',  cols: 2 },
] as const;

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mqls = BREAKPOINTS.map((bp) => window.matchMedia(bp.query));
  mqls.forEach((m) => m.addEventListener('change', callback));
  return () => mqls.forEach((m) => m.removeEventListener('change', callback));
}

function getSnapshot(): number {
  if (typeof window === 'undefined') return 4;
  for (const { query, cols } of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return cols;
  }
  return 1;
}

function getServerSnapshot(): number {
  return 4; // SSR 默认 lg 尺寸，和客户端首帧不一致时 React 会自己校正
}

export function useCols(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
