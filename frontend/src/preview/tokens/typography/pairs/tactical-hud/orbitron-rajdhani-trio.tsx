import { useEffect } from 'react';
import { PreviewFrame } from '../../../../_layout';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap';

const ORBI = "'Orbitron', 'Rajdhani', sans-serif";
const SANS = "'Rajdhani', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";

const BG_DEEP = 'radial-gradient(ellipse at center, #0a1228 0%, #040816 100%)';
const HUD = '#38bdf8';
const HUD_2 = '#22d3ee';
const OK = '#4ade80';
const T1 = 'rgba(220,240,255,0.95)';
const T2 = 'rgba(190,215,240,0.62)';
const T3 = 'rgba(160,195,225,0.40)';
const GLASS = 'rgba(56,189,248,0.05)';
const LINE = 'rgba(56,189,248,0.25)';
const LINE_SOFT = 'rgba(56,189,248,0.10)';

type ScaleRow = {
  token: string;
  size: number;
  weight: number;
  font: 'orbi' | 'sans' | 'mono';
  spacing: number;
  sample: string;
  use: string;
};

const ORBI_SCALE: ScaleRow[] = [
  { token: 'brand', size: 18, weight: 700, font: 'orbi', spacing: 1.5, sample: 'AURA', use: 'wordmark' },
  { token: 'eyebrow', size: 11, weight: 500, font: 'orbi', spacing: 2, sample: '▾ 总览 / OVERVIEW', use: '分组标题' },
  { token: 'kpi-num', size: 40, weight: 600, font: 'orbi', spacing: 0.5, sample: '98.7', use: 'KPI 中央' },
  { token: 'live-chip', size: 10, weight: 600, font: 'orbi', spacing: 2, sample: 'LIVE', use: 'system 徽章' },
];

const SANS_SCALE: ScaleRow[] = [
  { token: 'h1', size: 22, weight: 600, font: 'sans', spacing: 0, sample: '数据同步全域监控', use: '页面标题' },
  { token: 'h2', size: 16, weight: 600, font: 'sans', spacing: 0, sample: '区域观测 · 11 节点', use: '面板标题' },
  { token: 'label', size: 13, weight: 500, font: 'sans', spacing: 0, sample: '杭州市 · 余杭区', use: '中文 label' },
  { token: 'body', size: 13, weight: 400, font: 'sans', spacing: 0, sample: '正文段落 · 实时观测中', use: '正文' },
  { token: 'caption-zh', size: 11, weight: 400, font: 'sans', spacing: 0.2, sample: '系统在工作', use: '副 caption' },
];

const MONO_SCALE: ScaleRow[] = [
  { token: 'data-l', size: 14, weight: 500, font: 'mono', spacing: 0.5, sample: '12,432,891', use: '数据' },
  { token: 'data-m', size: 13, weight: 400, font: 'mono', spacing: 0.5, sample: '142ms · 98.7%', use: '指标' },
  { token: 'ts', size: 11, weight: 400, font: 'mono', spacing: 0.5, sample: '2026-05-20 14:32:08', use: '时间戳' },
  { token: 'shortcut', size: 11, weight: 500, font: 'mono', spacing: 0.5, sample: '⌘K · /search', use: '快捷键' },
];

function fontOf(f: ScaleRow['font']) {
  return f === 'orbi' ? ORBI : f === 'sans' ? SANS : MONO;
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

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: '22px 22px 18px',
        boxShadow: `inset 0 0 24px ${LINE_SOFT}`,
      }}
    >
      <HUDCorners />
      {children}
    </div>
  );
}

function ScaleTable({ rows }: { rows: ScaleRow[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {rows.map((r) => (
        <div key={r.token} style={{ display: 'flex', alignItems: 'center', gap: 18, borderBottom: `1px dashed ${LINE_SOFT}`, paddingBottom: 12 }}>
          <div style={{ width: 110, fontFamily: MONO, fontSize: 11, color: HUD, letterSpacing: 0.5 }}>{r.token}</div>
          <div style={{ width: 80, fontFamily: MONO, fontSize: 10.5, color: T3 }}>
            {r.size}px · {r.weight}
          </div>
          <div
            style={{
              flex: 1,
              fontFamily: fontOf(r.font),
              fontSize: r.size,
              fontWeight: r.weight,
              letterSpacing: r.spacing,
              color: r.font === 'orbi' ? T1 : T1,
              lineHeight: 1.2,
            }}
          >
            {r.sample}
          </div>
          <div style={{ width: 110, fontFamily: SANS, fontSize: 11, color: T2, textAlign: 'right' }}>{r.use}</div>
        </div>
      ))}
    </div>
  );
}

function FamilyHeader({ name, role, weights }: { name: string; role: string; weights: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
      <span style={{ fontFamily: ORBI, fontSize: 12, fontWeight: 600, letterSpacing: 2, color: HUD }}>{name}</span>
      <span style={{ width: 1, height: 10, background: LINE }} />
      <span style={{ fontFamily: SANS, fontSize: 12, color: T2 }}>{role}</span>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${LINE_SOFT} 0%, transparent 100%)` }} />
      <span style={{ fontFamily: MONO, fontSize: 10, color: T3 }}>{weights}</span>
    </div>
  );
}

export default function OrbitronRajdhaniTrioPreview() {
  useEffect(() => {
    const id = 'hud-trio-typography-font';
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
        <header style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
          <span style={{ fontFamily: ORBI, fontSize: 18, fontWeight: 700, letterSpacing: 1.5, color: HUD }}>
            ORBITRON · RAJDHANI · MONO
          </span>
          <span style={{ width: 1, height: 12, background: LINE }} />
          <span style={{ fontFamily: SANS, fontSize: 13, color: T2 }}>三层字体协奏 · HUD 战术屏标配</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, color: T3 }}>tactical-hud/typography</span>
        </header>

        {/* hero showcase */}
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: ORBI, fontSize: 48, fontWeight: 700, letterSpacing: 2, color: T1, lineHeight: 1 }}>
              AURA / v0.5
            </span>
            <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 500, color: T2 }}>
              数据同步全域监控 · 11 节点实时观测
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 6 }}>
              <span style={{ fontFamily: ORBI, fontSize: 56, fontWeight: 600, letterSpacing: 0.5, color: HUD_2, lineHeight: 1 }}>
                12,432,891
              </span>
              <span style={{ fontFamily: MONO, fontSize: 12, color: T3, letterSpacing: 0.5 }}>EVENTS · 24H</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontFamily: ORBI, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: OK, padding: '3px 10px', border: `1px solid ${OK}`, borderRadius: 2 }}>
                LIVE
              </span>
            </div>
          </div>
        </Panel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 18 }}>
          <Panel>
            <FamilyHeader name="ORBITRON" role="品牌 / 大数字 / system 徽章" weights="400 · 500 · 600 · 700" />
            <ScaleTable rows={ORBI_SCALE} />
          </Panel>

          <Panel>
            <FamilyHeader name="RAJDHANI" role="正文 / 中文 label / 区域名" weights="300 · 400 · 500 · 600 · 700" />
            <ScaleTable rows={SANS_SCALE} />
          </Panel>

          <Panel>
            <FamilyHeader name="JETBRAINS MONO" role="数据 / 时间戳 / 快捷键" weights="300 · 400 · 500 · 600" />
            <ScaleTable rows={MONO_SCALE} />
          </Panel>
        </div>

        <footer style={{ marginTop: 22, fontFamily: MONO, fontSize: 10.5, color: T3, display: 'flex', gap: 14 }}>
          <span>tabular-nums ✓</span>
          <span>·</span>
          <span>letter-spacing 1.5-2px on Orbitron</span>
          <span>·</span>
          <span>Rajdhani 400-600 only</span>
          <span>·</span>
          <span>Orbitron usage ≤ 10%</span>
        </footer>
      </div>
    </PreviewFrame>
  );
}
