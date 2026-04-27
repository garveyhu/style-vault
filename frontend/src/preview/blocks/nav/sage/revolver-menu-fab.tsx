import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const KFCSS = `
@keyframes sv-rev-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes sv-rev-snow { 0% { transform: translateY(-10px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(380px); opacity: 0; } }
@keyframes sv-rev-pulsering { 0% { width: 64px; height: 64px; opacity: 0.5; } 100% { width: 130px; height: 130px; opacity: 0; } }
`;

const ITEMS = [
  { i: '👤', label: '用户' },
  { i: '🛡', label: '角色' },
  { i: '⚙', label: '配置' },
  { i: '💾', label: '数据源' },
  { i: '📦', label: 'Agents' },
  { i: '🧩', label: '规则' },
  { i: '📊', label: '用量' },
  { i: '💬', label: '反馈' },
  { i: '🔑', label: '密钥' },
  { i: '⏱', label: '时区' },
  { i: '🌐', label: '地区' },
  { i: '🔔', label: '通知' },
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
      <div style={{ position: 'relative', width: '100%', height: 600, fontFamily: 'Inter, sans-serif', overflow: 'hidden', background: 'rgb(249,249,249)' }}>
        {/* 控制 */}
        <div style={{ position: 'absolute', top: 16, left: 16, color: '#0f172a' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '6px 0 12px' }}>Revolver Menu FAB</h1>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {THEMES.map((th, i) => (
              <button key={i} onClick={() => setThemeIdx(i)} style={{ width: 22, height: 22, borderRadius: '50%', background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer' }} />
            ))}
          </div>
          <button onClick={() => setOpen(v => !v)} style={{ padding: '4px 10px', fontSize: 12, marginRight: 8, borderRadius: 6, background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {open ? '关闭' : '打开'}
          </button>
          <button onClick={() => setPinned(v => !v)} style={{ padding: '4px 10px', fontSize: 12, borderRadius: 6, background: pinned ? t.hex : '#cbd5e1', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {pinned ? '已 pin' : 'pin (开雪)'}
          </button>
        </div>

        {/* 雪 */}
        {pinned && Array.from({ length: 30 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute', top: -10,
            left: `${30 + (i * 14) % 60}%`,
            width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2,
            background: '#fff', borderRadius: '50%', filter: 'blur(1px)',
            opacity: 0.5 + (i % 3) * 0.15,
            animation: `sv-rev-snow ${4 + (i % 6)}s linear infinite`,
            animationDelay: `${-i * 0.3}s`,
          }} />
        ))}

        {/* FAB 中心 */}
        <div style={{ position: 'absolute', right: 100, bottom: 100, width: 0, height: 0 }}>
          {/* pulse ring */}
          {open && <span style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(-50%, -50%)', borderRadius: '50%', border: `2px solid ${t.hex}`, animation: 'sv-rev-pulsering 1.5s ease-out infinite' }} />}

          {/* inner ring items */}
          {open && ITEMS.slice(0, innerCount).map((it, i) => (
            <RingItem key={i} item={it} angle={30 * i + 15} radius={140} themeColor={t.hex} />
          ))}
          {/* outer ring items */}
          {open && outer.map((it, i) => (
            <RingItem key={'o' + i} item={it} angle={30 * i + 15} radius={200} themeColor={t.hex} delay={0.05 * i} />
          ))}

          {/* main button */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: open ? t.hex : 'transparent',
              border: 'none', cursor: 'pointer',
              boxShadow: pinned
                ? `0 0 20px ${t.hex}, 0 0 40px rgba(255,255,255,0.2)`
                : '0 4px 15px rgba(0,0,0,0.2)',
              transform: `translate(-50%, -50%) ${pinned ? 'scale(1.1)' : 'scale(1)'}`,
              transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <span style={{
              fontSize: 28, color: '#fff',
              animation: pinned ? 'sv-rev-spin 8s linear infinite' : 'none',
            }}>🌍</span>
          </button>
        </div>
      </div>
    </PreviewFrame>
  );
}

function RingItem({ item, angle, radius, themeColor, delay = 0 }: any) {
  const [h, setH] = useState(false);
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
          boxShadow: h ? `0 0 20px ${themeColor}40` : '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transform: h ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 200ms',
          fontSize: 18,
        }}
      >
        {item.i}
      </button>
      {h && (
        <span style={{
          position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(4px)', color: '#fff',
          padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>{item.label}</span>
      )}
    </div>
  );
}
