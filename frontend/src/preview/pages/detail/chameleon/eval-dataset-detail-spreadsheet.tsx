import { PreviewFrame } from '../../../_layout';
import { ArrowLeft, Columns3, Download, FileSpreadsheet, Plus, Sparkles, Tags, Trash2, Upload } from 'lucide-react';

const COLS = [
  { key: 'user_input', label: '用户输入', w: 240 },
  { key: 'context', label: '上下文', w: 200 },
];

const ROWS = [
  { input: '退款政策是怎样的？超过 7 天还能退吗？', context: '电商客服 FAQ', expected: '标准商品支持 7 天无理由退货，超 7 天仅质量问题可售后。', meta: '{ source: "ai_generate" }', note: '边界：超期退款' },
  { input: '帮我把这段 SQL 改成按月分组', context: 'SQL 助手', expected: 'SELECT DATE_TRUNC(\'month\', ...) ...', meta: '{ source: "log_sample" }', note: '能力：SQL 改写' },
  { input: '今天天气怎么样', context: '', expected: '抱歉，我无法获取实时天气信息。', meta: '{ }', note: '拒答类' },
];

export default function EvalDatasetDetailSpreadsheet() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '20px 24px', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '4px 8px', fontSize: 12.5, color: '#78716c' }}>
            <ArrowLeft size={14} strokeWidth={2} color="#78716c" /> 数据集
          </span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <div style={{ display: 'flex', flex: 1, alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#1c1917' }}>客服质量基准集</span>
            <span style={{ fontSize: 11.5, color: '#78716c' }}>· 124 样本</span>
            <span style={{ marginLeft: 'auto' }} />
            <Btn ghost><FileSpreadsheet size={14} strokeWidth={2} /> 导出</Btn>
            <Btn><Upload size={14} strokeWidth={2} /> 手工导入</Btn>
            <Btn><Sparkles size={14} strokeWidth={2} /> AI 扩样</Btn>
            <Btn><Tags size={14} strokeWidth={2} /> AI 归类</Btn>
            <Btn><Download size={14} strokeWidth={2} /> 从日志采样</Btn>
          </div>
        </header>

        {/* tab 栏：双 SegmentedControl */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Seg items={[{ l: '样本', active: true }, { l: '运行', active: false }]} />
          <Seg items={[{ l: '表格', active: false }, { l: '电子表格', active: true }]} />
        </div>

        {/* 「列」菜单行 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#78716c', padding: '4px 8px' }}>
            <Columns3 size={14} strokeWidth={2} color="#78716c" /> 列
            <span style={{ marginLeft: 4, borderRadius: 4, background: 'rgba(231,229,224,0.7)', padding: '0 4px', fontSize: 10, color: '#78716c' }}>隐 3</span>
          </span>
        </div>

        {/* Airtable 电子表格 */}
        <div>
          <div style={{ position: 'relative', overflowX: 'auto', borderRadius: 8, border: '1px solid rgba(231,229,224,0.6)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 880 }}>
              <colgroup>
                <col style={{ width: 36 }} />
                {COLS.map(c => <col key={c.key} style={{ width: c.w }} />)}
                <col style={{ width: 260 }} />
                <col style={{ width: 150 }} />
                <col style={{ width: 160 }} />
                <col style={{ width: 48 }} />
              </colgroup>
              <thead style={{ background: 'rgba(244,243,238,0.4)', borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
                <tr style={{ fontSize: 11, fontWeight: 500, color: '#78716c' }}>
                  <th style={th}><input type="checkbox" style={{ width: 14, height: 14, accentColor: '#44403c' }} /></th>
                  {COLS.map(c => <th key={c.key} style={th}>{c.label}</th>)}
                  <th style={th}>理想回答</th>
                  <th style={th}>元数据</th>
                  <th style={th}>备注</th>
                  <th style={th} />
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i} style={{ borderTop: i ? '1px solid #f5f4ee' : 'none', fontSize: 12.5 }}>
                    <td style={td}><input type="checkbox" style={{ width: 14, height: 14, accentColor: '#44403c', marginTop: 2 }} /></td>
                    <td style={td}><span style={truncate('#44403c')}>{r.input}</span></td>
                    <td style={td}>{r.context ? <span style={truncate('#44403c')}>{r.context}</span> : <span style={{ color: '#d6d3d1' }}>—</span>}</td>
                    <td style={td}><span style={truncate('#44403c')}>{r.expected}</span></td>
                    <td style={td}>
                      <span style={{ ...truncate('#78716c'), fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5 }}>{r.meta}</span>
                    </td>
                    <td style={td}><span style={truncate('#57534e', 12)}>{r.note}</span></td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <Trash2 size={14} strokeWidth={2} color="#d6d3d1" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 新增行 */}
          <div style={{ marginTop: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, borderRadius: 6, border: '1px solid #e7e5e0', background: '#f4f3ee', padding: '0 10px', fontSize: 11.5, color: '#44403c', cursor: 'pointer' }}>
              <Plus size={14} strokeWidth={2} /> 新增行
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { position: 'sticky', top: 0, padding: '10px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '8px 12px', verticalAlign: 'top' };

function truncate(color: string, fs = 12.5): React.CSSProperties {
  return { display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color, fontSize: fs };
}

function Btn({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, borderRadius: 6,
      padding: '0 10px', fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
      background: ghost ? 'transparent' : '#f4f3ee',
      color: '#44403c', border: ghost ? '1px solid transparent' : '1px solid #e7e5e0',
    }}>{children}</span>
  );
}

function Seg({ items }: { items: { l: string; active: boolean }[] }) {
  return (
    <div style={{ position: 'relative', display: 'flex', width: 'fit-content', alignItems: 'center', gap: 2, borderRadius: 8, border: '1px solid #e7e5e0', background: 'rgba(245,244,238,0.7)', padding: 2 }}>
      {items.map(it => (
        <span key={it.l} style={{
          borderRadius: 6, padding: '6px 14px', fontSize: 12.5, fontWeight: 500,
          background: it.active ? '#fffefb' : 'transparent',
          boxShadow: it.active ? '0 1px 2px rgb(0 0 0 / 6%)' : 'none',
          color: it.active ? '#1d4ed8' : '#78716c',
        }}>{it.l}</span>
      ))}
    </div>
  );
}
