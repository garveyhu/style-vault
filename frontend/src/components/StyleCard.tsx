import { useEffect, useRef, useState } from 'react';
import {
  FullscreenOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';
import { typeLabel } from '../utils/i18n';
import { zh } from '../utils/tagI18n';
import { useFavorites } from '../auth/FavoritesContext';
import { useAuth } from '../auth/AuthContext';

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

/**
 * masonry / varied 卡片尺寸控制。
 * - vibe: 最大（近似整页 hero 预览）
 * - archetype: 较大
 * - composite: 中等
 * - atom: 中等偏小
 * - primitive: 最小
 *
 * aspect 用于 iframe 容器比例。columns-* 外层按 break-inside-avoid，
 * 不同卡片高度差异天然形成 masonry 视觉。
 */
/**
 * 固定像素 height 替代 aspect-ratio（在 CSS columns 多列布局里，
 * aspect-ratio 可能解析为 0 高度导致 iframe 不可见）。
 * 尺寸按 type 分 L/M/S 三档，自然形成 masonry。
 */
const SIZE_BY_TYPE: Record<string, { h: string; label: 'L' | 'M' | 'S' }> = {
  vibe: { h: 'h-[260px]', label: 'L' },
  archetype: { h: 'h-[260px]', label: 'L' },
  composite: { h: 'h-[220px]', label: 'M' },
  atom: { h: 'h-[200px]', label: 'M' },
  primitive: { h: 'h-[200px]', label: 'S' },
};

export function StyleCard({
  item,
  onClick,
}: {
  item: RegistryItem;
  onClick: () => void;
}) {
  const previewUrl = item.preview ? `${window.location.origin}${item.preview}` : null;
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);
  const [iframeReady, setIframeReady] = useState(false);
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(item.id);

  const handleToggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      // 未登录时，点击回到 click 路径让外层处理（跳详情页弹 LoginModal）
      onClick();
      return;
    }
    try {
      await toggleFavorite(item.id);
    } catch {
      /* 失败由 FavoritesContext 回滚，这里静默 */
    }
  };

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setScale(w / PREVIEW_VIRTUAL_WIDTH);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sizing = SIZE_BY_TYPE[item.type] ?? SIZE_BY_TYPE.composite;

  return (
    <article
      onClick={onClick}
      className="sv-card group relative mb-6 block w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white [break-inside:avoid]"
    >
      {/* Preview 区 */}
      <div
        ref={previewRef}
        className={`relative overflow-hidden bg-slate-50 ${sizing.h}`}
      >
        {previewUrl && item.hasPreviewFile ? (
          <>
            {/* 加载占位 skeleton（iframe 加载完成前） */}
            {!iframeReady && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100" />
            )}
            <div
              className="sv-card-preview-inner absolute left-0 top-0 origin-top-left will-change-transform"
              style={{
                width: `${PREVIEW_VIRTUAL_WIDTH}px`,
                height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
                transform: `scale(${scale})`,
                opacity: iframeReady ? 1 : 0,
                transition: 'opacity 400ms ease-out',
              }}
            >
              <iframe
                src={previewUrl}
                title={item.name}
                className="pointer-events-none block h-full w-full border-0"
                loading="eager"
                onLoad={() => setIframeReady(true)}
              />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            暂无预览
          </div>
        )}

        {/* 底部渐变 overlay，文字悬浮 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* 元信息 overlay——从底部滑入 */}
        <div className="sv-card-meta-overlay pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.12em] text-white/70">
                {typeLabel[item.type]}
              </div>
              <div className="mt-0.5 truncate font-display text-[20px] font-medium leading-tight text-white drop-shadow-sm">
                {item.name}
              </div>
            </div>
            <div className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-slate-900 shadow-sm transition hover:bg-white">
              查看 <ArrowRightOutlined className="text-[10px]" />
            </div>
          </div>
        </div>

        {/* 右上角按钮区：收藏 + 全屏 */}
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5">
          {/* 收藏：已收藏时常驻紫色显示；未收藏时 hover 浮出 */}
          <button
            type="button"
            onClick={handleToggleFav}
            title={favorited ? '取消收藏' : '收藏'}
            aria-label={favorited ? '取消收藏' : '收藏'}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg shadow-sm backdrop-blur-sm transition duration-300
              ${
                favorited
                  ? 'bg-emerald-500 text-white opacity-100 hover:bg-emerald-600'
                  : 'bg-white/95 text-slate-500 opacity-0 hover:bg-white hover:text-emerald-500 group-hover:opacity-100'
              }
            `}
          >
            {favorited ? <HeartFilled /> : <HeartOutlined />}
          </button>

          {/* 全屏 */}
          {item.hasPreviewFile && item.preview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.preview!, '_blank');
              }}
              title="全屏预览"
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-600 opacity-0 shadow-sm backdrop-blur-sm transition duration-300 hover:bg-white group-hover:opacity-100"
            >
              <FullscreenOutlined />
            </button>
          )}
        </div>

        {/* 类型角标 (始终可见，低调) */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${typeDotColor(item.type)}`}
          />
          {typeLabel[item.type]}
        </div>
      </div>

      {/* 信息区 */}
      <div className="space-y-2 p-5">
        <h3 className="m-0 font-display text-[16px] font-semibold leading-snug tracking-tight text-slate-900">
          {item.name}
        </h3>
        <p className="line-clamp-2 min-h-[36px] text-[13px] leading-relaxed text-slate-500">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.aesthetic.slice(0, 3).map((t) => (
            <span
              key={`a-${t}`}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
            >
              {zh('aesthetic', t)}
            </span>
          ))}
          {item.tags.mood.slice(0, 2).map((t) => (
            <span
              key={`m-${t}`}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
            >
              {zh('mood', t)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function typeDotColor(type: string): string {
  switch (type) {
    case 'vibe':
      return 'bg-rose-500';
    case 'archetype':
      return 'bg-emerald-500';
    case 'composite':
      return 'bg-cyan-500';
    case 'atom':
      return 'bg-emerald-500';
    case 'primitive':
      return 'bg-amber-500';
    default:
      return 'bg-slate-400';
  }
}

export default StyleCard;
