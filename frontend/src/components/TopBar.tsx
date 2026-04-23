import { Link } from 'react-router-dom';
import { useRegistry } from '../data/useRegistry';

export function TopBar() {
  const registry = useRegistry();
  const count = Array.isArray(registry.items) ? registry.items.length : 0;

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="flex items-center gap-2 no-underline text-gray-900">
        <span
          className="inline-block w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-500"
          aria-hidden
        />
        <span className="text-lg font-semibold">Style Vault</span>
      </Link>
      <div className="text-sm text-gray-500">总条目数：{count}</div>
    </header>
  );
}

export default TopBar;
