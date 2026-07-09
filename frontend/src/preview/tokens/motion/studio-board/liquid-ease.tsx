import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea';
const SURFACE = '#fffdfa';
const INK = '#2a2620';
const MUTED = '#8f8676';
const WARNING = '#c8891f';
const BORDER = 'rgba(42,38,32,0.11)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

function Curve({ d, label, sub }: { d: string; label: string; sub: string }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, width: 260 }}>
      <svg viewBox="0 0 100 100" width={110} height={110} style={{ display: 'block' }}>
        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(42,38,32,0.15)" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(42,38,32,0.15)" strokeWidth="1" />
        <path d={d} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 12, color: INK }}>{label}</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 12, color: MUTED }}>{sub}</div>
    </div>
  );
}

export default function LiquidEase() {
  return (
    <PreviewFrame bg={SAND}>
      <div style={{ padding: 40, fontFamily: DISPLAY, color: INK }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>Liquid easeOut 动效栈</h2>
        <p style={{ margin: '6px 0 24px', fontSize: 14, color: MUTED }}>一条阻尼「液体」缓动统治全站 + 两档时长 + 一组克制 keyframes（绝不 linear）</p>

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {/* easeOut 强，尾部长缓冲：M0,100 到 100,0，控制点贴顶 */}
          <Curve d="M0,100 C16,0 30,0 100,0" label="cubic-bezier(0.16,1,0.3,1)" sub="主缓动 · workstation 液体感" />
          <Curve d="M0,100 C20,20 20,0 100,0" label="cubic-bezier(0.2,0.8,0.2,1)" sub="board · 略缓进场" />
          <Curve d="M0,100 C25,0 50,0 100,0" label="cubic-bezier(0.25,1,0.5,1)" sub="150–250ms · hover 短反馈" />
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {[
            { t: 'fast · 140ms', d: 'hover / 点击反馈' },
            { t: 'medium · 240ms', d: '进场 / 抽屉 / 转场' },
            { t: 'studio-enter', d: 'opacity 0→1 + translateY 8→0' },
            { t: 'studio-drawer', d: 'opacity 0→1 + translateX 12→0' },
            { t: 'running-light', d: '进行中·唯一循环脉冲环 1.35s' },
            { t: 'card-hover', d: 'translateY(-2px) + 描边转强' },
          ].map((k) => (
            <div key={k.t} style={{ flex: '1 1 220px', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: k.t.includes('running') ? WARNING : INK, fontWeight: 600 }}>{k.t}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 12.5, color: MUTED, marginTop: 4 }}>{k.d}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 22, fontFamily: MONO, fontSize: 11, color: MUTED }}>只动 transform / opacity（GPU 友好）· 尊重 prefers-reduced-motion</p>
      </div>
    </PreviewFrame>
  );
}
