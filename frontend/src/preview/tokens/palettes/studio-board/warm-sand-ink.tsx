import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea';
const INK = '#2a2620';
const MUTED = '#8f8676';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

type Sw = { c: string; hex: string; label: string; ring?: boolean };
const BOARD: Sw[] = [
  { c: '#f6f2e8', hex: '#f6f2e8', label: '奶油底', ring: true },
  { c: '#fffdf7', hex: '#fffdf7', label: 'surface', ring: true },
  { c: '#161616', hex: '#161616', label: '近黑 ink' },
  { c: '#12805c', hex: '#12805c', label: '成功绿' },
  { c: '#2557d6', hex: '#2557d6', label: '焦点蓝' },
];
const WORK: Sw[] = [
  { c: '#f0eeea', hex: '#f0eeea', label: '暖砂底', ring: true },
  { c: '#fffdfa', hex: '#fffdfa', label: 'surface', ring: true },
  { c: '#2a2620', hex: '#2a2620', label: '暖墨 / CTA' },
  { c: '#5b8c5a', hex: '#5b8c5a', label: '苔绿判成' },
  { c: '#c8891f', hex: '#c8891f', label: '金·待发布' },
  { c: '#c25a3a', hex: '#c25a3a', label: '陶土·错误' },
];
const DARK: Sw[] = [
  { c: '#14161b', hex: '#14161b', label: 'slate 底' },
  { c: '#1e222b', hex: '#1e222b', label: 'surface' },
  { c: '#eceef2', hex: '#eceef2', label: '文字' },
  { c: '#3fbe86', hex: '#3fbe86', label: '成功绿' },
  { c: '#3a4150', hex: '#3a4150', label: '焦点' },
];

function Row({ title, hint, items }: { title: string; hint: string; items: Sw[] }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: INK }}>{title}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{hint}</span>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {items.map((s) => (
          <div key={s.label} style={{ width: 148 }}>
            <div style={{ height: 76, borderRadius: 12, background: s.c, border: s.ring ? '1px solid rgba(42,38,32,0.12)' : 'none', boxShadow: '0 8px 20px -14px rgba(74,54,20,0.3)' }} />
            <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 11, color: INK }}>{s.hex}</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 12, color: MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WarmSandInkPalette() {
  return (
    <PreviewFrame bg={SAND}>
      <div style={{ padding: 40, fontFamily: DISPLAY, color: INK, display: 'flex', flexDirection: 'column', gap: 34 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>暖砂暖墨调色板</h2>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: MUTED }}>暖中性统治 + 苔绿判成 + 暖近黑 CTA + 金/陶土点睛 · 亮暖砂 / 暗冷 slate 双态</p>
        </div>
        <Row title="首页 board · 奶油亮" hint=":root · 冷蓝焦点" items={BOARD} />
        <Row title="详情页 workstation · 暖砂" hint="[data-page] · 暖近黑焦点" items={WORK} />
        <Row title="暗态 · 冷 slate" hint="[data-theme=dark]" items={DARK} />
      </div>
    </PreviewFrame>
  );
}
