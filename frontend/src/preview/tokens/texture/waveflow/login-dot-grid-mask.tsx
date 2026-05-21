import { PreviewFrame } from '../../../_layout';

export default function LoginDotGridMask() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ position: 'relative', height: 480, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)',
        }} />

        <div style={{
          position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%,-50%)',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)',
          mixBlendMode: 'multiply', pointerEvents: 'none',
        }} />

        <div style={{ position: 'absolute', top: 20, left: 24 }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · TEXTURE</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, color: '#1c1917' }}>登录页 Dot Grid + Radial Mask</div>
          <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>24×24px 灰点阵 + ellipse mask 中实边羽化 + indigo multiply 柔光</div>
        </div>
      </div>
    </PreviewFrame>
  );
}
