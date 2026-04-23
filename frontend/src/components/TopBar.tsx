import { Link } from 'react-router-dom';
import { useRegistry } from '../data/useRegistry';

export function TopBar() {
  const reg = useRegistry();
  const count = reg?.items?.length ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Style Vault"
            className="h-8 w-8 rounded-lg shadow-sm transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              Style Vault
            </span>
            <span className="text-[11px] text-slate-500">个人前端风格库</span>
          </div>
        </Link>

        <div className="flex items-center gap-6 text-sm text-slate-600">
          <span>
            共 <b className="text-slate-900">{count}</b> 个风格
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
