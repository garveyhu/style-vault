import { PreviewFrame } from '../../../_layout';

/**
 * markdown-message-citation · Chameleon 气泡内 Markdown + RAG 引用折叠条
 * 源码：core/components/chat/markdown.tsx:19-100
 *        + system/playground/components/message-thread.tsx:250-269
 * 1:1：text-[13.5px] leading-relaxed / inline code+pre bg-stone-100(#f5f5f4) /
 *      a text-sky-600 / blockquote border-stone-300 mb-2 / video max-h-420 border-stone-200 /
 *      citation details space-y-1 px-1 · summary 「📄」emoji（无 chevron/FileText）
 */

const sans = 'Inter, system-ui, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, monospace';

export default function MarkdownMessageCitation() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: sans, maxWidth: 600 }}>
        {/* assistant 气泡：bot 白底左上 tail，内含 13.5px 紧凑 markdown */}
        <div style={{ minWidth: 0, maxWidth: 520, borderRadius: 16, borderTopLeftRadius: 2, padding: '8px 12px', border: '1px solid #e7e5e4', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.625, color: '#292524', wordBreak: 'break-word' }}>
            {/* h2 mt-1 mb-1.5 text-[14px] font-semibold */}
            <h2 style={{ marginTop: 4, marginBottom: 6, fontSize: 14, fontWeight: 600 }}>检索结果摘要</h2>
            {/* p mb-2 */}
            <p style={{ margin: '0 0 8px' }}>
              根据知识库，退货需在 <strong style={{ fontWeight: 600 }}>7 天内</strong> 发起，参见{' '}
              <a href="#" style={{ color: '#0284c7', textDecoration: 'underline', textUnderlineOffset: 2 }}>退换货政策</a>。
            </p>
            {/* ul mb-2 space-y-0.5 pl-5 */}
            <ul style={{ margin: '0 0 8px', listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <li style={{ lineHeight: 1.625 }}>商品须保持完好、不影响二次销售</li>
              <li style={{ lineHeight: 1.625 }}>定制类商品不支持无理由退货</li>
            </ul>
            {/* inline code：bg-stone-100 #f5f5f4 rounded px-1 py-0.5 text-[0.85em] text-stone-800 */}
            <p style={{ margin: '0 0 8px' }}>
              查询接口：<code style={{ borderRadius: 4, background: '#f5f5f4', padding: '2px 4px', fontFamily: mono, fontSize: '0.85em', color: '#292524' }}>GET /orders/:id/refund</code>
            </p>
            {/* pre：bg-stone-100 #f5f5f4 rounded-md p-2.5 text-[12px] */}
            <pre style={{ margin: '0 0 8px', overflowX: 'auto', borderRadius: 6, background: '#f5f5f4', padding: 10, fontFamily: mono, fontSize: 12, color: '#292524' }}>
{`{ "status": "approved",
  "amount": 320 }`}
            </pre>
            {/* table mb-2 text-[12px] border-stone-200 */}
            <div style={{ margin: '0 0 8px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #e7e5e4', padding: '4px 8px', textAlign: 'left', fontWeight: 500 }}>状态</th>
                    <th style={{ border: '1px solid #e7e5e4', padding: '4px 8px', textAlign: 'left', fontWeight: 500 }}>时效</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #e7e5e4', padding: '4px 8px' }}>已批准</td>
                    <td style={{ border: '1px solid #e7e5e4', padding: '4px 8px' }}>1-3 个工作日</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* blockquote border-l-2 border-stone-300 pl-2 text-stone-500 mb-2 */}
            <blockquote style={{ margin: '0 0 8px', borderLeft: '2px solid #d6d3d1', paddingLeft: 8, color: '#78716c' }}>
              超时订单请联系人工客服处理。
            </blockquote>
            {/* 内联 video（a/img 匹配 .mp4 → video，my-1 max-h-[420px] max-w-full rounded-lg border-stone-200） */}
            <div style={{ margin: '4px 0', maxWidth: '100%', maxHeight: 420, borderRadius: 8, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
              <div style={{ height: 220, background: 'linear-gradient(135deg,#1e293b,#334155)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 0, height: 0, borderLeft: '16px solid #fff', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: 4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* RAG 引用折叠条（气泡下方独立列）：max-w-full space-y-1 px-1 */}
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '0 4px' }}>
          {[
            { title: '退换货政策 v3.2', snippet: '自签收之日起 7 个自然日内，商品完好不影响二次销售的可申请无理由退货；定制、生鲜、贴身类商品除外…' },
            { title: '订单履约 SOP', snippet: '退款审批通过后，款项原路返回，到账时效以支付渠道为准，一般 1-3 个工作日。' },
          ].map(c => (
            <details key={c.title} style={{ borderRadius: 6, border: '1px solid #e7e5e4', background: 'rgba(250,250,249,0.8)', padding: '4px 8px', fontSize: 11, color: '#57534e' }}>
              {/* summary：📄 emoji + 标题（truncate text-stone-500），无 chevron / 无 FileText */}
              <summary style={{ cursor: 'pointer', userSelect: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#78716c', listStyle: 'none' }}>
                📄 {c.title}
              </summary>
              <div style={{ marginTop: 4, whiteSpace: 'pre-wrap', color: '#78716c', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {c.snippet}
              </div>
            </details>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
