import { PreviewFrame } from '../../../_layout';
import { Check } from 'lucide-react';

// 每个 primary 完整 10 阶 50..900（index.css blue / theme.css 其余 7 色）
const PRIMARY: { name: string; def?: boolean; ramp: string[] }[] = [
  { name: 'blue', def: true, ramp: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'] },
  { name: 'purple', ramp: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87'] },
  { name: 'green', ramp: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'] },
  { name: 'orange', ramp: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'] },
  { name: 'rose', ramp: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337'] },
  { name: 'cyan', ramp: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'] },
  { name: 'amber', ramp: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'] },
  { name: 'teal', ramp: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'] },
];

const STAGES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// blue 默认 @theme 的语义角色 —— 100 focus ring/选中底 / 500 focus border / 700 hover / 600 CTA·链接·active
const PRIMARY_ROLES = [
  { stage: '100', hex: '#dbeafe', role: 'focus ring / 选中底' },
  { stage: '500', hex: '#3b82f6', role: 'focus border' },
  { stage: '600', hex: '#2563eb', role: 'CTA / 链接 / active' },
  { stage: '700', hex: '#1d4ed8', role: 'hover' },
];

const NEUTRAL = [
  { name: 'stone', warm: '#fafaf7', warm2: '#f4f3ee', paper: '#fffefb', ink: '#1c1917', def: true },
  { name: 'slate', warm: '#f8fafc', warm2: '#f1f5f9', paper: '#ffffff', ink: '#0f172a' },
  { name: 'zinc', warm: '#fafafa', warm2: '#f4f4f5', paper: '#ffffff', ink: '#18181b' },
  { name: 'gray', warm: '#f9fafb', warm2: '#f3f4f6', paper: '#ffffff', ink: '#111827' },
];

// :root[data-anim] 三档 + reduced-motion
const ANIM = [
  { name: 'disabled', dur: '0ms', note: 'transition / animation 全 0ms !important' },
  { name: 'agile', dur: '80ms', note: '默认 80ms · hover/focus 100ms !important' },
  { name: 'smooth', dur: '默认', note: '不覆盖（CSS 原生时长）', def: true },
];

const SEMANTIC = [
  { name: 'success', hex: '#10b981' },
  { name: 'warning', hex: '#f59e0b' },
  { name: 'danger', hex: '#ef4444' },
  { name: 'info', hex: '#06b6d4' },
];

const SCORE = [
  { range: '≥ 0.8', fg: '#059669', bg: '#ecfdf5', label: 'emerald' },
  { range: '0.5–0.8', fg: '#d97706', bg: '#fffbeb', label: 'amber' },
  { range: '< 0.5', fg: '#dc2626', bg: '#fef2f2', label: 'red' },
  { range: '空', fg: '#a8a29e', bg: '#f5f5f4', label: 'stone' },
];

export default function Themeable8x4System() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          TOKEN · PALETTE · SIGNATURE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Themeable 8×4 System
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          运行时 data-attribute 切换 · 8 primary × 4 neutral × 3 anim · 默认 = 暖纸墨蓝 (blue + stone)
        </p>

        {/* 8 primary 调色板 —— 每板满 50..900 十色阶色带 */}
        <Section title="8 primary 调色板 · :root[data-primary]（全 10 阶 50..900）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10, width: '100%' }}>
            {PRIMARY.map(p => (
              <div key={p.name} style={{
                borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', padding: 12,
                boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: '#1c1917' }}>{p.name}</span>
                  {p.def && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 9.5, color: '#1d4ed8',
                      background: '#eff6ff', borderRadius: 4, padding: '1px 5px',
                    }}>
                      <Check size={10} strokeWidth={2.5} /> 默认
                    </span>
                  )}
                </div>
                {/* 10 阶色带 */}
                <div style={{ display: 'flex', gap: 2 }}>
                  {p.ramp.map((c, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ height: 26, borderRadius: 4, background: c, border: '1px solid rgb(0 0 0 / 8%)' }} />
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 7.5, textAlign: 'center', color: i < 5 ? '#a8a29e' : '#78716c' }}>{STAGES[i]}</div>
                    </div>
                  ))}
                </div>
                {p.def && (
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#78716c', marginTop: 5 }}>
                    600 {p.ramp[6]} · 700 {p.ramp[7]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* primary 交互态语义角色（blue 默认） */}
        <Section title="primary 交互态语义角色 · @theme blue 默认">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {/* focus ring/选中底 100 */}
            <RoleCard stage="100" hex="#dbeafe" role="focus ring / 选中底">
              <span style={{ borderRadius: 6, background: '#dbeafe', padding: '6px 12px', fontSize: 12, color: '#1d4ed8', boxShadow: '0 0 0 3px #dbeafe' }}>选中项</span>
            </RoleCard>
            {/* focus border 500 */}
            <RoleCard stage="500" hex="#3b82f6" role="focus border">
              <span style={{ borderRadius: 6, border: '1px solid #3b82f6', background: '#fff', padding: '6px 12px', fontSize: 12, color: '#44403c', boxShadow: 'inset 0 0 0 1px rgb(59 130 246 / 0.35)' }}>聚焦输入</span>
            </RoleCard>
            {/* CTA/链接/active 600 */}
            <RoleCard stage="600" hex="#2563eb" role="CTA / 链接 / active">
              <span style={{ borderRadius: 6, background: '#2563eb', padding: '6px 12px', fontSize: 12, fontWeight: 500, color: '#fff' }}>主按钮</span>
            </RoleCard>
            {/* hover 700 */}
            <RoleCard stage="700" hex="#1d4ed8" role="hover">
              <span style={{ borderRadius: 6, background: '#1d4ed8', padding: '6px 12px', fontSize: 12, fontWeight: 500, color: '#fff' }}>悬停态</span>
            </RoleCard>
          </div>
          {/* 角色清单 */}
          <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap', width: '100%' }}>
            {PRIMARY_ROLES.map(r => (
              <span key={r.stage} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 999, border: '1px solid #e7e5e0', background: '#fffefb', padding: '3px 8px', fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#78716c' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: r.hex, border: '1px solid rgb(0 0 0 / 8%)' }} />
                {r.stage} → {r.role}
              </span>
            ))}
          </div>
        </Section>

        {/* 4 neutral 基底 —— 模拟一张卡浮在页面底上 */}
        <Section title="4 neutral 基底 · :root[data-neutral]（warm / warm-2 / paper / ink）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, width: '100%' }}>
            {NEUTRAL.map(n => (
              <div key={n.name} style={{
                borderRadius: 12, border: '1px solid #e7e5e0', overflow: 'hidden',
                boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
              }}>
                {/* 页面底 warm */}
                <div style={{ background: n.warm, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: n.ink }}>{n.name}</span>
                    {n.def && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 9.5, color: '#1d4ed8',
                        background: '#eff6ff', borderRadius: 4, padding: '1px 5px',
                      }}>
                        <Check size={10} strokeWidth={2.5} /> 默认
                      </span>
                    )}
                  </div>
                  {/* 卡片 paper 浮在 warm 上，warm-2 作描边 */}
                  <div style={{
                    background: n.paper, border: `1px solid ${n.warm2}`, borderRadius: 8, padding: '8px 10px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: n.ink }}>卡片 paper</div>
                    <div style={{ fontSize: 10.5, color: '#78716c', marginTop: 2 }}>warm &lt; warm-2 &lt; paper 微对比</div>
                  </div>
                </div>
                {/* hex 行 —— warm · warm-2 · paper · ink 四值 */}
                <div style={{ background: n.warm2, padding: '6px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: 8.5, color: '#78716c', lineHeight: 1.5 }}>
                  {n.warm} · {n.warm2}<br />{n.paper} · {n.ink}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* anim 动效档位 + reduced-motion */}
        <Section title="anim 动效档位 · :root[data-anim] 3 档（含 reduced-motion）">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ANIM.map(a => (
              <div key={a.name} style={{
                minWidth: 180, flex: '0 1 200px', borderRadius: 10, border: '1px solid #e7e5e0', background: '#fffefb', padding: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: '#1c1917' }}>{a.name}</span>
                  {a.def && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 9.5, color: '#1d4ed8', background: '#eff6ff', borderRadius: 4, padding: '1px 5px' }}>
                      <Check size={10} strokeWidth={2.5} /> 默认
                    </span>
                  )}
                  <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600, color: '#2563eb' }}>{a.dur}</span>
                </div>
                <div style={{ fontSize: 10.5, color: '#78716c', marginTop: 4, lineHeight: 1.4 }}>{a.note}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 2, width: '100%', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a8a29e' }}>
            reduced-motion → transition-duration 100ms !important
          </div>
        </Section>

        {/* 语义 4 色（固定） */}
        <Section title="语义 4 色（跨主题恒定，不进切换）">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SEMANTIC.map(s => (
              <div key={s.name} style={{ minWidth: 100, flex: '0 1 120px' }}>
                <div style={{ background: s.hex, height: 48, borderRadius: 8, border: '1px solid rgb(0 0 0 / 8%)' }} />
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: '#1c1917' }}>{s.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#78716c' }}>{s.hex}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* score 色阶 */}
        <Section title="score 色阶（评测复用）">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SCORE.map(s => (
              <div key={s.range} style={{
                background: s.bg, color: s.fg, borderRadius: 8, padding: '8px 14px', minWidth: 110,
                border: '1px solid rgb(0 0 0 / 6%)',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{s.range}</div>
                <div style={{ fontSize: 10.5, opacity: 0.8, marginTop: 2 }}>{s.label}-600 / 50</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function RoleCard({ stage, hex, role, children }: { stage: string; hex: string; role: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 130 }}>
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 40 }}>{children}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#78716c' }}>
        <span style={{ color: '#1c1917', fontWeight: 600 }}>{stage}</span> {hex}
      </div>
      <div style={{ fontSize: 10, color: '#a8a29e' }}>{role}</div>
    </div>
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
