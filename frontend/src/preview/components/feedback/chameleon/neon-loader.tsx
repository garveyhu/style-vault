import { PreviewFrame } from '../../../_layout';

const SIZES = [
  { name: 'xs', d: 12, t: 2, text: 11 },
  { name: 'sm', d: 14, t: 2.25, text: 11.5 },
  { name: 'md', d: 16, t: 2.5, text: 12 },
  { name: 'lg', d: 24, t: 3.25, text: 13.5 },
];

function ring(d: number, t: number): React.CSSProperties {
  return {
    width: d,
    height: d,
    borderRadius: 9999,
    flexShrink: 0,
    background: 'conic-gradient(from 90deg, transparent 0%, #8b5cf6 35%, #d946ef 55%, #22d3ee 75%, transparent 100%)',
    WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${t}px), #000 0)`,
    mask: `radial-gradient(farthest-side, transparent calc(100% - ${t}px), #000 0)`,
    filter: 'drop-shadow(0 0 3px rgba(139,92,246,.85)) drop-shadow(0 0 7px rgba(34,211,238,.5))',
    animation: 'neon-spin .85s linear infinite',
  };
}

const textStyle = (fs: number): React.CSSProperties => ({
  fontWeight: 500,
  letterSpacing: '0.025em',
  fontSize: fs,
  background: 'linear-gradient(90deg, #7c3aed, #d946ef, #22d3ee, #7c3aed)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  animation: 'neon-shimmer 2.6s linear infinite',
});

export default function NeonLoader() {
  return (
    <PreviewFrame bg="#0c0a13">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#e7e5e0' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8b80a8' }}>COMPONENT · FEEDBACK · SIGNATURE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px', color: '#f5f4ee' }}>霓虹 AI Loader</h1>

        <Section title="4 档尺寸 (环 + 流光文案)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SIZES.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 24, fontSize: 11, color: '#8b80a8' }}>{s.name}</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 8 }}>
                  <span style={ring(s.d, s.t)} aria-hidden />
                  <span style={textStyle(s.text)}>评测进行中…</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="仅旋转环 (无文案)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {SIZES.map(s => (
              <span key={s.name} style={ring(s.d, s.t)} aria-hidden />
            ))}
          </div>
        </Section>

        <Section title="glow=true (呼吸辉光底 · 独立成块)">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 8,
              padding: '6px 12px',
              background: 'rgba(139,92,246,.05)',
              boxShadow: '0 0 0 1px rgba(139,92,246,.22), 0 0 16px rgba(139,92,246,.14)',
              animation: 'neon-breathe 2.4s ease-in-out infinite',
            }}
          >
            <span style={ring(16, 2.5)} aria-hidden />
            <span style={textStyle(12)}>正在分析对比结果…</span>
          </div>
        </Section>
      </div>
      <style>{`
        @keyframes neon-spin { to { transform: rotate(360deg) } }
        @keyframes neon-shimmer { to { background-position: 200% center } }
        @keyframes neon-breathe {
          0%, 100% { box-shadow: 0 0 0 1px rgba(139,92,246,.22), 0 0 12px rgba(139,92,246,.12) }
          50% { box-shadow: 0 0 0 1px rgba(217,70,239,.3), 0 0 20px rgba(34,211,238,.2) }
        }
      `}</style>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8b80a8', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
