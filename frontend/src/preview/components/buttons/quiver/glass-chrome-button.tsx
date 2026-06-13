import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function ChromeButton({
  children,
  hover,
  icon,
}: {
  children?: React.ReactNode;
  hover?: boolean;
  icon?: 'pause' | 'play';
}) {
  return (
    <button
      style={{
        fontFamily: UI,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.1px',
        color: hover ? '#eef2fb' : '#aab4cd',
        background: hover ? 'rgba(30,38,64,.9)' : 'rgba(18,24,42,.82)',
        backdropFilter: 'blur(8px) saturate(1.2)',
        border: `1px solid ${hover ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.09)'}`,
        borderRadius: 11,
        padding: icon ? '7px 9px' : '7px 11px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        cursor: 'pointer',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)',
      }}
    >
      {icon === 'pause' && (
        <span style={{ position: 'relative', width: 11, height: 11 }}>
          <span style={{ position: 'absolute', top: 1, bottom: 1, left: 1, width: 3, borderRadius: 1, background: 'currentColor' }} />
          <span style={{ position: 'absolute', top: 1, bottom: 1, right: 1, width: 3, borderRadius: 1, background: 'currentColor' }} />
        </span>
      )}
      {icon === 'play' && (
        <span style={{ position: 'relative', width: 11, height: 11 }}>
          <span style={{ position: 'absolute', top: 1, left: 2, width: 0, height: 0, borderLeft: '8px solid currentColor', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }} />
        </span>
      )}
      {children}
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 600,
        color: '#eef2fb',
        border: '1px solid rgba(255,255,255,.14)',
        borderRadius: 5,
        padding: '1px 5px',
        lineHeight: 1.3,
      }}
    >
      {children}
    </span>
  );
}

export default function GlassChromeButtonPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 48, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 420 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#ffd27a', textTransform: 'uppercase', marginBottom: 8 }}>
          BUTTON · QUIVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>玻璃 chrome 按钮</h1>
        <p style={{ fontSize: 13, color: '#aab4cd', margin: '0 0 32px', maxWidth: 560, lineHeight: 1.7 }}>
          顶栏次级工具键——磨砂玻璃底、可内嵌 mono 快捷键药丸、暂停/播放图标全用纯 CSS 画
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 28 }}>
          <ChromeButton><Kbd>⌘K</Kbd> 命令栏</ChromeButton>
          <ChromeButton>经理</ChromeButton>
          <ChromeButton hover>追溯</ChromeButton>
          <ChromeButton icon="pause" />
          <ChromeButton icon="play" />
        </div>

        {/* ctrl-grp 分组演示 */}
        <div style={{ display: 'inline-flex', gap: 11, padding: 10, borderRadius: 12, background: 'rgba(11,15,26,.5)' }}>
          <span style={{ display: 'inline-flex', gap: 3 }}>
            <ChromeButton>经理</ChromeButton>
            <ChromeButton>队列</ChromeButton>
            <ChromeButton>追溯</ChromeButton>
            <ChromeButton>晨报</ChromeButton>
          </span>
          <span style={{ display: 'inline-flex', gap: 3 }}>
            <ChromeButton>人事部</ChromeButton>
            <ChromeButton>记忆</ChromeButton>
            <ChromeButton>设置</ChromeButton>
          </span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#76819c', marginTop: 10 }}>
          .ctrl-grp 组内 gap 3 · 组间 gap 11——靠留白分组
        </div>
      </div>
    </PreviewFrame>
  );
}
