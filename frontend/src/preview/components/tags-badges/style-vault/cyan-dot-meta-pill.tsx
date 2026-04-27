import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function Pill({
  dot,
  children,
  onDark,
}: {
  dot: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 12px',
        borderRadius: 9999,
        border: onDark
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid #e2e8f0',
        background: onDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: onDark ? '#cbd5e1' : '#64748b',
        fontFamily: SANS,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: dot,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

export default function CyanDotMetaPillPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '64px 56px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        <Header />

        <Section label="Default · cyan dot · hero kicker">
          <Pill dot="#06b6d4">Style Vault · 风格库</Pill>
        </Section>

        <Section label="Category dots · 6 种类目">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Pill dot="#a855f7">产品 · 效率工具</Pill>
            <Pill dot="#22d3ee">产品 · 内容</Pill>
            <Pill dot="#f59e0b">产品 · 生活</Pill>
            <Pill dot="#ec4899">产品 · 社交</Pill>
            <Pill dot="#10b981">产品 · 电商</Pill>
            <Pill dot="#6366f1">产品 · 设计</Pill>
          </div>
        </Section>

        <Section label="Type dots · 6 种层级">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Pill dot="#a855f7">Product</Pill>
            <Pill dot="#f43f5e">Style</Pill>
            <Pill dot="#6366f1">Page</Pill>
            <Pill dot="#06b6d4">Block</Pill>
            <Pill dot="#10b981">Component</Pill>
            <Pill dot="#f59e0b">Token</Pill>
          </div>
        </Section>

        <Section label="On dark panel · manifesto eyebrow">
          <div
            style={{
              padding: '32px 32px',
              background: '#0f172a',
              borderRadius: 12,
            }}
          >
            <Pill dot="#67e8f9" onDark>
              Style Vault · 为设计精选
            </Pill>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Header() {
  return (
    <>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 12,
        }}
      >
        components / tags-badges / style-vault
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.025em',
          marginBottom: 32,
        }}
      >
        Cyan Dot Meta Pill
      </div>
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 14,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
