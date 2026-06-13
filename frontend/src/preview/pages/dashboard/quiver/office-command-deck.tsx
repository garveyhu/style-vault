import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

const TW = 64, TH = 32;
const iso = (c: number, r: number, ox: number, oy: number) => ({ x: ((c - r) * TW) / 2 + ox, y: ((c + r) * TH) / 2 + oy });

function Ghost({ children }: { children: React.ReactNode }) {
  return <button style={{ fontFamily: UI, fontSize: 11.5, fontWeight: 500, color: '#aab4cd', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer' }}>{children}</button>;
}

export default function OfficeCommandDeckPreview() {
  const tiles: React.ReactNode[] = [];
  for (let c = 0; c <= 6; c++)
    for (let r = 0; r <= 4; r++) {
      const p = iso(c, r, 260, 60);
      tiles.push(<div key={`a${c}-${r}`} style={{ position: 'absolute', width: TW, height: TH, left: p.x - 32, top: p.y - 16, background: '#10162b', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />);
      tiles.push(<div key={`b${c}-${r}`} style={{ position: 'absolute', width: TW, height: TH, left: p.x - 32, top: p.y - 16, background: c <= 2 ? 'rgba(120,90,140,.16)' : 'rgba(90,120,170,.13)', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />);
    }
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: '40px 44px 0' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>PAGE · QUIVER</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>办公室指挥甲板</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 18px', maxWidth: 640, lineHeight: 1.7 }}>
          整个应用就是一屏：一间活着的像素办公室占满视口，功能从「点楼 / 顶栏 / ⌘K」唤起的叠层进入——没有传统侧栏/tab
        </p>
      </div>
      {/* 单屏甲板缩影 */}
      <div style={{ position: 'relative', height: 380, margin: '0 24px 24px', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)', background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)' }}>
        {/* world */}
        <div style={{ position: 'absolute', inset: 0 }}>{tiles}</div>
        {/* 暖灯 */}
        <div style={{ position: 'absolute', left: iso(1.5, 3, 260, 60).x - 58, top: iso(1.5, 3, 260, 60).y - 36, width: 116, height: 70, background: 'radial-gradient(closest-side, rgba(255,200,150,.5), transparent 78%)', borderRadius: '50%' }} />
        {/* 顶栏 */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', height: 36, background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 12, fontSize: 11.5 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999, color: '#0e1a10', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 0 12px rgba(108,196,122,.3)' }}>自治中</span>
            <span style={{ color: '#aab4cd' }}>运行 <b style={{ fontFamily: MONO, color: '#eef2fb' }}>3</b></span>
            <span style={{ color: '#aab4cd' }}>通过 <b style={{ fontFamily: MONO, color: '#eef2fb' }}>12</b></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ghost>追溯</Ghost><Ghost>设置</Ghost>
            <button style={{ fontFamily: UI, fontSize: 11.5, fontWeight: 600, color: '#0e1a10', border: 0, borderRadius: 10, padding: '6px 11px', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)', cursor: 'pointer' }}>CEO 下目标</button>
          </div>
        </div>
        {/* 状态条 */}
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 15px', background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 12, fontSize: 12, color: '#aab4cd' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7bc47e', boxShadow: '0 0 9px #7bc47e' }} />
          经理在领导区待命 —— 点「CEO 下目标」把一件事交给公司。
        </div>
        {/* vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(130% 110% at 50% 42%,rgba(0,0,0,0) 52%,rgba(0,0,0,.28) 84%,rgba(0,0,0,.6) 100%)' }} />
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: '#76819c', padding: '0 44px 36px', textAlign: 'center' }}>
        三层 z：#stage(世界) → 浮层 chrome(顶栏+状态条) → 叠层(scrim+面板) → 整屏氛围后期
      </div>
    </PreviewFrame>
  );
}
