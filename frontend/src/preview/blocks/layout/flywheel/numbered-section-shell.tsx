import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const PAPER2 = '#F3EAD8';
const YELLOW = '#FFD12E';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

const GRID_PAPER = {
  backgroundImage: `linear-gradient(${PAPER2} 1px,transparent 1px),linear-gradient(90deg,${PAPER2} 1px,transparent 1px)`,
  backgroundSize: '32px 32px',
};

interface ShellCard {
  tag: string;
  tagBg: string;
  tagColor: string;
  lines: number;
}

const CARDS: ShellCard[] = [
  { tag: '0-内核', tagBg: INK, tagColor: PAPER, lines: 3 },
  { tag: '1-资产库', tagBg: YELLOW, tagColor: INK, lines: 4 },
  { tag: '2-知识库', tagBg: MINT, tagColor: PAPER, lines: 3 },
];

export default function NumberedSectionShell() {
  return (
    <PreviewFrame bg={PAPER}>
      <div style={{ ...GRID_PAPER, margin: '-24px', padding: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* 头区 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: INK,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 4,
              }}
            >
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20, color: MINT }}>01</span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: INK_SOFT,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: 14,
                }}
              >
                FIVE ZONES · 生命周期
              </div>
              <h1
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: 60,
                  lineHeight: 0.98,
                  color: INK,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                五区不是文件夹，<br />
                是内容的{' '}
                <span style={{ background: YELLOW, color: INK, padding: '0 0.12em' }}>生命周期</span>
              </h1>
            </div>
          </div>

          {/* 引言 */}
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: 18,
              lineHeight: 1.6,
              color: INK_SOFT,
              maxWidth: 560,
              margin: '0 0 36px 72px',
            }}
          >
            按内容的生命周期切区，互不重叠：长青内核 → 冻结资产 → 上游弹药 → 工作台 →
            运营闭环。改一区，对应阶段全频道生效。
          </p>

          {/* 内容区暗示卡 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {CARDS.map(card => (
              <div
                key={card.tag}
                style={{
                  background: PAPER,
                  border: `2.5px solid ${INK}`,
                  boxShadow: `6px 6px 0 ${INK}`,
                  borderRadius: 0,
                  padding: 18,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: MONO,
                    fontWeight: 900,
                    fontSize: 12,
                    background: card.tagBg,
                    color: card.tagColor,
                    padding: '3px 9px',
                    border: `2px solid ${INK}`,
                    marginBottom: 16,
                  }}
                >
                  {card.tag}
                </span>
                {Array.from({ length: card.lines }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 9,
                      borderRadius: 0,
                      background: PAPER2,
                      marginBottom: 10,
                      width: `${100 - i * 14}%`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
