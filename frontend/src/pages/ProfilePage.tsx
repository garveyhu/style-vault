import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { EditOutlined, MoreOutlined, HeartFilled } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { StyleCard } from '../components/StyleCard';
import { useAuth } from '../auth/AuthContext';
import { useFavorites } from '../auth/FavoritesContext';

type TabKey = 'collections' | 'about';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'collections', label: '收藏' },
  { key: 'about', label: '关于' },
];

export default function ProfilePage() {
  const reg = useRegistry();
  const { user, loading, logout } = useAuth();
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const tabFromUrl = (params.get('tab') as TabKey) ?? 'collections';
  const [tab, setTab] = useState<TabKey>(
    TABS.some((t) => t.key === tabFromUrl) ? tabFromUrl : 'collections',
  );

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;
  if (loading) return null;
  if (!user) return <Navigate to="/browse" replace />;

  const selectTab = (k: TabKey) => {
    setTab(k);
    setParams({ tab: k });
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* Hero：居中 avatar + 名字 + 邮箱 + Edit + ... */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-8 pb-8 pt-12 text-center">
          <Avatar
            src={user.avatar_url ?? undefined}
            size={96}
            className="mx-auto border border-slate-200"
          >
            {user.name?.[0]?.toUpperCase() ?? 'U'}
          </Avatar>

          <h1 className="mt-5 font-display text-[32px] font-bold tracking-tight text-slate-900">
            {user.name}
          </h1>
          <p className="mt-1.5 text-[14px] text-slate-400">{user.email}</p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <EditOutlined />
              编辑资料
            </button>
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              menu={{
                items: [
                  { key: 'logout', label: '退出登录', onClick: () => logout() },
                ],
              }}
            >
              <button
                type="button"
                aria-label="更多"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <MoreOutlined />
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Tab nav */}
        <div className="mx-auto max-w-[1200px] border-b border-slate-200 px-8">
          <nav className="flex items-center gap-1">
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => selectTab(t.key)}
                  className={`relative px-4 py-3.5 text-[15px] font-semibold transition ${
                    active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`inline-flex rounded-lg px-3 py-1.5 transition ${
                      active ? 'bg-slate-100' : ''
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Tab content */}
      <main className="mx-auto max-w-[1200px] px-8 py-10">
        {tab === 'collections' && <CollectionsTab nav={nav} />}
        {tab === 'about' && <AboutTab />}
      </main>
    </div>
  );
}

function CollectionsTab({ nav }: { nav: (to: string) => void }) {
  const reg = useRegistry();
  const { set: favSet } = useFavorites();
  if (isRegistryMissing(reg)) return null;
  const items = reg.items.filter((i) => favSet.has(i.id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.15)]">
          <HeartFilled className="text-[32px] text-slate-300" />
        </div>
        <div>
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
          className="h-10 rounded-full bg-slate-900 px-5 text-[13px] font-medium text-white transition hover:bg-slate-700"
        >
          去浏览
        </button>
      </div>
    );
  }

  return (
    <div
      className="grid justify-start gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 400px))',
      }}
    >
      {items.map((item) => (
        <StyleCard
          key={item.id}
          item={item}
          onClick={() => {
            if (item.type === 'product') {
              const slug = item.id.replace(/^products\//, '');
              nav(`/products/${slug}`);
            } else {
              nav(`/item/${item.id}`);
            }
          }}
        />
      ))}
    </div>
  );
}

function AboutTab() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="mx-auto max-w-[640px] rounded-2xl border border-slate-200 bg-white p-8">
      <dl className="divide-y divide-slate-100 text-[14px]">
        <Row label="名字" value={user.name} />
        <Row label="邮箱" value={user.email} />
        <Row label="账号 ID" value={`#${user.id}`} />
      </dl>
      <p className="mt-6 text-[12px] text-slate-400">
        资料字段后续可扩展——简介、所在地、站点、社交等。
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
