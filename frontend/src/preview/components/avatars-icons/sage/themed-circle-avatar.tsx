import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'green', hex: '#10b981' },
  { name: 'cyan', hex: '#22d3ee' },
  { name: 'rose', hex: '#fb7185' },
  { name: 'violet', hex: '#a78bfa' },
];

const ICONS = ['👤', '❤', '🐱', '⭐', '🌿', '🦊', '🦄', '☕', '🎨', '🎯'];

export default function ThemedCircleAvatarPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [selected, setSelected] = useState('🌿');
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · AVATAR
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Themed Circle Avatar
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          白底 + slate-200 描边 + 主题色 lucide 图标 · hover 旋转 12°
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: th.hex,
                border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        <Section title="单个 · group hover 时旋转 12°">
          <HoverAvatar icon={selected} color={t.hex} />
          <span style={{ fontSize: 14, color: '#64748b' }}>悬停头像 →</span>
        </Section>

        <Section title="侧栏底部用户菜单">
          <SidebarUserRow icon={selected} color={t.hex} />
        </Section>

        <Section title="Avatar Picker · 选中态 ring + scale-110">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {ICONS.map(ic => (
              <button
                key={ic}
                onClick={() => setSelected(ic)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: selected === ic ? t.hex : '#f1f5f9',
                  color: selected === ic ? '#fff' : '#64748b',
                  border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transform: selected === ic ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: selected === ic ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 200ms',
                  fontSize: 14,
                }}
              >
                {ic}
              </button>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function HoverAvatar({ icon, color }: { icon: string; color: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#fff', border: '1px solid #e2e8f0',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color, fontSize: 14,
        transform: h ? 'rotate(12deg)' : 'rotate(0deg)',
        transition: 'transform 300ms',
        cursor: 'default',
      }}
    >
      {icon}
    </div>
  );
}

function SidebarUserRow({ icon, color }: { icon: string; color: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '6px 8px', borderRadius: 10,
        background: h ? 'rgb(237,237,237)' : 'transparent',
        cursor: 'pointer', transition: 'background 200ms',
        width: 240,
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#fff', border: '1px solid #e2e8f0',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color, fontSize: 14,
        transform: h ? 'rotate(12deg)' : 'rotate(0deg)',
        transition: 'transform 300ms',
      }}>{icon}</div>
      <span style={{ fontSize: 13, fontWeight: 500, color: h ? '#0f172a' : '#334155', transition: 'color 200ms' }}>
        archer · 创建者
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>{title}</h3>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        {children}
      </div>
    </section>
  );
}
