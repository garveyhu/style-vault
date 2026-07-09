import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea';
const INK = '#2a2620';
const MUTED = '#8f8676';
const BORDER = 'rgba(42,38,32,0.11)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Card({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: '1 1 300px' }}>
      <div style={{ position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 18px 36px -24px rgba(74,54,20,0.14)' }}>{children}</div>
      <div style={{ marginTop: 10, fontFamily: DISPLAY, fontSize: 14, fontWeight: 600, color: INK }}>{title}</div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{hint}</div>
    </div>
  );
}

export default function WarmPaperGrain() {
  return (
    <PreviewFrame bg={SAND}>
      <div style={{ padding: 40, fontFamily: DISPLAY, color: INK }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>暖纸颗粒 + 弥散氛围底</h2>
        <p style={{ margin: '6px 0 24px', fontSize: 14, color: MUTED }}>三层氛围底：底噪颗粒去塑料 + 金光弥散暖意 + 细网格秩序 —— 让暖砂底有纵深</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Card title="① feTurbulence 颗粒" hint="opacity .05 · mix-blend overlay">
            <div style={{ position: 'absolute', inset: 0, background: '#efe8db' }} />
            <div style={{ position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'overlay', backgroundImage: GRAIN }} />
          </Card>
          <Card title="② 金光弥散 ambient" hint="radial gold ≤ .10 · attach fixed">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 90% at 80% -10%, rgba(200,137,31,0.28), transparent 60%), radial-gradient(80% 80% at 10% 10%, rgba(178,152,116,0.22), transparent 55%), linear-gradient(168deg,#f0eeea,#e6e0d6)' }} />
          </Card>
          <Card title="③ 48px 细网格" hint="ink 4% · board 底纹">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(42,38,32,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(42,38,32,0.06) 1px, transparent 1px), #f6f2e8', backgroundSize: '40px 40px, 40px 40px, auto' }} />
          </Card>
        </div>

        {/* 叠加结果：玻璃卡浮在三层底上 */}
        <div style={{ marginTop: 28, position: 'relative', height: 180, borderRadius: 20, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 84% -14%, rgba(200,137,31,0.14), transparent 60%), linear-gradient(168deg,#f0eeea,#e9e5df)' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'overlay', backgroundImage: GRAIN }} />
          <div style={{ position: 'absolute', left: 40, top: 40, right: 40, bottom: 40, background: 'rgba(255,253,248,0.74)', backdropFilter: 'blur(30px) saturate(140%)', border: '1px solid rgba(255,255,255,0.82)', borderRadius: 16, boxShadow: '0 18px 36px -24px rgba(74,54,20,0.12), inset 0 1px 0 rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 14, color: MUTED }}>
            叠加结果：三层底 + 白磨砂玻璃卡浮起（去「塑料白玻璃」）
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
