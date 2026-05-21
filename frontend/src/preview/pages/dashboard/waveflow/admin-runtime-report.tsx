import { PreviewFrame } from '../../../_layout';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminRuntimeReport() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '20px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1917', margin: 0 }}>仪表盘</h1>
            <p style={{ fontSize: 12.5, color: '#78716c', margin: '2px 0 0' }}>实时调度状态 · 跨网数据同步</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              实时 · 30s 刷新
            </div>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: '#f5f4ee', borderRadius: 8 }}>
              {['1h', '24h', '7d', '30d'].map(r => (
                <button key={r} style={{ height: 24, padding: '0 10px', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontVariantNumeric: 'tabular-nums', background: r === '7d' ? '#1c1917' : 'transparent', color: r === '7d' ? '#fff' : '#78716c' }}>{r}</button>
              ))}
            </div>
          </div>
        </header>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            { label: '今日调度', value: '12.3k', d: 12.5, suf: '%' },
            { label: '成功率', value: '99.4%', d: 0.3, suf: 'pp', vc: '#059669' },
            { label: '平均耗时', value: '2.3s', d: -12, suf: '%' },
            { label: '在线执行器', value: '8/10' },
            { label: '活跃任务', value: '32/38' },
            { label: '24h 失败', value: '7', vc: '#dc2626', d: 2, invert: true },
          ].map(k => (
            <div key={k.label} style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>{k.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: k.vc || '#1c1917', marginTop: 6, lineHeight: 1 }}>{k.value}</div>
              {k.d != null && (
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: (k.invert ? k.d > 0 : k.d < 0) ? '#dc2626' : '#059669', marginTop: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {k.d > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{k.d > 0 ? '+' : ''}{k.d}{k.suf}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 8/4 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 220 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>调度趋势 · 近 7 天</div>
            <div style={{ marginTop: 24, height: 140, position: 'relative' }}>
              <svg viewBox="0 0 600 140" style={{ width: '100%', height: '100%' }}>
                <path d="M 20,90 L 100,70 L 180,80 L 260,40 L 340,55 L 420,30 L 500,45 L 580,25" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 20,110 L 100,108 L 180,105 L 260,100 L 340,102 L 420,98 L 500,99 L 580,95" fill="none" stroke="#ef4444" strokeWidth="2" />
                <path d="M 20,118 L 100,120 L 180,116 L 260,114 L 340,118 L 420,115 L 500,113 L 580,116" fill="none" stroke="#f59e0b" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: 140, height: 140 }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f5f4ee" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="220, 251" transform="rotate(-90 50 50)" />
            </svg>
          </div>
        </div>

        {/* small cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 4fr', gap: 12 }}>
          {['时长分布', '调度 TOP 5', '失败 TOP 5'].map(t => (
            <div key={t} style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 160 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
