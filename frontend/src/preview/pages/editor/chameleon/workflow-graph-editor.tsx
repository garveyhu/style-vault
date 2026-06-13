import { PreviewFrame } from '../../../_layout';
import {
  Activity,
  Bot,
  CheckCircle2,
  ChevronLeft,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Flag,
  GitBranch,
  Globe,
  History,
  KeyRound,
  Layers,
  MessageSquare,
  MoreHorizontal,
  Play,
  PlayCircle,
  Plus,
  Rocket,
  Server,
  Sparkles,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

type NodeT = {
  x: number;
  y: number;
  label: string;
  type: string;
  summary?: string;
  icon: typeof Bot;
  // color = text 700 阶前景 / bg = 图标块 50 阶底 / tint = 整卡极淡色温 / ring = 选中 200 阶
  color: string;
  bg: string;
  tint: string;
  ring: string;
  selected?: boolean;
  ifElse?: boolean;
};

// TYPE_META subset —— cardTint alpha 精确：llm/start/kb/if_else=/40、end=/50
const NODES: NodeT[] = [
  { x: 16, y: 96, label: 'Start', type: '开始', icon: PlayCircle, color: '#047857', bg: '#ecfdf5', tint: 'rgba(236,253,245,0.4)', ring: '#a7f3d0' },
  { x: 180, y: 36, label: '知识检索', type: '知识库', summary: '未选知识库', icon: Database, color: '#047857', bg: '#ecfdf5', tint: 'rgba(236,253,245,0.4)', ring: '#a7f3d0' },
  { x: 180, y: 158, label: '条件分支', type: '条件分支', summary: '未设条件', icon: GitBranch, color: '#b45309', bg: '#fffbeb', tint: 'rgba(255,251,235,0.4)', ring: '#fde68a', ifElse: true },
  { x: 372, y: 96, label: 'LLM 对话', type: '大模型', summary: 'qwen-max', icon: Bot, color: '#6d28d9', bg: '#f5f3ff', tint: 'rgba(245,243,255,0.4)', ring: '#ddd6fe', selected: true },
  { x: 540, y: 96, label: 'End', type: '结束', icon: Flag, color: '#44403c', bg: '#fafaf9', tint: 'rgba(250,250,249,0.5)', ring: '#d6d3d1' },
];

export default function WorkflowGraphEditor() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', height: 580, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* LEFT app rail —— GraphAppRail w-64 (256px) */}
        <aside style={{ display: 'flex', width: 256, flexShrink: 0, flexDirection: 'column', borderRight: '1px solid rgba(226,232,240,0.8)', background: '#fff' }}>
          {/* 应用头 p-3.5=14 */}
          <div style={{ borderBottom: '1px solid rgba(226,232,240,0.8)', padding: 14 }}>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ marginLeft: -4, display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '2px 6px 2px 4px', fontSize: 11.5, fontWeight: 500, color: '#78716c' }}>
                <ChevronLeft size={14} strokeWidth={2} /> 返回应用
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ display: 'flex', height: 36, width: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#f5f3ff', color: '#7c3aed', boxShadow: '0 1px 2px rgb(0 0 0/5%)', border: '1px solid rgba(124,58,237,0.24)' }}>
                <MessageSquare size={18} strokeWidth={2} />
              </span>
              <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>智能客服流程</div>
                <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 10.5, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>cs-flow</div>
              </div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ height: 24, borderRadius: 6, border: '1px solid #d6d3d1', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 11.5, color: '#44403c' }}>对话型</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#ecfdf5', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#047857', boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.3)' }}>
                <Rocket size={10} strokeWidth={2} /> v2
              </span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 500, color: '#d97706' }}>
                <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#fbbf24' }} /> 未保存
              </span>
            </div>
          </div>

          {/* secondary nav —— 编排 / 监测 */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 8 }}>
            <RailNav icon={Layers} label="编排" active />
            <RailNav icon={Activity} label="监测" active={false} />
          </nav>

          {/* 应用卡片 —— Web App / 后端服务 API */}
          <div style={{ flex: 1, overflow: 'auto', borderTop: '1px solid rgba(226,232,240,0.8)', background: 'rgba(248,250,252,0.4)', padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <RailCard icon={Globe} title="Web App">
              <div style={{ display: 'flex', gap: 6 }}>
                <RailAction icon={ExternalLink} label="对话页打开" />
                <RailAction icon={Code2} label="嵌入式应用" />
              </div>
            </RailCard>
            <RailCard icon={Server} title="后端服务 API">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, border: '1px solid rgba(226,232,240,0.8)', background: '#f8fafc', padding: '6px 8px', fontFamily: MONO, fontSize: 10, color: '#78716c' }}>
                <span style={{ minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://app.local/v1</span>
                <Copy size={12} strokeWidth={2} color="#a8a29e" style={{ flexShrink: 0 }} />
              </span>
              <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                <RailAction icon={Code2} label="API 文档" />
                <RailAction icon={KeyRound} label="API 密钥" />
              </div>
            </RailCard>
          </div>
        </aside>

        {/* CENTER canvas */}
        <div style={{ position: 'relative', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {/* dot-grid canvas */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#f8fafc',
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* edges —— 箭头恒灰 #d6d3d1，仅 stroke 随状态变色 */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <defs>
                <marker id="arrow-grey" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M2,2 L9,5 L2,8 Z" fill="#d6d3d1" />
                </marker>
              </defs>
              {/* start -> kb */}
              <path d="M 102,120 C 145,120 145,62 180,62" fill="none" stroke="#d6d3d1" strokeWidth={1.5} markerEnd="url(#arrow-grey)" />
              {/* start -> if_else */}
              <path d="M 102,120 C 145,120 145,184 180,184" fill="none" stroke="#d6d3d1" strokeWidth={1.5} markerEnd="url(#arrow-grey)" />
              {/* kb -> llm (highlighted: focus llm, violet stroke, 恒灰箭头) */}
              <path d="M 308,62 C 340,62 340,120 372,120" fill="none" stroke="#8b5cf6" strokeWidth={2.25} strokeDasharray="6 4" markerEnd="url(#arrow-grey)" />
              {/* if_else(真) -> llm (highlighted) */}
              <path d="M 308,177 C 340,177 340,120 372,120" fill="none" stroke="#8b5cf6" strokeWidth={2.25} strokeDasharray="6 4" markerEnd="url(#arrow-grey)" />
              {/* llm -> end */}
              <path d="M 500,120 C 520,120 520,120 540,120" fill="none" stroke="#d6d3d1" strokeWidth={1.5} markerEnd="url(#arrow-grey)" />
            </svg>

            {/* nodes */}
            {NODES.map(n => (
              <NodeCard key={n.label} node={n} />
            ))}

            {/* left-top palette collapsed trigger —— h-8 w-8 rounded-lg */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                display: 'flex',
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(255,255,255,0.95)',
                color: '#78716c',
                boxShadow: '0 1px 3px rgb(0 0 0/12%)',
              }}
            >
              <Plus size={16} strokeWidth={2} />
            </div>

            {/* left-top run status */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 56,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 8,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(255,255,255,0.9)',
                padding: '4px 10px',
                fontSize: 11.5,
                boxShadow: '0 1px 3px rgb(0 0 0/12%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#3b82f6' }} />
              <span style={{ color: '#2563eb' }}>运行中…</span>
            </div>

            {/* right-top floating toolbar —— rounded-xl bg-white/85 px-2 py-1.5, 仅 4 图标 */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 12,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(255,255,255,0.85)',
                padding: '6px 8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0/10%), 0 2px 4px -2px rgb(0 0 0/10%)',
                backdropFilter: 'blur(4px)',
                zIndex: 5,
              }}
            >
              {/* ChecklistBadge ready 态 —— 绿勾 CheckCircle2 */}
              <span style={{ display: 'flex', height: 28, width: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#78716c' }}>
                <CheckCircle2 size={14} strokeWidth={2} color="#10b981" />
              </span>
              <ToolBtn icon={Sparkles} />
              <ToolBtn icon={History} />
              <ToolBtn icon={MoreHorizontal} />
            </div>

            {/* right floating inspector —— 外层 warm-2/95 容器，内层独立白卡 NodeInspector w=320 */}
            <div
              style={{
                position: 'absolute',
                top: 64,
                right: 12,
                bottom: 12,
                borderRadius: 12,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(244,243,238,0.95)',
                boxShadow: '0 20px 25px -5px rgb(0 0 0/10%), 0 8px 10px -6px rgb(0 0 0/10%)',
                backdropFilter: 'blur(4px)',
                zIndex: 6,
                overflow: 'hidden',
              }}
            >
              <NodeInspector />
            </div>

            {/* bottom-left undo/redo */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 8,
                border: '1px solid rgba(231,229,224,0.8)',
                background: 'rgba(255,255,255,0.95)',
                padding: 4,
                boxShadow: '0 1px 3px rgb(0 0 0/12%)',
              }}
            >
              <span style={{ display: 'flex', height: 22, width: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#78716c', fontSize: 14 }}>↶</span>
              <span style={{ display: 'flex', height: 22, width: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#78716c', fontSize: 14 }}>↷</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function RailNav({ icon: Icon, label, active }: { icon: typeof Layers; label: string; active: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        padding: '6px 10px 6px 12px',
        fontSize: 12.5,
        fontWeight: 500,
        background: active ? '#eff6ff' : 'transparent',
        color: active ? '#1d4ed8' : '#57534e',
      }}
    >
      {active && <span style={{ position: 'absolute', top: 6, bottom: 6, left: 0, width: 3, borderRadius: 999, background: '#3b82f6' }} />}
      <Icon size={16} strokeWidth={2} color={active ? '#2563eb' : '#a8a29e'} />
      {label}
    </div>
  );
}

function RailCard({ icon: Icon, title, children }: { icon: typeof Globe; title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(226,232,240,0.8)', background: '#fff', padding: 12, boxShadow: '0 1px 2px rgb(0 0 0/5%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ display: 'flex', height: 20, width: 20, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#f5f5f4', color: '#78716c' }}>
          <Icon size={12} strokeWidth={2} />
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#292524' }}>{title}</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 999, background: '#ecfdf5', padding: '2px 6px', fontSize: 9.5, fontWeight: 500, color: '#059669', boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.2)' }}>
          <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#10b981' }} /> 可用
        </span>
      </div>
      {children}
    </div>
  );
}

function RailAction({ icon: Icon, label }: { icon: typeof Globe; label: string }) {
  return (
    <span style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, border: '1px solid rgba(226,232,240,0.7)', background: '#f8fafc', padding: '6px 0', fontSize: 11, fontWeight: 500, color: '#57534e' }}>
      <Icon size={12} strokeWidth={2} color="#a8a29e" /> {label}
    </span>
  );
}

function ToolBtn({ icon: Icon }: { icon: typeof Sparkles }) {
  return (
    <span style={{ display: 'flex', height: 28, width: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#57534e' }}>
      <Icon size={12} strokeWidth={2} />
    </span>
  );
}

function NodeCard({ node }: { node: NodeT }) {
  const Icon = node.icon;
  return (
    <div
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        minWidth: 180,
        borderRadius: 14,
        border: '1px solid rgba(231,229,224,0.7)',
        background: node.tint,
        padding: '8px 10px',
        boxShadow: node.selected
          ? '0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)'
          : '0 1px 2px rgb(0 0 0/4%), 0 4px 12px rgb(0 0 0/3%)',
        // 选中态：ring-2 ring-offset-2 ring-offset-warm + meta.ring(200 阶浅色)，非深色 outline
        ...(node.selected
          ? { boxShadow: `0 0 0 2px #fafaf7, 0 0 0 4px ${node.ring}, 0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)`, transform: 'translateY(-1px)' }
          : {}),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'flex', height: 26, width: 26, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: node.bg, boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)' }}>
          <Icon size={14} strokeWidth={2} color={node.color} />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, color: node.color }}>{node.type}</div>
        </div>
      </div>

      {/* 配置摘要行 —— mt-1 truncate text-[10px] leading-tight text-stone-400 */}
      {node.summary && (
        <div style={{ marginTop: 4, fontSize: 10, lineHeight: 1.2, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {node.summary}
        </div>
      )}

      {/* if_else 双出口标签 —— 真/假 + emerald/rose handle */}
      {node.ifElse && (
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right', fontSize: 9 }}>
            <span style={{ color: '#059669' }}>真 →</span>
            <span style={{ color: '#f43f5e' }}>假 →</span>
          </div>
        </div>
      )}

      {/* target handle —— border-stone-300 #d6d3d1 */}
      {node.type !== '开始' && (
        <span style={{ position: 'absolute', left: -5, top: '50%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #d6d3d1', boxShadow: '0 1px 2px 0 rgb(0 0 0/5%)' }} />
      )}

      {/* source handle —— if_else 双出口(emerald-400 / rose-400) vs 默认(primary-300 #93c5fd) */}
      {node.ifElse ? (
        <>
          <span style={{ position: 'absolute', right: -5, top: '35%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #34d399', boxShadow: '0 1px 2px 0 rgb(0 0 0/5%)' }} />
          <span style={{ position: 'absolute', right: -5, top: '70%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #fb7185', boxShadow: '0 1px 2px 0 rgb(0 0 0/5%)' }} />
        </>
      ) : (
        node.type !== '结束' && (
          <span style={{ position: 'absolute', right: -5, top: '50%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #93c5fd', boxShadow: '0 1px 2px 0 rgb(0 0 0/5%)' }} />
        )
      )}
    </div>
  );
}

// inspector 内层独立白卡 —— 头部 h-9 w-9 图标块 + 可编辑标题 Input + Play/MoreHorizontal
function NodeInspector() {
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', overflow: 'hidden', borderRadius: 11, background: '#fff' }}>
      {/* header —— sticky, border-b, px-5 pt-4 pb-2.5 */}
      <div style={{ borderBottom: '1px solid rgba(226,232,240,0.8)', background: 'rgba(255,255,255,0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 10px' }}>
          {/* meta.bg/color/ring —— violet 50/700/200 */}
          <span style={{ display: 'flex', height: 36, width: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#f5f3ff', color: '#6d28d9', boxShadow: '0 1px 2px 0 rgb(0 0 0/5%)', border: '1px solid #ddd6fe' }}>
            <Bot size={18} strokeWidth={2} />
          </span>
          {/* 可编辑标题 —— text-[15px] font-semibold text-stone-900 */}
          <span style={{ minWidth: 0, flex: 1, marginLeft: -6, padding: '0 6px', fontSize: 15, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            LLM 对话
          </span>
          <span style={{ marginRight: -4, display: 'flex', flexShrink: 0, alignItems: 'center', gap: 2 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, padding: 6, color: '#a8a29e' }}>
              <Play size={15} strokeWidth={2} />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, padding: 6, color: '#a8a29e' }}>
              <MoreHorizontal size={15} strokeWidth={2} />
            </span>
          </span>
        </div>
        {/* PanelTabs —— 设置 / 上次运行 */}
        <div style={{ display: 'flex', gap: 4, padding: '0 20px 8px' }}>
          <span style={{ borderRadius: 7, background: '#eff6ff', padding: '4px 10px', fontSize: 11.5, fontWeight: 600, color: '#1d4ed8' }}>设置</span>
          <span style={{ borderRadius: 7, padding: '4px 10px', fontSize: 11.5, fontWeight: 500, color: '#78716c' }}>上次运行</span>
        </div>
      </div>

      {/* settings body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '6px 20px 24px' }}>
        <InspectField label="模型" value="qwen-max" mono />
        <InspectField label="系统提示词" value="你是耐心专业的客服助手…" />
        <InspectField label="温度" value="0.7" mono />
        <InspectField label="知识库引用" value="{{kb.context}}" mono />
      </div>
    </div>
  );
}

function InspectField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4, fontSize: 11, fontWeight: 500, color: '#57534e' }}>{label}</div>
      <div
        style={{
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          background: '#fff',
          padding: '6px 10px',
          fontSize: 12,
          color: '#44403c',
          fontFamily: mono ? MONO : undefined,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}
