import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

// 与源码 workers.ts 的 shade() 同逻辑：每通道加 d，夹到 [0,255]
function shade(hex: string, d: number): string {
  const n = parseInt(hex.slice(1), 16);
  const cl = (v: number) => Math.max(0, Math.min(255, v));
  const r = cl(((n >> 16) & 255) + d);
  const g = cl(((n >> 8) & 255) + d);
  const b = cl((n & 255) + d);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const HOODS: Array<[string, string]> = [
  ['#5a86c0', '#3f5f8f'],
  ['#a566a8', '#7a3f7a'],
  ['#46a0a0', '#2f7070'],
  ['#6a6ad0', '#43439a'],
  ['#c07888', '#945565'],
  ['#5a8ab0', '#3f6a8a'],
];

/** 24×40 像素工人，部件坐标 1:1 取自 global.css .worker */
function Sprite({ role, hood = '#5a86c0', torso = '#3f5f8f' }: { role: 'emp' | 'mgr' | 'aud'; hood?: string; torso?: string }) {
  const hoodGrad =
    role === 'mgr'
      ? 'linear-gradient(90deg,#f2c468 0 4px,#e0a050 4px 14px,#b07a30 14px 18px)'
      : `linear-gradient(90deg, ${shade(hood, 26)} 0 4px, ${hood} 4px 14px, ${shade(hood, -34)} 14px 18px)`;
  const torsoGrad =
    role === 'mgr'
      ? 'linear-gradient(90deg,#e8b45a 0 5px,#d49a40 5px 15px,#a8742c 15px 20px)'
      : `linear-gradient(90deg, ${shade(torso, 24)} 0 5px, ${torso} 5px 15px, ${shade(torso, -30)} 15px 20px)`;
  const A = { position: 'absolute' as const };
  return (
    <div style={{ position: 'relative', width: 24, height: 40, imageRendering: 'pixelated' }}>
      <div style={{ ...A, left: '50%', bottom: -2, width: 18, height: 6, marginLeft: -9, background: 'rgba(0,0,0,.36)', borderRadius: '50%' }} />
      <div style={{ ...A, left: 0, bottom: 6, width: 24, height: 34, filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.55))' }}>
        {/* hair */}
        <div style={{ ...A, left: 5, top: role === 'mgr' ? 0 : 2, width: 14, height: 7, background: 'linear-gradient(90deg,#473630 0 50%,#33251f 50% 100%)', borderRadius: '2px 2px 0 0' }} />
        {/* hood */}
        <div style={{ ...A, left: 3, top: role === 'mgr' ? 1 : 3, width: 18, height: 12, background: hoodGrad, borderRadius: '3px 3px 1px 1px' }} />
        {/* aud visor */}
        {role === 'aud' && <div style={{ ...A, left: 5, top: 9, width: 14, height: 3, background: '#1e3a3a', borderRadius: 1 }} />}
        {/* face */}
        <div style={{ ...A, left: 7, top: 9, width: 10, height: 7, background: 'linear-gradient(90deg,#ffceb0 0 6px,#e9b193 6px 10px)', borderRadius: 1 }} />
        {/* eye */}
        <div style={{ ...A, left: 12, top: 11, width: 2, height: 2, background: '#2a2330', borderRadius: 1 }} />
        {/* torso */}
        <div style={{ ...A, left: 2, top: 14, width: 20, height: 15, background: torsoGrad, borderRadius: 1 }} />
        {/* legs (mgr 无腿，长袍盖住) */}
        {role !== 'mgr' && <div style={{ ...A, left: 5, bottom: 0, width: 14, height: 7, background: 'linear-gradient(90deg,#343c4c 0 50%,#262c38 50% 100%)', borderRadius: '0 0 1px 1px' }} />}
        {/* mgr 王冠 + 披风 + 长袍 */}
        {role === 'mgr' && (
          <>
            <div style={{ ...A, left: 8, top: -1, width: 8, height: 4, background: 'linear-gradient(90deg,#ffe6ad,#e0a050)', borderRadius: '3px 3px 0 0' }} />
            <div style={{ ...A, left: 1, top: 13, width: 22, height: 4, background: '#8a5e26', borderRadius: 2, boxShadow: 'inset 0 1px 0 rgba(255,224,150,.45)' }} />
            <div style={{ ...A, left: 2, top: 25, width: 20, height: 15, background: 'linear-gradient(90deg,#d49a40 0 5px,#b07a30 5px 15px,#8a5e26 15px 20px)', borderRadius: '2px 2px 3px 3px' }} />
          </>
        )}
        {/* aud 写字板 */}
        {role === 'aud' && <div style={{ ...A, right: -3, top: 19, width: 8, height: 10, background: 'linear-gradient(180deg,#d9dde4 0 70%,#b7bcc6 70% 100%)', border: '1px solid #6a7078', borderRadius: 1 }} />}
      </div>
    </div>
  );
}

function Cell({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '28px 18px 18px', borderRadius: 11, background: 'rgba(18,24,42,.55)', border: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ transform: 'scale(3)', transformOrigin: 'bottom center', height: 120, display: 'flex', alignItems: 'flex-end' }}>{children}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#eef2fb' }}>{label}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: '#76819c', marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

export default function PixelWorkerSpritePreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 44, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          AVATAR · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>像素工人精灵</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 30px', maxWidth: 620, lineHeight: 1.7 }}>
          24×40 的小人，全部部件用绝对定位 div + CSS 渐变堆出——零图片资源。连帽衫/上衣三阶明暗由 shade(base, ±) 派生，角色靠「加部件」区分（×3 放大展示）
        </p>

        <div style={{ marginBottom: 30 }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 14 }}>角色变体</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
            <Cell label="员工 emp" sub="戴耳机 · 工位敲键"><Sprite role="emp" hood="#5a86c0" torso="#3f5f8f" /></Cell>
            <Cell label="经理 mgr" sub="王冠 + 披风 + 长袍 金"><Sprite role="mgr" /></Cell>
            <Cell label="审计 aud" sub="护目镜 + 写字板 青"><Sprite role="aud" hood="#46a0a0" torso="#2f7070" /></Cell>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 14 }}>6 套员工配色对 (hood / torso)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 12 }}>
            {HOODS.map(([h, t]) => (
              <Cell key={h} label={`${h}`} sub={t}><Sprite role="emp" hood={h} torso={t} /></Cell>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
