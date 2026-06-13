import { PreviewFrame } from '../../../_layout';

export default function AmberNavProgress() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK · variant</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 8px' }}>Amber Climb Nav Progress</h1>
        <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 24px', lineHeight: 1.6 }}>
          顶部 2px 琥珀色 determinate 爬升条，pending 期 cubic-bezier 慢升到 85% 永不到顶 + 琥珀发光阴影。
        </p>

        {/* 模拟浏览器窗口顶栏，进度条贴在最上沿 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>fixed top · z-[1000] · 智能导航预取中</div>
        <div style={{ position: 'relative', borderRadius: 8, border: '1px solid #e7e5e0', background: '#fffefb', overflow: 'hidden', boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)' }}>
          {/* 顶部 2px 透明轨 */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: 'transparent', pointerEvents: 'none' }}>
            <div
              style={{
                height: '100%',
                background: '#f59e0b',
                boxShadow: '0 0 8px rgba(217,119,6,0.6)',
                animation: 'amber-climb 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
              }}
            />
          </div>
          {/* 假页面内容 */}
          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#78716c' }}>
              <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#f59e0b', boxShadow: '0 0 6px rgba(217,119,6,0.5)' }} />
              正在预取「知识库 / 文档详情」…
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 12, width: '60%', borderRadius: 4, background: '#f4f3ee' }} />
              <div style={{ height: 12, width: '85%', borderRadius: 4, background: '#f4f3ee' }} />
              <div style={{ height: 12, width: '40%', borderRadius: 4, background: '#f4f3ee' }} />
            </div>
          </div>
        </div>

        {/* 静态对照：85% 卡顿态 + 冲顶态 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>状态快照</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'pending 中 · width 85% · cubic-bezier 慢升', w: 85, op: 1 },
            { label: 'pending 清零 · width 100% · 冲顶', w: 100, op: 1 },
            { label: '淡出 · opacity 0', w: 100, op: 0 },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 11, color: '#a8a29e', marginBottom: 6 }}>{s.label}</div>
              <div style={{ position: 'relative', height: 2, background: '#f4f3ee', borderRadius: 9999 }}>
                <div style={{ height: '100%', width: `${s.w}%`, background: '#f59e0b', boxShadow: '0 0 8px rgba(217,119,6,0.6)', opacity: s.op, borderRadius: 9999 }} />
              </div>
            </div>
          ))}
        </div>

        {/* 与 waveflow 蓝色 indeterminate 对照 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>对照：waveflow 蓝色 indeterminate</div>
        <div style={{ position: 'relative', height: 2, overflow: 'hidden', background: 'rgba(231,229,224,0.4)', borderRadius: 9999 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, #3b82f6 40%, #2563eb 60%, transparent 100%)',
              animation: 'wf-slide 1.1s ease-in-out infinite',
            }}
          />
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: '#a8a29e', lineHeight: 1.7 }}>
          本条单色 amber-500 实心 + 发光 + determinate 爬升 / z-[1000] · waveflow 蓝色 4-stop 渐变 indeterminate 滑动循环 / z-[300]
        </div>

        <style>{`
          @keyframes amber-climb {
            0% { width: 0%; opacity: 1; }
            70% { width: 85%; opacity: 1; }
            85% { width: 100%; opacity: 1; }
            100% { width: 100%; opacity: 0; }
          }
          @keyframes wf-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </PreviewFrame>
  );
}
