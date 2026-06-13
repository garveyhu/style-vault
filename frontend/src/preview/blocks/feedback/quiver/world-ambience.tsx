import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function Stage({ label, layers }: { label: string; layers: React.ReactNode }) {
  return (
    <div>
      <div style={{ position: 'relative', height: 150, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)', background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)' }}>
        {layers}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 8 }}>{label}</div>
    </div>
  );
}

export default function WorldAmbiencePreview() {
  const grain = {
    backgroundImage:
      'repeating-radial-gradient(rgba(255,255,255,.6) 0 1px,transparent 1px 2px),repeating-radial-gradient(rgba(0,0,0,.5) 0 1px,transparent 1px 3px)',
    backgroundSize: '3px 3px,4px 4px',
    mixBlendMode: 'overlay' as const,
    opacity: 0.05,
  };
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 44, background: '#0a0e1a' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          BLOCK · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>世界氛围后期</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 28px', maxWidth: 640, lineHeight: 1.7 }}>
          叠在世界之上的整屏后期层：夜色呼吸、预算逼近上限全场转冷转暗临界亮红边、交付绿/红闪、暗角颗粒——氛围即状态反馈
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
          <Stage
            label="#vignette + #grain · 暗角颗粒（静态缓存）"
            layers={
              <>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(130% 110% at 50% 42%,rgba(0,0,0,0) 52%,rgba(0,0,0,.28) 84%,rgba(0,0,0,.6) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, ...grain }} />
              </>
            }
          />
          <Stage
            label="#sky · 夜色呼吸（黄昏→深夜→黎明）"
            layers={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,16,40,.4) 0%, rgba(8,14,34,.44) 48%, rgba(36,58,96,.1) 100%)' }} />}
          />
          <Stage
            label="#budgetTint · 预算逼近上限转冷转暗"
            layers={<div style={{ position: 'absolute', inset: 0, mixBlendMode: 'multiply', background: 'radial-gradient(120% 100% at 50% 40%,rgba(120,150,200,0),rgba(40,60,110,.9))', opacity: 0.5 }} />}
          />
          <Stage
            label="#rededge · 花费 >78% 临界亮红边"
            layers={<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 50% 50%,rgba(226,60,50,0) 62%,rgba(226,60,50,.42) 100%)', opacity: 0.4 }} />}
          />
          <Stage
            label="#flashfx.ok · 验收通过绿闪"
            layers={<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 50% 50%, rgba(108,196,122,0) 60%, rgba(108,196,122,.42) 100%)' }} />}
          />
          <Stage
            label="窗外体积光束 godray + 浮尘"
            layers={
              <>
                <div style={{ position: 'absolute', left: 40, top: 0, width: 80, height: '100%', opacity: 0.32, background: 'linear-gradient(180deg, rgba(173,214,255,.4) 0%, rgba(160,200,255,.14) 42%, rgba(160,200,255,0) 92%)', clipPath: 'polygon(34% 0, 66% 0, 92% 100%, 8% 100%)' }} />
                <div style={{ position: 'absolute', left: 150, top: 40, width: 3, height: 3, borderRadius: '50%', background: '#ffe2b0', opacity: 0.6 }} />
                <div style={{ position: 'absolute', left: 180, top: 80, width: 3, height: 3, borderRadius: '50%', background: '#fff', opacity: 0.35 }} />
              </>
            }
          />
        </div>
      </div>
    </PreviewFrame>
  );
}
