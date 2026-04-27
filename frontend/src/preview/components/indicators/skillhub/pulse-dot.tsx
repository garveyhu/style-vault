import { MessageSquare } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const COLORS = {
  emerald: { bg: '#10b981', glow: 'rgba(16,185,129,0.8)' },
  orange: { bg: '#f97316', glow: 'rgba(249,115,22,0.8)' },
  rose: { bg: '#f43f5e', glow: 'rgba(244,63,94,0.8)' },
  teal: { bg: '#14b8a6', glow: 'rgba(20,184,166,0.8)' },
} as const;

function Dot({ color, size = 6, label, animated = true, labelColor = '#9ca3af', labelWeight = 500 }: {
  color: keyof typeof COLORS; size?: 6 | 8; label?: string; animated?: boolean;
  labelColor?: string; labelWeight?: number;
}) {
  const c = COLORS[color];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: size, height: size, borderRadius: 999, background: c.bg,
          boxShadow: `0 0 8px ${c.glow}`,
          animation: animated ? 'sv-pulse-dot 2s ease-in-out infinite' : undefined,
          display: 'inline-block',
        }}
      />
      {label && <span style={{ fontSize: 12, color: labelColor, fontWeight: labelWeight }}>{label}</span>}
    </div>
  );
}

export default function PulseDotPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <style>{`
        @keyframes sv-pulse-dot { 50% { opacity: 0.4; } }
      `}</style>
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · INDICATOR</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Pulse Dot</h1>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 16 }}>4 color variants · size 6</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Dot color="emerald" label="All Systems Operational" />
            <Dot color="orange" label="3 未读消息" />
            <Dot color="teal" label="在线" />
            <Dot color="rose" size={8} label="LIVE" labelColor="#e11d48" labelWeight={700} />
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 16 }}>Badge 附着用法（未读红点）</div>
          <div style={{ position: 'relative', display: 'inline-block', color: '#64748b' }}>
            <MessageSquare size={18} />
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 6, height: 6, borderRadius: 999, background: '#f97316',
            }} />
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 16 }}>静态 vs 动画对比</div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Dot color="emerald" label="animated (默认)" animated />
            <Dot color="emerald" label="static" animated={false} />
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
