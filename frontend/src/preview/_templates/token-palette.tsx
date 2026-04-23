import { PreviewFrame } from '../_layout';

/** 色板模板：色卡矩阵 */
const COLORS: Array<{ group: string; items: Array<{ name: string; hex: string }> }> = [
  { group: 'Base', items: [{ name: 'bg', hex: '#fff' }] },
];

export default function PalettePreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {COLORS.map((g) => (
          <section key={g.group} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.6 }}>{g.group}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {g.items.map((c) => (
                <div key={c.name} style={{ width: 160 }}>
                  <div style={{ height: 80, background: c.hex, borderRadius: 4, border: '1px solid #eee' }} />
                  <div style={{ fontSize: 12, marginTop: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#666', fontFamily: 'monospace' }}>{c.hex}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PreviewFrame>
  );
}
