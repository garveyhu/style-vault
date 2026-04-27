import { Cat, Coffee, Feather, Plus, Settings, Star, Trash2, User, Users } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const USERS: Array<{ id: number; n: string; email: string; role: string; Icon: React.ComponentType<{ size?: number }>; enabled: boolean }> = [
  { id: 1, n: 'archer', email: 'archer@sage.com', role: 'Owner',  Icon: Feather, enabled: true },
  { id: 2, n: 'lyna',   email: 'lyna@sage.com',   role: 'Admin',  Icon: Star,    enabled: true },
  { id: 3, n: 'zhao',   email: 'zhao@sage.com',   role: 'Member', Icon: Cat,     enabled: true },
  { id: 4, n: 'sun',    email: 'sun@sage.com',    role: 'Member', Icon: Coffee,  enabled: false },
  { id: 5, n: 'wang',   email: 'wang@sage.com',   role: 'Member', Icon: User,    enabled: true },
];

export default function AdminTableManagementPage() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>用户管理</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <input placeholder="搜索用户名 / 邮箱 / 角色" style={{
              padding: '4px 12px', borderRadius: 8,
              border: '1px solid #d9d9d9',
              fontSize: 14, height: 32, width: 240, outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }} />
            <button style={{
              padding: '4px 14px', height: 32,
              background: '#10b981', color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 400, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: 'Inter, sans-serif',
            }}>
              <Plus size={14} /> 新建用户
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                <th style={th}>ID</th>
                <th style={th}>用户</th>
                <th style={th}>邮箱</th>
                <th style={th}>角色</th>
                <th style={th}>启用</th>
                <th style={th}>创建时间</th>
                <th style={th}>操作</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => {
                const M = u.Icon;
                return (
                  <tr key={u.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ ...td, color: '#94a3b8', paddingLeft: 16 }}>{u.id}</td>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: '#fff', border: '1px solid #e2e8f0',
                          color: '#10b981',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        }}><M size={14} /></span>
                        <span style={{ fontWeight: 500 }}>{u.n}</span>
                      </div>
                    </td>
                    <td style={{ ...td, color: '#64748b' }}>{u.email}</td>
                    <td style={td}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4,
                        background: '#10b981', color: '#fff',
                        fontSize: 11, fontWeight: 500,
                      }}>{u.role}</span>
                    </td>
                    <td style={td}>
                      <span style={{
                        display: 'inline-block', width: 32, height: 16, borderRadius: 8,
                        background: u.enabled ? '#10b981' : '#cbd5e1',
                        position: 'relative',
                        transition: 'background 200ms',
                      }}>
                        <span style={{
                          position: 'absolute', top: 2, left: u.enabled ? 18 : 2,
                          width: 12, height: 12, background: '#fff', borderRadius: '50%',
                          transition: 'left 200ms',
                        }} />
                      </span>
                    </td>
                    <td style={{ ...td, color: '#64748b', fontSize: 13 }}>2026-04-01 12:30</td>
                    <td style={td}>
                      <span style={{ display: 'inline-flex', gap: 6 }}>
                        <button style={iconBtn}><Settings size={14} /></button>
                        <button style={iconBtn}><Users size={14} /></button>
                        <button style={{ ...iconBtn, color: '#dc2626' }}><Trash2 size={14} /></button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{
            padding: 12, fontSize: 13, color: '#94a3b8',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>共 {USERS.length} 条</span>
            <span>第 1 页 · 每页 10 条</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: 10 };
const iconBtn = { background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex' as const };
