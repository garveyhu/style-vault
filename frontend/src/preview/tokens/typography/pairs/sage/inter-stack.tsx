import { PreviewFrame } from '../../../../_layout';

const SCALE = [
  { name: 'text-xs · 12px',   size: 12, weight: 600, content: 'META · CAPS · TRACKING-WIDER', tracking: '0.05em', upper: true, color: '#94a3b8' },
  { name: 'text-sm · 14px',   size: 14, weight: 500, content: 'Sidebar item · 正文 · form label', color: '#334155' },
  { name: 'text-base · 16px', size: 16, weight: 400, content: 'ChatInput placeholder：问点什么吧？', color: '#1f2937' },
  { name: 'text-lg · 18px',   size: 18, weight: 500, content: 'Empty state title · 还没有会话', color: '#0f172a' },
  { name: 'text-xl · 20px',   size: 20, weight: 600, content: 'Section heading · 数据源详情', color: '#0f172a' },
  { name: 'text-2xl · 24px',  size: 24, weight: 700, content: 'Sage · 登录页 / Page title', color: '#0f172a' },
  { name: 'text-3xl · 30px',  size: 30, weight: 700, content: '欢迎回来', color: '#0f172a', tracking: '-0.01em' },
];

export default function InterStack() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          TOKEN · TYPOGRAPHY
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Sage Inter Stack
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
          单字体策略 · Inter 本地化 · CJK 由系统 fallback 接管
        </p>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          {SCALE.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                padding: '10px 0',
                borderBottom: i === SCALE.length - 1 ? 'none' : '1px dashed #f1f5f9',
              }}
            >
              <div style={{ width: 140, fontSize: 11, color: '#94a3b8', fontFamily: 'ui-monospace, SFMono-Regular, monospace', flexShrink: 0 }}>
                {s.name}
              </div>
              <div
                style={{
                  fontSize: s.size,
                  fontWeight: s.weight as 400 | 500 | 600 | 700,
                  letterSpacing: s.tracking,
                  textTransform: s.upper ? 'uppercase' : 'none',
                  color: s.color,
                }}
              >
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>
              import (本地化)
            </div>
            <pre style={{ margin: 0, fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, monospace', color: '#475569', lineHeight: 1.7 }}>
{`@import url('../fonts/inter.css');
body { font-family: Inter, sans-serif; }`}
            </pre>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>
              fallback chain
            </div>
            <pre style={{ margin: 0, fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, monospace', color: '#475569', lineHeight: 1.7 }}>
{`Inter, -apple-system,
BlinkMacSystemFont,
'Segoe UI', 'PingFang SC',
'Hiragino Sans GB',
'Microsoft YaHei',
sans-serif`}
            </pre>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
