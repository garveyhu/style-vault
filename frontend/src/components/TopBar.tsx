import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { LoginModal } from './LoginModal';
import { useAuth } from '../auth/AuthContext';
import { usePlatform, type PlatformSel } from '../contexts/PlatformContext';

const PLATFORM_LABEL: Record<PlatformSel, string> = {
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
};

function shouldShowPlatformPill(pathname: string): boolean {
  if (pathname === '/browse') return true;
  if (pathname.startsWith('/browse/')) return true;
  if (pathname === '/products') return true;
  return false;
}

export function TopBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { platform, setPlatform } = usePlatform();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const showPlatformPill = shouldShowPlatformPill(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[72px] max-w-[1600px] items-center gap-8 px-8">
        {/* Logo + 简洁中文站名 */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <img
            src="/logo.svg"
            alt="Style Vault"
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-[22px] font-semibold tracking-tight text-slate-900">
            Style Vault
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/browse"
            className="text-[13px] font-medium text-slate-600 transition hover:text-slate-900"
          >
            浏览
          </Link>
          <Link
            to="/products"
            className="text-[13px] font-medium text-slate-600 transition hover:text-slate-900"
          >
            产品集
          </Link>
        </nav>

        {/* 居中：设备端切换（只在 browse/products 类路径显示）—— Editorial 下划线 */}
        <div className="flex flex-1 justify-center">
          {showPlatformPill && (
            <div className="hidden items-baseline gap-7 md:inline-flex">
              {(['web', 'ios', 'android'] as const).map((p) => {
                const on = platform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className="sv-underline-tab"
                    data-on={on}
                  >
                    {PLATFORM_LABEL[p]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 右侧：收藏 + 登录 */}
        <div className="flex items-center gap-2">
          {user && (
            <button
              type="button"
              onClick={() => nav('/favorites')}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="我的收藏"
              title="我的收藏"
            >
              <HeartOutlined className="text-[16px]" />
            </button>
          )}

          {loading ? null : user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'email',
                    label: (
                      <span className="text-xs text-slate-400">{user.email}</span>
                    ),
                    disabled: true,
                  },
                  { type: 'divider' },
                  { key: 'favorites', label: '我的收藏', onClick: () => nav('/favorites') },
                  { key: 'logout', label: '退出登录', onClick: () => logout() },
                ],
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 transition hover:border-slate-300"
              >
                <Avatar src={user.avatar_url ?? undefined} size={28}>
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </Avatar>
                <span className="hidden text-[13px] text-slate-700 md:inline">
                  {user.name}
                </span>
              </button>
            </Dropdown>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="h-9 rounded-full bg-slate-900 px-5 text-[13px] font-medium text-white transition hover:bg-slate-700"
            >
              登录
            </button>
          )}
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}

export default TopBar;
