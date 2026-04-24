import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * 浏览分类 sticky 栏：风格 / 页面 / 模块 / 组件 / 原语
 * 下滑时固定在 TopBar 下面。产品集是独立入口，不放在这里。
 * 视觉：Editorial 大字下划线 —— 16px 字、2px 下划线 scaleX 动画。
 */
const TABS: Array<{ key: string; label: string; to: string }> = [
  { key: 'style', label: '风格', to: '/browse/style' },
  { key: 'page', label: '页面', to: '/browse/page' },
  { key: 'block', label: '模块', to: '/browse/block' },
  { key: 'component', label: '组件', to: '/browse/component' },
  { key: 'token', label: '原语', to: '/browse/token' },
];

export function CategoryTabs() {
  const location = useLocation();
  const activeKey = useMemo(() => {
    const m = location.pathname.match(/^\/browse\/([^/?]+)/);
    return m ? m[1] : null; // 在 /browse 总览无激活项
  }, [location.pathname]);

  return (
    <div className="sticky top-[72px] z-40 bg-[#fafafa]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-baseline gap-8 overflow-x-auto px-8 pt-5">
        {TABS.map((t) => {
          const on = t.key === activeKey;
          return (
            <NavLink
              key={t.key}
              to={t.to}
              className="sv-underline-tab sv-underline-tab--lg shrink-0"
              data-on={on}
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
