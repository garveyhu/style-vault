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
@keyframes hud-sweep-deck { to { transform: rotate(360deg); } }
@keyframes hud-ping-deck {
  0%   { box-shadow: 0 0 0 0   rgba(74,222,128,0.6); }
  70%  { box-shadow: 0 0 0 10px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
@keyframes hud-event-deck {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes hud-region-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
`;

const NAV_GROUPS = [
  {
    eyebrow: 'OVERVIEW',
    items: [
      { name: '全域大屏', active: true },
      { name: '健康度', active: false },
    ],
  },
  {
    eyebrow: 'REGIONS',
    items: [
      { name: '杭州 · 余杭', h: 98, tone: 'ok' as const },
      { name: '杭州 · 滨江', h: 99, tone: 'ok' as const },
      { name: '杭州 · 临安', h: 97, tone: 'warn' as const },
      { name: '杭州 · 拱墅', h: 96, tone: 'warn' as const },
      { name: '宁波 · 北仑', h: 98, tone: 'ok' as const },
      { name: '宁波 · 奉化', h: 95, tone: 'bad' as const },
      { name: '宁波 · 象山', h: 97, tone: 'warn' as const },
      { name: '宁波 · 余姚', h: 99, tone: 'ok' as const },
      { name: '嘉兴 · 嘉善', h: 0, tone: 'idle' as const },
      { name: '绍兴 · 新昌', h: 0, tone: 'idle' as const },
      { name: '杭州 · syzh', h: 98, tone: 'ok' as const },
    ],
  },
  {
    eyebrow: 'DATA SOURCES',
    items: [
      { name: '前置库', active: false },
      { name: '业务库', active: false },
    ],
  },
];

function toneToColor(t: string) {
  if (t === 'ok') return OK;
  if (t === 'warn') return WARN;
  if (t === 'bad') return BAD;
  return T3;
}

function HUDCorners() {
  const arm = 10;
  const off = 5;
  const c = { position: 'absolute' as const, width: arm, height: arm, borderColor: 'rgba(56,189,248,0.65)', borderStyle: 'solid' as const, borderWidth: 0, pointerEvents: 'none' as const };
  return (
    <>
      <span style={{ ...c, top: off, left: off, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, top: off, right: off, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...c, bottom: off, left: off, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, bottom: off, right: off, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>
  );
}

function GlassPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: 16,
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
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, marginTop: -3, marginLeft: -3, borderRadius: '50%', background: HUD, opacity: 0.4 }} />
    </div>
  );
}

function ArcRingMini({ value, unit, caption, tone }: { value: string; unit: string; caption: string; tone: 'ok' | 'hud' | 'warn' | 'bad' }) {
  const r = 44;
  const cx = 56;
  const cy = 56;
  const startRad = ((135 - 90) * Math.PI) / 180;
  const endRad = ((45 - 90) * Math.PI) / 180;
  const startX = cx + r * Math.cos(startRad);
  const startY = cy + r * Math.sin(startRad);
  const endX = cx + r * Math.cos(endRad);
  const endY = cy + r * Math.sin(endRad);
  const c = tone === 'ok' ? OK : tone === 'warn' ? WARN : tone === 'bad' ? BAD : HUD;
  const gradId = `mini-${unit.replace(/[^a-z0-9]/gi, '')}`;
  const ticks = [
    [56, 4, 56, 8],
    [56, 104, 56, 108],
    [4, 56, 8, 56],
    [104, 56, 108, 56],
    [19, 19, 22, 22],
    [93, 19, 90, 22],
    [19, 93, 22, 90],
    [93, 93, 90, 90],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 112, height: 112 }}>
        <svg viewBox="0 0 112 112" width={112} height={112} style={{ filter: `drop-shadow(0 0 5px ${c}aa)` }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c} />
              <stop offset="100%" stopColor={tone === 'hud' ? HUD_2 : c} />
            </linearGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(56,189,248,0.10)" strokeWidth={1.5} />
          <path
            d={`M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${r} ${r} 0 1 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <g stroke="rgba(56,189,248,0.4)" strokeWidth={1}>
            {ticks.map((t, i) => (
              <line key={i} x1={t[0]} y1={t[1]} x2={t[2]} y2={t[3]} />
            ))}
          </g>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: ORBI, fontSize: 24, fontWeight: 600, color: tone === 'bad' ? BAD : tone === 'warn' ? WARN : T1, letterSpacing: 0.5, lineHeight: 1 }}>
            {value}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: T3, marginTop: 4, letterSpacing: 0.5 }}>{unit}</span>
        </div>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 9.5, color: T3 }}>{caption}</span>
    </div>
  );
}

const REGIONS_MATRIX = [
  { name: '余杭', h: 98, tone: 'ok', cells: [['采集', 'ok'], ['清洗', 'ok'], ['推送', 'ok'], ['校验', 'ok']] },
  { name: '滨江', h: 99, tone: 'ok', cells: [['采集', 'ok'], ['清洗', 'ok'], ['推送', 'ok']] },
  { name: '临安', h: 97, tone: 'warn', cells: [['采集', 'ok'], ['清洗', 'warn'], ['推送', 'ok'], ['校验', 'ok']] },
  { name: '拱墅', h: 96, tone: 'warn', cells: [['采集', 'warn'], ['清洗', 'ok'], ['推送', 'ok']] },
  { name: '北仑', h: 98, tone: 'ok', cells: [['采集', 'ok'], ['清洗', 'ok'], ['推送', 'ok'], ['反查', 'info']] },
  { name: '奉化', h: 95, tone: 'bad', cells: [['采集', 'bad'], ['清洗', 'idle'], ['推送', 'idle']] },
] as const;

function statusDot(t: string) {
  const c = t === 'ok' ? OK : t === 'warn' ? WARN : t === 'bad' ? BAD : t === 'info' ? INFO : T3;
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: c,
        boxShadow: `0 0 4px ${c}`,
        display: 'inline-block',
      }}
    />
  );
}

function MiniMap() {
  const POINTS = [
    { id: 'YH', x: 90, y: 80, tone: 'ok' },
    { id: 'BJ', x: 92, y: 95, tone: 'ok' },
    { id: 'LA', x: 60, y: 78, tone: 'warn' },
    { id: 'GS', x: 88, y: 70, tone: 'warn' },
    { id: 'BL', x: 140, y: 100, tone: 'ok' },
    { id: 'FH', x: 148, y: 115, tone: 'bad' },
    { id: 'XS', x: 155, y: 128, tone: 'warn' },
    { id: 'YY', x: 132, y: 92, tone: 'ok' },
    { id: 'JS', x: 78, y: 50, tone: 'idle' },
    { id: 'XC', x: 100, y: 130, tone: 'idle' },
    { id: 'HZ', x: 88, y: 85, tone: 'ok' },
  ];
  return (
    <div style={{ position: 'relative', width: 200, height: 160 }}>
      <svg viewBox="0 0 200 160" width={200} height={160}>
        <path
          d="M 30 60 L 60 40 L 100 35 L 140 50 L 170 70 L 180 110 L 150 140 L 100 150 L 60 140 L 35 110 Z"
          fill="rgba(56,189,248,0.04)"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        {POINTS.map((p) => {
          const c = p.tone === 'ok' ? OK : p.tone === 'warn' ? WARN : p.tone === 'bad' ? BAD : T3;
          return (
            <g key={p.id}>
              <circle cx={p.x} cy={p.y} r={4} fill={c} style={{ filter: `drop-shadow(0 0 4px ${c})` }} />
              <text x={p.x + 7} y={p.y + 3} fontFamily={MONO} fontSize="8" fill={T2}>
                {p.id}
              </text>
            </g>
          );
        })}
        <circle cx="100" cy="90" r="3" fill={HUD_2}>
          <animate attributeName="r" values="3;28;3" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function SidebarLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, position: 'relative' }}>
      <svg width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="11" fill="none" stroke={HUD} strokeWidth="1" />
        <circle cx="14" cy="14" r="7" fill="none" stroke={HUD_2} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="14" cy="14" r="2.5" fill={HUD} />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: ORBI, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: T1 }}>AURA</span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: T3, letterSpacing: 0.5 }}>v0.5 · TACTICAL</span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: 'rgba(10,18,40,0.55)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRight: `1px solid ${LINE_SOFT}`,
        padding: '18px 14px',
        position: 'relative',
      }}
    >
      <SidebarLogo />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 8px',
          background: LINE_SOFT,
          border: `1px solid ${LINE_SOFT}`,
          borderRadius: 2,
          fontFamily: MONO,
          fontSize: 11,
          color: T3,
          marginBottom: 18,
        }}
      >
        <span style={{ color: HUD }}>⌘K</span>
        <span>搜索区域 / 业务</span>
      </div>

      {NAV_GROUPS.map((g) => (
        <div key={g.eyebrow} style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: ORBI, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: HUD, marginBottom: 8, paddingLeft: 4 }}>
            ▾ {g.eyebrow}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {g.items.map((it: any) => {
              const isRegion = 'h' in it;
              const isActive = 'active' in it && it.active;
              return (
                <div
                  key={it.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 8px',
                    background: isActive ? 'linear-gradient(90deg, rgba(56,189,248,0.18) 0%, transparent 80%)' : 'transparent',
                    borderLeft: isActive ? `2px solid ${HUD}` : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: SANS, fontSize: 12, color: isActive ? T1 : T2, flex: 1 }}>{it.name}</span>
                  {isRegion && it.tone !== 'idle' && (
                    <>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: toneToColor(it.tone) }}>{it.h}</span>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: toneToColor(it.tone), boxShadow: `0 0 4px ${toneToColor(it.tone)}` }} />
                    </>
                  )}
                  {isRegion && it.tone === 'idle' && (
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, padding: '8px 10px', border: `1px solid ${LINE_SOFT}`, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: HUD, color: '#040816', fontFamily: ORBI, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          A
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: T1 }}>admin@aura</span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: T3 }}>tactical / read+write</span>
        </div>
      </div>
    </aside>
  );
}

function MatrixRow({ r }: { r: typeof REGIONS_MATRIX[number] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px dashed ${LINE_SOFT}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 130 }}>
        <span style={{ width: 2, height: 18, background: toneToColor(r.tone), boxShadow: `0 0 4px ${toneToColor(r.tone)}` }} />
        <span style={{ fontFamily: SANS, fontSize: 13, color: T1, fontWeight: 500 }}>{r.name}</span>
      </div>
      <span style={{ fontFamily: ORBI, fontSize: 13, color: toneToColor(r.tone), letterSpacing: 0.5, width: 36 }}>{r.h}</span>
      <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
        {r.cells.map((cell) => (
          <div
            key={cell[0]}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 8px',
              background: 'rgba(56,189,248,0.04)',
              border: `1px solid ${LINE_SOFT}`,
              borderRadius: 2,
            }}
          >
            {statusDot(cell[1])}
            <span style={{ fontFamily: SANS, fontSize: 11, color: T2 }}>{cell[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STREAM_EVENTS = [
  { ts: '14:32:08', tone: 'ok', src: 'YUHANG·01', msg: 'sync.success · 1,204 rows · 87ms' },
  { ts: '14:32:05', tone: 'ok', src: 'BINJIANG·02', msg: 'sync.success · 892 rows · 64ms' },
  { ts: '14:32:02', tone: 'warn', src: 'XIANGSHAN·03', msg: 'retry attempt 2/3 · timeout' },
  { ts: '14:31:58', tone: 'ok', src: 'LINAN·04', msg: 'sync.success · 511 rows' },
  { ts: '14:31:51', tone: 'bad', src: 'FENGHUA·05', msg: 'connection refused · :3306' },
  { ts: '14:31:45', tone: 'ok', src: 'YUYAO·06', msg: 'sync.success · 2,108 rows' },
  { ts: '14:31:42', tone: 'info', src: 'BEILUN·07', msg: 'reverse-lookup · 18 keys' },
  { ts: '14:31:38', tone: 'ok', src: 'SYZH·08', msg: 'sync.success · 1,820 rows' },
];

function ev(t: string) {
  return t === 'ok' ? OK : t === 'warn' ? WARN : t === 'info' ? INFO : BAD;
}

function ClockChip() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 12, color: T2 }}>
      <span>2026-05-20</span>
      <span style={{ color: HUD }}>14:32:08</span>
      <span style={{ color: T3, fontSize: 10 }}>UTC+8</span>
    </div>
  );
}

export default function RealtimeDeckPagePreview() {
  useEffect(() => {
    const id = 'hud-deck-font';
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
      <div style={{ display: 'flex', minHeight: '100vh', color: T1, position: 'relative' }}>
        <Crosshair />
        <Sidebar />

        <main style={{ flex: 1, padding: 20, position: 'relative', overflow: 'hidden' }}>
          {/* topbar */}
          <header
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 14px',
              background: GLASS,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${LINE}`,
              borderRadius: 4,
              marginBottom: 18,
            }}
          >
            <HUDCorners />
            <span style={{ fontFamily: ORBI, fontSize: 13, fontWeight: 600, letterSpacing: 1.5, color: HUD }}>
              TACTICAL DECK / REALTIME
            </span>
            <span style={{ width: 1, height: 12, background: LINE }} />
            <span style={{ fontFamily: SANS, fontSize: 12, color: T2 }}>全域 · 11 区 · 实时</span>
            <span style={{ flex: 1 }} />
            <ClockChip />
            <span style={{ width: 1, height: 12, background: LINE_SOFT }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: OK, animation: 'hud-ping-deck 1.5s ease-out infinite' }} />
              <span style={{ fontFamily: ORBI, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: OK }}>LIVE</span>
            </div>
            <span style={{ width: 1, height: 12, background: LINE_SOFT }} />
            <span style={{ fontFamily: MONO, fontSize: 11, color: T3 }}>refresh · 5s ▾</span>
          </header>

          {/* 4 KPI rings */}
          <GlassPanel style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ CORE KPI</span>
              <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE} 0%, transparent 100%)` }} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>24H WINDOW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: 24 }}>
              <ArcRingMini value="98.7" unit="% SUCCESS" caption="TGT 99.0" tone="ok" />
              <ArcRingMini value="12.4M" unit="EVENTS" caption="+8.2% Δ" tone="hud" />
              <ArcRingMini value="142" unit="MS P95" caption="WARN ≥ 200" tone="warn" />
              <ArcRingMini value="11/11" unit="ONLINE" caption="ALL UP" tone="ok" />
            </div>
          </GlassPanel>

          {/* matrix + live stream */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 18 }}>
            <GlassPanel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ REGION MATRIX</span>
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE} 0%, transparent 100%)` }} />
                <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>6 / 11 SHOWN</span>
              </div>
              {REGIONS_MATRIX.map((r) => (
                <MatrixRow key={r.name} r={r} />
              ))}
            </GlassPanel>

            <GlassPanel>
              {/* radar sweep overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.16) 60deg, transparent 90deg)',
                  WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
                  maskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
                  animation: 'hud-sweep-deck 5s linear infinite',
                  opacity: 0.5,
                }}
              />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ EVENT STREAM</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: OK, animation: 'hud-ping-deck 1.5s ease-out infinite' }} />
                  <span style={{ fontFamily: ORBI, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: OK }}>LIVE</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {STREAM_EVENTS.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '5px 8px',
                        borderLeft: `2px solid ${ev(e.tone)}`,
                        background: i === 0 ? 'rgba(56,189,248,0.04)' : 'transparent',
                        animation: `hud-event-deck 0.4s ${i * 0.05}s ease-out backwards`,
                      }}
                    >
                      <span style={{ fontFamily: MONO, fontSize: 10.5, color: T3, width: 56 }}>{e.ts}</span>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: ev(e.tone), boxShadow: `0 0 3px ${ev(e.tone)}` }} />
                      <span style={{ fontFamily: ORBI, fontSize: 10, color: HUD_2, letterSpacing: 1, width: 96, fontWeight: 500 }}>{e.src}</span>
                      <span style={{ fontFamily: MONO, fontSize: 11, color: T1, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {e.msg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* bottom: telemetry + mini-map */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 18 }}>
            <GlassPanel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ TELEMETRY</span>
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE_SOFT} 0%, transparent 100%)` }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
                {[
                  { k: 'SIGNAL', v: '0xA72F', sub: 'CARRIER OK' },
                  { k: 'LAT', v: '142.06ms', sub: 'P95 24H' },
                  { k: 'SEQ', v: '#048127', sub: 'TICK 5s' },
                  { k: 'SYS', v: 'NOMINAL', sub: 'CPU 38% · MEM 56%' },
                ].map((t) => (
                  <div key={t.k} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 10px', borderLeft: `2px solid ${HUD}`, background: LINE_SOFT }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T3, letterSpacing: 1 }}>{t.k}</span>
                    <span style={{ fontFamily: ORBI, fontSize: 18, fontWeight: 600, color: T1, letterSpacing: 0.5 }}>{t.v}</span>
                    <span style={{ fontFamily: MONO, fontSize: 9.5, color: T2 }}>{t.sub}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: ORBI, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: HUD }}>▾ ZHEJIANG</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: MONO, fontSize: 9, color: T3 }}>11 NODES</span>
              </div>
              <MiniMap />
            </GlassPanel>
          </div>
        </main>
      </div>
    </PreviewFrame>
  );
}
