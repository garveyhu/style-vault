import { PreviewFrame } from '../../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

export default function InterEditorialDisplayPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ padding: '64px 56px', fontFamily: SANS, color: '#0f172a' }}>
        {/* kicker */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 18,
          }}
        >
          tokens / typography / style-vault
        </div>

        {/* display */}
        <div
          style={{
            fontSize: 88,
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: '-0.035em',
            fontFeatureSettings: '"cv02","cv03","cv04","cv11","ss01"',
            marginBottom: 8,
          }}
        >
          Display 88
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 40 }}>
          Inter · weight 600 · ls −0.035em · features ss01
        </div>

        {/* h1 / h2 / h3 ladder */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            rowGap: 20,
            alignItems: 'baseline',
            marginBottom: 40,
          }}
        >
          {[
            { tag: 'h1', size: 44, ls: '-0.025em', label: 'Headline 44 · ls −0.025' },
            { tag: 'h2', size: 26, ls: '-0.015em', label: 'Section 26 · ls −0.015' },
            { tag: 'h3', size: 20, ls: '0', label: 'Sub 20' },
            { tag: 'body-lg', size: 17, ls: '0', label: 'Body Lg 17 · 1.8 line-height' },
            { tag: 'body', size: 14, ls: '0', label: 'Body 14 · 1.6 line-height' },
          ].map((row) => (
            <>
              <div
                key={`label-${row.tag}`}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: '#94a3b8',
                  letterSpacing: '0.05em',
                }}
              >
                {row.tag}
              </div>
              <div
                key={`val-${row.tag}`}
                style={{
                  fontSize: row.size,
                  lineHeight: row.size > 18 ? 1.15 : 1.6,
                  letterSpacing: row.ls,
                  fontWeight: row.size > 18 ? 600 : 400,
                  color: row.size > 18 ? '#0f172a' : '#64748b',
                }}
              >
                {row.label}
              </div>
            </>
          ))}
        </div>

        {/* mono-index sample */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            paddingTop: 28,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {['01', '02', '03'].map((n) => (
            <div
              key={n}
              style={{
                fontFamily: MONO,
                fontSize: 13,
                letterSpacing: '0.18em',
                color: '#94a3b8',
              }}
            >
              {n}
            </div>
          ))}
          <div style={{ fontSize: 13, color: '#0f172a' }}>
            Mono · 索引数字（不切第二种字族 · 系统 monospace fallback）
          </div>
        </div>

        {/* caption sample */}
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            { tracking: '0.18em', text: 'CAPTION · TRACKING 0.18 · COMPONENT META' },
            { tracking: '0.22em', text: 'CAPTION · TRACKING 0.22 · KICKER LABEL' },
            { tracking: '0.28em', text: 'CAPTION · TRACKING 0.28 · LOGO WALL' },
          ].map((c) => (
            <div
              key={c.tracking}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#94a3b8',
                letterSpacing: c.tracking,
                textTransform: 'uppercase',
              }}
            >
              {c.text}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
