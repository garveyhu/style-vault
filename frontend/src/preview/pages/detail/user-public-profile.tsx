import { MessageSquare, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

export default function UserPublicProfilePreview() {
  const [tab, setTab] = useState<'practices' | 'skills'>('practices');
  const [following, setFollowing] = useState(false);

  return (
    <PreviewFrame bg="#ffffff">
      <div style={{ maxWidth: 1024, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        {/* Hero 居中 */}
        <section style={{ padding: '48px 24px 40px', textAlign: 'center' }}>
          <div style={{
            width: 112, height: 112, borderRadius: 999,
            background: '#4ECDC4', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 44,
            boxShadow: '0 0 0 2px #f1f5f9, 0 4px 6px -1px rgba(0,0,0,0.1)',
            margin: '0 auto 20px',
          }}>
            M
          </div>

          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
            后端-M
          </h1>

          <p style={{ margin: '0 auto', fontSize: 15, color: '#64748b', lineHeight: 1.7, maxWidth: 480 }}>
            分布式系统工程师 · 最近在研究 LLM 应用的缓存策略
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, fontSize: 14 }}>
            <div><span style={{ fontWeight: 700, color: '#0f172a' }}>68</span> <span style={{ color: '#64748b' }}>关注</span></div>
            <div><span style={{ fontWeight: 700, color: '#0f172a' }}>312</span> <span style={{ color: '#64748b' }}>粉丝</span></div>
            <div><span style={{ fontWeight: 700, color: '#0f172a' }}>1.4k</span> <span style={{ color: '#64748b' }}>获赞</span></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            <button
              onClick={() => setFollowing(!following)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 24px', color: '#fff',
                borderRadius: 12, border: 'none',
                fontSize: 14, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
                background: following ? '#0f172a' : '#1a1a1a',
              }}
            >
              <UserPlus size={14} /> {following ? '已关注' : '关注'}
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', borderRadius: 12,
              border: '1px solid #cbd5e1', background: 'transparent',
              fontSize: 14, fontWeight: 500, color: '#374151',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <MessageSquare size={14} /> 私信
            </button>
          </div>
        </section>

        {/* Tabs 居中 */}
        <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 24, display: 'flex', justifyContent: 'center', gap: 32 }}>
          {([['practices', '实践 · 24'], ['skills', '技能 · 8']] as const).map(([k, l]) => {
            const active = tab === k;
            return (
              <button key={k} onClick={() => setTab(k)}
                style={{
                  padding: '14px 4px', background: 'transparent', border: 'none',
                  fontSize: 14, fontWeight: active ? 600 : 500,
                  color: active ? '#0f172a' : '#64748b',
                  borderBottom: `2px solid ${active ? '#0f172a' : 'transparent'}`,
                  marginBottom: -1, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                {l}
              </button>
            );
          })}
        </div>

        {/* 列表示例 */}
        <div style={{ padding: '0 24px 64px' }}>
          {tab === 'practices' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['claude-api + 缓存，成本降到 1/5', 'MCP server 入门 · 踩 7 个坑', 'LLM 搜索 agent 的 RAG 实战'].map((t, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{t}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>2 天前 · 124 赞 · 34 评</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#64748b', textAlign: 'center', padding: 32 }}>
              这里显示 M 的技能列表
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
