import { useState } from 'react';
import {
  Activity, Bird, BookOpen, Code, Cpu, Database, Fish, Globe, KeyRound,
  PieChart, Rabbit, Shield, UserCog,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const KFCSS = `
@keyframes sv-rev-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes sv-rev-snow { 0% { transform: translateY(-10px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(380px); opacity: 0; } }
@keyframes sv-rev-pulsering { 0% { width: 64px; height: 64px; opacity: 0.5; } 100% { width: 130px; height: 130px; opacity: 0; } }
`;

const ITEMS = [
  { Icon: UserCog, label: '用户' },
  { Icon: Shield, label: '角色' },
  { Icon: Cpu, label: '模型' },
  { Icon: Database, label: '数据源' },
  { Icon: BookOpen, label: '业务规则' },
  { Icon: Code, label: '预制 SQL' },
  { Icon: PieChart, label: '反馈分析' },
  { Icon: Activity, label: '用量分析' },
  { Icon: KeyRound, label: '密钥' },
  { Icon: Rabbit, label: '彩蛋' },
  { Icon: Bird, label: '彩蛋' },
  { Icon: Fish, label: '彩蛋' },
];

const THEMES = [
  { hex: '#10b981' }, { hex: '#22d3ee' }, { hex: '#fb7185' }, { hex: '#a78bfa' },
];

export default function RevolverMenuFabPreview() {
  const [open, setOpen] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  const innerCount = Math.min(4, ITEMS.length);
  const outer = ITEMS.slice(innerCount);

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <style>{KFCSS}</style>
      <div style={{
        position: 'relative', width: '100%', height: 600,
        fontFamily: 'Inter, sans-serif', overflow: 'hidden',
        background: pinned ? 'linear-gradient(180deg, #cbd5e1 0%, #f1f5f9 100%)' : 'rgb(249,249,249)',
        transition: 'background 400ms',
      }}>
        <div style={{ position: 'absolute', top: 16, left: 16, color: '#0f172a', zIndex: 200 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '6px 0 12px', letterSpacing: '-0.01em' }}>Revolver Menu FAB</h1>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {THEMES.map((th, i) => (
              <button key={i} onClick={() => setThemeIdx(i)} style={{
                width: 22, height: 22, borderRadius: '50%',
                background: th.hex,
                border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                cursor: 'pointer',
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setOpen(v => !v)} style={{
              padding: '4px 12px', fontSize: 12, borderRadius: 6,
              background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer',
            }}>{open ? '关闭' : '打开'}</button>
            <button onClick={() => setPinned(v => !v)} style={{
              padding: '4px 12px', fontSize: 12, borderRadius: 6,
              background: pinned ? t.hex : '#cbd5e1', color: '#fff', border: 'none', cursor: 'pointer',
            }}>{pinned ? '已 pin · 飘雪' : 'pin (开雪)'}</button>
          </div>
        </div>

        {pinned && Array.from({ length: 30 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute', top: -10,
            left: `${30 + (i * 14) % 70}%`,
            width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2,
            background: '#fff', borderRadius: '50%', filter: 'blur(1px)',
            opacity: 0.5 + (i % 3) * 0.15,
            animation: `sv-rev-snow ${4 + (i % 6)}s linear infinite`,
            animationDelay: `${-i * 0.3}s`,
          }} />
        ))}

        <div style={{ position: 'absolute', right: 100, bottom: 100, width: 0, height: 0 }}>
          {open && (
            <span style={{
              position: 'absolute', left: 0, top: 0,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%', border: `2px solid ${t.hex}`,
              animation: 'sv-rev-pulsering 1.5s ease-out infinite',
            }} />
          )}

          {open && ITEMS.slice(0, innerCount).map((it, i) => (
            <RingItem key={'i' + i} item={it} angle={30 * i + 15} radius={140} themeColor={t.hex} delay={i * 0.03} />
          ))}
          {open && outer.map((it, i) => (
            <RingItem key={'o' + i} item={it} angle={30 * i + 15} radius={200} themeColor={t.hex} delay={(i + innerCount) * 0.03} />
          ))}

          <button
            onClick={() => setOpen(v => !v)}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: open ? t.hex : '#fff',
              color: open ? '#fff' : t.hex,
              border: 'none', cursor: 'pointer',
              boxShadow: pinned
                ? `0 0 20px ${t.hex}, 0 0 40px rgba(255,255,255,0.20)`
                : '0 4px 15px rgba(0,0,0,0.20)',
              transform: `translate(-50%, -50%) ${pinned ? 'scale(1.1)' : 'scale(1)'}`,
              transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <span style={{
              display: 'inline-flex',
              animation: pinned ? 'sv-rev-spin 8s linear infinite' : 'none',
            }}>
              <Globe size={28} />
            </span>
          </button>
        </div>
      </div>
    </PreviewFrame>
  );
}

function RingItem({
  item, angle, radius, themeColor, delay,
}: {
  item: { Icon: React.ComponentType<{ size?: number }>; label: string };
  angle: number; radius: number; themeColor: string; delay: number;
}) {
  const [h, setH] = useState(false);
  const Icon = item.Icon;
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'absolute', left: 0, top: 0,
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(-${radius}px) rotate(${-angle}deg)`,
        transition: `transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      <button
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: h ? '#fff' : 'rgba(255,255,255,0.95)',
          color: h ? themeColor : '#4b5563',
          border: h ? `2px solid ${themeColor}` : '2px solid transparent',
          backdropFilter: 'blur(8px)',
          boxShadow: h ? `0 0 20px ${themeColor}66` : '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transform: h ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 200ms',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon size={20} />
      </button>
      {h && (
        <span style={{
          position: 'absolute', right: 60, top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(4px)',
          color: '#fff',
          padding: '6px 10px', borderRadius: 6,
          fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>{item.label}</span>
      )}
    </div>
  );
}
