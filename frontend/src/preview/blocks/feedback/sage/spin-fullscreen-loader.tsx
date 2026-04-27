import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

// 复刻 Antd Spin 默认 indicator · 4 个圆点正方形布局 + 容器 0.6s rotate + 每个 dot scale bounce
const ANTD_SPIN_CSS = `
@keyframes sv-antdspin-rotate {
  to { transform: rotate(405deg); }
}
@keyframes sv-antdspin-move {
  to { opacity: 1; }
}
.sv-antd-spin {
  position: relative;
  display: inline-block;
  font-size: var(--sv-spin-size, 32px);
  width: 1em; height: 1em;
  transform: rotate(45deg);
  animation: sv-antdspin-rotate 1.2s infinite linear;
}
.sv-antd-spin > i {
  position: absolute;
  display: block;
  width: 0.4em; height: 0.4em;
  background: var(--sv-spin-color, #10b981);
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: sv-antdspin-move 1s infinite linear alternate;
}
.sv-antd-spin > i:nth-child(1) { top: 0; left: 0; }
.sv-antd-spin > i:nth-child(2) { top: 0; right: 0; animation-delay: 0.4s; }
.sv-antd-spin > i:nth-child(3) { right: 0; bottom: 0; animation-delay: 0.8s; }
.sv-antd-spin > i:nth-child(4) { bottom: 0; left: 0; animation-delay: 1.2s; }
`;

const THEMES = [
  { name: 'green', hex: '#10b981' },
  { name: 'blue',  hex: '#60a5fa' },
  { name: 'rose',  hex: '#fb7185' },
  { name: 'cyan',  hex: '#22d3ee' },
];

export default function SpinFullscreenLoaderPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{ANTD_SPIN_CSS}</style>
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          BLOCK · FEEDBACK
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>全屏加载</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          Antd Spin 默认 indicator · 主题色注入 .ant-spin-dot-item · 背景 #f8fafc (slate-50)
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
          <Panel label="size: small · 14px" hex={t.hex} size={14} />
          <Panel label="size: default · 20px" hex={t.hex} size={20} />
          <Panel label="size: large (默认) · 32px" hex={t.hex} size={32} />
        </div>

        <div style={{
          marginTop: 16, padding: 24,
          background: '#f8fafc', borderRadius: 8,
          minHeight: 240,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12,
        }}>
          <AntdSpin hex={t.hex} size={32} />
          <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>fullScreen 模式 · min-height: 100vh · 背景 #f8fafc</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Panel({ label, hex, size }: { label: string; hex: string; size: number }) {
  return (
    <div style={{
      background: '#f8fafc', borderRadius: 8, height: 140,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
    }}>
      <AntdSpin hex={hex} size={size} />
      <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
    </div>
  );
}

function AntdSpin({ hex, size }: { hex: string; size: number }) {
  return (
    <span
      className="sv-antd-spin"
      style={{ ['--sv-spin-size' as 'opacity']: `${size}px`, ['--sv-spin-color' as 'opacity']: hex } as React.CSSProperties}
    >
      <i /><i /><i /><i />
    </span>
  );
}
