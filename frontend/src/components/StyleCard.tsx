import { useEffect, useRef, useState } from 'react';
import {
  FullscreenOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';
import { typeLabel, platformLabel } from '../utils/i18n';
import { zh } from '../utils/tagI18n';
import { useFavorites } from '../auth/FavoritesContext';
import { useAuth } from '../auth/AuthContext';
import { useRegistry } from '../data/useRegistry';
import { getPreviewComponent } from '../preview/registry';

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

/** 按 type 分 L/M/S 三档高度 —— 比例比旧版收紧一档 */
const SIZE_BY_TYPE: Record<string, { h: number; w: number }> = {
  product: { h: 220, w: 420 },
  style: { h: 220, w: 420 },
  page: { h: 220, w: 420 },
  block: { h: 180, w: 360 },
  component: { h: 160, w: 320 },
  token: { h: 160, w: 320 },
};

function typeDotColor(type: string): string {
  switch (type) {
    case 'product':
      return 'bg-purple-500';
    case 'style':
      return 'bg-rose-500';
    case 'page':
      return 'bg-indigo-500';
    case 'block':
      return 'bg-cyan-500';
    case 'component':
      return 'bg-emerald-500';
    case 'token':
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

  const sizing = SIZE_BY_TYPE[item.type] ?? SIZE_BY_TYPE.block;

  // 产品本身无 preview，退化去找 refs.pages[0] 或 refs.style 的 preview 当封面
  const reg = useRegistry();
  const coverPreview =
    item.type === 'product'
      ? resolveProductCover(item, reg.items)
      : item.preview;
  const hasPreview =
    item.type === 'product' ? Boolean(coverPreview) : item.hasPreviewFile;
  const PreviewComp = getPreviewComponent(coverPreview);

  const showPlatformChips =
    item.platforms.length > 0 && !item.platforms.includes('any');

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover={hovered}
      className="sv-card group relative mb-5 block w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/80 bg-white [break-inside:avoid]"
    >
      {/* ============ Preview 区：默认完全干净，hover 不叠任何按钮 ============ */}
      <div
        ref={previewRef}
        className="relative w-full overflow-hidden bg-slate-50"
        style={{ height: sizing.h }}
      >
        {hasPreview && PreviewComp ? (
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
          <div className="flex h-full items-center justify-center text-[12px] text-slate-400">
            暂无预览
          </div>
        )}
      </div>

      {/* ============ 信息区：type + platforms 一行 + 标题 + 描述 + tags ============ */}
      <div className="space-y-1.5 p-4">
        {/* 顶行：type 徽标 + platform chips + 右侧收藏按钮 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${typeDotColor(item.type)}`} />
              {typeLabel[item.type]}
            </span>
            {showPlatformChips && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  {item.platforms.map((p, i) => (
                    <span key={p}>
                      {i > 0 && <span className="mx-1 text-slate-300">·</span>}
                      {platformLabel[p] ?? p}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {item.hasPreviewFile && item.preview && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(item.preview!, '_blank');
                }}
                aria-label="全屏预览"
                className="flex h-6 w-6 items-center justify-center rounded-md text-[12px] text-slate-300 transition hover:text-slate-700"
              >
                <FullscreenOutlined />
              </button>
            )}
            <button
              type="button"
              onClick={handleToggleFav}
              aria-label={favorited ? '取消收藏' : '收藏'}
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[13px] transition
                ${
                  favorited
                    ? 'text-slate-900 hover:text-slate-700'
                    : 'text-slate-300 hover:text-slate-900'
                }`}
            >
              {favorited ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        </div>

        <h3 className="m-0 font-display text-[15px] font-semibold leading-snug tracking-tight text-slate-900">
          {item.name}
        </h3>
        <p className="line-clamp-2 text-[12px] leading-relaxed text-slate-500">
          {item.description}
        </p>

        {(item.tags.aesthetic.length > 0 || item.tags.mood.length > 0) && (
          <div className="flex flex-wrap gap-1 pt-1">
            {item.tags.aesthetic.slice(0, 3).map((t) => (
              <span
                key={`a-${t}`}
                className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600"
              >
                {zh('aesthetic', t)}
              </span>
            ))}
            {item.tags.mood.slice(0, 2).map((t) => (
              <span
                key={`m-${t}`}
                className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600"
              >
                {zh('mood', t)}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function resolveProductCover(
  product: RegistryItem,
  all: RegistryItem[],
): string | null {
  const firstPageId = product.refs?.pages?.[0];
  if (firstPageId) {
    const p = all.find((i) => i.id === firstPageId);
    if (p?.preview) return p.preview;
  }
  const styleId = product.refs?.style;
  if (styleId) {
    const s = all.find((i) => i.id === styleId);
    if (s?.preview) return s.preview;
  }
  return null;
}

export default StyleCard;
