import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const PAPER2 = '#F3EAD8';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

interface TocRow {
  no: string;
  label: string;
}

const ROWS: TocRow[] = [
  { no: '00', label: '首页' },
  { no: '01', label: '五区' },
  { no: '02', label: '流水线' },
  { no: '03', label: 'skill 地图' },
  { no: '04', label: '创意·机械' },
  { no: '05', label: '写文字' },
  { no: '06', label: '工件链' },
  { no: '07', label: '真片' },
];

const ACTIVE = 2;

function ContentCard({ titleW, lines }: { titleW: number; lines: number }) {
  return (
    <div
      style={{
        background: PAPER,
        border: '2px solid rgba(26,26,26,0.18)',
        borderRadius: 0,
        padding: 18,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          height: 14,
          background: 'rgba(26,26,26,0.14)',
          width: `${titleW}%`,
          marginBottom: 16,
        }}
      />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 8,
            background: 'rgba(26,26,26,0.08)',
            width: `${96 - i * 9}%`,
            marginBottom: 10,
          }}
        />
      ))}
    </div>
  );
}

export default function TocScrollRail() {
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
          右侧悬浮 TOC 导航
        </h2>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* 左侧内容占位 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <ContentCard titleW={62} lines={4} />
            <ContentCard titleW={48} lines={3} />
            <ContentCard titleW={70} lines={5} />
          </div>

          {/* 右侧悬浮 TOC */}
          <div
            style={{
              width: 220,
              flexShrink: 0,
              borderRadius: 16,
              border: `2.5px solid ${INK}`,
              background: 'rgba(255,248,236,0.92)',
              boxShadow: `4px 4px 0 ${INK}`,
              padding: 10,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: INK_SOFT,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                padding: '4px 8px 10px',
              }}
            >
              ON THIS PAGE
            </div>
            {ROWS.map((row, i) => {
              const isActive = i === ACTIVE;
              return (
                <div
                  key={row.no}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '7px 8px',
                    borderRadius: 8,
                    background: isActive ? PAPER2 : 'transparent',
                  }}
                >
                  <span
                    style={{
                      width: 3,
                      height: 16,
                      flexShrink: 0,
                      background: isActive ? MINT : 'rgba(26,26,26,0.15)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      color: isActive ? MINT : INK_SOFT,
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {row.no}
                  </span>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 12,
                      color: isActive ? INK : INK_SOFT,
                      fontWeight: isActive ? 900 : 400,
                    }}
                  >
                    {row.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
