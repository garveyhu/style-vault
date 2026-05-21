import { PreviewFrame } from '../../../_layout';
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

export function Pagination({ from, to, total, page, totalPages, pageSize = 10 }: { from: number; to: number; total: number; page: number; totalPages: number; pageSize?: number }) {
  const navBtn = (props: { disabled?: boolean; children: React.ReactNode; title: string }) => (
    <button title={props.title} disabled={props.disabled} style={{ background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: props.disabled ? 'default' : 'pointer', opacity: props.disabled ? 0.3 : 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#57534e' }}>
      {props.children}
    </button>
  );
  return (
    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5, color: '#78716c' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>{from}–{to} / {total}</span>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', minWidth: 80, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 11.5, color: '#44403c', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <span>{pageSize} 条/页</span>
          <ChevronDown size={12} color="#a8a29e" style={{ marginLeft: 'auto' }} />
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

export default function CanonicalTableShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          {/* TOOLBAR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', margin: 0 }}>项目管理</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                <input style={{ height: 28, paddingLeft: 24, paddingRight: 12, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 180, outline: 'none', boxSizing: 'border-box' }} placeholder="搜索项目名称" />
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                <Plus size={14} /> 添加项目
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th style={th}>ID</th><th style={th}>项目名称</th><th style={th}>描述</th><th style={th}>所属用户</th><th style={th}>创建时间</th><th style={{ ...th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(i => (
                  <tr key={i} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#78716c' }}>{1000 + i}</td>
                    <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>项目 {i}</td>
                    <td style={{ ...td, color: '#57534e' }}>数据中台业务接入</td>
                    <td style={td}>links</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#57534e' }}>2026-05-20 14:32</td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <button style={iconBtn}><Pencil size={14} color="#57534e" /></button>
                      <button style={iconBtn}><Trash2 size={14} color="#57534e" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination from={1} to={4} total={12} page={1} totalPages={3} />
        </section>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
const iconBtn: React.CSSProperties = { background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginLeft: 2 };
