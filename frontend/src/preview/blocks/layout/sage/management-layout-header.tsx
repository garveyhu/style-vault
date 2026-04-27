import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { hex: '#10b981' }, { hex: '#22d3ee' }, { hex: '#fb7185' }, { hex: '#a78bfa' },
];

export default function ManagementLayoutHeaderPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [search, setSearch] = useState('');
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8', marginBottom: 16 }}>
          BLOCK · LAYOUT
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Management Layout Header</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>title · search · filter · rightActions · ConfigProvider 主题色注入</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{ width: 22, height: 22, borderRadius: '50%', background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer' }} />
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>规则集管理</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <select style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, color: '#475569' }}>
                <option>所有类型</option>
                <option>行规则</option>
                <option>列规则</option>
              </select>
              <div style={{ position: 'relative', width: 200 }}>
                <input
                  type="text" placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={e => { e.currentTarget.style.borderColor = t.hex; e.currentTarget.style.boxShadow = `0 0 0 2px ${t.hex}30`; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
                  style={{ width: '100%', padding: '6px 32px 6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none', transition: 'all 200ms' }}
                />
                <span style={{ position: 'absolute', right: 10, top: 8, color: '#94a3b8', cursor: 'pointer' }}>🔎</span>
              </div>
              <button style={{ padding: '6px 14px', background: t.hex, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                + 新建
              </button>
            </div>
          </div>

          {/* mock content area */}
          <div style={{ height: 240, background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12 }}>
            children — 业务自己布局（通常是 Antd Table）
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
