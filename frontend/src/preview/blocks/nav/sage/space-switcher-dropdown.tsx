import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SPACES = ['默认空间', '产品分析', '财务月报', 'BI 实验区', '客户档案'];
const THEMES = [
  { hex: '#10b981', selection: '#a7f3d0' },
  { hex: '#22d3ee', selection: '#a5f3fc' },
  { hex: '#fb7185', selection: '#fecdd3' },
  { hex: '#a78bfa', selection: '#ddd6fe' },
];

export default function SpaceSwitcherDropdownPreview() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Space Switcher Dropdown</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>LayoutGrid + 注入 selectionColor 高亮当前空间</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{ width: 24, height: 24, borderRadius: '50%', background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer' }} />
          ))}
        </div>

        <div style={{ width: 240, position: 'relative' }}>
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              width: '100%', padding: '8px 12px', borderRadius: 8,
              background: 'transparent', border: 'none',
              color: '#64748b', fontSize: 13,
              cursor: 'pointer', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>⊞ {SPACES[selected]}</span>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>▾</span>
          </button>

          {open && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
              background: 'rgb(249,249,249)', borderRadius: 10, padding: 4,
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
              maxHeight: 400, overflowY: 'auto',
            }}>
              <div style={{ padding: '6px 10px', fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>我的工作区</div>
              {SPACES.map((s, i) => (
                <div
                  key={s}
                  onClick={() => setSelected(i)}
                  style={{
                    padding: '8px 10px', borderRadius: 6, cursor: 'pointer',
                    background: selected === i ? t.selection : 'transparent',
                    fontWeight: selected === i ? 500 : 400,
                    fontSize: 13, color: '#334155',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span>{s}</span>
                  {selected === i && <span style={{ color: t.hex, fontSize: 12 }}>✓</span>}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #e2e8f0', margin: '6px 4px' }} />
              <div style={{ padding: '8px 10px', fontSize: 13, color: '#475569', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                ⚙ 管理工作区
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
