import { useEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../_layout';

function Section({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  return (
    <section style={{
      border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16,
      background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1.5 }}>{title}</div>
      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#3730a3', display: 'block', marginBottom: 16 }}>{code}</code>
      {children}
    </section>
  );
}

function FadeLoop() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div key={key} style={{
      padding: '12px 20px', background: '#0f172a', color: '#fff',
      borderRadius: 12, display: 'inline-block',
      animation: 'sv-gf-fade 300ms ease-out both',
    }}>
      Hello, entering in 300ms
    </div>
  );
}

function HoverFloat() {
  return (
    <div style={{
      padding: '16px 24px', background: '#fff',
      border: '1px solid #e5e7eb', borderRadius: 16,
      transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
      display: 'inline-block', cursor: 'pointer',
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      ↑ Hover me (y: -4)
    </div>
  );
}

function TapButton() {
  return (
    <button
      style={{
        padding: '10px 20px', background: '#1a1a1a', color: '#fff',
        border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600,
        transition: 'transform 100ms ease-out',
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)'; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
    >
      Click me (scale 0.95)
    </button>
  );
}

function FlowGradient() {
  return (
    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>
      让技能{' '}
      <span style={{
        backgroundImage: 'linear-gradient(90deg, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'sv-gf-flow 14s linear infinite',
      }}>
        流动起来
      </span>
    </div>
  );
}

function BorderTrace() {
  const rectRef = useRef<SVGRectElement>(null);
  const [perim, setPerim] = useState(400);
  useEffect(() => {
    if (rectRef.current) setPerim(rectRef.current.getTotalLength());
  }, []);
  const trail = perim * 0.2;
  const gap = perim - trail;
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg style={{ position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', overflow: 'visible', pointerEvents: 'none' }}>
        <rect ref={rectRef} x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="none" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" strokeDasharray={`${trail} ${gap}`} opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={`${trail * 0.5} ${perim - trail * 0.5}`} opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="4.5s" repeatCount="indefinite" begin="-2s" />
        </rect>
      </svg>
      <div style={{
        padding: '12px 32px', background: '#2b2b2b', color: '#fff',
        borderRadius: 16, fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
      }}>
        ✨ 发布 Skill
      </div>
    </div>
  );
}

export default function GentleFlowPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <style>{`
        @keyframes sv-gf-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sv-gf-flow {
          from { background-position: 300% 50%; }
          to   { background-position: 0% 50%; }
        }
      `}</style>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        fontFamily: 'Inter, system-ui, sans-serif', color: '#111827',
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>TOKEN · MOTION</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Gentle Flow</h1>

        <Section title="Enter · fade + translate 20px" code="initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} duration:0.3">
          <FadeLoop />
        </Section>

        <Section title="Hover · y: -4" code="whileHover={{y:-4}} duration:0.2">
          <HoverFloat />
        </Section>

        <Section title="Tap · scale(0.95)" code="whileTap={{scale:0.97}} OR active:scale-95">
          <TapButton />
        </Section>

        <Section title="Flow · gradient animation 14s linear" code="bg-size:300% animate-[flow-right_14s_linear_infinite]">
          <FlowGradient />
        </Section>

        <Section title="SVG · border-trace" code="dur=3s (cyan) + 4.5s (purple) stroke-dashoffset loop">
          <BorderTrace />
        </Section>
      </div>
    </PreviewFrame>
  );
}
