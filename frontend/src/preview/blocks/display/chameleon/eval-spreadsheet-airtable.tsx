import { PreviewFrame } from '../../../_layout';
import { Columns3, Eye, Lock, Plus, Trash2 } from 'lucide-react';

/**
 * eval-spreadsheet-airtable · 评测样本电子表格（Airtable 化）
 * 动态 {{var}} 输入列 + 固定「理想回答/元数据/备注/操作」列。
 * 单格失焦保存 / 长值省略 / JSON Popover 双视图 / 系统列隐藏 / 脱敏 Lock / +新增行。
 * 源码：frontend/src/system/datasets/components/dataset-spreadsheet.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

interface Row {
  id: number;
  userInput: string;
  language: string;
  meta: string;
  expected: string;
  note: string;
  editing?: boolean;
  redacted?: boolean;
}

const ROWS: Row[] = [
  {
    id: 1,
    userInput: '帮我把这段中文翻译成法语，要正式书面语气',
    language: 'zh',
    meta: '{"source":"manual","split":"test"}',
    expected: 'Bonjour, voici la traduction formelle de votre texte…',
    note: '检验正式语气保持',
  },
  {
    id: 2,
    userInput: '解释一下什么是向量数据库以及它的适用场景',
    language: 'zh',
    meta: '',
    expected: '向量数据库是一种专门存储和检索高维向量的数据库…',
    note: '',
    editing: true,
  },
  {
    id: 3,
    userInput: '(采样脱敏内容)',
    language: 'en',
    meta: '{"pii":true}',
    expected: '———',
    note: '含 PII 已脱敏',
    redacted: true,
  },
];

const th: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  padding: '10px 12px',
  textAlign: 'left',
  fontWeight: 500,
};
const td: React.CSSProperties = { padding: '8px 12px', verticalAlign: 'top' };

export default function EvalSpreadsheetAirtable() {
  return (
    <PreviewFrame bg="#fafaf7" padded>
      <div style={{ fontFamily: FONT, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* ColumnMenu 行：右对齐 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 32,
              padding: '0 8px',
              background: 'transparent',
              border: 'none',
              borderRadius: 6,
              fontSize: 12.5,
              color: '#78716c',
              cursor: 'pointer',
            }}
          >
            <Columns3 size={14} style={{ marginRight: 4 }} />
            列
            <span
              style={{
                marginLeft: 4,
                borderRadius: 4,
                background: 'rgba(231,229,224,0.7)',
                padding: '0 4px',
                fontSize: 10,
                color: '#78716c',
              }}
            >
              隐 3
            </span>
          </button>
        </div>

        {/* 表格外壳 */}
        <div
          style={{
            position: 'relative',
            overflowX: 'auto',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.6)',
          }}
        >
          <table
            style={{
              width: '100%',
              tableLayout: 'fixed',
              borderCollapse: 'collapse',
              minWidth: 920,
            }}
          >
            <colgroup>
              <col style={{ width: 280 }} /> {/* user_input 业务文本宽 */}
              <col style={{ width: 90 }} /> {/* language */}
              <col style={{ width: 200 }} /> {/* 理想回答 */}
              <col style={{ width: 180 }} /> {/* 元数据 */}
              <col style={{ width: 130 }} /> {/* 备注 */}
              <col style={{ width: 48 }} /> {/* 操作 */}
            </colgroup>
            <thead style={{ background: 'rgba(244,243,238,0.4)', borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
              <tr style={{ fontSize: 11, fontWeight: 500, color: '#78716c' }}>
                <th style={th}>用户输入</th>
                <th style={th}>语言</th>
                <th style={th}>理想回答</th>
                <th style={th}>元数据</th>
                <th style={th}>备注</th>
                <th style={{ ...th, padding: '10px 12px' }} />
              </tr>
            </thead>
            <tbody style={{ fontSize: 12.5 }}>
              {ROWS.map((r, idx) => (
                <tr
                  key={r.id}
                  style={{
                    borderTop: idx === 0 ? 'none' : '1px solid #f1f0eb',
                    background: idx === 1 ? '#fafaf9' : 'transparent',
                  }}
                >
                  {/* user_input：第 2 行处于编辑态 */}
                  <td style={td}>
                    {r.editing ? (
                      <textarea
                        defaultValue={r.userInput}
                        rows={2}
                        style={{
                          width: '100%',
                          resize: 'none',
                          borderRadius: 4,
                          border: '1px solid #93c5fd',
                          background: '#fff',
                          padding: '4px 6px',
                          fontSize: 12.5,
                          lineHeight: 1.375,
                          fontFamily: FONT,
                          boxShadow: '0 0 0 2px #dbeafe',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          display: 'block',
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#44403c',
                          cursor: 'text',
                        }}
                      >
                        {r.userInput}
                      </span>
                    )}
                  </td>
                  {/* language */}
                  <td style={td}>
                    <span style={{ color: '#44403c' }}>{r.language}</span>
                  </td>
                  {/* 理想回答 */}
                  <td style={td}>
                    {r.redacted ? (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          color: '#a8a29e',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Lock size={12} style={{ flexShrink: 0 }} />
                        <span
                          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                          采样脱敏
                        </span>
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'block',
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#44403c',
                        }}
                      >
                        {r.expected}
                      </span>
                    )}
                  </td>
                  {/* 元数据：JSON Popover 触发 */}
                  <td style={td}>
                    <span
                      style={{
                        display: 'block',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: MONO,
                        fontSize: 11.5,
                        color: '#78716c',
                        cursor: 'pointer',
                      }}
                    >
                      {r.meta ? r.meta.replace(/\s+/g, ' ') : '{ }'}
                    </span>
                  </td>
                  {/* 备注 */}
                  <td style={td}>
                    <input
                      defaultValue={r.note}
                      placeholder="备注…"
                      style={{
                        width: '100%',
                        borderRadius: 4,
                        border: '1px solid transparent',
                        background: 'transparent',
                        padding: '2px 4px',
                        fontSize: 12,
                        lineHeight: 1.375,
                        color: '#57534e',
                        fontFamily: FONT,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </td>
                  {/* 操作：删除（演示态露出） */}
                  <td style={{ ...td, textAlign: 'right' }}>
                    <button
                      title="删除该样本"
                      style={{
                        borderRadius: 4,
                        padding: 4,
                        background: 'transparent',
                        border: 'none',
                        color: '#d6d3d1',
                        cursor: 'pointer',
                        display: 'inline-flex',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* JSON Popover 浮层（演示：附着在元数据列下方） */}
        <div
          style={{
            width: '28rem',
            maxWidth: '100%',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.7)',
            background: '#fffefb',
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
            padding: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 500, color: '#57534e' }}>元数据 meta</span>
            <button
              style={{
                fontSize: 11,
                color: '#78716c',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              编辑
            </button>
          </div>
          <pre
            style={{
              margin: 0,
              maxHeight: '20rem',
              overflow: 'auto',
              borderRadius: 6,
              background: '#f4f3ee',
              padding: 10,
              fontFamily: MONO,
              fontSize: 11.5,
              lineHeight: 1.6,
              color: '#44403c',
            }}
          >
            {'{\n  '}
            <span style={{ color: '#2563eb' }}>"source"</span>
            {': '}
            <span style={{ color: '#047857' }}>"manual"</span>
            {',\n  '}
            <span style={{ color: '#2563eb' }}>"split"</span>
            {': '}
            <span style={{ color: '#047857' }}>"test"</span>
            {'\n}'}
          </pre>
        </div>

        {/* +新增行 */}
        <button
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            height: 32,
            padding: '0 12px',
            background: '#fff',
            border: '1px solid #d6d3d1',
            borderRadius: 6,
            fontSize: 12.5,
            fontWeight: 500,
            color: '#44403c',
            cursor: 'pointer',
          }}
        >
          <Plus size={14} style={{ marginRight: 4 }} />
          新增行
        </button>

        {/* 视觉脚注：列菜单态预览 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#a8a29e' }}>
          <Eye size={12} />
          系统列 hash / length / token_count 默认隐藏，可在「列」菜单勾回
        </div>
      </div>
    </PreviewFrame>
  );
}
