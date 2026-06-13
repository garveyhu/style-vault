import { PreviewFrame } from '../../../_layout';
import { Bot, Database, FileText, Flag, GitBranch, PlayCircle, Shuffle, UserCheck, Workflow } from 'lucide-react';

/**
 * graph-node-card · 工作流画布节点卡（整卡微染 + 多出口分支）
 * 源码：nodes/graph-node.tsx + lib/node-meta.ts (TYPE_META / BRANCH_TONES / STATUS_COLOR)
 * 1:1：rounded-[14px] / cardTint 整卡微染 / 26px 图标块 / 多出口 handle / 语义边框
 *      / STATUS_COLOR 6 态全示意 / BranchHandleRow 5 tone 全画 / ✗·⟳ 文案行
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const PRIMARY_300 = '#93c5fd'; // source handle !border-primary-300

export default function GraphNodeCard() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          minHeight: 540,
          borderRadius: 12,
          fontFamily: FONT,
          padding: 28,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 36,
          alignItems: 'flex-start',
          background:
            'radial-gradient(circle, rgba(214,211,209,0.45) 1px, transparent 1px) 0 0 / 16px 16px, #fbfbf9',
        }}
      >
        {/* start —— 默认态（无入口 handle） */}
        <Card cardTint="rgba(236,253,245,0.4)" bg="#ecfdf5" color="#047857" icon={<PlayCircle size={14} />} label="开始" type="开始" summary={null} hasInput={false} />

        {/* llm —— hover 浮起态（轻位移阴影 shadow-card） */}
        <Card
          cardTint="rgba(245,243,255,0.4)"
          bg="#f5f3ff"
          color="#6d28d9"
          icon={<Bot size={14} />}
          label="生成回答"
          type="大模型"
          summary="qwen-max · JSON"
          hovered
        />

        {/* kb —— selected 态（ring-2 ring-offset-2 + 浮起 shadow-card） */}
        <Card
          cardTint="rgba(236,253,245,0.4)"
          bg="#ecfdf5"
          color="#047857"
          icon={<Database size={14} />}
          label="检索知识库"
          type="知识库"
          summary="产品文档 · 混合+重排"
          selected
          ring="#a7f3d0"
        />

        {/* if_else —— 经典真假双 handle（true emerald-400 / false rose-400） */}
        <Card
          cardTint="rgba(255,251,235,0.4)"
          bg="#fffbeb"
          color="#b45309"
          icon={<GitBranch size={14} />}
          label="按分数路由"
          type="条件分支"
          summary="user.score ≥ 80"
          branches={[
            { label: '真 →', color: '#059669', dot: '#34d399' }, // emerald-600 文字 / emerald-400 handle
            { label: '假 →', color: '#f43f5e', dot: '#fb7185' }, // rose-500 文字 / rose-400 handle
          ]}
        />

        {/* if_else 多 CASE —— IF/ELIF 行 tone=case(amber-700) + ELSE 行 tone=else(stone-500) */}
        <Card
          cardTint="rgba(255,251,235,0.4)"
          bg="#fffbeb"
          color="#b45309"
          icon={<GitBranch size={14} />}
          label="多条件路由"
          type="条件分支"
          summary="3 个分支"
          branchRows={[
            { label: 'IF · vip', color: '#b45309', dot: '#fbbf24' }, // amber-700 / amber-400
            { label: 'ELIF · staff', color: '#b45309', dot: '#fbbf24' },
            { label: 'ELSE', color: '#78716c', dot: '#a8a29e' }, // stone-500 / stone-400
          ]}
        />

        {/* classifier —— 多分类出口 tone=branch(lime-700 文字 / lime-500 handle) + running 边框 pulse(opacity) */}
        <Card
          cardTint="rgba(247,254,231,0.4)"
          bg="#f7fee7"
          color="#4d7c0f"
          icon={<Shuffle size={14} />}
          label="意图分类"
          type="意图分类"
          summary="3 个分类 · 多出口"
          statusBorder="#60a5fa"
          pulse
          runNote="⟳ 子图执行中 · n3-classify"
          branchRows={[
            { label: 'greeting →', color: '#4d7c0f', dot: '#84cc16' },
            { label: 'question →', color: '#4d7c0f', dot: '#84cc16' },
            { label: 'other →', color: '#4d7c0f', dot: '#84cc16' },
            { label: '失败 →', color: '#f43f5e', dot: '#fb7185' }, // fail tone（rose-500 / rose-400）
          ]}
        />

        {/* human_input 选项分支 —— 每 option 一行 tone=branch(lime) */}
        <Card
          cardTint="rgba(253,242,248,0.4)"
          bg="#fdf2f8"
          color="#be185d"
          icon={<UserCheck size={14} />}
          label="人工确认"
          type="人工输入"
          summary="等待人工回填"
          branchRows={[
            { label: 'approve →', color: '#4d7c0f', dot: '#84cc16' },
            { label: 'reject →', color: '#4d7c0f', dot: '#84cc16' },
          ]}
        />

        {/* subflow —— ref 行 + errorHandled 橙边(border-amber-400) */}
        <Card
          cardTint="rgba(238,242,255,0.4)"
          bg="#eef2ff"
          color="#4338ca"
          icon={<Workflow size={14} />}
          label="清洗子流程"
          type="子工作流"
          summary={null}
          refLine="↳ 数据清洗 · v3"
          statusBorder="#fbbf24"
        />

        {/* failed —— border-rose-500 + ✗ errorMessage 行 */}
        <Card
          cardTint="rgba(255,247,237,0.4)"
          bg="#fff7ed"
          color="#c2410c"
          icon={<FileText size={14} />}
          label="解析附件"
          type="文档提取"
          summary="未设来源"
          statusBorder="#f43f5e"
          errorMessage="✗ 附件解析失败：超时"
        />

        {/* skipped —— border-stone-200（淡灰，被跳过分支） */}
        <Card
          cardTint="rgba(245,245,244,0.5)"
          bg="#f5f5f4"
          color="#44403c"
          icon={<Flag size={14} />}
          label="结束"
          type="结束"
          summary={null}
          hasOutput={false}
          statusBorder="#e7e5e0"
        />

        {/* 悬挂容错出口 —— tone=dangling(amber-600) */}
        <Card
          cardTint="rgba(245,243,255,0.4)"
          bg="#f5f3ff"
          color="#6d28d9"
          icon={<Bot size={14} />}
          label="旧版生成"
          type="大模型"
          summary="qwen-plus"
          danglingRows={[{ label: 'legacy · 悬挂', color: '#d97706', dot: '#fbbf24' }]}
        />
      </div>
    </PreviewFrame>
  );
}

interface BranchRow {
  label: string;
  color: string;
  dot: string;
}

interface CardProps {
  cardTint: string;
  bg: string;
  color: string;
  icon: React.ReactNode;
  label: string;
  type: string;
  summary: string | null;
  hasInput?: boolean;
  hasOutput?: boolean;
  hovered?: boolean;
  selected?: boolean;
  ring?: string;
  statusBorder?: string;
  pulse?: boolean;
  refLine?: string;
  runNote?: string;
  errorMessage?: string;
  branches?: BranchRow[];
  branchRows?: BranchRow[];
  danglingRows?: BranchRow[];
}

function Card({
  cardTint,
  bg,
  color,
  icon,
  label,
  type,
  summary,
  hasInput = true,
  hasOutput = true,
  hovered,
  selected,
  ring,
  statusBorder,
  pulse,
  refLine,
  runNote,
  errorMessage,
  branches,
  branchRows,
  danglingRows,
}: CardProps) {
  const border = statusBorder ?? 'rgba(231,229,228,0.7)'; // border-stone-200/70
  const hasRowOutlet = !!branches || !!branchRows;
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          minWidth: 180,
          borderRadius: 14, // rounded-[14px]
          border: `1px solid ${border}`,
          background: cardTint,
          padding: '8px 10px', // pt-2 pb-2 px-2.5
          fontSize: 11.5,
          boxShadow:
            selected || hovered
              ? '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)' // shadow-card
              : '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', // shadow-soft
          transform: selected || hovered ? 'translateY(-1px)' : 'none',
          outline: selected && ring ? `2px solid ${ring}` : 'none', // ring-2 + meta.ring
          outlineOffset: selected ? 2 : 0, // ring-offset-2
          // Tailwind animate-pulse 是整体 opacity 脉冲（1↔.5），边框保持 primary-400 静态
          animation: pulse ? 'gn-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
        }}
      >
        {/* 入口 handle（左 -5）—— !border-stone-300 */}
        {hasInput && <Dot side="left" border="#d6d3d1" top="50%" />}

        {/* 头部行 relative z-10 gap-2 */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 26, // h-[26px]
              width: 26, // w-[26px]
              flexShrink: 0,
              borderRadius: 9, // rounded-[9px]
              background: bg,
              color,
              boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)', // ring-1 ring-inset ring-stone-900/5
            }}
          >
            {icon}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 12.5, // text-[12.5px]
                fontWeight: 600,
                letterSpacing: '-0.01em', // tracking-tight
                color: '#292524', // text-stone-800
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 9.5, // text-[9.5px]
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.03em', // tracking-wide
                lineHeight: 1.2,
                color, // meta.color
              }}
            >
              {type}
            </div>
          </div>
        </div>

        {summary && (
          <div
            style={{
              marginTop: 4, // mt-1
              fontSize: 10,
              lineHeight: 1.2,
              color: '#a8a29e', // text-stone-400
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {summary}
          </div>
        )}

        {refLine && (
          <div
            style={{
              marginTop: 4,
              fontFamily: MONO,
              fontSize: 10,
              color: '#4f46e5', // text-indigo-600
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {refLine}
          </div>
        )}

        {/* running 附注 ⟳ —— text-blue-600 */}
        {runNote && (
          <div style={{ marginTop: 4, fontSize: 10, color: '#2563eb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {runNote}
          </div>
        )}

        {/* error 行 ✗ —— text-rose-600 */}
        {errorMessage && (
          <div style={{ marginTop: 4, fontSize: 10, color: '#e11d48', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {errorMessage}
          </div>
        )}

        {/* if_else 经典双 handle（绝对定位 top 35%/70% + 右侧标签列） */}
        {branches && (
          <>
            <Dot side="right" border={branches[0].dot} top="35%" />
            <Dot side="right" border={branches[1].dot} top="70%" />
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              {branches.map(b => (
                <span key={b.label} style={{ fontSize: 9, color: b.color }}>
                  {b.label}
                </span>
              ))}
            </div>
          </>
        )}

        {/* 多出口 / 多 CASE / 选项分支：每行标签 + 行内 handle（right:-15） */}
        {branchRows && (
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {branchRows.map(b => (
              <RowOutlet key={b.label} {...b} />
            ))}
          </div>
        )}

        {/* 悬挂容错出口（dangling tone amber-600） */}
        {danglingRows && (
          <>
            <Dot side="right" border={PRIMARY_300} top="50%" />
            <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {danglingRows.map(b => (
                <RowOutlet key={b.label} {...b} />
              ))}
            </div>
          </>
        )}

        {/* 默认单出口 handle（无分支、非结束节点） */}
        {!hasRowOutlet && !danglingRows && hasOutput && <Dot side="right" border={PRIMARY_300} top="50%" />}
      </div>
      <style>{`@keyframes gn-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }`}</style>
    </div>
  );
}

/** 一行「label → + 行内出口 handle（right:-15）」—— BranchHandleRow */
function RowOutlet({ label, color, dot }: BranchRow) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: 9, color }}>
      <span style={{ fontFamily: MONO, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <RowDot border={dot} />
    </div>
  );
}

/** 主连接点：10px 白底细边圆点（HANDLE_BASE !h-2.5 !w-2.5 !border-[1.5px]） */
function Dot({ side, border, top }: { side: 'left' | 'right'; border: string; top: string }) {
  return (
    <span
      style={
        {
          position: 'absolute',
          top,
          [side]: -5,
          transform: 'translateY(-50%)',
          height: 10,
          width: 10,
          borderRadius: '50%',
          border: `1.5px solid ${border}`,
          background: '#fff',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)', // shadow-sm
        } as React.CSSProperties
      }
    />
  );
}

/** 行内出口 handle（right:-15） */
function RowDot({ border }: { border: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: '50%',
        right: -15,
        transform: 'translateY(-50%)',
        height: 10,
        width: 10,
        borderRadius: '50%',
        border: `1.5px solid ${border}`,
        background: '#fff',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)',
      }}
    />
  );
}
