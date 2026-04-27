import { PreviewFrame } from '../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const KEYFRAMES = `
@keyframes svstyle-blob {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(20px,-30px,0) scale(1.08); }
}
@keyframes svstyle-blob-slow {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(-30px,20px,0) scale(1.12); }
}
`;

export default function StyleVaultCoolEditorialPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* HERO */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#fff',
            borderBottom: '1px solid #f1f5f9',
            padding: '80px 56px 96px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -160,
              top: -160,
              width: 520,
              height: 520,
              borderRadius: '50%',
              background: 'rgba(207,250,254,0.5)',
              filter: 'blur(64px)',
              animation: 'svstyle-blob 14s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -160,
              top: 80,
              width: 440,
              height: 440,
              borderRadius: '50%',
              background: 'rgba(226,232,240,0.55)',
              filter: 'blur(64px)',
              animation: 'svstyle-blob-slow 18s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                borderRadius: 9999,
                border: '1px solid #e2e8f0',
                background: 'rgba(255,255,255,0.85)',
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#64748b',
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#06b6d4',
                }}
              />
              Style · Cool Editorial
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 64,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                fontFeatureSettings: '"cv02","cv03","cv04","cv11","ss01"',
              }}
            >
              冷感 Editorial
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
                设计目录站
              </span>
            </h1>
            <p
              style={{
                maxWidth: 560,
                margin: '24px auto 0',
                fontSize: 16,
                lineHeight: 1.7,
                color: '#64748b',
              }}
            >
              #fafafa 浅底 · slate × cyan 冷感 · Inter 单字族 editorial 节奏
              · 漂浮 blob 装饰 · 浮起卡片
            </p>
          </div>
        </section>

        {/* PILLARS */}
        <section
          style={{
            background: '#fafafa',
            padding: '64px 56px',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#94a3b8',
              marginBottom: 36,
            }}
          >
            六道边界
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
            }}
          >
            {[
              {
                n: '01',
                title: '白上叠白',
                body: 'hairline 1px 切割 · 仅 hover 用三层柔投影把卡片浮起',
              },
              {
                n: '02',
                title: '冷不冷漠',
                body: 'cyan blob + 渐变标题 + manifesto italic — 冷里留温度',
              },
              {
                n: '03',
                title: '编辑式留白',
                body: 'section py-32 / Logo 墙 gap-12 — 呼吸是身份',
              },
              {
                n: '04',
                title: 'Mono 撑数字',
                body: 'mono 索引 01/02/03 + ID 字串 + 数字徽标 — 节奏锚点',
              },
              {
                n: '05',
                title: '作品优先',
                body: 'StyleCard 真组件缩放 — 不用图片占位',
              },
              {
                n: '06',
                title: 'Blob 只在 Hero',
                body: '其它 section 一律禁用 — 避免氛围泛滥',
              },
            ].map((p) => (
              <div
                key={p.n}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(226,232,240,0.7)',
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    color: '#94a3b8',
                    letterSpacing: '0.15em',
                    marginBottom: 14,
                  }}
                >
                  {p.n}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}
                >
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PALETTE STRIP */}
        <section style={{ padding: '64px 56px', background: '#fff' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#94a3b8',
              marginBottom: 20,
            }}
          >
            Tokens · 注入色
          </div>
          <div style={{ display: 'flex', gap: 0, height: 88 }}>
            {[
              { c: '#fafafa', l: '#fafafa' },
              { c: '#fff', l: '#ffffff' },
              { c: '#f8fafc', l: '#f8fafc' },
              { c: '#e2e8f0', l: '#e2e8f0' },
              { c: '#cbd5e1', l: '#cbd5e1' },
              { c: '#94a3b8', l: '#94a3b8' },
              { c: '#64748b', l: '#64748b' },
              { c: '#334155', l: '#334155' },
              { c: '#0f172a', l: '#0f172a' },
              { c: '#cffafe', l: '#cffafe' },
              { c: '#67e8f9', l: '#67e8f9' },
              { c: '#06b6d4', l: '#06b6d4' },
              { c: '#0891b2', l: '#0891b2' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: s.c,
                  borderRight: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 8,
                  fontFamily: MONO,
                  fontSize: 9,
                  color:
                    s.c === '#fafafa' ||
                    s.c === '#fff' ||
                    s.c === '#f8fafc' ||
                    s.c === '#e2e8f0' ||
                    s.c === '#cbd5e1' ||
                    s.c === '#cffafe' ||
                    s.c === '#67e8f9'
                      ? '#0f172a'
                      : '#fff',
                }}
              >
                {s.l}
              </div>
            ))}
          </div>
        </section>

        {/* MANIFESTO PREVIEW */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#0f172a',
            color: '#fff',
            padding: '80px 56px',
            textAlign: 'center',
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
          <p
            style={{
              position: 'relative',
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              margin: 0,
            }}
          >
            好设计会被
            <span style={{ fontStyle: 'italic', color: '#67e8f9' }}>看见</span>
            ，伟大的设计会被
            <span style={{ fontStyle: 'italic', color: '#67e8f9' }}>记住</span>
            。
          </p>
          <p
            style={{
              position: 'relative',
              marginTop: 24,
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              color: '#94a3b8',
            }}
          >
            Style Vault · Cool Editorial
          </p>
        </section>
      </div>
    </PreviewFrame>
  );
}
