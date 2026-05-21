import { PreviewFrame } from '../_layout';

export default function WaveflowProduct() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>PRODUCT</div>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Waveflow<span style={{ color: '#a8a29e' }}>.</span>
        </h1>
        <p style={{ fontSize: 16, color: '#57534e', marginBottom: 8 }}>数据同步与任务调度平台</p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {['productivity', 'admin-console', 'shadcn-radix', 'minimal', 'industrial', 'editorial', 'calm', 'serious'].map(t => (
            <span key={t} style={{ padding: '2px 8px', borderRadius: 4, background: '#f5f4ee', color: '#57534e', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Stat n="59" label="条目" />
          <Stat n="17" label="路由" />
          <Stat n="6" label="层级" />
          <Stat n="10" label="tokens" small />
          <Stat n="14" label="components" small />
          <Stat n="22" label="blocks" small />
          <Stat n="11" label="pages" small />
          <Stat n="1" label="style" small />
          <Stat n="1" label="product" small />
        </div>

        <div style={{ marginTop: 32, background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#292524', marginBottom: 12 }}>核心特征</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#57534e', lineHeight: 1.8 }}>
            <li><strong style={{ color: '#1c1917' }}>DataX 任务全生命周期</strong>：Reader/Writer/字段映射 4-step → 模板复用 → 单任务/任务集 → 日志/终止</li>
            <li><strong style={{ color: '#1c1917' }}>跨网数据同步</strong>：JDBC 数据源 + 12 数据库（MySQL/PG/Oracle/SQL Server/Kingbase/DM/...）</li>
            <li><strong style={{ color: '#1c1917' }}>实时 dashboard</strong>：6 KPI + ECharts line/pie/bar/gauge + 资源监控 + 30s 自刷</li>
            <li><strong style={{ color: '#1c1917' }}>⌘K 全站搜</strong>：跨类型 (任务/集合/项目) + amber 高亮 + 最近搜索 chips</li>
            <li><strong style={{ color: '#1c1917' }}>内网友好</strong>：所有字体走 @fontsource 静态打包，运行时无 CDN 依赖</li>
            <li><strong style={{ color: '#1c1917' }}>Editorial 性格出口</strong>：登录页 Three.js icosahedron + serif italic 诗句，跟 admin 主体强对比</li>
          </ul>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Stat({ n, label, small }: any) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, textAlign: 'left' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: small ? 22 : 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#1c1917', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11.5, color: '#78716c', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}
