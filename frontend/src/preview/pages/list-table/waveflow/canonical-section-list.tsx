import { PreviewFrame } from '../../../_layout';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';

const ROWS = [
  { id: 1001, name: '浙有善育', desc: '数据中台业务接入', user: 'links', time: '2026-05-20 14:32' },
  { id: 1002, name: '河南数据中心', desc: '跨省数据同步', user: 'sara', time: '2026-05-19 09:15' },
  { id: 1003, name: '财务对账', desc: '日终对账任务集容器', user: 'mike', time: '2026-05-18 11:24' },
  { id: 1004, name: '物联采集', desc: 'IoT 数据采集与清洗', user: 'links', time: '2026-05-17 17:08' },
];

export default function CanonicalSectionList() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', margin: 0 }}>项目管理</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                <input style={{ height: 28, paddingLeft: 24, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 180, outline: 'none', boxSizing: 'border-box' }} placeholder="搜索项目名称" />
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                <Plus size={14} /> 添加项目
              </button>
            </div>
          </div>

          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th style={th}>ID</th><th style={th}>项目名称</th><th style={th}>描述</th><th style={th}>所属用户</th><th style={th}>创建时间</th><th style={{ ...th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#78716c' }}>{r.id}</td>
                    <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                    <td style={{ ...td, color: '#57534e' }}>{r.desc}</td>
                    <td style={td}>{r.user}</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.time}</td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <button style={iconBtn}><Pencil size={14} color="#57534e" /></button>
                      <button style={iconBtn}><Trash2 size={14} color="#57534e" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 11.5, color: '#78716c' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>1–4 / 12</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>1 / 3</span>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
const iconBtn: React.CSSProperties = { background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginLeft: 2 };
