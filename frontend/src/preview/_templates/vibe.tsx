import { PreviewFrame } from '../_layout';

/** VIBE 模板：整站调性。拷贝时改 tokens 与 hero/feature 内容 */
export default function VibePreviewTemplate() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <div style={{ color: '#e2e8f0', padding: 48, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 64 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Brand</div>
          <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <a>Features</a><a>Pricing</a><a>Docs</a>
          </nav>
        </header>
        <h1 style={{ fontSize: 56, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
          Hero headline goes here
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 640, marginBottom: 40 }}>
          支撑描述，展示本 vibe 的文字节奏与留白风格。
        </p>
        <button style={{ background: '#22d3ee', color: '#0f172a', padding: '12px 24px', border: 0, borderRadius: 4, fontWeight: 600 }}>
          Get started
        </button>
      </div>
    </PreviewFrame>
  );
}
