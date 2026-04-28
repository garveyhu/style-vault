import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { LoginModal } from './LoginModal';
import { searchPanel } from './SearchPanel';
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
      <div className="relative flex h-[72px] items-center gap-8 px-10">
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center" aria-label="Style Vault">
          <img
            src="/logo.svg"
            alt="Style Vault"
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/browse"
            className="sv-underline-tab pt-2.5"
            data-on={pathname === '/browse' || pathname.startsWith('/browse/')}
          >
            浏览
          </Link>
          <Link
            to="/products"
            className="sv-underline-tab pt-2.5"
            data-on={pathname === '/products' || pathname.startsWith('/products/')}
          >
            产品集
          </Link>
          <button
            type="button"
            onClick={() => searchPanel.open()}
            aria-label="搜索"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 text-[13px] font-medium text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
          >
            <SearchOutlined className="text-[14px]" />
            搜索风格
          </button>
        </nav>

        {/* 占位撑开左右 cluster；平台切换用 absolute 真正视口居中 */}
        <div className="flex-1" />
        {showPlatformPill && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-center md:flex">
            <div className="pointer-events-auto inline-flex items-baseline gap-7">
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
          </div>
        )}

        {/* 右侧：登录 / 头像 */}
        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              dropdownRender={() => (
                <div className="w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_48px_-16px_rgba(15,23,42,0.24)]">
                  {/* 头：avatar + 名字，点整块去 /profile */}
                  <button
                    type="button"
                    onClick={() => nav('/profile')}
                    className="flex w-full flex-col items-start gap-3 px-6 py-5 text-left transition hover:bg-slate-50"
                  >
                    <Avatar
                      src={user.avatar_url ?? undefined}
                      size={56}
                      className="border border-slate-200"
                    >
                      {user.name?.[0]?.toUpperCase() ?? 'U'}
                    </Avatar>
                    <span className="font-display text-[16px] font-bold text-slate-900">
                      {user.name}
                    </span>
                  </button>

                  <ul className="list-none border-t border-slate-100 p-1">
                    <li>
                      <button
                        type="button"
                        onClick={() => nav('/profile')}
                        className="w-full rounded-lg px-5 py-2.5 text-left text-[14px] font-medium text-slate-800 transition hover:bg-slate-50"
                      >
                        我的主页
                      </button>
                    </li>
                  </ul>

                  <ul className="list-none border-t border-slate-100 p-1">
                    <li>
                      <button
                        type="button"
                        onClick={() => logout()}
                        className="w-full rounded-lg px-5 py-2.5 text-left text-[14px] font-medium text-slate-800 transition hover:bg-slate-50"
                      >
                        退出登录
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            >
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:ring-2 hover:ring-slate-200 hover:ring-offset-2 hover:ring-offset-white"
                aria-label={user.name}
              >
                <Avatar src={user.avatar_url ?? undefined} size={36}>
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </Avatar>
                {/* 右下角绿点 · 在线指示 */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
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
