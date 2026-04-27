import { useState } from 'react';
import { CheckCircle, Database, Edit2, MessageSquare, Plus, Search, Star, Trash2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const DS = [
  { name: 'sales_main',     type: 'MYSQL',         accent: '#00758f', desc: '销售订单 + 客户主库',     synced: 24, total: 32, isDefault: true },
  { name: 'analytics_pg',   type: 'POSTGRESQL',    accent: '#336791', desc: '产品分析 OLAP 数仓',     synced: 12, total: 18 },
  { name: 'erp_oracle',     type: 'ORACLE',        accent: '#f80000', desc: 'ERP 副本（迁移）',       synced: 56, total: 64 },
  { name: 'lake_clickhouse',type: 'CLICKHOUSE',    accent: '#fcd535', desc: '日志列存',                synced: 8,  total: 10 },
  { name: 'doris_olap',     type: 'DORIS',         accent: '#0a85e6', desc: 'BI 即席查询',             synced: 3,  total: 6 },
  { name: 'es_logs',        type: 'ELASTICSEARCH', accent: '#005571', desc: '应用日志全文检索',        synced: 1,  total: 1 },
  { name: 'dameng_legacy',  type: 'DAMENG',        accent: '#c52127', desc: '国产数据库历史库',        synced: 0,  total: 18 },
  { name: 'excel_import',   type: 'EXCEL',         accent: '#107c41', desc: '一次性 xlsx 上传',        synced: 4,  total: 4 },
];

export default function DatasourceGridPage() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>数据源</h1>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>管理空间内所有数据库连接</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select style={{
              padding: '4px 12px', borderRadius: 8,
              border: '1px solid #d9d9d9', fontSize: 14, color: '#475569',
              height: 32, background: '#fff', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>
              <option>所有类型</option>
            </select>
            <div style={{ position: 'relative', width: 200 }}>
              <input placeholder="搜索数据源名" style={{
                width: '100%', padding: '4px 32px 4px 12px',
                borderRadius: 8, border: '1px solid #d9d9d9',
                fontSize: 14, height: 32, outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }} />
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', right: 10, top: 8 }} />
            </div>
            <button style={{
              padding: '4px 14px', height: 32,
              background: '#10b981', color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 400,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <Plus size={14} /> 新建
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
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
        padding: 20, cursor: 'pointer',
        boxShadow: h ? '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)' : 'none',
        transition: 'all 200ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 8,
          background: `${d.accent}1A`, color: d.accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Database size={20} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: 14, fontWeight: 600, color: '#1e293b',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{d.name}</span>
            {d.isDefault && (
              <span style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: 2,
                padding: '2px 6px', borderRadius: 999,
                background: '#dcfce7', color: '#15803d',
                fontSize: 10, fontWeight: 500,
                border: '1px solid #bbf7d0',
              }}>
                <CheckCircle size={10} /> 默认
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.type}</div>
        </div>
        <div style={{
          display: 'flex', gap: 4, marginBottom: 20,
          opacity: h ? 1 : 0, transition: 'opacity 200ms',
        }}>
          {[Star, MessageSquare, Edit2, Trash2].map((Icon, i) => (
            <button key={i} style={{
              width: 24, height: 24,
              background: 'transparent', border: 'none', color: '#64748b',
              cursor: 'pointer', borderRadius: 4,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon size={14} /></button>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 12, fontSize: 14, color: '#475569',
        minHeight: 40, lineHeight: 1.5,
        overflow: 'hidden',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      }}>{d.desc}</div>

      <div style={{
        marginTop: 16, paddingTop: 12,
        borderTop: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 14, color: '#64748b',
      }}>
        <Database size={14} /> 已同步 {d.synced} / 共 {d.total} 表
      </div>
    </div>
  );
}
