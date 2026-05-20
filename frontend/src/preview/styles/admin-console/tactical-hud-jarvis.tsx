import { useEffect } from 'react';
import { PreviewFrame } from '../../_layout';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&family=Rajdhani:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

const ORBI = "'Orbitron', 'Rajdhani', sans-serif";
const SANS = "'Rajdhani', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";

const BG_DEEP = 'radial-gradient(ellipse at center, #0a1228 0%, #040816 100%)';
const HUD = '#38bdf8';
const HUD_2 = '#22d3ee';
const OK = '#4ade80';
const WARN = '#fbbf24';
const BAD = '#f43f5e';
const INFO = '#c084fc';
const T1 = 'rgba(220,240,255,0.95)';
const T2 = 'rgba(190,215,240,0.62)';
const T3 = 'rgba(160,195,225,0.40)';
const GLASS = 'rgba(56,189,248,0.05)';
const LINE = 'rgba(56,189,248,0.25)';
const LINE_SOFT = 'rgba(56,189,248,0.10)';

const KEYFRAMES = `
@keyframes hud-jarvis-sweep { to { transform: rotate(360deg); } }
@keyframes hud-jarvis-ping {
  0%   { box-shadow: 0 0 0 0   rgba(74,222,128,0.55); }
  70%  { box-shadow: 0 0 0 12px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
`;

function HUDCorners() {
  const arm = 12;
  const off = 6;
  const c = { position: 'absolute' as const, width: arm, height: arm, borderColor: 'rgba(56,189,248,0.7)', borderStyle: 'solid' as const, borderWidth: 0, pointerEvents: 'none' as const };
  return (
    <>
      <span style={{ ...c, top: off, left: off, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, top: off, right: off, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...c, bottom: off, left: off, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, bottom: off, right: off, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>
  );
}

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: 20,
        boxShadow: `inset 0 0 24px ${LINE_SOFT}`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <HUDCorners />
      {children}
    </div>
  );
}

function Crosshair() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, borderLeft: `1px dashed ${LINE_SOFT}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, borderTop: `1px dashed ${LINE_SOFT}` }} />
    </div>
  );
}

function MiniRing({ value, label, tone }: { value: string; label: string; tone: string }) {
  const r = 26;
  const cx = 32;
  const cy = 32;
  const startRad = ((135 - 90) * Math.PI) / 180;
  const endRad = ((45 - 90) * Math.PI) / 180;
  const sx = cx + r * Math.cos(startRad);
  const sy = cy + r * Math.sin(startRad);
  const ex = cx + r * Math.cos(endRad);
  const ey = cy + r * Math.sin(endRad);
  const c = tone === 'ok' ? OK : tone === 'warn' ? WARN : tone === 'bad' ? BAD : HUD;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <svg viewBox="0 0 64 64" width={64} height={64} style={{ filter: `drop-shadow(0 0 4px ${c}aa)` }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(56,189,248,0.10)" strokeWidth={1} />
          <path
            d={`M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
            fill="none"
            stroke={c}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ORBI, fontSize: 14, fontWeight: 600, color: T1 }}>
          {value}
        </div>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 9, color: T3, letterSpacing: 0.5 }}>{label}</span>
    </div>
  );
}

const PRINCIPLES = [
  { eyebrow: 'INSTRUMENT > PLAIN', text: '所有 KPI 都是仪表（270° 圆环 + cardinal ticks），不是纯文字数据' },
  { eyebrow: 'HOLO > SOLID', text: 'backdrop-blur + 半透明玻璃 + 1px HUD 蓝边，模拟浮在空中的数据层' },
  { eyebrow: 'CONTINUOUS WATCH', text: '雷达 sweep + PING 脉冲 + 十字光标，让画面永远在动' },
  { eyebrow: 'HUD CYAN SOUL', text: '所有 accent 都走 #38bdf8 / #22d3ee，状态色仅 4 种' },
];

const TOKEN_SWATCHES = [
  { name: 'hud', hex: HUD },
  { name: 'hud-2', hex: HUD_2 },
  { name: 'ok', hex: OK },
  { name: 'warn', hex: WARN },
  { name: 'bad', hex: BAD },
  { name: 'info', hex: INFO },
];

const ASSETS = [
  {
    cat: 'TOKENS',
    items: [
      { id: 'palettes/hud-cyan-glass', name: 'HUD 青光玻璃', sub: '径向深空蓝 · 双蓝 · 4 状态' },
      { id: 'typography/orbitron-rajdhani-trio', name: 'Orbitron · Rajdhani · Mono', sub: '三层字体协奏' },
    ],
  },
  {
    cat: 'COMPONENTS',
    items: [
      { id: 'indicators/arc-ring-kpi', name: '270° 圆环 KPI', sub: '8 ticks · 渐变描边 · 霓虹光晕' },
    ],
  },
  {
    cat: 'BLOCKS',
    items: [
      { id: 'display/radar-sweep-panel', name: '雷达扫描全息面板', sub: '玻璃 + 4 角 + sweep + PING' },
    ],
  },
  {
    cat: 'PAGES',
    items: [
      { id: 'dashboard/realtime-deck', name: '战术实时大屏', sub: '左 nav + 4 KPI + 矩阵 + 流 + mini-map' },
    ],
  },
];

const APPLIED_TO = ['运维 / 监控控制台', '实时观测系统', '战术展示 / 军工 / 航海', '"震撼领导"对外宣传项目'];
const NOT_FOR = ['内容站 / 文档站', '克制美学 / 性冷淡产品', '移动端 / 小屏', '高 a11y 合规项目'];

export default function TacticalHudJarvisStylePreview() {
  useEffect(() => {
    const id = 'hud-jarvis-style-font';
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
      <style>{KEYFRAMES}</style>
      <div style={{ position: 'relative', minHeight: '100vh', padding: 36, color: T1 }}>
        <Crosshair />

        {/* hero */}
        <GlassCard style={{ marginBottom: 22, padding: '32px 28px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.10) 60deg, transparent 90deg)',
              WebkitMaskImage: 'radial-gradient(circle at center, transparent 35%, black 100%)',
              maskImage: 'radial-gradient(circle at center, transparent 35%, black 100%)',
              animation: 'hud-jarvis-sweep 8s linear infinite',
              opacity: 0.55,
            }}
          />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 28 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: OK, animation: 'hud-jarvis-ping 1.5s ease-out infinite' }} />
                <span style={{ fontFamily: ORBI, fontSize: 10, letterSpacing: 2, color: OK, fontWeight: 600 }}>LIVE STYLE / v0.5</span>
                <span style={{ width: 1, height: 10, background: LINE_SOFT }} />
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: T3 }}>styles/admin-console</span>
              </div>
              <h1 style={{ fontFamily: ORBI, fontSize: 52, fontWeight: 700, letterSpacing: 2.5, color: T1, lineHeight: 1, margin: 0 }}>
                TACTICAL HUD JARVIS
              </h1>
              <div style={{ fontFamily: SANS, fontSize: 17, color: T2, marginTop: 14, maxWidth: 640 }}>
                钢铁侠贾维斯 / 银翼杀手 2049 / Halo 战术屏风。把全息投影台的视觉语言抽象成一套设计系统——给现代实时控制台一种"科幻仪表"的强力调子。
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <span style={{ padding: '4px 12px', border: `1px solid ${HUD}`, color: HUD, fontFamily: ORBI, fontSize: 11, letterSpacing: 1.5, fontWeight: 600, borderRadius: 2 }}>
                  DARK ONLY
                </span>
                <span style={{ padding: '4px 12px', border: `1px solid ${LINE}`, color: T2, fontFamily: ORBI, fontSize: 11, letterSpacing: 1.5, fontWeight: 500, borderRadius: 2 }}>
                  WEB
                </span>
                <span style={{ padding: '4px 12px', border: `1px solid ${LINE}`, color: T2, fontFamily: ORBI, fontSize: 11, letterSpacing: 1.5, fontWeight: 500, borderRadius: 2 }}>
                  INDUSTRIAL · GLASS
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <MiniRing value="98" label="HUD" tone="ok" />
              <MiniRing value="11" label="NODES" tone="ok" />
              <MiniRing value="4" label="STATE" tone="warn" />
            </div>
          </div>
        </GlassCard>

        {/* design principles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 22 }}>
          {PRINCIPLES.map((p) => (
            <GlassCard key={p.eyebrow}>
              <div style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD, marginBottom: 8 }}>▾ {p.eyebrow}</div>
              <div style={{ fontFamily: SANS, fontSize: 14, color: T1, lineHeight: 1.55 }}>{p.text}</div>
            </GlassCard>
          ))}
        </div>

        {/* tokens overview */}
        <GlassCard style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ CORE TOKENS</span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE} 0%, transparent 100%)` }} />
            <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>6 ACCENT</span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {TOKEN_SWATCHES.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: `1px solid ${LINE_SOFT}`, borderRadius: 2 }}>
                <span style={{ width: 14, height: 14, background: s.hex, borderRadius: 2, boxShadow: `0 0 6px ${s.hex}` }} />
                <span style={{ fontFamily: ORBI, fontSize: 11, color: T1, letterSpacing: 1, fontWeight: 500 }}>{s.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>{s.hex}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* asset list */}
        <GlassCard style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ ASSETS</span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE} 0%, transparent 100%)` }} />
            <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>4 TIERS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {ASSETS.map((cat) => (
              <div key={cat.cat} style={{ borderLeft: `2px solid ${HUD}`, paddingLeft: 12 }}>
                <div style={{ fontFamily: ORBI, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: HUD_2, marginBottom: 8 }}>
                  {cat.cat}
                </div>
                {cat.items.map((it) => (
                  <div key={it.id} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontFamily: SANS, fontSize: 13, color: T1, fontWeight: 500 }}>{it.name}</span>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>· {it.id}</span>
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 10.5, color: T2, marginTop: 2 }}>{it.sub}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* good-fit / not-for */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
          <GlassCard>
            <div style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: OK, marginBottom: 12 }}>▾ APPLIED TO</div>
            {APPLIED_TO.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: `1px dashed ${LINE_SOFT}` }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: OK, boxShadow: `0 0 4px ${OK}` }} />
                <span style={{ fontFamily: SANS, fontSize: 13, color: T1 }}>{a}</span>
              </div>
            ))}
          </GlassCard>
          <GlassCard style={{ borderColor: 'rgba(244,63,94,0.3)' }}>
            <div style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: BAD, marginBottom: 12 }}>▾ NOT FOR</div>
            {NOT_FOR.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: '1px dashed rgba(244,63,94,0.18)' }}>
                <span style={{ width: 8, height: 1, background: BAD }} />
                <span style={{ fontFamily: SANS, fontSize: 13, color: T2 }}>{a}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        <footer style={{ display: 'flex', gap: 14, fontFamily: MONO, fontSize: 10.5, color: T3, justifyContent: 'center' }}>
          <span>HUD BLUE = SOUL</span>
          <span>·</span>
          <span>270° NEVER CLOSED</span>
          <span>·</span>
          <span>ORBITRON ≤ 10%</span>
          <span>·</span>
          <span>4 STATE COLORS LOCKED</span>
        </footer>
      </div>
    </PreviewFrame>
  );
}
