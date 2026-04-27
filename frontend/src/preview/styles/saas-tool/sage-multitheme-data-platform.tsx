import { Bot, Database, Globe, Send, Sparkles, Tv } from 'lucide-react';
import { PreviewFrame } from '../../_layout';

// 12 主题色 × 3 档明度
const THEMES: Array<{ name: string; hex: string; light: string; selection: string }> = [
  { name: 'blue',   hex: '#60a5fa', light: '#93c5fd', selection: '#bfdbfe' },
  { name: 'green',  hex: '#10b981', light: '#34d399', selection: '#a7f3d0' },
  { name: 'yellow', hex: '#fbbf24', light: '#fcd34d', selection: '#fde68a' },
  { name: 'pink',   hex: '#f472b6', light: '#f9a8d4', selection: '#fbcfe8' },
  { name: 'orange', hex: '#fb923c', light: '#fdba74', selection: '#fed7aa' },
  { name: 'gray',   hex: '#64748b', light: '#94a3b8', selection: '#e2e8f0' },
  { name: 'purple', hex: '#a78bfa', light: '#c4b5fd', selection: '#ddd6fe' },
  { name: 'red',    hex: '#f87171', light: '#fca5a5', selection: '#fecaca' },
  { name: 'indigo', hex: '#818cf8', light: '#a5b4fc', selection: '#c7d2fe' },
  { name: 'teal',   hex: '#2dd4bf', light: '#5eead4', selection: '#99f6e4' },
  { name: 'cyan',   hex: '#22d3ee', light: '#67e8f9', selection: '#a5f3fc' },
  { name: 'rose',   hex: '#fb7185', light: '#fda4af', selection: '#fecdd3' },
];

const RGB_LADDER = [231, 237, 239, 242, 244, 246, 249, 251, 252];
const SLATE = [
  { name: 'slate-800', hex: '#1e293b', use: 'fg-strong · 标题' },
  { name: 'slate-600', hex: '#475569', use: 'fg-body · 正文' },
  { name: 'slate-500', hex: '#64748b', use: 'fg-muted · 描述' },
  { name: 'slate-400', hex: '#94a3b8', use: 'fg-subtle · 元信息' },
  { name: 'slate-200', hex: '#e2e8f0', use: 'border' },
  { name: 'slate-100', hex: '#f1f5f9', use: 'border-soft' },
];

const FLOW_CSS = `
@keyframes sv-sage-flow {
  from { background-position: 300% 50%; }
  to   { background-position: 0% 50%; }
}
@keyframes sv-sage-pulse {
  0%, 100% { box-shadow: 0 0 8px 0 rgba(16,185,129,0.30); }
  50%      { box-shadow: 0 0 16px 2px rgba(16,185,129,0.50); }
}
@keyframes sv-sage-stripes { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }
`;

export default function SageMultiThemePreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <style>{FLOW_CSS}</style>
      <div style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#1e293b',
        padding: 48,
        maxWidth: 1200, margin: '0 auto',
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          STYLE · SAAS-TOOL
        </div>
        <h1 style={{
          fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em',
          lineHeight: 1.15, margin: '8px 0 24px', maxWidth: 920,
        }}>
          Sage{' '}
          <span style={{
            backgroundImage: 'linear-gradient(90deg, #60a5fa, #10b981, #fbbf24, #f472b6, #fb923c, #a78bfa, #818cf8, #2dd4bf, #22d3ee, #fb7185, #60a5fa, #10b981)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'sv-sage-flow 14s linear infinite',
          }}>Multi-Theme</span>{' '}
          Data Platform
        </h1>
        <p style={{
          fontSize: 18, color: '#64748b',
          marginTop: 0, marginBottom: 48, maxWidth: 720, lineHeight: 1.7,
        }}>
          12 主题色用户切换 · 9 阶手调 RGB 灰阶 · Inter 单字体 · tailwindcss-animate
          + 7 段 styled keyframes · 雪人飘雪 FAB 与复古 CRT 404 两处彩蛋——给"严肃数据
          分析"加了一点"愿意陪你玩"的体温。
        </p>

        {/* Palette · 12 主题色 + 9 阶灰 + slate */}
        <Section label="Palette · 12 主题色 spectrum">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 24 }}>
            {THEMES.map(t => (
              <div key={t.name} style={{
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: 10, padding: 10,
              }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  <div title="hex" style={{ flex: 1, height: 28, background: t.hex, borderRadius: 4 }} />
                  <div title="light" style={{ flex: 1, height: 28, background: t.light, borderRadius: 4 }} />
                  <div title="selection" style={{ flex: 1, height: 28, background: t.selection, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                <div style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{t.hex}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 8 }}>
                9 阶手调 RGB 灰阶
              </div>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                {RGB_LADDER.map(v => (
                  <div
                    key={v}
                    title={`rgb(${v},${v},${v})`}
                    style={{
                      flex: 1, height: 56,
                      background: `rgb(${v},${v},${v})`,
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                      padding: 4,
                      fontSize: 9, color: '#64748b',
                      fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, lineHeight: 1.6 }}>
                Tailwind slate-50/100 之间不够细——sage 手调 9 阶让侧栏 idle / hover / selected 微差全靠这套
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 8 }}>
                Slate scale · 文字 / 边框
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {SLATE.map(s => (
                  <div key={s.name} style={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: 8, padding: 8,
                  }}>
                    <div style={{ height: 18, background: s.hex, borderRadius: 3 }} />
                    <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, color: '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{s.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section label="Typography · Inter 单字体栈">
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 16, padding: 28,
          }}>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0f172a' }}>
              Inter · 唯一英文字体
            </div>
            <div style={{
              fontSize: 14, fontWeight: 500, color: '#475569',
              marginTop: 10, lineHeight: 1.7,
            }}>
              CJK 由系统 fallback 接管 · 不引入第二字体 · 不分代码 / 正文 / 展示
            </div>

            <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap', alignItems: 'baseline' }}>
              {[
                { sz: 12, w: 600, lab: 'text-xs · meta caps', sample: 'CHATS · DATA SOURCE', upper: true },
                { sz: 14, w: 500, lab: 'text-sm · 正文 / form label', sample: '本月销售前 10 名' },
                { sz: 16, w: 400, lab: 'text-base · ChatInput', sample: '问点什么吧?' },
                { sz: 24, w: 700, lab: 'text-2xl · page title', sample: '数据源' },
                { sz: 30, w: 700, lab: 'text-3xl · 大标题', sample: '欢迎回来' },
              ].map(s => (
                <div key={s.lab}>
                  <div style={{
                    fontSize: s.sz, fontWeight: s.w as 400 | 500 | 600 | 700,
                    color: '#0f172a', letterSpacing: s.upper ? '0.05em' : 'normal',
                    textTransform: s.upper ? 'uppercase' : 'none',
                  }}>{s.sample}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'ui-monospace, SFMono-Regular, monospace', marginTop: 4 }}>
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Radius / Shadow / Border */}
        <Section label="Radius / Shadow / Border">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Card title="rounded-xl" sub="12px · 卡片默认" radius={12} />
            <Card title="rounded-2xl" sub="16px · admin overlay / login" radius={16} shadow="0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)" />
            <Card title="rounded-3xl" sub="24px · delete confirm" radius={24} shadow="0 25px 50px -12px rgba(0,0,0,0.25)" />
            <Card title="rounded-[24px]" sub="ChatInput 真值" radius={24} glow="#10b981" />
            <Card title="border slate-200" sub="1px hairline · 主分割" border solid />
            <Card title="border slate-100" sub="底部分割（淡）" borderLight />
          </div>
        </Section>

        {/* Signature moments */}
        <Section label="Signature moments">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <Moment Icon={Sparkles} title="霓虹光晕 textarea" desc="rounded-[24px] + 双层 box-shadow（4px 内 + 15px 外）打主题色霓虹光晕" />
            <Moment Icon={Globe} title="雪人飘雪 RevolverMenu" desc="64×64 圆形 FAB · 内环 4 + 外环最多 12 项 · pin 后 8s 自转 + 30 朵雪花飘落" />
            <Moment Icon={Tv} title="复古 CRT 404" desc="纯 CSS 橘色 CRT 电视机 · 天线 + 旋钮 + 喇叭 + 雪花信号 / 彩条 RGB 测试图样" />
            <Moment Icon={Bot} title="主题头像 + 旋转 12°" desc="圆形白底 + slate-200 描边 + 主题色 lucide 图标 · group-hover 旋转 12°" />
            <Moment Icon={Send} title="停止生成 · 三层脉冲按钮" desc="外发光 blur-lg + 中环 ping + 主体 ${themeClasses.bg} + 顶部白色斜向 sheen" />
            <Moment Icon={Database} title="119 处主题色动态着色" desc="THEME_CLASSES[themeColor] 查表注入到 CTA / focus / 选中 / 进度条 / 头像图标" />
          </div>
        </Section>

        {/* Motion · animate-in + keyframes */}
        <Section label="Motion · animate-in + 7 段 styled keyframes">
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: 20,
          }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                'animate-in fade-in zoom-in-95 duration-100',
                'animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300',
                'animate-in fade-in slide-in-from-left-2 duration-150',
                'animate-spin · 1s',
                'animate-pulse · 2s',
                'animate-ping · 1s',
              ].map(s => (
                <span key={s} style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: '#10b9811A', color: '#10b981',
                  fontSize: 11, fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  border: '1px solid #10b9814D',
                }}>{s}</span>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 10 }}>
                7 段 styled-components keyframes
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8,
                fontSize: 10, fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                color: '#475569',
              }}>
                {[
                  ['bling',     '1s'],
                  ['earthSpin', '8s'],
                  ['snowFall',  '4-12s'],
                  ['wobble',    '0.6s'],
                  ['shimmer',   '1.5s'],
                  ['pulse',     '2s'],
                  ['stripes',   '1s'],
                ].map(([n, d]) => (
                  <div key={n} style={{
                    background: '#f8fafc', borderRadius: 6, padding: 8,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{n}</div>
                    <div style={{ color: '#94a3b8', marginTop: 2 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Stack tag */}
        <div style={{
          marginTop: 32, paddingTop: 24,
          borderTop: '1px solid #f1f5f9',
          display: 'flex', flexWrap: 'wrap', gap: 8,
        }}>
          {[
            'react-antd-tailwind',
            'styled-components',
            'lucide-react',
            'tailwindcss-animate',
            'inter font',
            'rgb-ladder · 9 阶',
            'theme-classes · 12 色',
          ].map(s => (
            <span key={s} style={{
              padding: '4px 10px', borderRadius: 999,
              background: '#f1f5f9', color: '#475569',
              fontSize: 11, fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            }}>{s}</span>
          ))}
        </div>

      </div>
    </PreviewFrame>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h3 style={{
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 2,
        color: '#64748b', marginBottom: 16, fontWeight: 600,
      }}>{label}</h3>
      {children}
    </section>
  );
}

function Card({
  title, sub, radius = 12, shadow, glow, border, borderLight, solid: _solid,
}: {
  title: string; sub: string; radius?: number; shadow?: string; glow?: string;
  border?: boolean; borderLight?: boolean; solid?: boolean;
}) {
  return (
    <div style={{
      width: 180, padding: 18,
      background: '#fff',
      border: borderLight ? '1px solid #f1f5f9' : '1px solid #e2e8f0',
      borderRadius: radius,
      boxShadow: glow ? `0 0 4px ${glow}66, 0 0 15px ${glow}33` : shadow,
      borderColor: glow ? `${glow}80` : (borderLight ? '#f1f5f9' : '#e2e8f0'),
    }}>
      <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
        {title}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: '#0f172a' }}>{sub}</div>
      {border && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #e2e8f0', fontSize: 11, color: '#94a3b8' }}>
          底部分割
        </div>
      )}
    </div>
  );
}

function Moment({ Icon, title, desc }: {
  Icon: React.ComponentType<{ size?: number }>; title: string; desc: string;
}) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 12, padding: 16,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: '#10b9811A', color: '#10b981',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}><Icon size={18} /></span>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}
