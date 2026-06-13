import { PreviewFrame } from '../../../_layout';
import { ArrowLeft, Copy, ListTree, ThumbsUp } from 'lucide-react';

const CARD: React.CSSProperties = {
  borderRadius: 12,
  border: '1px solid rgba(231,229,224,0.4)',
  background: '#fffefb',
  boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
};

const STATS = [
  { k: '应用', v: 'support-bot', mono: true },
  { k: '终端用户', v: 'u_8f3a21', mono: true },
  { k: '轮次', v: '4', sub: '8 条消息' },
  { k: 'Token', v: '3.2k' },
  { k: '成本', v: '$0.014' },
  { k: '模型', v: 'qwen-max', sub: '+1', mono: true },
];

const MESSAGES = [
  { role: 'user', label: '用户', seq: 5, time: '14:32:08', text: '帮我查一下退款政策，超过 7 天还能退吗？' },
  { role: 'assistant', label: '助手', seq: 6, time: '14:32:11', text: '根据当前退款政策，标准商品支持 7 天无理由退货。超过 7 天后，仅在商品存在质量问题时可申请售后。建议您在订单详情页提交售后工单。', fb: true },
  { role: 'user', label: '用户', seq: 7, time: '14:33:40', text: '那质量问题怎么举证？' },
];

export default function EmbedFullscreenChat() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '20px 24px', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* 段1+2：身份头 + StatBar */}
        <section style={{ ...CARD, padding: '12px 20px' }}>
          {/* 面包屑 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '4px 6px', fontSize: 12.5, color: '#78716c' }}>
              <ArrowLeft size={14} strokeWidth={2} color="#78716c" /> 会话
            </span>
            <span style={{ color: '#d6d3d1' }}>/</span>
            <span style={{ borderRadius: 4, background: '#f5f3ff', padding: '2px 6px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#7c3aed' }}>session</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>退款政策咨询</span>
          </div>
          {/* 元信息行 */}
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 16, rowGap: 4, fontSize: 11.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#a8a29e' }}>会话</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'JetBrains Mono, monospace', color: '#57534e' }}>
                sess_a1b2c3d4e5f6 <Copy size={12} strokeWidth={2} color="#a8a29e" />
              </span>
            </span>
            <span><span style={{ color: '#a8a29e' }}>创建</span> <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#57534e' }}>2026-06-13 14:30</span></span>
            <span><span style={{ color: '#a8a29e' }}>最后活跃</span> <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#57534e' }}>2026-06-13 14:33</span></span>
          </div>
          {/* StatBar */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 12, padding: '4px 0' }}>
              {STATS.map((s, i) => (
                <div key={s.k} style={{ marginRight: i === STATS.length - 1 ? 0 : 16, paddingRight: i === STATS.length - 1 ? 0 : 16, borderRight: i === STATS.length - 1 ? 'none' : '1px solid #f5f4ee' }}>
                  <div style={{ fontSize: 10.5, letterSpacing: '0.02em', color: '#a8a29e' }}>{s.k}</div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontWeight: 600, color: '#44403c', fontVariantNumeric: 'tabular-nums', fontSize: s.mono ? 13 : 15, fontFamily: s.mono ? 'JetBrains Mono, monospace' : undefined }}>{s.v}</span>
                    {s.sub && <span style={{ fontSize: 11, fontWeight: 400, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>{s.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 段3：气泡区 */}
        <section style={{ ...CARD, padding: 0 }}>
          <div style={{ maxHeight: 420, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 加载更早 */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 9999, border: '1px solid #e7e5e0', background: '#fff', padding: '4px 12px', fontSize: 12, color: '#57534e', cursor: 'pointer' }}>
                加载更早（已加载 3 / 8）
              </span>
            </div>

            {MESSAGES.map(m => {
              const isUser = m.role === 'user';
              return (
                <div key={m.seq} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                  {/* 元信息行 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', fontSize: 10.5, color: '#a8a29e' }}>
                    <span style={{ fontWeight: 500, color: '#78716c' }}>{m.label}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>#{m.seq}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{m.time}</span>
                    {m.fb && <ThumbsUp size={12} strokeWidth={2} color="#10b981" />}
                  </div>
                  {/* 气泡 */}
                  <div style={{
                    maxWidth: '78%', padding: '10px 14px', fontSize: 13, lineHeight: 1.625,
                    borderRadius: 16,
                    ...(isUser
                      ? { borderTopRightRadius: 2, background: '#2563eb', color: '#fff', whiteSpace: 'pre-wrap' }
                      : { borderTopLeftRadius: 2, border: '1px solid #e7e5e0', background: '#fff', color: '#292524' }),
                  }}>
                    {m.text}
                  </div>
                  {/* 动作行：trace 常显 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexDirection: isUser ? 'row-reverse' : 'row' }}>
                    {!isUser && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, border: '1px solid #e7e5e0', background: '#fff', padding: '2px 6px', fontSize: 10.5, color: '#78716c', cursor: 'pointer' }}>
                        <ListTree size={14} strokeWidth={2} color="#78716c" /> trace
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
