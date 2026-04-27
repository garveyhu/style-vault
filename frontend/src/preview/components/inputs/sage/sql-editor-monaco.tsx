import { useState } from 'react';
import { Button, ConfigProvider, Tooltip } from 'antd';
import { Check, ChevronLeft, ChevronRight, Copy, LayoutList, Maximize2, SquareStack, Wand2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const SQL = `-- 本月销售 Top 10
SELECT
  p.product_name,
  SUM(o.amount)         AS total_sales,
  SUM(o.quantity)       AS total_quantity,
  ROUND((SUM(o.amount) - LAG(SUM(o.amount)) OVER (ORDER BY p.id)) /
         LAG(SUM(o.amount)) OVER (ORDER BY p.id) * 100, 1)  AS mom_pct
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.payment_status = 'paid'
  AND o.refunded = FALSE
  AND o.created_at >= DATE_TRUNC('month', NOW())
GROUP BY p.product_name, p.id
ORDER BY total_sales DESC
LIMIT 10;`;

const SQL2 = `-- 渠道分布
SELECT channel, SUM(amount) AS total
FROM orders
WHERE created_at >= DATE_TRUNC('month', NOW())
GROUP BY channel
ORDER BY total DESC;`;

export default function SqlEditorMonacoPage() {
  const [fullscreen, setFullscreen] = useState(true);
  const [layout, setLayout] = useState<'pagination' | 'list'>('pagination');
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const sqls = [SQL, SQL2];

  const onCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <PreviewFrame bg="#fff" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div className="max-w-3xl mx-auto space-y-4" style={{ fontFamily: SAGE_FONT }}>
          <h2 className="text-sm font-semibold text-slate-900 m-0">Inline 模式（200px）</h2>
          <div className="relative border border-slate-200 rounded-md overflow-hidden transition-colors hover:border-emerald-400">
            <div className="absolute right-4 top-0.5 z-10">
              <Tooltip title="全屏预览">
                <Button
                  type="text"
                  size="small"
                  icon={<Maximize2 size={14} className="text-slate-400" />}
                  onClick={() => setFullscreen(true)}
                  className="hover:bg-slate-100"
                />
              </Tooltip>
            </div>
            <FakeCodeMirror code={SQL} height={200} />
          </div>

          <h2 className="text-sm font-semibold text-slate-900 m-0">Drawer 全屏（mask=false · placement=right · size=690）</h2>

          {/* 模拟 Drawer 全屏 · 位置贴右 690 宽 */}
          <div className="relative" style={{ minHeight: 480 }}>
            {fullscreen && (
              <div className="absolute right-0 top-0 bottom-0 flex flex-row" style={{ width: 690, height: 480 }}>
                {/* 5px 左侧 collapse handle */}
                <div
                  className="w-5 h-full flex flex-col justify-center shrink-0 cursor-pointer bg-transparent"
                  onClick={() => setFullscreen(false)}
                >
                  <div className="w-full h-10 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
                {/* 主内容 */}
                <div className="flex-1 flex flex-col h-full overflow-hidden border-l border-gray-100 bg-white shadow-xl">
                  {/* Header */}
                  <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100 shrink-0 relative">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-semibold text-gray-700 select-none">SQL 预览</span>
                    </div>
                    {sqls.length > 1 && layout === 'pagination' && (
                      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                        <Button
                          type="text" size="small" icon={<ChevronLeft size={16} />}
                          disabled={page === 0}
                          onClick={() => setPage(p => p - 1)}
                        />
                        <span className="text-xs text-slate-500 font-mono select-none">
                          {page + 1} / {sqls.length}
                        </span>
                        <Button
                          type="text" size="small" icon={<ChevronRight size={16} />}
                          disabled={page === sqls.length - 1}
                          onClick={() => setPage(p => p + 1)}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {sqls.length > 1 && (
                        <Tooltip title={layout === 'pagination' ? '切换列表视图' : '切换分页视图'}>
                          <Button
                            type="text" size="small"
                            icon={layout === 'pagination'
                              ? <LayoutList size={16} className="text-slate-500" />
                              : <SquareStack size={16} className="text-slate-500" />}
                            onClick={() => setLayout(l => l === 'pagination' ? 'list' : 'pagination')}
                            className="hover:bg-slate-100"
                          />
                        </Tooltip>
                      )}
                      <Tooltip title="格式化 SQL">
                        <Button
                          type="text" size="small"
                          icon={<Wand2 size={16} />}
                          className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        />
                      </Tooltip>
                      <Tooltip title={copied ? '已复制' : '复制 SQL'}>
                        <Button
                          type="text" size="small"
                          icon={copied
                            ? <Check size={16} className="text-green-500" />
                            : <Copy size={16} className="text-emerald-500" />}
                          onClick={onCopy}
                          className="hover:bg-slate-100"
                        />
                      </Tooltip>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-hidden relative">
                    {layout === 'list' && sqls.length > 1 ? (
                      <div className="h-full overflow-y-auto">
                        {sqls.map((s, i) => (
                          <div key={i} className="border-b border-gray-100 last:border-0 relative flex flex-col">
                            <div className="absolute top-2 right-4 z-10 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-mono pointer-events-none">
                              #{i + 1}
                            </div>
                            <div className="flex-1 overflow-hidden" style={{ minHeight: 150 }}>
                              <FakeCodeMirror code={s} fill />
                            </div>
                            {i < sqls.length - 1 && (
                              <div className="h-2 cursor-row-resize hover:bg-slate-200 w-full absolute bottom-0 left-0 z-20 flex items-center justify-center transition-colors opacity-0 hover:opacity-100 group">
                                <div className="w-8 h-1 rounded-full bg-slate-300 group-hover:bg-slate-400" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <FakeCodeMirror code={sqls[page]} fill />
                    )}
                  </div>
                </div>
              </div>
            )}
            {!fullscreen && (
              <button onClick={() => setFullscreen(true)} className="text-emerald-600 underline">展开 Drawer</button>
            )}
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function FakeCodeMirror({ code, height, fill }: { code: string; height?: number; fill?: boolean }) {
  // 还原 CodeMirror "light" theme 视感 + 主题色 active line / activeGutter
  const lines = code.split('\n');
  const KW = /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|AND|OR|AS|SUM|COUNT|AVG|MAX|MIN|ROUND|LAG|OVER|DATE_TRUNC|NOW|TRUE|FALSE|LIMIT|DESC|ASC)\b/gi;
  const STR = /'[^']*'/g;
  const NUM = /\b\d+(\.\d+)?\b/g;
  const COMMENT = /^--.*/;
  const FN = /\b([A-Z_][A-Z0-9_]+)(?=\()/g;

  const ACTIVE_LINE = 9;

  return (
    <div
      className="text-sm font-sans bg-white"
      style={{
        height: fill ? '100%' : height,
        overflow: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace',
        fontSize: 13,
        lineHeight: '20px',
        display: 'flex',
      }}
    >
      {/* gutter */}
      <div
        style={{
          flexShrink: 0,
          minWidth: 36,
          padding: '6px 8px 6px 12px',
          textAlign: 'right',
          color: '#cbd5e1',
          userSelect: 'none',
          borderRight: '1px solid #f1f5f9',
        }}
      >
        {lines.map((_, i) => {
          const isActive = i === ACTIVE_LINE;
          return (
            <div
              key={i}
              style={{
                background: isActive ? `${HEX}33` : 'transparent',
                color: isActive ? HEX : '#cbd5e1',
                margin: '0 -8px 0 -12px',
                padding: '0 8px 0 12px',
                fontWeight: isActive ? 600 : 400,
              }}
            >{i + 1}</div>
          );
        })}
      </div>

      {/* code */}
      <pre
        style={{
          flex: 1,
          padding: '6px 12px',
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          color: '#0f172a',
        }}
      >
        {lines.map((line, i) => {
          const isActive = i === ACTIVE_LINE;
          let html = escape(line);
          if (COMMENT.test(line)) {
            html = `<span style="color:#94a3b8;font-style:italic">${escape(line)}</span>`;
          } else {
            html = html
              .replace(KW, m => `<span style="color:#7c3aed;font-weight:600">${m}</span>`)
              .replace(FN, m => `<span style="color:#0891b2">${m}</span>`)
              .replace(STR, m => `<span style="color:#16a34a">${m}</span>`)
              .replace(NUM, m => `<span style="color:#ea580c">${m}</span>`);
          }
          return (
            <div
              key={i}
              style={{
                background: isActive ? `${HEX}26` : 'transparent',
                margin: '0 -12px',
                padding: '0 12px',
              }}
              dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }}
            />
          );
        })}
      </pre>
    </div>
  );
}

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
