import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'blue', hex: '#60a5fa', hover: '#3b82f6' },
  { name: 'green', hex: '#10b981', hover: '#059669' },
  { name: 'cyan', hex: '#22d3ee', hover: '#06b6d4' },
  { name: 'rose', hex: '#fb7185', hover: '#f43f5e' },
];

export default function ThemeBgCtaPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · BUTTON
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Theme Bg CTA
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          ${'{themeClasses.bg} ${themeClasses.bgHover}'} 动态着色 — 切换下面的主题色看效果
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
              title={th.name}
            />
          ))}
        </div>

        <Section title="圆形 · chat 发送 (w-8 h-8 rounded-full)">
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: hover ? t.hover : t.hex,
              color: '#fff', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 200ms',
            }}
          >
            <span style={{ fontSize: 14, marginLeft: -1 }}>➤</span>
          </button>
        </Section>

        <Section title="方形 · form 提交 (px-4 py-2 rounded-lg)">
          <Btn theme={t} label="保存设置" rect />
          <Btn theme={t} label="确认" rect />
          <Btn theme={t} label="禁用态" rect disabled />
        </Section>

        <Section title="登录页固定 emerald (登录前用户没主题色)">
          <button style={{
            background: '#059669', color: '#fff', padding: '10px 24px',
            borderRadius: 10, border: 'none', cursor: 'pointer',
            fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            登录 →
          </button>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Btn({ theme: t, label, rect, disabled }: { theme: typeof THEMES[0]; label: string; rect?: boolean; disabled?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      disabled={disabled}
      style={{
        padding: rect ? '8px 16px' : '8px',
        borderRadius: rect ? 10 : '50%',
        background: disabled ? t.hex : (h ? t.hover : t.hex),
        opacity: disabled ? 0.4 : 1,
        color: '#fff', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13, fontWeight: 500,
        transition: 'all 200ms',
      }}
    >
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 10 }}>{title}</h3>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        {children}
      </div>
    </section>
  );
}
