import { PreviewFrame } from '../../../_layout';
import { Calendar, X } from 'lucide-react';

export default function DatetimeRangePresets() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INPUT</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Datetime Range Presets</h1>

        <button style={trig}>
          <Calendar size={14} color="#78716c" />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>2026-05-14 00:00 ~ 2026-05-21 23:59</span>
          <X size={12} style={{ marginLeft: 'auto', color: '#a8a29e' }} />
        </button>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, padding: 8, boxShadow: '0 8px 24px rgb(0 0 0 / 8%)' }}>
          <div>
            {['今天', '昨天', '近 7 天', '近 30 天', '本月', '上月'].map((p, i) => (
              <div key={p} style={{ padding: '8px 10px', borderRadius: 4, fontSize: 12, color: '#44403c', cursor: 'pointer', background: i === 2 ? '#f5f4ee' : 'transparent' }}>{p}</div>
            ))}
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 11, color: '#78716c', marginBottom: 4 }}>开始时间</div>
            <input style={inp} type="text" defaultValue="2026-05-14 00:00:00" />
            <div style={{ fontSize: 11, color: '#78716c', marginTop: 12, marginBottom: 4 }}>结束时间</div>
            <input style={inp} type="text" defaultValue="2026-05-21 23:59:59" />
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button style={{ ...btn, background: 'transparent', color: '#44403c' }}>取消</button>
              <button style={{ ...btn, background: '#2563eb', color: '#fff' }}>应用</button>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const trig: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, height: 32, padding: '0 12px',
  background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 13, color: '#1c1917', cursor: 'pointer',
  minWidth: 320,
};

const inp: React.CSSProperties = {
  width: '100%', height: 28, padding: '0 10px', fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 4,
  fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', boxSizing: 'border-box',
};

const btn: React.CSSProperties = {
  height: 28, padding: '0 10px', borderRadius: 4, fontSize: 11.5, fontWeight: 500, border: 'none', cursor: 'pointer',
};
