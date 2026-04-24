import { useEffect, useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { platformLabel } from '../utils/i18n';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';
import { getPreviewComponent } from '../preview/registry';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

const PLATFORM_TEXT = { web: 'Web', ios: 'iOS', android: 'Android' } as const;

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;
const COVER_HEIGHT = 220;

export default function ProductListPage() {
  const reg = useRegistry();
  const nav = useNavigate();
  const { platform } = usePlatform();
  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  const products = reg.items
    .filter((i) => i.type === 'product')
    .filter((i) => matchesPlatform(i.platforms, platform));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1600px] px-8 pb-4 pt-10">
          <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.015em] text-slate-900 md:text-[32px]">
            {PLATFORM_TEXT[platform]} 产品集
          </h1>
          <p className="mt-2 max-w-[600px] text-[13px] leading-relaxed text-slate-500">
            一个产品 = 一套风格 + 若干页面、模块、组件与原语。
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-8 pb-20 pt-6">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
            当前「{PLATFORM_TEXT[platform]}」下暂无产品
          </div>
        ) : (
          <div
            className="grid justify-start gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 400px))',
            }}
          >
            {products.map((p) => {
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
  const [scale, setScale] = useState(0.28);
  const CoverComp = coverItem ? getPreviewComponent(coverItem.preview) : null;

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
      {/* Cover：首个 Page preview；没有则渐变条纹退化 */}
      <div
        ref={previewRef}
        className="relative w-full overflow-hidden bg-slate-50"
        style={{ height: COVER_HEIGHT }}
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

      {/* 信息区 —— 节奏对齐 StyleCard */}
      <div className="space-y-1.5 p-4">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            {product.category ?? '产品'}
          </span>
          {product.platforms.length > 0 && !product.platforms.includes('any') && (
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

        <h3 className="m-0 font-display text-[15px] font-semibold leading-snug tracking-tight text-slate-900">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[12px] leading-relaxed text-slate-500">
          {product.description}
        </p>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span>{product.refs?.pages?.length ?? 0} 页面</span>
          <span className="text-slate-300">·</span>
          <span>{product.refs?.blocks?.length ?? 0} 模块</span>
          <span className="text-slate-300">·</span>
          <span>{product.refs?.components?.length ?? 0} 组件</span>
        </div>
      </div>
    </article>
  );
}
