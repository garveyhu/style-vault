import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const TYPE_DOT: Record<string, string> = {
  product: '#a855f7',
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const SAMPLES = [
  {
    type: 'page',
    typeLabel: 'Page',
    name: '冷感工业落地页',
    desc: 'SaaS 营销落地骨架，Hero / Feature / Pricing / CTA',
    platforms: 'Web',
    height: 220,
    aesthetic: '极简',
    mood: '冷峻',
    bgGradient:
      'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
    badge: 'cyan',
  },
  {
    type: 'block',
    typeLabel: 'Block',
    name: '浮起作品行卡',
    desc: '宽行卡片 + 左侧浮起作品照',
    platforms: 'Web',
    height: 180,
    aesthetic: '编辑',
    mood: '平静',
    bgGradient:
      'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
    badge: 'slate',
  },
  {
    type: 'component',
    typeLabel: 'Component',
    name: '深色胶囊主 CTA',
    desc: 'rounded-full slate-900 + 深柔投影',
    platforms: 'Web',
    height: 160,
    aesthetic: '极简',
    mood: '自信',
    bgGradient: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
    badge: 'slate',
  },
  {
    type: 'token',
    typeLabel: 'Token',
    name: 'Slate × Cyan Cool',
    desc: 'slate 全阶 + cyan 单点 accent + #fafafa 页面底',
    platforms: 'Web',
    height: 160,
    aesthetic: '极简',
    mood: '冷峻',
    bgGradient: 'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)',
    badge: 'cyan',
  },
];

function Card({ s }: { s: (typeof SAMPLES)[number] }) {
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
          height: s.height,
          overflow: 'hidden',
          position: 'relative',
          background: '#f8fafc',
        }}
        // 缩略图内禁所有焦点 —— 部分预览组件带 autoFocus，
        // 否则懒加载渲染时浏览器会"scroll focused into view"，整页跳到末尾
        aria-hidden
        inert
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: s.bgGradient,
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transformOrigin: 'top center',
            transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: s.badge === 'cyan' ? '#67e8f9' : '#0f172a',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          {s.name}
        </div>
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
            {s.typeLabel}
            <span style={{ color: '#cbd5e1' }}>·</span>
            <span style={{ color: '#94a3b8' }}>{s.platforms}</span>
          </div>
          <span style={{ color: '#cbd5e1', fontSize: 13 }}>♡</span>
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#0f172a',
            marginBottom: 4,
            lineHeight: 1.35,
          }}
        >
          {s.name}
        </div>
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.5,
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          {s.desc}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {[s.aesthetic, s.mood].map((t) => (
            <span
              key={t}
              style={{
                background: '#f1f5f9',
                padding: '2px 8px',
                borderRadius: 4,
                fontSize: 10,
                color: '#475569',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PreviewThumbCardPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ padding: '64px 56px', fontFamily: SANS, color: '#0f172a' }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          blocks / display / style-vault
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            marginBottom: 8,
          }}
        >
          Preview Thumb Card
        </div>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 32 }}>
          hover 试试 —— 卡片浮起 + 内容缩放
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {SAMPLES.map((s) => (
            <Card key={s.name} s={s} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
