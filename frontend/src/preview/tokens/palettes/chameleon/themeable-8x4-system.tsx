import { PreviewFrame } from '../../../_layout';
import { Check } from 'lucide-react';

const PRIMARY = [
  { name: 'blue', c50: '#eff6ff', c500: '#3b82f6', c600: '#2563eb', c700: '#1d4ed8', def: true },
  { name: 'purple', c50: '#faf5ff', c500: '#a855f7', c600: '#9333ea', c700: '#7e22ce' },
  { name: 'green', c50: '#ecfdf5', c500: '#10b981', c600: '#059669', c700: '#047857' },
  { name: 'orange', c50: '#fff7ed', c500: '#f97316', c600: '#ea580c', c700: '#c2410c' },
  { name: 'rose', c50: '#fff1f2', c500: '#f43f5e', c600: '#e11d48', c700: '#be123c' },
  { name: 'cyan', c50: '#ecfeff', c500: '#06b6d4', c600: '#0891b2', c700: '#0e7490' },
  { name: 'amber', c50: '#fffbeb', c500: '#f59e0b', c600: '#d97706', c700: '#b45309' },
  { name: 'teal', c50: '#f0fdfa', c500: '#14b8a6', c600: '#0d9488', c700: '#0f766e' },
];

const NEUTRAL = [
  { name: 'stone', warm: '#fafaf7', warm2: '#f4f3ee', paper: '#fffefb', ink: '#1c1917', def: true },
  { name: 'slate', warm: '#f8fafc', warm2: '#f1f5f9', paper: '#ffffff', ink: '#0f172a' },
  { name: 'zinc', warm: '#fafafa', warm2: '#f4f4f5', paper: '#ffffff', ink: '#18181b' },
  { name: 'gray', warm: '#f9fafb', warm2: '#f3f4f6', paper: '#ffffff', ink: '#111827' },
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
          运行时 data-attribute 切换 · 8 primary × 4 neutral · 默认 = 暖纸墨蓝 (blue + stone)
        </p>

        {/* 8 primary 调色板 */}
        <Section title="8 primary 调色板 · :root[data-primary]（锚 50 / 500 / 600 / 700）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, width: '100%' }}>
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
                <div style={{ display: 'flex', gap: 4 }}>
                  {[p.c50, p.c500, p.c600, p.c700].map((c, i) => (
                    <div key={i} style={{ flex: 1, height: 28, borderRadius: 6, background: c, border: '1px solid rgb(0 0 0 / 8%)' }} />
                  ))}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#78716c', marginTop: 5, fontVariantNumeric: 'tabular-nums' }}>
                  600 {p.c600}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4 neutral 基底 —— 模拟一张卡浮在页面底上 */}
        <Section title="4 neutral 基底 · :root[data-neutral]（warm / warm-2 / paper / ink）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10, width: '100%' }}>
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
                  {/* 卡片 paper 浮在 warm 上 */}
                  <div style={{
                    background: n.paper, border: `1px solid ${n.warm2}`, borderRadius: 8, padding: '8px 10px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: n.ink }}>卡片 paper</div>
                    <div style={{ fontSize: 10.5, color: '#78716c', marginTop: 2 }}>warm &lt; paper 微对比</div>
                  </div>
                </div>
                {/* hex 行 */}
                <div style={{ background: n.warm2, padding: '6px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#78716c' }}>
                  {n.warm} · {n.paper} · {n.ink}
                </div>
              </div>
            ))}
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}
