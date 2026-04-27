import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const AGENTS = [
  { name: 'data_qa', icon: '📊', type: 'system', desc: 'NL→SQL 数据问答' },
  { name: 'data_qa_v2', icon: '⚡', type: 'system', desc: '数据问答 v2 · 多步推理' },
  { name: 'general', icon: '💬', type: 'system', desc: '通用对话' },
  { name: 'sql_explainer', icon: '🔎', type: 'dify', desc: 'SQL 解释器（Dify 接入）' },
  { name: 'report_writer', icon: '📝', type: 'dify', desc: '月报撰写' },
  { name: 'forecast_v1', icon: '📈', type: 'custom', desc: '销售预测' },
];
const T_HEX = '#10b981';

export default function AgentStoreSplitTabsPreview() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<'config' | 'run'>('config');
  const a = AGENTS[active];

  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif' }}>
        {/* Sidebar */}
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e5e5', padding: 12, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 4px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 16, color: '#171717' }}>
            <span>Agent Store</span>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: `${T_HEX}1A`, color: T_HEX, border: 'none', cursor: 'pointer', fontSize: 14 }}>↻</button>
          </div>
          <div style={{ padding: '0 4px 16px' }}>
            <input placeholder="搜索 agent…" style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e5e5e5', background: '#fafafa', fontSize: 13, outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {AGENTS.map((g, i) => (
              <div
                key={g.name}
                onClick={() => setActive(i)}
                style={{
                  padding: '12px 14px', borderRadius: 12, marginBottom: 6,
                  background: active === i ? '#f5f5f5' : 'transparent',
                  border: `1px solid ${active === i ? '#e5e5e5' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 200ms',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>{g.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: active === i ? '#171717' : '#475569' }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{g.type === 'system' ? '系统内置' : g.type === 'dify' ? 'Dify 接入' : '自定义'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '24px 32px', background: '#fff', overflowY: 'auto', color: '#0f172a' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #f5f5f5' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: `${T_HEX}26`, color: T_HEX, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{a.icon}</span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{a.name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{a.desc}</p>
              </div>
            </div>
            <button style={{ padding: '6px 14px', background: T_HEX, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ 添加到空间</button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 16, paddingBottom: 4, borderBottom: '1px solid #e2e8f0', marginTop: 16, marginBottom: 16 }}>
            {(['config', 'run'] as const).map(k => (
              <span
                key={k}
                onClick={() => setTab(k)}
                style={{
                  fontSize: 13, padding: '6px 4px',
                  color: tab === k ? T_HEX : '#64748b',
                  borderBottom: tab === k ? `2px solid ${T_HEX}` : 'none',
                  cursor: 'pointer', fontWeight: tab === k ? 600 : 400,
                }}
              >
                {k === 'config' ? '⚙ 配置' : '▶ 运行'}
              </span>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'config' ? (
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                  <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>名称</th>
                  <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>启用</th>
                  <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>可见配置</th>
                  <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: 10 }}>{a.name}</td>
                  <td style={{ padding: 10 }}>● 已启用</td>
                  <td style={{ padding: 10, color: '#64748b' }}>3 项</td>
                  <td style={{ padding: 10 }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 12 }}>⚙</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 12, marginLeft: 8 }}>🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={{ padding: 32, background: '#f8fafc', borderRadius: 12, color: '#94a3b8', textAlign: 'center', fontSize: 13 }}>
              AgentRunPanel · 实时运行 / 调试面板
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
