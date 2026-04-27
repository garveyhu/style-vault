import { useState } from 'react';
import { Button, Card, ConfigProvider, Select } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

export default function RowColumnRuleBuilderPage() {
  const [ruleType, setRuleType] = useState<'row' | 'column'>('row');
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 切换器 */}
          <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'rgba(229,231,235,0.6)', borderRadius: 12, alignSelf: 'flex-start' }}>
            {(['row', 'column'] as const).map(t => {
              const active = ruleType === t;
              return (
                <button key={t} onClick={() => setRuleType(t)} style={{
                  padding: '6px 16px', borderRadius: 8,
                  background: active ? HEX : 'transparent',
                  color: active ? '#fff' : '#475569',
                  border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 500,
                  fontFamily: SAGE_FONT,
                }}>{t === 'row' ? '行规则' : '列规则'}</button>
              );
            })}
          </div>

          {ruleType === 'row' ? <RowRule /> : <ColumnRule />}
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function RowRule() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{
          padding: 16, background: '#fff',
          border: `1px solid ${HEX}33`, borderRadius: 8,
        }}>
          {/* 根 AND 容器 */}
          <RuleNode op="AND" depth={0} />
        </div>
      </div>
      {/* 系统变量面板 */}
      <div style={{ width: 288, flexShrink: 0 }}>
        <Card size="small" title={<span style={{ fontSize: 14, fontWeight: 500 }}>系统变量</span>}>
          <div style={{ fontSize: 13, color: '#64748b', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['$user_id', '当前用户 ID'],
              ['$user_name', '当前用户名'],
              ['$space_id', '当前空间 ID'],
              ['$now', '当前时间戳'],
              ['$today', '今日日期'],
            ].map(([k, v]) => (
              <div key={k} style={{
                padding: '8px 10px',
                background: '#fafafa',
                border: '1px solid #f1f5f9',
                borderRadius: 6,
                cursor: 'pointer',
              }}>
                <div style={{ color: HEX, fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 12 }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function RuleNode({ op, depth }: { op: 'AND' | 'OR'; depth: number }) {
  const purple = depth === 0 ? HEX : '#9850fd';
  return (
    <div style={{
      padding: 12,
      border: `1px solid ${purple}33`,
      borderLeft: `3px solid ${purple}`,
      borderRadius: 6,
      background: `${purple}08`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          padding: '2px 10px', borderRadius: 4,
          background: purple, color: '#fff',
          fontSize: 12, fontWeight: 600,
        }}>{op}</span>
        <span style={{ fontSize: 12, color: '#64748b' }}>满足{op === 'AND' ? '全部' : '任一'}条件</span>
        <Button size="small" type="text" icon={<Plus size={12} />}>+ 条件</Button>
        <Button size="small" type="text" icon={<Plus size={12} />}>+ 子组</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Condition field="department" cmp="=" value="$user.department" />
        <Condition field="created_at" cmp=">=" value="$today" />
        {depth === 0 && (
          <div style={{ marginLeft: 20 }}>
            <RuleNode op="OR" depth={depth + 1} />
          </div>
        )}
      </div>
    </div>
  );
}

function Condition({ field, cmp, value }: { field: string; cmp: string; value: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: 8,
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 4,
    }}>
      <Select size="small" value={field} style={{ width: 140 }} options={[{ label: field, value: field }]} />
      <Select size="small" value={cmp} style={{ width: 80 }} options={[{ label: cmp, value: cmp }]} />
      <Select size="small" value={value} style={{ flex: 1 }} options={[{ label: value, value }]} />
      <Button size="small" type="text" icon={<Trash2 size={14} />} />
    </div>
  );
}

const FIELDS = [
  { name: 'id', comment: '主键' },
  { name: 'user_name', comment: '用户名' },
  { name: 'phone', comment: '手机号' },
  { name: 'id_card', comment: '身份证号' },
  { name: 'email', comment: '邮箱' },
  { name: 'address', comment: '地址' },
  { name: 'salary', comment: '薪资' },
  { name: 'company', comment: '所属公司' },
  { name: 'created_at', comment: '创建时间' },
  { name: 'updated_at', comment: '更新时间' },
  { name: 'department', comment: '部门' },
  { name: 'position', comment: '岗位' },
];

const STRATEGIES = [
  { label: '手机号脱敏', value: 'phone', example: '138****1234' },
  { label: '身份证脱敏', value: 'idcard', example: '3324****1234' },
  { label: '姓名脱敏', value: 'name', example: '田**' },
  { label: '邮箱脱敏', value: 'email', example: 'a***@x.com' },
  { label: '完全隐藏', value: 'hide', example: '****' },
];

function ColumnRule() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    id: true, user_name: true, phone: true, id_card: true, email: true,
    address: false, salary: false, company: true, created_at: true, updated_at: true,
    department: true, position: true,
  });
  const [strategy, setStrategy] = useState<Record<string, string | undefined>>({
    phone: 'phone', id_card: 'idcard', user_name: 'name', email: 'email',
  });

  const enableAll = () => setEnabled(Object.fromEntries(FIELDS.map(f => [f.name, true])));
  const disableAll = () => setEnabled(Object.fromEntries(FIELDS.map(f => [f.name, false])));

  return (
    <div>
      {/* 批量操作 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Button size="small" onClick={enableAll}>全部启用</Button>
        <Button size="small" onClick={disableAll}>全部禁用</Button>
        <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 8 }}>
          {Object.values(enabled).filter(Boolean).length} / {FIELDS.length} 已启用
        </span>
      </div>

      {/* 字段网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {FIELDS.map(f => {
          const en = enabled[f.name];
          return (
            <div
              key={f.name}
              onClick={() => setEnabled(s => ({ ...s, [f.name]: !s[f.name] }))}
              style={{
                padding: 12,
                border: `1px solid ${en ? '#86efac' : '#fca5a5'}`,
                background: en ? '#f0fdf4' : '#fef2f2',
                opacity: en ? 1 : 0.6,
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 500, fontSize: 13, color: '#374151',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{f.name}</div>
                  <div style={{
                    fontSize: 11, color: '#6b7280', marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{f.comment}</div>
                </div>
                <span style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: en ? '#22c55e' : '#ef4444',
                  flexShrink: 0,
                }} />
              </div>
              {en && (
                <div onClick={e => e.stopPropagation()} style={{ marginTop: 8 }}>
                  <Select
                    size="small"
                    value={strategy[f.name]}
                    placeholder="不脱敏"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={v => setStrategy(s => ({ ...s, [f.name]: v }))}
                    options={STRATEGIES.map(s => ({
                      value: s.value,
                      label: (
                        <div>
                          <div>{s.label}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{s.example}</div>
                        </div>
                      ),
                    }))}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
