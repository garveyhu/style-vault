import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

export default function PracticePostDetailPreview() {
  const [liked, setLiked] = useState(false);

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '24px 24px 96px' }}>
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', marginBottom: 24 }}>
            <ArrowLeft size={16} /> 返回社区
          </a>

          {/* 元信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#45B7D1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
              M
            </div>
            <div>
              <a style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>后端-M</a>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>更新于 1 天前</div>
            </div>
          </div>

          {/* skills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {['claude-api', 'prompt-caching'].map((s) => (
              <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>
                {s}
              </span>
            ))}
          </div>

          {/* 标题 */}
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 32px' }}>
            claude-api + 缓存，成本降到 1/5
          </h1>

          {/* 正文 prose */}
          <article style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
            <p>Anthropic 的 prompt caching 在长 context 场景里真的是好东西。我们在做一个基于 Claude 的文档搜索 + 回答服务，单次请求需要把 20 万字的 context 传过去。之前按标准 per-token 计费，单次 1.5 元。</p>

            <p>接入 prompt caching 后：</p>
            <ul style={{ paddingLeft: 24 }}>
              <li style={{ marginBottom: 6 }}>第一次请求：写缓存，1.5 元</li>
              <li style={{ marginBottom: 6 }}>后续 5 分钟内命中：0.15 元（10% 原价）</li>
              <li>平均下来单次 0.3 元，降到 1/5</li>
            </ul>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
              Caching 策略
            </h2>
            <p>关键是把 "不变的长 context" 放在 system prompt 里，marked as ephemeral cache:</p>
            <pre style={{ margin: '16px 0', padding: 16, borderRadius: 12, background: '#fafafa', boxShadow: '0 0 0 1px rgba(51,65,85,0.1)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.7, overflow: 'auto' }}>
              <code>{`client.messages.create(
    model="claude-sonnet-4",
    system=[{
        "type": "text",
        "text": LONG_CONTEXT,
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...]
)`}</code>
            </pre>

            <blockquote style={{ margin: '24px 0', padding: '16px 16px 16px 20px', borderLeft: '4px solid #818cf8', borderRadius: '0 8px 8px 0', background: 'linear-gradient(to right, rgba(238, 242, 255, 0.6), transparent)', color: '#374151' }}>
              <strong style={{ color: '#0f172a' }}>注意</strong>：缓存 TTL 是 5 分钟，要设计好请求节奏避免"几乎命中但错过"。
            </blockquote>
          </article>

          {/* 互动条 */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 24, fontSize: 14, color: '#64748b', fontWeight: 500 }}>
            <button
              onClick={() => setLiked(!liked)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: liked ? '#e11d48' : '#64748b', fontSize: 14, fontFamily: 'inherit',
              }}
            >
              <Heart size={16} fill={liked ? '#e11d48' : 'none'} />
              {liked ? 125 : 124}
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <MessageCircle size={16} /> 34
            </span>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 14, fontFamily: 'inherit' }}>
              <Share2 size={16} /> 分享
            </button>
          </div>

          {/* 评论 */}
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>讨论 · 34</h2>
            <textarea placeholder="写下你的想法..." rows={3} style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 12, padding: 16, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'none' }} />
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ padding: '8px 20px', background: '#1a1a1a', color: '#fff', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                发表评论
              </button>
            </div>
          </section>
        </div>
      </div>
    </PreviewFrame>
  );
}
