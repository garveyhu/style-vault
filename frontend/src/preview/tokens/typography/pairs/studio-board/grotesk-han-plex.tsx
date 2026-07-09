import { PreviewFrame } from '../../../../_layout';

const SAND = '#f0eeea';
const SURFACE = '#fffdfa';
const INK = '#2a2620';
const MUTED = '#8f8676';
const MUTED_STRONG = '#4a4438';
const WARNING = '#c8891f';
const BORDER = 'rgba(42,38,32,0.11)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const COND = "'IBM Plex Sans Condensed','PingFang SC',sans-serif";
const BODY = "'PingFang SC','Space Grotesk',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

function Spec({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, padding: '18px 0' }}>
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>{tag}</div>
      {children}
    </div>
  );
}

export default function GroteskHanPlex() {
  return (
    <PreviewFrame bg={SAND}>
      <div style={{ padding: 40, fontFamily: DISPLAY, color: INK }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>Grotesk × 苹方 × Plex 字体栈</h2>
        <p style={{ margin: '6px 0 18px', fontSize: 14, color: MUTED }}>几何 grotesk 骨架 + 中文苹方正文 + mono 承重结构字</p>

        <Spec tag="display · Space Grotesk / IBM Plex Condensed · 600–700">
          <div style={{ fontFamily: DISPLAY, fontSize: 52, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>Space Grotesk</div>
          <div style={{ fontFamily: COND, fontSize: 30, fontWeight: 600, marginTop: 8, color: MUTED_STRONG }}>IBM Plex Condensed · 密度型标题</div>
        </Spec>

        <Spec tag="body · 苹方 PingFang SC · leading 1.6">
          <div style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: MUTED_STRONG, maxWidth: 640 }}>
            耐读的中文正文，行高松弛、字距克制。母版 master.mp4 · 横屏 16:9 · 有声 + 字幕，四平台发布稿已就绪。
          </div>
        </Spec>

        <Spec tag="mono · JetBrains Mono · 结构承重字（slug / 时间戳 / 进度 / 编号）">
          <div style={{ fontFamily: MONO, fontSize: 14, color: INK, display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <span>260702-tiny-model-reasoning</span>
            <span>9 / 9</span>
            <span>74.6 MB</span>
            <span>7-07 11:54</span>
          </div>
        </Spec>

        <Spec tag="kicker · display 11 · uppercase · 0.16em tracking · 金">
          <div style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: WARNING }}>已完成 · 全矩阵同步</div>
        </Spec>

        <div style={{ marginTop: 8, display: 'inline-flex', gap: 10, alignItems: 'baseline', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '12px 18px' }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>74.6</span>
          <span style={{ fontSize: 13, color: MUTED }}>tabular-nums · 统计数字等宽对齐</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
