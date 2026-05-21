import { PreviewFrame } from '../../../_layout';
import { Briefcase, Plus, Pencil, MoreHorizontal, ListChecks, CheckCircle2, PauseCircle, AlertCircle, Play, ScrollText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

export default function JobsetMasterDetail() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', gap: 16, padding: '16px 24px', minHeight: 720, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* aside */}
        <aside style={{ width: 256, flexShrink: 0, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #f5f4ee' }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: '#44403c', margin: 0 }}>任务集 · 状态总览</h2>
            <span style={{ background: '#f5f4ee', padding: '2px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>5</span>
          </div>
          <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {['财务对账', '物联采集', '日终批处理', '快照备份', '审计同步'].map((name, i) => (
              <button key={name} style={{
                textAlign: 'left', cursor: 'pointer', padding: 10, borderRadius: 10,
                background: i === 0 ? 'rgba(219,234,254,0.7)' : '#fff',
                border: i === 0 ? '1px solid rgba(96,165,250,0.5)' : '1px solid transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Briefcase size={14} color="#3b82f6" />
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{[8, 12, 20, 6, 4][i]}</span>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: [8, 12, 20, 6, 4][i] }).map((_, j) => (
                    <span key={j} style={{ width: 14, height: 6, borderRadius: 1, background: j < 7 ? '#10b981' : '#d6d3d1' }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* detail */}
        <section style={{ flex: 1, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', padding: 20 }}>
          {/* HERO */}
          <div style={{ display: 'flex', gap: 14, paddingBottom: 16, borderBottom: '1px solid #f5f4ee', marginBottom: 16 }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.12)', color: '#3b82f6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={22} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', fontWeight: 500 }}>任务集</span>
                <span style={{ color: '#d6d3d1' }}>·</span>
                <span style={{ padding: '2px 6px', borderRadius: 4, background: '#f5f4ee', color: '#44403c', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontVariantNumeric: 'tabular-nums' }}>浙有善育</span>
                <span style={{ color: '#d6d3d1' }}>·</span>
                <span style={{ fontSize: 10.5, color: '#78716c' }}>最近触发 <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#44403c', fontVariantNumeric: 'tabular-nums' }}>5 分钟前</span></span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1917', margin: 0 }}>财务对账</h1>
              <p style={{ fontSize: 13, color: '#57534e', marginTop: 2 }}>日终运行的财务核算任务集，含 8 个调度任务</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button style={btn('outline')}><Pencil size={14} /> 编辑</button>
              <button style={btn('primary')}><Plus size={14} /> 添加任务</button>
              <button style={{ ...btn('ghost'), width: 28, padding: 0 }}><MoreHorizontal size={16} /></button>
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <Metric icon={<ListChecks size={12} />} label="总任务" value={8} />
            <Metric icon={<CheckCircle2 size={12} />} label="运行中" value={7} tone="success" />
            <Metric icon={<PauseCircle size={12} />} label="已暂停" value={1} />
            <Metric icon={<AlertCircle size={12} />} label="异常" value={0} tone="danger" />
          </div>

          {/* MembersTable simplified */}
          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', color: '#78716c' }}>
                  <th style={th}>ID</th><th style={th}>任务名称</th><th style={th}>Cron</th><th style={th}>执行</th><th style={th}>操作</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(i => (
                  <tr key={i} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{1000 + i}</td>
                    <td style={{ ...td, fontWeight: 500 }}>对账任务 {i}</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>0 0 9 * * ?</td>
                    <td style={{ ...td, color: '#059669', fontSize: 11.5 }}>成功</td>
                    <td style={td}><Play size={14} color="#57534e" style={{ marginRight: 6 }} /><ScrollText size={14} color="#57534e" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination from={1} to={3} total={8} page={1} totalPages={1} />
        </section>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500, letterSpacing: '0.05em' };
const td: React.CSSProperties = { padding: '10px 12px' };

function Pagination({ from, to, total, page, totalPages, pageSize = 10 }: { from: number; to: number; total: number; page: number; totalPages: number; pageSize?: number }) {
  const navBtn = (p: { disabled?: boolean; children: React.ReactNode; title: string }) => (
    <button title={p.title} disabled={p.disabled} style={{ background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: p.disabled ? 'default' : 'pointer', opacity: p.disabled ? 0.3 : 1, display: 'inline-flex', alignItems: 'center', color: '#57534e' }}>{p.children}</button>
  );
  return (
    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5, color: '#78716c' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>{from}–{to} / {total}</span>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', minWidth: 80, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 11.5, color: '#44403c', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <span>{pageSize} 条/页</span><ChevronDown size={12} color="#a8a29e" style={{ marginLeft: 'auto' }} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {navBtn({ disabled: page <= 1, title: '首页', children: <ChevronsLeft size={14} /> })}
        {navBtn({ disabled: page <= 1, title: '上一页', children: <ChevronLeft size={14} /> })}
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', padding: '0 4px', color: '#1c1917', fontWeight: 500 }}>{page} / {totalPages}</span>
        {navBtn({ disabled: page >= totalPages, title: '下一页', children: <ChevronRight size={14} /> })}
        {navBtn({ disabled: page >= totalPages, title: '末页', children: <ChevronsRight size={14} /> })}
      </div>
    </div>
  );
}

function btn(variant: 'primary' | 'outline' | 'ghost'): React.CSSProperties {
  const map = { primary: { bg: '#2563eb', color: '#fff', border: 'transparent' }, outline: { bg: '#fff', color: '#44403c', border: '#d6d3d1' }, ghost: { bg: 'transparent', color: '#78716c', border: 'transparent' } };
  const v = map[variant];
  return { display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', background: v.bg, color: v.color, border: `1px solid ${v.border}` };
}

function Metric({ icon, label, value, tone }: any) {
  const c = tone === 'success' ? { bg: 'rgba(236,253,245,0.6)', border: 'rgba(167,243,208,0.4)', text: '#047857' } : tone === 'danger' ? { bg: 'rgba(254,242,242,0.6)', border: 'rgba(252,165,165,0.4)', text: '#b91c1c' } : { bg: 'rgba(244,243,238,0.6)', border: 'rgba(231,229,224,0.4)', text: '#78716c' };
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: c.text, marginBottom: 2 }}>{icon}{label}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, fontWeight: 600, lineHeight: 1, color: tone ? c.text : '#1c1917', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
