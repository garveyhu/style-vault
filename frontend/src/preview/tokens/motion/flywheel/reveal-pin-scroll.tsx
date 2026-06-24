import { ArrowUp } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

const INK = '#1A1A1A';
const INK_SOFT = '#6E6A62';
const PAPER = '#FFF8EC';
const MINT = '#16C79A';
const YELLOW = '#FFD12E';

function Card({
  title,
  children,
  caption,
}: {
  title: string;
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <div
      style={{
        background: PAPER,
        border: '2.5px solid #1A1A1A',
        boxShadow: '3px 3px 0 #1A1A1A',
        padding: 16,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minHeight: 160,
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: 16,
          color: INK,
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {children}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: INK_SOFT }}>
        {caption}
      </div>
    </div>
  );
}

export default function RevealPinScrollPreview() {
  return (
    <PreviewFrame bg="#FFF8EC">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 40,
            color: INK,
            margin: '0 0 32px',
            letterSpacing: '-0.01em',
          }}
        >
          进场揭示 + 钉滚动效体系
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 28,
          }}
        >
          {/* 进场揭示 */}
          <Card title="进场揭示" caption="opacity 0→1 · y 28→0 · 0.6s · once">
            <div
              style={{
                width: 44,
                height: 44,
                background: YELLOW,
                border: '2.5px solid #1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUp size={20} color={INK} strokeWidth={2.5} />
            </div>
          </Card>

          {/* 钉滚脊梁 */}
          <Card title="钉滚脊梁" caption="sticky 520vh · 令牌穿行">
            <div style={{ width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  height: 8,
                  background: 'rgba(26,26,26,.15)',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '60%',
                    background: MINT,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '60%',
                    top: -8,
                    transform: 'translateX(-50%)',
                    width: 22,
                    height: 22,
                    background: YELLOW,
                    border: '2.5px solid #1A1A1A',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: i < 3 ? MINT : 'rgba(26,26,26,.2)',
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* scroll-spy */}
          <Card title="scroll-spy" caption="中线窄带高亮当前节">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
              }}
            >
              {['采集', '选题', '脚本', '分镜'].map((t, i) => {
                const active = i === 1;
                return (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 16,
                        background: active ? MINT : 'transparent',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 14,
                        fontWeight: active ? 900 : 400,
                        color: active ? INK : INK_SOFT,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 顶部进度 */}
          <Card title="顶部进度" caption="scaleX · useSpring">
            <div
              style={{
                width: '100%',
                height: 6,
                background: 'rgba(26,26,26,.15)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  background: MINT,
                  borderRadius: 3,
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </PreviewFrame>
  );
}
