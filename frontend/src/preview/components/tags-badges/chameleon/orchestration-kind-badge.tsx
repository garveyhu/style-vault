import { PreviewFrame } from '../../../_layout';

const KINDS = [
  { key: 'code', label: '代码', bg: '#eef2ff', color: '#4338ca' },
  { key: 'chatflow', label: '对话编排', bg: '#f0f9ff', color: '#0369a1' },
  { key: 'workflow', label: '流程编排', bg: '#f5f3ff', color: '#6d28d9' },
  { key: 'external', label: '外部', bg: '#fffbeb', color: '#b45309' },
];

export default function OrchestrationKindBadge() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · BADGE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Orchestration Kind Badge</h1>

        <Section title="4 编排域">
          {KINDS.map(k => (
            <span key={k.key} style={chip(k.bg, k.color)}>{k.label}</span>
          ))}
        </Section>

        <Section title="无值态">
          <span style={{ fontSize: 10.5, color: '#d6d3d1' }}>—</span>
        </Section>

        {/* 在表格行里的样子：名称 + 编排徽标列 */}
        <Section title="表格列内">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e7e5e0', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { name: '智能客服助手', k: KINDS[1] },
              { name: '订单处理流水线', k: KINDS[2] },
              { name: 'code-agent-sdk', k: KINDS[0] },
              { name: '第三方应用接入', k: KINDS[3] },
              { name: '草稿（未关联）', k: null },
            ].map((r, i) => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', fontSize: 13, color: '#1c1917', borderTop: i ? '1px solid #f5f4ee' : 'none' }}>
                <span style={{ flex: 1 }}>{r.name}</span>
                {r.k ? <span style={chip(r.k.bg, r.k.color)}>{r.k.label}</span> : <span style={{ fontSize: 10.5, color: '#d6d3d1' }}>—</span>}
              </div>
            ))}
          </div>
        </Section>

        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 8 }}>
          rounded(4px) · px-1.5(6px) py-0.5(2px) · text-[10px] · 软色阶 -50/-700 · 无值 stone-300「—」
        </div>
      </div>
    </PreviewFrame>
  );
}

function chip(bg: string, color: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', flexShrink: 0, borderRadius: 4,
    padding: '2px 6px', fontSize: 10, fontWeight: 500, background: bg, color,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}
