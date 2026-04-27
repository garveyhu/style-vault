import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const ITEMS = [
  { icon: '🗂', title: '空间管理', desc: '管理所有工作区', module: 'spaces' },
  { icon: '💾', title: '数据源管理', desc: 'CRUD MySQL / PostgreSQL / Oracle', module: 'datasource' },
  { icon: '🤖', title: '模型管理', desc: '多 LLM 注册 + 用量', module: 'admin/model-config' },
  { icon: '📋', title: '业务规则', desc: '行级 / 列级 数据规则', module: 'admin/business-rules' },
  { icon: '⚡', title: '预制 SQL', desc: '常用查询模板库', module: 'admin/prefab-sql' },
  { icon: '🛡', title: '权限规则集', desc: '规则集 + 用户分配', module: 'admin/rules' },
  { icon: '⚙', title: '核心配置', desc: '空间默认设置', module: 'admin/core-config' },
  { icon: '📊', title: '模型用量分析', desc: 'token / 调用次数', module: 'analysis/usage' },
  { icon: '💬', title: '用户反馈分析', desc: '👍 / 👎 占比', module: 'analysis/feedback' },
];

export default function CommandPalettePreview() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = ITEMS.filter(i =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV · OVERLAY</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Command Palette</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Cmd/Ctrl + P 唤起 · admin 专属 · borderRadius 20 + 双层阴影</p>

        <div style={{
          width: 640, margin: '0 auto',
          background: '#fff',
          borderRadius: 20,
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.18), 0 12px 24px -12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 18px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <span style={{ color: '#cbd5e1', fontSize: 16 }}>🔎</span>
            <input
              autoFocus
              placeholder="搜索…"
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(0); }}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 14, color: '#0f172a',
              }}
            />
            <span style={{
              padding: '2px 6px', background: '#f1f5f9', borderRadius: 4,
              fontSize: 10, color: '#94a3b8', fontWeight: 500,
            }}>ESC</span>
          </div>

          {/* List */}
          <div style={{ padding: 4, maxHeight: 400, overflowY: 'auto' }}>
            <div style={{ padding: '8px 12px', fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>应用</div>
            {filtered.length > 0 ? filtered.map((it, i) => (
              <div
                key={it.title}
                onMouseEnter={() => setSelected(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8,
                  background: selected === i ? 'rgba(248,250,252,0.8)' : 'transparent',
                  color: selected === i ? '#0ea5e9' : '#475569',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: selected === i ? '#fff' : 'transparent',
                  boxShadow: selected === i ? '0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(15,23,42,0.05)' : 'none',
                  fontSize: 14,
                }}>{it.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, fontWeight: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.desc}</div>
                </div>
                {selected === i && <span style={{ color: '#cbd5e1', fontSize: 12 }}>↵</span>}
              </div>
            )) : (
              <div style={{ padding: '48px 0', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.5 }}>⌘</div>
                <div style={{ fontSize: 13, fontWeight: 300 }}>没有结果</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '8px 16px',
            background: 'rgba(248,250,252,0.5)',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 11, color: '#94a3b8',
            backdropFilter: 'blur(2px)',
            borderRadius: '0 0 20px 20px',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>⌘</span>
              <span style={{ fontWeight: 500, color: '#64748b' }}>Sage Command</span>
            </span>
            <span style={{ display: 'flex', gap: 12 }}>
              <span>↑↓ navigate</span>
              <span>↵ open</span>
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
