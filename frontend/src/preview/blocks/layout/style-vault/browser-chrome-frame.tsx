import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const VIEWPORTS: { value: number | 'full'; label: string; desc: string }[] = [
  { value: 375, label: '手机', desc: '375 px' },
  { value: 768, label: '平板', desc: '768 px' },
  { value: 1024, label: '桌面', desc: '1024 px' },
  { value: 1440, label: '大屏', desc: '1440 px' },
  { value: 'full', label: '全宽', desc: '响应式' },
];

export default function BrowserChromeFramePreview() {
  const [viewport, setViewport] = useState<number | 'full'>(1024);
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

        {/* toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 8px',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              background: '#fff',
            }}
          >
            {VIEWPORTS.map((v) => (
              <button
                key={String(v.value)}
                onClick={() => setViewport(v.value)}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  background: viewport === v.value ? '#0f172a' : 'transparent',
                  color: viewport === v.value ? '#fff' : '#64748b',
                  cursor: 'pointer',
                  fontFamily: SANS,
                  transition:
                    'background 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                {v.label}{' '}
                <span
                  style={{
                    fontSize: 10,
                    color: viewport === v.value ? '#cbd5e1' : '#cbd5e1',
                  }}
                >
                  {v.desc}
                </span>
              </button>
            ))}
          </div>
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
              {/* fake content */}
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
