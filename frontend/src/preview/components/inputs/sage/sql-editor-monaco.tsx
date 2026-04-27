import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Check, ChevronLeft, ChevronRight, Copy, LayoutList, Maximize2, SquareStack, Wand2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const SQL_SAMPLE = `-- 本月销售 Top 10
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

const SQL_SAMPLE_2 = `-- 渠道分布
SELECT channel, SUM(amount) FROM orders
WHERE created_at >= DATE_TRUNC('month', NOW())
GROUP BY channel
ORDER BY 2 DESC;`;

export default function SqlEditorMonacoPage() {
  const [fullscreen, setFullscreen] = useState(false);
  const [layout, setLayout] = useState<'pagination' | 'list'>('pagination');
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const sqls = [SQL_SAMPLE, SQL_SAMPLE_2];

  const onCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Inline 模式（200px）</h2>

          {/* Inline 模式 */}
          <div
            onMouseEnter={() => {}}
            style={{
              position: 'relative',
              border: `1px solid #e2e8f0`,
              borderRadius: 6,
              overflow: 'hidden',
              background: '#fff',
              transition: 'border-color 200ms',
            }}
          >
            <FakeCodeMirror code={SQL_SAMPLE} hex={HEX} height={200} />
            <button
              onClick={() => setFullscreen(true)}
              style={{
                position: 'absolute', right: 16, top: 2, zIndex: 10,
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#94a3b8', padding: 4,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><Maximize2 size={14} /></button>
          </div>

          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Drawer 全屏（mask=false · placement=right · size=690）</h2>

          {/* 模拟全屏 Drawer 的内容 */}
          <div style={{
            display: 'flex',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            overflow: 'hidden',
            background: '#fff',
            height: 420,
          }}>
            {/* 左侧 collapse handle */}
            <div style={{
              width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', background: 'transparent',
            }}>
              <ChevronRight size={16} color="#9ca3af" />
            </div>
            {/* 主内容 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1px solid #f3f4f6' }}>
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: '#fff',
                borderBottom: '1px solid #f3f4f6',
                position: 'relative',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>SQL Preview</span>

                {/* 中央分页 */}
                {layout === 'pagination' && sqls.length > 1 && (
                  <div style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    <button onClick={() => setPage(p => Math.max(0, p - 1))} style={iconBtn}><ChevronLeft size={16} /></button>
                    <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                      {page + 1}/{sqls.length}
                    </span>
                    <button onClick={() => setPage(p => Math.min(sqls.length - 1, p + 1))} style={iconBtn}><ChevronRight size={16} /></button>
                  </div>
                )}

                {/* 工具栏 */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <button onClick={() => setLayout(l => l === 'list' ? 'pagination' : 'list')} style={iconBtn}>
                    {layout === 'list' ? <SquareStack size={16} color="#64748b" /> : <LayoutList size={16} color="#64748b" />}
                  </button>
                  <button style={iconBtn}><Wand2 size={16} color="#64748b" /></button>
                  <button onClick={onCopy} style={iconBtn}>
                    {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} color={HEX} />}
                  </button>
                </div>
              </div>

              {/* Editor 区 */}
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                {layout === 'pagination' ? (
                  <FakeCodeMirror code={sqls[page]} hex={HEX} fill />
                ) : (
                  <div style={{ height: '100%', overflowY: 'auto' }}>
                    {sqls.map((s, i) => (
                      <div key={i} style={{
                        position: 'relative', borderBottom: '1px solid #f3f4f6',
                        minHeight: 200,
                      }}>
                        <span style={{
                          position: 'absolute', top: 8, right: 16, zIndex: 10,
                          padding: '2px 8px', borderRadius: 999,
                          background: '#f1f5f9', color: '#64748b',
                          fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                        }}>{i + 1}/{sqls.length}</span>
                        <FakeCodeMirror code={s} hex={HEX} height={200} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, textAlign: 'center' }}>
            Maximize2 切换全屏 · Drawer mask=false 不遮挡内容 · 主题色 alpha 注入 cursor / selection / activeLine
          </p>
        </div>
      </ConfigProvider>
      {fullscreen && <div onClick={() => setFullscreen(false)} style={{ position: 'fixed', inset: 0, cursor: 'pointer' }} />}
    </PreviewFrame>
  );
}

const iconBtn: React.CSSProperties = {
  width: 28, height: 28,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent', border: 'none', cursor: 'pointer',
  borderRadius: 4,
};

function FakeCodeMirror({ code, hex, height, fill }: { code: string; hex: string; height?: number; fill?: boolean }) {
  // SQL 语法高亮（极简版）
  const lines = code.split('\n');
  const KW = /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|AND|OR|AS|SUM|COUNT|AVG|MAX|MIN|ROUND|LAG|OVER|DATE_TRUNC|NOW|TRUE|FALSE|LIMIT|DESC|ASC)\b/gi;
  const STR = /'[^']*'/g;
  const NUM = /\b\d+(\.\d+)?\b/g;
  const COMMENT = /^--.*/;

  return (
    <div style={{
      height: fill ? '100%' : height, overflow: 'auto',
      background: '#fff',
      fontFamily: 'ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace',
      fontSize: 13, lineHeight: '20px',
      display: 'flex',
    }}>
      {/* gutter */}
      <div style={{
        flexShrink: 0, padding: '8px 8px 8px 12px',
        textAlign: 'right',
        color: '#94a3b8', userSelect: 'none',
        background: '#fafafa',
        borderRight: '1px solid #f1f5f9',
      }}>
        {lines.map((_, i) => (
          <div key={i} style={{
            background: i === 9 ? `${hex}20` : 'transparent',
            color: i === 9 ? hex : '#94a3b8',
            padding: '0 4px',
          }}>{i + 1}</div>
        ))}
      </div>
      <pre style={{
        flex: 1, padding: '8px 12px', margin: 0,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
        {lines.map((line, i) => {
          // active line @ idx 9
          const isActive = i === 9;
          let html = escape(line)
            .replace(KW, m => `<span style="color:#7c3aed;font-weight:600">${m}</span>`)
            .replace(STR, m => `<span style="color:#16a34a">${m}</span>`)
            .replace(NUM, m => `<span style="color:#ea580c">${m}</span>`);
          if (COMMENT.test(line)) html = `<span style="color:#94a3b8;font-style:italic">${escape(line)}</span>`;
          return (
            <div
              key={i}
              style={{
                background: isActive ? `${hex}15` : 'transparent',
                margin: '0 -12px', padding: '0 12px',
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
