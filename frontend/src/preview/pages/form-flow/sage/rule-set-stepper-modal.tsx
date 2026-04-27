import { Layers, Users } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const RULES = [
  { name: '区域脱敏 · 北京区',  type: 'row',    ds: 'sales_main',   table: 'orders' },
  { name: '手机号 mask',        type: 'column', ds: 'crm',          table: 'customers' },
  { name: '财务字段权限',        type: 'column', ds: 'erp_oracle',   table: 'invoices' },
];

export default function RuleSetStepperModalPage() {
  return (
    <PreviewFrame bg="rgba(15,23,42,0.20)" padded={false}>
      <div style={{
        minHeight: 720, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          width: 1100, maxHeight: 600,
          background: '#fff', borderRadius: 8,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        }}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #e2e8f0',
            fontSize: 16, fontWeight: 600, color: '#1e293b',
          }}>
            新建规则集
          </div>

          <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'flex', gap: 0, marginBottom: 16, alignItems: 'center' }}>
              <Step idx={1} title="规则配置" Icon={Layers} active />
              <span style={{ flex: 1, height: 1, background: '#e2e8f0', margin: '0 12px' }} />
              <Step idx={2} title="用户分配" Icon={Users} />
            </div>

            <Card title="基本信息">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="名称 *" placeholder="输入规则集名称" />
                <Field label="描述" placeholder="可选" />
              </div>
            </Card>

            <Card
              title="规则列表"
              extra={<span style={{
                padding: '2px 8px', borderRadius: 4,
                background: '#10b981', color: '#fff', fontSize: 11,
              }}>{RULES.length}</span>}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RULES.map(r => (
                  <div key={r.name} style={{
                    padding: 12, background: '#f8fafc', borderRadius: 8,
                    border: `1px solid ${r.type === 'row' ? '#10b981' : '#9850fd'}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4,
                        background: r.type === 'row' ? '#10b981' : '#9850fd',
                        color: '#fff', fontSize: 11, fontWeight: 500,
                      }}>{r.type === 'row' ? '行规则' : '列规则'}</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{r.ds} / {r.table}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button style={{ padding: '2px 8px', background: 'transparent', color: '#475569', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>编辑</button>
                      <button style={{ padding: '2px 8px', background: 'transparent', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>删除</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="添加规则">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                <Field label="规则名" placeholder="名称" />
                <Field label="类型" placeholder="行规则" />
                <Field label="数据源" placeholder="选择数据源" />
                <Field label="表" placeholder="选择表" />
              </div>
              <div style={{ marginTop: 12, padding: 16, background: '#f8fafc', borderRadius: 8, color: '#94a3b8', fontSize: 13, textAlign: 'center' }}>
                RuleBuilder 可视化规则构造区
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{
                  padding: '4px 14px', height: 32,
                  background: '#10b981', color: '#fff',
                  border: 'none', borderRadius: 8,
                  fontSize: 14, fontWeight: 400, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}>+ 添加</button>
              </div>
            </Card>
          </div>

          <div style={{
            padding: 16, borderTop: '1px solid #e2e8f0',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span />
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '4px 14px', height: 32,
                background: 'transparent', color: '#475569',
                border: '1px solid #d9d9d9', borderRadius: 8,
                fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              }}>取消</button>
              <button style={{
                padding: '4px 14px', height: 32,
                background: '#10b981', color: '#fff',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 400, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}>下一步</button>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Step({ idx, title, Icon, active }: { idx: number; title: string; Icon: React.ComponentType<{ size?: number }>; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: active ? '#10b981' : '#e2e8f0',
        color: active ? '#fff' : '#94a3b8',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 600,
      }}>{idx}</span>
      <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#0f172a' : '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Icon size={14} /> {title}
      </span>
    </div>
  );
}

function Card({ title, extra, children }: { title: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 8, padding: 16, marginBottom: 12,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 12,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{title}</span>
        {extra}
      </div>
      {children}
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, color: '#475569', marginBottom: 4 }}>{label}</label>
      <input placeholder={placeholder} style={{
        width: '100%', padding: '6px 10px',
        border: '1px solid #d9d9d9', borderRadius: 6,
        fontSize: 14, outline: 'none', height: 32,
        fontFamily: 'Inter, sans-serif',
      }} />
    </div>
  );
}
