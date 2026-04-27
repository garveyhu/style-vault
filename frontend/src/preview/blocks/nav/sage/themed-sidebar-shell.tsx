import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'green', hex: '#10b981', light: '#34d399', selection: '#a7f3d0' },
  { name: 'cyan', hex: '#22d3ee', light: '#67e8f9', selection: '#a5f3fc' },
  { name: 'rose', hex: '#fb7185', light: '#fda4af', selection: '#fecdd3' },
  { name: 'violet', hex: '#a78bfa', light: '#c4b5fd', selection: '#ddd6fe' },
];

export default function ThemedSidebarShellPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [selected, setSelected] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ display: 'flex', height: 600, fontFamily: 'Inter, sans-serif' }}>
        <Sidebar themeColor={t} selected={selected} setSelected={setSelected} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div style={{ flex: 1, padding: 32, color: '#0f172a' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
            BLOCK · NAV · SIDEBAR
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 16px', letterSpacing: '-0.01em' }}>
            Themed Sidebar Shell
          </h1>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
            264px 宽 · rgb(249,249,249) 底 · 7 段结构（logo / space / 按钮组 / 会话列表 / 用户菜单）
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>切主题色:</span>
            {THEMES.map((th, i) => (
              <button
                key={th.name}
                onClick={() => setThemeIdx(i)}
                style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: th.hex,
                  border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <ul style={{ fontSize: 12, color: '#64748b', lineHeight: 1.8, paddingLeft: 18 }}>
            <li>logo + 折叠按钮</li>
            <li>SpaceSwitcher (LayoutGrid + Dropdown)</li>
            <li>新对话 / 收藏 / Agent Store 入口</li>
            <li>会话列表 + uppercase tracking-wider 标题</li>
            <li>用户菜单 (avatar + 12 主题色 dot picker + lang + logout)</li>
          </ul>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Sidebar({ themeColor: t, selected, setSelected, menuOpen, setMenuOpen }: any) {
  const sessions = ['探索新数据集', '调用规则集 v3', '权限审计', '订单异常分析', 'KPI 月报草稿'];

  return (
    <div style={{ width: 264, background: 'rgb(249,249,249)', padding: '16px 12px 8px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 16, color: '#1e293b', letterSpacing: '-0.01em', cursor: 'pointer' }}>
          <span style={{ width: 28, height: 28, borderRadius: 6, background: t.hex, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>S</span>
          <span>Sage</span>
        </div>
        <span style={{ color: '#64748b', cursor: 'pointer', fontSize: 14 }}>◀</span>
      </div>

      {/* Space switcher */}
      <button style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>⊞ 默认空间</span>
        <span style={{ fontSize: 10, color: '#94a3b8' }}>▾</span>
      </button>

      {/* 入口按钮 */}
      <Btn icon="+" label="新对话" theme={t} />
      <Btn icon="★" label="我的收藏" theme={t} />
      <Btn icon="📦" label="Agent Store" theme={t} />

      {/* 会话标题 */}
      <div style={{ padding: '10px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgb(249,249,249)', zIndex: 1, marginTop: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CHATS</span>
      </div>

      {/* 会话列表 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {sessions.map((s, i) => (
          <SessionRow key={s} title={s} active={i === selected} onClick={() => setSelected(i)} themeColor={t} />
        ))}
      </div>

      {/* 用户菜单 */}
      <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #e2e8f0', position: 'relative' }}>
        <div
          onClick={() => setMenuOpen((v: boolean) => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 8px', cursor: 'pointer', borderRadius: 10, background: menuOpen ? 'rgb(237,237,237)' : 'transparent' }}
        >
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #e2e8f0',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: t.hex, fontSize: 14,
            transform: menuOpen ? 'rotate(12deg)' : 'rotate(0deg)',
            transition: 'transform 300ms',
          }}>🌿</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>archer</span>
        </div>

        {menuOpen && (
          <div style={{
            position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 8,
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 8,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#94a3b8', padding: '4px 8px' }}>主题色</div>
            <div style={{ display: 'flex', gap: 6, padding: '4px 8px', overflowX: 'auto' }}>
              {THEMES.map(th => (
                <span key={th.name} style={{ width: 22, height: 22, borderRadius: '50%', background: th.hex, flexShrink: 0, border: th.name === t.name ? '2px solid #475569' : '2px solid transparent' }} />
              ))}
            </div>
            <button style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, background: 'transparent', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer' }}>🌐 简体中文</button>
            <button style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, background: 'transparent', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer' }}>↪ 退出登录</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Btn({ icon, label, theme }: { icon: string; label: string; theme: any }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 8,
        background: h ? 'rgb(237,237,237)' : 'transparent',
        color: h ? theme.hex : '#64748b',
        border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
        textAlign: 'left',
        transition: 'all 200ms',
      }}
    >
      <span>{icon}</span>{label}
    </button>
  );
}

function SessionRow({ title, active, onClick, themeColor: t }: any) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '6px 12px', borderRadius: 8, marginBottom: 2,
        background: active
          ? (h ? 'rgb(231,231,231)' : 'rgb(239,239,239)')
          : (h ? 'rgb(231,231,231)' : 'transparent'),
        color: active ? t.hex : (h ? '#0f172a' : '#475569'),
        fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'all 200ms',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
      <span style={{ opacity: h ? 1 : 0, transition: 'opacity 150ms', color: '#94a3b8' }}>⋯</span>
    </div>
  );
}
