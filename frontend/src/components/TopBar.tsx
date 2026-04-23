import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { BookOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { GlossaryDrawer } from './GlossaryDrawer';
import { LoginModal } from './LoginModal';
import { useAuth } from '../auth/AuthContext';

type TopBarProps = {
  search?: string;
  onSearchChange?: (v: string) => void;
};

export function TopBar({ search, onSearchChange }: TopBarProps = {}) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user, logout, loading } = useAuth();

  const searchable = typeof onSearchChange === 'function';

  // 展开搜索时自动聚焦
  useEffect(() => {
    if (searchOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [searchOpen]);

  // ESC 收起 / Cmd+K 展开
  useEffect(() => {
    if (!searchable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchable, searchOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-6 px-8">
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <img
            src="/logo.svg"
            alt="Style Vault"
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[20px] font-semibold tracking-tight text-slate-900">
              Style Vault
            </span>
            <span className="text-[11px] tracking-wide text-slate-400">
              personal frontend style library
            </span>
          </div>
        </Link>

        {/* 中间留白，editorial 感 */}
        <div className="flex-1" />

        {/* 右侧 action */}
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-3 pr-1 shadow-sm transition">
                  <SearchOutlined className="text-slate-400" />
                  <input
                    ref={inputRef}
                    value={search ?? ''}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="搜索名称、描述、ID…"
                    className="h-9 w-[260px] bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange?.('');
                      setSearchOpen(false);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="关闭搜索"
                  >
                    <CloseOutlined className="text-[12px]" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
                  aria-label="搜索"
                >
                  <SearchOutlined />
                  <span className="hidden md:inline">搜索</span>
                  <kbd className="hidden items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[10px] text-slate-400 md:inline-flex">
                    ⌘K
                  </kbd>
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setGlossaryOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            <BookOutlined /> <span className="hidden md:inline">术语表</span>
          </button>

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
                  { key: 'logout', label: '退出登录', onClick: () => logout() },
                ],
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 transition hover:border-violet-300"
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
              className="h-9 rounded-full bg-slate-900 px-4 text-[13px] text-white transition hover:bg-slate-700"
            >
              登录
            </button>
          )}
        </div>
      </div>
      <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}

export default TopBar;
