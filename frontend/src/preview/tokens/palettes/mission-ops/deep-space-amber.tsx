import { PreviewFrame } from '../../../_layout';

type Swatch = { name: string; hex: string; note?: string };
type Group = { group: string; items: Swatch[] };

const GROUPS: Group[] = [
  {
    group: 'Background · 4 层递进底',
    items: [
      { name: 'page', hex: '#070a12', note: '页面最底' },
      { name: 'panel-1', hex: '#0a0e1a', note: 'panel 默认' },
      { name: 'panel-2', hex: '#0d1320', note: 'panel hover' },
      { name: 'panel-3', hex: '#121a2c', note: 'panel 高亮' },
    ],
  },
  {
    group: 'Text · 4 级中性',
    items: [
      { name: 'text-1', hex: 'rgba(255,255,255,0.96)', note: '主数字 / 标题' },
      { name: 'text-2', hex: 'rgba(255,255,255,0.62)', note: '副标题 / label' },
      { name: 'text-3', hex: 'rgba(255,255,255,0.38)', note: '单位 / 微统计' },
      { name: 'text-4', hex: 'rgba(255,255,255,0.22)', note: '禁用' },
    ],
  },
  {
    group: 'State · 6 色严格语义',
    items: [
      { name: 'ok', hex: '#34d399', note: '健康' },
      { name: 'ok2', hex: '#00ff9d', note: '极亮态' },
      { name: 'info', hex: '#22d3ee', note: '中性数据' },
      { name: 'warn', hex: '#fbbf24', note: '警告' },
      { name: 'warn2', hex: '#fb923c', note: '偏橙警告' },
      { name: 'fail', hex: '#fb7185', note: '告警' },
      { name: 'purple', hex: '#a78bfa', note: '特殊源' },
      { name: 'mute', hex: '#94a3b8', note: '离线' },
    ],
  },
  {
    group: 'Accent · 加重色 (强调态)',
    items: [
      { name: 'amber', hex: '#f59e0b', note: '告警 banner' },
      { name: 'green', hex: '#22c55e', note: '关键 KPI delta+' },
      { name: 'crit', hex: '#ef4444', note: '关键 KPI delta-' },
    ],
  },
];

const GRID_NOTES: Swatch[] = [
  { name: 'line-1', hex: 'rgba(255,255,255,0.07)', note: 'hairline 主分割' },
  { name: 'line-2', hex: 'rgba(255,255,255,0.12)', note: 'border 卡片' },
  { name: 'line-3', hex: 'rgba(255,255,255,0.22)', note: '强边框' },
  { name: 'grid-1', hex: 'rgba(120,180,255,0.04)', note: '24px 工程网格' },
  { name: 'grid-2', hex: 'rgba(120,180,255,0.075)', note: '120px 工程网格' },
];

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

export default function DeepSpaceAmberPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <div
        style={{
          fontFamily: SANS,
          color: 'rgba(255,255,255,0.96)',
          padding: 40,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            color: '#34d399',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          PALETTE · MISSION-OPS
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            margin: '0 0 10px',
            color: 'rgba(255,255,255,0.96)',
            fontFamily: MONO,
          }}
        >
          Deep Space Amber
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.62)',
            margin: '0 0 36px',
            maxWidth: 720,
            lineHeight: 1.7,
          }}
        >
          4 层深蓝黑递进 · 4 级中性文本 · 6 色严格语义状态 · 3 加重色 · 极淡工程网格——NASA MOCR / Bloomberg Terminal 工程屏标准配色
        </p>

        {GROUPS.map((g) => (
          <section key={g.group} style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                marginBottom: 14,
              }}
            >
              {g.group}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 12,
              }}
            >
              {g.items.map((c) => (
                <div
                  key={c.name}
                  style={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      height: 80,
                      background: c.hex,
                      border: '1px solid rgba(255,255,255,0.07)',
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.96)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.38)',
                      marginTop: 2,
                    }}
                  >
                    {c.hex}
                  </div>
                  {c.note && (
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.62)',
                        marginTop: 6,
                      }}
                    >
                      {c.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: 14,
            }}
          >
            Line / Grid · 极淡工程纹理
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {GRID_NOTES.map((g) => (
              <div
                key={g.name}
                style={{
                  background: '#0a0e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: 12,
                }}
              >
                <div
                  style={{
                    height: 56,
                    background: '#0d1320',
                    border: `1px solid ${g.hex}`,
                    backgroundImage:
                      g.name.startsWith('grid')
                        ? `linear-gradient(${g.hex} 1px, transparent 1px), linear-gradient(90deg, ${g.hex} 1px, transparent 1px)`
                        : undefined,
                    backgroundSize: g.name.startsWith('grid') ? '24px 24px' : undefined,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.96)',
                  }}
                >
                  {g.name}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.38)',
                    marginTop: 2,
                  }}
                >
                  {g.hex}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.62)',
                    marginTop: 6,
                  }}
                >
                  {g.note}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
