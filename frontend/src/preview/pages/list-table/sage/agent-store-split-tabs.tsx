import { useState } from 'react';
import {
  BarChart3, Bot, Code, FileText, MessageSquare, Play, Plus,
  RefreshCw, Search, Settings, Sparkles, Trash2, TrendingUp, Zap,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const AGENTS: Array<{ name: string; Icon: React.ComponentType<{ size?: number }>; type: 'system' | 'dify' | 'custom'; desc: string }> = [
  { name: 'data_qa',       Icon: BarChart3,    type: 'system', desc: 'NL→SQL 数据问答' },
  { name: 'data_qa_v2',    Icon: Zap,          type: 'system', desc: '数据问答 v2 · 多步推理' },
  { name: 'general',       Icon: MessageSquare,type: 'system', desc: '通用对话' },
  { name: 'sql_explainer', Icon: Code,         type: 'dify',   desc: 'SQL 解释器（Dify 接入）' },
  { name: 'report_writer', Icon: FileText,     type: 'dify',   desc: '月报撰写' },
  { name: 'forecast_v1',   Icon: TrendingUp,   type: 'custom', desc: '销售预测' },
];
const T_HEX = '#10b981';

export default function AgentStoreSplitTabsPage() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<'config' | 'run'>('config');
  const a = AGENTS[active];
  const ActiveIcon = a.Icon;

  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e5e5', padding: 12, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 4px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 16, color: '#171717' }}>
            <span>Agent Store</span>
            <button style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${T_HEX}1A`, color: T_HEX,
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><RefreshCw size={16} /></button>
          </div>
          <div style={{ padding: '0 4px 16px' }}>
            <div style={{
              background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10,
              padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8',
            }}>
              <Search size={16} />
              <input placeholder="搜索 agent…" style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, flex: 1, fontFamily: 'Inter, sans-serif',
              }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {AGENTS.map((g, i) => {
              const ItemIcon = g.Icon;
              return (
                <div
                  key={g.name}
                  onClick={() => setActive(i)}
                  style={{
                    padding: '12px 14px', borderRadius: 12, marginBottom: 6,
                    background: active === i ? '#f5f5f5' : 'transparent',
                    border: `1px solid ${active === i ? '#e5e5e5' : 'transparent'}`,
                    cursor: 'pointer', transition: 'all 200ms',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <span style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: active === i ? `${T_HEX}1A` : '#f1f5f9',
                    color: active === i ? T_HEX : '#64748b',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}><ItemIcon size={16} /></span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: active === i ? '#171717' : '#475569' }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>
                      {g.type === 'system' ? '系统内置' : g.type === 'dify' ? 'Dify 接入' : '自定义'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px 32px', background: '#fff', overflowY: 'auto', color: '#0f172a' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingBottom: 16, borderBottom: '1px solid #f5f5f5',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${T_HEX}26`, color: T_HEX,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><ActiveIcon size={24} /></span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{a.name}</h2>
                <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{a.desc}</p>
              </div>
            </div>
            <button style={{
              padding: '4px 14px', height: 32,
              background: T_HEX, color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 400, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: 'Inter, sans-serif',
            }}><Plus size={14} /> 添加到空间</button>
          </div>

          <div style={{
            display: 'flex', gap: 16,
            paddingBottom: 4, borderBottom: '1px solid #e2e8f0',
            marginTop: 16, marginBottom: 16,
          }}>
            {(['config', 'run'] as const).map(k => (
              <span
                key={k}
                onClick={() => setTab(k)}
                style={{
                  fontSize: 14, padding: '6px 4px',
                  color: tab === k ? T_HEX : '#64748b',
                  borderBottom: tab === k ? `2px solid ${T_HEX}` : '2px solid transparent',
                  cursor: 'pointer', fontWeight: tab === k ? 600 : 400,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                {k === 'config' ? <><Settings size={14} /> 配置</> : <><Play size={14} /> 运行</>}
              </span>
            ))}
          </div>

          {tab === 'config' ? (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    <th style={th}>名称</th>
                    <th style={th}>启用</th>
                    <th style={th}>可见配置</th>
                    <th style={th}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={td}>{a.name}</td>
                    <td style={td}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        color: '#10b981', fontSize: 13,
                      }}>
                        <Sparkles size={12} /> 已启用
                      </span>
                    </td>
                    <td style={{ ...td, color: '#64748b' }}>3 项</td>
                    <td style={td}>
                      <span style={{ display: 'inline-flex', gap: 6 }}>
                        <button style={iconBtn}><Settings size={14} /></button>
                        <button style={{ ...iconBtn, color: '#dc2626' }}><Trash2 size={14} /></button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              padding: '64px 32px', background: '#f8fafc', borderRadius: 8,
              color: '#94a3b8', textAlign: 'center', fontSize: 14,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
              <Bot size={48} strokeWidth={1.2} />
              <span>AgentRunPanel · 实时运行 / 调试面板</span>
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: 10 };
const iconBtn = { background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex' as const };
