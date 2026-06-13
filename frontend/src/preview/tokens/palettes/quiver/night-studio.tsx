import { PreviewFrame } from '../../../_layout';

type Swatch = { name: string; hex: string; note?: string; ink?: string };
type Group = { group: string; items: Swatch[] };

const UI =
  '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

const GROUPS: Group[] = [
  {
    group: 'Background · 夜色舞台',
    items: [
      { name: 'bg-deep', hex: '#0a0e1a', note: '近黑页面底' },
      { name: 'stage-hi', hex: '#1b2440', note: '径向中心微亮' },
      { name: 'stage-mid', hex: '#10162b', note: '径向 62%' },
    ],
  },
  {
    group: 'Text · 冷文字三阶',
    items: [
      { name: 'tx-1', hex: '#eef2fb', note: '主文字', ink: '#0a0e1a' },
      { name: 'tx-2', hex: '#aab4cd', note: '次文字', ink: '#0a0e1a' },
      { name: 'tx-3', hex: '#76819c', note: '弱文字' },
    ],
  },
  {
    group: 'Accent · 唯一暖 + 行动绿',
    items: [
      { name: 'amber', hex: '#ffd27a', note: '台灯/选中/聚焦', ink: '#1a1407' },
      { name: 'go-from', hex: '#a6eaa6', note: '出发按钮 ↑', ink: '#0e1a10' },
      { name: 'go-to', hex: '#6cc47a', note: '出发按钮 ↓', ink: '#0e1a10' },
    ],
  },
  {
    group: 'State · 4 色语义',
    items: [
      { name: 'ok', hex: '#7bc47e', note: '通过', ink: '#0e1a10' },
      { name: 'warn', hex: '#f0b24a', note: '警告', ink: '#1a1407' },
      { name: 'bad', hex: '#e2604f', note: '打回', ink: '#1a0a08' },
      { name: 'info', hex: '#8fd0ff', note: '工具/数据', ink: '#06121f' },
    ],
  },
];

const SURFACES: Swatch[] = [
  { name: 's-0', hex: 'rgba(11,15,26,.72)', note: 'HUD/状态条' },
  { name: 's-1', hex: 'rgba(18,24,42,.82)', note: 'chrome 按钮' },
  { name: 's-2', hex: 'rgba(22,29,50,.94)', note: '模态面板' },
  { name: 'bd', hex: 'rgba(255,255,255,.09)', note: '发丝边框' },
  { name: 'hairline', hex: 'rgba(255,255,255,.10)', note: '顶部高光' },
];

export default function NightStudioPalettePreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          PALETTE · QUIVER
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 10px', color: '#eef2fb' }}>
          夜色工作室
        </h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 28px', maxWidth: 720, lineHeight: 1.7 }}>
          深夜蓝径向舞台 · 冷文字三阶 · 唯一琥珀暖强调 · 行动绿 + 4 色语义 · 磨砂玻璃表面——一间整夜亮灯的像素办公室的夜间基底
        </p>

        {/* 径向舞台演示 */}
        <div
          style={{
            height: 150,
            borderRadius: 14,
            marginBottom: 30,
            border: '1px solid rgba(255,255,255,.09)',
            background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 12, color: '#76819c' }}>
            radial-gradient(130% 100% at 50% 32%, #1b2440, #10162b 62%, #0a0e1a)
          </span>
        </div>

        {GROUPS.map((g) => (
          <section key={g.group} style={{ marginBottom: 26 }}>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 12 }}>
              {g.group}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {g.items.map((c) => (
                <div key={c.name} style={{ background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 11, padding: 12 }}>
                  <div style={{ height: 72, background: c.hex, borderRadius: 8, marginBottom: 10, display: 'grid', placeItems: 'center' }}>
                    {c.ink && <span style={{ fontFamily: MONO, fontSize: 11, color: c.ink }}>Aa 0123</span>}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: '#eef2fb' }}>{c.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 2 }}>{c.hex}</div>
                  {c.note && <div style={{ fontSize: 11, color: '#aab4cd', marginTop: 6 }}>{c.note}</div>}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 12 }}>
            Surface / Border · 磨砂玻璃
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {SURFACES.map((s) => (
              <div key={s.name} style={{ background: 'radial-gradient(130% 100% at 50% 32%, #1b2440, #0a0e1a)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 11, padding: 12 }}>
                <div style={{ height: 48, background: s.hex, borderRadius: 8, border: '1px solid rgba(255,255,255,.10)', marginBottom: 10, backdropFilter: 'blur(13px)' }} />
                <div style={{ fontFamily: MONO, fontSize: 11.5, color: '#eef2fb' }}>{s.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: '#76819c', marginTop: 2 }}>{s.hex}</div>
                <div style={{ fontSize: 11, color: '#aab4cd', marginTop: 6 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
