import { PreviewFrame } from '../../../_layout';
import { Calendar, ChevronDown, Trash2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const LOGS = [
  { id: 100201, jobId: 1001, desc: '财务对账日终', time: '2026-05-21 09:00:01', dur: '3.2s', code: 200 },
  { id: 100200, jobId: 1002, desc: '物联采集 5min', time: '2026-05-21 14:30:01', dur: '1.4s', code: 500 },
  { id: 100199, jobId: 1004, desc: '快照备份', time: '2026-05-21 12:00:01', dur: '8.7s', code: 0 },
  { id: 100198, jobId: 1001, desc: '财务对账日终', time: '2026-05-20 09:00:01', dur: '3.1s', code: 200 },
];

const CODE: Record<number, { label: string; bg: string; text: string; border: string }> = {
  200: { label: '成功', bg: '#ecfdf5', text: '#047857', border: '#6ee7b7' },
  0: { label: '进行中', bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  500: { label: '失败', bg: '#fef2f2', text: '#b91c1c', border: '#fca5a5' },
};

export default function JobLogBatchSelect() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, margin: 0 }}>日志管理</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <input style={{ height: 28, padding: '0 10px', fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 120, outline: 'none' }} placeholder="任务 ID" />
              <input style={{ height: 28, padding: '0 10px', fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 140, outline: 'none' }} placeholder="任务描述" />
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}><span>执行器</span><ChevronDown size={12} /></button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}><span>状态</span><ChevronDown size={12} /></button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#57534e', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}><Calendar size={12} /><span>05-14 ~ 05-21</span></button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', background: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 6, fontSize: 11.5, cursor: 'pointer' }}>
                <Trash2 size={12} /> 删除选中（2）
              </button>
            </div>
          </div>

          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: 40 }} /><col style={{ width: 80 }} /><col /><col style={{ width: 160 }} /><col style={{ width: 80 }} /><col style={{ width: 90 }} /><col style={{ width: 70 }} /></colgroup>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th style={{ ...th, textAlign: 'center' }}><input type="checkbox" /></th>
                  <th style={th}>任务 ID</th><th style={th}>任务描述</th><th style={th}>调度时间</th><th style={th}>耗时</th><th style={th}>执行码</th><th style={{ ...th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {LOGS.map((l, i) => (
                  <tr key={l.id} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ ...td, textAlign: 'center' }}><input type="checkbox" defaultChecked={i < 2} /></td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#78716c' }}>{l.jobId}</td>
                    <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{l.desc}</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{l.time}</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{l.dur}</td>
                    <td style={td}><span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 4, border: `1px solid ${CODE[l.code].border}`, background: CODE[l.code].bg, color: CODE[l.code].text, fontSize: 11, fontWeight: 500 }}>{CODE[l.code].label}</span></td>
                    <td style={{ ...td, textAlign: 'right' }}><button style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer' }}><Eye size={14} color="#57534e" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination from={1} to={4} total={1234} page={1} totalPages={124} pageSize={10} />
        </section>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };

function Pagination({ from, to, total, page, totalPages, pageSize = 10 }: { from: number; to: number; total: number; page: number; totalPages: number; pageSize?: number }) {
  const navBtn = (p: { disabled?: boolean; children: React.ReactNode; title: string }) => (
    <button title={p.title} disabled={p.disabled} style={{ background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: p.disabled ? 'default' : 'pointer', opacity: p.disabled ? 0.3 : 1, display: 'inline-flex', alignItems: 'center', color: '#57534e' }}>{p.children}</button>
  );
  return (
    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5, color: '#78716c' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>{from}–{to} / {total.toLocaleString()}</span>
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
        <span style={{ marginLeft: 18, color: '#78716c' }}>跳至</span>
        <input type="text" inputMode="numeric" defaultValue={page} style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed #d6d3d1', width: 32, height: 22, padding: 0, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontWeight: 500, fontVariantNumeric: 'tabular-nums', color: '#292524', outline: 'none' }} />
        <span style={{ color: '#78716c' }}>页</span>
      </div>
    </div>
  );
}
