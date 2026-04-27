import { useState } from 'react';
import {
  Activity, Bird, BookOpen, Code, Cpu, Database, Fish, Globe, KeyRound,
  PieChart, Rabbit, Shield, UserCog,
} from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const KFCSS = `
@keyframes sv-rev-bling { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
@keyframes sv-rev-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes sv-rev-snow {
  0%   { transform: translateY(-10px) translateX(0); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(380px) translateX(20px); opacity: 0; }
}
@keyframes sv-rev-pulsering {
  0%   { width: 64px; height: 64px; opacity: 0.5; }
  100% { width: 128px; height: 128px; opacity: 0; }
}
`;

const ITEMS = [
  { Icon: UserCog,  label: '用户管理' },
  { Icon: Shield,   label: '角色权限' },
  { Icon: Cpu,      label: '模型管理' },
  { Icon: Database, label: '数据源' },
  { Icon: BookOpen, label: '业务规则' },
  { Icon: Code,     label: '预制 SQL' },
  { Icon: PieChart, label: '反馈分析' },
  { Icon: Activity, label: '用量分析' },
  { Icon: KeyRound, label: '密钥' },
];

const THEMES = [
  { hex: '#10b981' }, { hex: '#22d3ee' }, { hex: '#fb7185' }, { hex: '#a78bfa' },
];

export default function RevolverMenuFabPreview() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  const inner = ITEMS.slice(0, 4);
  const outer = ITEMS.slice(4);

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <style>{KFCSS}</style>
      <div style={{
        position: 'relative', width: '100%', height: 600,
        fontFamily: 'Inter, sans-serif', overflow: 'hidden',
        background: 'rgb(249,249,249)',
      }}>
        {/* 控制台 */}
        <div style={{ position: 'absolute', top: 16, left: 16, color: '#0f172a', zIndex: 200 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · NAV</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '6px 0 12px', letterSpacing: '-0.01em' }}>雪人飘雪左轮菜单</h1>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, maxWidth: 360, lineHeight: 1.6 }}>
            屏幕右下角浮动按钮 · 闭合态显雪人 + 飘雪 · 打开态显地球 + 内环 4 项 / 外环最多 8 项 · 钉住后地球旋转 + Bird / Fish / Rabbit 绕飞
          </div>
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
            <button onClick={() => setOpen(v => !v)} style={ctrlBtn}>{open ? '关闭菜单' : '打开菜单'}</button>
            <button onClick={() => setPinned(v => !v)} style={{ ...ctrlBtn, background: pinned ? t.hex : '#cbd5e1' }}>
              {pinned ? '已 pin · 地球转动' : 'pin · 钉住菜单'}
            </button>
          </div>
        </div>

        {/* 飘雪 · 仅在闭合态显示（! isOpen） */}
        {!open && Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute',
            top: -10,
            right: `${20 + (i * 7) % 80}%`,
            width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2,
            background: '#fff', borderRadius: '50%', filter: 'blur(1px)',
            opacity: 0.5 + (i % 3) * 0.15,
            animation: `sv-rev-snow ${4 + (i % 6)}s linear infinite`,
            animationDelay: `${-i * 0.3}s`,
            pointerEvents: 'none',
            boxShadow: '0 0 4px rgba(255,255,255,0.6)',
          }} />
        ))}

        {/* FAB 容器 · fixed right 30 bottom 30 (源码) */}
        <div style={{ position: 'absolute', right: 30, bottom: 30, width: 0, height: 0 }}>
          {/* PulseRing · 仅打开态显示 */}
          {open && (
            <span style={{
              position: 'absolute', left: 0, top: 0,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: `2px solid ${t.hex}`,
              animation: 'sv-rev-pulsering 1.5s ease-out infinite',
            }} />
          )}

          {/* 内环 · 4 项 · 140px 半径 · 30deg 步长 */}
          {open && inner.map((it, i) => (
            <RingItem key={'i' + i} item={it} angle={30 * i + 0} radius={140} themeColor={t.hex} delay={i * 0.03} />
          ))}
          {/* 外环 · 多余项 · 200px 半径 · 30deg 步长 + 15deg 偏移 */}
          {open && outer.map((it, i) => (
            <RingItem key={'o' + i} item={it} angle={30 * i + 15} radius={200} themeColor={t.hex} delay={(i + inner.length) * 0.03} />
          ))}

          {/* 主按钮 · 闭合 → 雪人 / 打开 → 地球 */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: open ? t.hex : '#fff',
              color: '#fff',
              border: 'none', cursor: 'pointer',
              boxShadow: pinned
                ? `0 0 20px ${t.hex}, 0 0 40px rgba(255,255,255,0.20)`
                : open
                  ? '0 4px 15px rgba(0,0,0,0.30)'
                  : '0 2px 8px rgba(0,0,0,0.10)',
              opacity: pinned ? 1 : (open ? 0.85 : 0.9),
              transform: `translate(-50%, -50%) ${pinned ? 'scale(1.1)' : 'scale(1)'}`,
              transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {!open ? (
              <>
                {/* 圆形容器 · 装雪人 + 雪堆 · overflow hidden */}
                <SnowmanInButton themeColor={t.hex} />
                {/* 静态雪人帽子 · 浮在按钮外侧（源码 Static Hat on top of MainButton） */}
                <SnowmanHat themeColor={t.hex} />
              </>
            ) : (
              <EarthInButton themeColor={t.hex} pinned={pinned} />
            )}
          </button>
        </div>
      </div>
    </PreviewFrame>
  );
}

/** 雪人帽子 · 独立元素 · 浮在按钮顶部外侧（源码 SnowmanHat 20×14 主题色 + 5px 白檐 + 顶球） */
function SnowmanHat({ themeColor }: { themeColor: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: -4,
        left: '50%',
        transform: 'translateX(-50%) rotate(15deg)',
        width: 20, height: 14,
        background: themeColor,
        borderRadius: '6px 6px 2px 2px',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.20)',
        zIndex: 6,
        pointerEvents: 'none',
      }}
    >
      {/* 白色帽檐 */}
      <span style={{
        position: 'absolute', bottom: -2, left: -3, right: -3,
        height: 5, background: '#fff',
        borderRadius: 3,
        boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
      }} />
      {/* 主题色顶球 */}
      <span style={{
        position: 'absolute', top: -5, right: -5,
        width: 8, height: 8,
        background: themeColor,
        borderRadius: '50%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
      }} />
    </div>
  );
}

/** 雪人 · 头 + 身 + scarf + 黑眼 + 橙鼻 + 黑扣 + 底部雪堆。源码 SnowmanIcon 36×43 · align-items: center */
function SnowmanInButton({ themeColor }: { themeColor: string }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      borderRadius: '50%', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {/* 雪人主体 · 垂直居中（源码 SnowmanContainer 用 align-items: center） */}
      <div style={{
        position: 'relative',
        width: 36, height: 43,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.20))',
        zIndex: 2,
      }}>
        {/* Head */}
        <div style={{
          width: 19, height: 19,
          background: '#fff', borderRadius: '50%',
          marginBottom: -4,
          position: 'relative',
          boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.10)',
        }}>
          {/* Eyes */}
          <span style={{ position: 'absolute', top: 6, left: 5, width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
          <span style={{ position: 'absolute', top: 6, right: 5, width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
          {/* Nose · 橙色三角 */}
          <span style={{
            position: 'absolute', top: 9, left: '50%',
            transform: 'translateX(-30%) rotate(90deg)',
            width: 0, height: 0,
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderBottom: '8px solid #f97316',
          }} />
        </div>
        {/* Body */}
        <div style={{
          width: 30, height: 30,
          background: '#fff', borderRadius: '50%',
          position: 'relative',
          boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.10)',
        }}>
          {/* Scarf · 主题色 */}
          <span style={{
            position: 'absolute', top: -2, left: '50%',
            transform: 'translateX(-50%)',
            width: 22, height: 6,
            background: themeColor,
            borderRadius: 4,
          }} />
          {/* 3 黑色扣子（源码 RevolverMenu.tsx 638-652） */}
          <div style={{
            position: 'absolute', top: 9, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <span style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
            <span style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
            <span style={{ width: 3, height: 3, background: '#1e293b', borderRadius: '50%' }} />
          </div>
          {/* 左手 · 棕色细枝（源码 RevolverMenu.tsx 654-665） */}
          <span style={{
            position: 'absolute', top: 9, left: -10,
            width: 11, height: 2,
            background: '#78350f',
            transform: 'rotate(-20deg)',
            borderRadius: 2,
          }} />
          {/* 右手 · 棕色细枝（源码 RevolverMenu.tsx 666-677） */}
          <span style={{
            position: 'absolute', top: 9, right: -10,
            width: 11, height: 2,
            background: '#78350f',
            transform: 'rotate(20deg)',
            borderRadius: 2,
          }} />
        </div>
      </div>
      {/* SnowPile · 底部白色椭圆雪堆 · 仅做"地平线"暗示，不漫白光 */}
      <div style={{
        position: 'absolute', bottom: -8,
        left: '-10%', width: '120%', height: 12,
        background: '#fff',
        borderRadius: '50% 50% 0 0',
        filter: 'blur(0.5px)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/** 地球 · 打开态。pinned 时 Globe 旋转 + 3 动物绕圈飞 */
function EarthInButton({ themeColor: _, pinned }: { themeColor: string; pinned: boolean }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Globe
        size={24}
        color="#fff"
        style={{
          animation: pinned ? 'sv-rev-spin 8s linear infinite' : 'none',
          transition: 'transform 500ms ease',
        }}
      />
      {pinned && (
        <>
          <Animal Icon={Bird}   delay={0}   radius={26} duration={4} />
          <Animal Icon={Fish}   delay={1.5} radius={30} duration={5} />
          <Animal Icon={Rabbit} delay={3}   radius={24} duration={3.5} />
        </>
      )}
    </div>
  );
}

function Animal({ Icon, delay, radius, duration }: {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  delay: number; radius: number; duration: number;
}) {
  // 圆形轨道：rotate(t) translateX(r) rotate(-t) 让图标始终朝上
  const kf = `
    @keyframes sv-rev-orbit-${radius}-${duration} {
      from { transform: rotate(0deg) translateX(${radius}px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(${radius}px) rotate(-360deg); }
    }
  `;
  return (
    <>
      <style>{kf}</style>
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 12, height: 12,
        marginTop: -6, marginLeft: -6,
        animation: `sv-rev-orbit-${radius}-${duration} ${duration}s linear infinite`,
        animationDelay: `-${delay}s`,
        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.50))',
        color: '#fff',
        display: 'inline-flex',
        pointerEvents: 'none',
      }}>
        <Icon size={12} color="#fff" />
      </span>
    </>
  );
}

function RingItem({ item, angle, radius, themeColor, delay }: {
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
        width: 52, height: 52,
        marginTop: -26, marginLeft: -26,
        transform: `rotate(${angle}deg) translateX(-${radius}px) rotate(${-angle}deg) scale(1)`,
        transition: `transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      <button
        style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: h ? '#fff' : 'rgba(255,255,255,0.95)',
          color: h ? themeColor : '#4b5563',
          border: h ? `2px solid ${themeColor}` : '2px solid transparent',
          backdropFilter: 'blur(8px)',
          boxShadow: h ? `0 0 20px ${themeColor}66` : '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transform: h ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 200ms',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Icon size={20} />
      </button>
      {h && (
        <span style={{
          position: 'absolute', right: 60, top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(15, 23, 42, 0.90)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          padding: '6px 10px', borderRadius: 6,
          fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
          pointerEvents: 'none',
        }}>{item.label}</span>
      )}
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  padding: '4px 12px', fontSize: 12, borderRadius: 6,
  background: '#0f172a', color: '#fff',
  border: 'none', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
};
