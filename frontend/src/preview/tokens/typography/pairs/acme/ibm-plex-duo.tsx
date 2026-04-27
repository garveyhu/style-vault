import { useEffect } from 'react';
import { PreviewFrame } from '../../../../_layout';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap';

const SANS = "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";

type Scale = {
  key: string;
  label: string;
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing?: string;
};

const SCALE: Scale[] = [
  { key: 'display', label: 'Display', size: '56px', lineHeight: '1.1', weight: 600, letterSpacing: '-0.02em' },
  { key: 'h1', label: 'Heading 1', size: '40px', lineHeight: '1.2', weight: 600, letterSpacing: '-0.01em' },
  { key: 'h2', label: 'Heading 2', size: '28px', lineHeight: '1.3', weight: 600 },
  { key: 'h3', label: 'Heading 3', size: '20px', lineHeight: '1.4', weight: 600 },
  { key: 'body', label: 'Body', size: '16px', lineHeight: '1.6', weight: 400 },
  { key: 'caption', label: 'Caption', size: '13px', lineHeight: '1.5', weight: 400 },
];

export default function IbmPlexDuoPreview() {
  useEffect(() => {
    const id = 'ibm-plex-duo-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <PreviewFrame>
      <div style={{ maxWidth: 960, margin: '0 auto', fontFamily: SANS, color: '#0f172a' }}>
        <header style={{ marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontFamily: MONO, fontSize: 12, color: '#64748b', letterSpacing: 1 }}>
            PRIMITIVE · TYPOGRAPHY · PAIRS
          </div>
          <h1 style={{ fontFamily: SANS, fontSize: 40, fontWeight: 600, letterSpacing: '-0.01em', margin: '6px 0 0' }}>
            IBM Plex Duo
          </h1>
          <p style={{ color: '#475569', fontSize: 15 }}>
            Sans 正文 + Mono 代码，统一来自 IBM Plex 家族
          </p>
        </header>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: '#94a3b8', marginBottom: 12 }}>
            SCALE
          </div>
          {SCALE.map((s) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 24,
                padding: '12px 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: '#64748b',
                  width: 140,
                  flexShrink: 0,
                }}
              >
                {s.key} · {s.size}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: s.size,
                  lineHeight: s.lineHeight,
                  fontWeight: s.weight,
                  letterSpacing: s.letterSpacing,
                }}
              >
                {s.label} — 冷感工具型 SaaS
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: '#94a3b8', marginBottom: 12 }}>
            BODY SAMPLE
          </div>
          <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.7, color: '#334155' }}>
            Plex Sans 在长段落里的节奏感很稳。The quick brown fox jumps over the lazy dog.
            中文 fallback 在 macOS 掉到 PingFang，在 Windows 掉到 Microsoft YaHei，混排
            时注意中英文的 vertical metrics 差异，必要时用 `line-height: 1.6~1.7` 兜住。
          </p>
        </section>

        <section>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: '#94a3b8', marginBottom: 12 }}>
            MONO SAMPLE
          </div>
          <pre
            style={{
              fontFamily: MONO,
              fontSize: 14,
              lineHeight: 1.6,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 4,
              padding: 16,
              color: '#0f172a',
              overflow: 'auto',
            }}
          >
{`const palette = {
  bg:     { base: '#0f172a', panel: '#0b1220' },
  accent: { base: '#22d3ee', hover: '#06b6d4' },
};

// 0123456789  +  -  *  /  =  <  >  |  &&  ||`}
          </pre>
        </section>
      </div>
    </PreviewFrame>
  );
}
