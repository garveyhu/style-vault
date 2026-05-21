import { PreviewFrame } from '../../../_layout';

export default function MinimalText401() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 120, fontWeight: 700, color: '#e7e5e0', letterSpacing: '-0.05em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>401</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#44403c', marginTop: 16 }}>抱歉，您没有权限访问该页面</div>
          <div style={{ fontSize: 14, color: '#78716c', marginTop: 8 }}>请联系管理员获取相应的权限</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
            <button style={{ height: 32, padding: '0 16px', background: '#fff', color: '#44403c', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12.5, cursor: 'pointer' }}>返回上一页</button>
            <button style={{ height: 32, padding: '0 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>回到首页</button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
