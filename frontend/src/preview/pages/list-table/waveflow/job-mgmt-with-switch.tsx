import { PreviewFrame } from '../../../_layout';
import { Search, ChevronDown, Plus, Play, ScrollText, MoreHorizontal } from 'lucide-react';

const ROWS = [
  { id: 1001, name: '财务对账日终任务', leftBar: '#10b981', glue: 'FETCH', cron: '0 0 9 * * ?', status: 'success', on: true, next: '05-22 09:00' },
  { id: 1002, name: '物联采集 5min 增量', leftBar: '#ef4444', glue: 'TRANS', cron: '0 */5 * * * ?', status: 'fail', on: true, next: '05-21 14:35' },
  { id: 1003, name: '日终数据回流', leftBar: '#d6d3d1', glue: 'PUSH', cron: '0 0 23 * * ?', status: 'never', on: false, next: '—' },
  { id: 1004, name: '快照备份', leftBar: '#10b981', glue: 'BEAN', cron: '0 0 */6 * * ?', status: 'running', on: true, next: '05-21 18:00' },
];

const GLUE: Record<string, { bg: string; text: string; border: string }> = {
  FETCH: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
  TRANS: { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
  PUSH: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  BEAN: { bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' },
};

export default function JobMgmtWithSwitch() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, margin: 0 }}>任务管理</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                <input style={{ height: 28, paddingLeft: 24, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 160, outline: 'none' }} placeholder="搜索任务" />
              </div>
              {['任务类型', '执行状态', '开关状态'].map(p => (
                <button key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', width: 100, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}>
                  <span style={{ flex: 1, textAlign: 'left' }}>{p}</span><ChevronDown size={12} />
                </button>
              ))}
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', width: 130, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}>
                <span style={{ flex: 1, textAlign: 'left' }}>所属项目</span><ChevronDown size={12} />
              </button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                <Plus size={14} /> 添加任务
              </button>
            </div>
          </div>

          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: 4 }} /><col style={{ width: 56 }} /><col /><col style={{ width: 72 }} /><col style={{ width: 132 }} /><col style={{ width: 70 }} /><col style={{ width: 70 }} /><col style={{ width: 116 }} /><col style={{ width: 96 }} /></colgroup>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th></th><th style={th}>ID</th><th style={th}>任务名称</th><th style={th}>类型</th><th style={th}>Cron</th><th style={th}>执行</th><th style={th}>开关</th><th style={th}>下次触发</th><th style={{ ...th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(r => {
                  const g = GLUE[r.glue];
                  return (
                    <tr key={r.id} style={{ borderTop: '1px solid #f5f4ee' }}>
                      <td style={{ padding: 0 }}><div style={{ height: 40, width: 4, background: r.leftBar }} /></td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{r.id}</td>
                      <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                      <td style={td}><span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 4, border: `1px solid ${g.border}`, background: g.bg, color: g.text, fontSize: 10.5 }}>{r.glue}</span></td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.cron}</td>
                      <td style={{ ...td, fontSize: 11.5, color: r.status === 'success' ? '#059669' : r.status === 'fail' ? '#dc2626' : r.status === 'running' ? '#2563eb' : '#a8a29e' }}>
                        {r.status === 'success' ? '成功' : r.status === 'fail' ? '失败' : r.status === 'running' ? '运行中' : '未运行'}
                      </td>
                      <td style={td}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', width: 36, height: 20, borderRadius: 9999, background: r.on ? '#10b981' : '#d6d3d1', padding: 2 }}>
                          <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', transform: r.on ? 'translateX(16px)' : 'translateX(0)' }} />
                        </span>
                      </td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.next}</td>
                      <td style={{ ...td, textAlign: 'right' }}>
                        <button style={iconBtn}><Play size={14} color="#57534e" /></button>
                        <button style={iconBtn}><ScrollText size={14} color="#57534e" /></button>
                        <button style={iconBtn}><MoreHorizontal size={14} color="#78716c" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
const iconBtn: React.CSSProperties = { background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginLeft: 2 };
