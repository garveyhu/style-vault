import { useState } from 'react';
import { Send } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'blue',   tw: 'blue',    bg: '#60a5fa', bgHover: '#3b82f6' },
  { name: 'green',  tw: 'emerald', bg: '#10b981', bgHover: '#059669' },
  { name: 'cyan',   tw: 'cyan',    bg: '#22d3ee', bgHover: '#06b6d4' },
  { name: 'rose',   tw: 'rose',    bg: '#fb7185', bgHover: '#f43f5e' },
];

export default function ThemeBgCtaPreview() {
  const [themeIdx, setThemeIdx] = useState(1);
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
          <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
            ${'{themeClasses.bg} ${themeClasses.bgHover}'}
          </code>{' '}
          动态着色 — 切换下面的主题色看效果
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 24, height: 24, borderRadius: '50%',
                background: th.bg,
                border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
              title={th.name}
            />
          ))}
        </div>

        <Section title="圆形 · chat 发送 · w-8 h-8 rounded-full">
          <CircleSend t={t} />
        </Section>

        <Section title="方形 · form 提交 · px-4 py-2 rounded-lg font-medium">
          <RectBtn t={t} label="保存设置" />
          <RectBtn t={t} label="确认" />
          <RectBtn t={t} label="禁用态" disabled />
        </Section>

        <Section title="登录页固定 emerald-600 · w-full py-2 rounded-lg">
          <button style={{
            background: '#059669', color: '#fff', padding: '8px 24px',
            borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 500, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'background 200ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#047857'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#059669'; }}
          >
            登录
          </button>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function CircleSend({ t }: { t: typeof THEMES[0] }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: h ? t.bgHover : t.bg,
        color: '#fff', border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 200ms',
      }}
    >
      <Send size={16} style={{ marginLeft: -2, marginTop: 2 }} />
    </button>
  );
}

function RectBtn({ t, label, disabled }: { t: typeof THEMES[0]; label: string; disabled?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        background: disabled ? t.bg : (h ? t.bgHover : t.bg),
        opacity: disabled ? 0.4 : 1,
        color: '#fff', border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 14, fontWeight: 500,
        transition: 'all 200ms',
      }}
    >
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 10 }}>{title}</h3>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {children}
      </div>
    </section>
  );
}
