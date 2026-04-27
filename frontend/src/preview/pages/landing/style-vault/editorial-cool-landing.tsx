import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const KEYFRAMES = `
@keyframes svll-blob {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(20px,-30px,0) scale(1.08); }
}
@keyframes svll-blob-slow {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(-30px,20px,0) scale(1.12); }
}
@keyframes svll-fade-up {
  from { opacity: 0; transform: translate3d(0,16px,0); }
  to   { opacity: 1; transform: translate3d(0,0,0); }
}
`;

export default function EditorialCoolLandingPreview() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <style>{KEYFRAMES}</style>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* === 1. HERO === */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid #f1f5f9',
            background: '#fff',
            minHeight: 760,
          }}
        >
          <Blob left={-160} top={-160} w={520} color="rgba(207,250,254,0.5)" anim="svll-blob 14s" />
          <Blob right={-160} top={80} w={440} color="rgba(226,232,240,0.55)" anim="svll-blob-slow 18s" />

          <div
            style={{
              position: 'relative',
              maxWidth: 1200,
              margin: '0 auto',
              minHeight: 760,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '96px 32px',
              textAlign: 'center',
            }}
          >
            <Pill delay={0}>● Style Vault · 风格库</Pill>
            <h1
              style={{
                opacity: 0,
                animation: 'svll-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 150ms forwards',
                marginTop: 32,
                fontSize: 88,
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                fontFeatureSettings: '"cv02","cv03","cv04","cv11","ss01"',
                maxWidth: 1000,
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
            </h1>
            <p
              style={{
                opacity: 0,
                animation:
                  'svll-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 300ms forwards',
                maxWidth: 560,
                marginTop: 32,
                fontSize: 17,
                lineHeight: 1.8,
                color: '#64748b',
              }}
            >
              六个层级，六道清晰边界。
              <br />
              复刻一种成熟的视觉风格，只需把一段 Prompt 贴给 AI。
            </p>
            <div
              style={{
                opacity: 0,
                animation:
                  'svll-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 500ms forwards',
                marginTop: 48,
              }}
            >
              <button
                style={{
                  height: 56,
                  padding: '0 36px',
                  borderRadius: 9999,
                  background: '#0f172a',
                  color: '#fff',
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: SANS,
                  boxShadow: '0 20px 48px -20px rgba(15,23,42,0.6)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                进入风格库 →
              </button>
            </div>
          </div>
        </section>

        {/* === 2. LOGO WALL === */}
        <section
          style={{
            background: '#f8fafc',
            borderBottom: '1px solid #f1f5f9',
            padding: '64px 32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              color: '#94a3b8',
            }}
          >
            覆盖完整的美学光谱 · Curated aesthetic range
          </div>
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px 48px',
              opacity: 0.6,
            }}
          >
            {[
              'Cold Industrial SaaS',
              'Soft Modernist',
              'Editorial Cool',
              'Cool Mint Analytics',
              'Acme · Cold Saas',
              'Skill Hub',
              'Style Vault',
            ].map((n) => (
              <span
                key={n}
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#475569',
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </section>

        {/* === 3. VALUE BLOCKS === */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '128px 32px' }}>
          {[
            {
              n: '01',
              title: '六层结构，从 Token 到 Product。',
              body: '从最小的色卡到完整的产品外壳，每一层都有明确的边界。Tokens 喂 Components，Components 拼 Blocks，Blocks 组 Pages，Pages 成 Styles，Styles 汇聚为 Products。',
              illust: <LayerIllust />,
              flip: false,
            },
            {
              n: '02',
              title: '为 AI 编码而生。',
              body: '每条资产都附带一份精心调好的 Prompt 模板。粘进你的 AI Copilot，几秒就能在编码现场还原一整套完整的视觉语言。',
              illust: <PromptIllust />,
              flip: true,
            },
            {
              n: '03',
              title: '天生跨端，调性如一。',
              body: '按 Web / iOS / Android 浏览。同一种风格在不同端之间流转——具体组件可以不同，但整体调性始终如一。',
              illust: <PlatformIllust />,
              flip: false,
            },
          ].map((v, i) => (
            <div
              key={v.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 80,
                alignItems: 'center',
                marginBottom: i < 2 ? 144 : 0,
              }}
            >
              <div style={{ order: v.flip ? 2 : 1 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    color: '#94a3b8',
                    letterSpacing: '0.18em',
                  }}
                >
                  {v.n}
                </div>
                <h2
                  style={{
                    marginTop: 20,
                    fontSize: 44,
                    fontWeight: 600,
                    lineHeight: 1.08,
                    letterSpacing: '-0.025em',
                    color: '#0f172a',
                  }}
                >
                  {v.title}
                </h2>
                <p
                  style={{
                    marginTop: 24,
                    maxWidth: 480,
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: '#64748b',
                  }}
                >
                  {v.body}
                </p>
              </div>
              <div style={{ order: v.flip ? 1 : 2 }}>{v.illust}</div>
            </div>
          ))}
        </section>

        {/* === 4. MANIFESTO === */}
        <section
          style={{
            background: '#0f172a',
            color: '#fff',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -96,
              top: 40,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(34,211,238,0.1)',
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -96,
              bottom: 40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(100,116,139,0.15)',
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'relative',
              maxWidth: 1000,
              margin: '0 auto',
              padding: '80px 32px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 52,
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
                margin: 0,
              }}
            >
              好设计会被
              <span style={{ fontStyle: 'italic', color: '#67e8f9' }}>
                看见
              </span>
              ，
              <br />
              伟大的设计会被
              <span style={{ fontStyle: 'italic', color: '#67e8f9' }}>
                记住
              </span>
              。
            </p>
            <p
              style={{
                marginTop: 40,
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#94a3b8',
              }}
            >
              Style Vault · 为设计精选
            </p>
          </div>
        </section>

        {/* === 5. FOOTER === */}
        <footer style={{ background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '20px 48px',
              fontSize: 12,
              color: '#94a3b8',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background:
                    'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
                  opacity: 0.8,
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#64748b' }}>
                Style Vault · 风格库
              </span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span>© 2026 Style Vault</span>
              <span style={{ width: 1, height: 12, background: '#e2e8f0' }} />
              <span>GitHub</span>
            </div>
          </div>
        </footer>
      </div>
    </PreviewFrame>
  );
}

function Blob({
  left,
  right,
  top,
  w,
  color,
  anim,
}: {
  left?: number;
  right?: number;
  top: number;
  w: number;
  color: string;
  anim: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        width: w,
        height: w,
        borderRadius: '50%',
        background: color,
        filter: 'blur(64px)',
        pointerEvents: 'none',
        animation: `${anim} ease-in-out infinite`,
      }}
    />
  );
}

function Pill({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: 0,
        animation: `svll-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms forwards`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 12px',
        borderRadius: 9999,
        border: '1px solid #e2e8f0',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: '#64748b',
      }}
    >
      {children}
    </div>
  );
}

function LayerIllust() {
  const layers = [
    { name: 'PRODUCT', fill: 'url(#sv-grad)', txt: '#fff', y: 28, w: 280 },
    { name: 'STYLES', fill: '#1e293b', txt: '#fff', y: 76, w: 236 },
    { name: 'PAGES', fill: '#475569', txt: '#fff', y: 122, w: 192 },
    { name: 'BLOCKS', fill: '#94a3b8', txt: '#fff', y: 162, w: 148 },
    { name: 'COMPONENTS', fill: '#cbd5e1', txt: '#0f172a', y: 196, w: 108 },
    { name: 'TOKENS', fill: '#f1f5f9', txt: '#475569', y: 222, w: 68 },
  ];
  return (
    <svg
      viewBox="0 0 360 250"
      style={{ width: '100%', maxWidth: 440, height: 'auto' }}
    >
      <defs>
        <linearGradient id="sv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      {layers.map((l) => (
        <g key={l.name}>
          <path
            d={`M${180 - l.w / 2} ${l.y + 12} L180 ${l.y + 24} L${
              180 + l.w / 2
            } ${l.y + 12} L180 ${l.y} Z`}
            fill={l.fill}
            stroke="#0f172a"
            strokeWidth={0.5}
          />
          <text
            x={180}
            y={l.y + 16}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            letterSpacing={1.5}
            fill={l.txt}
          >
            {l.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function PromptIllust() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 18px 40px -20px rgba(15,23,42,0.18)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          Prompt
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11 }}>
          <div style={{ color: '#64748b' }}>use:</div>
          <div
            style={{
              background: '#f8fafc',
              padding: '4px 8px',
              borderRadius: 4,
              color: '#0f172a',
              marginBottom: 6,
            }}
          >
            styles/cold-saas
          </div>
          <div style={{ color: '#64748b' }}>build:</div>
          <div
            style={{
              background: '#cffafe',
              padding: '4px 8px',
              borderRadius: 4,
              color: '#0e7490',
            }}
          >
            pricing-table
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
        <div style={{ width: 40, height: 1, background: '#cbd5e1' }} />
        <div style={{ fontSize: 18 }}>▸</div>
        <div
          style={{
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
          }}
        >
          AI
        </div>
      </div>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 18px 40px -20px rgba(15,23,42,0.18)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          Pricing
        </div>
        {[
          { name: 'Free', price: '$0' },
          { name: 'Pro', price: '$24', highlight: true },
          { name: 'Team', price: '$99' },
        ].map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              marginBottom: 6,
              background: p.highlight ? '#cffafe' : '#f8fafc',
              border: p.highlight ? '1px solid #67e8f9' : 'none',
            }}
          >
            <span style={{ fontWeight: 600 }}>{p.name}</span>
            <span
              style={{
                fontFamily: MONO,
                fontWeight: p.highlight ? 600 : 400,
                color: p.highlight ? '#0e7490' : '#94a3b8',
              }}
            >
              {p.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformIllust() {
  return (
    <div
      style={{
        position: 'relative',
        height: 280,
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '18%',
          width: 110,
          height: 180,
          borderRadius: 14,
          border: '2px solid #334155',
          background: '#fff',
          opacity: 0.7,
          padding: 8,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 700, marginTop: 16 }}>
          Style
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: '#0891b2' }}>
          Vault
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '24%',
          top: '24%',
          width: 260,
          height: 170,
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: '#fff',
          boxShadow: '0 18px 40px -12px rgba(15,23,42,0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '8px 12px',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          {['#fda4af', '#fcd34d', '#86efac'].map((c) => (
            <span
              key={c}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Style{' '}
          <span style={{ color: '#0891b2', marginLeft: 4 }}>Vault</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '10%',
          width: 120,
          height: 210,
          borderRadius: 22,
          border: '3px solid #0f172a',
          background: '#fff',
          boxShadow: '0 24px 48px -12px rgba(15,23,42,0.4)',
          padding: 6,
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: 56,
            height: 10,
            borderRadius: '0 0 12px 12px',
            background: '#0f172a',
          }}
        />
        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Style</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0891b2' }}>
            Vault
          </div>
          <div
            style={{
              marginTop: 16,
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 9999,
              background: '#06b6d4',
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            Open
          </div>
        </div>
      </div>
    </div>
  );
}
