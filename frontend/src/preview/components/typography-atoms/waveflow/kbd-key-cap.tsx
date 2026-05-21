import { PreviewFrame } from '../../../_layout';

export default function KbdKeyCap() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · KBD</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Kbd Key Cap</h1>

        <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 24 }}>
          <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#57534e' }}>
            打开搜索 <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </div>
          <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#57534e' }}>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> 导航
            <span style={{ marginLeft: 16 }}><Kbd>↵</Kbd> 打开</span>
            <span style={{ marginLeft: 16 }}><Kbd>⌘</Kbd> <Kbd>↵</Kbd> 新窗口</span>
            <span style={{ marginLeft: 16 }}><Kbd>ESC</Kbd></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#57534e' }}>
            <Kbd>⌃</Kbd> <Kbd>⇧</Kbd> <Kbd>⌥</Kbd> 修饰键
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: '#a8a29e' }}>
          padding 1px 5px · 10px mono · 1px stone-200 border · box-shadow 0 1px 0 stone-200 (键帽底沿)
        </div>
      </div>
    </PreviewFrame>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <span style={{ padding: '1px 5px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4, boxShadow: '0 1px 0 #e7e5e0', lineHeight: 1.3 }}>{children}</span>;
}
