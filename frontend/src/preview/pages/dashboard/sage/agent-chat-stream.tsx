import { PreviewFrame } from '../../../_layout';

const MSGS = [
  { role: 'user', text: '查询本月销售前 10 名的产品' },
  { role: 'ai', text: '我会查询 sales_main 库的 orders + products 表，按销量降序聚合。' },
];

export default function AgentChatStreamPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif' }}>
        {/* Sidebar (mock) */}
        <div style={{ width: 240, background: 'rgb(249,249,249)', padding: 12, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 15, marginBottom: 18 }}>
            <span style={{ width: 24, height: 24, borderRadius: 5, background: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>S</span>
            Sage
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: 'transparent', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer', textAlign: 'left', marginBottom: 4 }}>+ 新对话</button>
          <div style={{ marginTop: 12, padding: '4px 10px', fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CHATS</div>
          <div style={{ background: 'rgb(239,239,239)', color: '#10b981', padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 500 }}>本月销售分析</div>
        </div>

        {/* Main chat */}
        <div style={{ flex: 1, padding: 4, background: 'rgb(249,249,249)', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            flex: 1, background: '#fff',
            borderRadius: 16,
            border: '1px solid rgba(241,245,249,0.5)',
            borderBottom: 'none',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <header style={{ height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>GPT-4o ▾</span>
              </div>
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>本月销售分析</div>
              <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}>⋮</button>
            </header>

            {/* Messages */}
            <div style={{ flex: 1, padding: '32px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {MSGS.map((m, i) => (
                <Message key={i} role={m.role} text={m.text} />
              ))}
            </div>

            {/* Composer */}
            <div style={{ padding: 16 }}>
              <div style={{
                position: 'relative',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                boxShadow: '0 0 4px rgba(148,163,184,0.15), 0 0 15px rgba(148,163,184,0.08)',
                padding: 10,
              }}>
                <input placeholder="问点什么吧?" style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, padding: '4px 10px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 16, background: '#10b9811A', color: '#10b981', fontSize: 12, fontWeight: 500, border: '1px solid #10b9814D' }}>📊 数据查询</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: 'none', color: '#64748b', fontSize: 14 }}>🎙</button>
                    <span style={{ width: 1, height: 18, background: '#e2e8f0' }} />
                    <button style={{ width: 32, height: 32, borderRadius: '50%', background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}>➤</button>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 6 }}>AI 也会出错 — 关键决策请二次确认</p>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Message({ role, text }: { role: string; text: string }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', position: 'relative' }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 12, fontSize: 14 }}>🤖</div>
      )}
      <div style={{
        maxWidth: '70%',
        padding: '10px 14px',
        borderRadius: 12,
        background: isUser ? '#f1f5f9' : 'transparent',
        color: isUser ? '#1e293b' : '#334155',
        fontSize: 14, lineHeight: 1.6,
      }}>
        {text}
      </div>
    </div>
  );
}
