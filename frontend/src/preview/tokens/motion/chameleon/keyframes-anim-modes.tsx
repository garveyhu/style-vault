import { PreviewFrame } from '../../../_layout';
import { Search, FileQuestion, Settings, Database } from 'lucide-react';

const KEYFRAMES = `
@keyframes kf-ping-soft { 0%,100% { opacity: 1 } 50% { opacity: 0.6 } }
@keyframes kf-shimmer { 0% { background-position: -200px 0 } 100% { background-position: 200px 0 } }
@keyframes kf-float-soft { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
@keyframes kf-halo-pulse { 0%,100% { transform: scale(1); opacity: 0.6 } 50% { transform: scale(1.12); opacity: 1 } }
@keyframes kf-global-progress { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
@keyframes kf-decor-drift-2 { 0%,100% { translate: 0 0; rotate: 0deg } 50% { translate: 0 -8px; rotate: 8deg } }
`;

const KEYFRAME_ROWS = [
  { name: 'accordion-down/up', spec: 'height 0 ↔ var(--radix-…) · 0.2s ease-out', use: 'Radix Accordion' },
  { name: 'modal-overlay-in/out', spec: 'opacity 0↔1 · 150ms ease-out / 120ms ease-in', use: 'Dialog 遮罩' },
  { name: 'modal-content-in/out', spec: 'opacity 0↔1 · 150ms cubic-bezier(.16,1,.3,1)', use: 'Dialog 内容（无 translate）' },
  { name: 'ping-soft', spec: 'opacity 1→.6 · 2s ease-in-out', use: '.pulse-soft 状态点' },
  { name: 'shimmer', spec: 'bg-position -200px→200px · 1.6s', use: '.skeleton 骨架' },
  { name: 'float-soft', spec: 'translateY 0→-7px · 3.4s', use: '.anim-float 空态图标' },
  { name: 'halo-pulse', spec: 'scale 1→1.12 · opacity .6→1 · 3s', use: '.anim-halo 辉光' },
  { name: 'global-progress', spec: 'translateX -100%→100%', use: '顶部进度带' },
  { name: 'decor-drift-1/2/3', spec: 'translate ±12/8/14px · rotate 8/45→50deg', use: '登录浮件' },
];

const ANIM_MODES = [
  { mode: 'disabled', spec: 'transition/animation-duration 0ms !important · iteration 1', desc: '无障碍 / 性能 / 调试' },
  { mode: 'agile', spec: '* 80ms · :hover/:focus 100ms !important', desc: '过渡缩到约 ½，回弹更快' },
  { mode: 'smooth', spec: '（默认态，不写覆盖）', desc: '常态平滑' },
];

const CMDK_ITEMS = [
  { icon: Search, label: '搜索工作流…', selected: true },
  { icon: Database, label: '打开知识库', selected: false },
  { icon: Settings, label: '前往设置', selected: false },
];

export default function KeyframesAnimModes() {
  return (
    <PreviewFrame bg="#fafaf7">
      <style>{KEYFRAMES}</style>
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          TOKEN · MOTION
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Chameleon Keyframes + Anim Modes
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          全站 CSS 动效集（modal fade / 空态漂浮辉光 / 暖灰 shimmer / 命令面板）+ :root[data-anim] 三档速度切换
        </p>

        {/* 顶部进度带 */}
        <Section title="顶部 indeterminate 进度带 · global-progress">
          <div style={{ width: '100%', height: 2, background: '#f4f3ee', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0, width: '40%',
              background: 'linear-gradient(90deg, transparent, #3b82f6 40%, #2563eb 60%, transparent)',
              animation: 'kf-global-progress 1.1s ease-in-out infinite',
            }} />
          </div>
        </Section>

        {/* 实时动效预览 */}
        <Section title="实时动效 · 空态 / 骨架 / 状态点 / 登录浮件">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}>
            {/* 空态 float + halo */}
            <Cell label=".anim-float + .anim-halo">
              <div style={{ position: 'relative', width: 56, height: 56, display: 'grid', placeItems: 'center' }}>
                <div style={{
                  position: 'absolute', inset: 6, borderRadius: 9999, background: '#dbeafe',
                  animation: 'kf-halo-pulse 3s ease-in-out infinite',
                }} />
                <div style={{ position: 'relative', animation: 'kf-float-soft 3.4s ease-in-out infinite' }}>
                  <FileQuestion size={24} color="#2563eb" strokeWidth={2} />
                </div>
              </div>
            </Cell>
            {/* skeleton */}
            <Cell label=".skeleton">
              <div style={{ width: 120 }}>
                {[100, 70, 88].map((w, i) => (
                  <div key={i} style={{
                    height: 9, width: `${w}%`, borderRadius: 4, marginBottom: 7,
                    background: 'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)',
                    backgroundSize: '400px 100%',
                    animation: 'kf-shimmer 1.6s ease-in-out infinite',
                  }} />
                ))}
              </div>
            </Cell>
            {/* 状态点 */}
            <Cell label=".pulse-soft">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#44403c' }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#10b981',
                  boxShadow: '0 0 0 2px rgb(16 185 129 / 15%)',
                  animation: 'kf-ping-soft 2s ease-in-out infinite',
                }} />
                运行中
              </div>
            </Cell>
            {/* decor drift */}
            <Cell label="decor-drift-2">
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: '#fffefb',
                border: '1px solid #e7e5e0', boxShadow: '0 1px 2px rgb(0 0 0 / 4%)',
                animation: 'kf-decor-drift-2 8s ease-in-out infinite',
              }} />
            </Cell>
          </div>
        </Section>

        {/* keyframe 清单 */}
        <Section title="Keyframe 清单">
          <div style={{ width: '100%', borderRadius: 12, border: '1px solid #e7e5e0', overflow: 'hidden', background: '#fffefb' }}>
            {KEYFRAME_ROWS.map((r, i) => (
              <div key={r.name} style={{
                display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 14px',
                borderTop: i === 0 ? 'none' : '1px solid #f5f4ee',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontWeight: 500, color: '#1c1917', minWidth: 168 }}>{r.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c', flex: 1 }}>{r.spec}</div>
                <div style={{ fontSize: 11, color: '#a8a29e' }}>{r.use}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* cmdk 命令面板 */}
        <Section title="cmdk 命令面板样式">
          <div style={{
            width: 280, borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb',
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', padding: 6,
          }}>
            <div style={{
              padding: '6px 10px 4px', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.04em', color: 'rgb(120 113 108)',
            }}>
              快捷操作
            </div>
            {CMDK_ITEMS.map(it => {
              const Icon = it.icon;
              return (
                <div key={it.label} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 6,
                  fontSize: 12.5,
                  background: it.selected ? 'rgb(239 246 255)' : 'transparent',
                  color: it.selected ? 'rgb(29 78 216)' : '#44403c',
                }}>
                  <Icon size={14} strokeWidth={2} color={it.selected ? '#1d4ed8' : '#78716c'} />
                  {it.label}
                </div>
              );
            })}
          </div>
        </Section>

        {/* anim modes */}
        <Section title=":root[data-anim] 三档全局过渡时长切换">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', width: '100%' }}>
            {ANIM_MODES.map(m => (
              <div key={m.mode} style={{
                flex: 1, minWidth: 200, borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb',
                padding: 14, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: '#2563eb' }}>
                  data-anim="{m.mode}"
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', marginTop: 6, lineHeight: 1.5 }}>{m.spec}</div>
                <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 6 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', padding: 16,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 150,
      boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
    }}>
      <div style={{ minHeight: 56, display: 'grid', placeItems: 'center' }}>{children}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c' }}>{label}</div>
    </div>
  );
}
