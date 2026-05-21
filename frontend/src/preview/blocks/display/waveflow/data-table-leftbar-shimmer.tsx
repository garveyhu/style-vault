import { PreviewFrame } from '../../../_layout';
import { ArrowUpDown, MoreHorizontal, Play, ScrollText } from 'lucide-react';

export default function DataTableLeftbarShimmer() {
  const rows = [
    { id: 1001, name: '财务对账', leftBar: '#10b981', status: 'success', cron: '0 0 9 * * ?', next: '05-22 09:00' },
    { id: 1002, name: '物联采集', leftBar: '#ef4444', status: 'fail', cron: '0 */5 * * * ?', next: '05-21 14:35' },
    { id: 1003, name: '日终批处理', leftBar: '#d6d3d1', status: 'never', cron: '0 0 23 * * ?', next: '—' },
    { id: 1004, name: '快照备份', leftBar: '#10b981', status: 'running', cron: '0 0 */6 * * ?', next: '05-21 18:00' },
  ];
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes wf-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }`}</style>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup><col style={{ width: 4 }} /><col style={{ width: 56 }} /><col /><col style={{ width: 140 }} /><col style={{ width: 80 }} /><col style={{ width: 116 }} /><col style={{ width: 80 }} /></colgroup>
            <thead>
              <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                <th></th>
                <th style={th}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>ID <ArrowUpDown size={11} color="#d6d3d1" /></span></th>
                <th style={th}>任务名称</th>
                <th style={th}>Cron</th>
                <th style={th}>执行</th>
                <th style={th}>下次触发</th>
                <th style={{ ...th, textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} style={{ borderTop: '1px solid #f5f4ee' }}>
                  <td style={{ padding: 0 }}><div style={{ height: 40, width: 4, background: r.leftBar }} /></td>
                  <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#78716c' }}>{r.id}</td>
                  <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                  <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.cron}</td>
                  <td style={{ ...td, fontSize: 11.5, color: r.status === 'success' ? '#059669' : r.status === 'fail' ? '#dc2626' : r.status === 'running' ? '#2563eb' : '#a8a29e' }}>
                    {r.status === 'success' ? '成功' : r.status === 'fail' ? '失败' : r.status === 'running' ? '运行中' : '未运行'}
                  </td>
                  <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.next}</td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <button style={iconBtn}><Play size={14} color="#57534e" /></button>
                    <button style={iconBtn}><ScrollText size={14} color="#57534e" /></button>
                    <button style={iconBtn}><MoreHorizontal size={14} color="#78716c" /></button>
                  </td>
                </tr>
              ))}
              {/* shimmer row */}
              {[1, 2].map(i => (
                <tr key={'skl' + i} style={{ borderTop: '1px solid #f5f4ee', animation: 'wf-pulse 1.6s ease-in-out infinite' }}>
                  <td style={{ padding: 0 }}><div style={{ height: 40 }} /></td>
                  {Array.from({ length: 6 }).map((_, c) => (
                    <td key={c} style={{ padding: '10px 12px' }}><div style={{ height: 12, borderRadius: 3, background: '#f5f4ee', width: `${50 + ((i * 7 + c * 13) % 30)}%` }} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
const iconBtn: React.CSSProperties = { background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginLeft: 2 };
