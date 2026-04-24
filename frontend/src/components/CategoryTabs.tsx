import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * 顶部分类 sticky 栏：产品 / 风格 / 页面 / 模块 / 组件 / 原语
 * 下滑时固定在 TopBar 下面，作为全站内容浏览的主导航。
 */
const TABS: Array<{ key: string; label: string; to: string }> = [
  { key: 'product', label: '产品', to: '/products' },
  { key: 'style', label: '风格', to: '/browse/style' },
  { key: 'page', label: '页面', to: '/browse/page' },
  { key: 'block', label: '模块', to: '/browse/block' },
  { key: 'component', label: '组件', to: '/browse/component' },
  { key: 'token', label: '原语', to: '/browse/token' },
];

export function CategoryTabs() {
  const location = useLocation();
  const activeKey = useMemo(() => {
    const p = location.pathname;
    if (p.startsWith('/products')) return 'product';
    const m = p.match(/^\/browse\/([^/?]+)/);
    return m ? m[1] : null; // 在 /browse 总览无激活项
  }, [location.pathname]);

  return (
    <div className="sticky top-[72px] z-40 bg-[#fafafa]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-8 py-3">
        {TABS.map((t) => {
          const on = t.key === activeKey;
          return (
            <NavLink
              key={t.key}
              to={t.to}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[14px] font-medium transition ${
                on
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;
