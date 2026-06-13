import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

type Cmd = { label: string; hint: string; kbd?: string };
const CMDS: Cmd[] = [
  { label: '新任务', hint: '下一个目标交给公司', kbd: '⌘N' },
  { label: '经理工作台', hint: '看经理逐拍决策/开自治', kbd: 'M' },
  { label: '追溯室', hint: '每个任务每一步·思考/工具/花费' },
  { label: '记忆库', hint: '公司记住的事实·录入/作废' },
  { label: '调度台', hint: '工作队列·调优先级/取消' },
  { label: '急停·全公司', hint: '冻结并停掉所有 AI', kbd: '⌃.' },
];

export default function CommandPalettePreview() {
  const sel = 1;
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 520 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          BLOCK · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>⌘K 命令面板</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 28px', maxWidth: 560, lineHeight: 1.7 }}>
          磨砂玻璃启动器：模糊过滤 + mono 键帽 + 琥珀选中条 + 全键盘导航
        </p>

        {/* cmdk 卡 */}
        <div style={{ width: 'min(540px, 100%)', margin: '0 auto', background: 'rgba(22,29,50,.94)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,.46), 0 32px 96px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.10)', overflow: 'hidden' }}>
          <input
            readOnly
            value=""
            placeholder="输入命令…  例如 新任务 / 验收 / 急停 / 设预算"
            style={{ width: '100%', background: 'transparent', border: 0, outline: 0, color: '#eef2fb', fontFamily: UI, fontSize: 15, letterSpacing: '0.1px', padding: '15px 17px', borderBottom: '1px solid rgba(255,255,255,.06)' }}
          />
          <div style={{ padding: 5 }}>
            {CMDS.map((c, i) => (
              <div
                key={c.label}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '9px 13px',
                  borderRadius: 8,
                  fontSize: 13,
                  letterSpacing: '0.1px',
                  color: i === sel ? '#eef2fb' : '#aab4cd',
                  background: i === sel ? 'rgba(255,210,122,.14)' : 'transparent',
                }}
              >
                {i === sel && <span style={{ position: 'absolute', left: 3, top: 8, bottom: 8, width: 2.5, borderRadius: 2, background: '#ffd27a', boxShadow: '0 0 8px rgba(255,210,122,.5)' }} />}
                <span>
                  {c.label} <span style={{ color: '#76819c' }}>· {c.hint}</span>
                </span>
                {c.kbd && (
                  <kbd style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 600, color: '#aab4cd', background: 'rgba(8,11,20,.55)', border: '1px solid rgba(255,255,255,.14)', borderBottomWidth: 2, borderRadius: 5, padding: '2px 6px', letterSpacing: '0.5px' }}>{c.kbd}</kbd>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: '#76819c', marginTop: 18, textAlign: 'center' }}>
          选中条 = 琥珀左竖条 + 辉光 · ↑↓ 循环 · Enter 执行 · 键帽 border-bottom 2px 凸起
        </div>
      </div>
    </PreviewFrame>
  );
}
