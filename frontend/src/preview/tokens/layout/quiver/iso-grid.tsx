import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

const TW = 64, TH = 32;
const OX = 210, OY = 64;
const pt = (c: number, r: number, z = 0) => ({ x: ((c - r) * TW) / 2 + OX, y: ((c + r) * TH) / 2 + OY - z });
const poly = (pts: Array<{ x: number; y: number }>) => `polygon(${pts.map((p) => `${p.x}px ${p.y}px`).join(',')})`;

function Tile({ c, r, color }: { c: number; r: number; color: string }) {
  const p = pt(c, r);
  return <div style={{ position: 'absolute', width: TW, height: TH, left: p.x - TW / 2, top: p.y - TH / 2, background: color, clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />;
}

function Voxel({ c, r, wc, dc, h }: { c: number; r: number; wc: number; dc: number; h: number }) {
  const F = { top: '#9a7350', l: '#5a4636', r: '#7a5a3c' };
  const face = (pts: Array<{ x: number; y: number }>, color: string) => (
    <div style={{ position: 'absolute', inset: 0, background: color, clipPath: poly(pts) }} />
  );
  return (
    <>
      {face([pt(c + wc, r), pt(c + wc, r + dc), pt(c + wc, r + dc, h), pt(c + wc, r, h)], F.r)}
      {face([pt(c, r + dc), pt(c + wc, r + dc), pt(c + wc, r + dc, h), pt(c, r + dc, h)], F.l)}
      {face([pt(c, r, h), pt(c + wc, r, h), pt(c + wc, r + dc, h), pt(c, r + dc, h)], F.top)}
    </>
  );
}

const FACES: Array<[string, string, string, string]> = [
  ['WOOD', '#9a7350', '#5a4636', '#7a5a3c'],
  ['WOOD2', '#a87f57', '#5a4636', '#7a5a3c'],
  ['DARK', '#2a2f3e', '#15131a', '#20242f'],
];

export default function IsoGridPreview() {
  const tiles: React.ReactNode[] = [];
  for (let c = 0; c <= 3; c++)
    for (let r = 0; r <= 2; r++) {
      const hall = c === 2;
      tiles.push(<Tile key={`${c}-${r}`} c={c} r={r} color={hall ? 'rgba(255,255,255,.06)' : 'rgba(90,120,170,.16)'} />);
    }
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, maxWidth: 1200, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>LAYOUT · QUIVER</div>
        <h1 style={{ fontSize: 30, fontWeight: 660, letterSpacing: '-0.01em', margin: '0 0 6px' }}>等距像素网格</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 24px', maxWidth: 760, lineHeight: 1.7 }}>
          64×32 菱形瓦片、体素三面着色、画家算法 z-index——纯 React + CSS（clip-path）的等距世界，无 canvas / 无引擎
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 28, alignItems: 'start' }}>
          {/* iso 演示 */}
          <div style={{ position: 'relative', height: 280, borderRadius: 11, border: '1px solid rgba(255,255,255,.06)', background: 'rgba(8,11,20,.4)', overflow: 'hidden' }}>
            {tiles}
            <Voxel c={1} r={0} wc={1} dc={1} h={26} />
            {/* 标注 */}
            <div style={{ position: 'absolute', left: pt(3.5, 0).x, top: pt(3.5, 0).y - 8, fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>TW 64</div>
            <div style={{ position: 'absolute', left: 14, top: pt(0, 2.6).y, fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>TH 32 · WALLH 42</div>
            <div style={{ position: 'absolute', left: pt(1.5, 0.5, 30).x - 18, top: pt(1.5, 0.5, 30).y - 14, fontFamily: MONO, fontSize: 10, color: '#ffd27a' }}>isoBox</div>
          </div>

          {/* 公式 + 体素配色 */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 10 }}>网格 → 屏幕</div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, lineHeight: 1.9, color: '#eef2fb', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 10, padding: '12px 14px' }}>
              <div><span style={{ color: '#8fd0ff' }}>iso</span>(c,r,z) = (</div>
              <div style={{ paddingLeft: 18 }}>(c−r)·TW/2 + ox,</div>
              <div style={{ paddingLeft: 18 }}>(c+r)·TH/2 + oy − z )</div>
              <div style={{ marginTop: 6 }}><span style={{ color: '#8fd0ff' }}>zidx</span> = round((c+r)·10 + z·.5) + 50</div>
              <div style={{ marginTop: 6, color: '#76819c' }}>tile clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%)</div>
            </div>

            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', margin: '20px 0 10px' }}>体素三面着色（顶 / 左 / 右）</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FACES.map(([name, top, l, r]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'inline-flex', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)' }}>
                    <i style={{ width: 26, height: 22, background: top }} />
                    <i style={{ width: 26, height: 22, background: l }} />
                    <i style={{ width: 26, height: 22, background: r }} />
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: '#eef2fb' }}>{name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c' }}>{top} / {l} / {r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
