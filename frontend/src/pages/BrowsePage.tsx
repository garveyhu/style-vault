import { useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { typePlural } from '../utils/i18n';
import { StyleCard } from '../components/StyleCard';
import { TopBar } from '../components/TopBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

type OverviewType = 'style' | 'page' | 'block' | 'component' | 'token';

const ORDER: OverviewType[] = ['style', 'page', 'block', 'component', 'token'];

const PREVIEW_PER_ROW = 3;

const MORE_LINK: Record<OverviewType, string> = {
  style: '/browse/style',
  page: '/browse/page',
  block: '/browse/block',
  component: '/browse/component',
  token: '/browse/token',
};

const PLATFORM_TEXT = { web: 'Web', ios: 'iOS', android: 'Android' } as const;

export default function BrowsePage() {
  const reg = useRegistry();
  const nav = useNavigate();
  const { platform } = usePlatform();

  const rows = useMemo(() => {
    if (!reg?.items) return [] as Array<{ type: OverviewType; items: RegistryItem[] }>;
    return ORDER.map((type) => ({
      type,
      items: reg.items
        .filter((i) => i.type === type)
        .filter((i) => matchesPlatform(i.platforms, platform)),
    }));
  }, [reg, platform]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />
      <CategoryTabs />

      {/* ===== Hero：简短描述 ===== */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1600px] px-8 pt-10">
          <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.015em] text-slate-900 md:text-[32px]">
            {PLATFORM_TEXT[platform]} 设计灵感
          </h1>
          <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-slate-500">
            看看顶尖产品是怎么做 {PLATFORM_TEXT[platform]} UX 的。
          </p>
        </div>
      </section>

      {/* ===== 每类别一行 ===== */}
      <main className="mx-auto max-w-[1600px] px-8 pb-20 pt-10">
        <div className="space-y-14">
          {rows.map(({ type, items }) => {
            if (items.length === 0) return null;
            const preview = items.slice(0, PREVIEW_PER_ROW);
            return (
              <section key={type}>
                <header className="mb-5 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-[22px] font-semibold tracking-[-0.015em] text-slate-900">
                    {PLATFORM_TEXT[platform]} {typePlural[type]}
                  </h2>
                  <Link to={MORE_LINK[type]} className="sv-text-link">
                    查看更多
                    <ArrowRightOutlined className="sv-text-link-arrow text-[11px]" />
                  </Link>
                </header>

                {/* 单行固定 3 列 —— 少于 3 条时自然空白，不超过 3 条则截取 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {preview.map((item) => (
                    <StyleCard
                      key={item.id}
                      item={item}
                      onClick={() => nav(`/item/${item.id}`)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {rows.every((r) => r.items.length === 0) && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
              当前「{PLATFORM_TEXT[platform]}」下暂无内容
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
