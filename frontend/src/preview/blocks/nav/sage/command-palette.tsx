import { useState } from 'react';
import {
  BarChart3, Command, CornerDownLeft, Cpu, Database, FileCode2,
  FileText, Layout, MessageSquare, MoveDown, MoveUp, Search, Settings, Shield,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const ITEMS = [
  { Icon: Layout,    title: '空间管理',     desc: '管理所有工作区',                module: 'spaces' },
  { Icon: Database,  title: '数据源管理',   desc: 'CRUD MySQL / PostgreSQL / Oracle', module: 'datasource' },
  { Icon: Cpu,       title: '模型管理',     desc: '多 LLM 注册 + 用量',             module: 'admin/model-config' },
  { Icon: FileText,  title: '业务规则',     desc: '行级 / 列级 数据规则',          module: 'admin/business-rules' },
  { Icon: FileCode2, title: '预制 SQL',     desc: '常用查询模板库',                module: 'admin/prefab-sql' },
  { Icon: Shield,    title: '权限规则集',   desc: '规则集 + 用户分配',             module: 'admin/rules' },
  { Icon: Settings,  title: '核心配置',     desc: '空间默认设置',                  module: 'admin/core-config' },
  { Icon: BarChart3, title: '模型用量分析', desc: 'token / 调用次数',              module: 'analysis/usage' },
  { Icon: MessageSquare, title: '用户反馈分析', desc: '反馈占比 + 时间趋势',       module: 'analysis/feedback' },
];

export default function CommandPalettePreview() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = ITEMS.filter(i =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          BLOCK · NAV · OVERLAY
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Command Palette</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          Cmd/Ctrl + P 唤起 · admin 专属 · borderRadius 20 + 双层阴影
        </p>

        <div style={{
          width: 640, margin: '0 auto',
          background: '#fff',
          borderRadius: 20,
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.18), 0 12px 24px -12px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <Search size={18} color="#cbd5e1" />
            <input
              autoFocus
              placeholder="搜索..."
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(0); }}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 14, color: '#0f172a',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <span style={{
              padding: '2px 6px', background: '#f1f5f9', borderRadius: 4,
              fontSize: 10, color: '#94a3b8', fontWeight: 500,
            }}>ESC</span>
          </div>

          <div style={{ padding: 4, maxHeight: 400, overflowY: 'auto' }}>
            <div style={{ padding: '8px 12px', fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>应用</div>
            {filtered.length > 0 ? filtered.map((it, i) => {
              const Icon = it.Icon;
              const active = selected === i;
              return (
                <div
                  key={it.title}
                  onMouseEnter={() => setSelected(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 8,
                    background: active ? 'rgba(248,250,252,0.8)' : 'transparent',
                    color: active ? '#0ea5e9' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                  }}
                >
                  <span style={{
                    width: 32, height: 32, borderRadius: 6,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: active ? '#fff' : 'transparent',
                    boxShadow: active ? '0 1px 2px 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(15,23,42,0.05)' : 'none',
                    color: active ? '#0ea5e9' : '#94a3b8',
                  }}>
                    <Icon size={16} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2, color: active ? '#0ea5e9' : '#374151' }}>
                      {it.title}
                    </div>
                    <div style={{
                      fontSize: 12, color: '#94a3b8', marginTop: 2,
                      fontWeight: 300,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{it.desc}</div>
                  </div>
                  {active && <CornerDownLeft size={14} color="#cbd5e1" />}
                </div>
              );
            }) : (
              <div style={{ padding: '48px 0', textAlign: 'center', color: '#94a3b8' }}>
                <Command size={40} strokeWidth={1} color="#e5e7eb" />
                <div style={{ fontSize: 14, fontWeight: 300, marginTop: 12 }}>没有结果</div>
              </div>
            )}
          </div>

          <div style={{
            padding: '10px 16px',
            background: 'rgba(248,250,252,0.50)',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 11, color: '#94a3b8',
            backdropFilter: 'blur(2px)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Command size={12} />
              <span style={{ fontWeight: 500, color: '#64748b', marginLeft: 4 }}>Sage Command</span>
            </span>
            <span style={{ display: 'flex', gap: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <MoveUp size={10} /><MoveDown size={10} /> navigate
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <CornerDownLeft size={10} /> open
              </span>
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
