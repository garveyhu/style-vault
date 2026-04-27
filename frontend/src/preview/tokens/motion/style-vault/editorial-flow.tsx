import { useEffect, useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const KEYFRAMES = `
@keyframes svflow-fade-up {
  from { opacity: 0; transform: translate3d(0,16px,0); }
  to   { opacity: 1; transform: translate3d(0,0,0); }
}
@keyframes svflow-underline {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
`;

export default function EditorialFlowPreview() {
  // 让 fade-up 序列每 6s 重放一次，方便预览页直观看
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeed((s) => s + 1), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          padding: '64px 56px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          tokens / motion / style-vault
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            marginBottom: 28,
          }}
        >
          Editorial Flow
        </div>

        {/* fade-up cascade demo */}
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            background: '#fff',
            padding: '40px 32px',
            marginBottom: 28,
          }}
          key={seed}
        >
          {[
            { delay: 0, label: 'kicker', text: 'STYLE VAULT · 风格库' },
            { delay: 150, label: '主标题', text: '为 AI 编码而造的设计风格库' },
            { delay: 300, label: '副文', text: '六个层级，六道清晰边界。' },
            { delay: 500, label: 'CTA', text: '进入风格库 →' },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                marginBottom: 16,
                opacity: 0,
                animation: `svflow-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${row.delay}ms forwards`,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: '#94a3b8',
                  width: 80,
                }}
              >
                +{row.delay}ms
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#cbd5e1',
                  width: 56,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: row.label === '主标题' ? 22 : 14,
                  fontWeight: row.label === '主标题' ? 600 : 400,
                  color: row.label === 'CTA' ? '#0f172a' : '#475569',
                }}
              >
                {row.text}
              </span>
            </div>
          ))}
        </div>

        {/* card lift demo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            marginBottom: 28,
          }}
        >
          <CardLift />
          <UnderlineDemo />
        </div>

        {/* spec table */}
        <SpecTable />
      </div>
    </PreviewFrame>
  );
}

function CardLift() {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 8,
        }}
      >
        卡片浮起 · hover 我
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: '#fff',
          border: '1px solid rgba(226,232,240,0.8)',
          borderRadius: 12,
          padding: 20,
          transition:
            'transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          transform: hover ? 'translate3d(0,-4px,0)' : 'translate3d(0,0,0)',
          boxShadow: hover
            ? '0 2px 6px -1px rgba(15,23,42,0.06), 0 14px 32px -10px rgba(15,23,42,0.22), 0 24px 48px -20px rgba(15,23,42,0.14)'
            : 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          薄荷分析
        </div>
        <div style={{ fontSize: 12, color: '#64748b' }}>
          translate −4px + 三层柔投影
        </div>
      </div>
    </div>
  );
}

function UnderlineDemo() {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 8,
        }}
      >
        Tab 下划线 · hover 我
      </div>
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(226,232,240,0.8)',
          borderRadius: 12,
          padding: 20,
        }}
      >
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: 'relative',
            display: 'inline-block',
            paddingBottom: 8,
            fontSize: 16,
            fontWeight: 500,
            color: hover ? '#0f172a' : '#94a3b8',
            cursor: 'pointer',
            transition: 'color 200ms ease',
          }}
        >
          风格
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              background: 'linear-gradient(90deg, #0891b2, #0f172a)',
              borderRadius: 2,
              transform: hover ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition:
                'transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          />
        </span>
      </div>
    </div>
  );
}

function SpecTable() {
  const rows = [
    ['signature easing', 'cubic-bezier(0.2, 0.7, 0.2, 1)'],
    ['blob easing', 'ease-in-out（仅 blob 漂移）'],
    ['toast easing', 'cubic-bezier(0.34, 1.56, 0.64, 1)（唯一回弹）'],
    ['fade-up duration', '900ms · 8 槽位 0/75/150/225/300/400/500/600'],
    ['card lift', 'translate3d(0,-4px,0) · 400ms · 三层柔投影'],
    ['preview hover scale', '1.05 · origin top center · 600ms'],
    ['tab underline', 'scaleX 0→1 · 320ms · linear-gradient cyan→slate-900'],
    ['text-link underline', 'scaleX 0.35→1 · 260ms'],
  ];
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 10,
        }}
      >
        Spec
      </div>
      {rows.map(([k, v]) => (
        <div
          key={k}
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 12,
            padding: '6px 0',
            borderBottom: '1px dashed #f1f5f9',
          }}
        >
          <span style={{ color: '#94a3b8', width: 180 }}>{k}</span>
          <span style={{ color: '#0f172a', fontFamily: MONO, fontSize: 11 }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}
