import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

type Tab = 'skills' | 'practices' | 'liked' | 'submissions' | 'following';

const SUBMISSIONS = [
  { name: 'canvas-design', status: 'approved', time: '2026-04-10' },
  { name: 'form-field-extract', status: 'pending', time: '2026-04-20' },
  { name: 'brand-guidelines-v2', status: 'rejected', time: '2026-04-15' },
  { name: 'data-viz-helper', status: 'reviewing', time: '2026-04-22' },
];
const STATUS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  pending: { bg: '#fef3c7', text: '#b45309', border: '#fde68a' },
  approved: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
  rejected: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  reviewing: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
};
const STATUS_LABEL: Record<string, string> = {
  pending: '待审核', approved: '已通过', rejected: '已拒绝', reviewing: '审核中',
};

export default function UserHomePreview() {
  const [tab, setTab] = useState<Tab>('submissions');

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1024, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

        {/* User 卡 */}
        <section style={{
          background: '#fff', borderRadius: 16, border: '1px solid rgba(226,232,240,0.6)',
          padding: 24, marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: '#45B7D1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 32, boxShadow: '0 0 0 2px #f1f5f9', flexShrink: 0 }}>
              L
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: 0 }}>links</h1>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>
                  管理员
                </span>
              </div>
              <p style={{ margin: '4px 0 12px', fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                在构建 AI 技能社区 · SkillHub 维护者
              </p>
              <div style={{ display: 'flex', gap: 20, fontSize: 14 }}>
                <div><span style={{ fontWeight: 700, color: '#0f172a' }}>42</span> <span style={{ color: '#64748b' }}>关注</span></div>
                <div><span style={{ fontWeight: 700, color: '#0f172a' }}>128</span> <span style={{ color: '#64748b' }}>粉丝</span></div>
                <div><span style={{ fontWeight: 700, color: '#0f172a' }}>890</span> <span style={{ color: '#64748b' }}>获赞</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', background: '#1a1a1a', color: '#fff',
                borderRadius: 12, border: 'none',
                fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Settings size={14} /> 编辑资料
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '6px 16px', borderRadius: 12,
                border: '1px solid #e2e8f0', background: 'transparent',
                fontSize: 14, fontWeight: 500, color: '#64748b',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <LogOut size={14} /> 退出
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 16, display: 'flex', gap: 24, padding: '0 4px' }}>
          {([
            ['skills', '我的技能'], ['practices', '我的实践'], ['liked', '点赞'],
            ['submissions', '投稿记录'], ['following', '关注'],
          ] as [Tab, string][]).map(([k, l]) => {
            const active = tab === k;
            return (
              <button key={k} onClick={() => setTab(k)}
                style={{
                  padding: '12px 0', background: 'transparent', border: 'none',
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

        {/* Tab 内容 */}
        {tab === 'submissions' && (
          <section style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(226,232,240,0.6)', padding: 8 }}>
            {SUBMISSIONS.map((s, i) => {
              const c = STATUS_COLOR[s.status];
              return (
                <div key={s.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: i < SUBMISSIONS.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.time}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '2px 10px', borderRadius: 999,
                    background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                  }}>
                    {STATUS_LABEL[s.status]}
                  </span>
                </div>
              );
            })}
          </section>
        )}

        {tab !== 'submissions' && (
          <section style={{ background: '#fff', borderRadius: 16, border: '1px dashed #e5e7eb', padding: 64, textAlign: 'center' }}>
            <div style={{ fontSize: 48, color: '#d1d5db', marginBottom: 12 }}>∅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>暂无内容</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>切到"投稿记录"看完整示范</div>
          </section>
        )}
      </div>
    </PreviewFrame>
  );
}
