import { PreviewFrame } from '../../_layout';

type Swatch = { name: string; hex: string; note?: string };

const PRIMARY: Swatch[] = [
  { name: 'primary-50', hex: '#f0fdfa' },
  { name: 'primary-100', hex: '#ccfbf1' },
  { name: 'primary-200', hex: '#99f6e4' },
  { name: 'primary-300', hex: '#5eead4', note: 'focus border' },
  { name: 'primary-400', hex: '#2dd4bf' },
  { name: 'primary-500', hex: '#14b8a6', note: 'brand accent' },
  { name: 'primary-600', hex: '#0d9488', note: 'hover/active' },
  { name: 'primary-700', hex: '#0f766e' },
  { name: 'primary-800', hex: '#115e59' },
  { name: 'primary-900', hex: '#134e4a' },
];

const NEUTRAL: Swatch[] = [
  { name: 'bg-page', hex: '#f5f7fa', note: 'body' },
  { name: 'bg-base', hex: '#ffffff' },
  { name: 'border-soft', hex: '#f3f4f6' },
  { name: 'border-base', hex: '#e5e7eb' },
  { name: 'fg-subtle', hex: '#9ca3af' },
  { name: 'fg-muted', hex: '#6b7280' },
  { name: 'fg-body', hex: '#374151' },
  { name: 'fg-base', hex: '#111827' },
  { name: 'fg-strong', hex: '#1a1a1a', note: 'CTA' },
];

const AVATAR = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA',
];

const RANK = ['#FF6B6B', '#F7DC6F', '#45B7D1'];

const STATUS: Swatch[] = [
  { name: 'success', hex: '#10b981', note: 'emerald' },
  { name: 'warning', hex: '#f97316', note: 'orange' },
  { name: 'danger', hex: '#f43f5e', note: 'rose' },
  { name: 'focus-ring', hex: '#ccfbf1', note: 'teal-100' },
];

function Row({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 10 }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {items.map((c) => (
          <div key={c.name} style={{ width: 148 }}>
            <div style={{ height: 56, background: c.hex, borderRadius: 8, border: '1px solid #e5e7eb' }} />
            <div style={{ fontSize: 12, marginTop: 6, fontWeight: 600, color: '#111827' }}>{c.name}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>{c.hex}</div>
            {c.note && <div style={{ fontSize: 10, color: '#14b8a6', marginTop: 2 }}>{c.note}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SkillhubTealMistPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', margin: '4px 0 24px' }}>
          SkillHub · Teal Mist
        </h2>

        <Row title="Primary · Teal" items={PRIMARY} />
        <Row title="Neutral" items={NEUTRAL} />
        <Row title="Status" items={STATUS} />

        <section style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 10 }}>
            Avatar (12 colors)
          </h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {AVATAR.map((c, i) => (
              <div key={c} style={{
                width: 48, height: 48, borderRadius: 999, background: c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 18,
              }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 10 }}>
            Rank Top3
          </h3>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {RANK.map((c, i) => (
              <div key={c} style={{ fontSize: 32, fontWeight: 900, color: c }}>{i + 1}</div>
            ))}
            <div style={{ fontSize: 32, fontWeight: 900, color: '#cbd5e1' }}>4</div>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>4+ 名用 slate-300</span>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 10 }}>
            Flow Gradient
          </h3>
          <style>{`
            @keyframes sv-flow-right { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }
          `}</style>
          <div style={{
            height: 48, borderRadius: 10,
            backgroundImage: 'linear-gradient(90deg, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6)',
            backgroundSize: '300% 100%',
            animation: 'sv-flow-right 14s linear infinite',
          }} />
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}>
            teal-500 → cyan-500 → sky-500 → rose-400 (loop)
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
