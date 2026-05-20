import { useEffect } from 'react';
import { PreviewFrame } from '../../../../_layout';

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
const T1 = 'rgba(220,240,255,0.95)';
const T2 = 'rgba(190,215,240,0.62)';
const T3 = 'rgba(160,195,225,0.40)';
const GLASS = 'rgba(56,189,248,0.05)';
const LINE = 'rgba(56,189,248,0.25)';
const LINE_SOFT = 'rgba(56,189,248,0.10)';

type KpiSpec = {
  id: string;
  value: string;
  unit: string;
  caption: string;
  tone: 'ok' | 'hud' | 'warn';
  arcStart: number;
  arcEnd: number;
};

const SPECS: KpiSpec[] = [
  { id: 'success', value: '98.7', unit: '% SUCCESS', caption: 'TGT 99.0%', tone: 'ok', arcStart: 135, arcEnd: 405 - 90 + 0 },
  { id: 'events', value: '12.4M', unit: 'EVENTS · 24H', caption: '+8.2% Δ', tone: 'hud', arcStart: 135, arcEnd: 380 - 90 + 0 },
  { id: 'p95', value: '142', unit: 'ms · P95', caption: 'WARN ≥ 200ms', tone: 'warn', arcStart: 135, arcEnd: 350 - 90 + 0 },
  { id: 'online', value: '11/11', unit: 'NODES · ONLINE', caption: 'ALL HEALTHY', tone: 'ok', arcStart: 135, arcEnd: 405 - 90 + 0 },
];

function toneColor(t: KpiSpec['tone']) {
  if (t === 'ok') return OK;
  if (t === 'warn') return WARN;
  return HUD;
}

function ArcRingKpi({ spec }: { spec: KpiSpec }) {
  const size = 120;
  const r = 48;
  const cx = 60;
  const cy = 60;

  const startRad = ((135 - 90) * Math.PI) / 180;
  const startX = cx + r * Math.cos(startRad);
  const startY = cy + r * Math.sin(startRad);
  const endRad = ((45 - 90) * Math.PI) / 180;
  const endX = cx + r * Math.cos(endRad);
  const endY = cy + r * Math.sin(endRad);

  const tone = toneColor(spec.tone);
  const gradId = `arcGrad-${spec.id}`;

  const ticks = [
    [60, 6, 60, 10],
    [60, 110, 60, 114],
    [6, 60, 10, 60],
    [110, 60, 114, 60],
    [22, 22, 25, 25],
    [98, 22, 95, 25],
    [22, 98, 25, 95],
    [98, 98, 95, 95],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          style={{ filter: `drop-shadow(0 0 5px ${tone}aa)` }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={tone} />
              <stop offset="100%" stopColor={spec.tone === 'hud' ? HUD_2 : tone} />
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

          <g stroke="rgba(56,189,248,0.45)" strokeWidth={1}>
            {ticks.map((t, i) => (
              <line key={i} x1={t[0]} y1={t[1]} x2={t[2]} y2={t[3]} />
            ))}
          </g>

          <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth={1} />
        </svg>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: ORBI,
              fontSize: 32,
              fontWeight: 600,
              color: spec.tone === 'warn' ? WARN : T1,
              letterSpacing: 0.5,
              lineHeight: 1,
            }}
          >
            {spec.value}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: T3,
              marginTop: 6,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {spec.unit}
          </span>
        </div>

        <span
          style={{
            position: 'absolute',
            top: -2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: tone,
            boxShadow: `0 0 6px ${tone}`,
          }}
        />
      </div>

      <div style={{ fontFamily: MONO, fontSize: 10, color: T3, letterSpacing: 0.5 }}>{spec.caption}</div>
    </div>
  );
}

function HUDCorners() {
  const arm = 12;
  const off = 6;
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

export default function ArcRingKpiPreview() {
  useEffect(() => {
    const id = 'hud-arc-ring-font';
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
      <div style={{ position: 'relative', minHeight: '100vh', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: T1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
          <span style={{ fontFamily: ORBI, fontSize: 16, fontWeight: 700, letterSpacing: 1.5, color: HUD }}>
            ARC RING KPI
          </span>
          <span style={{ width: 1, height: 12, background: LINE }} />
          <span style={{ fontFamily: SANS, fontSize: 13, color: T2 }}>270° 圆环 · 8 cardinal ticks · 渐变描边 · 霓虹光晕</span>
        </div>

        <div
          style={{
            position: 'relative',
            background: GLASS,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${LINE}`,
            borderRadius: 4,
            padding: '32px 28px',
            boxShadow: `inset 0 0 32px ${LINE_SOFT}`,
          }}
        >
          <HUDCorners />
          <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
            {SPECS.map((s) => (
              <ArcRingKpi key={s.id} spec={s} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 16, fontFamily: MONO, fontSize: 10.5, color: T3, letterSpacing: 0.4 }}>
          <span>120×120 px</span>
          <span>·</span>
          <span>stroke 2.5px</span>
          <span>·</span>
          <span>arc 270°</span>
          <span>·</span>
          <span>tick × 8</span>
          <span>·</span>
          <span>drop-shadow 5px</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
