import { PreviewFrame } from '../../../_layout';

const WARMS = [
  { name: 'warm', hex: '#fafaf7', use: '页面底' },
  { name: 'warm-2', hex: '#f4f3ee', use: '侧栏 / 表头' },
  { name: 'paper', hex: '#fffefb', use: '卡片 / dialog' },
];

const STONES = [
  { name: 'stone-900', hex: '#1c1917' },
  { name: 'stone-700', hex: '#44403c' },
  { name: 'stone-500', hex: '#78716c' },
  { name: 'stone-400', hex: '#a8a29e' },
  { name: 'stone-300', hex: '#d6d3d1' },
  { name: 'stone-200', hex: '#e7e5e0' },
  { name: 'stone-100', hex: '#f5f4ee' },
];

const PRIMARY = [
  { name: 'blue-700', hex: '#1d4ed8' },
  { name: 'blue-600', hex: '#2563eb' },
  { name: 'blue-500', hex: '#3b82f6' },
  { name: 'blue-100', hex: '#dbeafe' },
  { name: 'blue-50', hex: '#eff6ff' },
];

const SEMANTIC = [
  { name: 'emerald-500', hex: '#10b981', use: 'running' },
  { name: 'red-500', hex: '#ef4444', use: 'error' },
  { name: 'red-600', hex: '#dc2626', use: 'danger CTA' },
  { name: 'amber-500', hex: '#f59e0b', use: 'warning' },
  { name: 'violet-500', hex: '#8b5cf6' },
  { name: 'pink-500', hex: '#ec4899' },
  { name: 'cyan-500', hex: '#06b6d4' },
  { name: 'indigo-500', hex: '#6366f1' },
];

export default function WarmPaperInkBlue() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          TOKEN · PALETTE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Waveflow Warm Paper Ink Blue
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          暖白基底 + 墨黑 ink + blue-600 主色 + stone 中性色温
        </p>

        <Section title="三档暖白底色">
          {WARMS.map(c => (
            <div key={c.name} style={{
              background: c.hex, border: '1px solid #e7e5e0', borderRadius: 12, padding: 16, flex: 1,
              boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)'
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: '#78716c' }}>{c.hex}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1917', marginTop: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: '#78716c', marginTop: 2 }}>{c.use}</div>
            </div>
          ))}
        </Section>

        <Section title="Ink / Stone 中性灰阶">
          <SwatchRow colors={STONES} />
        </Section>

        <Section title="Primary Blue">
          <SwatchRow colors={PRIMARY} />
        </Section>

        <Section title="Semantic">
          <SwatchRow colors={SEMANTIC} />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function SwatchRow({ colors }: { colors: { name: string; hex: string; use?: string }[] }) {
  return (
    <>
      {colors.map(c => (
        <div key={c.name} style={{ minWidth: 90, flex: '0 1 110px' }}>
          <div style={{ background: c.hex, height: 56, borderRadius: 8, border: '1px solid rgb(0 0 0 / 8%)' }} />
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: '#1c1917' }}>{c.name}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{c.hex}</div>
          {c.use && <div style={{ fontSize: 10, color: '#a8a29e', marginTop: 1 }}>{c.use}</div>}
        </div>
      ))}
    </>
  );
}
