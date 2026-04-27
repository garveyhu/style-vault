import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SPIN_CSS = `
@keyframes sv-spin-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes sv-spin-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
`;

const THEMES = [
  { hex: '#10b981' }, { hex: '#22d3ee' }, { hex: '#fb7185' }, { hex: '#a78bfa' },
];

export default function SpinFullscreenLoaderPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{SPIN_CSS}</style>
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · FEEDBACK</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Spin Fullscreen Loader</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          Antd Spin · 主题色注入到 .ant-spin-dot-item · slate-50 背景
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: th.hex,
              border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
              cursor: 'pointer',
            }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Panel label="size: small" size={14} hex={t.hex} />
          <Panel label="size: default" size={20} hex={t.hex} />
          <Panel label="size: large (默认)" size={32} hex={t.hex} />
        </div>

        <div style={{
          marginTop: 16, padding: 24,
          background: '#f8fafc', borderRadius: 8,
          height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8,
        }}>
          <DotSpinner hex={t.hex} size={32} />
          <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>fullScreen 模式 · min-height: 100vh · 背景 #f8fafc (slate-50)</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Panel({ label, size, hex }: { label: string; size: number; hex: string }) {
  return (
    <div style={{
      background: '#f8fafc', borderRadius: 8, height: 140,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
    }}>
      <DotSpinner hex={hex} size={size} />
      <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
    </div>
  );
}

function DotSpinner({ hex, size }: { hex: string; size: number }) {
  const dotSize = Math.max(4, size / 4);
  return (
    <div style={{ position: 'relative', width: size, height: size, animation: 'sv-spin-rotate 1.2s linear infinite' }}>
      {[0, 1, 2, 3].map(i => {
        const angle = i * 90;
        return (
          <span
            key={i}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: dotSize, height: dotSize,
              background: hex, borderRadius: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size / 2 - dotSize / 2}px)`,
              animation: `sv-spin-bounce 1s ${i * 0.25}s infinite ease-in-out`,
            }}
          />
        );
      })}
    </div>
  );
}
