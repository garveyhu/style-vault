import { PreviewFrame } from '../../../../_layout';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const BODY = '"PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

const INK = '#1A1A1A';
const INK_SOFT = '#6E6A62';
const MINT = '#16C79A';
const PAPER = '#FFF8EC';

function Tag({ text }: { text: string }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10,
        color: INK_SOFT,
        width: 64,
        flexShrink: 0,
        paddingTop: 8,
      }}
    >
      {text}
    </div>
  );
}

export default function HanBlackGroteskPreview() {
  return (
    <PreviewFrame bg="#FFF8EC">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* kicker */}
        <div style={{ display: 'flex', marginBottom: 28 }}>
          <Tag text="kicker" />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: INK_SOFT,
              paddingTop: 4,
            }}
          >
            THE ASSEMBLY LINE · 九阶段
          </div>
        </div>

        {/* display */}
        <div style={{ display: 'flex', marginBottom: 40 }}>
          <Tag text="display" />
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: 64,
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            一句灵感 →{' '}
            一条
            <span
              style={{
                background: MINT,
                color: PAPER,
                padding: '0 0.18em',
              }}
            >
              成片
            </span>
          </div>
        </div>

        {/* body */}
        <div style={{ display: 'flex', marginBottom: 36 }}>
          <Tag text="body" />
          <div
            style={{
              fontFamily: BODY,
              fontSize: 16,
              lineHeight: 1.6,
              color: INK,
              maxWidth: 720,
            }}
          >
            从一条想法到四平台同步的成片，中间是一条九阶段的流水线——采集、选题、脚本、分镜、素材、渲染、配音、字幕、质检，每一步都被工具接住。
          </div>
        </div>

        {/* mono */}
        <div style={{ display: 'flex' }}>
          <Tag text="mono" />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              color: INK,
              paddingTop: 2,
            }}
          >
            durationInFrames = 秒 × fps
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
