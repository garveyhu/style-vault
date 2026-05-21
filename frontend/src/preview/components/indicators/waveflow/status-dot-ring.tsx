import { PreviewFrame } from '../../../_layout';

const STATES = [
  { status: 'running', color: '#10b981', ring: 'rgb(16 185 129 / 15%)', label: '运行中', textCls: '#059669' },
  { status: 'stopped', color: '#d6d3d1', ring: undefined, label: '已停止', textCls: '#78716c' },
  { status: 'error', color: '#ef4444', ring: 'rgb(239 68 68 / 18%)', label: '异常', textCls: '#dc2626' },
  { status: 'pending', color: '#d6d3d1', ring: undefined, label: '待运行', textCls: '#78716c' },
];

export default function StatusDotRing() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INDICATOR</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Status Dot Ring</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {STATES.map(s => (
            <div key={s.status} style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: s.textCls }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: s.color, boxShadow: s.ring ? `0 0 0 2px ${s.ring}` : undefined }} />
                {s.label}
              </span>
              <div style={{ flex: 1 }} />
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#78716c' }}>.status-dot-{s.status}</code>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 12, color: '#a8a29e' }}>
          7px 圆 + 2px 半透色 ring · running emerald 15% / stopped 无 ring / error red 18%
        </div>
      </div>
    </PreviewFrame>
  );
}
