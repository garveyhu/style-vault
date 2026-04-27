import { useState } from 'react';
import { FolderOpen, Plus, Search, UserMinus, Users } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const SPACES = [
  { name: '默认空间', desc: '系统初始化' },
  { name: '产品分析', desc: '12 成员 · 5 数据源' },
  { name: '财务月报', desc: '6 成员 · 3 数据源' },
  { name: 'BI 实验区', desc: '3 成员' },
];
const T_HEX = '#10b981';

export default function SidebarDetailSplitPreview() {
  const [active, setActive] = useState(1);

  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div style={{ display: 'flex', height: 600, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ width: 280, background: '#fff', borderRight: '1px solid #e5e5e5', padding: 12, display: 'flex', flexDirection: 'column' }}>
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
              transition: 'all 200ms',
            }}>
              <Plus size={16} />
            </button>
          </div>

          <div style={{ padding: '0 4px 16px 4px' }}>
            <div style={{
              background: '#fafafa', border: '1px solid #e5e5e5',
              borderRadius: 10, padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8',
            }}>
              <Search size={16} />
              <input placeholder="搜索…" style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 13, flex: 1, fontFamily: 'Inter, sans-serif',
              }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {SPACES.map((s, i) => (
              <div
                key={s.name}
                onClick={() => setActive(i)}
                style={{
                  padding: '12px 16px', borderRadius: 12, marginBottom: 8,
                  background: active === i ? '#f5f5f5' : 'transparent',
                  border: `1px solid ${active === i ? '#e5e5e5' : 'transparent'}`,
                  color: active === i ? '#171717' : '#737373',
                  cursor: 'pointer', transition: 'all 200ms',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: active === i ? 600 : 400 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', background: '#fff', color: '#0f172a' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingBottom: 16, borderBottom: '1px solid #f5f5f5',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${T_HEX}26`, color: T_HEX,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FolderOpen size={24} />
              </span>
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
            }}>
              <Plus size={14} /> 添加成员
            </button>
          </div>

          <div style={{ paddingTop: 16 }}>
            <div style={{
              display: 'flex', gap: 16,
              borderBottom: '1px solid #e2e8f0', paddingBottom: 4, marginBottom: 16,
            }}>
              {[
                { label: '成员', Icon: Users },
                { label: '权限', Icon: UserMinus },
                { label: '配置' },
                { label: '日志' },
              ].map((t, i) => (
                <span key={t.label} style={{
                  fontSize: 14, padding: '6px 4px',
                  color: i === 0 ? T_HEX : '#64748b',
                  borderBottom: i === 0 ? `2px solid ${T_HEX}` : '2px solid transparent',
                  cursor: 'pointer', fontWeight: i === 0 ? 600 : 400,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  {t.Icon && <t.Icon size={14} />}{t.label}
                </span>
              ))}
            </div>

            <div style={{ height: 240, background: '#fafafa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
              section content（成员表 / 权限管理 / 设置 / 日志）
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
