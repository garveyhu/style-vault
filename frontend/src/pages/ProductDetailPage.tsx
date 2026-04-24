import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { FavoriteButton } from '../components/FavoriteButton';
import { platformLabel, themeLabel, categoryLabel, categoryDot } from '../utils/taxonomy';
import { getPreviewComponent } from '../preview/registry';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

export default function ProductDetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const slug = params.slug ?? '';
  const id = `products/${slug}`;
  const product = useItem(id);

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

  const PaletteComp = paletteItem ? getPreviewComponent(paletteItem.preview) : null;
  const TypoComp = typoItem ? getPreviewComponent(typoItem.preview) : null;
  const StyleComp = style ? getPreviewComponent(style.preview) : null;

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
      <section className="mx-auto max-w-[1100px] px-8 py-20">
        <div className="grid grid-cols-[160px_1fr] gap-14">
          <aside className="sticky top-24 h-max">
            <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">
              本页导航
            </div>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#style" className="text-slate-500 hover:text-slate-900">
                  01 · 风格
                </a>
              </li>
              <li>
                <a href="#pages" className="text-slate-500 hover:text-slate-900">
                  02 · 页面
                </a>
              </li>
              <li>
                <a href="#blocks" className="text-slate-500 hover:text-slate-900">
                  03 · 模块
                </a>
              </li>
              <li>
                <a
                  href="#components"
                  className="text-slate-500 hover:text-slate-900"
                >
                  04 · 组件
                </a>
              </li>
              <li>
                <a href="#tokens" className="text-slate-500 hover:text-slate-900">
                  05 · 原语
                </a>
              </li>
            </ul>
          </aside>

          <div className="min-w-0 space-y-20">
            {/* Style */}
            {style && (
              <article id="style">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">01</span>
                  <h2 className="font-display text-[36px] font-semibold">
                    设计风格
                  </h2>
                </div>
                <button
                  onClick={() => nav(`/item/${style.id}`)}
                  className="mt-6 block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:border-slate-300"
                >
                  <div className="grid grid-cols-[260px_1fr]">
                    <div className="sv-preview-embedded h-[200px] overflow-hidden bg-slate-900">
                      {StyleComp ? <StyleComp /> : null}
                    </div>
                    <div className="p-7">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-600">
                        设计语言
                      </div>
                      <div className="mt-3 font-display text-[24px] font-semibold">
                        {style.name}
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </button>
              </article>
            )}

            {/* Pages */}
            <article id="pages">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">02</span>
                <h2 className="font-display text-[36px] font-semibold">页面</h2>
                <span className="text-[13px] text-slate-400">· {pages.length}</span>
              </div>
              <div className="mt-8 space-y-10">
                {pages.map((p) => {
                  const PComp = getPreviewComponent(p.preview);
                  return (
                    <div key={p.id}>
                      <div className="mb-3 flex items-end justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                            {p.id.split('/')[1]}
                          </div>
                          <h3 className="mt-1 font-display text-[22px] font-semibold">
                            {p.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => nav(`/item/${p.id}`)}
                          className="text-[12px] text-slate-500 underline decoration-dotted"
                        >
                          查看 →
                        </button>
                      </div>
                      <div
                        className="sv-preview-embedded overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        style={{ height: 380 }}
                      >
                        {PComp ? <PComp /> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Blocks */}
            <article id="blocks">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">03</span>
                <h2 className="font-display text-[36px] font-semibold">模块</h2>
                <span className="text-[13px] text-slate-400">
                  · {blocks.length}
                </span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
                {blocks.map((b) => {
                  const BComp = getPreviewComponent(b.preview);
                  return (
                    <button
                      key={b.id}
                      onClick={() => nav(`/item/${b.id}`)}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300"
                    >
                      <div className="sv-preview-embedded h-28 overflow-hidden rounded bg-slate-50">
                        {BComp ? <BComp /> : null}
                      </div>
                      <div className="mt-3 text-[14px] font-medium">{b.name}</div>
                      <div className="mt-0.5 line-clamp-1 text-[11px] text-slate-400">
                        {b.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </article>

            {/* Components */}
            <article id="components">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">04</span>
                <h2 className="font-display text-[36px] font-semibold">组件</h2>
                <span className="text-[13px] text-slate-400">
                  · {components.length}
                </span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-4">
                {components.map((c) => {
                  const CComp = getPreviewComponent(c.preview);
                  return (
                    <button
                      key={c.id}
                      onClick={() => nav(`/item/${c.id}`)}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300"
                    >
                      <div className="sv-preview-embedded flex h-16 items-center justify-center overflow-hidden rounded bg-slate-50">
                        {CComp ? <CComp /> : null}
                      </div>
                      <div className="mt-2 text-[13px] font-medium">{c.name}</div>
                    </button>
                  );
                })}
              </div>
            </article>

            {/* Tokens */}
            {(paletteItem || typoItem) && (
              <article id="tokens">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">05</span>
                  <h2 className="font-display text-[36px] font-semibold">原语</h2>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {paletteItem && (
                    <button
                      onClick={() => nav(`/item/${paletteItem.id}`)}
                      className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-slate-300"
                    >
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                        调色板
                      </div>
                      <div className="mt-2 font-display text-[18px] font-semibold">
                        {paletteItem.name}
                      </div>
                      <div className="sv-preview-embedded mt-4 h-28 overflow-hidden rounded-xl border border-slate-100">
                        {PaletteComp ? <PaletteComp /> : null}
                      </div>
                    </button>
                  )}
                  {typoItem && (
                    <button
                      onClick={() => nav(`/item/${typoItem.id}`)}
                      className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-slate-300"
                    >
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                        字体系统
                      </div>
                      <div className="mt-2 font-display text-[18px] font-semibold">
                        {typoItem.name}
                      </div>
                      <div className="sv-preview-embedded mt-4 h-28 overflow-hidden rounded-xl border border-slate-100">
                        {TypoComp ? <TypoComp /> : null}
                      </div>
                    </button>
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
