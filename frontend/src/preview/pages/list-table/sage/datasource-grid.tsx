import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const DS = [
  { name: 'sales_main', type: 'MYSQL', logo: '🐬', desc: '销售订单 + 客户主库', synced: 24, total: 32, isDefault: true },
  { name: 'analytics_pg', type: 'POSTGRESQL', logo: '🐘', desc: '产品分析 OLAP', synced: 12, total: 18 },
  { name: 'erp_oracle', type: 'ORACLE', logo: '🅾', desc: 'ERP 副本（迁移）', synced: 56, total: 64 },
  { name: 'lake_clickhouse', type: 'CLICKHOUSE', logo: '⚡', desc: '日志列存', synced: 8, total: 10 },
  { name: 'doris_olap', type: 'DORIS', logo: '⚡', desc: 'BI 即席查询', synced: 3, total: 6 },
  { name: 'es_logs', type: 'ELASTICSEARCH', logo: '🔍', desc: '应用日志全文检索', synced: 1, total: 1 },
  { name: 'dameng_legacy', type: 'DAMENG', logo: '🔱', desc: '国产数据库历史库', synced: 0, total: 18 },
  { name: 'excel_import', type: 'EXCEL', logo: '📑', desc: '一次性 xlsx 上传', synced: 4, total: 4 },
];

export default function DatasourceGridPagePreview() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>数据源</h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>管理空间内所有数据库连接</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, color: '#475569' }}>
              <option>所有类型</option>
            </select>
            <input placeholder="搜索…" style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, width: 200 }} />
            <button style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ 新建</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {DS.map(d => <Card key={d.name} d={d} />)}
        </div>
      </div>
    </PreviewFrame>
  );
}

function Card({ d }: { d: typeof DS[0] }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#fff', borderRadius: 12,
        border: `1px solid ${h ? '#cbd5e1' : '#e2e8f0'}`,
        padding: 16,
        boxShadow: h ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none',
        cursor: 'pointer',
        transition: 'all 200ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 26 }}>{d.logo}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
            {d.isDefault && (
              <span style={{ flexShrink: 0, padding: '1px 5px', borderRadius: 12, background: '#dcfce7', color: '#15803d', fontSize: 9, fontWeight: 500, border: '1px solid #bbf7d0' }}>✓ 默认</span>
            )}
          </div>
          <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.type}</div>
        </div>
        <div style={{ opacity: h ? 1 : 0, display: 'flex', gap: 4, transition: 'opacity 200ms' }}>
          {['⭐', '✎', '🗑'].map((ic, i) => (
            <button key={i} style={{ width: 22, height: 22, borderRadius: 4, background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 11 }}>{ic}</button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#475569', minHeight: 36, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
        {d.desc}
      </div>
      <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
        <span>📋</span> 已同步 {d.synced} / {d.total}
      </div>
    </div>
  );
}
