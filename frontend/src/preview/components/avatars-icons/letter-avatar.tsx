import { PreviewFrame } from '../../_layout';

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA',
];

function Letter({ name, index, size = 40 }: { name: string; index: number; size?: number }) {
  const letter = (name || '?').charAt(0).toUpperCase();
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 999,
        background: bg, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: size * 0.4,
        flexShrink: 0,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {letter}
    </div>
  );
}

const SAMPLES = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Evan',
  'Felicia', 'George', 'Hana', 'Ivan', 'Julia',
  'Kai', 'Liu', 'Max', 'Nina', 'Oscar',
];

export default function LetterAvatarPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · AVATAR</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Letter Avatar</h1>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            12 色轮盘 · size 40
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {SAMPLES.slice(0, 12).map((n, i) => (<Letter key={n} name={n} index={i} />))}
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            size 变体
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Letter name="Small" index={2} size={24} />
            <Letter name="Medium" index={3} size={32} />
            <Letter name="Default" index={4} size={40} />
            <Letter name="Large" index={5} size={56} />
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            配合文字（典型列表条目）
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SAMPLES.slice(0, 5).map((n, i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Letter name={n} index={i} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{n}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>暂无描述</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
