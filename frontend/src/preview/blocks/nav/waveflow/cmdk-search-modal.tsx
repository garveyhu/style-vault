import { PreviewFrame } from '../../../_layout';
import { Search, X, FileText, Layers, FolderKanban } from 'lucide-react';

export default function CmdkSearchModal() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ position: 'relative', height: 700, background: 'rgba(28,25,23,0.3)', backdropFilter: 'blur(1px)', padding: '12vh 32px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ width: 720, maxWidth: '100%', margin: '0 auto', height: 560, background: '#fffefb', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f5f4ee', padding: '12px 16px' }}>
            <Search size={16} color="#a8a29e" />
            <input style={{ flex: 1, fontSize: 15, color: '#1c1917', background: 'transparent', border: 'none', outline: 'none', letterSpacing: '-0.01em' }} placeholder="搜索任务、集合、项目" defaultValue="job" />
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#a8a29e', padding: 4 }}><X size={14} /></button>
            <span style={{ padding: '1px 5px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4, boxShadow: '0 1px 0 #e7e5e0' }}>ESC</span>
          </div>

          {/* body */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* type sidebar */}
            <div style={{ width: 136, padding: 8, borderRight: '1px solid #f5f4ee', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <SidebarType label="全部" count={48} active />
              <SidebarType label="任务" count={32} />
              <SidebarType label="任务集" count={8} />
              <SidebarType label="项目" count={8} />
            </div>

            {/* content */}
            <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
              <Row icon={FileText} iconColor="#3b82f6" title="财务对账 — 每日 09:00" subtitle="项目: 浙有善育 · cron: 0 0 9 * * ?" match="job" active />
              <Row icon={FileText} iconColor="#3b82f6" title="物联采集 — 5min" subtitle="项目: 河南数据中心" match="job" />
              <Row icon={Layers} iconColor="#8b5cf6" title="日终批处理集合" subtitle="20 任务 · 18 运行 · 2 异常" match="job" />
              <Row icon={FolderKanban} iconColor="#f59e0b" title="job-platform" subtitle="项目编号 #1024" match="job" />
            </div>
          </div>

          {/* footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid #f5f4ee', padding: '8px 16px', fontSize: 11, color: '#a8a29e' }}>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> <span>导航</span>
            <Kbd>↵</Kbd> <span>打开</span>
            <Kbd>⌘</Kbd> <Kbd>↵</Kbd> <span>新窗口</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function SidebarType({ label, count, active }: any) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', borderRadius: 6, fontSize: 12.5,
      background: active ? '#1c1917' : 'transparent', color: active ? '#fff' : '#57534e',
      border: 'none', cursor: 'pointer', textAlign: 'left',
    }}>
      <span>{label}</span>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontVariantNumeric: 'tabular-nums', color: active ? '#d6d3d1' : '#a8a29e' }}>{count}</span>
    </button>
  );
}

function Row({ icon: Icon, iconColor, title, subtitle, match, active }: any) {
  const parts = title.split(new RegExp(`(${match})`, 'i'));
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 8,
      background: active ? '#f5f4ee' : 'transparent', cursor: 'pointer', marginBottom: 2,
    }}>
      <span style={{ display: 'inline-flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#fff', border: '1px solid rgba(231,229,224,0.7)', color: iconColor }}>
        <Icon size={14} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: '#1c1917', fontWeight: 500 }}>
          {parts.map((p: string, i: number) => p.toLowerCase() === match.toLowerCase()
            ? <mark key={i} style={{ background: '#fef3c7', color: '#1c1917', padding: '0 2px', borderRadius: 2 }}>{p}</mark>
            : <span key={i}>{p}</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: '#78716c', marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <span style={{ padding: '1px 5px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4, boxShadow: '0 1px 0 #e7e5e0' }}>{children}</span>;
}
