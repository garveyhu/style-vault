import { PreviewFrame } from '../../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

export default function SfSystemDuoPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, maxWidth: 1200 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          TYPOGRAPHY · QUIVER
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 660, letterSpacing: '-0.01em', margin: '0 0 6px' }}>系统无衬线 + Mono 数字</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 26px', maxWidth: 720, lineHeight: 1.7 }}>
          界面走系统无衬线（原生质感、零 web font），数字一律切等宽 Mono + tabular-nums——桌面 app 的「原生感 + 工程感」分工
        </p>

        {/* 大字 specimen */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 22, marginBottom: 24 }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 12 }}>UI · 系统无衬线</div>
          <div style={{ fontSize: 52, fontWeight: 660, letterSpacing: '-0.01em', lineHeight: 1.1 }}>公司整夜亮着灯</div>
          <div style={{ fontSize: 26, color: '#aab4cd', marginTop: 6 }}>CEO 下目标 · 它自己跑 · Aa Bb 0123</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
            {[['500', 500, '界面'], ['600', 600, '强调'], ['650', 650, '卡头'], ['660', 660, '面板标题']].map(([w, fw, note]) => (
              <div key={w as string}>
                <span style={{ fontSize: 22, fontWeight: fw as number }}>夜色工作室</span>
                <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 2 }}>{w} · {note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* mono 数字 tabular-nums */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 22 }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#76819c', marginBottom: 12 }}>Mono · 数字 / 快捷键（tabular-nums 等宽对齐）</div>
          <div style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', fontSize: 34, fontWeight: 600, display: 'flex', flexWrap: 'wrap', gap: '6px 28px' }}>
            <span>$ 4.20</span><span style={{ color: '#76819c' }}>·</span>
            <span>运行 3</span><span style={{ color: '#76819c' }}>·</span>
            <span>通过 12</span><span style={{ color: '#76819c' }}>·</span>
            <span>03:14</span>
          </div>
          <div style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', fontSize: 15, color: '#aab4cd', marginTop: 14, lineHeight: 1.7 }}>
            1111111111  ←等宽，跳动不抖位<br />
            0000000000
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#aab4cd', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 8, padding: '7px 11px' }}>--ui: -apple-system / SF Pro Text / Inter / PingFang SC</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#aab4cd', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 8, padding: '7px 11px' }}>--mono: SF Mono / JetBrains Mono</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
