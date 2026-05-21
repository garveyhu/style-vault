import { PreviewFrame } from '../../../_layout';

const SHADOWS = [
  { name: 'soft', value: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', use: 'hover / 选中悬浮 · 28 处' },
  { name: 'card', value: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)', use: '卡片兜底' },
  { name: 'pop', value: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', use: 'Dialog / Popover / SearchPanel · 8 处' },
];

export default function SoftCardPopTrio() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · SHADOW</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 28px' }}>Soft / Card / Pop 三档阴影</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {SHADOWS.map(s => (
            <div key={s.name} style={{ background: '#fffefb', borderRadius: 12, padding: 24, border: '1px solid rgba(231,229,224,0.4)', boxShadow: s.value }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1917' }}>{s.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', marginTop: 8, lineHeight: 1.5 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 8 }}>{s.use}</div>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
