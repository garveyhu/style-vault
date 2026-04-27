import { useState } from 'react';
import {
  BarChart3, Book, BookOpen, Bot, Check, CheckCircle, ChevronDown, ChevronRight,
  Crown, Database, Download, Feather, LayoutGrid, Mic, MoreHorizontal, MoreVertical,
  Package, PanelLeftClose, Plus, RotateCw, Send, Shield, ShieldCheck, Sparkles,
  Star, Terminal, ThumbsDown, ThumbsUp, Zap,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

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
    <div style={{
      display: 'flex', height: '100%', minHeight: '100%',
      fontFamily: 'Inter, sans-serif',
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
        fontFamily: 'Inter, sans-serif', transition: 'all 200ms',
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
            {/* 思考过程 button */}
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0 8px', height: 32,
              fontSize: 14, fontWeight: 500,
              color: '#64748b', background: 'transparent',
              border: 'none', cursor: 'pointer', borderRadius: 6,
              fontFamily: 'Inter, sans-serif',
              marginBottom: 8,
            }}>
              <ChevronDown size={16} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                思考过程<span style={{ color: '#94a3b8', fontWeight: 400 }}>21.3s</span>
              </span>
            </button>

            {/* 思考过程列表 · border-l-2 + 每条 ✓ 主题色圆 + step 名 + ChevronRight */}
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
                  根据本月销售订单数据聚合，按销售额（数量 × 单价）降序排列，给出销量前 10 的产品。仅统计已支付订单，剔除退款。
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
                fontFamily: 'Inter, sans-serif',
              }}>
                <ChevronDown size={14} /> 查看使用的规则和备注
              </button>
            </div>

            {/* 数据表格 */}
            <div style={{
              marginTop: 14, background: '#fff',
              border: '1px solid #e2e8f0', borderRadius: 8,
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    {TABLE_COLS.map((col, i) => (
                      <th key={col} style={{ ...th, position: 'relative' }}>
                        {col}
                        {i === 3 && (
                          <button style={{
                            position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                            background: 'transparent', border: 'none', color: '#64748b',
                            cursor: 'pointer', display: 'inline-flex',
                          }}><Download size={12} /></button>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(row => (
                    <tr key={row[0]} style={{ borderTop: '1px solid #f1f5f9' }}>
                      {row.map((v, i) => (
                        <td key={i} style={{ ...td, fontFamily: i === 0 || i === 2 || i === 3 ? 'ui-monospace, SFMono-Regular, monospace' : 'Inter, sans-serif', textAlign: i === 0 ? 'center' : 'left', color: i === 4 ? themeHex : '#334155' }}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
