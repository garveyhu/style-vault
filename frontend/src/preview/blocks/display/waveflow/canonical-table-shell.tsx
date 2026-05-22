import { PreviewFrame } from '../../../_layout';
import {
  Search, Plus, Play, ScrollText, MoreHorizontal, ArrowUpDown,
  ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
} from 'lucide-react';

/**
 * canonical-table-shell · waveflow 列表页统一外壳
 * 完整覆盖：toolbar / sortable thead / leftBar / GlueType chip / Switch /
 * 派生执行状态色 / IconBtn 操作 / MoreHorizontal dropdown 提示 /
 * shimmer 懒加载 (.skeleton 横向波 + pill) / Pagination + JumpInput
 *
 * 源码参考：waveflow-ui/src/components/table/DataTableShowcase.tsx
 */

const ROWS = [
  { id: 1001, name: '财务对账日终任务', glue: 'FETCH', cron: '0 0 9 * * ?', status: 'success', on: true, next: '05-22 09:00', leftBar: '#10b981' },
  { id: 1002, name: '物联采集 5min 增量', glue: 'TRANS', cron: '0 */5 * * * ?', status: 'fail', on: true, next: '05-22 14:35', leftBar: '#ef4444' },
  { id: 1003, name: '日终数据回流', glue: 'PUSH', cron: '0 0 23 * * ?', status: 'never', on: false, next: '—', leftBar: '#d6d3d1' },
  { id: 1004, name: '快照备份', glue: 'BEAN', cron: '0 0 */6 * * ?', status: 'running', on: true, next: '05-22 18:00', leftBar: '#10b981' },
];

const GLUE: Record<string, { label: string; bg: string; text: string; border: string }> = {
  FETCH: { label: '拉取', bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
  TRANS: { label: '清洗', bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
  PUSH: { label: '推送', bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  BEAN: { label: 'DataX', bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' },
};

const RUN_LABEL: Record<string, string> = { success: '成功', fail: '失败', running: '运行中', never: '未运行' };
const RUN_COLOR: Record<string, string> = { success: '#059669', fail: '#dc2626', running: '#2563eb', never: '#a8a29e' };

export default function CanonicalTableShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes wf-shimmer { 0% { background-position: -200px 0 } 100% { background-position: 200px 0 } }`}</style>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>

          {/* ============ TOOLBAR ============ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', margin: 0 }}>任务列表</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                <input style={{ height: 28, paddingLeft: 24, paddingRight: 12, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 160, outline: 'none', boxSizing: 'border-box' }} placeholder="搜索任务" />
              </div>
              {['任务类型', '执行状态'].map(p => (
                <button key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', width: 110, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}>
                  <span style={{ flex: 1, textAlign: 'left' }}>{p}</span>
                  <ChevronDown size={12} color="#a8a29e" />
                </button>
              ))}
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                <Plus size={14} /> 添加任务
              </button>
            </div>
          </div>

          {/* ============ TABLE ============ */}
          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: 4 }} />     {/* leftBar 槽 */}
                <col style={{ width: 56 }} />    {/* ID */}
                <col />                          {/* 任务名称 */}
                <col style={{ width: 70 }} />    {/* 类型 */}
                <col style={{ width: 132 }} />   {/* Cron */}
                <col style={{ width: 70 }} />    {/* 执行 */}
                <col style={{ width: 70 }} />    {/* 开关 */}
                <col style={{ width: 116 }} />   {/* 下次触发 */}
                <col style={{ width: 96 }} />    {/* 操作 */}
              </colgroup>
              <thead>
                <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th></th>
                  <th style={th}><Sortable label="ID" /></th>
                  <th style={th}><Sortable label="任务名称" /></th>
                  <th style={th}>类型</th>
                  <th style={th}>Cron</th>
                  <th style={th}>执行</th>
                  <th style={th}>开关</th>
                  <th style={th}><Sortable label="下次触发" /></th>
                  <th style={{ ...th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {/* 数据行 · 4 条 */}
                {ROWS.map(r => {
                  const g = GLUE[r.glue];
                  return (
                    <tr key={r.id} style={{ borderTop: '1px solid #f5f4ee' }}>
                      <td style={{ padding: 0 }}><div style={{ height: 40, width: 4, background: r.leftBar }} /></td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{r.id}</td>
                      <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                      <td style={td}><span style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 4, border: `1px solid ${g.border}`, background: g.bg, color: g.text, fontSize: 10.5, lineHeight: 1 }}>{g.label}</span></td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.cron}</td>
                      <td style={{ ...td, fontSize: 11.5, color: RUN_COLOR[r.status] }}>{RUN_LABEL[r.status]}</td>
                      <td style={td}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', width: 36, height: 20, borderRadius: 9999, background: r.on ? '#10b981' : '#d6d3d1', padding: 2, transition: 'background 200ms' }}>
                          <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', transform: r.on ? 'translateX(16px)' : 'translateX(0)', boxShadow: '0 1px 2px rgb(0 0 0 / 10%)', transition: 'transform 200ms' }} />
                        </span>
                      </td>
                      <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.next}</td>
                      <td style={{ ...td, textAlign: 'right' }}>
                        <button style={iconBtn} title="触发一次"><Play size={14} color="#57534e" /></button>
                        <button style={iconBtn} title="查看最近日志"><ScrollText size={14} color="#57534e" /></button>
                        <button style={iconBtn} title="更多"><MoreHorizontal size={14} color="#78716c" /></button>
                      </td>
                    </tr>
                  );
                })}
                {/* Shimmer 占位行 · 2 条 · 演示懒加载条纹波 */}
                {[0, 1].map(i => (
                  <tr key={'skl' + i} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ padding: 0 }}><div style={{ height: 40 }} /></td>
                    {Array.from({ length: 8 }).map((_, c) => (
                      <td key={c} style={{ padding: '10px 12px' }}>
                        <div style={{
                          height: 8, borderRadius: 9999,
                          background: 'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)',
                          backgroundSize: '400px 100%',
                          animation: 'wf-shimmer 1.6s ease-in-out infinite',
                          width: `${40 + ((i * 7 + c * 11) % 50)}%`,
                        }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============ PAGINATION ============ */}
          <Pagination from={1} to={4} total={248} page={1} totalPages={25} />
        </section>
      </div>
    </PreviewFrame>
  );
}

/* ── 排序表头 ── */
function Sortable({ label }: { label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
      {label}
      <ArrowUpDown size={11} color="#d6d3d1" />
    </span>
  );
}

/* ── 分页 ── */
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
        {/* 跳转输入：极简虚线下划线 · 默认填当前页 */}
        <span style={{ marginLeft: 18, color: '#78716c' }}>跳至</span>
        <input type="text" inputMode="numeric" defaultValue={page} style={jumpInp} />
        <span style={{ color: '#78716c' }}>页</span>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
const iconBtn: React.CSSProperties = { background: 'transparent', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginLeft: 2 };
const jumpInp: React.CSSProperties = {
  background: 'transparent', border: 'none', borderBottom: '1px dashed #d6d3d1',
  width: 32, height: 22, padding: 0, textAlign: 'center',
  fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontWeight: 500,
  fontVariantNumeric: 'tabular-nums', color: '#292524', outline: 'none',
};
