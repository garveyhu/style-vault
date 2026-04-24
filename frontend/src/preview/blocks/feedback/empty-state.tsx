import { Box, MessageCircle, Sparkles } from 'lucide-react';
import { PreviewFrame } from '../../_layout';

function Empty({ Icon, title, hint, action }: {
  Icon: typeof Box; title: string; hint?: string; action?: React.ReactNode;
}) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      border: '1px dashed #e5e7eb', padding: 64,
      textAlign: 'center',
    }}>
      <Icon style={{ width: 48, height: 48, color: '#d1d5db', margin: '0 auto 12px' }} />
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0, marginBottom: 4 }}>
        {title}
      </h3>
      {hint && (
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{hint}</p>
      )}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

export default function EmptyStatePreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>BLOCK · FEEDBACK</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Empty State</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Empty Icon={Box} title="未找到 Skill" hint="尝试更换搜索词或重置过滤器。" />

          <Empty Icon={MessageCircle} title="还没有评论" hint="第一个留下想法的人就是你。" />

          <Empty
            Icon={Sparkles}
            title="你还没发布过实践"
            hint="把你踩过的坑、发现的技巧分享给大家"
            action={
              <button style={{
                padding: '10px 20px', background: '#1a1a1a', color: '#fff',
                borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                发布第一篇
              </button>
            }
          />
        </div>
      </div>
    </PreviewFrame>
  );
}
