import { PreviewFrame } from '../../../_layout';

const COLORS = { running: '#10b981', error: '#f87171', stopped: '#d6d3d1', pending: '#e7e5e0' };

export default function SegmentedBlocks() {
  const samples = [
    { name: '财务对账', statuses: Array(8).fill('running') as Array<keyof typeof COLORS> },
    { name: '物联采集', statuses: [...Array(5).fill('running'), 'error', 'error', ...Array(3).fill('stopped')] as Array<keyof typeof COLORS> },
    { name: '日终批处理', statuses: [...Array(4).fill('running'), 'error', ...Array(8).fill('stopped'), ...Array(3).fill('pending')] as Array<keyof typeof COLORS> },
  ];

  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INDICATOR</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Segmented Blocks</h1>

        {samples.map(s => (
          <div key={s.name} style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1917', marginBottom: 8 }}>{s.name} <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a8a29e', marginLeft: 8 }}>{s.statuses.length}</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {s.statuses.map((st, i) => (
                <span key={i} style={{ display: 'inline-block', width: 14, height: 6, borderRadius: 1, background: COLORS[st] }} />
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12.5, color: '#44403c', marginBottom: 8 }}>ThreeSegmentBar 百分比聚合</div>
          <div style={{ display: 'flex', height: 6, borderRadius: 9999, overflow: 'hidden', background: '#f5f4ee' }}>
            <div style={{ width: '60%', background: '#10b981' }} />
            <div style={{ width: '30%', background: '#d6d3d1' }} />
            <div style={{ width: '10%', background: '#f87171' }} />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
