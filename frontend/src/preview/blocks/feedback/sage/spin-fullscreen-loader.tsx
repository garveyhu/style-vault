import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const KFCSS = `
@keyframes sv-spin-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
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
      <style>{KFCSS}</style>
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · FEEDBACK</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Spin Fullscreen Loader</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>Antd Spin · 主题色注入 · slate-50 背景</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{ width: 22, height: 22, borderRadius: '50%', background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer' }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Panel title="size: small" size="small" hex={t.hex} />
          <Panel title="size: default" size="default" hex={t.hex} />
          <Panel title="size: large (默认)" size="large" hex={t.hex} />
        </div>

        <div style={{ marginTop: 16, padding: 24, background: '#f8fafc', borderRadius: 12, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          <DotSpinner hex={t.hex} size={32} />
          <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 8 }}>fullScreen 模式 · min-height: 100vh</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Panel({ title, size, hex }: { title: string; size: 'small' | 'default' | 'large'; hex: string }) {
  const dim = size === 'small' ? 18 : size === 'default' ? 24 : 32;
  return (
    <div style={{ background: '#f8fafc', borderRadius: 12, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <DotSpinner hex={hex} size={dim} />
      <span style={{ fontSize: 11, color: '#94a3b8' }}>{title}</span>
    </div>
  );
}

function DotSpinner({ hex, size }: { hex: string; size: number }) {
  const dotSize = Math.max(4, size / 4);
  return (
    <div style={{ position: 'relative', width: size, height: size, animation: 'sv-spin-spin 1.2s linear infinite' }}>
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
