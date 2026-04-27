import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { FavoriteButton } from '../components/FavoriteButton';
import { platformLabel, themeLabel, categoryLabel, categoryDot } from '../utils/taxonomy';
import { getPreviewComponent } from '../preview/registry';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

/**
 * 按 type 配虚拟宽度 —— 与各类预览组件的内容 maxWidth 大致对齐，
 * 让 block/component/token 的内容能"铺满"自己所在的列、不再被虚拟 1440 的白边压缩。
 */
const VIRTUAL_WIDTH_BY_TYPE: Record<string, number> = {
  product: 1440,
  style: 1440,
  page: 1440,
  block: 1000,
  component: 720,
  token: 1100,
};

/**
 * 自然高度预览卡：
 * - 按 type 在虚拟宽度下渲染预览组件 → 测量真实内容高度
 * - 按容器宽度等比缩放，容器高度 = 内容自然高度 × scale
 * - 不同内容自动产生不同高度，瀑布流自然成形
 */
function PreviewOnlyCard({
  item,
  onClick,
}: {
  item: RegistryItem;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const PreviewComp = getPreviewComponent(item.preview);
  const virtualWidth = VIRTUAL_WIDTH_BY_TYPE[item.type] ?? 1440;

  useLayoutEffect(() => {
    if (!PreviewComp) return;
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!container || !preview) return;

    const compute = () => {
      const cw = container.clientWidth;
      const naturalH = preview.offsetHeight; // 未缩放的虚拟内容真实高度
      if (cw <= 0 || naturalH <= 0) return;
      const s = cw / virtualWidth;
      setScale(s);
      setScaledHeight(naturalH * s);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    ro.observe(preview);
    return () => ro.disconnect();
  }, [PreviewComp, virtualWidth]);

  if (!PreviewComp) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={item.name}
        className="mb-4 block w-full rounded-xl bg-slate-100/70 py-12 text-center text-[12px] text-slate-400 [break-inside:avoid]"
      >
        暂无预览
      </button>
    );
  }

  return (
    <button
      type="button"
      ref={containerRef}
      onClick={onClick}
      aria-label={item.name}
      className="sv-preview-embedded mb-4 block w-full overflow-hidden rounded-xl ring-1 ring-slate-200/60 transition hover:ring-slate-400 hover:shadow-md [break-inside:avoid]"
      style={{ height: scaledHeight ?? undefined }}
    >
      <div
        ref={previewRef}
        className="pointer-events-none origin-top-left"
        style={{
          width: `${virtualWidth}px`,
          transform: scale ? `scale(${scale})` : 'scale(0)',
          opacity: scale ? 1 : 0,
        }}
        aria-hidden
      >
        <PreviewComp />
      </div>
    </button>
  );
}

const SECTION_IDS = ['style', 'pages', 'blocks', 'components', 'tokens'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function ProductDetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const slug = params.slug ?? '';
  const id = `products/${slug}`;
  const product = useItem(id);
  const [activeSection, setActiveSection] = useState<SectionId>('style');

  useEffect(() => {
    const sections = SECTION_IDS
      .map((sid) => document.getElementById(sid))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    // 视口上方 120px 触发，下方留 60% 缓冲 —— 滚到 section 头部时即激活
    const io = new IntersectionObserver(
      (entries) => {
        // 选取所有当前与 root 相交的，按 boundingClientRect.top 取最靠上的
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [product?.id]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <TopBar />
        <div className="p-8 text-slate-500">找不到产品：{id}</div>
      </div>
    );
  }

  const resolve = (rid: string) => reg.items.find((i) => i.id === rid);
  const style = product.refs?.style ? resolve(product.refs.style) : null;
  const pages = (product.refs?.pages ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const blocks = (product.refs?.blocks ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const components = (product.refs?.components ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const tokenRefs = product.refs?.tokens ?? {};
  const paletteItem = tokenRefs.palette ? resolve(tokenRefs.palette) : null;
  const typoItem = tokenRefs.typography ? resolve(tokenRefs.typography) : null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* Cover Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-slate-200/50 blur-3xl" />
        <div className="relative mx-auto max-w-[1100px] px-8 pb-20 pt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: categoryDot(product.category) }}
            />
            产品 · {categoryLabel(product.category)}
          </div>
          <h1 className="mx-auto mt-5 max-w-[900px] font-display text-[64px] font-semibold leading-[1.03] tracking-[-0.025em] text-slate-900">
            {product.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-slate-500">
            {product.description}
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            {product.platforms.map((pl) => (
              <span
                key={pl}
                className="rounded-full bg-slate-900 px-4 py-1 text-[12px] text-white"
              >
                {platformLabel[pl] ?? pl}
              </span>
            ))}
            <span className="rounded-full border border-slate-200 bg-white px-4 py-1 text-[12px] text-slate-600">
              {themeLabel[product.theme] ?? product.theme}
            </span>
            <FavoriteButton entryId={product.id} size="md" variant="icon" />
          </div>
        </div>
      </section>

      {/* Body with sticky TOC */}
      <section className="mx-auto max-w-[1280px] px-8 py-20">
        <div className="grid gap-10" style={{ gridTemplateColumns: '88px 1fr' }}>
          <aside className="sticky top-24 h-max">
            <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">
              导航
            </div>
            <ul className="space-y-1 text-[12px]">
              {(
                [
                  ['style', '01', '风格'],
                  ['pages', '02', '页面'],
                  ['blocks', '03', '模块'],
                  ['components', '04', '组件'],
                  ['tokens', '05', '原语'],
                ] as const
              ).map(([sid, num, label]) => {
                const active = activeSection === sid;
                return (
                  <li key={sid}>
                    <a
                      href={`#${sid}`}
                      className={`relative flex items-center gap-2 rounded-md px-2 py-1 transition ${
                        active
                          ? 'font-medium text-slate-900'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full transition ${
                          active ? 'bg-slate-900' : 'bg-transparent'
                        }`}
                      />
                      <span
                        className={`font-mono ${active ? 'text-slate-500' : 'text-slate-300'}`}
                      >
                        {num}
                      </span>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0 space-y-16">
            {/* Style — 铺满 + 自然高度 */}
            {style && (
              <article id="style">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">01</span>
                  <h2 className="font-display text-[26px] font-semibold">
                    设计风格
                  </h2>
                </div>
                <div className="mt-8">
                  <PreviewOnlyCard
                    item={style}
                    onClick={() => nav(`/item/${style.id}`)}
                  />
                </div>
              </article>
            )}

            {/* Pages — masonry · 仅预览 */}
            <article id="pages">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">02</span>
                <h2 className="font-display text-[26px] font-semibold">页面</h2>
                <span className="text-[13px] text-slate-400">· {pages.length}</span>
              </div>
              <div className="mt-8 columns-2 gap-5 lg:columns-3">
                {pages.map((p) => (
                  <PreviewOnlyCard
                    key={p.id}
                    item={p}
                    onClick={() => nav(`/item/${p.id}`)}
                  />
                ))}
              </div>
            </article>

            {/* Blocks — masonry */}
            <article id="blocks">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">03</span>
                <h2 className="font-display text-[26px] font-semibold">模块</h2>
                <span className="text-[13px] text-slate-400">
                  · {blocks.length}
                </span>
              </div>
              <div className="mt-8 columns-2 gap-5 lg:columns-3">
                {blocks.map((b) => (
                  <PreviewOnlyCard
                    key={b.id}
                    item={b}
                    onClick={() => nav(`/item/${b.id}`)}
                  />
                ))}
              </div>
            </article>

            {/* Components — masonry */}
            <article id="components">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">04</span>
                <h2 className="font-display text-[26px] font-semibold">组件</h2>
                <span className="text-[13px] text-slate-400">
                  · {components.length}
                </span>
              </div>
              <div className="mt-8 columns-2 gap-5 md:columns-3 lg:columns-4">
                {components.map((c) => (
                  <PreviewOnlyCard
                    key={c.id}
                    item={c}
                    onClick={() => nav(`/item/${c.id}`)}
                  />
                ))}
              </div>
            </article>

            {/* Tokens — masonry · 仅预览 */}
            {(paletteItem || typoItem) && (
              <article id="tokens">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">05</span>
                  <h2 className="font-display text-[26px] font-semibold">原语</h2>
                </div>
                <div className="mt-8 max-w-[760px] columns-1 gap-5 md:columns-2">
                  {paletteItem && (
                    <PreviewOnlyCard
                      item={paletteItem}
                      onClick={() => nav(`/item/${paletteItem.id}`)}
                    />
                  )}
                  {typoItem && (
                    <PreviewOnlyCard
                      item={typoItem}
                      onClick={() => nav(`/item/${typoItem.id}`)}
                    />
                  )}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
