import { PreviewFrame } from '../../../_layout';
import { Pencil, Plus, MoreHorizontal, ListChecks, CheckCircle2, PauseCircle, AlertCircle, Briefcase } from 'lucide-react';

export default function MasterDetailListAside() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', gap: 16, padding: '16px 24px', height: 640, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* aside */}
        <aside style={{ width: 256, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f4ee', padding: '12px 14px' }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: '#44403c', margin: 0 }}>任务集 · 状态总览</h2>
            <span style={{ background: '#f5f4ee', color: '#78716c', padding: '2px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontVariantNumeric: 'tabular-nums' }}>5</span>
          </div>
          <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <SetItem name="财务对账集合" count={8} active />
            <SetItem name="物联采集集合" count={12} />
            <SetItem name="日终批处理" count={20} />
          </div>
        </aside>

        {/* detail */}
        <section style={{ flex: 1, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', padding: 20 }}>
          {/* HERO */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: 16, borderBottom: '1px solid #f5f4ee', marginBottom: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
              <Briefcase size={22} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', fontWeight: 500 }}>任务集</span>
                <span style={{ color: '#d6d3d1' }}>·</span>
                <span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 4, background: '#f5f4ee', color: '#44403c', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontVariantNumeric: 'tabular-nums' }}>浙有善育</span>
                <span style={{ color: '#d6d3d1' }}>·</span>
                <span style={{ fontSize: 10.5, color: '#78716c' }}>最近触发 <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#44403c', fontVariantNumeric: 'tabular-nums' }}>5 分钟前</span></span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#1c1917', margin: 0 }}>财务对账集合</h1>
              <p style={{ fontSize: 13, color: '#57534e', marginTop: 2 }}>日终运行的财务核算任务集，含 8 个调度任务</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button style={{ ...btn, background: '#fff', color: '#44403c', border: '1px solid #d6d3d1' }}><Pencil size={14} /> 编辑</button>
              <button style={{ ...btn, background: '#2563eb', color: '#fff' }}><Plus size={14} /> 添加任务</button>
              <button style={{ ...btn, background: 'transparent', color: '#78716c', width: 28, padding: 0 }}><MoreHorizontal size={16} /></button>
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <Metric icon={<ListChecks size={12} />} label="总任务" value={8} />
            <Metric icon={<CheckCircle2 size={12} />} label="运行中" value={7} tone="success" />
            <Metric icon={<PauseCircle size={12} />} label="已暂停" value={1} />
            <Metric icon={<AlertCircle size={12} />} label="异常" value={0} tone="danger" />
          </div>

          <div style={{ fontSize: 12, color: '#78716c' }}>↓ MembersTable 内嵌于此（完整 toolbar + table + pagination 三件套）</div>
        </section>
      </div>
    </PreviewFrame>
  );
}

const btn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 32, padding: '0 12px',
  borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', border: 'none',
};

function SetItem({ name, count, active }: any) {
  return (
    <div style={{
      padding: 10, borderRadius: 10,
      background: active ? 'rgba(219,234,254,0.7)' : '#fff',
      border: active ? '1px solid rgba(96,165,250,0.5)' : '1px solid transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Briefcase size={14} color="#3b82f6" />
        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>{name}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: count }).map((_, i) => <span key={i} style={{ width: 14, height: 6, borderRadius: 1, background: i < 7 ? '#10b981' : '#d6d3d1' }} />)}
      </div>
    </div>
  );
}

function Metric({ icon, label, value, tone }: any) {
  const colors = tone === 'success' ? { bg: 'rgba(236,253,245,0.6)', border: 'rgba(167,243,208,0.4)', text: '#047857' } : tone === 'danger' ? { bg: 'rgba(254,242,242,0.6)', border: 'rgba(252,165,165,0.4)', text: '#b91c1c' } : { bg: 'rgba(244,243,238,0.6)', border: 'rgba(231,229,224,0.4)', text: '#78716c' };
  return (
    <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: colors.text, marginBottom: 2 }}>{icon}{label}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, fontWeight: 600, color: tone ? colors.text : '#1c1917', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</div>
    </div>
  );
}
