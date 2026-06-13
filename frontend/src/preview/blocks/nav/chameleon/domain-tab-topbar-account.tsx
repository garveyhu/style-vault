import { PreviewFrame } from '../../../_layout';
import { Boxes, Database, Telescope, Settings, BookOpen, LogOut, ImageIcon } from 'lucide-react';

/**
 * domain-tab-topbar-account · h-14 paper 域 tab 顶栏 + 账户菜单
 * 品牌 logo 图 | 竖分隔 | 左对齐域 tabs(工作台/知识库/观测/设置) … 右上头像账户 dropdown
 * 源码：src/core/components/layout/top-bar.tsx + nav-config.ts
 */

// 域 tabs（含一个 hover 灰底示意态）
const DOMAINS = [
  { label: '工作台', icon: Boxes, state: 'default' as const },
  { label: '知识库', icon: Database, state: 'hover' as const },
  { label: '观测', icon: Telescope, state: 'active' as const },
  { label: '设置', icon: Settings, state: 'default' as const },
];

export default function DomainTabTopbarAccount() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* ── 顶栏 h-14 / border-stone-200/70 / bg-paper / px-4 ── */}
        <header style={{ display: 'flex', height: 56, flexShrink: 0, alignItems: 'center', gap: 16, borderBottom: '1px solid rgba(231,229,228,0.7)', background: '#fffefb', padding: '0 16px' }}>
          {/* 品牌：logo-sm.png (h-7 w-7 object-contain) + 文字 —— 无边框方框 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', width: 28, height: 28, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#f4f3ee', color: '#a8a29e' }}>
              <ImageIcon size={15} />
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.025em', color: '#292524' }}>Chameleon</span>
          </div>

          {/* 竖分隔 h-5 w-px bg-stone-200 */}
          <span style={{ height: 20, width: 1, background: '#e7e5e4' }} />

          {/* 域 tabs（左对齐 gap-1） */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {DOMAINS.map(d => {
              const Icon = d.icon;
              const active = d.state === 'active';
              const hover = d.state === 'hover';
              return (
                <div key={d.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8, borderRadius: 10,
                  padding: '8px 14px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                  background: active ? '#eff6ff' : hover ? 'rgba(245,245,244,0.7)' : 'transparent',
                  color: active ? '#1d4ed8' : hover ? '#1c1917' : '#57534e',
                }}>
                  <Icon size={17} color={active ? '#2563eb' : '#a8a29e'} />
                  {d.label}
                </div>
              );
            })}
          </nav>

          {/* 右上账户头像 h-8 w-8 圆形 + focus ring 示意 */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#d6d3d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', boxShadow: '0 0 0 2px rgba(59,130,246,0.4)', cursor: 'pointer' }}>
              <ImageIcon size={15} />
            </div>
          </div>
        </header>

        {/* ── 账户 dropdown（展开态展示）w-64 rounded-xl p-1.5 shadow-pop ── */}
        <div style={{ position: 'relative', height: 320, background: '#fafaf7' }}>
          <div style={{ position: 'absolute', top: 12, right: 16, width: 256, borderRadius: 12, border: '1px solid rgba(231,229,228,0.8)', background: '#fffefb', padding: 6, boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)' }}>
            {/* 用户头部 px-2.5 py-2.5 gap-3 + h-9 w-9 头像 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: '50%', overflow: 'hidden', background: '#d6d3d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e' }}>
                <ImageIcon size={16} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13.5, fontWeight: 600, color: '#292524' }}>Links</div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11.5, color: '#a8a29e' }}>archeruuu@gmail.com</div>
              </div>
            </div>
            {/* DropdownMenuSeparator: -mx-1 my-1 h-px bg-stone-200/60 */}
            <div style={{ height: 1, background: 'rgba(231,229,228,0.6)', margin: '4px -4px' }} />
            <MenuItem icon={BookOpen} label="API 文档" />
            <MenuItem icon={Settings} label="系统配置" />
            <MenuItem icon={LogOut} label="退出登录" danger />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function MenuItem({ icon: Icon, label, danger }: { icon: React.ComponentType<{ size?: number; color?: string }>; label: string; danger?: boolean }) {
  // danger 项画出 hover:bg-red-50 (#fef2f2) 态
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, borderRadius: 8, padding: '8px 10px',
      fontSize: 13, color: danger ? '#dc2626' : '#44403c', cursor: 'pointer',
      background: danger ? '#fef2f2' : 'transparent',
    }}>
      <Icon size={16} color={danger ? '#dc2626' : '#a8a29e'} />
      {label}
    </div>
  );
}
