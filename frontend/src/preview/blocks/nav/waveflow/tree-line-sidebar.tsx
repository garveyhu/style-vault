import { PreviewFrame } from '../../../_layout';
import {
  Activity, ChevronDown, ChevronRight, ClipboardList, Code2, Copy, Database,
  FileText, FolderOpen, Layers, LayoutDashboard, PanelLeftClose, ScrollText,
  Server, Settings, Users, Wrench,
} from 'lucide-react';

export default function TreeLineSidebar() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', height: 640, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <aside style={{ width: 240, background: '#f4f3ee', borderRight: '1px solid rgba(231,229,224,0.7)', display: 'flex', flexDirection: 'column' }}>
          {/* brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', height: 56 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#2563eb' }} />
            <span style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>Waveflow</span>
            <PanelLeftClose size={14} style={{ marginLeft: 'auto', color: '#78716c' }} />
          </div>

          {/* nav */}
          <nav style={{ flex: 1, padding: '4px 12px 8px', fontSize: 14, overflow: 'auto' }}>
            <NavItem icon={LayoutDashboard} label="运行报表" active />
            <NavItem icon={FolderOpen} label="项目管理" />
            <NavItem icon={Database} label="数据源" />

            <GroupLabel>调度</GroupLabel>

            <NavGroup icon={ClipboardList} label="任务管理" count={12} open>
              <Tree icon={FileText} label="任务模板" />
              <Tree icon={Wrench} label="任务构建" />
              <Tree icon={Copy} label="批量构建" />
              <Tree icon={ClipboardList} label="任务列表" active />
            </NavGroup>

            <NavGroup icon={Layers} label="任务集" count={5} open>
              <Tree icon={DotIcon('#10b981', true)} label="财务对账" badge="8" />
              <Tree icon={DotIcon('#ef4444', true)} label="物联采集" badge="12" />
              <Tree icon={DotIcon('#d6d3d1')} label="日终批处理" badge="20" />
            </NavGroup>

            <NavItem icon={ScrollText} label="日志管理" />

            <GroupLabel>系统</GroupLabel>
            <NavItem icon={Server} label="执行器" />
            <NavItem icon={Users} label="用户管理" />
            <NavItem icon={Activity} label="资源监控" />
            <NavItem icon={Code2} label="工具" />
          </nav>

          {/* bottom user */}
          <div style={{ borderTop: '1px solid rgba(231,229,224,0.7)', padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1c1917' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: '#292524', fontWeight: 500 }}>links</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#78716c' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                在线
              </div>
            </div>
            <Settings size={14} color="#a8a29e" />
          </div>
        </aside>

        <div style={{ flex: 1, background: '#fafaf7' }} />
      </div>
    </PreviewFrame>
  );
}

function NavItem({ icon: Icon, label, active }: any) {
  return (
    <a style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '6px 12px', borderRadius: 8, fontSize: 14,
      color: active ? '#1c1917' : '#44403c',
      background: active ? '#fffefb' : 'transparent',
      boxShadow: active ? '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' : undefined,
      marginBottom: 2, fontWeight: active ? 500 : 400,
    }}>
      <Icon size={17} color={active ? '#2563eb' : '#78716c'} />
      <span>{label}</span>
    </a>
  );
}

function GroupLabel({ children }: any) {
  return <div style={{ padding: '12px 12px 4px', fontSize: 11, fontWeight: 500, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</div>;
}

function NavGroup({ icon: Icon, label, count, open, children }: any) {
  return (
    <div>
      <a style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '6px 12px', borderRadius: 8, fontSize: 14, color: '#44403c',
      }}>
        {open ? <ChevronDown size={14} color="#a8a29e" /> : <ChevronRight size={14} color="#a8a29e" />}
        <Icon size={17} color="#78716c" />
        <span style={{ flex: 1 }}>{label}</span>
        {count != null && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>{count}</span>}
      </a>
      {open && (
        <div style={{ position: 'relative', marginLeft: 16, marginTop: 2 }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 1, background: '#d6d3d1' }} />
          {children}
        </div>
      )}
    </div>
  );
}

function Tree({ icon: Icon, label, badge, active }: any) {
  return (
    <a style={{
      position: 'relative', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 32px',
      borderRadius: 8, fontSize: 13.5, color: active ? '#1d4ed8' : '#57534e',
      background: active ? 'rgba(219,234,254,0.7)' : 'transparent',
      fontWeight: active ? 500 : 400, marginBottom: 2,
    }}>
      <div style={{ position: 'absolute', left: 0, top: '50%', width: 10, height: 1, background: '#d6d3d1' }} />
      {typeof Icon === 'function' ? <Icon /> : <Icon size={16} color={active ? '#2563eb' : '#a8a29e'} />}
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {badge && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>{badge}</span>}
    </a>
  );
}

function DotIcon(color: string, ring?: boolean) {
  return function () {
    return (
      <span style={{ display: 'inline-flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: ring ? `0 0 0 2px ${color === '#10b981' ? 'rgb(16 185 129 / 15%)' : color === '#ef4444' ? 'rgb(239 68 68 / 18%)' : 'transparent'}` : undefined }} />
      </span>
    );
  };
}
