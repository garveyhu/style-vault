import { CheckCircle, ChevronLeft, Copy, ThumbsUp } from 'lucide-react';
import { PreviewFrame } from '../../_layout';

const AVATAR = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

function SidebarSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.6)', borderRadius: 16, padding: 16 }}>
      {title && <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af', fontWeight: 700, marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  );
}

export default function SkillArticleDetailPreview() {
  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        {/* Navbar simplified */}
        <header style={{ padding: '12px 32px', background: 'rgba(255,255,255,0.8)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }} />
            <span style={{ fontWeight: 700, fontSize: 16 }}>SkillHub</span>
          </div>
        </header>

        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '24px 32px 96px' }}>
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', marginBottom: 24 }}>
            <ChevronLeft size={16} /> 返回发现
          </a>

          {/* 标题 hero */}
          <header style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                canvas-design
              </h1>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace' }}>v1.2.0</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>设计</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>创意</span>
              <span style={{ fontSize: 14, color: '#64748b' }}>· 作者 @anthropic · 更新于 2026-04-20</span>
            </div>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, maxWidth: 768, margin: 0 }}>
              Create beautiful visual art in .png and .pdf documents using design philosophy. Use this skill when the user asks to create a poster, design, or other static piece.
            </p>
          </header>

          {/* 两列主体 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40 }}>
            {/* 主栏 · prose */}
            <article style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                概述
              </h2>
              <p>canvas-design 是一个帮助你在 PNG / PDF 文档中创作高质量视觉作品的 skill。它利用设计哲学和原则，创作原创视觉设计，避免照搬现有艺术家的作品。</p>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 36, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                什么时候使用
              </h2>
              <ul style={{ paddingLeft: 24 }}>
                <li style={{ marginBottom: 6 }}>用户要做海报、视觉设计、静态图</li>
                <li style={{ marginBottom: 6 }}>用户提到 "poster" / "设计" / "visual"</li>
                <li>需要色彩 / 排版 / 构图建议</li>
              </ul>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 36, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                核心代码
              </h2>
              <pre style={{
                margin: '16px 0', padding: 20, borderRadius: 12, background: '#fafafa',
                boxShadow: '0 0 0 1px rgba(51,65,85,0.1)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.7,
                overflow: 'auto',
              }}>
                <code>{`# canvas-design skill
from design_philosophy import compose

def generate_poster(prompt: str) -> bytes:
    palette = select_palette(prompt)
    layout = compose(prompt, palette)
    return render_pdf(layout)`}</code>
              </pre>

              <blockquote style={{
                margin: '24px 0', padding: '16px 16px 16px 20px',
                borderLeft: '4px solid #818cf8', borderRadius: '0 8px 8px 0',
                background: 'linear-gradient(to right, rgba(238, 242, 255, 0.6), transparent)',
                color: '#374151', fontStyle: 'normal',
              }}>
                <strong style={{ color: '#0f172a' }}>注意</strong>：不要复制现有艺术家的视觉风格。始终创作原创设计，避免版权问题。
              </blockquote>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 80, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarSection>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: AVATAR[0], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>A</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>anthropic</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>关注 · 私信</div>
                  </div>
                </div>
              </SidebarSection>

              <SidebarSection>
                <button style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', background: '#1a1a1a', color: '#fff', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 8 }}>
                  <CheckCircle size={14} /> 使用此 Skill
                </button>
                <button style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                  <ThumbsUp size={14} /> 点赞 · 342
                </button>
              </SidebarSection>

              <SidebarSection title="Slug">
                <code style={{ display: 'inline-block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#3730a3', background: 'rgba(238, 242, 255, 0.7)', border: '1px solid rgba(199, 210, 254, 0.5)', padding: '4px 8px', borderRadius: 4 }}>
                  anthropic/canvas-design
                </code>
                <button style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', fontSize: 12, color: '#64748b', cursor: 'pointer' }}>
                  <Copy size={11} /> 复制
                </button>
              </SidebarSection>

              <SidebarSection title="Bundle">
                <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                  <div>📂 canvas-design/</div>
                  <div style={{ paddingLeft: 16 }}>📄 SKILL.md</div>
                  <div style={{ paddingLeft: 16 }}>📄 references/</div>
                  <div style={{ paddingLeft: 16 }}>📄 examples/</div>
                  <button style={{ marginTop: 4, background: 'transparent', border: 'none', fontSize: 11, color: '#0d9488', cursor: 'pointer' }}>展开全部 →</button>
                </div>
              </SidebarSection>

              <SidebarSection title="相关技能">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['brand-guidelines', 'algorithmic-art', 'frontend-design'].map((n, i) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#0f172a', cursor: 'pointer' }}>
                      <div style={{ width: 28, height: 28, borderRadius: 999, background: AVATAR[(i + 1) % 4], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{n[0].toUpperCase()}</div>
                      <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</span>
                    </div>
                  ))}
                </div>
              </SidebarSection>
            </aside>
          </div>

          {/* 评论区 */}
          <section style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>讨论 · 56</h2>
            <textarea
              placeholder="写下你的想法..."
              rows={3}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 12, padding: 16, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'none' }}
            />
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
