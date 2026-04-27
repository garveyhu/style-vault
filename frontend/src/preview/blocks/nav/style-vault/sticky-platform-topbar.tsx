import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function PlatformTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        paddingBottom: 10,
        fontFamily: SANS,
        fontSize: 13,
        fontWeight: 500,
        color: active ? '#0f172a' : hov ? '#334155' : '#94a3b8',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        transition: 'color 200ms ease',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0891b2, #0f172a)',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </button>
  );
}

export default function StickyPlatformTopbarPreview() {
  const [platform, setPlatform] = useState('Web');

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* topbar (real demo, sticky inside scroll-frame doesn't make sense; just show it pinned at top) */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid #f1f5f9',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              height: 72,
              alignItems: 'center',
              gap: 32,
              padding: '0 40px',
            }}
          >
            {/* logo */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background:
                  'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'ui-monospace, monospace',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 300ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                flexShrink: 0,
              }}
            >
              SV
            </div>
            {/* nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <a
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                浏览
              </a>
              <a
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                产品集
              </a>
              {/* 搜索胶囊触发器 · 唤起 cmd-k-search-panel */}
              <button
                type="button"
                aria-label="搜索"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 36,
                  padding: '0 14px',
                  borderRadius: 9999,
                  border: '1px solid #e2e8f0',
                  background: 'rgba(255,255,255,0.6)',
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#64748b',
                  cursor: 'pointer',
                  transition:
                    'border-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1), background-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1), color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                <span style={{ fontSize: 14 }}>🔍</span>
                搜索风格
              </button>
            </nav>

            <div style={{ flex: 1 }} />

            {/* CENTER · platform pill (absolute) */}
            <div
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  pointerEvents: 'auto',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 28,
                }}
              >
                {['Web', 'iOS', 'Android'].map((p) => (
                  <PlatformTab
                    key={p}
                    label={p}
                    active={platform === p}
                    onClick={() => setPlatform(p)}
                  />
                ))}
              </div>
            </div>

            {/* right · avatar with online dot */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #67e8f9 0%, #1e293b 100%)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                L
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#10b981',
                    border: '2px solid #fff',
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* fake page below — to show 'sticky' aesthetic */}
        <div
          style={{
            position: 'relative',
            background: '#fafafa',
            padding: '40px 40px',
            minHeight: 360,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 8,
            }}
          >
            blocks / nav / style-vault
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              marginBottom: 16,
            }}
          >
            Sticky Platform Topbar
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#64748b',
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: 24,
            }}
          >
            sticky top-0 + bg-white/95 + backdrop-blur-xl 玻璃感顶栏。中间的
            platform underline tab 用绝对定位放在视口正中——不受左右内容长度影响。
            点击 Web / iOS / Android 试试切换下划线动画。
          </div>

          {/* fake card grid below */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 120,
                  background: '#fff',
                  border: '1px solid rgba(226,232,240,0.8)',
                  borderRadius: 12,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
