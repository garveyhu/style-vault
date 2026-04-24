import { ArrowRight, Box, Compass, Heart, MessageCircle, MessageSquare, Search, Settings, Sparkles, Star, Upload, User, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'];
const RANK = ['#FF6B6B', '#F7DC6F', '#45B7D1'];

const FEATURED = [
  { name: 'claude-api', summary: '用 Claude API 或 Anthropic SDK 构建应用', tag: 'AI SDK', like: 888, used: 4200, rating: 4.9 },
  { name: 'react-best-practices', summary: 'React 项目初始化 + 代码 review', tag: '前端', like: 660, used: 3100, rating: 4.8 },
  { name: 'systematic-debugging', summary: '先诊断再修，避免 shotgun debugging', tag: '工程', like: 502, used: 2150, rating: 4.7 },
  { name: 'canvas-design', summary: '用设计哲学创作海报', tag: '设计', like: 342, used: 1820, rating: 4.6 },
  { name: 'writing-plans', summary: '有 spec 时先写实现计划', tag: '规划', like: 218, used: 960, rating: 4.5 },
];

const GRID = [
  { name: 'brainstorming', summary: '动手前先探索意图与需求', version: '1.1.0', like: 176, used: 640, comment: 21 },
  { name: 'mcp-builder', summary: '构建高质量 MCP server 指南', version: '0.8.2', like: 141, used: 512, comment: 15 },
  { name: 'docx', summary: '读写 .docx 文档', version: '1.4.0', like: 118, used: 420, comment: 18 },
  { name: 'canvas-design', summary: '用设计哲学创作视觉稿', version: '1.2.0', like: 342, used: 1820, comment: 56 },
  { name: 'slack-gif', summary: '针对 Slack 优化的 GIF 创作', version: '0.3.1', like: 80, used: 220, comment: 9 },
  { name: 'xlsx', summary: 'Excel / CSV 操作', version: '1.0.0', like: 95, used: 340, comment: 12 },
];

function BorderTrace({ label }: { label: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGRectElement>(null);
  const [perim, setPerim] = useState(400);
  useEffect(() => { if (pathRef.current) setPerim(pathRef.current.getTotalLength()); }, []);
  const trail = perim * 0.2;
  const gap = perim - trail;
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg style={{ position: 'absolute', inset: -3, width: 'calc(100% + 6px)', height: 'calc(100% + 6px)', pointerEvents: 'none', overflow: 'visible' }}>
        <rect ref={pathRef} x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="none" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="16" ry="16" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" strokeDasharray={`${trail} ${gap}`} opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to={`${-perim}`} dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>
      <button ref={btnRef} style={{ padding: '12px 28px', background: '#2b2b2b', color: '#fff', border: 'none', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
        ✨ {label}
      </button>
    </div>
  );
}

export default function SkillCommunityHomePreview() {
  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <style>{`
        @keyframes sv-sch-flow { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }
      `}</style>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

        {/* Navbar */}
        <header style={{ padding: '12px 32px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}>
          <div style={{
            maxWidth: 1152, margin: '0 auto', background: '#fff', borderRadius: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', padding: '0 20px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', height: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }} />
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>SkillHub</span>
              </div>
              <nav style={{ display: 'flex', gap: 4, justifySelf: 'center' }}>
                {[{ l: '发现', i: <Compass size={15} />, a: true }, { l: '社区', i: <Sparkles size={15} /> }, { l: '发布', i: <Upload size={15} /> }, { l: '消息', i: <MessageSquare size={15} /> }, { l: '管理', i: <Settings size={15} /> }].map((x, k) => (
                  <button key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: x.a ? '#2b2b2b' : 'transparent', color: x.a ? 'rgba(255,255,255,0.95)' : '#666' }}>
                    {x.i}{x.l}
                  </button>
                ))}
              </nav>
              <div style={{ justifySelf: 'end' }}>
                <button style={{ padding: '6px 16px', borderRadius: 12, background: '#1a1a1a', color: '#fff', fontSize: 14, fontWeight: 500, border: 'none' }}>登录</button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section style={{ padding: '80px 32px 64px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 20px' }}>
            让 AI 技能{' '}
            <span style={{
              backgroundImage: 'linear-gradient(90deg, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6)',
              backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'sv-sch-flow 14s linear infinite',
            }}>
              流动起来
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 18, margin: '0 0 40px' }}>发现、安装、分享高质量的 AI Skill 技能包</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <BorderTrace label="发布 Skill" />
            <button style={{ padding: '12px 28px', border: '1px solid #d1d5db', background: 'transparent', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#374151', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              探索全部技能 <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* 榜单 */}
        <section style={{ maxWidth: 896, margin: '32px auto 0', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>精选 TOP Skills 榜单</h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>精选最值得安装的 Skills</p>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 200px', padding: '10px 16px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af', borderBottom: '1px solid #f3f4f6' }}>
              <span>#</span><span>Skill</span><span>分类</span><span style={{ textAlign: 'right' }}>数据</span>
            </div>
            {FEATURED.map((s, i) => (
              <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 200px', alignItems: 'center', padding: '12px 16px', borderBottom: i < FEATURED.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: i < 3 ? RANK[i] : '#cbd5e1' }}>{i + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: AVATAR[i % 12], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{s.name[0].toUpperCase()}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.summary}</div>
                  </div>
                </div>
                <div><span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>{s.tag}</span></div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Heart size={13} /> {s.like}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Users size={13} /> {s.used}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Star size={13} /> {s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 分类导航 + 搜索 */}
        <section style={{ maxWidth: 1280, margin: '64px auto 0', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>探索全部技能</h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>收录共 76 个 Skills</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            {['全部', '前端', '后端', '设计', 'AI', '工程'].map((t, i) => (
              <button key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 12, background: 'transparent', border: 'none', cursor: 'pointer', color: i === 0 ? '#0f766e' : '#9ca3af' }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? '#14b8a6' : '#f3f4f6', color: i === 0 ? '#fff' : '#9ca3af', boxShadow: i === 0 ? '0 2px 4px rgba(20,184,166,0.2)' : 'none' }}>
                  <Box size={22} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{t}</span>
              </button>
            ))}
          </div>

          <form style={{ maxWidth: 512, margin: '0 auto 32px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '0 auto 0 16px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#9ca3af' }}>
                <Search size={18} />
              </div>
              <input placeholder="搜索名称、标签或描述..." style={{
                width: '100%', padding: '12px 96px 12px 44px', background: '#fff',
                border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 14, color: '#111827',
                outline: 'none', fontFamily: 'inherit',
              }} />
              <button type="button" style={{
                position: 'absolute', inset: '6px 6px 6px auto', padding: '0 20px',
                background: '#14b8a6', color: '#fff', fontSize: 14, fontWeight: 600,
                borderRadius: 8, border: 'none', cursor: 'pointer',
              }}>搜索</button>
            </div>
          </form>
        </section>

        {/* 网格 */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>全部 Skill</h3>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', background: '#fff', padding: '4px 12px', borderRadius: 999, border: '1px solid #e5e7eb' }}>
              {GRID.length} 结果
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {GRID.map((s, i) => (
              <div key={s.name} style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: AVATAR[i % 12], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                    {s.name[0].toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</h4>
                    <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 600, color: '#64748b', background: '#f8fafc', padding: '2px 6px', borderRadius: 4, marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>v{s.version}</span>
                  </div>
                </div>
                <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', margin: '0 0 16px', flex: 1 }}>{s.summary}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#9ca3af', paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Heart size={12} /> {s.like}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {s.used}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MessageCircle size={12} /> {s.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
