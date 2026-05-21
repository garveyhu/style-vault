import { PreviewFrame } from '../../../../_layout';

export default function InterJetbrainsInstrumentTrio() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · TYPOGRAPHY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Inter · JetBrains Mono · Instrument Serif
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          三字体语义切分 + tabular-nums + 内网静态打包
        </p>

        <Card>
          <Tag>SANS · INTER</Tag>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1917' }}>
            Waveflow<span style={{ color: '#a8a29e' }}>.</span>
          </div>
          <div style={{ fontSize: 16, color: '#1c1917', marginTop: 8 }}>正文 16px / 14px / 13px / 12px / 11.5px</div>
          <div style={{ fontSize: 13, color: '#57534e', marginTop: 2 }}>UI 主体、菜单、表格、按钮——全栈 Inter 接管</div>
        </Card>

        <Card>
          <Tag>MONO · JETBRAINS MONO</Tag>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: '#1c1917' }}>
            1,234.56ms
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11.5, color: '#57534e', fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: 'tabular-nums' }}>
            <span>0 0/5 * * * ?</span>
            <span>2026-05-21 14:32:08</span>
            <span>#12345</span>
            <span>192.168.1.100:8080</span>
          </div>
          <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 8 }}>数字 / Cron / ID / 路径——必加 <code style={{ background: '#f5f4ee', padding: '1px 4px', borderRadius: 3 }}>.tnum</code></div>
        </Card>

        <Card>
          <Tag>SERIF · INSTRUMENT SERIF</Tag>
          <div style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1530 50%, #0a1822 100%)', padding: 28, borderRadius: 12, color: 'rgba(255,255,255,0.85)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
              实时编排 · 数据中枢
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.01em', margin: 0 }}>
              让数据，
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>自如流转。</span>
            </h2>
          </div>
          <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 8 }}>仅登录右半页诗句使用——editorial 性格出口</div>
        </Card>

        <Card>
          <Tag>META CAPS · TRACKING-WIDER</Tag>
          <div style={{ display: 'flex', gap: 24, marginTop: 4 }}>
            <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>调度</span>
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e', fontWeight: 500 }}>系统</span>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#a8a29e', fontFamily: "'JetBrains Mono', monospace" }}>最近</span>
          </div>
          <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 8 }}>9 处共用："信息分组的印章"</div>
        </Card>
      </div>
    </PreviewFrame>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, marginBottom: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{children}</div>;
}
