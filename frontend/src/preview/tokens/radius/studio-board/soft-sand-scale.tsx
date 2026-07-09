import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea';
const SURFACE = '#fffdfa';
const INK = '#2a2620';
const MUTED = '#8f8676';
const SUCCESS = '#5b8c5a';
const BORDER = 'rgba(42,38,32,0.11)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

function Scale({ title, hint, vals }: { title: string; hint: string; vals: { r: number; k: string }[] }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
        <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: INK }}>{title}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{hint}</span>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {vals.map((v) => (
          <div key={v.k} style={{ textAlign: 'center' }}>
            <div style={{ width: 84, height: 84, background: SURFACE, border: `1px solid ${BORDER}`, borderTopLeftRadius: v.r, borderTopRightRadius: v.r, boxShadow: '0 10px 24px -18px rgba(74,54,20,0.3)' }} />
            <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 12, color: INK }}>{v.r}px</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 11, color: MUTED }}>{v.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SoftSandScale() {
  return (
    <PreviewFrame bg={SAND}>
      <div style={{ padding: 40, fontFamily: DISPLAY, color: INK, display: 'flex', flexDirection: 'column', gap: 34 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>暖砂大软圆角阶</h2>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: MUTED }}>详情页走大软圆角（基准 16 · 卡/抽屉 20–22），配白玻璃有「软件产品」松弛手感</p>
        </div>
        <Scale title="workstation · 大软" hint="卡=lg(16) · 抽屉 22" vals={[{ r: 7, k: 'xs' }, { r: 10, k: 'sm' }, { r: 12, k: 'DEFAULT' }, { r: 16, k: '基/md' }, { r: 20, k: 'lg' }, { r: 22, k: 'drawer' }]} />
        <Scale title="board · 收紧" hint="密度更高、圆角更收" vals={[{ r: 4, k: 'xs' }, { r: 6, k: 'sm' }, { r: 8, k: '基' }, { r: 12, k: 'lg' }, { r: 18, k: 'drawer' }]} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ borderRadius: 999, background: SURFACE, border: `1px solid ${SUCCESS}`, color: SUCCESS, fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: '4px 14px' }}>pill 恒 full</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 13, color: MUTED }}>徽标 / 平台切换 / 计数 / 文件 tab 一律胶囊</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
