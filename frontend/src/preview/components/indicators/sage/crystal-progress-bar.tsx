import { useEffect, useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const KFCSS = `
@keyframes sv-cry-shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 50%, 100% { transform: translateX(100%) skewX(-15deg); } }
@keyframes sv-cry-stripes { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }
@keyframes sv-cry-pulse { 0%, 100% { box-shadow: 0 0 8px 0px rgba(var(--c), 0.3); } 50% { box-shadow: 0 0 16px 2px rgba(var(--c), 0.5); } }
`;

const THEMES = [
  { name: 'cyan', hex: '#22d3ee', rgb: '34, 211, 238' },
  { name: 'green', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'rose', hex: '#fb7185', rgb: '251, 113, 133' },
  { name: 'amber', hex: '#fbbf24', rgb: '251, 191, 36' },
];

export default function CrystalProgressBarPreview() {
  const [percent, setPercent] = useState(34);
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  useEffect(() => {
    const id = setInterval(() => setPercent(p => (p >= 100 ? 12 : p + 7)), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{KFCSS}</style>
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · INDICATOR
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Crystal Progress Bar
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          玻璃质感 + 对角条纹 + 倾斜流光 + 阴影呼吸——4 层视觉叠加
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
            />
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>知识库导入进度 · {percent}%</div>
          <Bar percent={percent} color={t.hex} rgb={t.rgb} />

          <div style={{ marginTop: 28, fontSize: 12, color: '#64748b', marginBottom: 8 }}>批量同步</div>
          <Bar percent={88} color={t.hex} rgb={t.rgb} />

          <div style={{ marginTop: 28, fontSize: 12, color: '#64748b', marginBottom: 8 }}>嵌入向量化</div>
          <Bar percent={12} color={t.hex} rgb={t.rgb} />
        </div>

        <ol style={{ marginTop: 18, fontSize: 12, color: '#64748b', lineHeight: 1.8, paddingLeft: 18 }}>
          <li>容器：${'${color}10'} 底色 + 上半 white/20 反光 + inset shadow</li>
          <li>填充：${'${color}'} 主体 + 45° 30×30 白条纹（stripes 平移）</li>
          <li>填充上方：水平 white/60 倾斜光带（shimmer 1.5s）</li>
          <li>填充尾端：6px 白光点 + 10px white shadow</li>
          <li>整条阴影：rgba(c,0.3 → 0.5) pulse 2s</li>
        </ol>
      </div>
    </PreviewFrame>
  );
}

function Bar({ percent, color, rgb }: { percent: number; color: string; rgb: string }) {
  return (
    <div
      style={{
        height: 10,
        width: '100%',
        background: `${color}1A`,
        border: `1px solid ${color}4D`,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '50%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div
        style={{
          ['--c' as any]: rgb,
          height: '100%', width: `${percent}%`,
          background: color,
          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
          backgroundSize: '30px 30px',
          borderRadius: 20,
          transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          animation: 'sv-cry-stripes 1s linear infinite, sv-cry-pulse 2s infinite ease-in-out',
        }}
      >
        {/* shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          transform: 'translateX(-150%) skewX(-15deg)',
          animation: 'sv-cry-shimmer 1.5s infinite',
        }} />
        {/* 尾光 */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0,
          width: 6,
          background: '#fff',
          boxShadow: '0 0 10px 2px #fff',
          borderRadius: '0 20px 20px 0',
          opacity: 0.8,
        }} />
      </div>
    </div>
  );
}
