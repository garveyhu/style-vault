import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const DATASOURCES = [
  { name: 'sales_main', type: 'MYSQL', logo: '🐬', desc: '销售订单 + 客户信息主库', synced: 24, total: 32, isDefault: true },
  { name: 'analytics_pg', type: 'POSTGRESQL', logo: '🐘', desc: '产品分析 OLAP 数据仓库', synced: 12, total: 18 },
  { name: 'erp_oracle', type: 'ORACLE', logo: '🅾', desc: '企业 ERP 业务系统迁移过来的副本', synced: 56, total: 64 },
  { name: 'lake_clickhouse', type: 'CLICKHOUSE', logo: '⚡', desc: '日志 / 行为数据列存', synced: 8, total: 10 },
];

export default function DatasourceCardPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 980, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · DISPLAY</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Datasource Card</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>logo + 名称 + 默认 tag + hover 操作 + 表数 — 4 列网格</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {DATASOURCES.map(d => (
            <Card key={d.name} d={d} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function Card({ d }: { d: typeof DATASOURCES[0] }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#fff', borderRadius: 12,
        border: `1px solid ${h ? '#cbd5e1' : '#e2e8f0'}`,
        padding: 18,
        cursor: 'pointer',
        transition: 'all 200ms',
        boxShadow: h ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>{d.logo}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
            {d.isDefault && (
              <span style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: 2,
                padding: '2px 6px', borderRadius: 16,
                background: '#dcfce7', color: '#15803d',
                fontSize: 10, fontWeight: 500,
                border: '1px solid #bbf7d0',
              }}>✓ 默认</span>
            )}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.type}</div>
        </div>
        <div style={{
          display: 'flex', gap: 4,
          marginBottom: 16,
          opacity: h ? 1 : 0,
          transition: 'opacity 200ms',
        }}>
          {['⭐', '💬', '✎', '🗑'].map((ic, i) => (
            <button key={i} style={{
              width: 22, height: 22, borderRadius: 4,
              background: 'transparent', border: 'none', color: '#64748b',
              cursor: 'pointer', fontSize: 11,
            }}>{ic}</button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 13, color: '#475569', minHeight: 40, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
        {d.desc}
      </div>

      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
        <span>📋</span>
        <span>已同步 {d.synced} / 共 {d.total} 表</span>
      </div>
    </div>
  );
}
