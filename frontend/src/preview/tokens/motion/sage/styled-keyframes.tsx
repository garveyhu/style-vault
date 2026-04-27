import { Globe } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const KEYFRAMES_CSS = `
@keyframes sv-bling { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
@keyframes sv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes sv-snow { 0% { transform: translateY(-10px) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(220px) translateX(20px); opacity: 0; } }
@keyframes sv-wobble { 0% { transform: rotate(0deg); } 25% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } 75% { transform: rotate(-4deg); } 100% { transform: rotate(0deg); } }
@keyframes sv-shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 50%, 100% { transform: translateX(100%) skewX(-15deg); } }
@keyframes sv-pulse { 0%, 100% { box-shadow: 0 0 8px 0px rgba(14,165,233,0.3); } 50% { box-shadow: 0 0 16px 2px rgba(14,165,233,0.5); } }
@keyframes sv-stripes { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }
`;

const KEYFRAMES = [
  { name: 'bling',     dur: '1s',                      use: 'RevolverMenu hover 缩放呼吸' },
  { name: 'earthSpin', dur: '8s linear',               use: 'RevolverMenu 地球图标自转' },
  { name: 'snowFall',  dur: '4-12s linear',            use: 'pinned 时雪花飘落' },
  { name: 'wobble',    dur: '0.6s ease-in-out',        use: '雪人左右摇摆' },
  { name: 'shimmer',   dur: '1.5s',                    use: 'CrystalProgress 玻璃流光' },
  { name: 'pulse',     dur: '2s ease-in-out',          use: '呼吸阴影' },
  { name: 'stripes',   dur: '1s linear',               use: '进度条对角条纹平移' },
];

export default function StyledKeyframes() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{KEYFRAMES_CSS}</style>
      <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          TOKEN · MOTION (styled-components keyframes)
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          7 段专属 keyframes
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          RevolverMenu 雪人飘雪 + CrystalProgress 流光条纹 — sage 装饰性动画的全部
        </p>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                <th style={th}>name</th>
                <th style={th}>duration</th>
                <th style={th}>use</th>
                <th style={{ ...th, textAlign: 'right' }}>preview</th>
              </tr>
            </thead>
            <tbody>
              {KEYFRAMES.map(k => (
                <tr key={k.name} style={{ borderBottom: '1px dashed #f1f5f9' }}>
                  <td style={{ padding: '12px 4px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 12, color: '#0f172a' }}>{k.name}</td>
                  <td style={{ padding: '12px 4px', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 11 }}>{k.dur}</td>
                  <td style={{ padding: '12px 4px', color: '#475569' }}>{k.use}</td>
                  <td style={{ padding: '12px 4px', width: 60, textAlign: 'right' }}>
                    <KFPreview kf={k.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 24, height: 240, background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 12, left: 16, fontSize: 11, color: '#fff', opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            snowFall · 完整场景
          </div>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 56, height: 56, borderRadius: '50%',
            background: '#0ea5e9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            animation: 'sv-spin 8s linear infinite',
          }}>
            <Globe size={28} />
          </div>
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: -10,
                left: `${(i * 11) % 100}%`,
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                background: '#fff',
                borderRadius: '50%',
                filter: 'blur(1px)',
                opacity: 0.6,
                animation: `sv-snow ${4 + (i % 5)}s linear infinite`,
                animationDelay: `${-i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function KFPreview({ kf }: { kf: string }) {
  if (kf === 'bling' || kf === 'wobble' || kf === 'earthSpin' || kf === 'pulse') {
    return (
      <div
        style={{
          display: 'inline-block',
          width: 24,
          height: 24,
          background: '#0ea5e9',
          borderRadius: '50%',
          animation:
            kf === 'bling' ? 'sv-bling 1s infinite' :
            kf === 'wobble' ? 'sv-wobble 0.6s ease-in-out infinite' :
            kf === 'earthSpin' ? 'sv-spin 4s linear infinite' :
            'sv-pulse 2s infinite ease-in-out',
        }}
      />
    );
  }
  if (kf === 'snowFall') {
    return (
      <div style={{ display: 'inline-block', width: 30, height: 36, position: 'relative', background: '#0ea5e9', borderRadius: 6, overflow: 'hidden' }}>
        {[0, 0.5, 1, 1.5].map(d => (
          <span key={d} style={{ position: 'absolute', top: -8, left: `${20 + d * 15}%`, width: 4, height: 4, background: '#fff', borderRadius: '50%', animation: 'sv-snow 2s linear infinite', animationDelay: `-${d}s` }} />
        ))}
      </div>
    );
  }
  if (kf === 'shimmer') {
    return (
      <div style={{ display: 'inline-block', width: 50, height: 12, background: '#cbd5e1', borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', animation: 'sv-shimmer 1.5s infinite' }} />
      </div>
    );
  }
  if (kf === 'stripes') {
    return (
      <div style={{
        display: 'inline-block',
        width: 50, height: 12,
        background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent), #0ea5e9',
        backgroundSize: '12px 12px',
        borderRadius: 6,
        animation: 'sv-stripes 1s linear infinite',
      }} />
    );
  }
  return null;
}

const th = { padding: '8px 4px', fontWeight: 600 as const, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: 1 };
