import { useEffect, useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import {
  ProductFilterPanel,
  emptyProductFilterState,
  matchProductFilters,
  type ProductFilterState,
} from '../components/ProductFilterPanel';
import { platformLabel, categoryLabel, categoryDot } from '../utils/taxonomy';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';
import { getPreviewComponent } from '../preview/registry';
import { useAuth } from '../auth/AuthContext';
import { useFavorites } from '../auth/FavoritesContext';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

const PLATFORM_TEXT = { web: 'Web', ios: 'iOS', android: 'Android' } as const;

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;
const COVER_WIDTH = 380;
const COVER_HEIGHT = 220;

export default function ProductListPage() {
  const reg = useRegistry();
  const nav = useNavigate();
  const { platform } = usePlatform();
  const [filters, setFilters] = useState<ProductFilterState>(
    emptyProductFilterState,
  );
  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  const platformMatched = reg.items
    .filter((i) => i.type === 'product')
    .filter((i) => matchesPlatform(i.platforms, platform));
  const visible = platformMatched.filter((p) => matchProductFilters(p, filters));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      <main className="px-10 pb-20 pt-4">
        <div
          className="grid items-start gap-8"
          style={{ gridTemplateColumns: '260px 1fr' }}
        >
          <ProductFilterPanel value={filters} onChange={setFilters} />

          <div>
            {platformMatched.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
                当前「{PLATFORM_TEXT[platform]}」下暂无产品
              </div>
            ) : visible.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
                当前筛选条件下无匹配产品
              </div>
            ) : (
              <div className="space-y-4">
                {visible.map((p) => {
                  const slug = p.id.replace(/^products\//, '');
                  const coverItem = resolveCoverItem(p, reg.items);
                  return (
                    <ProductCard
                      key={p.id}
                      product={p}
                      coverItem={coverItem}
                      onClick={() => nav(`/products/${slug}`)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function resolveCoverItem(
  product: RegistryItem,
  all: RegistryItem[],
): RegistryItem | null {
  const firstPageId = product.refs?.pages?.[0];
  if (firstPageId) {
    const found = all.find((i) => i.id === firstPageId);
    if (found) return found;
  }
  // 退化：Style 作为封面
  const styleId = product.refs?.style;
  if (styleId) {
    const found = all.find((i) => i.id === styleId);
    if (found) return found;
  }
  return null;
}

function ProductCard({
  product,
  coverItem,
  onClick,
}: {
  product: RegistryItem;
  coverItem: RegistryItem | null;
  onClick: () => void;
}) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(COVER_WIDTH / PREVIEW_VIRTUAL_WIDTH);
  const CoverComp = coverItem ? getPreviewComponent(coverItem.preview) : null;
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(product.id);

  const handleToggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onClick();
      return;
    }
    try {
      await toggleFavorite(product.id);
    } catch {
      /* 回滚由 FavoritesContext 处理 */
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

  return (
    <article
      onClick={onClick}
      className="sv-card group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/80 bg-white"
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: `${COVER_WIDTH}px 1fr` }}
      >
        {/* 封面：浮起作品照（C 方案） */}
        <div
          className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100/60"
          style={{ height: COVER_HEIGHT }}
        >
          <div
            ref={previewRef}
            className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_8px_24px_-10px_rgba(15,23,42,0.22)]"
            style={{ width: '92%', height: '86%' }}
          >
            {CoverComp ? (
              <div
                className="pointer-events-none absolute left-0 top-0 origin-top-left"
                style={{
                  width: `${PREVIEW_VIRTUAL_WIDTH}px`,
                  height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
                  transform: `scale(${scale})`,
                }}
                aria-hidden
              >
                <CoverComp />
              </div>
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    'repeating-linear-gradient(135deg, #f8fafc, #f8fafc 10px, #f1f5f9 10px, #f1f5f9 20px)',
                }}
              />
            )}
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: categoryDot(product.category) }}
                  />
                  {categoryLabel(product.category)}
                </span>
                {product.platforms.length > 0 &&
                  !product.platforms.includes('any') && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">
                        {product.platforms
                          .map((pl) => platformLabel[pl] ?? pl)
                          .join(' · ')}
                      </span>
                    </>
                  )}
              </div>
              <button
                type="button"
                onClick={handleToggleFav}
                aria-label={favorited ? '取消收藏' : '收藏'}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[14px] transition
                  ${
                    favorited
                      ? 'text-slate-900 hover:text-slate-700'
                      : 'text-slate-300 hover:text-slate-900'
                  }`}
              >
                {favorited ? <HeartFilled /> : <HeartOutlined />}
              </button>
            </div>

            <h3 className="m-0 mt-2 font-display text-[20px] font-semibold leading-tight tracking-tight text-slate-900">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-600">
              {product.description}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-6 text-[11px] text-slate-400">
            <span className="font-mono tracking-wider">
              PAGES{' '}
              <span className="text-slate-700">
                {product.refs?.pages?.length ?? 0}
              </span>
            </span>
            <span className="font-mono tracking-wider">
              BLOCKS{' '}
              <span className="text-slate-700">
                {product.refs?.blocks?.length ?? 0}
              </span>
            </span>
            <span className="font-mono tracking-wider">
              COMPONENTS{' '}
              <span className="text-slate-700">
                {product.refs?.components?.length ?? 0}
              </span>
            </span>
            <span className="ml-auto text-[12px] text-slate-900 transition-colors group-hover:text-slate-700">
              查看 →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
