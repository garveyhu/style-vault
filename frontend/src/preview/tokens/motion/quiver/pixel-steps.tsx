import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

/** 一个极简像素小人（头+身+腿），用于 steps() 跳帧 filmstrip 演示。frame 决定姿态。 */
function MiniFig({ frame }: { frame: 0 | 1 }) {
  const dy = frame === 1 ? -3 : 0;
  const rot = frame === 1 ? 2 : -2;
  return (
    <div style={{ position: 'relative', width: 28, height: 44, imageRendering: 'pixelated', transform: `translateY(${dy}px) rotate(${rot}deg)`, transformOrigin: '50% 100%' }}>
      <div style={{ position: 'absolute', left: 6, top: 2, width: 16, height: 10, background: 'linear-gradient(90deg,#6a96d0 0 5px,#5a86c0 5px 13px,#456ba0 13px 16px)', borderRadius: '3px 3px 1px 1px' }} />
      <div style={{ position: 'absolute', left: 5, top: 14, width: 18, height: 16, background: 'linear-gradient(90deg,#4a6a9a 0 5px,#3f5f8f 5px 13px,#2f4a72 13px 18px)', borderRadius: 1 }} />
      <div style={{ position: 'absolute', left: 7, bottom: frame === 1 ? 2 : 0, width: 6, height: 8, background: '#343c4c' }} />
      <div style={{ position: 'absolute', right: 7, bottom: frame === 1 ? 0 : 2, width: 6, height: 8, background: '#262c38' }} />
    </div>
  );
}

const LEDS = ['#6cc47a', '#ffd27a', '#5ce0ff', '#6cc47a', '#e2604f', '#ffd27a', '#5ce0ff', '#6cc47a', '#ffd27a', '#5ce0ff', '#e2604f', '#6cc47a', '#ffd27a', '#5ce0ff'];
const DIM = new Set([1, 4, 6, 9, 12]); // 这一拍随机翻暗的几颗

const TOKENS: Array<[string, string]> = [
  ['walkbob / typebob', '.42s / .46s steps(2) infinite'],
  ['blinkeye', '4.2s steps(1) infinite'],
  ['sway（待机呼吸）', '3.4s ease-in-out'],
  ['LED flicker', '540ms · 随机翻 2–4 颗 · DIM .22'],
  ['godray shaft', '7.5s / 9.5s ease-in-out'],
  ['--ease', 'cubic-bezier(.32,.72,.24,1)'],
  ['失焦冻结', 'animation: none !important'],
];

export default function PixelStepsPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, maxWidth: 1200 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>MOTION · QUIVER</div>
        <h1 style={{ fontSize: 30, fontWeight: 660, letterSpacing: '-0.01em', margin: '0 0 6px' }}>像素步进动效</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 26px', maxWidth: 760, lineHeight: 1.7 }}>
          角色用 steps() 跳帧（非平滑补间），灯光由 JS 低频随机翻 opacity，整套失焦即冻——「活着但不烧电」（此处为静态帧示意）
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 8 }}>
          {/* steps filmstrip */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 14 }}>steps(2) 跳帧 · 不补间</div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end' }}>
              {([0, 1, 0, 1] as const).map((f, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 14px 10px', borderRadius: 10, background: 'rgba(18,24,42,.55)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <MiniFig frame={f} />
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#76819c' }}>f{f}</span>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#76819c', marginTop: 10 }}>walkbob .42s steps(2) — 两帧硬切，8-bit 手感</div>
          </div>

          {/* LED flicker */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 14 }}>LED 随机明灭 · 540ms / 拍</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '20px 16px', borderRadius: 10, background: 'rgba(8,11,20,.55)', border: '1px solid rgba(255,255,255,.06)' }}>
              {LEDS.map((c, i) => (
                <span key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c, opacity: DIM.has(i) ? 0.22 : 1, boxShadow: DIM.has(i) ? 'none' : `0 0 6px ${c}` }} />
              ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#76819c', marginTop: 10 }}>每拍随机翻 2–4 颗到 DIM .22 — 比整排同步呼吸更像真机房，脏矩形只覆盖那几像素</div>
          </div>
        </div>

        {/* token 表 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', marginTop: 22, paddingTop: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '6px 24px' }}>
            {TOKENS.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                <span style={{ color: '#aab4cd' }}>{k}</span>
                <span style={{ fontFamily: MONO, color: '#eef2fb', fontSize: 11.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
