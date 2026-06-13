import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

// 等距投影 1:1 取自 office/iso.ts —— TW64 TH32
const TW = 64,
  TH = 32;
const OX = 360,
  OY = 70;
const iso = (c: number, r: number, z = 0) => ({ x: ((c - r) * TW) / 2 + OX, y: ((c + r) * TH) / 2 + OY - z });
const zidx = (c: number, r: number, z = 0) => Math.round((c + r) * 10 + z * 0.5) + 50;
const poly = (pts: Array<{ x: number; y: number }>) => `polygon(${pts.map((p) => `${p.x}px ${p.y}px`).join(',')})`;

type Faces = { top: string; l: string; r: string };
const WOOD: Faces = { top: '#9a7350', l: '#5a4636', r: '#7a5a3c' };
const DARK: Faces = { top: '#2a2f3e', l: '#15131a', r: '#20242f' };

function Tile({ c, r, color }: { c: number; r: number; color: string }) {
  const p = iso(c, r);
  return (
    <div
      style={{
        position: 'absolute',
        width: TW,
        height: TH,
        left: p.x - TW / 2,
        top: p.y - TH / 2,
        background: color,
        clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
        zIndex: zidx(c, r),
      }}
    />
  );
}

function Voxel({ c, r, wc, dc, h, faces }: { c: number; r: number; wc: number; dc: number; h: number; faces: Faces }) {
  const z = zidx(c + wc, r + dc) + 2;
  const P = (cc: number, rr: number, zz = 0) => iso(cc, rr, zz);
  const face = (pts: Array<{ x: number; y: number }>, color: string, zi: number) => (
    <div style={{ position: 'absolute', inset: 0, background: color, clipPath: poly(pts), zIndex: zi }} />
  );
  return (
    <>
      {face([P(c + wc, r), P(c + wc, r + dc), P(c + wc, r + dc, h), P(c + wc, r, h)], faces.r, z)}
      {face([P(c, r + dc), P(c + wc, r + dc), P(c + wc, r + dc, h), P(c, r + dc, h)], faces.l, z)}
      {face([P(c, r, h), P(c + wc, r, h), P(c + wc, r + dc, h), P(c, r + dc, h)], faces.top, z + 1)}
    </>
  );
}

// 内联迷你工人（取自 .worker 关键层）
function MiniWorker({ c, r, hood, torso }: { c: number; r: number; hood: string; torso: string }) {
  const p = iso(c, r);
  const A = { position: 'absolute' as const };
  return (
    <div style={{ position: 'absolute', left: p.x - 12, top: p.y - 34, width: 24, height: 40, zIndex: zidx(c, r) + 6, imageRendering: 'pixelated' }}>
      <div style={{ ...A, left: '50%', bottom: -2, width: 18, height: 6, marginLeft: -9, background: 'rgba(0,0,0,.36)', borderRadius: '50%' }} />
      <div style={{ ...A, left: 5, top: 2, width: 14, height: 7, background: 'linear-gradient(90deg,#473630 0 50%,#33251f 50% 100%)', borderRadius: '2px 2px 0 0' }} />
      <div style={{ ...A, left: 3, top: 3, width: 18, height: 12, background: `linear-gradient(90deg,${hood} 0 4px,${hood} 4px 14px,#456ba0 14px 18px)`, borderRadius: '3px 3px 1px 1px' }} />
      <div style={{ ...A, left: 7, top: 9, width: 10, height: 7, background: 'linear-gradient(90deg,#ffceb0 0 6px,#e9b193 6px 10px)', borderRadius: 1 }} />
      <div style={{ ...A, left: 12, top: 11, width: 2, height: 2, background: '#2a2330' }} />
      <div style={{ ...A, left: 2, top: 14, width: 20, height: 15, background: `linear-gradient(90deg,#4a6a9a 0 5px,${torso} 5px 15px,#2f4a72 15px 20px)`, borderRadius: 1 }} />
      <div style={{ ...A, left: 5, bottom: 6, width: 14, height: 7, background: 'linear-gradient(90deg,#343c4c 0 50%,#262c38 50% 100%)' }} />
    </div>
  );
}

export default function IsoOfficeWorldPreview() {
  const tiles: React.ReactNode[] = [];
  // 工位区(蓝) + 休息室(紫) + 走廊(提亮)
  for (let c = 0; c <= 8; c++)
    for (let r = 0; r <= 5; r++) {
      const tint = c <= 2 ? 'rgba(120,90,140,.16)' : c === 3 ? 'rgba(255,255,255,.045)' : 'rgba(90,120,170,.13)';
      tiles.push(<Tile key={`t${c}-${r}`} c={c} r={r} color={`#10162b`} />);
      tiles.push(<Tile key={`tt${c}-${r}`} c={c} r={r} color={tint} />);
    }

  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: '40px 0 0', background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 560, overflow: 'hidden' }}>
        <div style={{ padding: '0 44px' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
            BLOCK · QUIVER
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>等距像素办公室</h1>
          <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 8px', maxWidth: 640, lineHeight: 1.7 }}>
            13×9 网格、64×32 菱形瓦片、体素三面着色、房间靠地板 tint + 灯光冷暖分区——纯 DOM clip-path，无 canvas/引擎（截取一角演示）
          </p>
        </div>
        <div style={{ position: 'relative', height: 360 }}>
          {tiles}
          {/* 暖灯光斑 */}
          <div style={{ position: 'absolute', left: iso(1.5, 4).x - 58, top: iso(1.5, 4).y - 36, width: 116, height: 70, background: 'radial-gradient(closest-side, rgba(255,200,150,.5), transparent 78%)', borderRadius: '50%', zIndex: 40, pointerEvents: 'none' }} />
          {/* 工位桌(木) + 屏幕(暗) */}
          <Voxel c={5} r={1} wc={0.95} dc={0.6} h={16} faces={WOOD} />
          <Voxel c={5.1} r={1.15} wc={0.7} dc={0.08} h={31} faces={DARK} />
          <Voxel c={6.6} r={3} wc={0.7} dc={0.5} h={42} faces={{ top: '#23283a', l: '#15131a', r: '#20242f' }} />
          {/* 工人 */}
          <MiniWorker c={5.5} r={1.7} hood="#5a86c0" torso="#3f5f8f" />
          <MiniWorker c={5.5} r={3.6} hood="#a566a8" torso="#7a3f7a" />
          {/* 房间标签（屏幕空间浮层） */}
          <div style={{ position: 'absolute', left: iso(6.8, 2.5).x, top: iso(6.8, 2.5).y - 40, transform: 'translate(-50%,-50%)', fontSize: 11.5, letterSpacing: '1.2px', color: '#eef2fb', background: 'rgba(10,14,26,.82)', padding: '3px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,.06)', zIndex: 200 }}>
            工位区
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
