import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function GoButton({
  children,
  active,
  hover,
  mode,
}: {
  children: React.ReactNode;
  active?: boolean;
  hover?: boolean;
  mode?: string;
}) {
  return (
    <button
      style={{
        fontFamily: UI,
        fontSize: 12,
        fontWeight: 600,
        color: '#0e1a10',
        border: 0,
        borderRadius: 11,
        padding: '7px 11px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        cursor: 'pointer',
        background: hover
          ? 'linear-gradient(180deg, #b0f0b0, #75cd83)'
          : 'linear-gradient(180deg, #a6eaa6, #6cc47a)',
        boxShadow: hover
          ? '0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.28), 0 8px 22px rgba(108,196,122,.34), inset 0 1px 0 rgba(255,255,255,.45)'
          : '0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.28), 0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)',
        transform: active ? 'translateY(1px) scale(.985)' : undefined,
      }}
    >
      {/* 纯 CSS 前箭头：border-left 三角，不用图标库 */}
      <span style={{ width: 0, height: 0, borderLeft: '5px solid currentColor', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', opacity: 0.9 }} />
      {children}
      {mode && <span style={{ marginLeft: 6, opacity: 0.8, fontSize: 11 }}>{mode}</span>}
    </button>
  );
}

export default function LimeGoButtonPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 48, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 420 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          BUTTON · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>青柠出发按钮</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 32px', maxWidth: 560, lineHeight: 1.7 }}>
          整个冷暗界面里唯一的「行动绿」——深墨字压在青柠竖向渐变上，三层光影叠出实体亮键
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }}>
          <div>
            <GoButton mode="真实">CEO 下目标</GoButton>
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 10 }}>默认</div>
          </div>
          <div>
            <GoButton hover mode="真实">CEO 下目标</GoButton>
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 10 }}>hover · 提亮</div>
          </div>
          <div>
            <GoButton active mode="模拟">CEO 下目标</GoButton>
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 10 }}>active · translateY(1) scale(.985)</div>
          </div>
        </div>

        <div style={{ marginTop: 40, fontFamily: MONO, fontSize: 11, color: '#76819c', lineHeight: 1.9 }}>
          background: linear-gradient(180deg, #a6eaa6, #6cc47a)<br />
          color: #0e1a10 · font-weight: 600 · border-radius: 11px<br />
          box-shadow: …, 0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)
        </div>
      </div>
    </PreviewFrame>
  );
}
