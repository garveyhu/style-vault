import { useState } from 'react';
import { Copy, Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const T_HEX = '#10b981';

export default function SidebarSessionRowPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Sidebar Session Row</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          选中态 · hover · 三气泡操作菜单 · inline 编辑
        </p>

        <div style={{ background: 'rgb(249,249,249)', padding: 12, borderRadius: 12, width: 280 }}>
          <Row title="探索新数据集" />
          <Row title="调用规则集 v3" active />
          <Row title="权限审计 — 长标题示例 hover 显操作菜单" forceHover />
          <Row title="订单异常分析" editing />
          <Row title="KPI 月报草稿" forceHover withMenu />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Row({ title, active, forceHover, editing, withMenu }: { title: string; active?: boolean; forceHover?: boolean; editing?: boolean; withMenu?: boolean }) {
  const [h, setH] = useState(!!forceHover);
  const [menu, setMenu] = useState(!!withMenu);

  return (
    <div
      onMouseEnter={() => !forceHover && setH(true)}
      onMouseLeave={() => !forceHover && setH(false)}
      style={{
        position: 'relative',
        padding: '6px 12px', borderRadius: 8, marginBottom: 2,
        background: active
          ? (h ? 'rgb(231,231,231)' : 'rgb(239,239,239)')
          : (h ? 'rgb(231,231,231)' : 'transparent'),
        color: active ? T_HEX : (h ? '#0f172a' : '#475569'),
        fontSize: 14, fontWeight: 500,
        cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
      }}
    >
      {editing ? (
        <input
          autoFocus
          defaultValue={title}
          style={{
            background: '#fff', color: '#1e293b', fontSize: 14,
            padding: '2px 4px', borderRadius: 4, width: '100%',
            outline: 'none', border: '1px solid #34d399',
          }}
        />
      ) : (
        <>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {title}
          </span>
          <button
            onClick={e => { e.stopPropagation(); setMenu(v => !v); }}
            style={{
              padding: 4, borderRadius: 6,
              background: menu ? '#cbd5e1' : 'transparent',
              color: menu ? '#1e293b' : '#94a3b8',
              border: 'none', cursor: 'pointer',
              opacity: (h || menu) ? 1 : 0,
              transition: 'opacity 150ms',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <MoreHorizontal size={16} />
          </button>

          {menu && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 4, width: 128,
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8,
              padding: 4, zIndex: 20,
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)',
            }}>
              <MenuButton icon={<Edit2 size={14} />} label="重命名" />
              <MenuButton icon={<Copy size={14} />} label="复制对话" />
              <MenuButton icon={<Trash2 size={14} />} label="删除" danger />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MenuButton({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: '100%', textAlign: 'left',
        padding: '6px 12px', borderRadius: 6,
        background: h ? (danger ? '#fef2f2' : '#f8fafc') : 'transparent',
        color: h && danger ? '#dc2626' : (danger ? '#475569' : '#475569'),
        border: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      {icon}{label}
    </button>
  );
}
