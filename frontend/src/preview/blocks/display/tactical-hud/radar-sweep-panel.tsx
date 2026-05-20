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
const BAD = '#f43f5e';
const T1 = 'rgba(220,240,255,0.95)';
const T2 = 'rgba(190,215,240,0.62)';
const T3 = 'rgba(160,195,225,0.40)';
const GLASS = 'rgba(56,189,248,0.05)';
const LINE = 'rgba(56,189,248,0.25)';
const LINE_SOFT = 'rgba(56,189,248,0.10)';

const KEYFRAMES = `
@keyframes hud-sweep { to { transform: rotate(360deg); } }
@keyframes hud-ping-ok {
  0%   { box-shadow: 0 0 0 0   rgba(74,222,128,0.6); }
  70%  { box-shadow: 0 0 0 12px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
@keyframes hud-ping-bad {
  0%   { box-shadow: 0 0 0 0   rgba(244,63,94,0.6); }
  70%  { box-shadow: 0 0 0 14px rgba(244,63,94,0); }
  100% { box-shadow: 0 0 0 0 rgba(244,63,94,0); }
}
@keyframes hud-event-row {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
`;

function HUDCorners({ color = 'rgba(56,189,248,0.7)' }: { color?: string }) {
  const arm = 12;
  const off = 6;
  const c = { position: 'absolute' as const, width: arm, height: arm, borderColor: color, borderStyle: 'solid' as const, borderWidth: 0, pointerEvents: 'none' as const };
  return (
    <>
      <span style={{ ...c, top: off, left: off, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, top: off, right: off, borderTopWidth: 1, borderRightWidth: 1 }} />
      <span style={{ ...c, bottom: off, left: off, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <span style={{ ...c, bottom: off, right: off, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>
  );
}

function RadarSweep() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.20) 60deg, transparent 90deg)',
        WebkitMaskImage: 'radial-gradient(circle at center, transparent 28%, black 100%)',
        maskImage: 'radial-gradient(circle at center, transparent 28%, black 100%)',
        animation: 'hud-sweep 5s linear infinite',
        opacity: 0.65,
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `linear-gradient(${LINE_SOFT} 1px, transparent 1px), linear-gradient(90deg, ${LINE_SOFT} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.5,
      }}
    />
  );
}

function PingDot({ tone = 'ok' as 'ok' | 'bad' }) {
  const color = tone === 'ok' ? OK : BAD;
  const anim = tone === 'ok' ? 'hud-ping-ok' : 'hud-ping-bad';
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        animation: `${anim} 1.5s ease-out infinite`,
        boxShadow: `0 0 6px ${color}`,
        display: 'inline-block',
      }}
    />
  );
}

type Event = { ts: string; tone: 'ok' | 'bad' | 'warn'; src: string; msg: string };

const LIVE_EVENTS: Event[] = [
  { ts: '14:32:08', tone: 'ok', src: 'YUHANG·01', msg: 'sync.success · 1,204 rows' },
  { ts: '14:32:05', tone: 'ok', src: 'BINJIANG·02', msg: 'sync.success · 892 rows' },
  { ts: '14:32:02', tone: 'warn', src: 'XIANGSHAN·03', msg: 'retry · timeout 200ms' },
  { ts: '14:31:58', tone: 'ok', src: 'LINAN·04', msg: 'sync.success · 511 rows' },
  { ts: '14:31:51', tone: 'bad', src: 'XINCHANG·05', msg: 'connection refused · :3306' },
  { ts: '14:31:45', tone: 'ok', src: 'YUYAO·06', msg: 'sync.success · 2,108 rows' },
];

function eventTone(t: Event['tone']) {
  if (t === 'ok') return OK;
  if (t === 'warn') return '#fbbf24';
  return BAD;
}

function RadarSweepPanel() {
  return (
    <div
      style={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: 18,
        boxShadow: `inset 0 0 24px ${LINE_SOFT}, 0 0 0 1px rgba(56,189,248,0.05)`,
        overflow: 'hidden',
        minHeight: 320,
      }}
    >
      <GridOverlay />
      <RadarSweep />
      <HUDCorners />

      <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' }}>
        <span style={{ fontFamily: ORBI, fontSize: 11, letterSpacing: 2, color: HUD, fontWeight: 600, textTransform: 'uppercase' }}>
          RDR-LIVE
        </span>
        <span style={{ width: 1, height: 10, background: LINE }} />
        <span style={{ fontFamily: SANS, fontSize: 12, color: T2 }}>实时观测 · 6 区域</span>
        <span style={{ flex: 1 }} />
        <PingDot tone="ok" />
        <span style={{ fontFamily: ORBI, fontSize: 10, color: OK, letterSpacing: 2, fontWeight: 600 }}>LIVE</span>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
        {LIVE_EVENTS.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '5px 8px',
              background: i === 0 ? 'rgba(56,189,248,0.04)' : 'transparent',
              borderLeft: `2px solid ${eventTone(e.tone)}`,
              animation: `hud-event-row 0.4s ${i * 0.06}s ease-out backwards`,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, color: T3, letterSpacing: 0.5, width: 64 }}>{e.ts}</span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: eventTone(e.tone),
                boxShadow: `0 0 4px ${eventTone(e.tone)}`,
              }}
            />
            <span style={{ fontFamily: ORBI, fontSize: 11, color: HUD_2, letterSpacing: 1, width: 110, fontWeight: 500 }}>
              {e.src}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: T1, flex: 1 }}>{e.msg}</span>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: 14, display: 'flex', gap: 14, fontFamily: MONO, fontSize: 10, color: T3, letterSpacing: 0.5, position: 'relative' }}>
        <span>SWEEP · 5s</span>
        <span>·</span>
        <span>BLUR · 20px</span>
        <span>·</span>
        <span>BORDER · 1px HUD</span>
      </footer>
    </div>
  );
}

function OfflinePanel() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(244,63,94,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(244,63,94,0.28)',
        borderRadius: 4,
        padding: 18,
        boxShadow: 'inset 0 0 24px rgba(244,63,94,0.06)',
        overflow: 'hidden',
        minHeight: 320,
      }}
    >
      <GridOverlay />
      <HUDCorners color="rgba(244,63,94,0.65)" />

      <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' }}>
        <span style={{ fontFamily: ORBI, fontSize: 11, letterSpacing: 2, color: BAD, fontWeight: 600 }}>RDR-OFFLINE</span>
        <span style={{ width: 1, height: 10, background: 'rgba(244,63,94,0.4)' }} />
        <span style={{ fontFamily: SANS, fontSize: 12, color: T2 }}>连接已中断</span>
        <span style={{ flex: 1 }} />
        <PingDot tone="bad" />
        <span style={{ fontFamily: ORBI, fontSize: 10, color: BAD, letterSpacing: 2, fontWeight: 600 }}>FAIL</span>
      </header>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 12 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.5))' }}>
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(244,63,94,0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="18" y1="18" x2="46" y2="46" stroke={BAD} strokeWidth="2" strokeLinecap="round" />
          <line x1="46" y1="18" x2="18" y2="46" stroke={BAD} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: ORBI, fontSize: 14, color: BAD, letterSpacing: 1.5, fontWeight: 600 }}>SIGNAL LOST</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: T3 }}>last seen 14:28:42 · 4m ago</span>
        <button
          style={{
            marginTop: 6,
            padding: '6px 14px',
            background: 'transparent',
            border: `1px solid ${BAD}`,
            borderRadius: 2,
            color: BAD,
            fontFamily: ORBI,
            fontSize: 10,
            letterSpacing: 2,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ⟲ RECONNECT
        </button>
      </div>

      <footer style={{ marginTop: 14, display: 'flex', gap: 14, fontFamily: MONO, fontSize: 10, color: T3, position: 'relative' }}>
        <span>STATIC MODE</span>
        <span>·</span>
        <span>NO SWEEP</span>
        <span>·</span>
        <span>PING · 1.5s</span>
      </footer>
    </div>
  );
}

export default function RadarSweepPanelPreview() {
  useEffect(() => {
    const id = 'hud-radar-font';
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
        <header style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
          <span style={{ fontFamily: ORBI, fontSize: 16, fontWeight: 700, letterSpacing: 1.5, color: HUD }}>
            RADAR SWEEP PANEL
          </span>
          <span style={{ width: 1, height: 12, background: LINE }} />
          <span style={{ fontFamily: SANS, fontSize: 13, color: T2 }}>玻璃 + 4 角角标 + sweep + PING + 网格</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, color: T3 }}>blocks/display/tactical-hud</span>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <RadarSweepPanel />
          <OfflinePanel />
        </div>

        <footer style={{ marginTop: 22, display: 'flex', gap: 16, fontFamily: MONO, fontSize: 10.5, color: T3, letterSpacing: 0.4 }}>
          <span>SWEEP · 5s linear</span>
          <span>·</span>
          <span>PING · 1.5s ease-out</span>
          <span>·</span>
          <span>BLUR · 20px</span>
          <span>·</span>
          <span>EVENT-ROW · 0.4s slide-in</span>
        </footer>
      </div>
    </PreviewFrame>
  );
}
