import { useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { typePlural } from '../utils/i18n';
import { StyleCard } from '../components/StyleCard';
import { TagFilterBar, emptyFilterValue, type FilterValue } from '../components/TagFilterBar';
import { TopBar } from '../components/TopBar';
import type { EntryType } from '../../scripts/sync-from-skill/types';

const ORDER: EntryType[] = ['vibe', 'archetype', 'composite', 'atom', 'primitive'];
const GROUP_KEYS = ['aesthetic', 'mood', 'theme', 'stack'] as const;

export default function BrowsePage() {
  const reg = useRegistry();
  const [activeType, setActiveType] = useState<EntryType>('composite');
  const [filters, setFilters] = useState<FilterValue>(emptyFilterValue);
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

  const filtered = useMemo(() => {
    if (!reg?.items) return [];
    return reg.items
      .filter((i) => i.type === activeType)
      .filter((item) =>
        GROUP_KEYS.every((k) => {
          if (filters[k].length === 0) return true;
          return item.tags[k].some((t) => filters[k].includes(t));
        }),
      );
  }, [reg, activeType, filters]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* 筛选区 */}
      <div className="sticky top-16 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-8">
          <Tabs
            activeKey={activeType}
            onChange={(k) => setActiveType(k as EntryType)}
            items={ORDER.map((t) => ({
              key: t,
              label: (
                <span className="text-[14px]">
                  {typePlural[t]}
                  <span className="ml-2 text-[11px] text-slate-400">{counts[t]}</span>
                </span>
              ),
            }))}
          />
          <TagFilterBar dict={reg.tagDict} value={filters} onChange={setFilters} />
        </div>
      </div>

      {/* 网格 */}
      <main className="mx-auto max-w-[1600px] px-8 py-8">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-400">没有匹配的风格</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
