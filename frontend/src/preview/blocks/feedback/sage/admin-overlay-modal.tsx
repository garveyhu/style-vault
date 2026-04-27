import { PreviewFrame } from '../../../_layout';

export default function AdminOverlayModalPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ position: 'relative', height: 600, fontFamily: 'Inter, sans-serif' }}>
        {/* 模拟 chat 上下文 */}
        <div style={{ position: 'absolute', inset: 0, padding: 24, color: '#0f172a', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · FEEDBACK</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '8px 0 4px' }}>Admin Overlay Modal</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>bg-white/95 backdrop-blur-md · max-w-7xl h-[85vh] · slate-900/30 蒙层</p>

          <div style={{ flex: 1, background: '#f8fafc', borderRadius: 12, padding: 24, opacity: 0.6 }}>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>用户聊天记录...</p>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>AI 回复...</p>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>SQL 结果表格...</p>
          </div>
        </div>

        {/* 蒙层 + 卡片 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15, 23, 42, 0.30)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16,
        }}>
          <div style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: 16,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.20)',
            width: '100%', maxWidth: 1100, height: '85%',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* 关闭按钮 */}
            <button style={{
              position: 'absolute', top: 8, right: 8, zIndex: 50,
              padding: 8, borderRadius: '50%',
              background: '#f1f5f9', color: '#64748b',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              fontSize: 14,
              width: 36, height: 36,
            }}>✕</button>

            {/* 内容区 */}
            <div style={{ flex: 1, padding: '40px 24px 24px', overflowY: 'auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>用户管理</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'].map(n => (
                  <div key={n} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#dcfce7', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{n}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>普通用户</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
