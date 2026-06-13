import { PreviewFrame } from '../../../_layout';

const VARIANTS = [
  { name: 'default', bg: '#f5f5f4', color: '#44403c', border: 'transparent' },
  { name: 'primary', bg: '#dbeafe', color: '#1e40af', border: 'transparent' },
  { name: 'success', bg: '#d1fae5', color: '#065f46', border: 'transparent' },
  { name: 'warning', bg: '#fef3c7', color: '#92400e', border: 'transparent' },
  { name: 'danger', bg: '#fee2e2', color: '#991b1b', border: 'transparent' },
  { name: 'outline', bg: 'transparent', color: '#44403c', border: '#d6d3d1' },
];

const SAMPLES = [
  { label: '草稿', variant: 'default' },
  { label: '当前主题', variant: 'primary' },
  { label: '已发布', variant: 'success' },
  { label: '待复核', variant: 'warning' },
  { label: '已停用', variant: 'danger' },
  { label: '可选', variant: 'outline' },
];

export default function CvaSemanticBadge() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · BADGE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>CVA Semantic Badge</h1>

        <Section title="6 variant">
          {VARIANTS.map(v => (
            <Badge key={v.name} bg={v.bg} color={v.color} border={v.border}>{v.name}</Badge>
          ))}
        </Section>

        <Section title="语义示例">
          {SAMPLES.map(s => {
            const v = VARIANTS.find(x => x.name === s.variant)!;
            return <Badge key={s.label} bg={v.bg} color={v.color} border={v.border}>{s.label}</Badge>;
          })}
        </Section>

        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 24 }}>
          rounded-md(6px) · px-2(8px) py-0.5(2px) · text-xs(12px) · 实底 5 variant border-transparent，仅 outline 留边
        </div>
      </div>
    </PreviewFrame>
  );
}

function Badge({ bg, color, border, children }: { bg: string; color: string; border: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', borderRadius: 6,
      border: `1px solid ${border}`, padding: '2px 8px', fontSize: 12, fontWeight: 500,
      background: bg, color,
    }}>{children}</span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}
