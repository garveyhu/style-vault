import { PreviewFrame } from '../../../_layout';

const BORDERS = [
  { name: 'stone-200/40', color: 'rgba(231,229,224,0.4)', use: '外框 Section / Article / Dialog · 19 文件' },
  { name: 'stone-200/60', color: 'rgba(231,229,224,0.6)', use: 'DataTable / Card · 10 文件' },
  { name: 'stone-200/70', color: 'rgba(231,229,224,0.7)', use: 'sidebar / topbar / modal · 13 文件' },
  { name: 'stone-100', color: '#f5f4ee', use: '内部分割 · 36 文件' },
  { name: 'stone-300', color: '#d6d3d1', use: '输入边 / Stepper 未激活' },
];

export default function TranslucentStoneSystem() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · BORDER</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 28px' }}>半透明 Stone 分层边框</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BORDERS.map(b => (
            <div key={b.name} style={{ background: '#fffefb', border: `1px solid ${b.color}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 80, height: 36, background: '#fffefb', border: `1px solid ${b.color}`, borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c' }}>{b.color}</div>
              </div>
              <div style={{ fontSize: 11, color: '#a8a29e' }}>{b.use}</div>
            </div>
          ))}
          <div style={{ background: '#fffefb', border: '2px dashed #d6d3d1', borderRadius: 12, padding: 16, marginTop: 8, textAlign: 'center', color: '#78716c', fontSize: 13 }}>
            border-2 border-dashed border-stone-200 · 仅空态 / "新建"按钮使用
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
