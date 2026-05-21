import { PreviewFrame } from '../../../_layout';

const MODES = ['每 N 分钟', '每小时', '每天', '每周', '每月'];

export default function CronBuilderModal() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 520, margin: '0 auto', background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 12, padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', marginBottom: 16 }}>Cron 构建器</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {MODES.map((m, i) => (
            <label key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, background: i === 2 ? '#eff6ff' : '#fff', color: i === 2 ? '#1d4ed8' : '#44403c', cursor: 'pointer' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid #d6d3d1', background: i === 2 ? '#2563eb' : '#fff', position: 'relative' }}>
                {i === 2 && <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#fff' }} />}
              </span>
              {m}
            </label>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: '#78716c', marginBottom: 4 }}>小时</div>
            <input style={inp} type="number" defaultValue={9} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#78716c', marginBottom: 4 }}>分钟</div>
            <input style={inp} type="number" defaultValue={0} />
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: '#f5f4ee', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#44403c', fontVariantNumeric: 'tabular-nums' }}>
          0 0 9 * * ?
        </div>
      </div>
    </PreviewFrame>
  );
}

const inp: React.CSSProperties = {
  width: '100%', height: 32, padding: '0 12px', fontSize: 13, color: '#1c1917', background: '#fff',
  border: '1px solid #d6d3d1', borderRadius: 6, outline: 'none', boxSizing: 'border-box',
  fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums',
};
