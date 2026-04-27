import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const PRODUCTS = [
  {
    name: 'Style Vault',
    category: '设计',
    dot: '#6366f1',
    desc: '为 AI 编码而造的设计风格库——六个层级，六道清晰边界。',
    platform: 'Web',
    counts: { pages: 3, blocks: 5, components: 4 },
    coverGradient:
      'linear-gradient(135deg, #cffafe 0%, #fff 40%, #e2e8f0 100%)',
    coverLabel: '冷感漂浮 Hero',
  },
  {
    name: 'Acme · 冷感工业 SaaS',
    category: '效率工具',
    dot: '#a855f7',
    desc: '冷感工业型监控 SaaS——把注意力留给数据本身，等宽数字 / 状态脉冲 / 零装饰。',
    platform: 'Web',
    counts: { pages: 5, blocks: 4, components: 4 },
    coverGradient:
      'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    coverLabel: 'KPI 网格',
    darkCover: true,
  },
];

function Row({ p }: { p: (typeof PRODUCTS)[number] }) {
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
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr' }}>
        {/* cover */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, rgba(241,245,249,0.6) 100%)',
            height: 220,
          }}
        >
          {/* floated white card */}
          <div
            style={{
              width: '92%',
              height: '86%',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              boxShadow: '0 8px 24px -10px rgba(15,23,42,0.22)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: p.coverGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: p.darkCover ? '#67e8f9' : '#0f172a',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: SANS,
                letterSpacing: '0.05em',
              }}
            >
              {p.coverLabel}
            </div>
          </div>
        </div>

        {/* info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 24,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    background: p.dot,
                  }}
                />
                {p.category}
                <span style={{ color: '#cbd5e1' }}>·</span>
                <span style={{ color: '#94a3b8' }}>{p.platform}</span>
              </div>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>♡</span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                color: '#0f172a',
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                lineHeight: 1.5,
                color: '#475569',
              }}
            >
              {p.desc}
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              fontSize: 11,
              color: '#94a3b8',
              fontFamily: MONO,
              letterSpacing: '0.05em',
            }}
          >
            <span>
              PAGES <span style={{ color: '#334155' }}>{p.counts.pages}</span>
            </span>
            <span>
              BLOCKS{' '}
              <span style={{ color: '#334155' }}>{p.counts.blocks}</span>
            </span>
            <span>
              COMPONENTS{' '}
              <span style={{ color: '#334155' }}>{p.counts.components}</span>
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 12,
                color: '#0f172a',
                fontFamily: SANS,
              }}
            >
              查看 →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FloatingCoverRowPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ padding: '56px 56px', fontFamily: SANS, color: '#0f172a' }}>
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
            marginBottom: 32,
          }}
        >
          Floating Cover Row
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PRODUCTS.map((p) => (
            <Row key={p.name} p={p} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
