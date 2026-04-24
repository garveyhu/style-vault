import { useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { platformLabel } from '../utils/i18n';
import { usePlatform, matchesPlatform } from '../contexts/PlatformContext';

const PLATFORM_TEXT = { web: 'Web', ios: 'iOS', android: 'Android' } as const;

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
      <CategoryTabs />
      <div className="mx-auto max-w-[1600px] px-8 pb-20 pt-12">
        <div className="mb-10">
          <h1 className="font-display text-[40px] font-semibold tracking-[-0.02em] text-slate-900 md:text-[44px]">
            {PLATFORM_TEXT[platform]} 产品集
          </h1>
          <p className="mt-2 max-w-[600px] text-[14px] leading-relaxed text-slate-500">
            真实 {PLATFORM_TEXT[platform]} 产品的完整外壳——每一个都把风格、页面、模块、组件与原语捆绑在一起。
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">
            当前「{PLATFORM_TEXT[platform]}」下暂无产品
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {products.map((p) => {
              const slug = p.id.replace(/^products\//, '');
              return (
                <button
                  key={p.id}
                  onClick={() => nav(`/products/${slug}`)}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:border-slate-300 hover:shadow-[0_20px_48px_-24px_rgba(15,23,42,0.25)]"
                >
                  <div
                    className="h-[280px] transition group-hover:opacity-90"
                    style={{
                      background:
                        'repeating-linear-gradient(135deg, #f8fafc, #f8fafc 10px, #f1f5f9 10px, #f1f5f9 20px)',
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      <span>{p.category ?? 'Product'}</span>
                      <span>·</span>
                      {p.platforms.map((pl) => (
                        <span key={pl}>{platformLabel[pl] ?? pl}</span>
                      ))}
                    </div>
                    <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-slate-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
                      {p.description}
                    </p>
                    <div className="mt-4 flex gap-3 text-[12px] text-slate-400">
                      <span>{p.refs?.pages?.length ?? 0} 页面</span>
                      <span>·</span>
                      <span>{p.refs?.blocks?.length ?? 0} 模块</span>
                      <span>·</span>
                      <span>{p.refs?.components?.length ?? 0} 组件</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
