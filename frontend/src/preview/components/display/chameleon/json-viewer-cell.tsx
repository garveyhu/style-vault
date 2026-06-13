import { PreviewFrame } from '../../../_layout';
import { ChevronDown, ChevronRight, Copy, Search } from 'lucide-react';

export default function JsonViewerCell() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>JSON Cell + Zero-dep Viewer</h1>

        {/* JsonCell：表格里折叠 */}
        <Section title="JsonCell · 表格单元格折叠">
          <div style={{ borderRadius: 8, border: '1px solid #e7e5e0', background: '#ffffff', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                <Row label="短文本（≤80 直显）">
                  <span style={{ color: '#44403c' }}>用户点击了「重新生成」</span>
                </Row>
                <Row label="长文本（折叠为摘要）">
                  <button style={cellBtn}>
                    {'{"messages":[{"role":"user","content":"帮我把这段 SQL 改成支持分页的版本，限制每页 …'}
                  </button>
                </Row>
                <Row label="展开后（mono pre）">
                  <div>
                    <button style={{ ...cellBtn, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <ChevronDown size={12} /> 收起
                    </button>
                    <pre style={{ marginTop: 4, maxHeight: 256, overflow: 'auto', borderRadius: 6, background: '#fafaf7', padding: 8, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.65, color: '#44403c', margin: '4px 0 0' }}>
{`{
  "model": "qwen-max",
  "temperature": 0.7,
  "max_tokens": 1024
}`}
                    </pre>
                  </div>
                </Row>
                <Row label="脱敏字段（优先 preview）">
                  <button style={cellBtn}>sk-••••••••（hash: a3f9, length: 51）</button>
                </Row>
              </tbody>
            </table>
          </div>
        </Section>

        {/* JsonViewer：零依赖树 */}
        <Section title="JsonViewer · 零依赖树 + 搜索 + 类型着色">
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 6, border: '1px solid #e7e5e0', background: '#fff' }}>
            {/* 搜索条 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #e7e5e0', background: 'rgba(245,245,244,0.6)', padding: '6px 8px' }}>
              <Search size={14} color="#a8a29e" />
              <input
                readOnly
                value="model"
                style={{ flex: 1, background: 'transparent', fontSize: 12.5, outline: 'none', border: 'none', color: '#44403c' }}
              />
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 4, padding: '4px 6px', fontSize: 11.5, color: '#57534e', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Copy size={12} /> 复制
              </button>
            </div>
            {/* 内容树 */}
            <div style={{ overflow: 'auto', padding: 8, fontFamily: 'monospace', fontSize: 12, lineHeight: 1.4, maxHeight: 320 }}>
              <Brace depth={0} chevron="down" text="{" />
              <KeyLine depth={1} k="model" highlight="model">
                <span style={{ color: '#047857' }}>"qwen-max"</span>
              </KeyLine>
              <KeyLine depth={1} k="temperature">
                <span style={{ color: '#0369a1' }}>0.7</span>
              </KeyLine>
              <KeyLine depth={1} k="stream">
                <span style={{ color: '#7e22ce' }}>true</span>
              </KeyLine>
              <KeyLine depth={1} k="stop">
                <span style={{ color: '#a8a29e' }}>null</span>
              </KeyLine>
              <Brace depth={1} chevron="right" text='"messages": [' suffix={<span style={{ marginLeft: 4, color: '#a8a29e' }}>2 items</span>} />
              <ClosingBrace depth={0} text="}" />
            </div>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

const cellBtn: React.CSSProperties = {
  display: 'block',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#57534e',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr style={{ borderTop: '1px solid #f4f3ee' }}>
      <td style={{ padding: '10px 14px', color: '#a8a29e', fontSize: 11, width: 200, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{label}</td>
      <td style={{ padding: '10px 14px', maxWidth: 360 }}>{children}</td>
    </tr>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

function Brace({ depth, chevron, text, suffix }: { depth: number; chevron: 'down' | 'right'; text: string; suffix?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: depth * 12 }}>
      <span style={{ marginRight: 4, color: '#a8a29e', display: 'inline-flex' }}>
        {chevron === 'down' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </span>
      <span style={{ color: '#78716c' }}>{text}</span>
      {suffix}
    </div>
  );
}

function ClosingBrace({ depth, text }: { depth: number; text: string }) {
  return <div style={{ paddingLeft: depth * 12 + 16, color: '#78716c' }}>{text}</div>;
}

function KeyLine({ depth, k, children, highlight }: { depth: number; k: string; children: React.ReactNode; highlight?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: depth * 12 }}>
      <span style={{ marginRight: 4, display: 'inline-block', width: 12, flexShrink: 0 }} />
      <span style={{ color: '#44403c', flexShrink: 0 }}>
        {highlight ? (
          <mark style={{ borderRadius: 3, background: '#fef3c7', padding: '0 2px', color: '#1c1917' }}>"{k}"</mark>
        ) : (
          <>"{k}"</>
        )}
        :&nbsp;
      </span>
      <span style={{ minWidth: 0, flex: 1, wordBreak: 'break-word' }}>{children}</span>
    </div>
  );
}
