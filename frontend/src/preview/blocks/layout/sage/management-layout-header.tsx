import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
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
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          title (24/bold/slate-800) · search · filter slot · rightActions · ConfigProvider 注入主题
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: th.hex,
              border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
              cursor: 'pointer',
            }} />
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>规则集管理</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <select style={{
                padding: '4px 12px', borderRadius: 8,
                border: '1px solid #d9d9d9', fontSize: 14, color: '#475569',
                background: '#fff', cursor: 'pointer',
                height: 32,
              }}>
                <option>所有类型</option>
                <option>行规则</option>
                <option>列规则</option>
              </select>
              <div style={{ position: 'relative', width: 200 }}>
                <input
                  type="text" placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={e => { e.currentTarget.style.borderColor = t.hex; e.currentTarget.style.boxShadow = `0 0 0 2px ${t.hex}33`; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#d9d9d9'; e.currentTarget.style.boxShadow = 'none'; }}
                  style={{
                    width: '100%', padding: '4px 32px 4px 12px',
                    borderRadius: 8, border: '1px solid #d9d9d9',
                    fontSize: 14, outline: 'none',
                    height: 32,
                    transition: 'all 200ms',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <Search size={16} color="#9ca3af" style={{ position: 'absolute', right: 10, top: 8, cursor: 'pointer' }} />
              </div>
              <button style={{
                padding: '4px 14px', height: 32,
                background: t.hex, color: '#fff',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 400,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <Plus size={14} /> 新建
              </button>
            </div>
          </div>

          <div style={{ height: 240, background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
            children — 业务自己布局（通常是 Antd Table）
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
