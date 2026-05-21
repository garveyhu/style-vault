import { PreviewFrame } from '../../../_layout';

export default function DataConsoleShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', height: 480, fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
        {/* sidebar */}
        <aside style={{ width: 240, background: '#f4f3ee', borderRight: '1px solid rgba(231,229,224,0.7)', padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15.5, fontWeight: 600, color: '#292524', marginBottom: 16 }}>Waveflow</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8 }}>调度</div>
          <div style={{ background: '#fffefb', borderRadius: 6, padding: '8px 12px', marginTop: 8, fontSize: 14, color: '#1c1917', boxShadow: '0 1px 2px rgb(0 0 0 / 4%)' }}>任务管理</div>
          <div style={{ padding: '8px 12px', marginTop: 4, fontSize: 14, color: '#44403c' }}>任务集</div>
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(231,229,224,0.7)', paddingTop: 12, fontSize: 12, color: '#44403c' }}>用户 · 在线</div>
        </aside>

        {/* main */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* topbar */}
          <header style={{ height: 48, borderBottom: '1px solid rgba(231,229,224,0.7)', background: '#fafaf7', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12 }}>
            <div style={{ width: 260, height: 28, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 6, fontSize: 12.5, color: '#a8a29e', padding: '0 12px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgb(0 0 0 / 4%)' }}>
              搜索任务、集合、项目
              <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4, padding: '1px 5px', color: '#78716c', boxShadow: '0 1px 0 #e7e5e0' }}>⌘K</span>
            </div>
          </header>

          {/* content */}
          <div style={{ flex: 1, padding: '16px 24px', overflowY: 'auto' }}>
            <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917' }}>列表区</div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#78716c' }}>section · rounded-xl border-stone-200/40 paper bg shadow-soft</div>
            </div>
          </div>
        </main>

        <div style={{ position: 'absolute', top: 8, right: 16, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e' }}>
          TOKEN · LAYOUT · Data Console Shell
        </div>
      </div>
    </PreviewFrame>
  );
}
