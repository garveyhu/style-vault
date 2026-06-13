import { PreviewFrame } from '../../../_layout';
import { Bot, Database, GitBranch, PlayCircle, Shuffle, Workflow } from 'lucide-react';

/**
 * graph-node-card · 工作流画布节点卡（整卡微染 + 多出口分支）
 * 源码：nodes/graph-node.tsx + lib/node-meta.ts (TYPE_META)
 * 1:1：rounded-[14px] / cardTint 整卡微染 / 26px 图标块 / 多出口 handle / 语义边框
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

/** TYPE_META 摘录：cardTint(50/40) / bg(50) / color(700) / ring(200) / handle(primary-300) */
const PRIMARY_300 = '#93c5fd';

export default function GraphNodeCard() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          minHeight: 420,
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
        {/* 经典 start —— 默认态 */}
        <Card cardTint="rgba(236,253,245,0.4)" bg="#ecfdf5" color="#047857" icon={<PlayCircle size={14} />} label="开始" type="开始" summary={null} hasInput={false} />

        {/* llm —— hover 浮起态（轻位移阴影） */}
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

        {/* if_else —— 真假双 handle */}
        <Card
          cardTint="rgba(255,251,235,0.4)"
          bg="#fffbeb"
          color="#b45309"
          icon={<GitBranch size={14} />}
          label="按分数路由"
          type="条件分支"
          summary="user.score ≥ 80"
          branches={[
            { label: '真 →', color: '#059669', dot: '#34d399' },
            { label: '假 →', color: '#f43f5e', dot: '#fb7185' },
          ]}
        />

        {/* kb —— selected 态（ring + 浮起） */}
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

        {/* classifier —— 多分类出口 + running 边框 pulse */}
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
          branchRows={[
            { label: 'greeting →', color: '#65a30d', dot: '#84cc16' },
            { label: 'question →', color: '#65a30d', dot: '#84cc16' },
            { label: 'other →', color: '#65a30d', dot: '#84cc16' },
          ]}
        />

        {/* subflow —— ref 行 + errorHandled 橙边 */}
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
      </div>
    </PreviewFrame>
  );
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
  hovered?: boolean;
  selected?: boolean;
  ring?: string;
  statusBorder?: string;
  pulse?: boolean;
  refLine?: string;
  branches?: { label: string; color: string; dot: string }[];
  branchRows?: { label: string; color: string; dot: string }[];
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
  hovered,
  selected,
  ring,
  statusBorder,
  pulse,
  refLine,
  branches,
  branchRows,
}: CardProps) {
  const border = statusBorder ?? 'rgba(214,211,209,0.7)';
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          minWidth: 180,
          borderRadius: 14,
          border: `${selected ? 1 : 1}px solid ${border}`,
          background: cardTint,
          padding: '8px 10px',
          fontSize: 11.5,
          boxShadow: selected || hovered
            ? '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)'
            : '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
          transform: selected || hovered ? 'translateY(-1px)' : 'none',
          outline: selected && ring ? `2px solid ${ring}` : 'none',
          outlineOffset: selected ? 2 : 0,
          animation: pulse ? 'gn-pulse 1.6s ease-in-out infinite' : 'none',
        }}
      >
        {/* 入口 handle（左） */}
        {hasInput && <Dot side="left" border="#d6d3d1" top="50%" />}

        {/* 头部行 */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 26,
              width: 26,
              flexShrink: 0,
              borderRadius: 9,
              background: bg,
              color,
              boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
            }}
          >
            {icon}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {label}
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.2, color }}>
              {type}
            </div>
          </div>
        </div>

        {summary && (
          <div style={{ marginTop: 4, fontSize: 10, lineHeight: 1.2, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {summary}
          </div>
        )}

        {refLine && (
          <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 10, color: '#4f46e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {refLine}
          </div>
        )}

        {/* if_else 经典双 handle（绝对定位 + 右侧标签列） */}
        {branches && (
          <>
            <Dot side="right" border={branches[0].dot} top="35%" />
            <Dot side="right" border={branches[1].dot} top="70%" />
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              {branches.map(b => (
                <span key={b.label} style={{ fontSize: 9, color: b.color }}>{b.label}</span>
              ))}
            </div>
          </>
        )}

        {/* classifier 多出口：每行标签 + 行内 handle（right:-15） */}
        {branchRows && (
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {branchRows.map(b => (
              <div key={b.label} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: 9, color: b.color }}>
                <span style={{ fontFamily: MONO, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.label}</span>
                <RowDot border={b.dot} />
              </div>
            ))}
          </div>
        )}

        {/* 默认单出口 handle（无分支时） */}
        {!branches && !branchRows && type !== '结束' && <Dot side="right" border={PRIMARY_300} top="50%" />}
      </div>
      <style>{`@keyframes gn-pulse { 0%,100% { border-color: #60a5fa } 50% { border-color: #bfdbfe } }`}</style>
    </div>
  );
}

/** 主连接点：10px 白底细边圆点 */
function Dot({ side, border, top }: { side: 'left' | 'right'; border: string; top: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        top,
        [side]: -5,
        transform: 'translateY(-50%)',
        height: 10,
        width: 10,
        borderRadius: '50%',
        border: `1.5px solid ${border}`,
        background: '#fff',
        boxShadow: '0 1px 2px rgb(0 0 0 / 8%)',
      } as React.CSSProperties}
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
        boxShadow: '0 1px 2px rgb(0 0 0 / 8%)',
      }}
    />
  );
}
