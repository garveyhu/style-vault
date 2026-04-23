import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { typePlural } from '../utils/i18n';
import { StyleCard } from '../components/StyleCard';
import { TagFilterBar, emptyFilterValue, type FilterValue } from '../components/TagFilterBar';
import { TopBar } from '../components/TopBar';
import type { EntryType, RegistryItem } from '../../scripts/sync-from-skill/types';

const ORDER: EntryType[] = ['vibe', 'archetype', 'composite', 'atom', 'primitive'];
const GROUP_KEYS = ['aesthetic', 'mood', 'theme', 'stack'] as const;

const TYPE_HINT: Record<EntryType, string> = {
  vibe: '整页气质',
  archetype: '页面样板',
  composite: '场景组合',
  atom: '原子组件',
  primitive: '设计原语',
};

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

export default function BrowsePage() {
  const reg = useRegistry();
  const [activeType, setActiveType] = useState<EntryType>('composite');
  const [filters, setFilters] = useState<FilterValue>(emptyFilterValue);
  const [search, setSearch] = useState('');
  const nav = useNavigate();

  const counts = useMemo<Record<EntryType, number>>(() => {
    const c: Record<EntryType, number> = {
      vibe: 0,
      archetype: 0,
      composite: 0,
      atom: 0,
      primitive: 0,
    };
    if (reg?.items) for (const i of reg.items) c[i.type]++;
    return c;
  }, [reg]);

  const totalCount = reg?.items?.length ?? 0;
  const totalTags = useMemo(() => {
    if (!reg?.tagDict) return 0;
    return Object.values(reg.tagDict).reduce((acc, arr) => acc + arr.length, 0);
  }, [reg]);

  const featuredVibe: RegistryItem | undefined = useMemo(() => {
    if (!reg?.items) return undefined;
    return reg.items.find((i) => i.type === 'vibe' && i.hasPreviewFile);
  }, [reg]);

  const filtered = useMemo(() => {
    if (!reg?.items) return [];
    const q = search.trim().toLowerCase();
    return reg.items
      .filter((i) => i.type === activeType)
      .filter((item) => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
        );
      })
      .filter((item) =>
        GROUP_KEYS.every((k) => {
          if (filters[k].length === 0) return true;
          return item.tags[k].some((t) => filters[k].includes(t));
        }),
      );
  }, [reg, activeType, filters, search]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar search={search} onSearchChange={setSearch} />

      {/* ===================== Hero ===================== */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-white to-[#faf8ff]">
        {/* 装饰 blobs */}
        <div className="pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-violet-200/60 to-fuchsia-100/30 blur-3xl sv-anim-blob" />
        <div className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-indigo-200/50 to-sky-100/20 blur-3xl sv-anim-blob-slow" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-100/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-8 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
          {/* 左：editorial 大字 */}
          <div>
            <div className="sv-anim-fade-up sv-delay-0 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-violet-500">
              <span className="h-px w-8 bg-violet-400" />
              Curated · Replicable · Yours
            </div>

            <h1 className="sv-anim-fade-up sv-delay-150 mt-6 font-display text-[68px] font-light leading-[0.95] tracking-tight text-slate-900 md:text-[88px] lg:text-[104px]">
              Style
              <br />
              <span className="italic text-transparent bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 bg-clip-text">
                Vault
              </span>
            </h1>

            <p className="sv-anim-fade-up sv-delay-300 mt-8 max-w-xl text-[17px] leading-[1.6] text-slate-600">
              沉淀你满意的前端设计风格——
              <span className="text-slate-900">按层级浏览，按氛围筛选</span>，
              下次做项目一键复刻。点"复制 Prompt"让 AI 直接用上。
            </p>

            {/* Stats */}
            <div className="sv-anim-fade-up sv-delay-500 mt-12 flex flex-wrap items-end gap-10">
              <HeroStat value={totalCount} label="风格条目" />
              <div className="h-14 w-px bg-slate-200" />
              <HeroStat value={5} label="分层结构" />
              <div className="h-14 w-px bg-slate-200" />
              <HeroStat value={totalTags} label="标签维度" />
            </div>
          </div>

          {/* 右：装饰卡片堆叠 */}
          <div className="relative hidden h-[460px] lg:block">
            <HeroStackDecor items={reg.items} />
          </div>
        </div>
      </section>

      {/* ===================== Featured（深色点缀段） ===================== */}
      {featuredVibe && (
        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-[1600px] px-8 py-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-violet-300/80">
                  <span className="h-px w-8 bg-violet-400/70" />
                  Featured Vibe · 本周精选
                </div>
                <h2 className="mt-5 font-display text-[48px] font-light leading-tight tracking-tight lg:text-[60px]">
                  {featuredVibe.name}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
                  {featuredVibe.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredVibe.tags.aesthetic.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => nav(`/item/${featuredVibe.id}`)}
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-slate-900 transition hover:bg-violet-100"
                >
                  查看整页设计
                  <ArrowRightOutlined className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <FeaturedPreview item={featuredVibe} />
            </div>
          </div>
        </section>
      )}

      {/* ===================== Editorial Tab 导航 ===================== */}
      <div className="sticky top-[72px] z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-8">
          {/* 大号分类切换 */}
          <div className="flex items-end gap-2 overflow-x-auto py-4 md:gap-6">
            {ORDER.map((t) => {
              const active = activeType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  data-active={active}
                  className={`sv-tab-indicator group relative shrink-0 px-1 pb-3 pt-1 text-left transition
                    ${active ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[22px] font-medium tracking-tight">
                      {typePlural[t]}
                    </span>
                    <span
                      className={`font-display text-[14px] ${
                        active ? 'text-violet-500' : 'text-slate-300'
                      }`}
                    >
                      {counts[t]}
                    </span>
                  </div>
                  <div
                    className={`mt-0.5 text-[11px] ${
                      active ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {TYPE_HINT[t]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 标签筛选 */}
          <div className="border-t border-slate-100 pb-2 pt-3">
            <TagFilterBar dict={reg.tagDict} value={filters} onChange={setFilters} />
          </div>
        </div>
      </div>

      {/* ===================== Masonry 内容区 ===================== */}
      <main className="mx-auto max-w-[1600px] px-8 py-12">
        {/* Section 标题 */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-violet-500">
              {typePlural[activeType]} · {filtered.length} of {counts[activeType]}
            </div>
            <h2 className="mt-2 font-display text-[36px] font-light tracking-tight text-slate-900">
              Latest in{' '}
              <span className="italic text-violet-600">{typePlural[activeType]}</span>
            </h2>
          </div>
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              清除搜索 "{search}"
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            onReset={() => {
              setFilters(emptyFilterValue);
              setSearch('');
            }}
          />
        ) : (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((item) => (
              <StyleCard
                key={item.id}
                item={item}
                onClick={() => nav(`/item/${item.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ===================== Footer ===================== */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-8 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-7 w-7 opacity-80" />
            <div>
              <div className="font-display text-[15px] font-medium text-slate-900">
                Style Vault
              </div>
              <div className="text-[11px] text-slate-400">
                沉淀你满意的前端设计风格
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} · Personal project
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------- 子组件 -------------------- */

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-display text-[56px] font-light leading-none tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
    </div>
  );
}

/**
 * Hero 右侧：几张预览卡片向后堆叠的装饰，不可点。
 * 用 registry 里真实的前 3 张 preview 作为背景意象。
 */
function HeroStackDecor({ items }: { items: RegistryItem[] }) {
  const picks = useMemo(() => {
    const withPreview = items.filter((i) => i.hasPreviewFile && i.preview);
    const vibe = withPreview.find((i) => i.type === 'vibe');
    const arche = withPreview.find((i) => i.type === 'archetype');
    const comp = withPreview.find((i) => i.type === 'composite');
    return [vibe, arche, comp].filter(Boolean) as RegistryItem[];
  }, [items]);

  if (picks.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/40 to-indigo-300/40 blur-2xl" />
      </div>
    );
  }

  const positions = [
    'left-0 top-6 rotate-[-6deg]',
    'left-24 top-20 rotate-[3deg]',
    'left-12 top-48 rotate-[-2deg]',
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      {picks.map((p, idx) => (
        <div
          key={p.id}
          className={`sv-anim-fade-up absolute aspect-[16/10] w-[380px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(79,70,229,0.25)] ${positions[idx]} sv-delay-${idx === 0 ? '300' : idx === 1 ? '500' : '600'}`}
          style={{ zIndex: 10 - idx }}
        >
          <StaticPreviewFrame item={p} />
        </div>
      ))}
    </div>
  );
}

function StaticPreviewFrame({ item }: { item: RegistryItem }) {
  const previewUrl = item.preview ? `${window.location.origin}${item.preview}` : null;
  const CARD_WIDTH = 380;
  const scale = CARD_WIDTH / PREVIEW_VIRTUAL_WIDTH;
  if (!previewUrl) return null;
  return (
    <div
      className="origin-top-left"
      style={{
        width: `${PREVIEW_VIRTUAL_WIDTH}px`,
        height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
        transform: `scale(${scale})`,
      }}
    >
      <iframe
        src={previewUrl}
        title={item.name}
        className="pointer-events-none block h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}

function FeaturedPreview({ item }: { item: RegistryItem }) {
  const previewUrl = item.preview ? `${window.location.origin}${item.preview}` : null;
  // Featured 预览卡的显示宽度用 clamp，iframe 用 scale 自适配
  const [wrapRef, setWrapRef] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!wrapRef) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const w = e.contentRect.width;
        if (w > 0) setScale(w / PREVIEW_VIRTUAL_WIDTH);
      }
    });
    ro.observe(wrapRef);
    return () => ro.disconnect();
  }, [wrapRef]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-10 rounded-[32px] bg-gradient-to-br from-violet-500/30 to-indigo-500/20 blur-3xl" />
      <div
        ref={setWrapRef}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.4)]"
        style={{ aspectRatio: '16 / 10' }}
      >
        {previewUrl ? (
          <div
            className="origin-top-left"
            style={{
              width: `${PREVIEW_VIRTUAL_WIDTH}px`,
              height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            <iframe
              src={previewUrl}
              title={item.name}
              className="pointer-events-none block h-full w-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">
            暂无预览
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative flex flex-col items-center gap-5 py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-200/60 to-indigo-200/60 blur-3xl sv-anim-breathe" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-200/60 bg-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.25)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-10 w-10 text-violet-500"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="relative text-center">
        <div className="font-display text-[22px] font-medium text-slate-900">
          没有匹配的风格
        </div>
        <div className="mt-1 text-[13px] text-slate-500">
          换一组筛选条件，或清除搜索再看看
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="relative rounded-full border border-violet-200 bg-white px-5 py-2 text-[13px] text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
      >
        清除所有筛选
      </button>
    </div>
  );
}
