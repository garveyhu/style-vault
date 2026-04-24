import { useEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../_layout';

function BorderTraceButton({ label = '发布 Skill' }: { label?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGRectElement>(null);
  const [perim, setPerim] = useState(400);

  useEffect(() => {
    const measure = () => { if (pathRef.current) setPerim(pathRef.current.getTotalLength()); };
    measure();
    if (!btnRef.current) return;
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(btnRef.current);
    return () => ro.disconnect();
  }, []);

  const trail = perim * 0.2;
  const gap = perim - trail;
  const [scale, setScale] = useState(1);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg style={{
        position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)',
        pointerEvents: 'none', overflow: 'visible',
      }}>
        <rect ref={pathRef} x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="none" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none"
          stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none"
          stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round"
          strokeDasharray={`${trail} ${gap}`} opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none"
          stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray={`${trail * 0.25} ${perim - trail * 0.25}`} opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none"
          stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray={`${trail * 0.5} ${perim - trail * 0.5}`} opacity="0.4">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="4.5s" repeatCount="indefinite" begin="-2s" />
        </rect>
      </svg>
      <button
        ref={btnRef}
        onMouseEnter={() => setScale(1.03)}
        onMouseLeave={() => setScale(1)}
        onMouseDown={() => setScale(0.97)}
        onMouseUp={() => setScale(1.03)}
        style={{
          position: 'relative',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 32px',
          color: '#fff', fontSize: 14, fontWeight: 700,
          borderRadius: 16, border: 'none', cursor: 'pointer',
          overflow: 'hidden',
          transform: `scale(${scale})`,
          transition: 'transform 150ms ease-out',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <span style={{ position: 'absolute', inset: 0, background: '#2b2b2b' }} />
        <span style={{
          position: 'absolute', inset: 0,
          opacity: 0.12, backgroundSize: '300% 100%',
          animation: 'sv-btc-flow 20s linear infinite',
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(165,243,252,0.8) 20%, transparent 40%, rgba(196,181,253,0.6) 60%, transparent 80%, rgba(165,243,252,0.8) 100%)',
        }} />
        <span style={{ position: 'relative', zIndex: 10, letterSpacing: 0.5 }}>✨ {label}</span>
      </button>
    </div>
  );
}

export default function BorderTraceCtaPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <style>{`
        @keyframes sv-btc-flow { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }
      `}</style>
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · BUTTON</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Border Trace CTA</h1>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 48, marginBottom: 16, textAlign: 'center' }}>
          <BorderTraceButton label="发布 Skill" />
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 16, fontFamily: 'JetBrains Mono, monospace' }}>
            cyan-200 (3s) + purple-300 (4.5s, offset -2s)
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 48, marginBottom: 16, textAlign: 'center' }}>
          <BorderTraceButton label="创建你的第一个 Skill" />
        </section>

        <section style={{ background: '#0f172a', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <BorderTraceButton label="暗底也 OK" />
        </section>
      </div>
    </PreviewFrame>
  );
}
