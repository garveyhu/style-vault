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
import { getPreviewComponent } from '../preview/registry';

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

/** 按 type 分 L/M/S 三档高度（CSS columns 多列里必须固定像素高度） */
const SIZE_BY_TYPE: Record<string, { h: number; w: number }> = {
  vibe: { h: 260, w: 420 },
  archetype: { h: 260, w: 420 },
  composite: { h: 220, w: 360 },
  atom: { h: 200, w: 320 },
  primitive: { h: 200, w: 320 },
};

function typeDotColor(type: string): string {
  switch (type) {
    case 'vibe':
      return 'bg-rose-500';
    case 'archetype':
      return 'bg-indigo-500';
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

export function StyleCard({
  item,
  onClick,
}: {
  item: RegistryItem;
  onClick: () => void;
}) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);
  const [hovered, setHovered] = useState(false);
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(item.id);

  const handleToggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onClick();
      return;
    }
    try {
      await toggleFavorite(item.id);
    } catch {
      /* 回滚由 FavoritesContext 处理 */
    }
  };

  // ResizeObserver 按容器宽度动态算 scale，保证 1440 虚拟画布精确缩略填满
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
  const PreviewComp = getPreviewComponent(item.preview);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover={hovered}
      className="sv-card group relative mb-6 block w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white [break-inside:avoid]"
    >
      {/* Preview 区（height 固定，width 跟卡片自适应） */}
      <div
        ref={previewRef}
        className="relative w-full overflow-hidden bg-slate-50"
        style={{ height: sizing.h }}
      >
        {item.hasPreviewFile && PreviewComp ? (
          <div
            className="pointer-events-none absolute left-0 top-0 origin-top-left"
            style={{
              width: `${PREVIEW_VIRTUAL_WIDTH}px`,
              height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
            aria-hidden
          >
            <PreviewComp />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            暂无预览
          </div>
        )}

        {/* hover overlay（state 驱动，不依赖 CSS :hover） */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.12em] text-white/70">
                {typeLabel[item.type]}
              </div>
              <div className="mt-0.5 truncate font-display text-[18px] font-semibold leading-tight text-white drop-shadow-sm">
                {item.name}
              </div>
            </div>
            <div className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-slate-900 shadow-sm transition hover:bg-white">
              查看 <ArrowRightOutlined className="text-[10px]" />
            </div>
          </div>
        </div>

        {/* 右上：收藏 + 全屏 */}
        <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleToggleFav}
            title={favorited ? '取消收藏' : '收藏'}
            aria-label={favorited ? '取消收藏' : '收藏'}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200
              ${
                favorited
                  ? 'bg-emerald-500 text-white opacity-100 hover:bg-emerald-600'
                  : `bg-white/95 text-slate-500 hover:bg-white hover:text-emerald-500 ${
                      hovered ? 'opacity-100' : 'opacity-0'
                    }`
              }`}
          >
            {favorited ? <HeartFilled /> : <HeartOutlined />}
          </button>

          {item.hasPreviewFile && item.preview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.preview!, '_blank');
              }}
              title="全屏预览"
              className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-slate-900 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <FullscreenOutlined />
            </button>
          )}
        </div>

      </div>

      {/* 信息区 */}
      <div className="space-y-2 p-5">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
          <span className={`h-1.5 w-1.5 rounded-full ${typeDotColor(item.type)}`} />
          {typeLabel[item.type]}
        </div>
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

export default StyleCard;
