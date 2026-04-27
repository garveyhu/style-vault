import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SPACES = [
  { name: '默认空间', desc: '系统初始化', members: 8, ds: 5 },
  { name: '产品分析', desc: '增长 / 留存 / 漏斗', members: 12, ds: 5 },
  { name: '财务月报', desc: '会计 / 应收应付', members: 6, ds: 3 },
  { name: 'BI 实验区', desc: '探索性分析', members: 3, ds: 1 },
];
const MEMBERS = [
  { n: 'archer', role: 'Owner', icon: '🌿' },
  { n: 'lyna', role: 'Admin', icon: '🦊' },
  { n: 'zhao', role: 'Member', icon: '⭐' },
  { n: 'sun', role: 'Member', icon: '🐱' },
  { n: 'wang', role: 'Member', icon: '☕' },
];
const T_HEX = '#10b981';

export default function SpaceManagementSplitPreview() {
  const [active, setActive] = useState(1);
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 720, fontFamily: 'Inter, sans-serif' }}>
        {/* Sidebar */}
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e5e5', padding: 12 }}>
          <div style={{ padding: '0 4px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 16 }}>
            <span>工作区</span>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: `${T_HEX}1A`, color: T_HEX, border: 'none', cursor: 'pointer', fontSize: 14 }}>+</button>
          </div>
          <input placeholder="搜索…" style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e5e5e5', background: '#fafafa', fontSize: 13, outline: 'none', marginBottom: 12 }} />
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
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{s.desc}</div>
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>{s.members} 成员 · {s.ds} 数据源</div>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', color: '#0f172a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #f5f5f5' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: `${T_HEX}26`, color: T_HEX, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🗂</span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>{SPACES[active].name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{SPACES[active].desc}</p>
              </div>
            </div>
            <button style={{ padding: '6px 14px', background: T_HEX, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ 添加成员</button>
          </div>

          <div style={{ display: 'flex', gap: 16, paddingBottom: 4, borderBottom: '1px solid #e2e8f0', marginTop: 16, marginBottom: 16 }}>
            <span style={{ fontSize: 13, padding: '6px 4px', color: T_HEX, borderBottom: `2px solid ${T_HEX}`, cursor: 'pointer', fontWeight: 600 }}>成员</span>
            <span style={{ fontSize: 13, padding: '6px 4px', color: '#64748b', cursor: 'pointer' }}>模型配置</span>
            <span style={{ fontSize: 13, padding: '6px 4px', color: '#64748b', cursor: 'pointer' }}>核心配置</span>
          </div>

          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>用户</th>
                <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>角色</th>
                <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>加入时间</th>
                <th style={{ padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map(m => (
                <tr key={m.n} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', color: T_HEX, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{m.icon}</span>
                      <span>{m.n}</span>
                    </div>
                  </td>
                  <td style={{ padding: 10 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 4, background: T_HEX, color: '#fff', fontSize: 11, fontWeight: 500 }}>{m.role}</span>
                  </td>
                  <td style={{ padding: 10, color: '#64748b', fontSize: 12 }}>2026-01-15 12:30</td>
                  <td style={{ padding: 10 }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer' }}>⚙</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', marginLeft: 8 }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewFrame>
  );
}
