import { PreviewFrame } from '../../../_layout';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function DarkPillArrowCta() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917', textAlign: 'center' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · BUTTON · LOGIN CTA</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Dark Pill Arrow CTA</h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <button style={pill}>继续<ArrowRight size={14} /></button>
          <button style={{ ...pill, opacity: 0.6 }}><Loader2 size={14} style={{ animation: 'wf-spin 1s linear infinite' }} /> 继续</button>
        </div>
        <style>{`@keyframes wf-spin { to { transform: rotate(360deg) } }`}</style>

        <div style={{ fontSize: 12, color: '#a8a29e', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          <code style={{ fontFamily: 'JetBrains Mono, monospace', background: '#f5f4ee', padding: '1px 5px', borderRadius: 3 }}>!h-11 !min-w-[140px] !rounded-full !px-6 !text-[13.5px] !tracking-wide</code>
          <br />stone-900 底 + rounded-full + 箭头 group-hover:translate-x-1
          <br />登录页 editorial 性格出口 · 不要用到 admin 主体
        </div>
      </div>
    </PreviewFrame>
  );
}

const pill: React.CSSProperties = {
  height: 44, minWidth: 140, padding: '0 24px', borderRadius: 9999,
  background: '#1c1917', color: '#fff', fontSize: 13.5, letterSpacing: '0.025em', fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: 'none',
};
