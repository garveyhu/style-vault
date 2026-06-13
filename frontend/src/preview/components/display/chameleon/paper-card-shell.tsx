import { PreviewFrame } from '../../../_layout';

const SHADOW_CARD = '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)';

export default function PaperCardShell() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Paper Card Shell</h1>

        {/* 完整卡：Header + Content + Footer */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>Header · Content · Footer</div>
        <div style={card}>
          {/* CardHeader: flex-col space-y-1.5 p-5 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>知识库索引配置</div>
            <div style={{ fontSize: 12, color: '#78716c' }}>分段策略、向量模型与精排开关</div>
          </div>
          {/* CardContent: p-5 pt-0 */}
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ fontSize: 13, color: '#44403c', lineHeight: 1.7 }}>
              当前使用 bge-large-zh-v1.5 向量模型，分段长度 512 token，重叠 50 token。混合检索已开启，RRF 融合向量与 BM25 通道。
            </div>
          </div>
          {/* CardFooter: flex items-center p-5 pt-0 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px 20px' }}>
            <button style={{ height: 32, padding: '0 12px', fontSize: 12.5, fontWeight: 500, borderRadius: 6, background: '#2563eb', color: '#fff', border: '1px solid transparent', cursor: 'pointer' }}>保存</button>
            <button style={{ height: 32, padding: '0 12px', fontSize: 12.5, fontWeight: 500, borderRadius: 6, background: '#fff', color: '#44403c', border: '1px solid #d6d3d1', cursor: 'pointer' }}>取消</button>
          </div>
        </div>

        {/* 仅内容卡（pt-5 补边距） */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>Content only · pt-5</div>
        <div style={card}>
          <div style={{ padding: '20px 20px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', marginBottom: 8 }}>无标题卡</div>
            <div style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7 }}>
              不需要 Header 时直接 CardContent className="pt-5" 手动补回上内边距。
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: '#a8a29e', lineHeight: 1.7 }}>
          rounded-lg (8px) · border stone-200 (#e7e5e0) · bg var(--color-paper) · shadow-card (双层极淡贴地)
        </div>
      </div>
    </PreviewFrame>
  );
}

const card: React.CSSProperties = {
  borderRadius: 8,
  border: '1px solid #e7e5e0',
  background: '#ffffff',
  color: '#1c1917',
  boxShadow: SHADOW_CARD,
};
