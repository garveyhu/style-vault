import { PreviewFrame } from '../../../_layout';
import { Bot } from 'lucide-react';

/**
 * hitl-human-input-prompt · Chameleon durable agent 人工输入回填卡
 * 源码：system/playground/components/message-thread.tsx:383-419 (HumanInputPending)
 *        + :234-238 气泡 paused 占位（⏸ emoji，不是 lucide Pause）
 * 1:1：回填卡 max-w-[420px] rounded-xl border-amber-200 bg-amber-50/60 p-3 /
 *      标题 ⏸ text-amber-700 / Textarea text-[13px] rows=2 / Button size=sm(h-7 px-2.5 text-[11.5px])
 */

const sans = 'Inter, system-ui, sans-serif';

export default function HitlHumanInputPrompt() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: sans, maxWidth: 560 }}>
        {/* 模拟 assistant 气泡（paused 态）+ 下方回填卡，按真实 items-start 列结构 */}
        <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
          {/* 渐变 bot 头像 */}
          <div style={{ marginTop: 2, width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', color: '#fff' }}>
            <Bot size={14} color="#fff" strokeWidth={2} />
          </div>

          {/* 气泡列 items-start */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, maxWidth: '88%', alignItems: 'flex-start' }}>
            {/* 气泡本体：paused 占位 —— 纯 ⏸ emoji + 文字（text-amber-600） */}
            <div style={{ minWidth: 0, borderRadius: 16, borderTopLeftRadius: 2, padding: '8px 12px', fontSize: 13, lineHeight: 1.6, border: '1px solid #e7e5e0', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', color: '#292524' }}>
              <span style={{ color: '#d97706' }}>⏸ 等待人工输入…</span>
            </div>

            {/* 回填卡 mt-1.5=6 max-w-[420px] rounded-xl=12 border-amber-200 bg-amber-50/60 p-3=12 */}
            <div style={{ marginTop: 6, width: '100%', maxWidth: 420, borderRadius: 12, border: '1px solid #fde68a', background: 'rgba(255,251,235,0.6)', padding: 12, boxSizing: 'border-box' }}>
              {/* 标题 mb-2 text-[12px] font-medium text-amber-700 —— ⏸ emoji + 文字 */}
              <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 500, color: '#b45309' }}>
                ⏸ 等待人工输入
              </div>
              {/* prompt mb-2 text-[13px] text-stone-700 */}
              <div style={{ marginBottom: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 13, color: '#44403c' }}>
                即将向客户发送退款 ¥320，请确认是否批准？如需修改金额请直接填写。
              </div>
              {/* Textarea mb-2 text-[13px] rows=2 */}
              <textarea
                rows={2}
                placeholder="填写答案后提交，续跑该智能体…"
                style={{ width: '100%', marginBottom: 8, fontSize: 13, lineHeight: 1.5, border: '1px solid #d6d3d1', borderRadius: 6, padding: 8, resize: 'none', outline: 'none', fontFamily: sans, color: '#1c1917', boxSizing: 'border-box', background: '#fff' }}
              />
              {/* Button size=sm：h-7=28 px-2.5=10 text-[11.5px] rounded-md=6 bg-primary-600=#2563eb */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 10px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontSize: 11.5, fontWeight: 500, cursor: 'pointer', fontFamily: sans }}>
                  提交并续跑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
