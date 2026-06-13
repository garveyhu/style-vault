import { PreviewFrame } from '../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

const SWATCHES = [
  { hex: '#0a0e1a', name: 'bg-deep' },
  { hex: '#eef2fb', name: 'tx-1' },
  { hex: '#aab4cd', name: 'tx-2' },
  { hex: '#76819c', name: 'tx-3' },
  { hex: '#ffd27a', name: 'amber' },
  { hex: '#6cc47a', name: 'go' },
  { hex: '#7bc47e', name: 'ok' },
  { hex: '#f0b24a', name: 'warn' },
  { hex: '#e2604f', name: 'bad' },
  { hex: '#8fd0ff', name: 'info' },
];

const PILLARS = [
  { t: '世界即界面', d: '13×9 等距像素办公室（纯 DOM 体素），「楼」就是功能入口' },
  { t: '唯一暖强调', d: '全局冷色 + 一处琥珀 #ffd27a（台灯/选中/聚焦）；行动另用青柠绿' },
  { t: '像素角色承载状态', d: '一任务=一工位小人，敲键/思考/庆祝走 steps() 跳帧' },
  { t: '玻璃 chrome 退让', d: 'HUD/命令栏/模态磨砂悬浮，全部让位给那个世界' },
];

export default function QuiverNightStudioStylePreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 44, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>STYLE · QUIVER · EXPERIMENTAL</div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 10px' }}>Quiver 夜色像素工作室</h1>
        <p style={{ fontSize: 13.5, color: '#aab4cd', margin: '0 0 30px', maxWidth: 680, lineHeight: 1.75 }}>
          把「监管一群无头编码 agent」皮肤化成一间整夜亮灯的等距像素办公室——功能没削，但你是在「看公司」而不是「读 dashboard」。
          <span style={{ color: '#ffd27a' }}> signature moment = 那间活着的世界，其余 chrome 全部克制退让。</span>
        </p>

        {/* 调色板条 */}
        <div style={{ display: 'flex', borderRadius: 11, overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)', marginBottom: 14 }}>
          {SWATCHES.map((s) => (
            <div key={s.name} style={{ flex: 1, height: 64, background: s.hex }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginBottom: 34 }}>
          {SWATCHES.map((s) => (
            <span key={s.name}>{s.name} {s.hex}</span>
          ))}
        </div>

        {/* 四件套 */}
        <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 14 }}>风格四件套</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 34 }}>
          {PILLARS.map((p, i) => (
            <div key={p.t} style={{ background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 11, padding: 16 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: '#ffd27a', marginBottom: 8 }}>0{i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 650, marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontSize: 12, color: '#aab4cd', lineHeight: 1.6 }}>{p.d}</div>
            </div>
          ))}
        </div>

        {/* 字体 + 按钮组合演示 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 660 }}>系统无衬线</span>
          <span style={{ fontFamily: MONO, fontSize: 18, color: '#aab4cd', fontVariantNumeric: 'tabular-nums' }}>$4.20 · 12 · 03:14</span>
          <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 600, color: '#0e1a10', border: 0, borderRadius: 11, padding: '7px 13px', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)' }}>CEO 下目标</button>
          <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 500, color: '#aab4cd', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 11, padding: '7px 11px' }}>设置</button>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, color: '#0e1a10', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 0 12px rgba(108,196,122,.3)' }}>自治中</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
