import { PreviewFrame } from '../../../_layout';

const NEON_CSS = `
.nv-ring {
  border-radius: 9999px;
  width: var(--neon-d, 16px);
  height: var(--neon-d, 16px);
  background: conic-gradient(from 90deg, transparent 0%, #8b5cf6 35%, #d946ef 55%, #22d3ee 75%, transparent 100%);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--neon-t, 2.5px)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--neon-t, 2.5px)), #000 0);
  filter: drop-shadow(0 0 3px rgba(139,92,246,.85)) drop-shadow(0 0 7px rgba(34,211,238,.5));
  animation: nv-spin 0.85s linear infinite;
}
@keyframes nv-spin { to { transform: rotate(360deg); } }
.nv-text {
  background: linear-gradient(90deg, #7c3aed, #d946ef, #22d3ee, #7c3aed);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: nv-shimmer 2.6s linear infinite;
  font-weight: 500;
  letter-spacing: 0.025em;
}
@keyframes nv-shimmer { to { background-position: 200% center; } }
.nv-glow {
  background: rgba(139,92,246,.05);
  box-shadow: 0 0 0 1px rgba(139,92,246,.22), 0 0 16px rgba(139,92,246,.14);
  animation: nv-breathe 2.4s ease-in-out infinite;
}
@keyframes nv-breathe {
  0%,100% { box-shadow: 0 0 0 1px rgba(139,92,246,.22), 0 0 12px rgba(139,92,246,.12); }
  50% { box-shadow: 0 0 0 1px rgba(217,70,239,.3), 0 0 20px rgba(34,211,238,.2); }
}
`;

const SIZES = [
  { name: 'xs', d: 12, t: 2, text: 11, label: '内联按钮' },
  { name: 'sm', d: 14, t: 2.25, text: 11.5, label: '紧凑' },
  { name: 'md', d: 16, t: 2.5, text: 12, label: '默认' },
  { name: 'lg', d: 24, t: 3.25, text: 13.5, label: '大面板' },
];

const NEON_SWATCHES = [
  { name: 'violet', hex: '#8b5cf6' },
  { name: 'violet-deep', hex: '#7c3aed' },
  { name: 'fuchsia', hex: '#d946ef' },
  { name: 'cyan', hex: '#22d3ee' },
];

function Ring({ d, t }: { d: number; t: number }) {
  return <span className="nv-ring" style={{ '--neon-d': `${d}px`, '--neon-t': `${t}px` } as React.CSSProperties} />;
}

export default function NeonAiSuite() {
  return (
    <PreviewFrame bg="#fafaf7">
      <style>{NEON_CSS}</style>
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          TOKEN · MOTION · SIGNATURE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Neon AI Loading Suite
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          长耗时 AI 任务专属：锥形渐变霓虹旋转环 + 流光渐变文字 + 容器呼吸辉光 · violet→fuchsia→cyan
        </p>

        {/* 主展示：glow 容器 + 环 + 流光文字 */}
        <Section title="完整三件套 · glow 容器 + 旋转环 + 流光文字">
          <div className="nv-glow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 8, padding: '6px 12px',
          }}>
            <Ring d={24} t={3.25} />
            <span className="nv-text" style={{ fontSize: 13.5 }}>评测进行中…</span>
          </div>
        </Section>

        {/* 内联（无 glow） */}
        <Section title="内联 · 无 glow">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Ring d={16} t={2.5} />
            <span className="nv-text" style={{ fontSize: 12 }}>正在扩样…</span>
          </div>
        </Section>

        {/* 尺寸档 */}
        <Section title="尺寸档 xs / sm / md / lg">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%' }}>
            {SIZES.map(s => (
              <div key={s.name} style={{
                borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', padding: 16,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 130,
                boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
              }}>
                <div style={{ minHeight: 28, display: 'grid', placeItems: 'center' }}>
                  <Ring d={s.d} t={s.t} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: '#1c1917' }}>{s.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', marginTop: 2 }}>
                    d{s.d} · t{s.t} · {s.text}px
                  </div>
                  <div style={{ fontSize: 10.5, color: '#a8a29e', marginTop: 3 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 霓虹三色锚点 */}
        <Section title="霓虹三色锚点（跨主题恒定）">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {NEON_SWATCHES.map(c => (
              <div key={c.name} style={{ minWidth: 100, flex: '0 1 120px' }}>
                <div style={{
                  background: c.hex, height: 56, borderRadius: 8, border: '1px solid rgb(0 0 0 / 8%)',
                  boxShadow: `0 0 12px ${c.hex}55`,
                }} />
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: '#1c1917' }}>{c.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}
