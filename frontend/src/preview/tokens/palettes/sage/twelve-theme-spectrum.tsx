import { PreviewFrame } from '../../../_layout';

const THEMES: { name: string; tw: string; hex: string; light: string; selection: string }[] = [
  { name: 'blue', tw: 'blue', hex: '#60a5fa', light: '#93c5fd', selection: '#bfdbfe' },
  { name: 'green', tw: 'emerald', hex: '#10b981', light: '#34d399', selection: '#a7f3d0' },
  { name: 'yellow', tw: 'amber', hex: '#fbbf24', light: '#fcd34d', selection: '#fde68a' },
  { name: 'pink', tw: 'pink', hex: '#f472b6', light: '#f9a8d4', selection: '#fbcfe8' },
  { name: 'orange', tw: 'orange', hex: '#fb923c', light: '#fdba74', selection: '#fed7aa' },
  { name: 'gray', tw: 'slate', hex: '#64748b', light: '#94a3b8', selection: '#e2e8f0' },
  { name: 'purple', tw: 'violet', hex: '#a78bfa', light: '#c4b5fd', selection: '#ddd6fe' },
  { name: 'red', tw: 'red', hex: '#f87171', light: '#fca5a5', selection: '#fecaca' },
  { name: 'indigo', tw: 'indigo', hex: '#818cf8', light: '#a5b4fc', selection: '#c7d2fe' },
  { name: 'teal', tw: 'teal', hex: '#2dd4bf', light: '#5eead4', selection: '#99f6e4' },
  { name: 'cyan', tw: 'cyan', hex: '#22d3ee', light: '#67e8f9', selection: '#a5f3fc' },
  { name: 'rose', tw: 'rose', hex: '#fb7185', light: '#fda4af', selection: '#fecdd3' },
];

export default function TwelveThemeSpectrum() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 980, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          TOKEN · PALETTE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', margin: '8px 0 4px' }}>
          Sage Twelve-Theme Spectrum
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
          12 个用户可切换主题色 × 3 档明度 — 驱动整站 119 处{' '}
          <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
            ${'{themeClasses.bg}'}
          </code>{' '}
          动态着色
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {THEMES.map(t => (
            <div
              key={t.name}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.hex }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t.name}</span>
                <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>tw: {t.tw}</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Swatch label="hex" value={t.hex} />
                <Swatch label="light" value={t.light} />
                <Swatch label="selection" value={t.selection} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#64748b', marginBottom: 12 }}>
            usage axes (THEME_CLASSES[color])
          </div>
          <pre style={{ margin: 0, fontSize: 11, color: '#475569', fontFamily: 'ui-monospace, SFMono-Regular, monospace', lineHeight: 1.7 }}>
{`text          → text-{tw}-400|500
textHover     → hover:text-{tw}-400|500
bg            → bg-{tw}-400|500
bgHover       → hover:bg-{tw}-500|600
bgLight       → bg-{tw}-50
borderFocus   → focus:border-{tw}-300
ring          → focus:ring-{tw}-300
shadow        → shadow-{tw}-100`}
          </pre>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Swatch({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ height: 36, borderRadius: 6, background: value, border: '1px solid #e2e8f0' }} />
      <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
        {label}
      </div>
      <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{value}</div>
    </div>
  );
}
