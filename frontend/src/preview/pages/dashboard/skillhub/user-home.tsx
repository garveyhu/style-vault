import { Edit3, Heart, LogOut, Send, Settings, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

type Tab = 'practices' | 'submissions' | 'likes';

const PRACTICES = [
  { id: 1, title: '用 canvas-design 批量生成产品海报', summary: '最近接了个活，要给 200+ SKU 生成风格统一的产品海报...', date: '2026-04-20' },
  { id: 2, title: 'systematic-debugging 的 5 问在我司的落地', summary: '团队新人最大的问题不是不懂 debugging，是直接跳去"改代码修 bug"...', date: '2026-04-18' },
];

const SUBMISSIONS = [
  { id: 1, name: 'canvas-design', time: '2026-04-10 14:22', status: 'approved' },
  { id: 2, name: 'form-field-extract', time: '2026-04-20 09:15', status: 'pending' },
  { id: 3, name: 'brand-guidelines-v2', time: '2026-04-15 18:40', status: 'rejected', reason: '命名与已有 skill 冲突' },
  { id: 4, name: 'data-viz-helper', time: '2026-04-22 11:08', status: 'reviewing' },
];

const LIKES = [
  { id: 1, name: 'claude-api', summary: '用 Claude API 或 Anthropic SDK 构建应用', author: 'anthropic' },
  { id: 2, name: 'react-best-practices', summary: 'React 项目初始化 + 代码 review 基线', author: 'archer' },
  { id: 3, name: 'mcp-builder', summary: '构建高质量 MCP server 指南', author: 'links' },
  { id: 4, name: 'systematic-debugging', summary: '先诊断再修，避免 shotgun debugging', author: 'engineering' },
];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#fef3c7', text: '#b45309' },
  approved: { bg: '#ecfdf5', text: '#059669' },
  rejected: { bg: '#fef2f2', text: '#dc2626' },
  reviewing: { bg: '#eff6ff', text: '#2563eb' },
};
const STATUS_LABEL: Record<string, string> = { pending: '待审核', approved: '已通过', rejected: '已拒绝', reviewing: '审核中' };

export default function UserHomePreview() {
  const [tab, setTab] = useState<Tab>('practices');

  return (
    <PreviewFrame bg="rgba(248,250,252,0.5)" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a', minHeight: 800 }}>

        {/* Profile Header · 单列居中 max-w-2xl */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '40px 24px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Avatar */}
              <div style={{
                width: 88, height: 88, borderRadius: 999,
                background: '#45B7D1', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 36,
                boxShadow: '0 0 0 4px #fff, 0 10px 15px -3px rgba(0,0,0,0.1)',
              }}>
                L
              </div>

              {/* Name */}
              <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: '16px 0 4px' }}>
                links
              </h1>
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>
                UID: 1024
              </span>

              {/* Bio */}
              <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', maxWidth: 384, margin: '0 0 20px', lineHeight: 1.7 }}>
                在构建 AI 技能社区 · SkillHub 维护者
              </p>

              {/* Stats · 3 列横排居中 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
                {[
                  { label: '获赞', value: 890, clickable: false },
                  { label: '关注', value: 42, clickable: true },
                  { label: '粉丝', value: 128, clickable: true },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center', cursor: s.clickable ? 'pointer' : 'default' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Actions · ghost 小字 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: '#94a3b8', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Edit3 size={12} /> 编辑资料
                </button>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: '#94a3b8', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Settings size={12} /> 管理后台
                </button>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: '#94a3b8', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <LogOut size={12} /> 登出
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs · 3 项居中 */}
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '24px 24px 96px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, borderBottom: '1px solid #e2e8f0', marginBottom: 24 }}>
            {([
              ['practices', '我的实践', <UsersIcon size={14} />],
              ['submissions', '发布的Skill', <Send size={14} />],
              ['likes', '我的赞过', <Heart size={14} />],
            ] as const).map(([k, l, icon]) => {
              const active = tab === k;
              return (
                <button key={k as string} onClick={() => setTab(k as Tab)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '12px 4px', fontSize: 14, fontWeight: 600,
                    color: active ? '#0f172a' : '#64748b',
                    borderBottom: `2px solid ${active ? '#0f172a' : 'transparent'}`,
                    background: 'transparent', border: 'none',
                    marginBottom: -1, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                  {icon} {l as string}
                </button>
              );
            })}
          </div>

          {/* Tab 内容 */}
          {tab === 'practices' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {PRACTICES.map((p) => (
                <div key={p.id} style={{
                  padding: 20, background: '#fff', borderRadius: 8,
                  border: '1px solid rgba(226,232,240,0.6)',
                  transition: 'box-shadow 200ms', cursor: 'pointer',
                }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {p.summary}
                  </p>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{p.date}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'submissions' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#6366f1', cursor: 'pointer' }}>
                  <Send size={13} /> 前往发布页管理
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {SUBMISSIONS.map((s) => {
                  const c = STATUS_COLOR[s.status];
                  return (
                    <div key={s.id} style={{
                      padding: '16px 20px', background: '#fff', borderRadius: 8,
                      border: '1px solid rgba(226,232,240,0.6)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '0 0 4px' }}>
                            {s.name}
                          </h4>
                          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>提交于 {s.time}</p>
                        </div>
                        <span style={{
                          fontSize: 12, fontWeight: 500, padding: '2px 10px',
                          borderRadius: 4, flexShrink: 0,
                          background: c.bg, color: c.text,
                        }}>
                          {STATUS_LABEL[s.status]}
                        </span>
                      </div>
                      {s.reason && (
                        <p style={{ marginTop: 8, fontSize: 12, color: '#f43f5e' }}>拒绝原因: {s.reason}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {tab === 'likes' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {LIKES.map((k) => (
                <div key={k.id} style={{
                  padding: '16px 20px', background: '#fff', borderRadius: 8,
                  border: '1px solid rgba(226,232,240,0.6)',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <Heart size={16} color="#f43f5e" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {k.name}
                      </h4>
                      <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 6px', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {k.summary}
                      </p>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{k.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
