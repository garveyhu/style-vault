import { PreviewFrame } from '../../../_layout';
import { MessageSquare } from 'lucide-react';

const MESSAGES = [
  { role: 'user', text: '帮我查一下知识库里关于退款政策的条款' },
  { role: 'assistant', text: '根据知识库《售后服务手册》第 3.2 节，退款需在签收后 7 个工作日内提交申请，未拆封商品全额退款，已拆封视实际损耗扣减 10%–30%。' },
  { role: 'user', text: '那运费谁承担？' },
  { role: 'assistant', text: '质量问题导致的退款由商家承担往返运费；非质量原因（如不喜欢）由买家承担退回运费。' },
  { role: 'user', text: '收到，再问下生鲜类目能退吗' },
  { role: 'assistant', text: '生鲜、定制类商品默认不支持七天无理由退货，但若收到时已变质/损坏，凭开箱视频可申请赔付或重发。' },
];

export default function DynamicVirtualList() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 8px' }}>Dynamic Virtual List</h1>
        <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 24px', lineHeight: 1.6 }}>
          纯结构组件：动态行高 measureElement + stickToBottom 贴底 + overscan。色彩 / 间距全由 renderItem 自管，下面是聊天流 renderItem 的真实样式。
        </p>

        {/* 模拟固定高度滚动容器 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#a8a29e', marginBottom: 6 }}>
          <MessageSquare size={14} /> overflow-y-auto · max-h-[420px] · stickToBottom
        </div>
        <div style={{ height: 420, overflowY: 'auto', borderRadius: 8, border: '1px solid #e7e5e0', background: '#ffffff', padding: 16 }}>
          {/* relative w-full · height = getTotalSize() — 这里直接流式排，示意动态行高 */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MESSAGES.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '78%',
                    borderRadius: 12,
                    padding: '10px 14px',
                    fontSize: 13,
                    lineHeight: 1.6,
                    background: m.role === 'user' ? '#eff6ff' : '#f4f3ee',
                    color: m.role === 'user' ? '#1e40af' : '#44403c',
                    border: m.role === 'user' ? '1px solid #dbeafe' : '1px solid #e7e5e0',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: '#a8a29e', lineHeight: 1.7 }}>
          每行 absolute + translateY(vi.start) 偏移 · estimateSize 默认 60 · overscan 默认 8 ·
          items 变化时 scrollToIndex(last, &#123;align:'end'&#125;) 贴底
        </div>
      </div>
    </PreviewFrame>
  );
}
