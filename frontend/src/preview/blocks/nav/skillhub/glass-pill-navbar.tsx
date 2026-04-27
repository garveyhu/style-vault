import { useState } from 'react';
import { Compass, MessageSquare, Settings, Sparkles, Upload, User } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: boolean;
  authOnly?: boolean;
  adminOnly?: boolean;
};

const ITEMS: NavItem[] = [
  { id: 'discover', label: '发现', icon: <Compass size={15} /> },
  { id: 'practice', label: '社区', icon: <Sparkles size={15} /> },
  { id: 'publish', label: '发布', icon: <Upload size={15} />, authOnly: true },
  { id: 'messages', label: '消息', icon: <MessageSquare size={15} />, authOnly: true, badge: true },
  { id: 'admin', label: '管理', icon: <Settings size={15} />, adminOnly: true },
];

function NavbarDemo({
  isAuth, isAdmin, hasUnread, user,
}: {
  isAuth: boolean; isAdmin: boolean; hasUnread: boolean;
  user: { nickname: string } | null;
}) {
  const [active, setActive] = useState('discover');
  const visible = ITEMS.filter((i) => (!i.authOnly || isAuth) && (!i.adminOnly || isAdmin));
  return (
    <header style={{
      padding: '12px 32px', background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div style={{
        maxWidth: 1152, margin: '0 auto', background: '#fff',
        borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid #f3f4f6', padding: '0 20px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', height: 56, gap: 16 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }} />
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: '#1a1a1a', whiteSpace: 'nowrap' }}>SkillHub</span>
          </button>

          <nav style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {visible.map((i) => {
              const isActive = active === i.id;
              return (
                <button
                  key={i.id}
                  onClick={() => setActive(i.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 8,
                    fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 200ms',
                    background: isActive ? '#2b2b2b' : 'transparent',
                    color: isActive ? 'rgba(255,255,255,0.95)' : '#666',
                  }}
                >
                  <span style={{ position: 'relative', display: 'inline-flex' }}>
                    {i.icon}
                    {i.badge && hasUnread && (
                      <span style={{
                        position: 'absolute', top: -4, right: -4,
                        width: 6, height: 6, borderRadius: 999,
                        background: isActive ? '#fdba74' : '#f97316',
                      }} />
                    )}
                  </span>
                  {i.label}
                </button>
              );
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isAuth ? (
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 12,
                background: 'transparent', border: 'none',
                fontSize: 14, fontWeight: 500, color: '#555', cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 999, background: '#eee',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={13} color="#999" />
                </div>
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.nickname || '用户'}
                </span>
              </button>
            ) : (
              <button style={{
                padding: '6px 16px', borderRadius: 12,
                background: '#1a1a1a', color: '#fff',
                fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                登录
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function GlassPillNavbarPreview() {
  return (
    <PreviewFrame bg="#f5f7fa" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <NavbarDemo isAuth={false} isAdmin={false} hasUnread={false} user={null} />
        <div style={{ padding: 32, maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
            STATE 1 · 未登录
          </div>
        </div>

        <NavbarDemo isAuth={true} isAdmin={false} hasUnread={true} user={{ nickname: 'links' }} />
        <div style={{ padding: 32, maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
            STATE 2 · 已登录 · 有未读
          </div>
        </div>

        <NavbarDemo isAuth={true} isAdmin={true} hasUnread={false} user={{ nickname: 'admin' }} />
        <div style={{ padding: 32, maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
            STATE 3 · 管理员（多 "管理" tab）
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
