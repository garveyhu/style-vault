import { useState } from 'react';
import {
  Coffee, Feather, FolderOpen, Plus, Search, Settings, Star, Trash2, User,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const SPACES = [
  { name: '默认空间',  desc: '系统初始化',           members: 8,  ds: 5 },
  { name: '产品分析',  desc: '增长 / 留存 / 漏斗',   members: 12, ds: 5 },
  { name: '财务月报',  desc: '会计 / 应收应付',      members: 6,  ds: 3 },
  { name: 'BI 实验区', desc: '探索性分析',           members: 3,  ds: 1 },
];

const MEMBERS: Array<{ n: string; role: string; Icon: React.ComponentType<{ size?: number }> }> = [
  { n: 'archer', role: 'Owner',  Icon: Feather },
  { n: 'lyna',   role: 'Admin',  Icon: Star },
  { n: 'zhao',   role: 'Member', Icon: User },
  { n: 'sun',    role: 'Member', Icon: Coffee },
  { n: 'wang',   role: 'Member', Icon: User },
];

const T_HEX = '#10b981';

export default function SpaceManagementSplitPage() {
  const [active, setActive] = useState(1);
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e5e5', padding: 12 }}>
          <div style={{ padding: '0 4px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 16, color: '#171717' }}>
            <span>工作区</span>
            <button style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${T_HEX}1A`, color: T_HEX,
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Plus size={16} /></button>
          </div>
          <div style={{
            background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10,
            padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
            color: '#94a3b8', marginBottom: 12,
          }}>
            <Search size={16} />
            <input placeholder="搜索…" style={{
              background: 'transparent', border: 'none', outline: 'none',
              fontSize: 14, flex: 1, fontFamily: 'Inter, sans-serif',
            }} />
          </div>
          {SPACES.map((s, i) => (
            <div
              key={s.name}
              onClick={() => setActive(i)}
              style={{
                padding: 14, borderRadius: 12, marginBottom: 6,
                background: active === i ? '#f5f5f5' : 'transparent',
                border: `1px solid ${active === i ? '#e5e5e5' : 'transparent'}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: active === i ? 600 : 500, color: active === i ? '#171717' : '#475569' }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.desc}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{s.members} 成员 · {s.ds} 数据源</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', color: '#0f172a' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingBottom: 16, borderBottom: '1px solid #f5f5f5',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${T_HEX}26`, color: T_HEX,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><FolderOpen size={24} /></span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{SPACES[active].name}</h2>
                <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{SPACES[active].desc}</p>
              </div>
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

          <div style={{
            display: 'flex', gap: 16,
            paddingBottom: 4, borderBottom: '1px solid #e2e8f0',
            marginTop: 16, marginBottom: 16,
          }}>
            <span style={{ fontSize: 14, padding: '6px 4px', color: T_HEX, borderBottom: `2px solid ${T_HEX}`, cursor: 'pointer', fontWeight: 600 }}>成员</span>
            <span style={{ fontSize: 14, padding: '6px 4px', color: '#64748b', cursor: 'pointer' }}>模型配置</span>
            <span style={{ fontSize: 14, padding: '6px 4px', color: '#64748b', cursor: 'pointer' }}>核心配置</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
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
                    <tr key={m.n} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: '#fff', border: '1px solid #e2e8f0',
                            color: T_HEX,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          }}><M size={14} /></span>
                          <span>{m.n}</span>
                        </div>
                      </td>
                      <td style={td}>
                        <span style={{
                          padding: '2px 8px', borderRadius: 4,
                          background: T_HEX, color: '#fff',
                          fontSize: 11, fontWeight: 500,
                        }}>{m.role}</span>
                      </td>
                      <td style={{ ...td, color: '#64748b', fontSize: 13 }}>2026-01-15 12:30</td>
                      <td style={td}>
                        <span style={{ display: 'inline-flex', gap: 6 }}>
                          <button style={iconBtn}><Settings size={14} /></button>
                          <button style={{ ...iconBtn, color: '#dc2626' }}><Trash2 size={14} /></button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: 10 };
const iconBtn = { background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex' as const };
