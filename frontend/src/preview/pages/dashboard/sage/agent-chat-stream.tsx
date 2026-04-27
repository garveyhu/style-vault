import { useState } from 'react';
import { Button, Card, ConfigProvider, Dropdown, type MenuProps } from 'antd';
import {
  BarChart3, Book, BookOpen, Bot, Check, CheckCircle, ChevronDown, ChevronRight,
  Crown, Database, Download, Feather, LayoutGrid, LineChart, Maximize, Mic,
  MoreHorizontal, MoreVertical, Package, PanelLeftClose, PieChart, Plus, RotateCw,
  Send, Shield, ShieldCheck, Sparkles, Star, Terminal, ThumbsDown, ThumbsUp, Zap,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

// products/sage 与 styles/saas-tool/sage-multitheme-data-platform 复用作封面
export function AgentChatStreamScene({
  themeHex = '#10b981',
  themeLight: _themeLight = '#34d399',
  themeSelection: _themeSelection = '#a7f3d0',
}: {
  themeHex?: string;
  themeLight?: string;
  themeSelection?: string;
}) {
  return (
    <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: themeHex, borderRadius: 8 } }}>
    <div style={{
      display: 'flex', height: '100%', minHeight: '100%',
      fontFamily: SAGE_FONT,
      background: 'rgb(249,249,249)',
      position: 'relative',
    }}>
      <Sidebar themeHex={themeHex} />

      <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: 1, background: '#fff',
          borderTopLeftRadius: 16, borderTopRightRadius: 16,
          borderTop: '1px solid rgba(241,245,249,0.50)',
          borderLeft: '1px solid rgba(241,245,249,0.50)',
          borderRight: '1px solid rgba(241,245,249,0.50)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
        }}>
          <ChatHeader themeHex={themeHex} />
          <ChatMessages themeHex={themeHex} />
          <ChatComposer themeHex={themeHex} />
        </div>
      </div>

      {/* 右下角雪人 FAB · 闭合态 */}
      <SnowmanFab themeHex={themeHex} />
    </div>
    </ConfigProvider>
  );
}

export default function AgentChatStreamPage() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <AgentChatStreamScene />
    </PreviewFrame>
  );
}

/* ============== Sidebar ============== */

function Sidebar({ themeHex }: { themeHex: string }) {
  const sessions = [
    { name: '本月销售 Top 10', active: true },
    { name: '订单异常分析' },
    { name: '客户留存漏斗' },
    { name: 'GMV 月度趋势' },
    { name: '财务对账问题' },
    { name: '活跃用户 DAU' },
    { name: '产品转化率' },
    { name: 'KPI 月报草稿' },
    { name: '渠道流量分析' },
    { name: '用户行为路径' },
    { name: '退款原因分布' },
    { name: '库存周转分析' },
  ];
  return (
    <div style={{
      width: 256, background: 'rgb(249,249,249)',
      padding: '16px 12px 8px',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #e2e8f0',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 16, color: '#1e293b', letterSpacing: '-0.025em', minWidth: 0, flex: 1 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: themeHex,
          }}><Feather size={20} /></span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Sage</span>
        </div>
        <PanelLeftClose size={20} color="#64748b" />
      </div>

      <button style={{
        width: '100%', padding: '8px 12px', borderRadius: 8,
        background: 'transparent', border: 'none',
        color: '#64748b', fontSize: 14, cursor: 'pointer', fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 4,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <LayoutGrid size={18} /><span style={{ fontSize: 14 }}>默认空间</span>
        </span>
        <ChevronDown size={14} color="#94a3b8" />
      </button>

      <SidebarBtn Icon={Plus} label="新建对话" />
      <SidebarBtn Icon={Star} label="收藏夹" />
      <SidebarBtn Icon={Package} label="智能体商店" />

      <div style={{
        padding: '8px 12px', marginTop: 8,
        position: 'sticky', top: 0, background: 'rgb(249,249,249)', zIndex: 10,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          对话
        </span>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            padding: '6px 12px', borderRadius: 8, marginBottom: 2,
            background: s.active ? 'rgb(239,239,239)' : 'transparent',
            color: s.active ? themeHex : '#475569',
            fontSize: 14, fontWeight: 500,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
            {s.active && <MoreHorizontal size={14} color="#94a3b8" />}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 8px', borderRadius: 8 }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: themeHex,
          }}><Crown size={18} /></span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>admin</span>
        </div>
      </div>
    </div>
  );
}

function SidebarBtn({ Icon, label }: { Icon: React.ComponentType<{ size?: number }>; label: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 8,
        background: h ? 'rgb(237,237,237)' : 'transparent',
        color: '#64748b', border: 'none', cursor: 'pointer',
        fontSize: 14, fontWeight: 500, textAlign: 'left',
        fontFamily: SAGE_FONT, transition: 'all 200ms',
      }}
    >
      <Icon size={20} /><span>{label}</span>
    </button>
  );
}

/* ============== Header ============== */

function ChatHeader({ themeHex: _ }: { themeHex: string }) {
  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid rgba(226,232,240,0.50)',
      height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          通义千问<ChevronDown size={14} color="#94a3b8" />
        </span>
      </div>
      <div style={{
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 14, fontWeight: 500, color: '#1e293b',
      }}>本月销售 Top 10</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={iconBtn}><Database size={18} /></button>
        <button style={iconBtn}><MoreVertical size={20} /></button>
      </div>
    </header>
  );
}

/* ============== Messages ============== */

const THINKING_STEPS = [
  '分析用户意图', '理解问题上下文', '系统安全检查', '选择相关表',
  '生成 SQL 查询', '应用权限过滤', '系统安全检查', '执行 SQL 查询',
  '系统安全检查', '生成口径说明', '生成答案',
];

const TABLE_COLS = ['排名', '产品', '销量', '销售额', '环比'];
const TABLE_ROWS: Array<[string, string, string, string, string]> = [
  ['1', 'Aeron 人体工学椅',     '624',   '¥1,872,000', '+12.4%'],
  ['2', 'Kindle Paperwhite',    '982',   '¥588,000',   '+8.1%'],
  ['3', '小米空气净化器 4',     '412',   '¥412,000',   '+15.2%'],
  ['4', 'AeroPress 手冲咖啡壶', '1,820', '¥218,400',   '+22.7%'],
];

function ChatMessages({ themeHex }: { themeHex: string }) {
  // 思考过程默认折叠（源码 setIsThinkingExpanded 默认 false，仅流式新步骤时自动展开）
  const [thinkingOpen, setThinkingOpen] = useState(false);

  return (
    <div style={{
      flex: 1, padding: '24px 0', overflowY: 'auto', background: '#fff',
    }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* AI 消息 */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 4,
          }}><Bot size={16} /></span>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* 思考过程 button · 默认折叠，点击切换 */}
            <button
              onClick={() => setThinkingOpen(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 8px', height: 32,
                fontSize: 14, fontWeight: 500,
                color: '#64748b', background: 'transparent',
                border: 'none', cursor: 'pointer', borderRadius: 6,
                fontFamily: SAGE_FONT,
                marginBottom: thinkingOpen ? 8 : 12,
              }}>
              {thinkingOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                思考过程<span style={{ color: '#94a3b8', fontWeight: 400 }}>21.3s</span>
              </span>
            </button>

            {/* 思考过程列表 · 仅展开时显示 */}
            {thinkingOpen && (
              <div style={{
                marginLeft: 8, paddingLeft: 16,
                borderLeft: '2px solid #f1f5f9',
                marginBottom: 18,
                display: 'flex', flexDirection: 'column', gap: 8,
                fontSize: 13,
              }}>
                {THINKING_STEPS.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: `${themeHex}1A`, color: themeHex,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}><Check size={12} strokeWidth={3} /></span>
                    <span style={{ color: '#334155', fontWeight: 500 }}>{s}</span>
                    <ChevronRight size={14} color="#cbd5e1" />
                  </div>
                ))}
              </div>
            )}

            {/* 口径解读卡片 · 答案 + chip + 折叠"查看使用的规则和备注" 三块合一 */}
            <div style={{
              padding: '14px 16px',
              background: `${themeHex}0F`,
              borderRadius: 10,
              border: `1px solid ${themeHex}26`,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <BookOpen size={16} color={themeHex} style={{ marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#334155', lineHeight: 1.7 }}>
                  根据本月销售订单数据聚合，按销售额（数量 × 单价）降序排列，给出销量前 4 的产品。仅统计已支付订单，剔除退款。
                </span>
              </div>
              {/* chip tags */}
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Chip label="销售订单表" hex={themeHex} />
                <Chip label="商品主数据" hex={themeHex} />
                <Chip label="退款过滤规则" hex={themeHex} />
              </div>
              {/* 折叠 */}
              <button style={{
                marginTop: 8,
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: 0, height: 22,
                background: 'transparent', border: 'none',
                color: '#64748b', fontSize: 13, cursor: 'pointer',
                fontFamily: SAGE_FONT,
              }}>
                <ChevronRight size={14} /> 查看使用的规则和备注
              </button>
            </div>

            {/* 数据洞察 bullet 列表 · 数据概览 / 关键分布 / 异常点 / 建议 */}
            <div style={{
              marginTop: 14,
              borderLeft: `3px solid ${themeHex}`,
              padding: '10px 14px 10px 16px',
              background: `linear-gradient(135deg, ${themeHex}0D 0%, ${themeHex}05 100%)`,
              borderRadius: '0 8px 8px 0',
              fontSize: 13, color: '#334155', lineHeight: 1.85,
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  ['数据概览', '本月销售前 4 名产品总销售额 ¥3,090,400，覆盖椅、电子、家电、咖啡四大品类。'],
                  ['关键分布', '头部产品 Aeron 椅独占 ¥1,872,000，约 60% 销售额；其它三款合计约 40%。'],
                  ['异常点', 'AeroPress 销量虽 1,820 件第一，但单价低使销售额排末位；环比 +22.7% 增速最高。'],
                  ['建议', '关注 Aeron 椅库存避免断货；推广 AeroPress 高增长品类；评估 Kindle / 小米空气的促销策略。'],
                ].map(([k, v]) => (
                  <li key={k} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0f172a', flexShrink: 0, marginTop: 8 }} />
                    <span><strong style={{ color: '#0f172a' }}>{k}</strong>:{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 数据表格 · 还原源码 QueryResult.tsx · 浮层 actions hover 显 */}
            <SageTable hex={themeHex} />

            {/* 图表分析 · 还原源码 ChartContainer.tsx · antd Card 风格 + extra actions */}
            <SageChartCard hex={themeHex} />

            {/* TrustBadge · 主题色 10% bg + inset shadow 边 + ShieldCheck + unicode 5 star */}
            <div style={{
              marginTop: 12,
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 999,
              color: themeHex,
              backgroundColor: `${themeHex}1A`,
              boxShadow: `inset 0 0 0 1px ${themeHex}4D`,
              fontSize: 12, fontWeight: 500,
              cursor: 'default',
            }}>
              <ShieldCheck size={12} />
              <span style={{ letterSpacing: 1 }}>★★★★★</span>
            </div>

            {/* Actions row */}
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <ActionBtn Icon={ThumbsUp} />
                <ActionBtn Icon={ThumbsDown} />
                <ActionBtn Icon={Star} />
                <ActionBtn Icon={Terminal} />
              </div>
              <ActionBtn Icon={RotateCw} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== SageTable · 还原 QueryResult.tsx 408-489 表格 ============== */
function SageTable({ hex }: { hex: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', marginTop: 14,
        borderRadius: 8,
        border: `1px solid ${hover ? '#d1d5db' : '#e5e7eb'}`,
        background: '#fff',
        boxShadow: hover ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
        overflow: 'hidden',
        transition: 'all 300ms',
      }}
    >
      {/* Actions 浮层 · absolute top-1.5 right-2 hover-only */}
      <div style={{
        position: 'absolute', top: 6, right: 8, zIndex: 20,
        display: 'inline-flex', alignItems: 'center', gap: 4,
        opacity: hover ? 1 : 0,
        transition: 'opacity 200ms',
      }}>
        <button style={tableActionBtn}><Download size={16} /></button>
        <button style={tableActionBtn}><Terminal size={16} /></button>
        <button style={tableActionBtn}><Maximize size={16} /></button>
      </div>

      <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead style={{ background: 'rgba(248,250,252,0.75)', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                {TABLE_COLS.map(col => (
                  <th key={col} style={tableTh}>{col}</th>
                ))}
                <th style={{ width: '100%' }} />
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, idx) => (
                <tr
                  key={row[0]}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : 'rgba(248,250,252,0.30)',
                    transition: 'background 150ms',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  {row.map((v, i) => (
                    <td key={i} style={{
                      ...tableTd,
                      fontFamily: i === 0 || i === 2 || i === 3 ? 'ui-monospace, SFMono-Regular, monospace' : SAGE_FONT,
                      color: i === 4 ? hex : '#4b5563',
                    }}>
                      {v}
                    </td>
                  ))}
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const tableActionBtn: React.CSSProperties = {
  padding: 6, borderRadius: 6,
  background: 'transparent', border: 'none',
  color: '#9ca3af', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  transition: 'color 200ms',
};
const tableTh: React.CSSProperties = {
  padding: '14px 24px', fontWeight: 600,
  color: '#4b5563', fontSize: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
  whiteSpace: 'nowrap', textAlign: 'center', userSelect: 'none',
};
const tableTd: React.CSSProperties = {
  padding: '14px 24px',
  whiteSpace: 'nowrap', textAlign: 'center',
  fontVariantNumeric: 'tabular-nums',
};

/* ============== SageChartCard · 还原 ChartContainer.tsx · antd Card ============== */
function SageChartCard({ hex }: { hex: string }) {
  const [type, setType] = useState<'column' | 'line' | 'pie'>('column');

  const typeMenu: MenuProps['items'] = [
    { key: 'column', label: '柱状图', icon: <BarChart3 size={14} /> },
    { key: 'line',   label: '折线图', icon: <LineChart size={14} /> },
    { key: 'pie',    label: '饼图',   icon: <PieChart size={14} /> },
  ];

  const TypeIcon = type === 'column' ? BarChart3 : type === 'line' ? LineChart : PieChart;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: hex, borderRadius: 8 } }}>
      <Card
        size="small"
        style={{ marginTop: 16, borderRadius: 8 }}
        styles={{ body: { padding: '16px' } }}
        title={
          <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>查询结果</span>
        }
        extra={
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, overflow: 'hidden' }}>
            <Dropdown menu={{ items: typeMenu, onClick: ({ key }) => setType(key as 'column' | 'line' | 'pie') }} trigger={['click']}>
              <Button
                type="text" size="small"
                icon={<TypeIcon size={14} />}
                style={iconButton}
              />
            </Dropdown>
            <Button type="text" size="small" icon={<Maximize size={14} />} style={iconButton} />
            <Button type="text" size="small" icon={<Download size={14} />} style={iconButton} />
          </div>
        }
      >
        {/* chart-analysis · 渐变 + 左 3px 主题色边 */}
        <div style={{
          padding: '12px 16px',
          marginBottom: 12,
          background: `linear-gradient(135deg, ${hex}0D 0%, ${hex}05 100%)`,
          borderRadius: 8,
          borderLeft: `3px solid ${hex}`,
          fontSize: 13, lineHeight: 1.6, color: '#333',
        }}>
          销售额前 4 名差距明显，<strong>Aeron 椅</strong>独占近一半（¥187 万），其它三款合计约 ¥121 万。建议关注头部产品库存，避免断货。
        </div>

        {/* chart-body · 350px */}
        <div style={{ height: 350, overflow: 'hidden' }}>
          {type === 'column' && <G2BarChart hex={hex} />}
          {type === 'line' && <G2LineChart hex={hex} />}
          {type === 'pie' && <G2PieChart hex={hex} />}
        </div>
      </Card>
    </ConfigProvider>
  );
}

const iconButton: React.CSSProperties = {
  width: 28, height: 28,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

/* ============== G2 风格图表（SVG 模拟 ============== */

const CHART_DATA = [
  { label: 'Aeron 椅',   value: 1872000 },
  { label: 'Kindle',     value: 588000  },
  { label: '小米空气',   value: 412000  },
  { label: 'AeroPress',  value: 218400  },
];

function G2BarChart({ hex }: { hex: string }) {
  const data = CHART_DATA;
  const max = Math.max(...data.map(d => d.value));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => t * max);

  const W = 700;
  const H = 200;
  const padL = 56;
  const padR = 16;
  const padT = 8;
  const padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const barWidth = innerW / data.length * 0.55;
  const gap = innerW / data.length;

  const fmt = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(0)}万` : `${(v / 1000).toFixed(0)}k`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* 网格线 + Y 轴刻度 */}
      {ticks.map(tk => {
        const y = padT + innerH - (tk / max) * innerH;
        return (
          <g key={tk}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 8} y={y + 4} fill="#94a3b8" fontSize={11} textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, monospace">
              {fmt(tk)}
            </text>
          </g>
        );
      })}
      {/* X 轴 */}
      <line x1={padL} y1={padT + innerH} x2={W - padR} y2={padT + innerH} stroke="#cbd5e1" strokeWidth={1} />

      {/* 柱条 */}
      {data.map((d, i) => {
        const x = padL + i * gap + (gap - barWidth) / 2;
        const h = (d.value / max) * innerH;
        const y = padT + innerH - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth} height={h} fill={hex} rx={4} ry={4} />
            <text x={x + barWidth / 2} y={y - 6} fill="#0f172a" fontSize={11} fontWeight={600} textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, monospace">
              {fmt(d.value)}
            </text>
            <text x={x + barWidth / 2} y={padT + innerH + 18} fill="#64748b" fontSize={11} textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function G2LineChart({ hex }: { hex: string }) {
  const data = CHART_DATA;
  const max = Math.max(...data.map(d => d.value));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => t * max);
  const W = 700, H = 340, padL = 64, padR = 24, padT = 16, padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const fmt = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(0)}万` : `${(v / 1000).toFixed(0)}k`;

  const points = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * innerW;
    const y = padT + innerH - (d.value / max) * innerH;
    return { x, y, d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${padT + innerH} L${points[0].x},${padT + innerH} Z`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {ticks.map(tk => {
        const y = padT + innerH - (tk / max) * innerH;
        return (
          <g key={tk}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 8} y={y + 4} fill="#94a3b8" fontSize={11} textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, monospace">
              {fmt(tk)}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + innerH} x2={W - padR} y2={padT + innerH} stroke="#cbd5e1" strokeWidth={1} />

      {/* 区域填充 */}
      <path d={areaPath} fill={hex} fillOpacity={0.12} />
      {/* 折线 */}
      <path d={linePath} fill="none" stroke={hex} strokeWidth={2.5} strokeLinejoin="round" />
      {/* 点 + label */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={5} fill="#fff" stroke={hex} strokeWidth={2.5} />
          <text x={p.x} y={p.y - 12} fill="#0f172a" fontSize={11} fontWeight={600} textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, monospace">
            {fmt(p.d.value)}
          </text>
          <text x={p.x} y={padT + innerH + 22} fill="#64748b" fontSize={11} textAnchor="middle">
            {p.d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function G2PieChart({ hex }: { hex: string }) {
  const data = CHART_DATA;
  const total = data.reduce((s, d) => s + d.value, 0);
  // 主题色 + 4 阶递减
  const colors = [hex, `${hex}CC`, `${hex}99`, `${hex}66`];
  const cx = 180, cy = 160, r = 120, ir = r * 0.3;

  let acc = 0;
  const slices = data.map((d, i) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;

    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(start);
    const iy1 = cy + ir * Math.sin(start);
    const ix2 = cx + ir * Math.cos(end);
    const iy2 = cy + ir * Math.sin(end);

    const path = [
      `M${x1},${y1}`,
      `A${r},${r} 0 ${large} 1 ${x2},${y2}`,
      `L${ix2},${iy2}`,
      `A${ir},${ir} 0 ${large} 0 ${ix1},${iy1}`,
      'Z',
    ].join(' ');

    // label 位置
    const mid = (start + end) / 2;
    const lx = cx + (r + 24) * Math.cos(mid);
    const ly = cy + (r + 24) * Math.sin(mid);

    return { path, color: colors[i], pct: (d.value / total) * 100, label: d.label, lx, ly };
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 700 340" style={{ display: 'block' }}>
      {slices.map((s, i) => (
        <g key={i}>
          <path d={s.path} fill={s.color} stroke="#fff" strokeWidth={2} />
          <text
            x={s.lx} y={s.ly}
            fill="#475569" fontSize={11}
            textAnchor={s.lx > cx ? 'start' : 'end'}
            fontFamily="Inter, sans-serif"
          >
            {s.label} {s.pct.toFixed(0)}%
          </text>
        </g>
      ))}
      {/* 图例 · 右侧（源码 legend position right）*/}
      <g transform="translate(440, 100)">
        {slices.map((s, i) => (
          <g key={i} transform={`translate(0, ${i * 28})`}>
            <rect x={0} y={0} width={14} height={14} fill={s.color} rx={2} />
            <text x={22} y={11} fill="#475569" fontSize={12} fontFamily="Inter, sans-serif">
              {s.label}
            </text>
            <text x={180} y={11} fill="#94a3b8" fontSize={12} fontFamily="ui-monospace, SFMono-Regular, monospace" textAnchor="end">
              {s.pct.toFixed(1)}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Chip({ label, hex }: { label: string; hex: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 6,
      background: `${hex}1A`, color: hex,
      fontSize: 12, fontWeight: 500,
      border: `1px solid ${hex}33`,
    }}>{label}</span>
  );
}

function ActionBtn({ Icon }: { Icon: React.ComponentType<{ size?: number }> }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 28, height: 28, borderRadius: 6,
        background: h ? '#f1f5f9' : 'transparent',
        color: '#94a3b8', border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Icon size={14} />
    </button>
  );
}

/* ============== Composer ============== */

function ChatComposer({ themeHex }: { themeHex: string }) {
  return (
    <div style={{ padding: 16, background: '#fff' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{
          background: '#fff',
          border: `1px solid ${themeHex}80`,
          borderRadius: 24,
          boxShadow: `0 0 4px ${themeHex}66, 0 0 15px ${themeHex}4D`,
          padding: 12,
        }}>
          <div style={{ width: '100%', padding: '4px 10px', fontSize: 16, color: '#94a3b8' }}>
            发消息或选择技能…
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {/* 数据问答 chip · 主题色 */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 16,
                background: `${themeHex}1A`, color: themeHex,
                fontSize: 12, fontWeight: 500,
                border: `1px solid ${themeHex}4D`,
              }}>
                <Database size={12} /> 数据问答
                <span style={{ marginLeft: 4, opacity: 0.7, fontSize: 11 }}>✕</span>
              </span>
              {/* 杭州数据库 chip · 白底 + slate-200 边（不是灰底） */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 16,
                background: '#fff', color: '#475569',
                fontSize: 12, fontWeight: 500,
                border: '1px solid #e2e8f0',
              }}>
                <Database size={12} /> 杭州数据库 <ChevronDown size={11} />
              </span>
              {/* 工具图标 · Zap / Book / BarChart3 / BookOpen / Shield / Terminal */}
              <ToolBtn Icon={Zap} />
              <ToolBtn Icon={Book} />
              <ToolBtn Icon={BarChart3} />
              <ToolBtn Icon={BookOpen} active hex={themeHex} />
              <ToolBtn Icon={CheckCircle} active hex={themeHex} />
              <ToolBtn Icon={Terminal} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'transparent', border: 'none',
                color: '#64748b', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Mic size={16} /></button>
              <span style={{ width: 1, height: 18, background: '#e2e8f0' }} />
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: themeHex, color: '#fff', border: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}><Send size={16} style={{ marginLeft: -2, marginTop: 2 }} /></button>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 8, marginBottom: 0 }}>
          内容由 AI 生成，请仔细核实
        </p>
      </div>
    </div>
  );
}

function ToolBtn({ Icon, active, hex }: { Icon: React.ComponentType<{ size?: number }>; active?: boolean; hex?: string }) {
  return (
    <button style={{
      width: 24, height: 24, borderRadius: 4,
      background: 'transparent', border: 'none',
      color: active && hex ? hex : '#94a3b8',
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={14} />
    </button>
  );
}

/* ============== Snowman FAB · 闭合态 ============== */

function SnowmanFab({ themeHex }: { themeHex: string }) {
  return (
    <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 100 }}>
      <button style={{
        width: 56, height: 56, borderRadius: '50%',
        background: '#fff',
        border: 'none', cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        position: 'relative',
        overflow: 'visible',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* 帽子 · 浮在按钮顶部外侧 */}
        <span style={{
          position: 'absolute', top: -3, left: '50%',
          transform: 'translateX(-50%) rotate(15deg)',
          width: 18, height: 12,
          background: themeHex,
          borderRadius: '5px 5px 2px 2px',
          boxShadow: '1px 1px 3px rgba(0,0,0,0.20)',
          zIndex: 6,
        }}>
          <span style={{ position: 'absolute', bottom: -2, left: -3, right: -3, height: 4, background: '#fff', borderRadius: 2 }} />
          <span style={{ position: 'absolute', top: -4, right: -4, width: 7, height: 7, background: themeHex, borderRadius: '50%' }} />
        </span>

        {/* 圆形容器 · 雪人 */}
        <span style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
            zIndex: 2,
          }}>
            {/* Head */}
            <span style={{
              width: 16, height: 16, background: '#fff',
              borderRadius: '50%', marginBottom: -3,
              position: 'relative',
              boxShadow: 'inset -1.5px -1.5px 3px rgba(0,0,0,0.10)',
            }}>
              <span style={{ position: 'absolute', top: 5, left: 4, width: 2.5, height: 2.5, background: '#1e293b', borderRadius: '50%' }} />
              <span style={{ position: 'absolute', top: 5, right: 4, width: 2.5, height: 2.5, background: '#1e293b', borderRadius: '50%' }} />
              <span style={{
                position: 'absolute', top: 7, left: '50%',
                transform: 'translateX(-30%) rotate(90deg)',
                width: 0, height: 0,
                borderLeft: '2.5px solid transparent',
                borderRight: '2.5px solid transparent',
                borderBottom: '6px solid #f97316',
              }} />
            </span>
            {/* Body */}
            <span style={{
              width: 26, height: 26, background: '#fff',
              borderRadius: '50%', position: 'relative',
              boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.10)',
            }}>
              <span style={{
                position: 'absolute', top: -2, left: '50%',
                transform: 'translateX(-50%)',
                width: 18, height: 5,
                background: themeHex, borderRadius: 4,
              }} />
              <span style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 2.5, height: 2.5, background: '#1e293b', borderRadius: '50%' }} />
              <span style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 2.5, height: 2.5, background: '#1e293b', borderRadius: '50%' }} />
            </span>
          </span>
          {/* 雪堆 · 仅作地平线暗示 */}
          <span style={{
            position: 'absolute', bottom: -6,
            left: '-10%', width: '120%', height: 10,
            background: '#fff',
            borderRadius: '50% 50% 0 0',
            filter: 'blur(0.5px)',
            zIndex: 1,
          }} />
        </span>
      </button>
    </div>
  );
}

/* ============== shared style ============== */

const iconBtn: React.CSSProperties = {
  padding: 8, borderRadius: '50%',
  background: 'transparent', border: 'none',
  color: '#94a3b8', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

const th = { padding: '10px 12px', fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: '12px' };

// Suppress unused warning from imports kept intentionally for variants
void Shield; void Sparkles;
