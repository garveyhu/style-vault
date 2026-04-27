import { useState } from 'react';
import {
  BarChart3, Cat, Coffee, Cpu, Database, Feather, FileCode2, FileText,
  FolderOpen, MoreHorizontal, Plus, Search, Settings, Shield, Star, User, Users,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const T_HEX = '#10b981';

const SPACES = [
  { name: '默认空间', members: 8 },
  { name: '产品分析', members: 12, active: true },
  { name: '财务月报', members: 6 },
  { name: 'BI 实验区', members: 3 },
  { name: '客户档案', members: 5 },
];

const CONFIG_ENTRIES: Array<{ Icon: React.ComponentType<{ size?: number }>; title: string; desc: string }> = [
  { Icon: Cpu,       title: '模型管理',  desc: '注册可用 LLM · 用量分配' },
  { Icon: Database,  title: '数据源',    desc: '数据库连接 · 表同步' },
  { Icon: FileText,  title: '业务规则',  desc: '行级 / 列级数据规则' },
  { Icon: FileCode2, title: '预制 SQL',  desc: '常用查询模板' },
  { Icon: Shield,    title: '权限规则集',desc: '规则集 + 用户分配' },
  { Icon: Settings,  title: '核心配置',  desc: '空间默认设置' },
  { Icon: BarChart3, title: '用量分析',  desc: '模型 token / 调用次数' },
  { Icon: FileText,  title: '反馈分析',  desc: '点赞 / 点踩 / 收藏' },
];

const MEMBERS: Array<{ n: string; role: string; Icon: React.ComponentType<{ size?: number }>; joined: string }> = [
  { n: 'archer', role: 'Owner',  Icon: Feather, joined: '2026-01-08' },
  { n: 'lyna',   role: 'Admin',  Icon: Star,    joined: '2026-01-12' },
  { n: 'zhao',   role: 'Member', Icon: Cat,     joined: '2026-02-04' },
  { n: 'sun',    role: 'Member', Icon: Coffee,  joined: '2026-02-18' },
  { n: 'wang',   role: 'Member', Icon: User,    joined: '2026-03-22' },
];

export default function SpaceManagementSplitPage() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif', background: '#fff' }}>
        {/* Sidebar 280px */}
        <div style={{
          width: 280, background: '#fff',
          borderRight: '1px solid #e5e5e5',
          padding: 12, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '0 4px 24px 4px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontWeight: 700, fontSize: 16, color: '#171717', letterSpacing: '-0.01em',
          }}>
            <span>工作区</span>
            <button style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${T_HEX}1A`, color: T_HEX,
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Plus size={16} /></button>
          </div>
          <div style={{
            padding: '0 4px 16px',
          }}>
            <div style={{
              background: '#fafafa', border: '1px solid #e5e5e5',
              borderRadius: 10, padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8',
            }}>
              <Search size={16} />
              <input placeholder="搜索空间…" style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 13, flex: 1, fontFamily: 'Inter, sans-serif',
              }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {SPACES.map(s => (
              <SpaceItem key={s.name} space={s} />
            ))}
          </div>
        </div>

        {/* MainContent · 注意 margin-left: -23 是源码里的小偏移 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
          {/* ContentHeader · 32 padding · h2 28 600 letter -0.03 + member-count pill */}
          <div style={{ padding: '32px 32px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <h2 style={{ fontSize: 28, fontWeight: 600, color: '#0f172a', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                产品分析
              </h2>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 20,
                background: '#fff', color: '#64748b',
                fontSize: 13, fontWeight: 500,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
              }}>
                <Users size={12} /> 12 成员
              </span>
            </div>
          </div>

          {/* ConfigCardsGrid · 5 列 · 16 gap */}
          <div style={{ padding: '0 32px 24px 32px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 16,
            }}>
              {CONFIG_ENTRIES.slice(0, 5).map(c => <ConfigCard key={c.title} c={c} />)}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 16, marginTop: 12,
            }}>
              {CONFIG_ENTRIES.slice(5).map(c => <ConfigCard key={c.title} c={c} />)}
            </div>
          </div>

          {/* MembersSection */}
          <div style={{
            flex: 1, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            background: '#fff',
            margin: '0 32px 32px 32px',
            borderRadius: 16,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid #f1f5f9',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 16, color: '#0f172a' }}>
                <Users size={16} color="#64748b" /> 成员
              </div>
              <button style={{
                padding: '4px 14px', height: 32,
                background: T_HEX, color: '#fff',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 400, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: 'Inter, sans-serif',
              }}><Plus size={14} /> 添加成员</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#fafafa', textAlign: 'left' }}>
                    <th style={th}>用户</th>
                    <th style={th}>角色</th>
                    <th style={th}>加入时间</th>
                    <th style={th}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {MEMBERS.map(m => {
                    const M = m.Icon;
                    return (
                      <tr key={m.n} style={{ borderTop: '1px solid #fafafa' }}>
                        <td style={td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              width: 28, height: 28, borderRadius: '50%',
                              background: `${T_HEX}1A`, color: T_HEX,
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            }}><M size={14} /></span>
                            <span>{m.n}</span>
                          </div>
                        </td>
                        <td style={td}>
                          <span style={{
                            padding: '2px 8px', borderRadius: 4,
                            background: m.role === 'Owner' ? T_HEX : '#f1f5f9',
                            color: m.role === 'Owner' ? '#fff' : '#475569',
                            fontSize: 11, fontWeight: 500,
                          }}>{m.role}</span>
                        </td>
                        <td style={{ ...td, color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 13 }}>{m.joined}</td>
                        <td style={td}>
                          <button style={iconBtn}><Settings size={14} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function SpaceItem({ space }: { space: typeof SPACES[0] }) {
  const [h, setH] = useState(false);
  const active = !!space.active;
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 12px', borderRadius: 10, marginBottom: 6,
        background: active ? '#f5f5f5' : (h ? '#fafafa' : 'transparent'),
        border: `1px solid ${active ? '#e5e5e5' : (h ? '#e5e5e5' : 'transparent')}`,
        color: active ? '#171717' : (h ? '#171717' : '#737373'),
        cursor: 'pointer', transition: 'all 200ms',
      }}
    >
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: active ? T_HEX : (h ? '#f5f5f5' : '#fafafa'),
        color: active ? '#fff' : (h ? '#525252' : '#a3a3a3'),
        marginRight: 14, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 200ms',
      }}>
        <FolderOpen size={16} />
      </span>
      <span style={{
        flex: 1, fontWeight: 600, fontSize: 14,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
      }}>{space.name}</span>
      <button style={{
        opacity: h || active ? 1 : 0,
        width: 28, height: 28, borderRadius: 6,
        background: 'transparent', border: 'none', color: '#94a3b8',
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 200ms',
      }}><MoreHorizontal size={14} /></button>
    </div>
  );
}

function ConfigCard({ c }: { c: typeof CONFIG_ENTRIES[0] }) {
  const [h, setH] = useState(false);
  const Icon = c.Icon;
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#fff', border: `1px solid ${h ? T_HEX : '#f1f5f9'}`,
        borderRadius: 16, padding: 20,
        cursor: 'pointer', transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: h
          ? `0 0 0 1px ${T_HEX}33, 0 4px 12px -2px rgba(0,0,0,0.08)`
          : '0 1px 3px rgba(0,0,0,0.02)',
        transform: h ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <span style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${T_HEX}1A`, color: T_HEX,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={24} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{c.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.desc}</div>
      </div>
    </div>
  );
}

const th = { padding: '12px 24px', background: 'transparent', color: '#737373', fontSize: 12, fontWeight: 600 as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em' };
const td = { padding: '16px 24px', color: '#404040' };
const iconBtn = { background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex' as const, padding: 4, borderRadius: 6 };
