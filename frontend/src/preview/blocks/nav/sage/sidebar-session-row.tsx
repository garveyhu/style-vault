import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function SidebarSessionRowPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Sidebar Session Row</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>选中态 / hover / 三气泡操作菜单 / inline 编辑</p>

        <div style={{ background: 'rgb(249,249,249)', padding: 12, borderRadius: 12, width: 264 }}>
          <SessionRow title="探索新数据集" active={false} />
          <SessionRow title="调用规则集 v3" active={true} />
          <SessionRow title="权限审计" active={false} hovered showMenu />
          <SessionRow title="订单异常分析" active={false} editing />
          <SessionRow title="KPI 月报草稿" active={false} hovered openMenu={open} setOpenMenu={setOpen} />
        </div>
      </div>
    </PreviewFrame>
  );
}

function SessionRow({ title, active, hovered, showMenu, editing, openMenu, setOpenMenu }: any) {
  const [h, setH] = useState(!!hovered);
  const themeText = '#10b981';

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => !hovered && setH(false)}
      style={{
        padding: '6px 12px', borderRadius: 8, marginBottom: 2,
        background: active
          ? (h ? 'rgb(231,231,231)' : 'rgb(239,239,239)')
          : (h ? 'rgb(231,231,231)' : 'transparent'),
        color: active ? themeText : (h ? '#0f172a' : '#475569'),
        fontSize: 13, fontWeight: 500,
        position: 'relative', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      {editing ? (
        <input autoFocus defaultValue={title} style={{
          background: '#fff', color: '#0f172a', fontSize: 13,
          padding: '2px 4px', borderRadius: 4, width: '100%',
          outline: 'none', border: '1px solid #34d399',
        }} />
      ) : (
        <>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{title}</span>
          <button
            onClick={e => { e.stopPropagation(); setOpenMenu?.(!openMenu); }}
            style={{
              padding: 4, borderRadius: 4,
              background: openMenu ? '#cbd5e1' : (h && (showMenu || true) ? 'transparent' : 'transparent'),
              color: openMenu ? '#1e293b' : '#94a3b8',
              border: 'none', cursor: 'pointer',
              opacity: (showMenu || h || openMenu) ? 1 : 0,
              transition: 'opacity 150ms',
              fontSize: 14,
            }}
          >⋯</button>

          {(showMenu || openMenu) && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 4, width: 130,
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
              padding: 4, zIndex: 20,
              boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
            }}>
              <MenuButton label="重命名" icon="✎" />
              <MenuButton label="复制对话" icon="⊕" />
              <MenuButton label="删除" icon="🗑" danger />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MenuButton({ label, icon, danger }: { label: string; icon: string; danger?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: '100%', textAlign: 'left',
        padding: '6px 10px', borderRadius: 6,
        background: h ? (danger ? '#fef2f2' : '#f8fafc') : 'transparent',
        color: h && danger ? '#dc2626' : '#475569',
        border: 'none', cursor: 'pointer',
        fontSize: 12, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      <span>{icon}</span>{label}
    </button>
  );
}
