import { Filter, Heart, MessageCircle, Search, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

const POSTS = [
  { title: '用 canvas-design 批量生成产品海报', author: '设计师-L', createdAt: '3 小时前', summary: '最近接了个活，要给 200+ SKU 生成风格统一的产品海报。试了 canvas-design 之后发现结构化比 prompt 硬写好用多了。', skills: ['canvas-design', 'brand-guidelines'], likes: 48, comments: 12 },
  { title: 'claude-api + 缓存，成本降到 1/5', author: '后端-M', createdAt: '1 天前', summary: 'Anthropic 的 prompt caching 真的是好东西，长 context 场景缓存命中后单次调用成本降到 20%。记录一下 caching 策略。', skills: ['claude-api'], likes: 124, comments: 34 },
  { title: 'react-best-practices 在大型项目里的实战坑', author: '前端-J', createdAt: '2 天前', summary: 'simple 档位跑 demo 很顺，放到 20+ 模块的真项目就开始痛。分享几个我们踩过的结构设计 / 类型收敛问题。', skills: ['react-best-practices'], likes: 86, comments: 22 },
  { title: 'systematic-debugging 的 5 问在我司的落地', author: '工程-K', createdAt: '4 天前', summary: '团队新人最大的问题不是不懂 debugging，是直接跳去"改代码修 bug"。强制用 5 问把"症状→假设→验证"讲清楚后成事率好多。', skills: ['systematic-debugging'], likes: 72, comments: 18 },
];

const LEADERBOARD = [
  { title: 'claude-api + 缓存，成本降到 1/5', author: '后端-M', likes: 124 },
  { title: 'react-best-practices 实战坑', author: '前端-J', likes: 86 },
  { title: '用 canvas-design 批量生成海报', author: '设计师-L', likes: 48 },
  { title: 'systematic-debugging 5 问落地', author: '工程-K', likes: 72 },
  { title: 'MCP server 入门 · 踩 7 个坑', author: '架构-P', likes: 64 },
];

export default function PracticePlazaPreview() {
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');
  return (
    <PreviewFrame bg="#f5f7fa" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        {/* Hero 紧凑 */}
        <section style={{ padding: '32px 32px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
            Skill 经验社区
          </h1>
          <div style={{ maxWidth: 512, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              padding: 8, borderRadius: 8, background: '#fff',
              border: '1px solid #e2e8f0', color: '#94a3b8', cursor: 'pointer',
            }}>
              <Filter size={16} />
            </button>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 13 }} />
              <input placeholder="搜索标题..." style={{
                width: '100%', padding: '10px 68px 10px 40px', borderRadius: 10,
                border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', background: '#fff',
                fontFamily: 'inherit',
              }} />
              <button style={{
                position: 'absolute', right: 4, top: 4, padding: '6px 14px',
                background: '#1a1a1a', color: '#fff', fontSize: 13, fontWeight: 600,
                borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>搜索</button>
            </div>
            <button style={{
              padding: '10px 20px', background: '#1a1a1a', color: '#fff',
              borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
            }}>
              <Sparkles size={13} /> 发布实践
            </button>
          </div>
        </section>

        {/* 主体 */}
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 32px 48px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <main>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              {(['latest', 'popular'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                    background: sort === s ? '#0f172a' : '#fff',
                    color: sort === s ? '#fff' : '#64748b',
                    border: sort === s ? 'none' : '1px solid #e2e8f0',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {s === 'latest' ? '最新' : '最热'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {POSTS.map((p, i) => (
                <div key={p.title} style={{
                  background: '#fff', borderRadius: 12,
                  border: '1px solid rgba(226,232,240,0.6)', padding: 16,
                  transition: 'all 200ms', cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 999, background: AVATAR[i % 8], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {p.author[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>
                        {p.author} <span style={{ color: '#9ca3af', fontWeight: 400 }}>· {p.createdAt}</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>{p.title}</h3>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {p.summary}
                      </p>
                      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        {p.skills.map((s) => (
                          <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Heart size={12} /> {p.likes}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MessageCircle size={12} /> {p.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside style={{ position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(226,232,240,0.6)', padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>社区榜单</div>
              {LEADERBOARD.map((item, i) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < LEADERBOARD.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? ['#FF6B6B', '#F7DC6F', '#45B7D1'][i] : '#cbd5e1', width: 18 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{item.author}</div>
                  </div>
                  <Star size={12} color="#f59e0b" />
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{item.likes}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}
