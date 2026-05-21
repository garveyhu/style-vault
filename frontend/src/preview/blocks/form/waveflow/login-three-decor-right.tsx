import { PreviewFrame } from '../../../_layout';

export default function LoginThreeDecorRight() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ position: 'relative', height: 720, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1530 50%, #0a1822 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.2), transparent 60%)' }} />

        <svg viewBox="-3 -3 6 6" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <g stroke="#06b6d4" strokeWidth="0.012" fill="none" opacity="0.25">
            <polygon points="0,-2.4 2.28,-0.74 1.41,1.94 -1.41,1.94 -2.28,-0.74" />
            <polygon points="0,2.4 2.28,0.74 1.41,-1.94 -1.41,-1.94 -2.28,0.74" />
          </g>
          <g stroke="#6366f1" strokeWidth="0.02" fill="none" opacity="0.85">
            <polygon points="0,-1.6 1.52,-0.49 0.94,1.29 -0.94,1.29 -1.52,-0.49" />
            <polygon points="0,1.6 1.52,0.49 0.94,-1.29 -0.94,-1.29 -1.52,0.49" />
            <line x1="-1.52" y1="0.49" x2="1.52" y2="-0.49" />
            <line x1="-0.94" y1="-1.29" x2="0.94" y2="1.29" />
          </g>
          <g stroke="#ec4899" strokeWidth="0.018" fill="none" opacity="0.5">
            <polygon points="0,-0.8 0.76,-0.25 0.47,0.65 -0.47,0.65 -0.76,-0.25" />
            <polygon points="0,0.8 0.76,0.25 0.47,-0.65 -0.47,-0.65 -0.76,0.25" />
          </g>
          {Array.from({ length: 100 }).map((_, i) => {
            const x = (Math.sin(i * 1.7) * 2.6).toFixed(2);
            const y = (Math.cos(i * 2.3) * 2.6).toFixed(2);
            return <circle key={i} cx={x} cy={y} r="0.014" fill="white" opacity="0.6" />;
          })}
        </svg>

        <div style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: 40, color: 'rgba(255,255,255,0.85)' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            实时编排 · 数据中枢
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.01em', margin: 0 }}>
            让数据，
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>自如流转。</span>
          </h2>
        </div>
      </div>
    </PreviewFrame>
  );
}
