import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const TYPE_DOT: Record<string, string> = {
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const ROWS = [
  { type: 'style', label: '风格', items: ['冷感 Editorial', 'Cold Industrial'] },
  {
    type: 'page',
    label: '页面',
    items: ['Hero 落地页', 'Sticky TOC 详情', 'Category 浏览', 'Detail 预览'],
  },
  {
    type: 'block',
    label: '模块',
    items: ['Cool Blob Hero', 'Preview Card', 'Floating Row', 'Browser Frame'],
  },
  {
    type: 'component',
    label: '组件',
    items: ['Dark Pill CTA', 'Ghost CTA', 'Meta Pill', 'Underline Tab'],
  },
  {
    type: 'token',
    label: '原语',
    items: ['Slate Cyan', 'Inter Display', 'Blob Decor', 'Editorial Flow'],
  },
];

const TABS = ['总览', '风格', '页面', '模块', '组件', '原语'];

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        padding: 0,
        paddingBottom: 14,
        fontFamily: SANS,
        fontSize: 16,
        fontWeight: 500,
        color: active ? '#0f172a' : '#94a3b8',
        cursor: 'pointer',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0891b2, #0f172a)',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </button>
  );
}

/**
 * TopBar 主导航 tab · 复用 sv-underline-tab 13px 小档 + 对称 padding 视觉居中
 * 真实环境跟随 pathname 激活；预览里写死 active 演示
 */
function NavTab({ label, active }: { label: string; active: boolean }) {
  return (
    <a
      style={{
        position: 'relative',
        fontFamily: SANS,
        fontSize: 13,
        fontWeight: 500,
        color: active ? '#0f172a' : '#94a3b8',
        letterSpacing: '0.02em',
        paddingTop: 10,
        paddingBottom: 10,
        cursor: 'pointer',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0891b2, #0f172a)',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </a>
  );
}

function MoreLink() {
  const [hov, setHov] = useState(false);
  return (
    <a
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 500,
        color: '#0f172a',
        cursor: 'pointer',
        paddingBottom: 2,
      }}
    >
      查看更多
      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          transition: 'transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          transform: hov ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        →
      </span>
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: '#0f172a',
          transform: hov ? 'scaleX(1)' : 'scaleX(0.35)',
          transformOrigin: 'left center',
          transition: 'transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </a>
  );
}

function MiniCard({ type, label }: { type: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: '1px solid rgba(226,232,240,0.8)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition:
          'transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        transform: hov ? 'translate3d(0,-4px,0)' : 'translate3d(0,0,0)',
        boxShadow: hov
          ? '0 2px 6px -1px rgba(15,23,42,0.06), 0 14px 32px -10px rgba(15,23,42,0.22), 0 24px 48px -20px rgba(15,23,42,0.14)'
          : 'none',
      }}
    >
      <div
        style={{
          height: 160,
          background:
            'linear-gradient(135deg, #cffafe 0%, #fff 50%, #f1f5f9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0f172a',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div style={{ padding: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#64748b',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: TYPE_DOT[type],
            }}
          />
          {type}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
          {label}
        </div>
      </div>
    </article>
  );
}

export default function CategoryRowBrowsePreview() {
  // 6 tab：/browse 时激活「总览」；/browse/:type 时激活对应类型 tab —— 永远有锚点
  const [activeTab, setActiveTab] = useState('总览');
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* TopBar */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid #f1f5f9',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(18px)',
            display: 'flex',
            alignItems: 'center',
            height: 72,
            padding: '0 40px',
            gap: 32,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #0891b2, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'ui-monospace, monospace',
              fontWeight: 600,
            }}
          >
            SV
          </div>
          {/* 主导航：路径激活下划线 nav · 这页是 /browse 所以「浏览」激活 */}
          <NavTab label="浏览" active />
          <NavTab label="产品集" active={false} />
          <div style={{ flex: 1 }} />
          <button
            style={{
              height: 36,
              padding: '0 20px',
              background: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            登录
          </button>
        </header>

        {/* CategoryTabs */}
        <div
          style={{
            position: 'sticky',
            top: 72,
            zIndex: 40,
            background: 'rgba(250,250,250,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            gap: 32,
            padding: '20px 40px 0',
          }}
        >
          {TABS.map((t) => (
            <Tab
              key={t}
              label={t}
              active={activeTab === t}
              onClick={() => setActiveTab(t)}
            />
          ))}
        </div>

        {/* Rows */}
        <main style={{ padding: '40px 40px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {ROWS.map((r) => (
              <section key={r.type}>
                <header
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    Web {r.label}
                  </h2>
                  <MoreLink />
                </header>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${r.items.length}, minmax(0, 1fr))`,
                    gap: 16,
                  }}
                >
                  {r.items.map((item) => (
                    <MiniCard key={item} type={r.type} label={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </PreviewFrame>
  );
}
