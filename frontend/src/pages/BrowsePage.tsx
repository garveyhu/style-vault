import { useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-white via-violet-50/30 to-indigo-50/40">
        {/* 装饰 blob */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1600px] px-8 py-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[12px] font-medium tracking-wide text-violet-600">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              STYLE VAULT · 2026
            </div>
            <h1 className="max-w-3xl text-[44px] font-bold leading-tight tracking-tight text-slate-900">
              属于你的
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                前端风格库
              </span>
            </h1>
            <p className="max-w-2xl text-[16px] leading-relaxed text-slate-600">
              沉淀让你满意的设计风格，下次做项目一键复刻。
              按层级浏览，按氛围筛选，点"复制 Prompt"让 AI 直接用上。
            </p>

            {/* Stats */}
            <div className="mt-2 flex flex-wrap items-center gap-8 text-sm">
              <div>
                <div className="text-[28px] font-semibold leading-none text-slate-900">
                  {totalCount}
                </div>
                <div className="mt-1 text-slate-500">个风格条目</div>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <div className="text-[28px] font-semibold leading-none text-slate-900">
                  5
                </div>
                <div className="mt-1 text-slate-500">层分层结构</div>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <div className="text-[28px] font-semibold leading-none text-slate-900">
                  {totalTags}
                </div>
                <div className="mt-1 text-slate-500">个标签</div>
              </div>
            </div>

            {/* 搜索框 */}
            <div className="mt-2 max-w-2xl">
              <Input
                size="large"
                placeholder="搜索名称或描述…"
                prefix={<SearchOutlined className="text-slate-400" />}
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 筛选区 */}
      <div className="sticky top-16 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {ORDER.map((t) => {
              const active = activeType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition
                    ${
                      active
                        ? 'border-violet-500 bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm shadow-violet-500/25'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                >
                  <span>{typePlural[t]}</span>
                  <span
                    className={`text-[11px] ${active ? 'text-white/80' : 'text-slate-400'}`}
                  >
                    {counts[t]}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3">
            <TagFilterBar dict={reg.tagDict} value={filters} onChange={setFilters} />
          </div>
        </div>
      </div>

      {/* 网格 */}
      <main className="mx-auto max-w-[1600px] px-8 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24">
            <div className="text-4xl">🔎</div>
            <div className="text-[15px] text-slate-600">没有匹配的风格</div>
            <button
              type="button"
              onClick={() => {
                setFilters(emptyFilterValue);
                setSearch('');
              }}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              清除所有筛选
            </button>
          </div>
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
