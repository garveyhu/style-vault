import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../../_layout';

function BorderTraceButton({ label }: { label: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGRectElement>(null);
  const [perim, setPerim] = useState(400);
  useEffect(() => {
    if (pathRef.current) setPerim(pathRef.current.getTotalLength());
  }, []);
  const trail = perim * 0.2;
  const gap = perim - trail;
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg style={{ position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', pointerEvents: 'none', overflow: 'visible' }}>
        <rect ref={pathRef} x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="none" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" strokeDasharray={`${trail} ${gap}`} opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={`${trail * 0.5} ${perim - trail * 0.5}`} opacity="0.4">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="4.5s" repeatCount="indefinite" begin="-2s" />
        </rect>
      </svg>
      <button ref={btnRef} style={{
        padding: '12px 32px', background: '#2b2b2b', color: '#fff',
        border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        ✨ {label}
      </button>
    </div>
  );
}

export default function GradientHeroPreview() {
  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <style>{`
        @keyframes sv-gh-flow { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }
      `}</style>
      <section style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '80px 32px 64px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 768, margin: '0 auto' }}>
            <h1 style={{
              fontSize: 60, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15,
              color: '#111827', margin: '0 0 20px',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              让 AI 技能{' '}
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'sv-gh-flow 14s linear infinite',
              }}>
                流动起来
              </span>
            </h1>
            <p style={{ color: '#9ca3af', fontSize: 18, margin: '0 0 40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
              发现、安装、分享高质量的 AI Skill 技能包
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <BorderTraceButton label="发布 Skill" />
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', border: '1px solid #d1d5db', background: 'transparent',
                borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#374151', cursor: 'pointer',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                探索全部技能
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PreviewFrame>
  );
}
