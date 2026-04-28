import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Dropdown, Modal } from 'antd';
import { EditOutlined, MoreOutlined, HeartFilled } from '@ant-design/icons';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { StyleCard } from '../components/StyleCard';
import { ResponsiveGrid } from '../components/ResponsiveGrid';
import { toast } from '../components/Toast';
import { useAuth } from '../auth/AuthContext';
import { useFavorites } from '../auth/FavoritesContext';
import { typeLabel } from '../utils/taxonomy';
import { useCols } from '../hooks/useCols';
import { useInfiniteList } from '../hooks/useInfiniteList';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

const TYPE_ORDER: RegistryItem['type'][] = [
  'product',
  'style',
  'page',
  'block',
  'component',
  'token',
];

export default function ProfilePage() {
  const reg = useRegistry();
  const { user, loading, logout } = useAuth();
  const nav = useNavigate();
  const [editOpen, setEditOpen] = useState(false);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;
  if (loading) return null;
  if (!user) return <Navigate to="/browse" replace />;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1700px] px-8 pb-10 pt-12 text-center sm:px-12">
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
              onClick={() => setEditOpen(true)}
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
      </section>

      <Collections nav={nav} />

      <EditProfileModal
        open={editOpen}
        currentName={user.name}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
}

function EditProfileModal({
  open,
  currentName,
  onClose,
}: {
  open: boolean;
  currentName: string;
  onClose: () => void;
}) {
  const { updateProfile } = useAuth();
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);

  // 每次打开时同步当前名字
  useEffect(() => {
    if (open) setName(currentName);
  }, [open, currentName]);

  const handleSave = async () => {
    const next = name.trim();
    if (!next) {
      toast.error('名字不能为空');
      return;
    }
    if (next === currentName) {
      onClose();
      return;
    }
    setSaving(true);
    try {
      await updateProfile(next);
      toast.success('资料已更新');
      onClose();
    } catch (e) {
      const msg = e instanceof Error ? e.message : '保存失败';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      destroyOnClose
    >
      <div className="px-2 py-2">
        <h2 className="font-display text-[20px] font-semibold text-slate-900">
          编辑资料
        </h2>

        <label className="mt-5 block">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            名字
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={64}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !saving) handleSave();
            }}
            className="mt-2 block h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-900 transition focus:border-slate-900 focus:outline-none focus:ring-0"
          />
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:opacity-60"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-10 rounded-lg bg-slate-900 px-5 text-[13px] font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
          >
            {saving ? '保存中…' : '保存'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Collections({ nav }: { nav: (to: string) => void }) {
  const reg = useRegistry();
  const { set: favSet } = useFavorites();
  const [params, setParams] = useSearchParams();

  const groups = useMemo(() => {
    if (isRegistryMissing(reg)) return [];
    const items = reg.items.filter((i) => favSet.has(i.id));
    const byType: Partial<Record<RegistryItem['type'], RegistryItem[]>> = {};
    items.forEach((it) => {
      (byType[it.type] ??= []).push(it);
    });
    return TYPE_ORDER.map((t) => ({ type: t, items: byType[t] ?? [] })).filter(
      (g) => g.items.length > 0,
    );
  }, [reg, favSet]);

  // 当前 tab：URL ?tab=xxx 优先；URL 无值或 tab 已不存在时落到第一个非空分组
  const tabFromUrl = params.get('tab') as RegistryItem['type'] | null;
  const validTab =
    tabFromUrl && groups.some((g) => g.type === tabFromUrl)
      ? tabFromUrl
      : (groups[0]?.type ?? null);
  const [activeTab, setActiveTab] = useState<RegistryItem['type'] | null>(
    validTab,
  );

  // groups 变化（如取消最后一项收藏）时同步 tab
  useEffect(() => {
    if (!validTab) return;
    if (activeTab !== validTab && !groups.some((g) => g.type === activeTab)) {
      setActiveTab(validTab);
    }
  }, [validTab, activeTab, groups]);

  if (isRegistryMissing(reg)) return null;

  if (groups.length === 0) {
    return (
      <main className="mx-auto max-w-[1700px] px-8 py-12 sm:px-12">
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
      </main>
    );
  }

  const handleClick = (item: RegistryItem) => {
    if (item.type === 'product') {
      const slug = item.id.replace(/^products\//, '');
      nav(`/products/${slug}`);
    } else {
      nav(`/item/${item.id}`);
    }
  };

  const selectTab = (t: RegistryItem['type']) => {
    setActiveTab(t);
    setParams({ tab: t });
  };

  const current = groups.find((g) => g.type === activeTab) ?? groups[0];

  return (
    <>
      {/* Tab nav · A 下划线极简 */}
      <div className="sticky top-[64px] z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-[1700px] px-8 sm:px-12">
          <nav className="flex items-center gap-8 overflow-x-auto">
            {groups.map((g) => {
              const active = g.type === current.type;
              return (
                <button
                  key={g.type}
                  type="button"
                  onClick={() => selectTab(g.type)}
                  className={`relative flex shrink-0 items-center gap-2 py-4 text-[15px] transition ${
                    active
                      ? 'font-semibold text-slate-900'
                      : 'font-medium text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {typeLabel[g.type]}
                  <span
                    className={`font-mono text-[12px] tabular-nums ${
                      active ? 'text-slate-400' : 'text-slate-300'
                    }`}
                  >
                    {g.items.length}
                  </span>
                  {active && (
                    <span
                      className="absolute -bottom-px left-0 right-0 h-[2px] rounded-t bg-slate-900"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1700px] px-8 py-10 sm:px-12">
        <FavGrid items={current.items} cacheKey={`profile:fav:${current.type}`} onClick={handleClick} />
      </main>
    </>
  );
}

/** 收藏栏懒加载 grid · sentinel 触底前 300px 自动追加下一批 */
function FavGrid({
  items,
  cacheKey,
  onClick,
}: {
  items: RegistryItem[];
  cacheKey: string;
  onClick: (item: RegistryItem) => void;
}) {
  const cols = useCols();
  const { visible, sentinelRef, hasMore, visibleCount, total } = useInfiniteList(
    items,
    cols,
    { rowsPerPage: 4, cacheKey },
  );
  return (
    <div style={{ overflowAnchor: 'none' }}>
      <ResponsiveGrid mode="fixed" min={300} gap={20} style={{ overflowAnchor: 'none' }}>
        {visible.map((item) => (
          <StyleCard key={item.id} item={item} onClick={() => onClick(item)} />
        ))}
      </ResponsiveGrid>
      {hasMore ? (
        <>
          <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
          <div className="mt-8 flex items-center justify-center">
            <span className="text-[11px] text-slate-400 font-medium tracking-[0.18em] uppercase">
              {visibleCount} / {total}
            </span>
          </div>
        </>
      ) : (
        total > 0 && (
          <div className="mt-12 flex items-center justify-center">
            <span className="text-[11px] text-slate-300 font-medium tracking-[0.18em] uppercase">
              · {total} · End ·
            </span>
          </div>
        )
      )}
    </div>
  );
}
