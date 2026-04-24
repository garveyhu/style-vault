import { Navigate, useNavigate } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { StyleCard } from '../components/StyleCard';
import { useAuth } from '../auth/AuthContext';
import { useFavorites } from '../auth/FavoritesContext';

export default function FavoritesPage() {
  const reg = useRegistry();
  const { user, loading } = useAuth();
  const { set: favSet } = useFavorites();
  const nav = useNavigate();

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;
  if (loading) return null;
  if (!user) return <Navigate to="/browse" replace />;

  const items = reg.items.filter((i) => favSet.has(i.id));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1600px] px-8 py-12">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            <HeartFilled className="text-slate-900" />
            MY FAVORITES
          </div>
          <h1 className="mt-3 font-display text-[48px] font-semibold tracking-[-0.025em] text-slate-900">
            我的收藏
          </h1>
          <p className="mt-2 text-[14px] text-slate-500">
            共 {items.length} 个收藏。点卡片上的心形可以取消收藏。
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-8 py-12">
        {items.length === 0 ? (
          <div className="relative flex flex-col items-center gap-5 py-28">
            <div className="pointer-events-none absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-200/50 to-slate-200/50 blur-3xl sv-anim-breathe" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.15)]">
              <HeartFilled className="text-[32px] text-slate-300" />
            </div>
            <div className="relative text-center">
              <div className="font-display text-[22px] font-semibold text-slate-900">
                还没收藏任何风格
              </div>
              <div className="mt-1 text-[13px] text-slate-500">
                浏览风格库时，点卡片上的心形即可加入收藏
              </div>
            </div>
            <button
              type="button"
              onClick={() => nav('/browse')}
              className="relative h-10 rounded-full bg-slate-900 px-5 text-[13px] font-medium text-white transition hover:bg-slate-700"
            >
              去浏览
            </button>
          </div>
        ) : (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
            {items.map((item) => (
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
