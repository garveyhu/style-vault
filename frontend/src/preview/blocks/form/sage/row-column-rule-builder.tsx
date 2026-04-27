import { useState } from 'react';
import { Button, Card, ConfigProvider, Select, Tooltip } from 'antd';
import {
  CaretDownOutlined, CaretRightOutlined, DeleteOutlined,
  FolderAddOutlined, PlusOutlined,
  ClockCircleOutlined, CopyOutlined, UserOutlined,
} from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const FIELDS = [
  { id: 1, fieldName: 'department', fieldComment: '部门', fieldType: 'varchar' },
  { id: 2, fieldName: 'created_at', fieldComment: '创建时间', fieldType: 'datetime' },
  { id: 3, fieldName: 'status', fieldComment: '状态', fieldType: 'varchar' },
  { id: 4, fieldName: 'amount', fieldComment: '金额', fieldType: 'decimal' },
  { id: 5, fieldName: 'phone', fieldComment: '手机号', fieldType: 'varchar' },
  { id: 6, fieldName: 'id_card', fieldComment: '身份证号', fieldType: 'varchar' },
  { id: 7, fieldName: 'email', fieldComment: '邮箱', fieldType: 'varchar' },
  { id: 8, fieldName: 'salary', fieldComment: '薪资', fieldType: 'decimal' },
  { id: 9, fieldName: 'address', fieldComment: '地址', fieldType: 'varchar' },
  { id: 10, fieldName: 'company', fieldComment: '公司', fieldType: 'varchar' },
  { id: 11, fieldName: 'position', fieldComment: '岗位', fieldType: 'varchar' },
  { id: 12, fieldName: 'updated_at', fieldComment: '更新时间', fieldType: 'datetime' },
];

const STRATEGIES = [
  { key: 'phone', displayName: '手机号脱敏', example: '138****1234' },
  { key: 'idcard', displayName: '身份证脱敏', example: '3324****1234' },
  { key: 'name', displayName: '姓名脱敏', example: '田**' },
  { key: 'email', displayName: '邮箱脱敏', example: 'a***@x.com' },
  { key: 'hide', displayName: '完全隐藏', example: '****' },
];

const DEPTH_COLORS = ['border-l-gray-400', 'border-l-green-400', 'border-l-purple-400', 'border-l-orange-400', 'border-l-pink-400', 'border-l-cyan-400'];

export default function RowColumnRuleBuilderPage() {
  const [ruleType, setRuleType] = useState<'row' | 'column'>('row');
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div className="max-w-5xl mx-auto" style={{ fontFamily: SAGE_FONT }}>
          {/* 切换器（演示用） */}
          <div className="inline-flex gap-1 p-1 bg-gray-200/60 rounded-xl mb-4">
            {(['row', 'column'] as const).map(t => {
              const active = ruleType === t;
              return (
                <button key={t} onClick={() => setRuleType(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'text-white shadow-sm' : 'text-slate-600'
                  }`}
                  style={{ background: active ? HEX : 'transparent' }}
                >{t === 'row' ? '行规则' : '列规则'}</button>
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
    <div className="flex gap-4">
      <div className="flex-1">
        <RuleGroup depth={0} logic="AND" />
      </div>
      <div className="w-72 flex-shrink-0">
        <SystemVariablePanel />
      </div>
    </div>
  );
}

function RuleGroup({ depth, logic }: { depth: number; logic: 'AND' | 'OR' }) {
  const depthColor = DEPTH_COLORS[depth % DEPTH_COLORS.length];
  return (
    <div className={`rule-tree-group my-2 ${depth > 0 ? 'ml-4' : ''}`}>
      {/* 规则组头部 */}
      <div className={`flex items-center gap-2 p-2 bg-white rounded-t-lg border border-gray-200 border-l-4 ${depthColor}`}>
        <Button type="text" size="small" icon={<CaretDownOutlined />} className="flex-shrink-0" />
        <Select
          value={logic}
          style={{ width: 100 }}
          size="small"
          options={[{ label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }]}
        />
        <span className="text-sm text-gray-500">满足{logic === 'AND' ? '全部' : '任一'}条件（{depth === 0 ? 3 : 2}）</span>
        <div className="ml-auto flex items-center gap-1">
          <Tooltip title="添加条件"><Button type="text" size="small" icon={<PlusOutlined />} /></Tooltip>
          <Tooltip title="添加子组"><Button type="text" size="small" icon={<FolderAddOutlined />} /></Tooltip>
          <Tooltip title="删除组"><Button type="text" size="small" danger icon={<DeleteOutlined />} /></Tooltip>
        </div>
      </div>

      {/* 规则组内容 */}
      <div className={`p-2 bg-gray-50/50 border border-t-0 border-gray-200 rounded-b-lg border-l-4 ${depthColor}`}>
        <div className="space-y-1">
          <div className="my-2">
            <RuleCondition field="department" op="=" value="$user.department" />
          </div>
          {/* AND/OR 分隔 chip */}
          <div className="flex items-center justify-center my-1">
            <span className={`text-xs px-2 py-0.5 rounded ${logic === 'AND' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-600'}`}>
              {logic}
            </span>
          </div>
          <div className="my-2">
            <RuleCondition field="created_at" op=">=" value="$today" />
          </div>
          {depth === 0 && (
            <>
              <div className="flex items-center justify-center my-1">
                <span className={`text-xs px-2 py-0.5 rounded ${logic === 'AND' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-600'}`}>{logic}</span>
              </div>
              <RuleGroup depth={depth + 1} logic="OR" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RuleCondition({ field, op, value }: { field: string; op: string; value: string }) {
  return (
    <div className="rule-tree-item my-2 flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
      <Select size="small" value={field} style={{ width: 160 }} options={FIELDS.map(f => ({ label: f.fieldName, value: f.fieldName }))} />
      <Select size="small" value={op} style={{ width: 100 }}
        options={[{ label: '=', value: '=' }, { label: '!=', value: '!=' }, { label: '>=', value: '>=' }, { label: '<=', value: '<=' }, { label: 'in', value: 'in' }, { label: 'not in', value: 'not in' }]} />
      <Select size="small" value={value} style={{ flex: 1 }} options={[{ label: value, value }]} />
      <Tooltip title="插入变量"><Button type="text" size="small" icon={<CopyOutlined />} /></Tooltip>
      <Button type="text" size="small" danger icon={<DeleteOutlined />} />
    </div>
  );
}

function SystemVariablePanel() {
  return (
    <Card size="small" title={<span className="text-sm font-medium">系统变量</span>}>
      <div className="space-y-2">
        {[
          { cat: '用户', icon: <UserOutlined />, vars: [['$user.id', '当前用户 ID'], ['$user.name', '当前用户名'], ['$user.dept', '当前部门']] },
          { cat: '空间', icon: <CaretDownOutlined />, vars: [['$space.id', '当前空间 ID']] },
          { cat: '时间', icon: <ClockCircleOutlined />, vars: [['$now', '当前时间戳'], ['$today', '今日 0 点'], ['$yesterday', '昨日 0 点']] },
        ].map(g => (
          <div key={g.cat}>
            <div className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">{g.icon} {g.cat}</div>
            {g.vars.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-2 py-1 rounded text-xs hover:bg-gray-100 cursor-pointer">
                <span className="font-mono text-emerald-600">{k}</span>
                <span className="text-gray-400">{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ColumnRule() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    department: true, created_at: true, status: true, amount: true, phone: true, id_card: true,
    email: true, salary: false, address: false, company: true, position: true, updated_at: true,
  });
  const [strategy, setStrategy] = useState<Record<string, string | null>>({
    phone: 'phone', id_card: 'idcard', email: 'email',
  });

  const enableAll = () => setEnabled(Object.fromEntries(FIELDS.map(f => [f.fieldName, true])));
  const disableAll = () => setEnabled(Object.fromEntries(FIELDS.map(f => [f.fieldName, false])));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button size="small" onClick={enableAll}>全部启用</Button>
        <Button size="small" onClick={disableAll}>全部禁用</Button>
        <span className="text-sm text-gray-500 ml-2">已启用 {Object.values(enabled).filter(Boolean).length} / {FIELDS.length}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {FIELDS.map(field => {
          const isEnabled = enabled[field.fieldName] ?? true;
          return (
            <Card
              key={field.id}
              size="small"
              className={`cursor-pointer transition-all ${
                isEnabled ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50 opacity-60'
              }`}
              onClick={() => setEnabled(s => ({ ...s, [field.fieldName]: !isEnabled }))}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="truncate flex-1">
                  <div className="font-medium text-sm truncate">{field.fieldName}</div>
                  {field.fieldComment && (
                    <div className="text-xs text-gray-500 truncate">{field.fieldComment}</div>
                  )}
                </div>
                <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              {isEnabled && (
                <div className="mt-2" onClick={e => e.stopPropagation()}>
                  <Select
                    size="small"
                    style={{ width: '100%' }}
                    placeholder="不脱敏"
                    allowClear
                    value={strategy[field.fieldName] ?? undefined}
                    onChange={v => setStrategy(s => ({ ...s, [field.fieldName]: v ?? null }))}
                    options={STRATEGIES.map(s => ({
                      label: `${s.displayName}（${s.example}）`,
                      value: s.key,
                    }))}
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
