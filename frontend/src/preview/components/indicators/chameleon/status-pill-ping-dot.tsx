import { PreviewFrame } from '../../../_layout';

const TONE: Record<string, { dot: string; pillBg: string; pillText: string }> = {
  success: { dot: '#10b981', pillBg: '#ecfdf5', pillText: '#047857' },
  error: { dot: '#ef4444', pillBg: '#fef2f2', pillText: '#b91c1c' },
  warning: { dot: '#f59e0b', pillBg: '#fffbeb', pillText: '#b45309' },
  info: { dot: '#0ea5e9', pillBg: '#f0f9ff', pillText: '#0369a1' },
  running: { dot: '#0ea5e9', pillBg: '#f0f9ff', pillText: '#0369a1' },
  neutral: { dot: '#a8a29e', pillBg: '#f5f5f4', pillText: '#57534e' },
};

function StatusBadge({ tone, children, pulse }: { tone: string; children: React.ReactNode; pulse?: boolean }) {
  const c = TONE[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        borderRadius: 6,
        padding: '2px 8px',
        fontSize: 11,
        fontWeight: 500,
        background: c.pillBg,
        color: c.pillText,
      }}
    >
      <span style={{ position: 'relative', display: 'flex', height: 6, width: 6 }}>
        {pulse && (
          <span
            style={{
              position: 'absolute',
              display: 'inline-flex',
              height: '100%',
              width: '100%',
              borderRadius: 9999,
              opacity: 0.75,
              background: c.dot,
              animation: 'sp-ping 1s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
        )}
        <span style={{ position: 'relative', display: 'inline-flex', height: 6, width: 6, borderRadius: 9999, background: c.dot }} />
      </span>
      {children}
    </span>
  );
}

export default function StatusPillPingDot() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INDICATOR</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>药丸状态徽标 + ping 点</h1>

        <Section title="6 态语义集">
          <StatusBadge tone="success">成功</StatusBadge>
          <StatusBadge tone="error">失败</StatusBadge>
          <StatusBadge tone="warning">超时</StatusBadge>
          <StatusBadge tone="info">已发布</StatusBadge>
          <StatusBadge tone="neutral">草稿</StatusBadge>
        </Section>

        <Section title="pulse — 运行 / 排队态 (animate-ping 双层)">
          <StatusBadge tone="running" pulse>运行中</StatusBadge>
          <StatusBadge tone="info" pulse>排队中</StatusBadge>
          <StatusBadge tone="warning" pulse>重试中</StatusBadge>
        </Section>

        <Section title="行内嵌入">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#44403c' }}>
            eval_run_a83f
            <StatusBadge tone="running" pulse>运行中</StatusBadge>
          </span>
        </Section>
      </div>
      <style>{`@keyframes sp-ping { 75%, 100% { transform: scale(2); opacity: 0 } }`}</style>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}
