import { PreviewFrame } from '../../../_layout';

export default function ArticleGaugeMonitor() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <article style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid #f5f4ee', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 24, fontSize: 12.5 }}>
              <span><span style={{ color: '#78716c' }}>执行器：</span><span style={{ fontWeight: 500, color: '#1c1917' }}>executor-01</span></span>
              <span><span style={{ color: '#78716c' }}>注册地址：</span><span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#2563eb', fontVariantNumeric: 'tabular-nums' }}>192.168.1.10:8080</span></span>
            </div>
            <div style={{ fontSize: 11.5, color: '#78716c' }}>更新时间：<span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>2026-05-21 14:32:05</span></div>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <Gauge title="CPU 使用率" value={45} color="#2563eb" />
            <Gauge title="内存使用率" value={68} color="#dc2626" />
            <Gauge title="Load Average" value={2.3} max={4} color="#f59e0b" unit="" />
          </div>
        </article>
      </div>
    </PreviewFrame>
  );
}

function Gauge({ title, value, max = 100, color, unit = '%' }: { title: string; value: number; max?: number; color: string; unit?: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 11.5, color: '#57534e', marginBottom: 8 }}>{title}</div>
      <div style={{ position: 'relative', width: 120, height: 80, margin: '0 auto' }}>
        <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
          <path d="M 10,55 A 40,40 0 1,1 90,55" fill="none" stroke="#f5f4ee" strokeWidth="6" strokeLinecap="round" />
          <path d="M 10,55 A 40,40 0 1,1 90,55" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(value / max) * 188},188`} pathLength="188" />
        </svg>
        <div style={{ position: 'absolute', insetInline: 0, bottom: 12, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 20, fontWeight: 700, color: '#1c1917', fontVariantNumeric: 'tabular-nums' }}>
          {value}<span style={{ fontSize: 12, color: '#78716c', fontWeight: 500 }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}
