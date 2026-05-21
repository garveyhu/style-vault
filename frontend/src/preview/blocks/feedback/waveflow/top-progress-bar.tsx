import { PreviewFrame } from '../../../_layout';

export default function TopProgressBar() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes wf-progress { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }`}</style>
      <div style={{ position: 'relative', minHeight: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ position: 'absolute', insetInline: 0, top: 0, height: 2, overflow: 'hidden', background: 'rgba(28,25,23,0.04)' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, transparent 0%, #3b82f6 40%, #2563eb 60%, transparent 100%)', animation: 'wf-progress 1.1s ease-in-out infinite' }} />
        </div>

        <div style={{ padding: '48px 24px 0', textAlign: 'center', color: '#57534e' }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>BLOCK · FEEDBACK</div>
          <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1917', margin: '8px 0 16px' }}>Top Progress Bar</h1>
          <div style={{ fontSize: 12.5, color: '#78716c', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            fixed top h-[2px] z-[300] indeterminate · 500ms 防闪 + 100% fade-out · routeChange + axios pending 双源触发
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
