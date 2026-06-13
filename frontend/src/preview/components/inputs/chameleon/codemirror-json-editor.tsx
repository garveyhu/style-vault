import { PreviewFrame } from '../../../_layout';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// CodeMirror 语法高亮的近似配色（仅 preview 演示用）
const C = {
  gutter: '#a8a29e',
  punct: '#78716c',
  key: '#2563eb',
  string: '#047857',
  number: '#b45309',
  bool: '#7c3aed',
};

type Tok = { t: string; c?: string };

function Line({ no, indent = 0, tokens }: { no: number; indent?: number; tokens: Tok[] }) {
  return (
    <div style={{ display: 'flex', minHeight: 19 }}>
      <span style={{ width: 28, flexShrink: 0, textAlign: 'right', paddingRight: 8, color: C.gutter, userSelect: 'none' }}>{no}</span>
      <span style={{ whiteSpace: 'pre' }}>
        {'  '.repeat(indent)}
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: tok.c ?? C.punct }}>{tok.t}</span>
        ))}
      </span>
    </div>
  );
}

function Editor({ label, error }: { label: string; error?: string }) {
  return (
    <div style={{ overflow: 'hidden', borderRadius: 6, border: '1px solid #e7e5e4' }}>
      {/* 顶栏 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f4', background: 'rgba(250,250,249,0.8)', padding: '4px 8px' }}>
        <span style={{ fontSize: 10.5, fontWeight: 500, color: '#78716c' }}>{label}</span>
        <button style={{ fontSize: 10.5, color: '#78716c', background: 'transparent', border: 'none', cursor: 'pointer' }}>格式化</button>
      </div>
      {/* CodeMirror 区（透明底） */}
      <div style={{ fontFamily: MONO, fontSize: 12, lineHeight: '19px', padding: '6px 0 6px 0', background: 'transparent', color: '#44403c', minHeight: 110 }}>
        <Line no={1} tokens={[{ t: '{', c: C.punct }]} />
        <Line no={2} indent={1} tokens={[{ t: '"query"', c: C.key }, { t: ': ', c: C.punct }, { t: '"今天天气如何"', c: C.string }, { t: ',', c: C.punct }]} />
        <Line no={3} indent={1} tokens={[{ t: '"top_k"', c: C.key }, { t: ': ', c: C.punct }, { t: '5', c: C.number }, { t: ',', c: C.punct }]} />
        <Line no={4} indent={1} tokens={[{ t: '"rerank"', c: C.key }, { t: ': ', c: C.punct }, { t: 'true', c: C.bool }]} />
        <Line no={5} tokens={[{ t: '}', c: C.punct }]} />
      </div>
      {/* 错误条 */}
      {error && (
        <div style={{ borderTop: '1px solid #ffe4e6', background: '#fff1f2', padding: '4px 8px', fontSize: 10.5, color: '#e11d48' }}>
          ⚠ JSON 语法错误：{error}
        </div>
      )}
    </div>
  );
}

export default function CodemirrorJsonEditor() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INPUT · SIGNATURE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>CodeMirror JSON 编辑器</h1>

        <Section title="正常态 (label + 格式化 + 行号 + 高亮)">
          <Editor label="输入" />
        </Section>

        <Section title="语法错误态 (rose 错误条)">
          <Editor label="预期输出" error="Unexpected end of JSON input" />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
