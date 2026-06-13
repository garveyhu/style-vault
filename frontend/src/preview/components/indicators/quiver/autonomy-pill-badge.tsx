import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function AutonomyBadge({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: UI,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.2px',
        padding: '3px 9px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        maxWidth: 190,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...(on
          ? {
              color: '#0e1a10',
              background: 'linear-gradient(180deg, #a6eaa6, #6cc47a)',
              border: '1px solid transparent',
              boxShadow: '0 0 12px rgba(108,196,122,.3)',
            }
          : {
              color: '#76819c',
              background: 'rgba(8,11,20,.55)',
              border: '1px solid rgba(255,255,255,.06)',
            }),
      }}
    >
      {children}
    </span>
  );
}

export default function AutonomyPillBadgePreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 48, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 420 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          INDICATOR · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>自治状态药丸</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 32px', maxWidth: 560, lineHeight: 1.7 }}>
          带文字的二元状态药丸：开 = 醒目青柠发光，关 = 沉默灰——文字即状态，色盲也能读
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 460 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <AutonomyBadge on>自治推进:给看板加暗色模式</AutonomyBadge>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>开 · 有目标(超14字截断)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <AutonomyBadge on>自治中</AutonomyBadge>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>开 · 无目标</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <AutonomyBadge>手动调度</AutonomyBadge>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>关 · 沉默灰</span>
          </div>
        </div>

        {/* 嵌进 HUD 的真实语境 */}
        <div style={{ marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 18, height: 42, padding: '0 18px', borderRadius: 14, background: 'rgba(11,15,26,.72)', border: '1px solid rgba(255,255,255,.09)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)' }}>
          <AutonomyBadge on>自治中</AutonomyBadge>
          <span style={{ fontSize: 11.5, color: '#aab4cd' }}>运行 <b style={{ fontFamily: MONO, color: '#eef2fb', fontWeight: 600 }}>3</b></span>
          <span style={{ fontSize: 11.5, color: '#aab4cd' }}>通过 <b style={{ fontFamily: MONO, color: '#eef2fb', fontWeight: 600 }}>12</b></span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 10 }}>HUD 最左的「公司心跳」锚点</div>
      </div>
    </PreviewFrame>
  );
}
