import type { CSSProperties, ReactNode } from 'react';

type Mode = 'fill' | 'fixed';

interface ResponsiveGridProps {
  /**
   * fill   · auto-fit + 1fr —— 折叠空 track，少量卡片会拉伸占满整行（连 1 张也撑满）
   * fixed  · auto-fill + 1fr —— 保留空 track，列数由容器宽度自动算好后所有列等宽，
   *          少量卡片不会拉伸 · 显示为「正常列宽 + 右侧留白」
   */
  mode?: Mode;
  /** 卡片最小宽度（px）—— 决定最大列数（容器 / min 向下取整） */
  min?: number;
  /** 卡片间距（px） */
  gap?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * 弹性响应式栅格 · 两种模式
 *
 * @example
 * // fixed：mac 一行能放 4 张时，只有 2 张也按 4 张时的宽度排，右侧自然留白
 * <ResponsiveGrid mode="fixed" min={300}>{items}</ResponsiveGrid>
 *
 * // fill：少量卡片会拉伸占满整行（哪怕只有 1 张）
 * <ResponsiveGrid mode="fill" min={300}>{items}</ResponsiveGrid>
 */
export function ResponsiveGrid({
  mode = 'fixed',
  min = 280,
  gap = 20,
  className = '',
  style,
  children,
}: ResponsiveGridProps) {
  const tracks = mode === 'fill' ? 'auto-fit' : 'auto-fill';
  const cols = `repeat(${tracks}, minmax(${min}px, 1fr))`;
  return (
    <div
      className={`grid ${className}`}
      style={{ gridTemplateColumns: cols, gap, ...style }}
    >
      {children}
    </div>
  );
}
