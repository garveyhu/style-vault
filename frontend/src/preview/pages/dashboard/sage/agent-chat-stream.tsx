import { useState } from 'react';
import { ConfigProvider, Dropdown, Pagination, type MenuProps } from 'antd';
import {
  BarChart3, BookOpen, Bot, Check, ChevronDown, ChevronRight,
  Crown, Database, Download, Feather, LayoutGrid, LineChart, Map, Maximize, Mic,
  MoreHorizontal, MoreVertical, Package, PanelLeftClose, PieChart, Plus, RotateCw,
  Send, ShieldCheck, Star, Terminal, ThumbsDown, ThumbsUp, Zap,
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
      display: 'flex', height: '100vh', minHeight: 720,
      fontFamily: SAGE_FONT,
      background: 'rgb(249,249,249)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 左侧：sidebar 固定不滚动 */}
      <Sidebar themeHex={themeHex} />

      {/* 右侧：仅消息区滚动 */}
      <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <div style={{
          flex: 1, background: '#fff',
          borderRadius: 16,
          border: '1px solid rgba(241,245,249,0.50)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
          minHeight: 0,
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
      flexShrink: 0,
      height: '100%', minHeight: 0,
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
  ['1',  'Aeron 人体工学椅',     '624',   '¥1,872,000', '+12.4%'],
  ['2',  'Kindle Paperwhite',    '982',   '¥588,000',   '+8.1%'],
  ['3',  '小米空气净化器 4',     '412',   '¥412,000',   '+15.2%'],
  ['4',  'AeroPress 手冲咖啡壶', '1,820', '¥218,400',   '+22.7%'],
  ['5',  'Bose QC45 头戴耳机',   '215',   '¥537,500',   '+3.6%'],
  ['6',  'iPad Air 11 寸',       '386',   '¥1,930,000', '+18.9%'],
  ['7',  'Dyson V12 吸尘器',     '152',   '¥608,000',   '-4.2%'],
  ['8',  'Nintendo Switch OLED', '498',   '¥1,094,000', '+9.5%'],
  ['9',  '飞利浦电动牙刷',       '1,302', '¥520,800',   '+11.7%'],
  ['10', 'GoPro HERO 12',        '264',   '¥792,000',   '+6.3%'],
];

function ChatMessages({ themeHex }: { themeHex: string }) {
  // 思考过程默认折叠（源码 setIsThinkingExpanded 默认 false，仅流式新步骤时自动展开）
  const [thinkingOpen, setThinkingOpen] = useState(false);

  return (
    <div style={{
      flex: 1, padding: '24px 24px', overflowY: 'auto', overflowX: 'hidden', background: '#fff',
      minHeight: 0,
    }}>
      {/* max-w-4xl = 896px · 还原 ChatMessage.tsx:232-234 · 外层 px-6 + 内层 max-w-4xl */}
      <div style={{ maxWidth: 896, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 用户消息 · 还原 ChatMessage.tsx:303-414 · justify-end + bg-[rgb(246,246,246)] rounded-3xl + 头像 md:-right-12 */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: '90%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{
              background: 'rgb(246,246,246)',
              color: '#0f172a',
              padding: '12px 20px',
              borderRadius: 24,
              fontSize: 14, lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}>
              帮我查一下本月销售额 Top 10 的产品，按线下/线上/海外三个渠道分别统计
            </div>
          </div>
          {/* 用户头像 · md:absolute md:-right-12 */}
          <span style={{
            position: 'absolute',
            right: -48, top: 6,
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><Crown size={16} /></span>
        </div>

        {/* AI 消息 · 还原 ChatMessage.tsx:234-260 · avatar md:absolute md:-left-12 不参与对齐 */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
          <span style={{
            position: 'absolute',
            left: -48, top: 4,
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
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

            {/* 口径解读卡片 · 还原 NarrationCard.tsx · bg-neutral-50 + theme border */}
            <NarrationCardSage hex={themeHex} />

            {/* 数据表格 · 还原源码 QueryResult.tsx · 浮层 actions hover 显 */}
            <SageTable hex={themeHex} />

            {/* 数据洞察 bullet 列表 · 在表格之后（截图顺序：表 → bullet 洞察 → 图表）*/}
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
                  ['数据概览', '共 200 个 SKU 销售记录，覆盖电子、家电、家居、户外四大品类。'],
                  ['关键分布', '头部 10 款产品贡献 ¥857 万销售额，占总盘 72%；其中 iPad Air、Aeron 椅、Switch OLED 三款合计破 ¥489 万。'],
                  ['异常点', 'Dyson V12 销售额第 7 但环比 -4.2%，是 Top 10 中唯一负增长品；AeroPress 销量 1,820 件居首但单价低，销售额仅排第 4。'],
                  ['建议', '关注 Dyson V12 售后口碑与价格策略，避免持续下滑；推广 AeroPress 配套耗材，提升客单价。'],
                ].map(([k, v]) => (
                  <li key={k} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0f172a', flexShrink: 0, marginTop: 8 }} />
                    <span><strong style={{ color: '#0f172a' }}>{k}</strong>:{v}</span>
                  </li>
                ))}
              </ul>
            </div>

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

/* ============== SageTable · 还原 QueryResult.tsx 408-538 表格（含分页） ============== */
function SageTable({ hex }: { hex: string }) {
  const [hover, setHover] = useState(false);
  const totalRows = 200;
  return (
    <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: hex, borderRadius: 6, colorText: '#4b5563', colorBgContainer: '#fff' } }}>
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

        <div style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}>
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
                        fontFamily: i === 1 ? SAGE_FONT : 'ui-monospace, SFMono-Regular, monospace',
                        color: '#4b5563',
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

          {/* Pagination · 仅 totalRows>10 时显，源码 sage-pagination */}
          <div style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
            padding: '12px 16px',
            borderTop: '1px solid #f3f4f6',
            background: 'rgba(248,250,252,0.50)',
          }}>
            <span style={{ color: '#9ca3af', fontSize: 12, marginRight: 8 }}>共 {totalRows} 条</span>
            <Pagination
              size="small"
              total={totalRows}
              current={1}
              pageSize={10}
              showSizeChanger
              pageSizeOptions={['10', '20', '30', '50']}
              locale={{ items_per_page: '条/页' } as any}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
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

/* ============== SageChartCard · 还原 QueryResult.tsx 756-882 多 Tab 图表 ============== */
const CHART_TABS = [
  '各产品线下、线上、海外渠道销售额分布',
  '销售额 Top 10 产品',
];

function SageChartCard({ hex }: { hex: string }) {
  const [tab, setTab] = useState(0);
  const [type, setType] = useState<'column' | 'line' | 'pie'>('column');

  const typeMenu: MenuProps['items'] = [
    { key: 'column', label: '柱状图', icon: <BarChart3 size={14} /> },
    { key: 'line',   label: '折线图', icon: <LineChart size={14} /> },
    { key: 'pie',    label: '饼图',   icon: <PieChart size={14} /> },
  ];

  const TypeIcon = type === 'column' ? BarChart3 : type === 'line' ? LineChart : PieChart;
  const typeLabel = type === 'column' ? '柱状图' : type === 'line' ? '折线图' : '饼图';

  return (
    <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: hex, borderRadius: 8 } }}>
      <div style={{
        marginTop: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        background: '#fff',
        transition: 'all 300ms',
      }}>
        {/* Header: Tabs + Actions · 还原 line 764-866 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #f3f4f6',
          background: 'rgba(248,250,252,0.50)',
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', flex: 1, marginRight: 16, overflowX: 'auto' }}>
            {CHART_TABS.map((title, i) => {
              const sel = tab === i;
              return (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 16px', fontSize: 14, fontWeight: 500,
                    whiteSpace: 'nowrap', cursor: 'pointer',
                    borderTop: 'none', borderLeft: 'none',
                    borderRight: '1px solid rgba(241,245,249,0.50)',
                    borderBottom: sel ? `2px solid ${hex}` : '2px solid transparent',
                    background: sel ? '#fff' : 'transparent',
                    color: sel ? hex : '#6b7280',
                    marginBottom: sel ? -1 : 0,
                    boxShadow: sel ? '0 -4px 6px -1px rgba(0,0,0,0.02)' : 'none',
                    fontFamily: SAGE_FONT,
                  }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: sel ? hex : '#d1d5db',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    maxWidth: 200,
                  }}>{title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '0 8px',
            borderLeft: '1px solid #f3f4f6',
            height: '100%',
          }}>
            <Dropdown menu={{ items: typeMenu, onClick: ({ key }) => setType(key as 'column' | 'line' | 'pie') }} trigger={['click']}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 8px', borderRadius: 6,
                background: 'transparent', border: 'none',
                color: '#4b5563', fontSize: 14, cursor: 'pointer',
                fontFamily: SAGE_FONT,
              }}>
                <TypeIcon size={14} />
                <span>{typeLabel}</span>
                <ChevronDown size={14} color="#94a3b8" />
              </button>
            </Dropdown>
            <span style={{ width: 1, height: 12, background: '#e5e7eb', margin: '0 8px' }} />
            <button style={iconButton}><Download size={16} color="#6b7280" /></button>
            <button style={iconButton}><Maximize size={16} color="#6b7280" /></button>
          </div>
        </div>

        {/* Chart Body · 350px */}
        <div style={{ width: '100%', background: '#fff', height: 350, padding: 12 }}>
          {type === 'column' && <G2BarChart hex={hex} tab={tab} />}
          {type === 'line' && <G2LineChart hex={hex} />}
          {type === 'pie' && <G2PieChart />}
        </div>
      </div>
    </ConfigProvider>
  );
}

const iconButton: React.CSSProperties = {
  width: 28, height: 28,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

/* ============== G2 风格图表（SVG 模拟）============== */

// G2 调色板：蓝 / 青 / 橙
const SERIES_COLORS = ['#5B8FF9', '#5AD8A6', '#F6BD16'];

// 模拟约 30 个 SKU，每个 SKU 在 3 个渠道的销售额（万元）—— 控制密度，避免长尾占空间
function genProducts(): Array<{ name: string; v: [number, number, number] }> {
  const NAMES: Array<[string, [number, number, number]]> = [
    ['iPad Air',          [95, 70, 28]],
    ['Aeron 椅',          [82, 78, 27]],
    ['Switch OLED',       [55, 40, 14]],
    ['GoPro 12',          [42, 28, 9]],
    ['Dyson V12',         [32, 22, 7]],
    ['Bose QC45',         [28, 20, 6]],
    ['Kindle PW',         [30, 22, 7]],
    ['飞利浦牙刷',         [26, 20, 6]],
    ['小米空气',          [22, 16, 3]],
    ['AeroPress',         [14, 8, 2]],
    ['HUAWEI MateBook',   [18, 14, 4]],
    ['Anker GaN 100W',    [16, 12, 3]],
    ['Sony WH-1000XM5',   [15, 11, 4]],
    ['Logi MX Master',    [13, 10, 2]],
    ['Lenovo ThinkPad',   [12, 9, 3]],
    ['JBL Pulse 5',       [11, 8, 2]],
    ['Roborock S8',       [10, 8, 2]],
    ['Yeelight Star',     [9, 7, 1]],
    ['PHILIPS Hue',       [9, 6, 2]],
    ['Marshall Stanmore', [8, 6, 1]],
    ['Garmin Forerunner', [7, 5, 1]],
    ['Fitbit Charge 6',   [7, 5, 1]],
    ['OPPO Watch X',      [6, 4, 1]],
    ['Xiaomi Buds 4',     [6, 4, 1]],
    ['Tronsmart Mega',    [5, 3, 1]],
    ['Tile Pro',          [4, 3, 0]],
    ['Belkin USB-C',      [4, 3, 0]],
    ['AirPods 4',         [4, 2, 1]],
    ['Beats Solo 4',      [3, 2, 0]],
    ['TP-Link Deco',      [3, 2, 0]],
  ];
  return NAMES.map(([name, v]) => ({ name, v }));
}

const PRODUCTS_ALL = genProducts();
const PRODUCTS_TOP10 = [...PRODUCTS_ALL]
  .sort((a, b) => (b.v[0] + b.v[1] + b.v[2]) - (a.v[0] + a.v[1] + a.v[2]))
  .slice(0, 10);

function G2BarChart({ hex: _hex, tab }: { hex: string; tab: number }) {
  const data = tab === 0 ? PRODUCTS_ALL : PRODUCTS_TOP10;
  const totals = data.map(d => d.v[0] + d.v[1] + d.v[2]);
  const rawMax = Math.max(...totals, 10);
  // 取整刻度（向上取到 50 / 100 / 200 ...）
  const step = rawMax > 200 ? 50 : rawMax > 100 ? 25 : rawMax > 50 ? 10 : 5;
  const max = Math.ceil(rawMax / step) * step;
  const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);

  // viewBox 比例 ≈ 容器比例（消息块约 720×326，2.21:1）→ viewBox 720×326 完美贴合
  const W = 720;
  const H = 326;
  const padL = 44;
  const padR = 12;
  const padT = 24;
  const padB = tab === 0 ? 84 : 56;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const gap = innerW / data.length;
  const barWidth = Math.max(2, gap * (tab === 0 ? 0.55 : 0.5));

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {/* 顶部 chip 图例 */}
      <g transform={`translate(${padL}, 4)`}>
        {['线下', '线上', '海外'].map((name, i) => {
          const x = i * 56;
          return (
            <g key={name} transform={`translate(${x}, 0)`}>
              <rect x={0} y={0} width={10} height={9} fill={SERIES_COLORS[i]} rx={1} />
              <text x={14} y={8} fill="#475569" fontSize={10} fontFamily={SAGE_FONT}>{name}</text>
            </g>
          );
        })}
      </g>

      {/* Y 轴标题 · 销售额（万元）*/}
      <text
        x={10} y={padT + innerH / 2}
        fill="#64748b" fontSize={10}
        textAnchor="middle"
        transform={`rotate(-90, 10, ${padT + innerH / 2})`}
      >销售额（万）</text>

      {/* 网格线 + Y 刻度 */}
      {ticks.map(tk => {
        const y = padT + innerH - (tk / max) * innerH;
        return (
          <g key={tk}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={0.6} />
            <text x={padL - 4} y={y + 3} fill="#94a3b8" fontSize={9} textAnchor="end"
              fontFamily="ui-monospace, SFMono-Regular, monospace">
              {tk}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + innerH} x2={W - padR} y2={padT + innerH} stroke="#cbd5e1" strokeWidth={1} />

      {/* 堆叠柱 */}
      {data.map((d, i) => {
        const x = padL + i * gap + (gap - barWidth) / 2;
        let yCursor = padT + innerH;
        return (
          <g key={i}>
            {d.v.map((val, si) => {
              if (val === 0) return null;
              const h = (val / max) * innerH;
              yCursor -= h;
              return (
                <rect
                  key={si}
                  x={x} y={yCursor}
                  width={barWidth} height={h}
                  fill={SERIES_COLORS[si]}
                />
              );
            })}
            {/* X 轴 label · tab=0 竖排（全部 30 个），tab=1 横排 */}
            {tab === 0 && (
              <text
                x={x + barWidth / 2} y={padT + innerH + 6}
                fill="#94a3b8" fontSize={9}
                textAnchor="end" dominantBaseline="middle"
                transform={`rotate(-90, ${x + barWidth / 2}, ${padT + innerH + 6})`}
              >
                {d.name}
              </text>
            )}
            {tab === 1 && (
              <text
                x={x + barWidth / 2} y={padT + innerH + 14}
                fill="#64748b" fontSize={10} textAnchor="middle">
                {d.name}
              </text>
            )}
          </g>
        );
      })}

      {/* X 轴标题 · 产品 */}
      <text x={padL + innerW / 2} y={H - 2}
        fill="#64748b" fontSize={10} textAnchor="middle">
        产品
      </text>
    </svg>
  );
}

function G2LineChart({ hex }: { hex: string }) {
  const data = PRODUCTS_TOP10.map(p => ({ label: p.name, value: p.v[0] + p.v[1] + p.v[2] }));
  const max = Math.ceil(Math.max(...data.map(d => d.value)) / 50) * 50;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => t * max);
  const W = 720, H = 326, padL = 44, padR = 16, padT = 24, padB = 50;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const points = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * innerW;
    const y = padT + innerH - (d.value / max) * innerH;
    return { x, y, d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${padT + innerH} L${points[0].x},${padT + innerH} Z`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {ticks.map(tk => {
        const y = padT + innerH - (tk / max) * innerH;
        return (
          <g key={tk}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 8} y={y + 4} fill="#94a3b8" fontSize={11} textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, monospace">
              {tk}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + innerH} x2={W - padR} y2={padT + innerH} stroke="#cbd5e1" strokeWidth={1} />

      <path d={areaPath} fill={hex} fillOpacity={0.12} />
      <path d={linePath} fill="none" stroke={hex} strokeWidth={2.5} strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4.5} fill="#fff" stroke={hex} strokeWidth={2.5} />
          <text x={p.x} y={p.y - 10} fill="#0f172a" fontSize={11} fontWeight={600} textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, monospace">
            {p.d.value}
          </text>
          <text x={p.x} y={padT + innerH + 18} fill="#64748b" fontSize={11} textAnchor="middle">
            {p.d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function G2PieChart() {
  const data = PRODUCTS_TOP10.map(p => ({ label: p.name, value: p.v[0] + p.v[1] + p.v[2] }));
  const total = data.reduce((s, d) => s + d.value, 0);
  // G2 默认 10 色板
  const PIE_COLORS = ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3'];
  const cx = 160, cy = 163, r = 110, ir = r * 0.3;

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

    return { path, color: PIE_COLORS[i % PIE_COLORS.length], pct: (d.value / total) * 100, label: d.label };
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 720 326" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth={2} />
      ))}
      {/* 图例 · 右侧 */}
      <g transform="translate(330, 60)">
        {slices.map((s, i) => (
          <g key={i} transform={`translate(0, ${i * 20})`}>
            <rect x={0} y={0} width={11} height={11} fill={s.color} rx={2} />
            <text x={18} y={9} fill="#475569" fontSize={11} fontFamily={SAGE_FONT}>
              {s.label}
            </text>
            <text x={360} y={9} fill="#94a3b8" fontSize={11} fontFamily="ui-monospace, SFMono-Regular, monospace" textAnchor="end">
              {s.pct.toFixed(1)}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ============== NarrationCardSage · 还原 NarrationCard.tsx 54-140 ============== */
function NarrationCardSage({ hex }: { hex: string }) {
  const [expanded, setExpanded] = useState(false);
  const dimensions = ['产品', '销售渠道'];
  const metrics = ['销售额', '销量', '环比'];
  return (
    <div style={{
      marginBottom: 12,
      borderRadius: 8,
      // 还原 themeClasses.border = border-emerald-100（hex+40 ≈ 25% alpha 模拟 -100 浅色阶）
      border: `1px solid ${hex}40`,
      background: '#fafafa',
      padding: '12px 16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <BookOpen size={16} color={hex} style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: 14, color: '#404040', lineHeight: 1.6 }}>
          按销售订单聚合，统计每个产品在线下、线上、海外三个渠道的销售额，按总销售额降序给出 Top 10。仅统计已支付订单，剔除退款。
        </p>
      </div>

      {/* Dimensions + Metrics Tag · antd Tag bordered=false 样式 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
        {dimensions.map((d, i) => (
          <span key={`d-${i}`} style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '0 8px', height: 22, borderRadius: 4,
            fontSize: 12, lineHeight: '20px',
            color: hex,
            background: `${hex}12`,
            border: 'none',
          }}>{d}</span>
        ))}
        {metrics.map((m, i) => (
          <span key={`m-${i}`} style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '0 8px', height: 22, borderRadius: 4,
            fontSize: 12, lineHeight: '20px',
            color: `${hex}cc`,
            background: `${hex}08`,
            border: 'none',
          }}>{m}</span>
        ))}
      </div>

      {/* Collapsible · ChevronDown 旋转 180 */}
      <div style={{ marginTop: 8 }}>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: 0, background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#737373', fontSize: 12,
            fontFamily: SAGE_FONT,
          }}>
          <ChevronDown size={12} style={{
            transition: 'transform 200ms',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }} />
          {expanded ? '收起详情' : '查看使用的规则和备注'}
        </button>
        {expanded && (
          <div style={{
            marginTop: 8, paddingLeft: 16,
            borderLeft: `2px solid ${hex}`,
          }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: '#737373' }}>使用的规则：</span>
              <div style={{ fontSize: 12, color: '#525252' }}>• 退款订单已剔除（refund_status = paid）</div>
              <div style={{ fontSize: 12, color: '#525252' }}>• 销售额 = 单价 × 数量 - 优惠券</div>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#737373' }}>注意事项：</span>
              <div style={{ fontSize: 12, color: '#d97706' }}>跨渠道金额已按月初汇率折算成 CNY</div>
            </div>
          </div>
        )}
      </div>
    </div>
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
  // 还原 ChatInput.tsx · 技能选中态 (isInSkillMode=true)：主题色 50% 边 + 主题色 glow
  // 默认态：gray-200 边 + 中性灰色 glow
  const inSkillMode = true;
  return (
    <div style={{ padding: '0 24px', background: '#fff', flexShrink: 0 }}>
      {/* max-w-4xl 与 ChatMessages 完全对齐（avatar 绝对定位不参与对齐） */}
      <div style={{ maxWidth: 896, margin: '0 auto' }}>
        <div style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', gap: 0,
          background: '#fff',
          border: `1px solid ${inSkillMode ? `${themeHex}50` : '#e2e8f0'}`,
          borderRadius: 24,
          boxShadow: inSkillMode
            ? `0 0 4px ${themeHex}40, 0 0 15px ${themeHex}30`
            : '0 0 4px rgba(148,163,184,0.15), 0 0 15px rgba(148,163,184,0.08)',
          padding: 10,
        }}>
          {/* Textarea (placeholder text) */}
          <div style={{
            width: '100%',
            padding: '4px 10px',
            fontSize: 16, color: '#94a3b8',
            minHeight: 35,
            fontFamily: SAGE_FONT,
          }}>
            发消息或选择技能…
          </div>

          {/* Controls Row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 4, userSelect: 'none',
          }}>
            {/* Left · SkillConfigBar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
              {/* 数据问答 chip (退出按钮) · bg-${theme}-50 + theme-text */}
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 10px', borderRadius: 12,
                background: `${themeHex}14`, color: themeHex,
                border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500,
                fontFamily: SAGE_FONT,
              }}>
                <Database size={16} />
                <span>数据问答</span>
                <span style={{ marginLeft: 2, opacity: 0.6, display: 'inline-flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </span>
              </button>

              {/* 分隔 */}
              <span style={{ width: 1, height: 16, background: '#e5e7eb' }} />

              {/* 杭州数据库 · datasource chip 白底 */}
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 16,
                background: '#fff', color: '#475569',
                border: '1px solid #e2e8f0', cursor: 'pointer',
                fontSize: 13, fontWeight: 500,
                fontFamily: SAGE_FONT,
              }}>
                <Database size={14} />
                <span>杭州数据库</span>
                <ChevronDown size={12} color="#94a3b8" />
              </button>

              {/* 工具图标 · 还原 dataQAConfigOptions 顺序：Zap / Map / BarChart3 / BookOpen / ShieldCheck / Database */}
              <ToolBtn Icon={Zap} />
              <ToolBtn Icon={Map} active hex={themeHex} />
              <ToolBtn Icon={BarChart3} active hex={themeHex} />
              <ToolBtn Icon={BookOpen} active hex={themeHex} />
              <ToolBtn Icon={ShieldCheck} active hex={themeHex} />
              <ToolBtn Icon={Terminal} />
            </div>

            {/* Right Controls · Mic + Divider + Send */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'transparent', border: 'none',
                color: '#94a3b8', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Mic size={16} /></button>
              <span style={{ width: 1, height: 20, background: '#e5e7eb', marginLeft: 2, marginRight: 4 }} />
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: themeHex, color: '#fff', border: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}><Send size={16} style={{ marginLeft: -2, marginTop: 2 }} /></button>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 8, marginBottom: 8 }}>
          内容由 AI 生成，请仔细核实
        </p>
      </div>
    </div>
  );
}

function ToolBtn({ Icon, active, hex }: { Icon: React.ComponentType<{ size?: number }>; active?: boolean; hex?: string }) {
  return (
    <button style={{
      width: 28, height: 28, borderRadius: 6,
      background: active && hex ? `${hex}14` : 'transparent',
      border: 'none', cursor: 'pointer',
      color: active && hex ? hex : '#9ca3af',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={16} />
    </button>
  );
}

/* ============== Snowman FAB · 闭合态 ============== */

function SnowmanFab({ themeHex }: { themeHex: string }) {
  // 还原 RevolverMenu.tsx 517-680 SnowmanIcon · 36×43，head 19+body 30，含手臂
  return (
    <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 100 }}>
      <div style={{
        position: 'relative', width: 56, height: 56,
        background: '#fff', borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <div style={{
          position: 'relative',
          width: 36, height: 43,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.20))',
        }}>
          {/* 帽子 · 浮在 head 上方 */}
          <div style={{
            position: 'absolute', top: -12, left: '55%',
            transform: 'translateX(-50%) rotate(15deg)',
            width: 22, height: 14,
            background: themeHex,
            borderRadius: '5px 5px 2px 2px',
            boxShadow: '1px 1px 3px rgba(0,0,0,0.20)',
            zIndex: 110,
          }}>
            <div style={{ position: 'absolute', bottom: -2, left: -4, right: -4, height: 4, background: '#fff', borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: -5, right: -4, width: 8, height: 8, background: themeHex, borderRadius: '50%' }} />
          </div>

          {/* Head 19×19 */}
          <div style={{
            width: 19, height: 19, background: '#fff',
            borderRadius: '50%', zIndex: 4,
            position: 'relative',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.10)',
            marginBottom: -4,
          }}>
            <div style={{ position: 'absolute', top: 6, left: 5, width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 6, right: 5, width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
            <div style={{
              position: 'absolute', top: 8, left: '50%',
              transform: 'translateX(-20%) rotate(90deg)',
              width: 0, height: 0,
              borderLeft: '3px solid transparent',
              borderRight: '3px solid transparent',
              borderBottom: '8px solid #f97316',
            }} />
          </div>

          {/* Body 30×30 */}
          <div style={{
            width: 30, height: 30, background: '#fff',
            borderRadius: '50%', zIndex: 3,
            position: 'relative',
            boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.10)',
          }}>
            {/* 围巾 */}
            <div style={{
              position: 'absolute', top: -2, left: '50%',
              transform: 'translateX(-50%)',
              width: 22, height: 6,
              background: themeHex, borderRadius: 4, zIndex: 5,
            }} />
            {/* 扣子 */}
            <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
              <div style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
              <div style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
            </div>
            {/* 左手 · 棕色细枝 */}
            <div style={{
              position: 'absolute', top: 9, left: -10,
              width: 11, height: 2,
              background: '#78350f',
              transform: 'rotate(-20deg)',
              borderRadius: 2,
            }} />
            {/* 右手 · 棕色细枝 */}
            <div style={{
              position: 'absolute', top: 9, right: -10,
              width: 11, height: 2,
              background: '#78350f',
              transform: 'rotate(20deg)',
              borderRadius: 2,
            }} />
          </div>
        </div>
      </div>
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


