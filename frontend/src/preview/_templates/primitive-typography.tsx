import { PreviewFrame } from '../_layout';

/** 字体对模板：字阶样张 */
export default function TypographyPreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'serif' }}>
        <h1 style={{ fontSize: 64, marginBottom: 16 }}>Heading 1 — Display</h1>
        <h2 style={{ fontSize: 40 }}>Heading 2 — Section</h2>
        <h3 style={{ fontSize: 28 }}>Heading 3 — Subsection</h3>
        <p style={{ fontSize: 18, lineHeight: 1.7 }}>
          Body paragraph. 中文正文段落可以在这里展示，以便检验中英字体的混排效果。
        </p>
        <pre style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: 12 }}>
          const code = "monospace sample";
        </pre>
      </div>
    </PreviewFrame>
  );
}
