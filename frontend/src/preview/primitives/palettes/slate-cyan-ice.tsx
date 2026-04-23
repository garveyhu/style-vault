import { PreviewFrame } from '../../_layout';

type Swatch = { name: string; hex: string };
type Group = { group: string; items: Swatch[] };

const DARK_GROUPS: Group[] = [
  {
    group: 'bg',
    items: [
      { name: 'base', hex: '#0f172a' },
      { name: 'subtle', hex: '#1e293b' },
      { name: 'panel', hex: '#0b1220' },
    ],
  },
  {
    group: 'fg',
    items: [
      { name: 'base', hex: '#e2e8f0' },
      { name: 'muted', hex: '#94a3b8' },
      { name: 'subtle', hex: '#64748b' },
    ],
  },
  {
    group: 'accent',
    items: [
      { name: 'base', hex: '#22d3ee' },
      { name: 'hover', hex: '#06b6d4' },
      { name: 'active', hex: '#0891b2' },
    ],
  },
  {
    group: 'border',
    items: [
      { name: 'base', hex: '#1e293b' },
      { name: 'strong', hex: '#334155' },
    ],
  },
  {
    group: 'status',
    items: [
      { name: 'success', hex: '#10b981' },
      { name: 'warning', hex: '#f59e0b' },
      { name: 'danger', hex: '#ef4444' },
    ],
  },
];

const LIGHT_GROUPS: Group[] = [
  {
    group: 'bg',
    items: [
      { name: 'base', hex: '#ffffff' },
      { name: 'subtle', hex: '#f8fafc' },
      { name: 'panel', hex: '#f1f5f9' },
    ],
  },
  {
    group: 'fg',
    items: [
      { name: 'base', hex: '#0f172a' },
      { name: 'muted', hex: '#475569' },
      { name: 'subtle', hex: '#94a3b8' },
    ],
  },
  {
    group: 'accent',
    items: [
      { name: 'base', hex: '#22d3ee' },
      { name: 'hover', hex: '#06b6d4' },
      { name: 'active', hex: '#0891b2' },
    ],
  },
  {
    group: 'border',
    items: [
      { name: 'base', hex: '#e2e8f0' },
      { name: 'strong', hex: '#cbd5e1' },
    ],
  },
  {
    group: 'status',
    items: [
      { name: 'success', hex: '#10b981' },
      { name: 'warning', hex: '#f59e0b' },
      { name: 'danger', hex: '#ef4444' },
    ],
  },
];

function PaletteBlock({
  title,
  groups,
  bg,
  fg,
  swatchBorder,
}: {
  title: string;
  groups: Group[];
  bg: string;
  fg: string;
  swatchBorder: string;
}) {
  return (
    <PreviewFrame bg={bg}>
      <div style={{ maxWidth: 1000, margin: '0 auto', color: fg, fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: '8px 0 24px', letterSpacing: 1 }}>{title}</h2>
        {groups.map((g) => (
          <section key={g.group} style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 2,
                opacity: 0.6,
                marginBottom: 12,
              }}
            >
              {g.group}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {g.items.map((c) => (
                <div key={c.name} style={{ width: 160 }}>
                  <div
                    style={{
                      height: 80,
                      background: c.hex,
                      borderRadius: 4,
                      border: `1px solid ${swatchBorder}`,
                    }}
                  />
                  <div style={{ fontSize: 12, marginTop: 6 }}>{c.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.7, fontFamily: 'monospace' }}>{c.hex}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PreviewFrame>
  );
}

export default function SlateCyanIcePreview() {
  return (
    <div>
      <PaletteBlock
        title="DARK MODE"
        groups={DARK_GROUPS}
        bg="#0f172a"
        fg="#e2e8f0"
        swatchBorder="#1e293b"
      />
      <PaletteBlock
        title="LIGHT MODE"
        groups={LIGHT_GROUPS}
        bg="#ffffff"
        fg="#0f172a"
        swatchBorder="#e2e8f0"
      />
    </div>
  );
}
