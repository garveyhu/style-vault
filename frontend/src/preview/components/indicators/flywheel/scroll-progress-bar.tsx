import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

export default function ScrollProgressBar() {
  return (
    <PreviewFrame bg={PAPER}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 28,
            color: INK,
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
          }}
        >
          顶部滚动进度条
        </h2>

        {/* 模拟页面 */}
        <div
          style={{
            background: PAPER,
            border: '2.5px solid #1A1A1A',
            boxShadow: '6px 6px 0 #1A1A1A',
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          {/* 顶部进度条 */}
          <div
            style={{
              position: 'relative',
              height: 6,
              width: '100%',
              background: 'rgba(26,26,26,.1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '62%',
                background: MINT,
                borderRadius: 3,
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* 页面内容占位 */}
          <div style={{ padding: '28px 26px 30px' }}>
            <div style={{ height: 18, width: '52%', background: '#F3EAD8', marginBottom: 20 }} />
            <div style={{ height: 11, width: '100%', background: 'rgba(26,26,26,.08)', marginBottom: 11 }} />
            <div style={{ height: 11, width: '94%', background: 'rgba(26,26,26,.08)', marginBottom: 11 }} />
            <div style={{ height: 11, width: '97%', background: 'rgba(26,26,26,.08)', marginBottom: 11 }} />
            <div style={{ height: 11, width: '70%', background: 'rgba(26,26,26,.08)', marginBottom: 24 }} />
            <div style={{ height: 11, width: '100%', background: 'rgba(26,26,26,.08)', marginBottom: 11 }} />
            <div style={{ height: 11, width: '88%', background: 'rgba(26,26,26,.08)', marginBottom: 11 }} />
            <div style={{ height: 11, width: '60%', background: 'rgba(26,26,26,.08)' }} />
          </div>
        </div>

        {/* 标注 */}
        <div
          style={{
            marginTop: 16,
            textAlign: 'right',
            fontFamily: MONO,
            fontSize: 12,
            color: INK_SOFT,
            letterSpacing: '0.02em',
          }}
        >
          scrollYProgress · useSpring · scaleX origin-left
        </div>
      </div>
    </PreviewFrame>
  );
}
