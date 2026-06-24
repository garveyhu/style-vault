import { PreviewFrame } from '../../../_layout';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

const INK = '#1A1A1A';
const INK_SOFT = '#6E6A62';

type Swatch = { name: string; hex: string; dark?: boolean };

const GROUPS: { label: string; swatches: Swatch[] }[] = [
  {
    label: 'Core',
    swatches: [
      { name: 'ink', hex: '#1A1A1A', dark: true },
      { name: 'paper', hex: '#FFF8EC' },
      { name: 'paper-2', hex: '#F3EAD8' },
    ],
  },
  {
    label: 'Collision',
    swatches: [
      { name: 'yellow', hex: '#FFD12E' },
      { name: 'blue', hex: '#2B5BE8', dark: true },
      { name: 'red', hex: '#FF4D4D', dark: true },
    ],
  },
  {
    label: 'Signature',
    swatches: [{ name: 'mint', hex: '#16C79A', dark: true }],
  },
  {
    label: 'IP / 中性',
    swatches: [
      { name: 'ip-ear', hex: '#FF8FA3' },
      { name: 'ink-soft', hex: '#6E6A62', dark: true },
    ],
  },
];

function GroupLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: INK_SOFT,
        marginBottom: 14,
      }}
    >
      {text}
    </div>
  );
}

function SwatchCard({ s }: { s: Swatch }) {
  return (
    <div style={{ width: 150 }}>
      <div
        style={{
          height: 80,
          background: s.hex,
          border: '1px solid rgba(0,0,0,.1)',
          marginBottom: 8,
        }}
      />
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 13,
          fontWeight: 700,
          color: INK,
          lineHeight: 1.2,
        }}
      >
        {s.name}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: INK_SOFT }}>
        {s.hex}
      </div>
    </div>
  );
}

export default function MemphisCollisionPreview() {
  return (
    <PreviewFrame bg="#FFF8EC">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 40,
            color: INK,
            margin: '0 0 36px',
            letterSpacing: '-0.01em',
          }}
        >
          孟菲斯撞色板
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {GROUPS.map(g => (
            <div key={g.label}>
              <GroupLabel text={g.label} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {g.swatches.map(s => (
                  <SwatchCard key={s.name} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
