import { PreviewFrame } from '../../../_layout';

export default function EngineerDetailClasses() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>TOKEN · ICONOGRAPHY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Engineer Detail Classes</h1>

        <Card title=".tnum tabular-nums">
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontVariantNumeric: 'tabular-nums', color: '#44403c' }}>
            0  1  2  3  4  5  6  7  8  9<br />
            00:00 / 14:32:08 / 999,999
          </div>
        </Card>

        <Card title=".status-dot 7px + 2px ring">
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Dot color="#10b981" ring="rgb(16 185 129 / 15%)" label="running" />
            <Dot color="#d6d3d1" label="stopped (无 ring)" />
            <Dot color="#ef4444" ring="rgb(239 68 68 / 18%)" label="error" />
          </div>
        </Card>

        <Card title=".kbd 键帽">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Kbd>⌘</Kbd> <Kbd>K</Kbd>
            <span style={{ marginLeft: 12 }}><Kbd>↑</Kbd> <Kbd>↓</Kbd></span>
            <span style={{ marginLeft: 12 }}><Kbd>ESC</Kbd></span>
          </div>
        </Card>

        <Card title=".tree-line + .tree-item">
          <div style={{ position: 'relative', marginLeft: 14 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 1, background: '#d6d3d1' }} />
            {['任务模板', '任务构建', '批量构建', '任务列表'].map(t => (
              <div key={t} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '6px 0 6px 24px', fontSize: 13, color: '#57534e' }}>
                <div style={{ position: 'absolute', left: 0, top: '50%', width: 10, height: 1, background: '#d6d3d1' }} />
                {t}
              </div>
            ))}
          </div>
        </Card>

        <Card title=".skeleton shimmer">
          <div style={{ background: 'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)', backgroundSize: '400px 100%', animation: 'wf-shimmer 1.6s ease-in-out infinite', height: 12, borderRadius: 4, width: '70%' }} />
          <style>{`@keyframes wf-shimmer { 0% { background-position: -200px 0 } 100% { background-position: 200px 0 } }`}</style>
        </Card>
      </div>
    </PreviewFrame>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 18, marginBottom: 12 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

function Dot({ color, ring, label }: { color: string; ring?: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: ring ? `0 0 0 2px ${ring}` : undefined }} />
      <span style={{ fontSize: 12, color: '#57534e' }}>{label}</span>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <span style={{ padding: '1px 5px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4, boxShadow: '0 1px 0 #e7e5e0' }}>{children}</span>;
}
