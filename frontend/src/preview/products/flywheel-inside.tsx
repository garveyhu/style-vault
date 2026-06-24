import { PreviewFrame } from '../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const PAPER2 = '#F3EAD8';
const BLUE = '#2B5BE8';
const RED = '#FF4D4D';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';
const HARD = `6px 6px 0 ${INK}`;
const BORDER = `2.5px solid ${INK}`;

function BlackCat({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden>
      <path d="M26 44 L30 14 L52 36 Z" fill={INK} />
      <path d="M94 44 L90 14 L68 36 Z" fill={INK} />
      <rect x="22" y="34" width="76" height="72" rx="20" fill={INK} />
      <ellipse cx="46" cy="66" rx="8.5" ry="12" fill={MINT} />
      <ellipse cx="74" cy="66" rx="8.5" ry="12" fill={MINT} />
    </svg>
  );
}

const STATS: [string, string][] = [
  ['11', '节'],
  ['28', 'skill'],
  ['5', '区'],
  ['9', '阶段'],
  ['1', 'signature'],
  ['4', '平台'],
];

export default function FlywheelInsideProduct() {
  return (
    <PreviewFrame bg={PAPER}>
      <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: DISPLAY, color: INK, position: 'relative' }}>
        {/* corner cat */}
        <div style={{ position: 'absolute', top: -4, right: 0 }}>
          <BlackCat size={64} />
        </div>

        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: INK_SOFT,
          }}
        >
          PRODUCT
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, margin: '8px 0 6px', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          飞轮的内部
          <span style={{ color: MINT }}>.</span>
        </h1>
        <p style={{ fontSize: 16, color: INK_SOFT, margin: '0 0 16px', fontWeight: 500 }}>
          media-studio 制片流水线的可视化讲解站
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {['content', 'brutalist', 'editorial', 'playful', 'react-tailwind'].map(t => (
            <span
              key={t}
              style={{
                background: PAPER2,
                border: `2px solid ${INK}`,
                borderRadius: 999,
                padding: '4px 12px',
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {STATS.map(([n, label], i) => (
            <div
              key={label}
              style={{
                background: PAPER,
                border: BORDER,
                boxShadow: HARD,
                padding: 18,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: [BLUE, MINT, RED, INK, MINT, BLUE][i],
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: INK_SOFT,
                  marginTop: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  fontFamily: MONO,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* refs line */}
        <div
          style={{
            marginTop: 24,
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            color: INK_SOFT,
          }}
        >
          → refs.style: memphis-scrolly-doc
        </div>
      </div>
    </PreviewFrame>
  );
}
