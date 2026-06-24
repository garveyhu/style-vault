import { PreviewFrame } from '../../../_layout';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

const INK = '#1A1A1A';
const INK_SOFT = '#6E6A62';
const PAPER = '#FFF8EC';

type CardSpec = { label: string; shadow: string; sub: string };

const CARDS: CardSpec[] = [
  { label: 'hard 6px', shadow: '6px 6px 0 #1A1A1A', sub: 'boxShadow 6px 6px 0' },
  { label: 'hard-sm 3px', shadow: '3px 3px 0 #1A1A1A', sub: 'boxShadow 3px 3px 0' },
  {
    label: 'signature mint',
    shadow: '6px 6px 0 #16C79A',
    sub: 'boxShadow 6px 6px 0 mint',
  },
];

function ShadowCard({ c }: { c: CardSpec }) {
  return (
    <div
      style={{
        width: 200,
        height: 120,
        background: PAPER,
        border: '2.5px solid #1A1A1A',
        boxShadow: c.shadow,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: 18,
          color: INK,
        }}
      >
        {c.label}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: INK_SOFT }}>
        {c.sub}
      </div>
    </div>
  );
}

export default function HardOffsetStackPreview() {
  return (
    <PreviewFrame bg="#FFF8EC">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 40,
            color: INK,
            margin: '0 0 40px',
            letterSpacing: '-0.01em',
          }}
        >
          硬位移阴影体系
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
          {CARDS.map(c => (
            <ShadowCard key={c.label} c={c} />
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: MONO,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: INK_SOFT,
          }}
        >
          硬位移 · 0 模糊 · 必配 2.5px 粗边
        </div>
      </div>
    </PreviewFrame>
  );
}
