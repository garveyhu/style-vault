import { PreviewFrame } from '../../../_layout';

type Shadow = {
  name: string;
  value: string;
  note: string;
  demoBg?: string;
};

const STATIC: Shadow[] = [
  {
    name: 'shadow-ambient',
    value: '0 1px 4px rgba(0,0,0,0.04)',
    note: '永远在场的容器（navbar pill）',
  },
  {
    name: 'shadow-glass',
    value: '0 1px 3px rgba(0,0,0,0.04)',
    note: '玻璃层底',
  },
  {
    name: 'shadow-card (default)',
    value: 'none',
    note: '卡片静态无阴影，只靠 border-gray-200',
  },
];

const HOVER: Shadow[] = [
  {
    name: 'shadow-md (hover)',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    note: 'Tailwind 默认 md · 卡片 / 分页 active',
  },
  {
    name: 'shadow-lg (float)',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    note: 'Popover / Dropdown 浮层',
  },
];

const PULSE: Shadow[] = [
  {
    name: 'shadow-pulse-ok',
    value: '0 0 8px rgba(16,185,129,0.8)',
    note: '"systems operational" emerald 辉光',
    demoBg: '#10b981',
  },
  {
    name: 'shadow-pulse-teal',
    value: '0 0 8px rgba(20,184,166,0.3)',
    note: '头像 / tag 辉光',
    demoBg: '#14b8a6',
  },
];

function Card({ s }: { s: Shadow }) {
  return (
    <div style={{ width: 240 }}>
      <div
        style={{
          height: 100,
          background: s.demoBg || '#fff',
          boxShadow: s.value === 'none' ? undefined : s.value,
          border: s.demoBg ? 'none' : '1px solid #e5e7eb',
          borderRadius: 16,
          margin: 16,
        }}
      />
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginLeft: 16 }}>{s.name}</div>
      <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#9ca3af', marginLeft: 16, marginTop: 2, wordBreak: 'break-all' }}>
        {s.value}
      </div>
      <div style={{ fontSize: 11, color: '#6b7280', marginLeft: 16, marginTop: 2 }}>{s.note}</div>
    </div>
  );
}

function Row({ title, items }: { title: string; items: Shadow[] }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 12 }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((s) => (<Card key={s.name} s={s} />))}
      </div>
    </section>
  );
}

export default function AmbientFloatPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <style>{`
        @keyframes sv-pulse { 50% { opacity: 0.6; } }
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>TOKEN · SHADOW</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Ambient Float</h1>

        <Row title="Static" items={STATIC} />
        <Row title="Interactive" items={HOVER} />
        <Row title="Pulse Glow" items={PULSE} />

        <section style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 12 }}>Live · Hover</h3>
          <div style={{
            width: 260, padding: 24, background: '#fff',
            border: '1px solid #e5e7eb', borderRadius: 16,
            transition: 'all 200ms ease-out',
            cursor: 'pointer',
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#99f6e4';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700 }}>Skill Card</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Hover 浮起 + border 变 teal</div>
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 12 }}>Pulse Dot</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: 999, background: '#10b981',
              boxShadow: '0 0 8px rgba(16,185,129,0.8)',
              animation: 'sv-pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af' }}>All Systems Operational</span>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
