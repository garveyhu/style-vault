import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <span style={{ color: '#aab4cd', fontSize: 11.5, letterSpacing: '0.15px', display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
      {label}
      <b style={{ color: '#eef2fb', fontFamily: MONO, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{value}</b>
      {unit && <span style={{ color: '#76819c' }}>{unit}</span>}
    </span>
  );
}

function Ghost({ children, icon }: { children?: React.ReactNode; icon?: boolean }) {
  return (
    <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 500, color: '#aab4cd', background: 'rgba(18,24,42,.82)', backdropFilter: 'blur(8px) saturate(1.2)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 11, padding: icon ? '7px 9px' : '7px 11px', display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)', cursor: 'pointer' }}>
      {children}
    </button>
  );
}

export default function GlassTopbarHudPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 0, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 460, position: 'relative' }}>
        {/* 顶栏：flex 两端对齐 */}
        <div style={{ position: 'absolute', top: 14, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* HUD 胶囊 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '0 18px', height: 42, background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.10)', fontSize: 12.5 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2px', padding: '3px 9px', borderRadius: 999, color: '#0e1a10', background: 'linear-gradient(180deg, #a6eaa6, #6cc47a)', boxShadow: '0 0 12px rgba(108,196,122,.3)' }}>
              自治中
            </span>
            <Stat label="经理" value="1" />
            <Stat label="运行" value="3" />
            <Stat label="通过" value="12" />
            <Stat label="$" value="4.20" unit="今夜" />
            <span style={{ width: 92, height: 6, background: 'rgba(8,11,20,.55)', borderRadius: 999, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }}>
              <span style={{ display: 'block', height: '100%', width: '42%', borderRadius: 999, background: 'linear-gradient(90deg,#6cc47a,#ffd27a)', boxShadow: '0 0 10px rgba(255,210,122,.35)' }} />
            </span>
          </div>
          {/* 控件区 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Ghost icon>
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: '#eef2fb', border: '1px solid rgba(255,255,255,.14)', borderRadius: 5, padding: '1px 5px' }}>⌘K</span>
            </Ghost>
            <span style={{ display: 'inline-flex', gap: 3 }}>
              <Ghost>经理</Ghost><Ghost>队列</Ghost><Ghost>追溯</Ghost><Ghost>晨报</Ghost>
            </span>
            <span style={{ display: 'inline-flex', gap: 3 }}>
              <Ghost>人事部</Ghost><Ghost>记忆</Ghost><Ghost>设置</Ghost>
            </span>
            <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 600, color: '#0e1a10', border: 0, borderRadius: 11, padding: '7px 11px', display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', background: 'linear-gradient(180deg, #a6eaa6, #6cc47a)', boxShadow: '0 1px 2px rgba(0,0,0,.3), 0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)' }}>
              <span style={{ width: 0, height: 0, borderLeft: '5px solid currentColor', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', opacity: 0.9 }} />
              CEO 下目标 <span style={{ marginLeft: 6, opacity: 0.8, fontSize: 11 }}>真实</span>
            </button>
          </div>
        </div>

        {/* 底部状态条 */}
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', maxWidth: '80%', display: 'flex', alignItems: 'center', gap: 11, padding: '9px 17px', background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.10)', fontSize: 12.5, color: '#aab4cd' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7bc47e', boxShadow: '0 0 9px #7bc47e' }} />
          经理在领导区待命 —— 点「CEO 下目标」把一件事交给公司，它自己跑。
        </div>

        <div style={{ position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)', fontFamily: MONO, fontSize: 11, color: '#76819c', textAlign: 'center' }}>
          .topbar flex space-between · pointer-events:none（不挡世界）· 唯一亮色 = 出发按钮
        </div>
      </div>
    </PreviewFrame>
  );
}
