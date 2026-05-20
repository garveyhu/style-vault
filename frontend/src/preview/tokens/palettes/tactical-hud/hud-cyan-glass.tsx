import { useEffect } from 'react';
import { PreviewFrame } from '../../../_layout';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&family=Rajdhani:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

const ORBI = "'Orbitron', 'Rajdhani', sans-serif";
const SANS = "'Rajdhani', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";

const BG_DEEP = 'radial-gradient(ellipse at center, #0a1228 0%, #040816 100%)';

const HUD = '#38bdf8';
const HUD_2 = '#22d3ee';

const T1 = 'rgba(220,240,255,0.95)';
const T2 = 'rgba(190,215,240,0.62)';
const T3 = 'rgba(160,195,225,0.40)';

const GLASS = 'rgba(56,189,248,0.05)';
const LINE = 'rgba(56,189,248,0.25)';
const LINE_SOFT = 'rgba(56,189,248,0.10)';

type Swatch = { name: string; hex: string; note?: string };
type Group = { group: string; eyebrow: string; items: Swatch[] };

const GROUPS: Group[] = [
  {
    group: 'bg',
    eyebrow: '▾ BACKGROUND',
    items: [
      { name: 'deep-outer', hex: '#040816', note: 'radial outer' },
      { name: 'deep-inner', hex: '#0a1228', note: 'radial inner' },
    ],
  },
  {
    group: 'hud',
    eyebrow: '▾ HUD ACCENT',
    items: [
      { name: 'hud', hex: '#38bdf8', note: 'primary' },
      { name: 'hud-2', hex: '#22d3ee', note: 'secondary' },
    ],
  },
  {
    group: 'state',
    eyebrow: '▾ STATE · 4',
    items: [
      { name: 'ok', hex: '#4ade80', note: 'green' },
      { name: 'warn', hex: '#fbbf24', note: 'amber' },
      { name: 'bad', hex: '#f43f5e', note: 'rose' },
      { name: 'info', hex: '#c084fc', note: 'purple' },
    ],
  },
  {
    group: 'line',
    eyebrow: '▾ LINE / GLASS',
    items: [
      { name: 'glass', hex: 'rgba(56,189,248,0.05)', note: 'panel bg' },
      { name: 'line', hex: 'rgba(56,189,248,0.25)', note: '1px border' },
      { name: 'line-soft', hex: 'rgba(56,189,248,0.10)', note: 'soft divider' },
    ],
  },
  {
    group: 'text',
    eyebrow: '▾ TEXT · 3 LEVEL',
    items: [
      { name: 't1', hex: 'rgba(220,240,255,0.95)', note: 'primary' },
      { name: 't2', hex: 'rgba(190,215,240,0.62)', note: 'secondary' },
      { name: 't3', hex: 'rgba(160,195,225,0.40)', note: 'tertiary' },
    ],
  },
];

function HUDCorners() {
  const arm = 14;
  const off = 8;
  const c = { position: 'absolute' as const, width: arm, height: arm, borderColor: 'rgba(56,189,248,0.7)', borderStyle: 'solid' as const, borderWidth: 0 };
  return (
    <>
      <span style={{ ...c, top: off, left: off, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, top: off, right: off, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...c, bottom: off, left: off, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, bottom: off, right: off, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>
  );
}

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: '20px 18px 16px',
        boxShadow: `inset 0 0 24px ${LINE_SOFT}`,
      }}
    >
      <HUDCorners />
      {children}
    </div>
  );
}

function Card({ item }: { item: Swatch }) {
  return (
    <div style={{ width: 152 }}>
      <div
        style={{
          height: 72,
          background: item.hex,
          borderRadius: 3,
          border: `1px solid ${LINE_SOFT}`,
          boxShadow: '0 0 0 1px rgba(56,189,248,0.08)',
        }}
      />
      <div style={{ fontFamily: SANS, fontSize: 12, color: T1, marginTop: 6, letterSpacing: 0.2 }}>{item.name}</div>
      <div style={{ fontFamily: MONO, fontSize: 10.5, color: T3, marginTop: 2, letterSpacing: 0.3 }}>{item.hex}</div>
      {item.note && (
        <div style={{ fontFamily: MONO, fontSize: 10, color: T2, marginTop: 1 }}>{item.note}</div>
      )}
    </div>
  );
}

export default function HudCyanGlassPalettePreview() {
  useEffect(() => {
    const id = 'hud-trio-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <PreviewFrame bg={BG_DEEP} padded={false}>
      <div style={{ position: 'relative', minHeight: '100vh', padding: 32, color: T1 }}>
        <header style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 26, position: 'relative' }}>
          <span style={{ fontFamily: ORBI, fontSize: 18, fontWeight: 700, letterSpacing: 1.5, color: HUD }}>
            HUD CYAN GLASS
          </span>
          <span style={{ width: 1, height: 12, background: LINE }} />
          <span style={{ fontFamily: SANS, fontSize: 13, color: T2, letterSpacing: 0.4 }}>
            径向深空蓝 · HUD 双蓝 · 玻璃透视 · 4 状态色
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, color: T3 }}>tokens/palettes/tactical-hud</span>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {GROUPS.map((g) => (
            <GlassPanel key={g.group}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 500, letterSpacing: 2, color: HUD }}>{g.eyebrow}</span>
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE} 0%, transparent 100%)` }} />
                <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>{g.items.length} TOKENS</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {g.items.map((s) => (
                  <Card key={s.name} item={s} />
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>

        <footer style={{ marginTop: 24, display: 'flex', gap: 16, fontFamily: MONO, fontSize: 10.5, color: T3 }}>
          <span>BLUR · 20px</span>
          <span>·</span>
          <span>BORDER · 1px {HUD}</span>
          <span>·</span>
          <span>GLOW · drop-shadow 0 0 12px rgba(56,189,248,.3)</span>
        </footer>
      </div>
    </PreviewFrame>
  );
}
