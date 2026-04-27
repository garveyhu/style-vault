import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

type ViewportKey = number | 'full';

const VIEWPORTS: { value: ViewportKey; label: string; desc: string; icon: string }[] = [
  { value: 375, label: '手机', desc: '375 px', icon: '▯' },
  { value: 768, label: '平板', desc: '768 px', icon: '▭' },
  { value: 1024, label: '桌面', desc: '1024 px', icon: '▢' },
  { value: 1440, label: '大屏', desc: '1440 px', icon: '◻' },
  { value: 'full', label: '全宽', desc: '响应式', icon: '⛶' },
];

function ViewportSelect({
  value,
  onChange,
}: {
  value: ViewportKey;
  onChange: (v: ViewportKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const cur = VIEWPORTS.find((v) => v.value === value)!;
  return (
    <div style={{ position: 'relative', width: 200 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        style={{
          width: '100%',
          height: 40,
          padding: '0 12px',
          background: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: 8,
          fontFamily: SANS,
          fontSize: 13,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#0f172a',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            background: '#f1f5f9',
            borderRadius: 6,
            color: '#64748b',
            fontSize: 14,
          }}
        >
          {cur.icon}
        </span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
          {cur.label}
        </span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{cur.desc}</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: 200,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            boxShadow: '0 12px 32px -10px rgba(15,23,42,0.18)',
            zIndex: 10,
            padding: 4,
          }}
        >
          {VIEWPORTS.map((v) => (
            <div
              key={String(v.value)}
              onMouseDown={() => {
                onChange(v.value);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                background: v.value === value ? '#f1f5f9' : 'transparent',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f8fafc')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  v.value === value ? '#f1f5f9' : 'transparent')
              }
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  background: '#f1f5f9',
                  borderRadius: 6,
                  color: '#64748b',
                  fontSize: 14,
                }}
              >
                {v.icon}
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
                {v.label}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowserChromeFramePreview() {
  const [viewport, setViewport] = useState<ViewportKey>(1024);
  const cur = VIEWPORTS.find((v) => v.value === viewport)!;
  const maxWidth = viewport === 'full' ? '100%' : `${viewport}px`;

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '40px 40px 56px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          blocks / layout / style-vault
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            marginBottom: 24,
          }}
        >
          Browser Chrome Frame
        </div>

        {/* toolbar · Select dropdown 形态 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <ViewportSelect value={viewport} onChange={setViewport} />
          <button
            style={{
              height: 40,
              padding: '0 16px',
              border: '1.5px solid #cbd5e1',
              background: '#fff',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: '#334155',
              cursor: 'pointer',
              fontFamily: SANS,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ⛶ 全屏预览
          </button>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#94a3b8',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
              }}
            />
            {cur.label}
          </div>
        </div>

        {/* browser chrome */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            background: '#fff',
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid #f1f5f9',
              background: '#f8fafc',
              padding: '10px 16px',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ff5f57',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#febc2e',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#28c840',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 500,
                color: '#64748b',
              }}
            >
              冷感漂浮 Hero
            </div>
            <div style={{ width: 64 }} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: '#f8fafc',
              padding: 16,
            }}
          >
            <div
              style={{
                maxWidth,
                width: '100%',
                maxHeight: '72vh',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 6,
                overflow: 'auto',
                transition: 'max-width 240ms ease',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: 360,
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at 20% 30%, rgba(207,250,254,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(226,232,240,0.55), transparent 60%), #fff',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                      marginBottom: 12,
                    }}
                  >
                    Style Vault · 风格库
                  </div>
                  <div
                    style={{
                      fontSize: viewport === 375 ? 26 : 44,
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: '#0f172a',
                      marginBottom: 16,
                    }}
                  >
                    为 AI 编码而造的
                    <br />
                    <span
                      style={{
                        backgroundImage:
                          'linear-gradient(to bottom right, #0891b2, #1e293b, #0f172a)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      设计风格库
                    </span>
                  </div>
                  <button
                    style={{
                      height: 44,
                      padding: '0 28px',
                      borderRadius: 9999,
                      background: '#0f172a',
                      color: '#fff',
                      border: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      boxShadow: '0 12px 32px -16px rgba(15,23,42,0.6)',
                    }}
                  >
                    进入风格库 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
