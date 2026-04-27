import { PreviewFrame } from '../../../_layout';

type Swatch = { name: string; hex: string; fg?: string };
type Group = { group: string; items: Swatch[] };

const GROUPS: Group[] = [
  {
    group: 'bg',
    items: [
      { name: 'page', hex: '#fafafa', fg: '#0f172a' },
      { name: 'panel', hex: '#ffffff', fg: '#0f172a' },
      { name: 'subtle', hex: '#f8fafc', fg: '#0f172a' },
      { name: 'dark', hex: '#0f172a', fg: '#fff' },
    ],
  },
  {
    group: 'fg',
    items: [
      { name: 'heading', hex: '#0f172a', fg: '#fff' },
      { name: 'strong', hex: '#334155', fg: '#fff' },
      { name: 'body', hex: '#64748b', fg: '#fff' },
      { name: 'muted', hex: '#94a3b8', fg: '#fff' },
      { name: 'subtle', hex: '#cbd5e1', fg: '#0f172a' },
    ],
  },
  {
    group: 'border',
    items: [
      { name: 'soft', hex: '#f1f5f9', fg: '#0f172a' },
      { name: 'base', hex: '#e2e8f0', fg: '#0f172a' },
      { name: 'strong', hex: '#cbd5e1', fg: '#0f172a' },
    ],
  },
  {
    group: 'accent',
    items: [
      { name: 'blob', hex: '#cffafe', fg: '#0f172a' },
      { name: 'meta-dot', hex: '#06b6d4', fg: '#fff' },
      { name: 'italic', hex: '#67e8f9', fg: '#0f172a' },
      { name: 'deep', hex: '#0891b2', fg: '#fff' },
    ],
  },
  {
    group: 'type-dot',
    items: [
      { name: 'product', hex: '#a855f7', fg: '#fff' },
      { name: 'style', hex: '#f43f5e', fg: '#fff' },
      { name: 'page', hex: '#6366f1', fg: '#fff' },
      { name: 'block', hex: '#06b6d4', fg: '#fff' },
      { name: 'component', hex: '#10b981', fg: '#fff' },
      { name: 'token', hex: '#f59e0b', fg: '#fff' },
    ],
  },
];

export default function SlateCyanCoolPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '56px 48px',
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            color: '#94a3b8',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          tokens / palettes / style-vault
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: '#0f172a',
            marginBottom: 6,
          }}
        >
          Slate × Cyan Cool
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#64748b',
            marginBottom: 36,
            maxWidth: 560,
          }}
        >
          浅底冷感设计目录站配色 · #fafafa 页面底 + slate 文字阶 + cyan
          单点高亮
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {GROUPS.map((g) => (
            <div key={g.group}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                {g.group}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
                  gap: 10,
                }}
              >
                {g.items.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                    }}
                  >
                    <div
                      style={{
                        background: s.hex,
                        color: s.fg ?? '#0f172a',
                        height: 84,
                        padding: 10,
                        fontSize: 11,
                        fontFamily:
                          "ui-monospace, 'SF Mono', Menlo, monospace",
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}
                    >
                      {s.hex}
                    </div>
                    <div
                      style={{
                        padding: '8px 10px',
                        fontSize: 12,
                        color: '#0f172a',
                      }}
                    >
                      {s.name}
                    </div>
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
