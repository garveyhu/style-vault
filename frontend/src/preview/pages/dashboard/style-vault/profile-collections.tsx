import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const TYPE_DOT: Record<string, string> = {
  product: '#a855f7',
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const TABS = [
  { type: 'product', label: '产品', count: 2 },
  { type: 'style', label: '风格', count: 3 },
  { type: 'page', label: '页面', count: 4 },
  { type: 'block', label: '模块', count: 2 },
  { type: 'component', label: '组件', count: 1 },
];

const SAMPLES = [
  { type: 'product', name: 'Acme · 冷感工业 SaaS', desc: '冷感工业型监控 SaaS' },
  { type: 'product', name: 'Style Vault', desc: '为 AI 编码而造的设计风格库' },
  { type: 'style', name: '冷感 Editorial 设计目录站', desc: '#fafafa 浅底 · slate × cyan' },
  { type: 'style', name: '冷感工业 SaaS', desc: 'IBM Plex 双字体 + 几何切割' },
  { type: 'style', name: '社区暖调', desc: 'teal pill + 软圆角 + 毛玻璃 nav' },
  { type: 'page', name: 'Editorial 冷调落地', desc: 'Hero + Logo 墙 + 3 段叙事' },
  { type: 'page', name: 'Sticky TOC 详情', desc: 'Cover hero + masonry 分段' },
  { type: 'page', name: '类目行浏览', desc: '双 sticky 导航 + 每类一行' },
  { type: 'page', name: 'SaaS Landing', desc: 'Hero / Feature / Pricing / CTA' },
  { type: 'block', name: '冷感漂浮 Hero', desc: '双 blob + fade-up cascade' },
  { type: 'block', name: '浮起作品行卡', desc: '渐变底盒 + 浮起白卡' },
  { type: 'component', name: '深色胶囊主 CTA', desc: 'slate-900 rounded-full' },
];

export default function ProfileCollectionsPreview() {
  const [tab, setTab] = useState('product');
  const [editOpen, setEditOpen] = useState(false);
  const items = SAMPLES.filter((s) => s.type === tab);

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* Topbar (mock for context) */}
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
              fontFamily: MONO,
              fontWeight: 600,
            }}
          >
            SV
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>
            浏览
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>
            产品集
          </span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #67e8f9, #1e293b)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              position: 'relative',
            }}
          >
            L
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #fff',
              }}
            />
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: '#fff' }}>
          <div
            style={{
              maxWidth: 1700,
              margin: '0 auto',
              padding: '48px 48px 40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #67e8f9, #1e293b)',
                border: '1px solid #e2e8f0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: 40,
              }}
            >
              L
            </div>
            <h1
              style={{
                marginTop: 20,
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Links
            </h1>
            <p style={{ marginTop: 6, fontSize: 14, color: '#94a3b8' }}>
              archeruuu@gmail.com
            </p>
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <button
                onClick={() => setEditOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 40,
                  padding: '0 20px',
                  borderRadius: 9999,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                ✎ 编辑资料
              </button>
              <button
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ⋯
              </button>
            </div>
          </div>
        </section>

        {/* Sticky tab */}
        <div
          style={{
            position: 'sticky',
            top: 64,
            zIndex: 10,
            borderBottom: '1px solid #e2e8f0',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              maxWidth: 1700,
              margin: '0 auto',
              padding: '0 48px',
            }}
          >
            <nav
              style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            >
              {TABS.map((t) => {
                const on = tab === t.type;
                return (
                  <button
                    key={t.type}
                    onClick={() => setTab(t.type)}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '16px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 15,
                      fontWeight: on ? 600 : 500,
                      color: on ? '#0f172a' : '#64748b',
                      fontFamily: SANS,
                    }}
                  >
                    {t.label}
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: on ? '#94a3b8' : '#cbd5e1',
                      }}
                    >
                      {t.count}
                    </span>
                    {on && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: -1,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: '#0f172a',
                          borderTopLeftRadius: 2,
                          borderTopRightRadius: 2,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Grid */}
        <main
          style={{ maxWidth: 1700, margin: '0 auto', padding: '40px 48px 80px' }}
        >
          {items.length === 0 ? (
            <Empty />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {items.map((s, i) => (
                <Card key={i} s={s} />
              ))}
            </div>
          )}
        </main>

        {editOpen && (
          <EditModal onClose={() => setEditOpen(false)} />
        )}
      </div>
    </PreviewFrame>
  );
}

function Card({ s }: { s: { type: string; name: string; desc: string } }) {
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
          height: 180,
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
        {s.name}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
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
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: TYPE_DOT[s.type],
              }}
            />
            {s.type}
          </div>
          <span style={{ color: '#0f172a', fontSize: 13 }}>♥</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
          {s.name}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
          {s.desc}
        </div>
      </div>
    </article>
  );
}

function Empty() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: '80px 0',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          background: '#fff',
          boxShadow: '0 8px 30px -8px rgba(15,23,42,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#cbd5e1',
          fontSize: 32,
        }}
      >
        ♥
      </div>
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.015em',
          }}
        >
          还没收藏任何风格
        </div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#64748b' }}>
          浏览风格库时，点卡片上的心形即可加入收藏
        </div>
      </div>
      <button
        style={{
          height: 40,
          padding: '0 20px',
          background: '#0f172a',
          color: '#fff',
          border: 'none',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: SANS,
        }}
      >
        去浏览 →
      </button>
    </div>
  );
}

function EditModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.4)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          background: '#fff',
          borderRadius: 16,
          padding: '24px 24px',
          boxShadow: '0 32px 64px -20px rgba(15,23,42,0.4)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.015em',
          }}
        >
          编辑资料
        </h2>
        <label style={{ display: 'block', marginTop: 24 }}>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#94a3b8',
            }}
          >
            名字
          </span>
          <input
            defaultValue="Links"
            autoFocus
            style={{
              marginTop: 8,
              display: 'block',
              width: '100%',
              height: 44,
              padding: '0 12px',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontFamily: SANS,
              fontSize: 14,
              color: '#0f172a',
              outline: 'none',
            }}
          />
        </label>
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              height: 40,
              padding: '0 16px',
              border: '1.5px solid #cbd5e1',
              background: '#fff',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: '#334155',
              cursor: 'pointer',
              fontFamily: SANS,
            }}
          >
            取消
          </button>
          <button
            style={{
              height: 40,
              padding: '0 20px',
              background: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: SANS,
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
