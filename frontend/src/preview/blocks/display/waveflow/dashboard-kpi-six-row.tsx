import { PreviewFrame } from '../../../_layout';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function DashboardKpiSixRow() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>BLOCK · DISPLAY · DASHBOARD</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>6 KPI Row</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          <KPI label="今日调度" value="12,345" delta={12.5} suffix="% vs ytd">
            <Spark color="#6366f1" />
          </KPI>
          <KPI label="成功率" value="99.4%" valueColor="#059669" delta={0.3} suffix="pp">
            <ProgressBar pct={99.4} />
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums', marginTop: 6 }}>12,278 成功 / 67 失败</div>
          </KPI>
          <KPI label="平均耗时" value="2.3s">
            <Range min="0.4s" max="1m" />
          </KPI>
          <KPI label="在线执行器" value="8" total="/ 10">
            <HealthDots online={8} total={10} />
          </KPI>
          <KPI label="活跃任务" value="32" total="/ 38">
            <Chips />
          </KPI>
          <KPI label="24h 失败" value="7" valueColor="#dc2626" delta={2} invert suffix=" vs ytd">
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>最近 14:32 · 上海</div>
          </KPI>
        </div>
      </div>
    </PreviewFrame>
  );
}

function KPI({ label, value, total, valueColor = '#1c1917', delta, suffix, invert, children }: any) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>{label}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.02em', color: valueColor }}>{value}</span>
        {total && <span style={{ fontSize: 14, fontWeight: 500, color: '#a8a29e' }}>{total}</span>}
      </div>
      {delta != null && (
        <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontVariantNumeric: 'tabular-nums', color: (invert ? delta > 0 : delta < 0) ? '#dc2626' : '#059669' }}>
          {delta > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          <span>{delta > 0 ? '+' : ''}{delta}{suffix}</span>
        </div>
      )}
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}

function Spark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 32" style={{ width: '100%', height: 32 }}>
      <path d="M0,24 L20,20 L40,16 L60,8 L80,12 L100,4" fill="none" stroke={color} strokeWidth="1.8" />
      <path d="M0,24 L20,20 L40,16 L60,8 L80,12 L100,4 L100,32 L0,32 Z" fill={color} opacity="0.25" />
    </svg>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ height: 4, borderRadius: 9999, background: '#f5f4ee', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
    </div>
  );
}

function Range({ min, max }: { min: string; max: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>
      <span>min {min}</span><span>max {max}</span>
    </div>
  );
}

function HealthDots({ online, total }: { online: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} style={{ flex: 1, height: 6, borderRadius: 2, background: i < online ? '#10b981' : i < total ? '#d6d3d1' : '#f5f4ee' }} />
      ))}
    </div>
  );
}

function Chips() {
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap', overflow: 'hidden' }}>
      {[{ k: 'FETCH', c: '#059669', n: 12 }, { k: 'TRANS', c: '#db2777', n: 8 }, { k: 'PUSH', c: '#2563eb', n: 5 }].map(t => (
        <span key={t.k} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, background: t.c, color: '#fff', fontSize: 10.5, fontWeight: 600 }}>
          <span>{t.k}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{t.n}</span>
        </span>
      ))}
    </div>
  );
}
