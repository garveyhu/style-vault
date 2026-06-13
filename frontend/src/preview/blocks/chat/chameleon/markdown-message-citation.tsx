import { PreviewFrame } from '../../../_layout';
import { FileText, ChevronRight } from 'lucide-react';

/**
 * markdown-message-citation · Chameleon 气泡内 Markdown + RAG 引用折叠条
 * 源码：core/components/chat/markdown.tsx:19-100
 *        + system/playground/components/message-thread.tsx:250-269
 */

const sans = 'Inter, system-ui, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, monospace';

export default function MarkdownMessageCitation() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: sans, maxWidth: 600 }}>
        {/* assistant 气泡：bot 白底左上 tail，内含 13.5px 紧凑 markdown */}
        <div style={{ minWidth: 0, maxWidth: 520, borderRadius: 16, borderTopLeftRadius: 2, padding: '8px 12px', border: '1px solid #e7e5e0', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.625, color: '#292524', wordBreak: 'break-word' }}>
            {/* h2 */}
            <h2 style={{ marginTop: 4, marginBottom: 6, fontSize: 14, fontWeight: 600 }}>检索结果摘要</h2>
            {/* p */}
            <p style={{ margin: '0 0 8px' }}>
              根据知识库，退货需在 <strong style={{ fontWeight: 600 }}>7 天内</strong> 发起，参见{' '}
              <a href="#" style={{ color: '#0284c7', textDecoration: 'underline', textUnderlineOffset: 2 }}>退换货政策</a>。
            </p>
            {/* ul */}
            <ul style={{ margin: '0 0 8px', listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <li style={{ lineHeight: 1.625 }}>商品须保持完好、不影响二次销售</li>
              <li style={{ lineHeight: 1.625 }}>定制类商品不支持无理由退货</li>
            </ul>
            {/* inline code + pre */}
            <p style={{ margin: '0 0 8px' }}>
              查询接口：<code style={{ borderRadius: 4, background: '#f5f4ee', padding: '2px 4px', fontFamily: mono, fontSize: '0.85em', color: '#292524' }}>GET /orders/:id/refund</code>
            </p>
            <pre style={{ margin: '0 0 8px', overflowX: 'auto', borderRadius: 6, background: '#f5f4ee', padding: 10, fontFamily: mono, fontSize: 12, color: '#292524' }}>
{`{ "status": "approved",
  "amount": 320 }`}
            </pre>
            {/* table */}
            <div style={{ margin: '0 0 8px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #e7e5e0', padding: '4px 8px', textAlign: 'left', fontWeight: 500 }}>状态</th>
                    <th style={{ border: '1px solid #e7e5e0', padding: '4px 8px', textAlign: 'left', fontWeight: 500 }}>时效</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #e7e5e0', padding: '4px 8px' }}>已批准</td>
                    <td style={{ border: '1px solid #e7e5e0', padding: '4px 8px' }}>1-3 个工作日</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* blockquote */}
            <blockquote style={{ margin: 0, borderLeft: '2px solid #d6d3d1', paddingLeft: 8, color: '#78716c' }}>
              超时订单请联系人工客服处理。
            </blockquote>
            {/* 内联 video（a/img 匹配 .mp4 → video，约束 max-h 420 / rounded-lg / border） */}
            <div style={{ margin: '4px 0', maxWidth: '100%', borderRadius: 8, border: '1px solid #e7e5e0', overflow: 'hidden' }}>
              <div style={{ height: 120, background: 'linear-gradient(135deg,#1e293b,#334155)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 0, height: 0, borderLeft: '14px solid #fff', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: 3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* RAG 引用折叠条（气泡下方独立列） */}
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 4px 0' }}>
          {[
            { title: '退换货政策 v3.2', snippet: '自签收之日起 7 个自然日内，商品完好不影响二次销售的可申请无理由退货；定制、生鲜、贴身类商品除外…' },
            { title: '订单履约 SOP', snippet: '退款审批通过后，款项原路返回，到账时效以支付渠道为准，一般 1-3 个工作日。' },
          ].map(c => (
            <details key={c.title} style={{ borderRadius: 6, border: '1px solid #e7e5e0', background: 'rgba(250,250,247,0.8)', padding: '4px 8px', fontSize: 11, color: '#57534e' }}>
              <summary style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 4, color: '#78716c', listStyle: 'none' }}>
                <ChevronRight size={11} color="#a8a29e" strokeWidth={2} />
                <FileText size={11} color="#78716c" strokeWidth={2} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</span>
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
