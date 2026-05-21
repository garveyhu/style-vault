import { PreviewFrame } from '../../../_layout';

export default function MetaCapsMonoPair() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · TYPOGRAPHY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Meta Caps + Mono Pair</h1>

        <Card>
          <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>任务集 · 状态总览</span>
          <Note>text-[10.5px] uppercase tracking-wider text-stone-500 · 9 处共用</Note>
        </Card>

        <Card>
          <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e' }}>调度</span>
          <Note>sidebar 分组 · text-[11px] font-medium uppercase tracking-wider text-stone-400</Note>
        </Card>

        <Card>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 11.5, color: '#57534e' }}>
            0 0/5 * * * ?
          </span>
          <Note>cron 列 · font-mono text-[11.5px] tnum text-stone-600 · 7 文件共用</Note>
        </Card>

        <Card>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 11, color: '#78716c' }}>#12345</span>
          <Note>表格 ID 列 · font-mono text-stone-500 tnum</Note>
        </Card>

        <Card>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 28, fontWeight: 700, color: '#1c1917', letterSpacing: '-0.02em', display: 'inline-block', lineHeight: 1 }}>
            1,234,567
          </span>
          <Note>KPI 大数字 · font-mono text-[28px] font-bold tnum stone-900 letter-spacing -0.02em</Note>
        </Card>
      </div>
    </PreviewFrame>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 10, padding: 16, marginBottom: 10 }}>{children}</div>;
}

function Note({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 8 }}>{children}</div>;
}
