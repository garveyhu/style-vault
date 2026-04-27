import { PreviewFrame } from '../../../_layout';

const USERS = [
  { id: 1, n: 'archer', email: 'archer@sage.com', role: 'Owner', icon: '🌿', enabled: true },
  { id: 2, n: 'lyna', email: 'lyna@sage.com', role: 'Admin', icon: '🦊', enabled: true },
  { id: 3, n: 'zhao', email: 'zhao@sage.com', role: 'Member', icon: '⭐', enabled: true },
  { id: 4, n: 'sun', email: 'sun@sage.com', role: 'Member', icon: '🐱', enabled: false },
  { id: 5, n: 'wang', email: 'wang@sage.com', role: 'Member', icon: '☕', enabled: true },
];

export default function AdminTableManagementPreview() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>用户管理</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <input placeholder="搜索用户名 / 邮箱 / 角色" style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, width: 240 }} />
            <button style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ 新建用户</button>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
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
              {USERS.map(u => (
                <tr key={u.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ ...td, color: '#94a3b8', paddingLeft: 16 }}>{u.id}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{u.icon}</span>
                      <span style={{ fontWeight: 500 }}>{u.n}</span>
                    </div>
                  </td>
                  <td style={{ ...td, color: '#64748b' }}>{u.email}</td>
                  <td style={td}>
                    <span style={{ padding: '2px 8px', borderRadius: 4, background: '#10b981', color: '#fff', fontSize: 11, fontWeight: 500 }}>{u.role}</span>
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
                  <td style={{ ...td, color: '#64748b', fontSize: 12 }}>2026-04-01 12:30</td>
                  <td style={td}>
                    <span style={{ display: 'flex', gap: 6 }}>
                      <button style={btn}>⚙</button>
                      <button style={btn}>👥</button>
                      <button style={{ ...btn, color: '#dc2626' }}>🗑</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: 12, fontSize: 12, color: '#94a3b8', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
            <span>共 {USERS.length} 条</span>
            <span>第 1 页 · 每页 10 条</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 };
const td = { padding: 10 };
const btn = { background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 12 };
