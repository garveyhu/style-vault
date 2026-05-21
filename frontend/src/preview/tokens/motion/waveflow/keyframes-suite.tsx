import { PreviewFrame } from '../../../_layout';

const KEYFRAMES = [
  { name: 'accordion-down', dur: '0.2s', use: 'Radix Accordion 展开' },
  { name: 'decor-drift-1', dur: '6-7s', use: '登录浮件圆/同心圆漂浮' },
  { name: 'decor-drift-2', dur: '8s', use: '登录浮件方 (含 rotate 8deg)' },
  { name: 'decor-drift-3', dur: '9s', use: '登录浮件三角 (rotate 45→50deg)' },
  { name: 'ping-soft', dur: '2s', use: '状态点呼吸 .pulse-soft' },
  { name: 'global-progress', dur: '1.1s', use: '顶部 2px indeterminate' },
  { name: 'boot-dot', dur: '1s', use: '启动 loading 三点' },
  { name: 'shimmer', dur: '1.6s', use: '骨架 .skeleton 暖灰渐变' },
];

export default function KeyframesSuite() {
  return (
    <PreviewFrame bg="#fafaf7">
      <style>{`
        @keyframes wf-shimmer {
          0% { background-position: -200px 0 }
          100% { background-position: 200px 0 }
        }
        @keyframes wf-ping-soft {
          0%,100% { opacity: 1 }
          50% { opacity: 0.6 }
        }
        @keyframes wf-progress {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · MOTION</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Keyframes Suite</h1>

        <div style={{ position: 'relative', height: 2, overflow: 'hidden', background: 'rgba(0,0,0,0.05)', marginBottom: 16 }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, transparent 0%, #3b82f6 40%, #2563eb 60%, transparent 100%)', animation: 'wf-progress 1.1s ease-in-out infinite' }} />
        </div>

        <div style={{ background: 'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)', backgroundSize: '400px 100%', animation: 'wf-shimmer 1.6s ease-in-out infinite', height: 12, borderRadius: 4, marginBottom: 24 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {KEYFRAMES.map(k => (
            <div key={k.name} style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: '#1c1917' }}>{k.name}</div>
              <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 2 }}>{k.dur} · {k.use}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#57534e' }}>
          <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgb(16 185 129 / 15%)', animation: 'wf-ping-soft 2s ease-in-out infinite' }} />
          status-dot-running + ping-soft (2s breath)
        </div>
      </div>
    </PreviewFrame>
  );
}
