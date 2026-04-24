import { Activity, AreaChart, Database, MessagesSquare, Package, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const TABS = ['仓库', '技能', '投稿', '实践', '评论', '用户'];

const STATS = [
  { icon: <Database size={16} />, label: '仓库', value: 12 },
  { icon: <Package size={16} />, label: '技能', value: 76 },
  { icon: <MessagesSquare size={16} />, label: '帖子', value: 184 },
  { icon: <Activity size={16} />, label: '评论', value: 920 },
  { icon: <Users size={16} />, label: '活跃用户', value: 1402 },
  { icon: <AreaChart size={16} />, label: '同步成功', value: 528 },
];

const ROWS = [
  { name: 'claude-api', url: 'github.com/anthropic/claude-skills', status: '已同步', lastSync: '10 分钟前', branch: 'main' },
  { name: 'react-best-practices', url: 'github.com/archer/react-skills', status: '已同步', lastSync: '1 小时前', branch: 'main' },
  { name: 'systematic-debugging', url: 'github.com/engineering/skills', status: '已同步', lastSync: '3 小时前', branch: 'main' },
  { name: 'canvas-design', url: 'github.com/design/skills', status: '同步中', lastSync: '—', branch: 'main' },
  { name: 'mcp-builder', url: 'github.com/claude/mcp-skills', status: '失败', lastSync: '2 天前', branch: 'develop' },
];

export default function AdminConsolePreview() {
  const [tab, setTab] = useState(0);
  return (
    <PreviewFrame bg="#f5f7fa" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

        {/* Navbar 简化版 */}
        <header style={{ padding: '12px 32px', background: 'rgba(255,255,255,0.8)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', height: 56, gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }} />
                <span style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>SkillHub</span>
              </div>
              <nav style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                <button style={{ padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', background: 'transparent', color: '#666', whiteSpace: 'nowrap' }}>发现</button>
                <button style={{ padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', background: '#2b2b2b', color: 'rgba(255,255,255,0.95)', whiteSpace: 'nowrap' }}>管理</button>
              </nav>
              <div>
                <button style={{ padding: '6px 12px', borderRadius: 12, background: 'transparent', border: 'none', fontSize: 14, color: '#555', whiteSpace: 'nowrap' }}>admin</button>
              </div>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', margin: '0 0 24px', color: '#0f172a' }}>
            管理后台
          </h1>

          {/* 总览 6 格 */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 32 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f8fafc', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 16, display: 'flex', gap: 24 }}>
            {TABS.map((t, i) => {
              const active = i === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  style={{
                    padding: '12px 0',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: active ? 600 : 500,
                    color: active ? '#0f172a' : '#6b7280',
                    borderBottom: `2px solid ${active ? '#0f172a' : 'transparent'}`,
                    marginBottom: -1,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 8, top: 7 }} />
              <input placeholder="搜索仓库..." style={{
                width: '100%', padding: '4px 8px 4px 28px', fontSize: 12,
                border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff',
                fontFamily: 'inherit', outline: 'none',
              }} />
            </div>
            <select style={{ padding: '4px 8px', fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6, width: 110, background: '#fff', color: '#64748b' }}>
              <option>状态</option>
            </select>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button style={{ padding: '4px 12px', fontSize: 12, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500 }}>新建仓库</button>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr 1fr 1fr', padding: '8px 16px', background: 'rgba(248, 250, 252, 0.5)', borderBottom: '1px solid #e2e8f0', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, color: '#64748b' }}>
              <span>仓库名</span><span>URL</span><span>状态</span><span>最后同步</span><span>分支</span>
            </div>
            {ROWS.map((r, i) => (
              <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr 1fr 1fr', padding: '8px 16px', borderBottom: i < ROWS.length - 1 ? '1px solid #f1f5f9' : 'none', fontSize: 13, color: '#0f172a', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{r.name}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748b', fontSize: 12 }}>{r.url}</span>
                <span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: r.status === '已同步' ? '#ecfdf5' : r.status === '同步中' ? '#fef3c7' : '#fef2f2', color: r.status === '已同步' ? '#059669' : r.status === '同步中' ? '#b45309' : '#dc2626' }}>
                    {r.status}
                  </span>
                </span>
                <span style={{ color: '#64748b', fontSize: 12 }}>{r.lastSync}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748b', fontSize: 12 }}>{r.branch}</span>
              </div>
            ))}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', fontSize: 12, color: '#94a3b8' }}>
              共 {ROWS.length} 条 · 跳至 ___ 页 · [10 条/页]
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
