import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';
import { useRegistry } from '../data/useRegistry';
import { GlossaryDrawer } from './GlossaryDrawer';

export function TopBar() {
  const reg = useRegistry();
  const count = reg?.items?.length ?? 0;
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Style Vault"
            className="h-9 w-9 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              Style Vault
            </span>
            <span className="text-[11px] text-slate-500">个人前端风格库</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>
            共 <b className="text-slate-900">{count}</b> 个风格
          </span>
          <button
            type="button"
            onClick={() => setGlossaryOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
          >
            <BookOutlined /> 术语表
          </button>
        </div>
      </div>
      <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
    </header>
  );
}

export default TopBar;
