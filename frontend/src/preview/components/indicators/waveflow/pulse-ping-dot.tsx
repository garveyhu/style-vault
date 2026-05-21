import { PreviewFrame } from '../../../_layout';

export default function PulsePingDot() {
  return (
    <PreviewFrame bg="#fafaf7">
      <style>{`@keyframes wf-ping { 75%,100% { transform: scale(2); opacity: 0 } } @keyframes wf-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }`}</style>
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INDICATOR</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Pulse Ping Dot</h1>

        <Card>
          <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
            <span style={{ position: 'absolute', inset: 0, animation: 'wf-ping 1s infinite', borderRadius: '50%', background: '#34d399', opacity: 0.6 }} />
            <span style={{ position: 'relative', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 11.5, color: '#57534e' }}>
            <span style={{ fontWeight: 500, color: '#292524' }}>8</span>
            <span style={{ marginLeft: 4, color: '#78716c' }}>在线</span>
          </span>
        </Card>

        <Card>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', animation: 'wf-pulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 11.5, color: '#78716c' }}>实时 · 30s 刷新</span>
        </Card>

        <Card>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#a8a29e' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 11.5, color: '#78716c' }}>离线</span>
        </Card>
      </div>
    </PreviewFrame>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 12, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>{children}</div>;
}
