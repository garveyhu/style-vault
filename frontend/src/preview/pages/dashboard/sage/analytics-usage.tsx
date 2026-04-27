import { useState } from 'react';
import { Badge, Button, Card, Collapse, ConfigProvider, DatePicker, Steps, Table, Tag, Typography } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import {
  ArrowUpDown, Cat, Clock, Coffee, Cpu, Feather, FileSearch, Hash, Info, JapaneseYen,
  PieChart as PieChartIcon, Search, Star, TrendingUp, User, Users, Wallet, Zap,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const { RangePicker } = DatePicker;
const T_HEX = '#10b981';

const MODELS = [
  { name: 'gpt-4o',      tokens: 1240000, pct: 100 },
  { name: 'qwen-max',    tokens: 826000,  pct: 67 },
  { name: 'claude-3.5',  tokens: 524000,  pct: 42 },
  { name: 'gpt-4o-mini', tokens: 198000,  pct: 16 },
];

const USERS_TOP = [
  { user: 'archer', tokens: 1200000, pct: 100 },
  { user: 'lyna',   tokens: 824000,  pct: 69 },
  { user: 'zhao',   tokens: 496000,  pct: 41 },
  { user: 'sun',    tokens: 248000,  pct: 21 },
];

const REQUESTS: Array<{ id: number; user: string; Icon: React.ComponentType<{ size?: number }>; session: string; question: string; model: string; calls: number; tokens: number; ms: number; time: string }> = [
  { id: 1, user: 'archer', Icon: Feather, session: '本月销售 Top 10', question: '本月销量最高的 10 个产品？',          model: 'gpt-4o',      calls: 3,  tokens: 18420, ms: 1240, time: '2026-04-27 12:32:18' },
  { id: 2, user: 'lyna',   Icon: Star,    session: '客户留存',          question: '近 30 天的回头客占比是多少',         model: 'qwen-max',    calls: 2,  tokens: 12086, ms: 980,  time: '2026-04-27 11:50:42' },
  { id: 3, user: 'zhao',   Icon: Cat,     session: '财务对账',          question: '4 月应收应付差额',                   model: 'claude-3.5',  calls: 4,  tokens: 24812, ms: 1820, time: '2026-04-27 10:18:10' },
  { id: 4, user: 'sun',    Icon: Coffee,  session: 'GMV 趋势',          question: '过去 30 天每日 GMV',                model: 'gpt-4o-mini', calls: 2,  tokens: 9082,  ms: 720,  time: '2026-04-27 09:42:01' },
  { id: 5, user: 'wang',   Icon: User,    session: 'SQL 学习',          question: '解释一下 LEFT JOIN 和 INNER JOIN', model: 'gpt-4o',      calls: 1,  tokens: 6240,  ms: 580,  time: '2026-04-27 09:10:33' },
];

type Cost = { model: string; provider: string; reqs: number; calls: number; inTokens: number; outTokens: number; cost: number; hasPricing: boolean };
const COSTS: Cost[] = [
  { model: 'gpt-4o',      provider: 'OpenAI',    reqs: 1820, calls: 4862, inTokens: 1240000, outTokens: 580000, cost: 86.4500, hasPricing: true },
  { model: 'gpt-4o-mini', provider: 'OpenAI',    reqs: 624,  calls: 1284, inTokens: 198000,  outTokens: 124000, cost: 4.2400,  hasPricing: true },
  { model: 'qwen-max',    provider: 'DashScope', reqs: 982,  calls: 2046, inTokens: 826000,  outTokens: 380000, cost: 124.6800, hasPricing: true },
  { model: 'claude-3.5',  provider: 'Anthropic', reqs: 480,  calls: 1102, inTokens: 524000,  outTokens: 268000, cost: 68.7200, hasPricing: true },
  { model: 'qwen-plus',   provider: 'DashScope', reqs: 124,  calls: 282,  inTokens: 86000,   outTokens: 42000,  cost: 0,      hasPricing: false },
];

const TOTAL_COST = COSTS.reduce((s, c) => s + c.cost, 0);

export default function AnalyticsUsagePage() {
  const [tab, setTab] = useState(0);
  const [days, setDays] = useState<1 | 7 | 30>(7);
  const [range, setRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(7, 'day'), dayjs()]);

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <ConfigProvider theme={{ token: { colorPrimary: T_HEX, borderRadius: 8 } }}>
        <div style={{
          minHeight: 720,
          background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
          padding: 24, fontFamily: 'Inter, sans-serif', color: '#0f172a',
        }}>
          {/* Header · 同 feedback 同款 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>模型用量分析</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'rgba(229,231,235,0.60)',
                borderRadius: 12, padding: 4,
              }}>
                {([
                  { d: 1, lab: '今天' },
                  { d: 7, lab: '近 7 天' },
                  { d: 30, lab: '近 30 天' },
                ] as const).map(o => {
                  const active = days === o.d;
                  return (
                    <button
                      key={o.d}
                      onClick={() => { setDays(o.d); setRange([dayjs().subtract(o.d, 'day'), dayjs()]); }}
                      style={{
                        padding: '6px 16px', borderRadius: 8,
                        background: active ? T_HEX : 'transparent',
                        color: active ? '#fff' : '#475569',
                        border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 500,
                        boxShadow: active ? '0 4px 6px -1px rgba(0,0,0,0.10)' : 'none',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 200ms',
                      }}
                    >{o.lab}</button>
                  );
                })}
              </div>
              <span style={{ width: 1, height: 20, background: '#cbd5e1' }} />
              <RangePicker
                showTime
                value={range}
                onChange={v => v && v[0] && v[1] && setRange([v[0], v[1]])}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ borderRadius: 8 }}
              />
              <Button type="primary" icon={<Search size={14} />} style={{ borderRadius: 8 }}>
                搜索
              </Button>
            </div>
          </div>

          {/* antd Steps · 真实组件 */}
          <div style={{ marginBottom: 16 }}>
            <Steps
              current={tab}
              onChange={setTab}
              items={[
                { title: '汇总分析', icon: <TrendingUp size={18} /> },
                { title: '请求分析', icon: <FileSearch size={18} /> },
                { title: '计费分析', icon: <Wallet size={18} /> },
              ]}
            />
          </div>

          {/* tab 切换内容 */}
          {tab === 0 && <SummaryTab />}
          {tab === 1 && <RequestTab />}
          {tab === 2 && <BillingTab />}
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

/** Tab 0 · 汇总分析 · 4 stat card + 2x2 charts + 模型用量对比柱状图 */
function SummaryTab() {
  return (
    <>
      {/* StatCard 4 列 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <StatCard Icon={Zap}   label="系统请求" value="12,486" />
        <StatCard Icon={Clock} label="平均响应" value="1.42" suffix="秒" />
        <StatCard Icon={Cpu}   label="模型调用" value="18,924" />
        <StatCard Icon={Hash}  label="总 Tokens" value="2.86M" />
      </div>

      {/* 2x2 charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ChartCard Icon={PieChartIcon} title="模型分布">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingLeft: 12 }}>
            <Donut />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              {[
                { name: 'gpt-4o',      pct: 43, color: '#10b981' },
                { name: 'qwen-max',    pct: 29, color: '#34d399' },
                { name: 'claude-3.5',  pct: 18, color: '#6ee7b7' },
                { name: 'gpt-4o-mini', pct: 7,  color: '#a7f3d0' },
                { name: 'qwen-plus',   pct: 3,  color: '#d1fae5' },
              ].map(m => (
                <span key={m.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: m.color, display: 'inline-block' }} />
                  {m.name} <span style={{ color: '#94a3b8', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{m.pct}%</span>
                </span>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard Icon={Users} title="用户 Top 10（按 Tokens）">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 12px' }}>
            {USERS_TOP.map(u => (
              <div key={u.user} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <div style={{ width: 64, color: '#64748b' }}>{u.user}</div>
                <div style={{ flex: 1, height: 16, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${u.pct}%`, height: '100%', background: T_HEX, transition: 'width 600ms' }} />
                </div>
                <div style={{ width: 70, fontSize: 11, color: '#64748b', textAlign: 'right', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                  {u.tokens.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard Icon={TrendingUp} title="每日 Token 趋势">
          <div style={{ padding: '12px 8px' }}>
            <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
              <polyline fill="rgba(16,185,129,0.10)" stroke="none" points="0,100 50,80 100,90 150,60 200,70 250,40 300,50 350,30 400,20 400,120 0,120" />
              <polyline fill="none" stroke={T_HEX} strokeWidth="2" points="0,100 50,80 100,90 150,60 200,70 250,40 300,50 350,30 400,20" />
            </svg>
          </div>
        </ChartCard>

        <ChartCard Icon={ArrowUpDown} title="每日请求趋势">
          <div style={{ padding: '12px 8px' }}>
            <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
              <polyline fill="rgba(16,185,129,0.10)" stroke="none" points="0,90 50,75 100,85 150,65 200,72 250,50 300,55 350,38 400,30 400,120 0,120" />
              <polyline fill="none" stroke={T_HEX} strokeWidth="2" points="0,90 50,75 100,85 150,65 200,72 250,50 300,55 350,38 400,30" />
            </svg>
          </div>
        </ChartCard>
      </div>

      {/* model bars */}
      <div style={{ marginTop: 16, background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px', color: '#1e293b' }}>模型用量对比</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MODELS.map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 130, fontSize: 13, color: '#475569' }}>{m.name}</div>
              <div style={{ flex: 1, height: 18, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${m.pct}%`, height: '100%', background: T_HEX, transition: 'width 600ms' }} />
              </div>
              <div style={{ width: 90, fontSize: 12, color: '#64748b', textAlign: 'right', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                {m.tokens.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Tab 1 · 请求分析 · Antd Card + Table 列：用户 / 会话 / 问题 / 模型 / 调用 / Tokens / 耗时 / 时间 */
function RequestTab() {
  const columns = [
    {
      title: '用户', dataIndex: 'user', key: 'user', width: 120,
      render: (text: string, r: typeof REQUESTS[0]) => {
        const M = r.Icon;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: `${T_HEX}1A`, color: T_HEX,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><M size={14} /></span>
            <Typography.Text ellipsis style={{ flex: 1 }}>{text}</Typography.Text>
          </div>
        );
      },
    },
    { title: '会话', dataIndex: 'session', key: 'session', width: 130, ellipsis: true },
    {
      title: '问题', dataIndex: 'question', key: 'question',
      render: (text: string) => (
        <Typography.Text style={{ color: T_HEX, cursor: 'pointer' }} ellipsis>{text}</Typography.Text>
      ),
    },
    { title: '模型', dataIndex: 'model', key: 'model', width: 110 },
    { title: '调用', dataIndex: 'calls', key: 'calls', width: 60, align: 'right' as const },
    { title: 'Tokens', dataIndex: 'tokens', key: 'tokens', width: 100, align: 'right' as const, render: (v: number) => v.toLocaleString() },
    { title: '响应', dataIndex: 'ms', key: 'ms', width: 70, align: 'right' as const, render: (v: number) => `${(v / 1000).toFixed(1)}s` },
    { title: '时间', dataIndex: 'time', key: 'time', width: 160 },
  ];

  return (
    <Card variant="borderless" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10)' }} styles={{ body: { padding: 12 } }}>
      <Table
        columns={columns}
        dataSource={REQUESTS}
        rowKey="id"
        size="small"
        tableLayout="fixed"
        pagination={{
          current: 1,
          pageSize: 20,
          total: REQUESTS.length,
          showSizeChanger: true,
          size: 'small',
          showTotal: total => `共 ${total} 条`,
        }}
        onRow={() => ({ style: { cursor: 'pointer' } })}
      />
    </Card>
  );
}

/** Tab 2 · 计费分析 · 3 stat card + 模型费用 Table + 定价规则 Collapse */
function BillingTab() {
  const costColumns = [
    {
      title: '模型', dataIndex: 'model', key: 'model', width: 200,
      render: (text: string, r: Cost) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 500 }}>{text}</span>
          {!r.hasPricing && <Tag color="warning" style={{ fontSize: 11 }}>未配置定价</Tag>}
        </div>
      ),
    },
    { title: '提供方', dataIndex: 'provider', key: 'provider', width: 120 },
    { title: '系统请求', dataIndex: 'reqs', key: 'reqs', width: 100, render: (v: number) => v.toLocaleString() },
    { title: '调用次数', dataIndex: 'calls', key: 'calls', width: 100, render: (v: number) => v.toLocaleString() },
    { title: '输入 Tokens', dataIndex: 'inTokens', key: 'inTokens', width: 120, render: (v: number) => v.toLocaleString() },
    { title: '输出 Tokens', dataIndex: 'outTokens', key: 'outTokens', width: 120, render: (v: number) => v.toLocaleString() },
    {
      title: '费用', dataIndex: 'cost', key: 'cost', width: 100,
      render: (v: number) => (
        <span style={{ fontWeight: 500, color: v > 0 ? T_HEX : '#94a3b8' }}>¥{v.toFixed(4)}</span>
      ),
    },
  ];

  const PRICING_BY_PROVIDER: Array<{ provider: string; models: Array<{ model: string; tier: string; updated: string }> }> = [
    { provider: 'OpenAI', models: [
      { model: 'gpt-4o',      tier: '全量 · 输入 ¥0.0050 / 输出 ¥0.0150', updated: '2026-04-15' },
      { model: 'gpt-4o-mini', tier: '全量 · 输入 ¥0.0001 / 输出 ¥0.0006', updated: '2026-04-15' },
    ]},
    { provider: 'DashScope', models: [
      { model: 'qwen-max',    tier: '≤32k · 输入 ¥0.0080 / 输出 ¥0.0240',  updated: '2026-04-12' },
      { model: 'qwen-plus',   tier: '≤128k · 输入 ¥0.0008 / 输出 ¥0.0020', updated: '2026-04-12' },
    ]},
    { provider: 'Anthropic', models: [
      { model: 'claude-3.5',  tier: '全量 · 输入 ¥0.0030 / 输出 ¥0.0150', updated: '2026-04-10' },
    ]},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 3 stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatCard Icon={JapaneseYen} label="累计费用" value={`¥${TOTAL_COST.toFixed(2)}`} />
        <StatCard Icon={TrendingUp}  label="单请求均价" value={`¥${(TOTAL_COST / 4030).toFixed(4)}`} />
        <StatCard Icon={Info}        label="已配置模型" value={String(COSTS.filter(c => c.hasPricing).length)} suffix="个" />
      </div>

      {/* 模型费用明细 */}
      <Card
        variant="borderless"
        title={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <JapaneseYen size={16} color={T_HEX} />
            <span style={{ fontSize: 14 }}>模型费用明细</span>
          </span>
        }
        style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10)' }}
        styles={{ body: { padding: 12 } }}
      >
        <Table
          columns={costColumns}
          dataSource={COSTS}
          rowKey="model"
          size="small"
          pagination={false}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={6}><span style={{ fontWeight: 500 }}>合计</span></Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <span style={{ fontWeight: 700, color: T_HEX }}>¥{TOTAL_COST.toFixed(4)}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>

      {/* 定价规则 Collapse */}
      <Card variant="borderless" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10)' }} styles={{ body: { padding: 5 } }}>
        <Collapse
          ghost
          items={[
            {
              key: 'pricing',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Info size={16} color="#64748b" />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>查看定价规则</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>（点击展开）</span>
                </span>
              ),
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* 搜索框 */}
                  <div style={{ width: 240 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      width: '100%', padding: '6px 12px',
                      border: '1px solid #d9d9d9', borderRadius: 8,
                      color: '#94a3b8',
                    }}>
                      <Search size={14} />
                      <span style={{ fontSize: 13 }}>搜索模型 / 提供方</span>
                    </div>
                  </div>

                  {/* 各 provider */}
                  {PRICING_BY_PROVIDER.map(p => (
                    <div key={p.provider} style={{
                      background: 'rgba(248,250,252,0.50)',
                      border: '1px solid #f1f5f9',
                      borderRadius: 12, padding: 16,
                    }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        marginBottom: 12, paddingBottom: 8,
                        borderBottom: '1px solid #f1f5f9',
                      }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: `${T_HEX}33` }} />
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{p.provider}</h4>
                        <Badge count={p.models.length} style={{ backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: 10 }} />
                      </div>
                      <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ textAlign: 'left', color: '#64748b', fontSize: 11 }}>
                            <th style={{ padding: '6px 0', fontWeight: 600 }}>模型</th>
                            <th style={{ padding: '6px 0', fontWeight: 600 }}>定价规则</th>
                            <th style={{ padding: '6px 0', fontWeight: 600, width: 100 }}>更新时间</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.models.map(m => (
                            <tr key={m.model} style={{ borderTop: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '8px 0', fontWeight: 500 }}>{m.model}</td>
                              <td style={{ padding: '8px 0', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{m.tier}</td>
                              <td style={{ padding: '8px 0', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{m.updated}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}

                  <div style={{ fontSize: 12, color: '#94a3b8', paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
                    定价规则由管理员在「核心配置」里维护，按厂商分组。
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

function StatCard({ Icon, label, value, suffix }: { Icon: React.ComponentType<{ size?: number }>; label: string; value: string; suffix?: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, padding: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${T_HEX}1A`, color: T_HEX,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon size={16} /></span>
        <span style={{ fontSize: 13, color: '#64748b' }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
        {value}
        {suffix && <span style={{ fontSize: 14, color: '#64748b', marginLeft: 4, fontWeight: 400 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ChartCard({ Icon, title, children }: { Icon: React.ComponentType<{ size?: number; color?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, padding: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Icon size={16} color={T_HEX} />
        <span style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Donut() {
  const r = 36;
  const c = 2 * Math.PI * r;
  const segs = [
    { pct: 43, color: '#10b981' },
    { pct: 29, color: '#34d399' },
    { pct: 18, color: '#6ee7b7' },
    { pct: 7,  color: '#a7f3d0' },
    { pct: 3,  color: '#d1fae5' },
  ];
  let acc = 0;
  return (
    <svg width={96} height={96} viewBox="-50 -50 100 100" style={{ transform: 'rotate(-90deg)' }}>
      <circle r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
      {segs.map((s, i) => {
        const dasharray = `${(s.pct / 100) * c} ${c}`;
        const offset = -(acc / 100) * c;
        acc += s.pct;
        return (
          <circle key={i} r={r} fill="none" stroke={s.color} strokeWidth="14" strokeDasharray={dasharray} strokeDashoffset={offset} />
        );
      })}
    </svg>
  );
}
