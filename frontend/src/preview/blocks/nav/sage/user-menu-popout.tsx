import { useRef, useState } from 'react';
import { ConfigProvider } from 'antd';
import { Bird, Bot, Cat, ChevronLeft, ChevronRight, Crown, Dog, Feather, Fish, Flame, Flower, Globe, Heart, Leaf, LogOut, Rabbit, Smile, Sparkles, Star, Sun, Trees, Wind } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const THEMES: Array<{ name: string; hex: string; bg: string }> = [
  { name: 'green',  hex: '#10b981', bg: 'rgb(16,185,129)' },
  { name: 'blue',   hex: '#3b82f6', bg: 'rgb(59,130,246)' },
  { name: 'purple', hex: '#8b5cf6', bg: 'rgb(139,92,246)' },
  { name: 'pink',   hex: '#ec4899', bg: 'rgb(236,72,153)' },
  { name: 'amber',  hex: '#f59e0b', bg: 'rgb(245,158,11)' },
  { name: 'red',    hex: '#ef4444', bg: 'rgb(239,68,68)' },
  { name: 'cyan',   hex: '#06b6d4', bg: 'rgb(6,182,212)' },
  { name: 'orange', hex: '#f97316', bg: 'rgb(249,115,22)' },
  { name: 'teal',   hex: '#14b8a6', bg: 'rgb(20,184,166)' },
  { name: 'indigo', hex: '#6366f1', bg: 'rgb(99,102,241)' },
  { name: 'rose',   hex: '#f43f5e', bg: 'rgb(244,63,94)' },
  { name: 'slate',  hex: '#64748b', bg: 'rgb(100,116,139)' },
];

const AVATARS: Array<{ name: string; Icon: React.ComponentType<{ size?: number }> }> = [
  { name: 'crown', Icon: Crown }, { name: 'star', Icon: Star }, { name: 'feather', Icon: Feather },
  { name: 'cat', Icon: Cat }, { name: 'dog', Icon: Dog }, { name: 'bird', Icon: Bird },
  { name: 'fish', Icon: Fish }, { name: 'rabbit', Icon: Rabbit }, { name: 'bot', Icon: Bot },
  { name: 'flower', Icon: Flower }, { name: 'leaf', Icon: Leaf }, { name: 'trees', Icon: Trees },
  { name: 'sun', Icon: Sun }, { name: 'flame', Icon: Flame }, { name: 'wind', Icon: Wind },
  { name: 'heart', Icon: Heart }, { name: 'smile', Icon: Smile }, { name: 'sparkles', Icon: Sparkles },
];

export default function UserMenuPopoutPage() {
  const [open, setOpen] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const [avatar, setAvatar] = useState('crown');
  const themeScroll = useRef<HTMLDivElement>(null);
  const themeHex = THEMES[themeIdx].hex;

  const scrollThemes = (dir: 'left' | 'right') => {
    if (themeScroll.current) {
      themeScroll.current.scrollBy({ left: dir === 'left' ? -80 : 80, behavior: 'smooth' });
    }
  };

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: themeHex, borderRadius: 8 } }}>
        <div style={{ width: 256, padding: 16, position: 'relative', minHeight: 600, fontFamily: SAGE_FONT }}>
          {/* 用户行 */}
          <div style={{
            paddingTop: 8, borderTop: '1px solid #e2e8f0',
            position: 'absolute', bottom: 16, left: 16, right: 16,
          }}>
            <div
              onClick={() => setOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '6px 8px', borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#fff', border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: themeHex, fontWeight: 600,
                transition: 'transform 300ms',
              }}>
                <Crown size={18} />
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#334155' }}>admin</span>
            </div>

            {/* 浮层 */}
            {open && (
              <div style={{
                position: 'absolute', bottom: '100%', left: 0, width: '100%',
                marginBottom: 8,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.04)',
                padding: 6,
                zIndex: 20,
                animation: 'fadeInUp 300ms ease-out',
              }}>
                {/* 头像选择 */}
                <div style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', marginBottom: 4 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 8px' }}>头像</p>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6,
                    marginBottom: 12, maxHeight: 128, overflowY: 'auto', padding: 2,
                  }}>
                    {AVATARS.map(a => {
                      const sel = avatar === a.name;
                      const A = a.Icon;
                      return (
                        <button key={a.name} onClick={() => setAvatar(a.name)} style={{
                          width: 32, height: 32, borderRadius: '50%', border: 'none',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          background: sel ? themeHex : '#f1f5f9',
                          color: sel ? '#fff' : '#64748b',
                          transform: sel ? 'scale(1.1)' : 'scale(1)',
                          boxShadow: sel ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 200ms',
                        }}>
                          <A size={16} />
                        </button>
                      );
                    })}
                  </div>

                  {/* 主题色 */}
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 8px' }}>主题色</p>
                  <div className="theme-row" style={{ display: 'flex', alignItems: 'center', gap: 4, margin: '0 -6px' }}>
                    <button onClick={() => scrollThemes('left')} style={chevBtn}><ChevronLeft size={12} /></button>
                    <div ref={themeScroll} style={{
                      display: 'flex', gap: 6, overflowX: 'auto', padding: '4px 4px',
                      flex: 1, scrollBehavior: 'smooth',
                      scrollbarWidth: 'none',
                    }}>
                      {THEMES.map((t, i) => {
                        const sel = themeIdx === i;
                        return (
                          <button key={t.name} onClick={() => setThemeIdx(i)} style={{
                            flexShrink: 0,
                            width: 24, height: 24, borderRadius: '50%',
                            border: sel ? '2px solid #475569' : '2px solid transparent',
                            background: t.bg,
                            transform: sel ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: sel ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 200ms',
                          }} />
                        );
                      })}
                    </div>
                    <button onClick={() => scrollThemes('right')} style={chevBtn}><ChevronRight size={12} /></button>
                  </div>
                </div>

                {/* 语言 */}
                <button
                  onClick={() => setLangOpen(o => !o)}
                  style={menuBtn}
                >
                  <Globe size={16} />
                  <span>简体中文</span>
                </button>

                {/* 登出 */}
                <button style={{ ...menuBtn, color: '#dc2626' }}>
                  <LogOut size={16} />
                  <span>退出登录</span>
                </button>

                {/* 语言子菜单（模拟 portal）*/}
                {langOpen && (
                  <div style={{
                    position: 'absolute',
                    left: '100%', bottom: 50,
                    marginLeft: 8,
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.10)',
                    padding: 8,
                    minWidth: 160,
                    zIndex: 9999,
                  }}>
                    {/* 三角箭头：左侧白底 + slate 边 */}
                    <span style={{
                      position: 'absolute', right: '100%', top: '50%',
                      transform: 'translateY(-50%)', marginRight: -1,
                      borderTop: '7px solid transparent',
                      borderBottom: '7px solid transparent',
                      borderRight: '7px solid #e2e8f0',
                    }} />
                    <span style={{
                      position: 'absolute', right: '100%', top: '50%',
                      transform: 'translateY(-50%)',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderRight: '6px solid #fff',
                    }} />
                    {[
                      ['简体中文', 'zh'],
                      ['繁體中文', 'tw'],
                      ['English', 'en'],
                      ['日本語', 'ja'],
                    ].map(([lab]) => (
                      <button key={lab} style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '6px 10px', borderRadius: 6,
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontSize: 13, color: '#475569',
                        fontFamily: SAGE_FONT,
                      }}>{lab}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(8px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

const chevBtn: React.CSSProperties = {
  width: 16, height: 24, padding: 0,
  background: 'transparent', border: 'none', cursor: 'pointer',
  color: '#94a3b8',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

const menuBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  width: '100%', padding: '8px 12px', borderRadius: 8,
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontSize: 14, color: '#475569',
  fontFamily: SAGE_FONT,
};
