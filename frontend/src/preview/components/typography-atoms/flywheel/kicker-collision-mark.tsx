import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const YELLOW = '#FFD12E';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

export default function KickerCollisionMark() {
  return (
    <PreviewFrame bg={PAPER}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 28,
            color: INK,
            margin: '0 0 28px',
            letterSpacing: '-0.01em',
          }}
        >
          等宽 kicker + 撞色高亮 mark
        </h2>

        {/* kicker 行 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: INK,
              border: '2.5px solid #1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: MONO,
              fontWeight: 900,
              fontSize: 14,
              color: MINT,
              flexShrink: 0,
            }}
          >
            02
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: INK_SOFT,
            }}
          >
            THE ASSEMBLY LINE · 九阶段
          </div>
        </div>

        {/* 大标题 + mint mark */}
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 56,
            lineHeight: 1.12,
            color: INK,
            letterSpacing: '-0.02em',
            marginBottom: 30,
          }}
        >
          一根{' '}
          <span style={{ background: MINT, color: PAPER, padding: '0 0.18em' }}>数据脊梁</span>
          ，串起九个 skill
        </div>

        {/* 小标题 + yellow mark */}
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 24,
            lineHeight: 1.4,
            color: INK,
          }}
        >
          每一阶段，都明确{' '}
          <span style={{ background: YELLOW, color: INK, padding: '0 0.18em' }}>产出什么文件</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
