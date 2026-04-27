import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const SECTIONS = [
  { id: 'style', n: '01', label: '风格', count: 1 },
  { id: 'pages', n: '02', label: '页面', count: 3 },
  { id: 'blocks', n: '03', label: '模块', count: 5 },
  { id: 'components', n: '04', label: '组件', count: 4 },
  { id: 'tokens', n: '05', label: '原语', count: 4 },
];

export default function StickyTocProductPreview() {
  const [active, setActive] = useState('style');

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* Cover Hero */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#fff',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -96,
              top: -96,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'rgba(207,250,254,0.4)',
              filter: 'blur(64px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -96,
              bottom: 0,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(226,232,240,0.5)',
              filter: 'blur(64px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'relative',
              maxWidth: 1100,
              margin: '0 auto',
              padding: '80px 32px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                borderRadius: 9999,
                border: '1px solid #e2e8f0',
                background: 'rgba(255,255,255,0.9)',
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#64748b',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#6366f1',
                }}
              />
              产品 · 设计
            </span>
            <h1
              style={{
                margin: '20px auto 0',
                maxWidth: 900,
                fontSize: 64,
                fontWeight: 600,
                lineHeight: 1.03,
                letterSpacing: '-0.025em',
              }}
            >
              Style Vault
            </h1>
            <p
              style={{
                margin: '20px auto 0',
                maxWidth: 640,
                fontSize: 17,
                lineHeight: 1.6,
                color: '#64748b',
              }}
            >
              为 AI 编码而造的设计风格库——六个层级，六道清晰边界。
            </p>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 40,
                  padding: '0 20px',
                  borderRadius: 9999,
                  background: '#0f172a',
                  color: '#fff',
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: SANS,
                }}
              >
                ⧉ 复制 Prompt{' '}
                <span style={{ color: '#64748b' }}>·</span>{' '}
                <span style={{ color: '#cbd5e1' }}>一键复刻整套设计系统</span>
              </button>
              <button
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ♡
              </button>
            </div>
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 12,
                color: '#64748b',
              }}
            >
              <span
                style={{
                  padding: '2px 12px',
                  borderRadius: 9999,
                  border: '1px solid #e2e8f0',
                  background: 'rgba(255,255,255,0.7)',
                }}
              >
                Web
              </span>
              <span
                style={{
                  padding: '2px 12px',
                  borderRadius: 9999,
                  border: '1px solid #e2e8f0',
                  background: 'rgba(255,255,255,0.7)',
                }}
              >
                浅色
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '80px 32px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '88px 1fr',
              gap: 40,
            }}
          >
            {/* Sticky TOC */}
            <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: '#94a3b8',
                  marginBottom: 12,
                }}
              >
                导航
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  fontSize: 12,
                }}
              >
                {SECTIONS.map((s) => {
                  const on = s.id === active;
                  return (
                    <li key={s.id}>
                      <a
                        onClick={() => setActive(s.id)}
                        style={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '4px 8px',
                          color: on ? '#0f172a' : '#64748b',
                          fontWeight: on ? 500 : 400,
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            height: 12,
                            width: 2,
                            borderRadius: 1,
                            background: on ? '#0f172a' : 'transparent',
                          }}
                        />
                        <span
                          style={{
                            fontFamily: MONO,
                            color: on ? '#64748b' : '#cbd5e1',
                          }}
                        >
                          {s.n}
                        </span>
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 64, minWidth: 0 }}>
              {SECTIONS.map((s) => (
                <article key={s.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                      marginBottom: 24,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: '#94a3b8',
                      }}
                    >
                      {s.n}
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 26,
                        fontWeight: 600,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {s.label}
                    </h2>
                    <span style={{ fontSize: 13, color: '#94a3b8' }}>
                      · {s.count}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        s.id === 'style'
                          ? '1fr'
                          : s.id === 'components'
                            ? 'repeat(4, 1fr)'
                            : s.id === 'tokens'
                              ? 'repeat(2, 1fr)'
                              : 'repeat(3, 1fr)',
                      gap: 20,
                    }}
                  >
                    {Array.from({ length: s.count }).map((_, i) => (
                      <PreviewCard
                        key={i}
                        sectionId={s.id}
                        index={i}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

function PreviewCard({
  sectionId,
  index,
}: {
  sectionId: string;
  index: number;
}) {
  const heights: Record<string, number[]> = {
    style: [320],
    pages: [240, 280, 220],
    blocks: [200, 220, 180, 240, 200],
    components: [160, 160, 160, 160],
    tokens: [200, 240],
  };
  const h = heights[sectionId]?.[index] ?? 200;
  const labels: Record<string, string[]> = {
    style: ['冷感 Editorial 设计目录站'],
    pages: ['Hero 落地页', 'Sticky TOC 详情页', 'Category Row 浏览页'],
    blocks: [
      'Cool Blob Hero',
      'Preview Thumb Card',
      'Floating Cover Row',
      'Browser Chrome Frame',
      'Sticky Platform TopBar',
    ],
    components: [
      'Dark Pill CTA',
      'Ghost Bordered CTA',
      'Cyan Dot Meta Pill',
      'Editorial Underline Tab',
    ],
    tokens: ['Slate × Cyan Cool', 'Cool Blob Decor'],
  };
  const label = labels[sectionId]?.[index] ?? `Item ${index}`;

  return (
    <div>
      <div
        style={{
          height: h,
          background:
            sectionId === 'style' || sectionId === 'pages'
              ? 'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)'
              : '#fff',
          border: '1px solid rgba(226,232,240,0.6)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0f172a',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: SANS,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: '#94a3b8',
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#94a3b8',
          }}
        />
        {label}
      </div>
    </div>
  );
}
