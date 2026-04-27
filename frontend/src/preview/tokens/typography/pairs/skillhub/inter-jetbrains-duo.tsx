import { PreviewFrame } from '../../../../_layout';

export default function InterJetbrainsDuoPreview() {
  return (
    <PreviewFrame bg="#ffffff">
      <div style={{
        maxWidth: 880, margin: '0 auto',
        fontFamily: 'Inter, "Space Grotesk", system-ui, sans-serif',
        color: '#111827',
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
          TYPOGRAPHY PAIR
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '8px 0 32px' }}>
          Inter × JetBrains Mono
        </h1>

        {/* Hero H1 */}
        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>H1 · text-6xl / extrabold / tracking-tight</div>
          <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            让 AI 技能流动起来
          </div>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>H2 · text-2xl / bold</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>精选 TOP Skills 榜单</div>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>Body · text-sm / medium / leading-relaxed</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#6b7280', lineHeight: 1.7, maxWidth: 560 }}>
            SkillHub 聚合一个或多个 Git 仓库，扫描含有 SKILL.md 的文件夹，将其
            转化为可浏览的技能页面，并提供社区互动与管理后台。
          </div>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>Meta · text-xs uppercase tracking-wider</div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9ca3af' }}>
            # · SKILL · 分类 · 数据
          </div>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>Code · JetBrains Mono</div>
          <code style={{
            display: 'inline-block',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            background: '#f3f4f6',
            color: '#3730a3',
            padding: '4px 8px',
            borderRadius: 6,
          }}>skills/canvas-design</code>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9ca3af' }}>Feature samples (cv02 cv03 cv04 cv11)</div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 4 }}>
            a i l 0 1 2 3 4 5 6 7 8 9
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
