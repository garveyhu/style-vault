import { useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { typePlural } from '../utils/taxonomy';
import { StyleCard } from '../components/StyleCard';
import { TopBar } from '../components/TopBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

type OverviewType = 'style' | 'page' | 'block' | 'component' | 'token';

const ORDER: OverviewType[] = ['style', 'page', 'block', 'component', 'token'];

const PREVIEW_COUNT = 4;

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

      {/* ===== 每类别一行 ===== */}
      <main className="px-10 pb-20 pt-10">
        <div className="space-y-14">
          {rows.map(({ type, items }) => {
            if (items.length === 0) return null;
            const preview = items.slice(0, PREVIEW_COUNT);
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

                {/* 与 BrowseCategoryPage 使用同一栅格：自适应 300–400px 卡宽 */}
                <div
                  className="grid justify-start gap-4"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 400px))',
                  }}
                >
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
