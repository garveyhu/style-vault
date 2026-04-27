import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'green', hex: '#10b981' },
  { name: 'blue', hex: '#60a5fa' },
  { name: 'rose', hex: '#fb7185' },
  { name: 'cyan', hex: '#22d3ee' },
];

const PULSE_CSS = `
@keyframes sv-stop-ping { 0% { transform: scale(1); opacity: 0.4; } 75%, 100% { transform: scale(2); opacity: 0; } }
@keyframes sv-stop-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
`;

export default function StopPulseButtonPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{PULSE_CSS}</style>
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · BUTTON
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Stop Pulse Button
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          AI 流式响应中显示——三层 ping/pulse + sheen + 中心 2.5×2.5 白方块
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: th.hex,
                border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
              title={th.name}
            />
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <button
            style={{
              position: 'relative', width: 32, height: 32,
              border: 'none', background: 'transparent', cursor: 'pointer',
              outline: 'none',
            }}
          >
            {/* 外发光 blur-lg pulse */}
            <span style={{
              position: 'absolute', inset: -10,
              borderRadius: '50%', background: t.hex,
              opacity: 0.3, filter: 'blur(16px)',
              animation: 'sv-stop-pulse 2s ease-in-out infinite',
            }} />
            {/* 中环 ping */}
            <span style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%', background: t.hex,
              opacity: 0.2,
              animation: 'sv-stop-ping 2s ease-out infinite',
            }} />
            {/* 主体 */}
            <span style={{
              position: 'relative', zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32,
              background: t.hex, color: '#fff',
              borderRadius: '50%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
            }}>
              {/* sheen */}
              <span style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                transform: 'skewY(-12deg) translateY(-30%)',
                pointerEvents: 'none',
              }} />
              <span style={{
                position: 'relative', zIndex: 10,
                width: 10, height: 10, background: '#fff',
                borderRadius: 1.5,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }} />
            </span>
          </button>
        </div>

        <code style={{ display: 'block', marginTop: 16, fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>
          ① -inset-2.5 blur-lg animate-pulse → ② inset-0 animate-ping → ③ 主体 ${'${themeClasses.bg}'} + sheen + 内嵌方块
        </code>
      </div>
    </PreviewFrame>
  );
}
