import { PreviewFrame } from '../../../_layout';

const RGB_LADDER = [
  { name: 'page-bg',           hex: 'rgb(249,249,249)', use: '整站 body 背景 / 侧栏底色' },
  { name: 'session-active',    hex: 'rgb(239,239,239)', use: '选中会话项底色' },
  { name: 'session-hover',     hex: 'rgb(237,237,237)', use: '侧栏按钮 hover' },
  { name: 'session-deephover', hex: 'rgb(231,231,231)', use: '选中会话项再 hover' },
  { name: 'icon-btn-hover',    hex: 'rgb(242,242,242)', use: '圆形图标按钮 hover / 思考过程头部' },
  { name: 'neutral-244',       hex: 'rgb(244,244,244)', use: '过渡阶' },
  { name: 'neutral-246',       hex: 'rgb(246,246,246)', use: '过渡阶' },
  { name: 'neutral-251',       hex: 'rgb(251,251,251)', use: '近白衬底' },
  { name: 'neutral-252',       hex: 'rgb(252,252,252)', use: '近白衬底' },
];

const SLATE = [
  { name: 'fg-strong',  hex: '#1e293b', tw: 'slate-800' },
  { name: 'fg-base',    hex: '#334155', tw: 'slate-700' },
  { name: 'fg-body',    hex: '#475569', tw: 'slate-600' },
  { name: 'fg-muted',   hex: '#64748b', tw: 'slate-500' },
  { name: 'fg-subtle',  hex: '#94a3b8', tw: 'slate-400' },
  { name: 'fg-ghost',   hex: '#cbd5e1', tw: 'slate-300' },
  { name: 'border',     hex: '#e2e8f0', tw: 'slate-200' },
  { name: 'border-soft',hex: '#f1f5f9', tw: 'slate-100' },
  { name: 'bg-soft',    hex: '#f8fafc', tw: 'slate-50' },
];

export default function NeutralRgbLadder() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          TOKEN · PALETTE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', margin: '8px 0 4px' }}>
          Sage Neutral RGB Ladder
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
          手调 9 阶 RGB 灰阶 + slate 系——侧栏 idle / hover / selected 微差全靠这套
        </p>

        <Section title="9-step rgb ladder · 用于侧栏 / hover / selected">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {RGB_LADDER.map(s => (
              <div key={s.name} style={{ width: 200, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 8 }}>
                <div style={{ height: 60, background: s.hex, borderRadius: 6, border: '1px solid #f1f5f9' }} />
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{s.hex}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{s.use}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="slate scale · 文字 / 边框">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SLATE.map(s => (
              <div key={s.name} style={{ width: 130, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 6 }}>
                <div style={{ height: 32, background: s.hex, borderRadius: 4 }} />
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>{s.name}</div>
                <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{s.hex} · {s.tw}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="scrollbar · 7px 默认 / 3px 下拉">
          <div style={{ display: 'flex', gap: 16 }}>
            <Scrollbar variant="default" />
            <Scrollbar variant="dropdown" />
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 10 }}>{title}</h3>
      {children}
    </section>
  );
}

function Scrollbar({ variant }: { variant: 'default' | 'dropdown' }) {
  const isDropdown = variant === 'dropdown';
  const w = isDropdown ? 3 : 7;
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, width: 280 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: '#334155' }}>
        {isDropdown ? '.sage-dropdown-scroll · 3px' : 'global · 7px'}
      </div>
      <div style={{ position: 'relative', height: 120, background: '#fafafa', borderRadius: 8, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            right: 4,
            top: 8,
            bottom: 40,
            width: w,
            background: isDropdown ? 'rgba(0,0,0,0.10)' : 'rgb(185,185,185)',
            borderRadius: w / 2,
          }}
        />
        <div style={{ padding: 12, color: '#94a3b8', fontSize: 11 }}>scrollable area</div>
      </div>
    </div>
  );
}
