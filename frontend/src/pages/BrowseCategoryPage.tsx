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
import { tagDict } from '../utils/taxonomy';

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
    title: '风格',
    desc: '完整的设计语言：配色、字体、节奏共同构成一个整体。',
  },
  page: {
    title: '页面',
    desc: '可独立使用的整页结构，由若干模块组合而成。',
  },
  block: {
    title: '模块',
    desc: '页面中的可复用段落。比组件大，比页面小。',
  },
  component: {
    title: '组件',
    desc: '最小粒度的可复用单元：Button、Input、Tag 等。',
  },
  token: {
    title: '原语',
    desc: '设计值与资源：调色板、字体、动效、边框、图标。',
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
        <div className="px-10 pb-4 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[680px] text-[14px] leading-relaxed text-slate-500">
              {hero.desc}
            </p>
            <Popover
              trigger="click"
              placement="bottomRight"
              arrow={false}
              content={
                <FiltersPanel
                  dict={tagDict}
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

      <main className="px-10 pb-20 pt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
            当前「{PLATFORM_TEXT[platform]}」下暂无该类别的内容
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              // 方案 A · auto-fit + 1fr · 卡片自动拉伸填满可用宽度，消除右侧留白
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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

