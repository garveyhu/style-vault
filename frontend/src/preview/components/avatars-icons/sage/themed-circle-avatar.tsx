import { useState } from 'react';
import {
  Bird, Bot, Brain, Cat, Coffee, Crown, Dog, Feather, Fish,
  Ghost, Heart, Pizza, Rabbit, Smile, Star, Sun, User, Wand2,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'green',  hex: '#10b981' },
  { name: 'cyan',   hex: '#22d3ee' },
  { name: 'rose',   hex: '#fb7185' },
  { name: 'violet', hex: '#a78bfa' },
];

const AVATAR_ICONS: Array<[string, React.ComponentType<{ size?: number }>]> = [
  ['user', User],
  ['heart', Heart],
  ['cat', Cat],
  ['star', Star],
  ['feather', Feather],
  ['fish', Fish],
  ['rabbit', Rabbit],
  ['bird', Bird],
  ['dog', Dog],
  ['coffee', Coffee],
  ['crown', Crown],
  ['ghost', Ghost],
  ['smile', Smile],
  ['sun', Sun],
  ['pizza', Pizza],
  ['brain', Brain],
  ['bot', Bot],
  ['wand', Wand2],
];

export default function ThemedCircleAvatarPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [selected, setSelected] = useState('feather');
  const t = THEMES[themeIdx];
  const SelectedIcon = AVATAR_ICONS.find(([k]) => k === selected)?.[1] || User;

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
          白底 + slate-200 描边 + 主题色 lucide 图标 · group-hover 旋转 12°
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={th.name} onClick={() => setThemeIdx(i)} style={{
              width: 24, height: 24, borderRadius: '50%',
              background: th.hex,
              border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 200ms',
              transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
            }} />
          ))}
        </div>

        <Section title="单个 · group hover 旋转 12°">
          <HoverAvatar Icon={SelectedIcon} color={t.hex} />
          <span style={{ fontSize: 14, color: '#64748b' }}>悬停头像 →</span>
        </Section>

        <Section title="侧栏底部用户菜单">
          <SidebarUserRow Icon={SelectedIcon} color={t.hex} />
        </Section>

        <Section title="Avatar Picker · 选中态 ${themeClasses.bg} text-white scale-110">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {AVATAR_ICONS.map(([k, Icon]) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: selected === k ? t.hex : '#f1f5f9',
                  color: selected === k ? '#fff' : '#64748b',
                  border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transform: selected === k ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: selected === k ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 200ms',
                }}
                title={k}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function HoverAvatar({ Icon, color }: { Icon: React.ComponentType<{ size?: number }>; color: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#fff', border: '1px solid #e2e8f0',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color, transform: h ? 'rotate(12deg)' : 'rotate(0deg)',
        transition: 'transform 300ms',
        cursor: 'default',
      }}
    >
      <Icon size={18} />
    </div>
  );
}

function SidebarUserRow({ Icon, color }: { Icon: React.ComponentType<{ size?: number }>; color: string }) {
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
        color, transform: h ? 'rotate(12deg)' : 'rotate(0deg)',
        transition: 'transform 300ms',
      }}>
        <Icon size={18} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: h ? '#0f172a' : '#334155', transition: 'color 200ms' }}>
        archer
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
