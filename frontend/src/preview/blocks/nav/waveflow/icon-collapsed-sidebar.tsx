import { PreviewFrame } from '../../../_layout';
import { LayoutDashboard, FolderOpen, Database, ClipboardList, Layers, ScrollText, Server, Users, Activity, Code2, PanelLeftOpen } from 'lucide-react';

const ITEMS = [
  { icon: LayoutDashboard, label: '运行报表', active: true },
  { icon: FolderOpen, label: '项目管理' },
  { icon: Database, label: '数据源' },
  { icon: ClipboardList, label: '任务管理' },
  { icon: Layers, label: '任务集' },
  { icon: ScrollText, label: '日志' },
  { icon: Server, label: '执行器' },
  { icon: Users, label: '用户' },
  { icon: Activity, label: '资源监控' },
  { icon: Code2, label: '工具' },
];

export default function IconCollapsedSidebar() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', height: 600 }}>
        <aside style={{ width: 56, background: '#f4f3ee', borderRight: '1px solid rgba(231,229,224,0.7)', padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <button style={{ width: 40, height: 40, borderRadius: 8, background: '#2563eb', border: 'none', cursor: 'pointer' }} />
          <button style={{ width: 36, height: 28, borderRadius: 6, background: 'transparent', border: 'none', color: '#78716c', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <PanelLeftOpen size={15} />
          </button>
          {ITEMS.map(it => (
            <button key={it.label} title={it.label} style={{
              width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: it.active ? '#fffefb' : 'transparent',
              boxShadow: it.active ? '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' : undefined,
              color: it.active ? '#2563eb' : '#57534e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <it.icon size={17} />
            </button>
          ))}
        </aside>
        <div style={{ flex: 1, background: '#fafaf7' }} />
      </div>
    </PreviewFrame>
  );
}
