import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const YELLOW = '#FFD12E';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';

export default function HardShadowCard() {
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
          硬阴影卡
        </h2>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* A 大号 */}
          <div
            style={{
              flex: '1 1 280px',
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '6px 6px 0 #1A1A1A',
              borderRadius: 0,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: 22,
                color: INK,
                marginBottom: 14,
              }}
            >
              大号卡 · 6px
            </div>
            <div style={{ height: 11, width: '100%', background: '#F3EAD8', marginBottom: 9 }} />
            <div style={{ height: 11, width: '88%', background: '#F3EAD8', marginBottom: 9 }} />
            <div style={{ height: 11, width: '72%', background: '#F3EAD8' }} />
          </div>

          {/* B 小号 */}
          <div
            style={{
              flex: '1 1 200px',
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: 0,
              padding: 22,
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: 18,
                color: INK,
                marginBottom: 12,
              }}
            >
              小号卡 · 3px
            </div>
            <div style={{ height: 9, width: '100%', background: '#F3EAD8', marginBottom: 8 }} />
            <div style={{ height: 9, width: '70%', background: '#F3EAD8' }} />
          </div>

          {/* C signature */}
          <div
            style={{
              flex: '1 1 240px',
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '6px 6px 0 #16C79A',
              borderRadius: 0,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: 20,
                color: INK,
                marginBottom: 14,
              }}
            >
              signature · mint
            </div>
            <div style={{ height: 11, width: '100%', background: '#F3EAD8', marginBottom: 9 }} />
            <div style={{ height: 11, width: '82%', background: '#F3EAD8' }} />
          </div>
        </div>

        {/* 撞色头卡 */}
        <div
          style={{
            marginTop: 28,
            maxWidth: 480,
            background: PAPER,
            border: '2.5px solid #1A1A1A',
            boxShadow: '6px 6px 0 #1A1A1A',
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: YELLOW,
              borderBottom: '2.5px solid #1A1A1A',
              padding: '12px 20px',
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: 20,
              color: INK,
            }}
          >
            撞色头
          </div>
          <div style={{ padding: 22 }}>
            <div style={{ height: 11, width: '100%', background: '#F3EAD8', marginBottom: 9 }} />
            <div style={{ height: 11, width: '90%', background: '#F3EAD8', marginBottom: 9 }} />
            <div style={{ height: 11, width: '64%', background: '#F3EAD8' }} />
            <div
              style={{
                marginTop: 14,
                fontFamily: '"JetBrains Mono",ui-monospace,monospace',
                fontSize: 12,
                color: INK_SOFT,
              }}
            >
              header band + paper body
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
