import { PreviewFrame } from '../../../_layout';

export default function LoginFloatingGeomQuartet() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`
        @keyframes wf-drift1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(0,-12px) } }
        @keyframes wf-drift2 { 0%,100% { transform: translate(0,0) rotate(0deg) } 50% { transform: translate(0,-8px) rotate(8deg) } }
        @keyframes wf-drift3 { 0%,100% { transform: translate(0,0) rotate(45deg) } 50% { transform: translate(0,-14px) rotate(50deg) } }
      `}</style>
      <div style={{ position: 'relative', height: 480, overflow: 'hidden', background: '#fafaf7' }}>
        {/* dot grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }} />

        {/* SVG connecting lines (静态 demo) */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 600 480">
          <line x1="450" y1="106" x2="540" y2="240" stroke="#6366f1" strokeWidth="0.5" opacity="0.25" />
          <line x1="540" y1="240" x2="380" y2="336" stroke="#6366f1" strokeWidth="0.5" opacity="0.25" />
          <line x1="380" y1="336" x2="320" y2="182" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
          <line x1="320" y1="182" x2="450" y2="106" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
        </svg>

        {/* 同心圆紫 · 源码 top 22% right 18% */}
        <div style={{ position: 'absolute', top: '22%', right: '18%', animation: 'wf-drift1 7s ease-in-out infinite' }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
            <circle cx="24" cy="24" r="14" fill="#6366f1" opacity="0.18" />
          </svg>
        </div>
        {/* 圆角方粉 · 源码 top 50% right 8% */}
        <div style={{ position: 'absolute', top: '50%', right: '8%', animation: 'wf-drift2 8s ease-in-out infinite' }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <rect x="2" y="2" width="32" height="32" rx="6" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.6" />
            <rect x="8" y="8" width="20" height="20" rx="3" fill="#ec4899" opacity="0.15" />
          </svg>
        </div>
        {/* 三角青 · 源码 top 70% right 28% */}
        <div style={{ position: 'absolute', top: '70%', right: '28%', animation: 'wf-drift3 9s ease-in-out infinite' }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polygon points="20,4 36,32 4,32" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.55" />
            <polygon points="20,12 30,28 10,28" fill="#06b6d4" opacity="0.18" />
          </svg>
        </div>
        {/* 圆点橙 · 源码 top 38% right 35% */}
        <div style={{ position: 'absolute', top: '38%', right: '35%', animation: 'wf-drift1 6s ease-in-out infinite' }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="3" fill="#f59e0b" />
            <circle cx="14" cy="14" r="12" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        <div style={{ position: 'absolute', top: 20, left: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · TEXTURE</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, color: '#1c1917' }}>4 SVG 浮件 + 动态连线</div>
          <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>紫同心圆 / 粉圆角方 / 青三角 / 橙圆点 + decor-drift + 鼠标 / 浮件互连</div>
        </div>
      </div>
    </PreviewFrame>
  );
}
