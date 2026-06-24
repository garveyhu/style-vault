import { PreviewFrame } from '../../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const YELLOW = '#FFD12E';
const BLUE = '#2B5BE8';
const RED = '#FF4D4D';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

interface Item {
  name: string;
  desc: string;
  solid: boolean;
}

interface CardData {
  band: string;
  bandBg: string;
  bandColor: string;
  items: Item[];
}

const CARDS: CardData[] = [
  {
    band: '内容创作',
    bandBg: BLUE,
    bandColor: PAPER,
    items: [
      { name: 'topic-craft', desc: '一句话长出选题', solid: true },
      { name: 'script-craft', desc: '深度母版成稿', solid: true },
      { name: 'topic-radar', desc: '前沿雷达采集', solid: false },
    ],
  },
  {
    band: '分镜编排',
    bandBg: MINT,
    bandColor: PAPER,
    items: [
      { name: 'narrative-rhythm', desc: '专属图解分镜', solid: true },
      { name: 'asset-bridge', desc: '素材桥接调度', solid: false },
      { name: 'media-gen', desc: '统一生图路由', solid: false },
    ],
  },
  {
    band: '剪辑细节',
    bandBg: RED,
    bandColor: PAPER,
    items: [
      { name: 'video-master', desc: '主渲染成片', solid: true },
      { name: 'voice-sync', desc: '固定音色配音', solid: true },
      { name: 'video-polish', desc: '去 PPT 感精修', solid: true },
      { name: 'caption-track', desc: '字幕轨对齐', solid: false },
    ],
  },
  {
    band: '封面·发布·复盘',
    bandBg: YELLOW,
    bandColor: INK,
    items: [
      { name: 'video-qc', desc: '成片质检闸', solid: true },
      { name: 'publish-matrix', desc: '四平台同步', solid: false },
      { name: 'topic-library', desc: '数据复盘反哺', solid: false },
    ],
  },
];

function Dot({ solid }: { solid: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: solid ? MINT : 'transparent',
        border: solid ? `2px solid ${MINT}` : `2px solid ${BLUE}`,
        flexShrink: 0,
      }}
    />
  );
}

export default function LayeredAtlasGrid() {
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
          分层硬卡网格
        </h2>

        {/* 统计条 */}
        <div style={{ display: 'flex', gap: 28, marginBottom: 28, flexWrap: 'wrap' }}>
          <div
            style={{
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: 0,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
            }}
          >
            <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 36, color: INK, lineHeight: 1 }}>
              28
            </span>
            <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 15, color: INK_SOFT }}>
              个 skill
            </span>
          </div>

          <div
            style={{
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: 0,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Dot solid />
            <span style={{ fontFamily: MONO, fontSize: 13, color: INK }}>频道专属</span>
          </div>

          <div
            style={{
              background: PAPER,
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: 0,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Dot solid={false} />
            <span style={{ fontFamily: MONO, fontSize: 13, color: INK }}>共享</span>
          </div>
        </div>

        {/* 2×2 网格 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
          }}
        >
          {CARDS.map(card => (
            <div
              key={card.band}
              style={{
                background: PAPER,
                border: '2.5px solid #1A1A1A',
                boxShadow: '6px 6px 0 #1A1A1A',
                borderRadius: 0,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: card.bandBg,
                  borderBottom: '2.5px solid #1A1A1A',
                  padding: '11px 18px',
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: 18,
                  color: card.bandColor,
                }}
              >
                {card.band}
              </div>
              <div style={{ padding: '16px 18px' }}>
                {card.items.map(item => (
                  <div
                    key={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 11,
                    }}
                  >
                    <Dot solid={item.solid} />
                    <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: INK }}>
                      {item.name}
                    </span>
                    <span style={{ fontFamily: DISPLAY, fontSize: 12, color: INK_SOFT }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
