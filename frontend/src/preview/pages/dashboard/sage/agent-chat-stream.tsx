import { useState } from 'react';
import {
  Bot, ChevronDown, Copy, Feather, LayoutGrid, Mic,
  MoreHorizontal, MoreVertical, Package, PanelLeftClose, Plus,
  RotateCw, Send, Sparkles, Star, ThumbsUp,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

// 这个组件被 products/sage 与 styles/saas-tool/sage-multitheme-data-platform 复用作封面
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
    <div style={{ display: 'flex', height: '100%', minHeight: 720, fontFamily: 'Inter, sans-serif', background: 'rgb(249,249,249)' }}>
      <Sidebar themeHex={themeHex} />

      <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: 1,
          background: '#fff',
          borderTopLeftRadius: 16, borderTopRightRadius: 16,
          borderTop: '1px solid rgba(241,245,249,0.50)',
          borderLeft: '1px solid rgba(241,245,249,0.50)',
          borderRight: '1px solid rgba(241,245,249,0.50)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <ChatHeader />
          <ChatMessages themeHex={themeHex} />
          <ChatComposer themeHex={themeHex} />
        </div>
      </div>
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

function Sidebar({ themeHex }: { themeHex: string }) {
  const sessions = ['本月销售 Top 10', '订单异常分析', '客户留存漏斗', 'KPI 月报草稿', '财务对账问题'];
  return (
    <div style={{
      width: 256, background: 'rgb(249,249,249)',
      padding: '16px 12px 8px',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #e2e8f0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 16, color: '#1e293b', letterSpacing: '-0.025em', minWidth: 0, flex: 1 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6, background: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>S</span>
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

      <SidebarBtn Icon={Plus} label="新对话" />
      <SidebarBtn Icon={Star} label="我的收藏" />
      <SidebarBtn Icon={Package} label="智能体商店" />

      <div style={{ padding: '8px 12px', marginTop: 8, position: 'sticky', top: 0, background: 'rgb(249,249,249)', zIndex: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CHATS</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {sessions.map((s, i) => (
          <div key={s} style={{
            padding: '6px 12px', borderRadius: 8, marginBottom: 2,
            background: i === 0 ? 'rgb(239,239,239)' : 'transparent',
            color: i === 0 ? themeHex : '#475569',
            fontSize: 14, fontWeight: 500,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s}</span>
            {i === 0 && <MoreHorizontal size={14} color="#94a3b8" />}
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
          }}><Feather size={18} /></span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>archer</span>
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
        fontFamily: 'Inter, sans-serif',
        transition: 'all 200ms',
      }}
    >
      <Icon size={20} /><span>{label}</span>
    </button>
  );
}

function ChatHeader() {
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
          GPT-4o<ChevronDown size={14} color="#94a3b8" />
        </span>
      </div>
      <div style={{
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 14, fontWeight: 500, color: '#1e293b',
      }}>本月销售 Top 10</div>
      <button style={{
        padding: 8, borderRadius: '50%',
        background: 'transparent', border: 'none',
        color: '#94a3b8', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}><MoreVertical size={20} /></button>
    </header>
  );
}

function ChatMessages({ themeHex }: { themeHex: string }) {
  return (
    <div style={{
      flex: 1, padding: '32px 0', overflowY: 'auto', background: '#fff',
    }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 用户消息 · 真实 className: bg-[rgb(246,246,246)] px-5 py-3 rounded-3xl */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <div style={{ maxWidth: '90%' }}>
            <div style={{
              background: 'rgb(246,246,246)',
              color: '#0f172a',
              padding: '12px 20px',
              borderRadius: 24,
              fontSize: 14, lineHeight: 1.7,
            }}>
              帮我查一下本月销量最高的 10 个产品，按销售额降序排列
            </div>
          </div>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 6,
          }}><Feather size={16} /></span>
        </div>

        {/* AI message */}
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 6,
          }}><Bot size={16} /></span>

          <div style={{ flex: 1, minWidth: 0 }}>
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
                思考过程<span style={{ color: '#94a3b8', fontWeight: 400 }}>2.4s</span>
              </span>
            </button>

            {/* 思考过程 内容 · border-l-2 + steps */}
            <div style={{
              marginLeft: 8, paddingLeft: 16,
              borderLeft: '2px solid #f1f5f9',
              marginBottom: 16,
              display: 'flex', flexDirection: 'column', gap: 10,
              fontSize: 13, color: '#475569',
            }}>
              <Step idx={1} title="分析意图" desc="识别为数据查询任务 · 销售排行 · 含金额排序" />
              <Step idx={2} title="选择数据源" desc="sales_main · orders + products 表" />
              <Step idx={3} title="生成 SQL" desc="SELECT p.name, SUM(o.qty * o.price) AS amount ... ORDER BY amount DESC LIMIT 10" />
              <Step idx={4} title="执行查询" desc="返回 10 行 · 耗时 124ms" />
            </div>

            {/* answer · markdown */}
            <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.7, padding: '8px 0' }}>
              根据{' '}<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>sales_main</code>{' '}库 2026 年 4 月数据，销售额前 10 的产品如下：
            </div>

            <div style={{
              marginTop: 8, background: '#fff',
              border: '1px solid #e2e8f0', borderRadius: 8,
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    <th style={th}>排名</th>
                    <th style={th}>产品</th>
                    <th style={th}>销量</th>
                    <th style={{ ...th, textAlign: 'right' }}>销售额</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1', 'Aeron 人体工学椅',     '624',   '¥1,872,000'],
                    ['2', 'Kindle Paperwhite',    '982',   '¥588,000'],
                    ['3', '小米空气净化器 4',     '412',   '¥412,000'],
                    ['4', 'AeroPress 手冲咖啡壶', '1,820', '¥218,400'],
                    ['5', 'Sony WH-1000XM5',      '188',   '¥564,000'],
                  ].map(row => (
                    <tr key={row[0]} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={{ ...td, color: '#94a3b8' }}>{row[0]}</td>
                      <td style={td}>{row[1]}</td>
                      <td style={td}>{row[2]}</td>
                      <td style={{ ...td, textAlign: 'right', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>
              <ActionBtn Icon={Copy} label="复制" />
              <ActionBtn Icon={RotateCw} label="重新生成" />
              <ActionBtn Icon={ThumbsUp} />
            </div>
          </div>
        </div>

        {/* 流式响应中 · 3 个 dot 主题色 animate-bounce */}
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            color: themeHex,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 6,
          }}><Bot size={16} /></span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', height: 24, marginTop: 12 }}>
            {[0, 150, 300].map(d => (
              <span
                key={d}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: themeHex, opacity: 0.5,
                  animation: 'sv-cs-bounce 1s infinite',
                  animationDelay: `${d}ms`,
                }}
              />
            ))}
            <style>{`@keyframes sv-cs-bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 0.7; } }`}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ idx, title, desc }: { idx: number; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#f1f5f9', color: '#64748b',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 11, fontWeight: 600,
      }}>{idx}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

function ActionBtn({ Icon, label }: { Icon: React.ComponentType<{ size?: number }>; label?: string }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 8px', borderRadius: 6,
      background: 'transparent', border: 'none',
      color: '#94a3b8', fontSize: 12, cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
    }}>
      <Icon size={14} />{label}
    </button>
  );
}

function ChatComposer({ themeHex }: { themeHex: string }) {
  return (
    <div style={{ padding: 16, background: '#fff' }}>
      <div style={{ maxWidth: 768, margin: '0 auto' }}>
        <div style={{
          position: 'relative',
          background: '#fff',
          border: `1px solid ${themeHex}80`,
          borderRadius: 24,
          boxShadow: `0 0 4px ${themeHex}66, 0 0 15px ${themeHex}4D`,
          padding: 10,
        }}>
          <div style={{ width: '100%', padding: '4px 10px', fontSize: 16, color: '#94a3b8' }}>
            问点什么吧?
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 16,
                background: `${themeHex}1A`, color: themeHex,
                fontSize: 12, fontWeight: 500,
                border: `1px solid ${themeHex}4D`,
              }}>
                <Sparkles size={12} /> 数据查询
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'transparent', border: 'none',
                color: '#64748b', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Mic size={16} /></button>
              <span style={{ width: 1, height: 20, background: '#e2e8f0' }} />
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: themeHex, color: '#fff', border: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Send size={16} style={{ marginLeft: -2, marginTop: 2 }} /></button>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 8, marginBottom: 0 }}>
          AI 也会出错 — 关键决策请二次确认
        </p>
      </div>
    </div>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: 10 };
