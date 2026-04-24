import { useMemo, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Popover } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { StyleCard } from '../components/StyleCard';
import { TopBar } from '../components/TopBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { FiltersPanel } from '../components/FiltersPanel';
import { emptyFilterValue, type FilterValue } from '../components/TagFilterBar';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';

const GROUP_KEYS = ['aesthetic', 'mood', 'stack'] as const;
type CategoryKey = 'style' | 'page' | 'block' | 'component' | 'token';
const VALID_CATEGORIES: ReadonlySet<CategoryKey> = new Set([
  'style',
  'page',
  'block',
  'component',
  'token',
]);

const PLATFORM_TEXT = { web: 'Web', ios: 'iOS', android: 'Android' } as const;

const HERO_COPY: Record<CategoryKey, { title: string; desc: string }> = {
  style: {
    title: '风格语言，从真实产品里来',
    desc: '一整套可直接引用的设计语言——配色、字体、气质绑死在一起。',
  },
  page: {
    title: '整页样板，拿来即用',
    desc: '一屏能独立渲染的页面结构，背后是多个 Block 的组合。',
  },
  block: {
    title: '可复用的场景模块',
    desc: 'Hero、Pricing 表、FAQ…… 页面里的"一块"，比组件大、比页面小。',
  },
  component: {
    title: '单一交互组件',
    desc: 'Button / Input / Tag…… 可独立复用的 UI 原子。',
  },
  token: {
    title: '设计原语 / 资源',
    desc: '没有交互形态的值或资源：调色板、字体对、动效曲线、边框、阴影、图标集。',
  },
};

export default function BrowseCategoryPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const { platform } = usePlatform();
  const [filters, setFilters] = useState<FilterValue>(emptyFilterValue);

  const type = params.type as CategoryKey | undefined;

  const filtered = useMemo(() => {
    if (!reg?.items || !type || !VALID_CATEGORIES.has(type)) return [];
    return reg.items
      .filter((i) => i.type === type)
      .filter((item) => matchesPlatform(item.platforms, platform))
      .filter((item) =>
        GROUP_KEYS.every((k) => {
          if (filters[k].length === 0) return true;
          return item.tags[k].some((t) => filters[k].includes(t));
        }),
      );
  }, [reg, type, platform, filters]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;
  if (!type || !VALID_CATEGORIES.has(type)) {
    return <Navigate to="/browse" replace />;
  }

  const hero = HERO_COPY[type];
  const activeFilterCount = GROUP_KEYS.reduce(
    (acc, k) => acc + filters[k].length,
    0,
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />
      <CategoryTabs />

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1600px] px-8 pb-4 pt-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.015em] text-slate-900 md:text-[32px]">
                {hero.title}
              </h1>
              <p className="mt-2 max-w-[600px] text-[13px] leading-relaxed text-slate-500">
                {hero.desc}
              </p>
            </div>
            <Popover
              trigger="click"
              placement="bottomRight"
              arrow={false}
              content={
                <FiltersPanel
                  dict={reg.tagDict}
                  value={filters}
                  onChange={setFilters}
                />
              }
              overlayInnerStyle={{ padding: 0, borderRadius: 16 }}
            >
              <button
                type="button"
                className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] font-medium transition ${
                  activeFilterCount > 0
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <FilterOutlined className="text-[13px]" />
                筛选
                {activeFilterCount > 0 && (
                  <span className="flex h-4 min-w-[18px] items-center justify-center rounded-full bg-white/20 px-1 text-[10px] font-semibold tabular-nums text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </Popover>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-8 pb-20 pt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
            当前「{PLATFORM_TEXT[platform]}」下暂无该类别的内容
          </div>
        ) : (
          <div
            className="grid justify-start gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 400px))',
            }}
          >
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
    </div>
  );
}

