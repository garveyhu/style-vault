import { ChevronDown, ChevronLeft, Copy, Download, FileText, Star, ThumbsUp, User, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const RELATED = [
  { name: 'Docker Best Practices', summary: 'Use when containerizing a project for local testing or production deployment.' },
  { name: 'Docsify Station Creator', summary: 'Generate a fully-featured Docsify documentation site from an existing docs/ folder.' },
  { name: 'FastAPI Best Practices', summary: 'FastAPI project initialization, development guidance, and code review.' },
];

const PRACTICES = [
  { id: 1, title: '把 req-to-ai-spec 接进我们 CI 后 PR 质量明显好转' },
  { id: 2, title: '从 Figma 截图到结构化规格的完整尝试' },
];

export default function SkillArticleDetailPreview() {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [used, setUsed] = useState(false);
  const [rating, setRating] = useState(0);
  const [filesOpen, setFilesOpen] = useState(false);

  const installCmd = 'mkdir -p ~/.claude/skills/iktapp-ai-skills-req-to-ai-spec && curl -sL http://192.168.1.91:5371/skillhub/api/skills/ai-skills/req-to-ai-spec/download | tar -xz -C ~/.claude/skills/iktapp-ai-skills-req-to-ai-spec/';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a', background: '#fff', minHeight: 800 }}>
        {/* Top bar · breadcrumb */}
        <div style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', padding: '12px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'inline-flex' }}>
                <ChevronLeft size={16} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>
                <span>skills</span>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#64748b' }}>iktapp</span>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#64748b' }}>ai-skills</span>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#475569' }}>req-to-ai-spec</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 32px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'flex-start' }}>

            {/* ===== 左：主栏 ===== */}
            <div style={{ minWidth: 0 }}>
              {/* H1 */}
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', margin: 0 }}>
                req-to-ai-spec
              </h1>

              {/* 安装命令条 */}
              <div style={{
                marginTop: 12, display: 'flex', alignItems: 'flex-start', gap: 8,
                background: '#f8fafc', borderRadius: 8, border: '1px solid rgba(226,232,240,0.6)',
                padding: '8px 12px',
              }}>
                <code style={{
                  flex: 1, fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
                  color: '#64748b', lineHeight: 1.7, wordBreak: 'break-all',
                }}>
                  {installCmd}
                </code>
                <button
                  onClick={handleCopy}
                  style={{ flexShrink: 0, marginTop: 2, color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Copy size={13} />
                </button>
                {copied && (
                  <span style={{ fontSize: 10, color: '#10b981', fontWeight: 500, flexShrink: 0, alignSelf: 'center' }}>
                    已复制
                  </span>
                )}
              </div>

              {/* SUMMARY box */}
              <div style={{
                marginTop: 16, marginBottom: 24,
                background: '#f8fafc', borderRadius: 8, border: '1px solid rgba(226,232,240,0.6)',
                padding: '12px 16px',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>
                  SUMMARY
                </div>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                  将零散的产品需求（文字描述、原型截图、现有代码库）转换为结构化的、AI 友好的需求规格文档。任何 AI 编码代理读出文档后即可高效完成开发实现。触发关键词：req-to-ai-spec、需求转换、需求分析、需求文档生成、需求转 AI 规格、AI spec
                </p>
              </div>

              {/* SKILL.md section tab */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
                <span style={{
                  padding: '6px 12px', fontSize: 12, fontWeight: 500,
                  borderRadius: 6, background: '#0f172a', color: '#fff',
                }}>
                  SKILL.md
                </span>
              </div>

              {/* Prose 正文 */}
              <article style={{ fontSize: 16, color: '#0f172a', lineHeight: 1.75, minHeight: 500 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid #e2e8f0' }}>
                  req-to-ai-spec
                </h1>

                <p style={{ color: '#334155' }}>
                  将零散、模糊的产品需求转化为结构化的需求规格文档，任何 AI 编码代理读即可无歧义地完成开发。
                </p>

                <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                  触发条件
                </h2>
                <p style={{ color: '#334155' }}>
                  当用户提到以下任意关键词时激活：
                  {['req-to-ai-spec', '需求转换', '需求分析', '需求文档', '需求文档生成'].map((k) => (
                    <code key={k} style={{ background: '#f1f5f9', color: '#1e293b', padding: '1px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, margin: '0 4px' }}>
                      {k}
                    </code>
                  ))}
                  ，或描述了需要将产品需求转化为可实现规格的场景。
                </p>

                <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                  使用场景
                </h2>
                <ul style={{ paddingLeft: 24, color: '#334155' }}>
                  <li style={{ marginBottom: 6 }}>开发者收到零散的产品笔记和 Axure/Figma 截图，需要在交给 AI 编码前生成结构化规格</li>
                  <li style={{ marginBottom: 6 }}>与产品沟通后的口头讨论或聊天记录，需要转化为可实现、可测试的 Task</li>
                  <li>团队希望在 AI 辅助开发前，确保边界情况和隐含规则被完整捕获</li>
                </ul>

                <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                  输入
                </h2>
                <div style={{ overflowX: 'auto', margin: '-8px -8px 16px', padding: '8px 8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={{ padding: '10px 12px', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1.2 }}>输入</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1.2 }}>必需</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1.2 }}>形式</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1.2 }}>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['需求描述', '是', '文字（可零散、非正式）', '与产品沟通后的文字笔记、聊天记录、口头总结'],
                        ['原型截图', '否', '图片文件路径', 'Axure/Figma 等原型截图'],
                        ['代码工作区', '否（默认当前目录）', '目录路径', '用于探索现有模式和数据结构的代码库'],
                      ].map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (
                            <td key={i} style={{ padding: '10px 12px', border: '1px solid #e2e8f0', color: '#475569' }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                  工作流
                </h2>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12 }}>第 1 步：输入收集与完整性检查</h3>
                <ul style={{ paddingLeft: 24, color: '#334155' }}>
                  <li>接收用户提供的所有材料（文字、文件路径、截图）</li>
                  <li>识别四类输入中哪些已提供</li>
                  <li>对缺失的可选输入，最多追问一个问题，不要连续追问</li>
                  <li>如果已有信息足够生成文档，跳过追问直接进入下一步</li>
                </ul>

                <blockquote style={{
                  borderLeft: '4px solid #a5b4fc',
                  background: 'rgba(238, 242, 255, 0.5)',
                  paddingLeft: 16, paddingTop: 8, paddingBottom: 8, paddingRight: 8,
                  margin: '24px 0', color: '#334155', fontStyle: 'normal',
                }}>
                  <strong style={{ color: '#0f172a' }}>提示</strong>：缺失关键输入（如需求描述为空）时请中断流程，不要猜测填充。
                </blockquote>
              </article>
            </div>

            {/* ===== 右：Sidebar 280px ===== */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Stats 3 列 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>使用人数</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>0</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>下载量</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>0</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>评分</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>-</span>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setRating(n)}
                          style={{
                            padding: 2, background: 'transparent', border: 'none', cursor: 'pointer',
                            color: rating >= n ? '#0f172a' : '#cbd5e1',
                            transition: 'all 150ms',
                          }}>
                          <Star size={11} fill={rating >= n ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 元信息矩阵 */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['来源', 'iktapp', true],
                  ['作者标识', 'ai-skills', true],
                  ['提交者', 'links', false],
                  ['版本', 'v1.0.0', true],
                ].map(([label, value, isMono]) => (
                  <div key={label as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>{label as string}</span>
                    <span style={{
                      fontSize: 12, color: isMono ? '#64748b' : '#334155',
                      fontFamily: isMono ? 'JetBrains Mono, monospace' : 'inherit',
                      fontWeight: isMono ? 400 : 500,
                    }}>
                      {value as string}
                    </span>
                  </div>
                ))}

                {/* 类型 pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>类型</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                    background: '#e0e7ff', color: '#4f46e5',
                  }}>一方</span>
                </div>

                {/* 标签 */}
                <div>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>标签</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {['开发工具', '效率提升'].map((t) => (
                      <span key={t} style={{
                        padding: '2px 6px', borderRadius: 4,
                        background: '#f1f5f9', color: '#64748b',
                        fontSize: 10, fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions · ghost */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    onClick={() => setLiked(!liked)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '8px 0', fontSize: 12, fontWeight: 500,
                      borderRadius: 8, cursor: 'pointer', transition: 'all 150ms',
                      background: liked ? '#0f172a' : '#f8fafc',
                      color: liked ? '#fff' : '#64748b',
                      border: liked ? '1px solid #0f172a' : '1px solid rgba(226,232,240,0.6)',
                      fontFamily: 'inherit',
                    }}
                  >
                    <ThumbsUp size={13} fill={liked ? 'currentColor' : 'none'} />
                    {liked ? '已点赞' : '点赞'}
                  </button>
                  <button
                    onClick={() => setUsed(!used)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '8px 0', fontSize: 12, fontWeight: 500,
                      borderRadius: 8, cursor: 'pointer', transition: 'all 150ms',
                      background: used ? '#0f172a' : '#f8fafc',
                      color: used ? '#fff' : '#64748b',
                      border: used ? '1px solid #0f172a' : '1px solid rgba(226,232,240,0.6)',
                      fontFamily: 'inherit',
                    }}
                  >
                    <CheckCircle size={12} />
                    {used ? '在用' : '标记使用'}
                  </button>
                </div>
                <button
                  style={{
                    width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '8px 0', fontSize: 12, fontWeight: 500,
                    background: '#f8fafc', color: '#64748b',
                    border: '1px solid rgba(226,232,240,0.6)', borderRadius: 8,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <Download size={13} /> 下载压缩包
                </button>
              </div>

              {/* 文件折叠 */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <button
                  onClick={() => setFilesOpen(!filesOpen)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>文件 (2)</span>
                  <ChevronDown size={12} color="#94a3b8" style={{ transform: filesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
                </button>
                {filesOpen && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['SKILL.md', 'references/output-template.md'].map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', fontSize: 11, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                        <FileText size={10} color="#94a3b8" style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 社区实践 */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>社区实践</span>
                  <a style={{ fontSize: 10, fontWeight: 500, color: '#0d9488', cursor: 'pointer' }}>去广场</a>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {PRACTICES.map((p) => (
                    <li key={p.id}>
                      <a style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 12, color: '#64748b', padding: '4px 0',
                        cursor: 'pointer', transition: 'color 150ms',
                      }}>
                        <ArrowRight size={10} color="#cbd5e1" style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 同一仓库 */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>同一仓库</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {RELATED.map((s) => (
                    <a key={s.name} style={{
                      display: 'block', padding: 12, borderRadius: 12,
                      border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 150ms',
                    }}>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.name}
                      </h4>
                      <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.summary}
                      </p>
                    </a>
                  ))}
                  <button style={{
                    width: '100%', padding: '8px 0', fontSize: 11, fontWeight: 600,
                    color: '#64748b', background: '#f8fafc',
                    borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    更多 (8)
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* 评论区（错开 sidebar 宽度） */}
          <div style={{ maxWidth: 'calc(100% - 280px - 3rem)', marginTop: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 24px' }}>
              <span style={{ width: 6, height: 24, borderRadius: 999, background: '#3b82f6' }} />
              评论讨论区 (3)
            </h2>

            <div style={{ paddingLeft: 16, borderLeft: '2px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { author: 'M', nick: '后端-M', date: '2026-04-22', content: '这个结构化输入后 AI 生成的 Task 质量明显好。已在公司内 dogfood。' },
                { author: 'L', nick: '设计-L', date: '2026-04-21', content: '原型截图那部分能不能多给点例子？我这边 Figma 多' },
              ].map((c, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: -25, top: 0,
                    width: 12, height: 12, borderRadius: 999,
                    background: '#e2e8f0', boxShadow: '0 0 0 4px #fff',
                  }} />
                  <div style={{
                    background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9',
                    padding: 20, boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 999, background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={14} color="#94a3b8" />
                      </div>
                      <a style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>{c.nick}</a>
                      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{c.date}</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, margin: 0 }}>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compose */}
            <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', padding: 24, marginTop: 32, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <textarea
                placeholder="这个东西能在什么场景下用？写一下你的看法..."
                rows={4}
                style={{
                  width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: 12, padding: 16, fontSize: 14, marginBottom: 16,
                  outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>支持 Markdown 语法</span>
                <button style={{
                  padding: '8px 24px', background: '#0f172a', color: '#fff',
                  borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  投递评论
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
