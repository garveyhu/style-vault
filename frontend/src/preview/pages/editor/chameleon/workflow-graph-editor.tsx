import { PreviewFrame } from '../../../_layout';
import {
  Activity,
  Bot,
  ChevronLeft,
  Database,
  Flag,
  GitBranch,
  History,
  Layers,
  MessageSquare,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Rocket,
  Save,
  Sparkles,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

type NodeT = {
  x: number;
  y: number;
  label: string;
  type: string;
  icon: typeof Bot;
  color: string;
  tint: string;
  bg: string;
  selected?: boolean;
};

// type hue system (TYPE_META subset)
const NODES: NodeT[] = [
  { x: 16, y: 92, label: 'Start', type: '开始', icon: PlayCircle, color: '#047857', tint: 'rgba(236,253,245,0.55)', bg: '#ecfdf5' },
  { x: 168, y: 36, label: '知识检索', type: '知识库', icon: Database, color: '#047857', tint: 'rgba(236,253,245,0.55)', bg: '#ecfdf5' },
  { x: 168, y: 150, label: '条件分支', type: '条件分支', icon: GitBranch, color: '#b45309', tint: 'rgba(255,251,235,0.6)', bg: '#fffbeb' },
  { x: 332, y: 92, label: 'LLM 对话', type: '大模型', icon: Bot, color: '#6d28d9', tint: 'rgba(245,243,255,0.55)', bg: '#f5f3ff', selected: true },
  { x: 488, y: 92, label: 'End', type: '结束', icon: Flag, color: '#44403c', tint: 'rgba(250,250,249,0.6)', bg: '#fafaf9' },
];

export default function WorkflowGraphEditor() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', height: 560, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* LEFT app rail */}
        <aside style={{ display: 'flex', width: 216, flexShrink: 0, flexDirection: 'column', borderRight: '1px solid rgba(226,232,240,0.8)', background: '#fff' }}>
          <div style={{ borderBottom: '1px solid rgba(226,232,240,0.8)', padding: 14 }}>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 500, color: '#78716c' }}>
              <ChevronLeft size={14} strokeWidth={2} /> 返回应用
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ display: 'flex', height: 36, width: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#f5f3ff', color: '#7c3aed', boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.18)' }}>
                <MessageSquare size={18} strokeWidth={2} />
              </span>
              <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>智能客服流程</div>
                <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>cs-flow</div>
              </div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ height: 24, borderRadius: 6, border: '1px solid #d6d3d1', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 11.5, color: '#44403c' }}>对话型</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#ecfdf5', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#047857', boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.25)' }}>
                <Rocket size={10} strokeWidth={2} /> v2
              </span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 500, color: '#d97706' }}>
                <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#fbbf24' }} /> 未保存
              </span>
            </div>
          </div>

          {/* secondary nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 8 }}>
            <RailNav icon={Layers} label="编排" active />
            <RailNav icon={Activity} label="监测" active={false} />
          </nav>

          {/* app cards */}
          <div style={{ flex: 1, overflow: 'auto', borderTop: '1px solid rgba(226,232,240,0.8)', background: 'rgba(248,250,252,0.4)', padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Web App', '后端服务 API'].map(t => (
              <div key={t} style={{ borderRadius: 12, border: '1px solid rgba(226,232,240,0.8)', background: '#fff', padding: 12, boxShadow: '0 1px 2px rgb(0 0 0/4%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#292524' }}>{t}</span>
                  <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 999, background: '#ecfdf5', padding: '2px 6px', fontSize: 9.5, fontWeight: 500, color: '#059669' }}>
                    <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#10b981' }} /> 可用
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ flex: 1, borderRadius: 8, border: '1px solid rgba(226,232,240,0.7)', background: '#f8fafc', padding: '6px 0', textAlign: 'center', fontSize: 11, fontWeight: 500, color: '#57534e' }}>打开</span>
                  <span style={{ flex: 1, borderRadius: 8, border: '1px solid rgba(226,232,240,0.7)', background: '#f8fafc', padding: '6px 0', textAlign: 'center', fontSize: 11, fontWeight: 500, color: '#57534e' }}>密钥</span>
                </div>
              </div>
            ))}
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
            {/* edges */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {/* start -> kb */}
              <path d="M 86,114 C 130,114 130,62 168,62" fill="none" stroke="#d6d3d1" strokeWidth={1.5} />
              {/* start -> if_else */}
              <path d="M 86,114 C 130,114 130,176 168,176" fill="none" stroke="#d6d3d1" strokeWidth={1.5} />
              {/* kb -> llm (highlighted: focus is llm, green hue) */}
              <path d="M 296,62 C 320,62 308,114 332,114" fill="none" stroke="#8b5cf6" strokeWidth={2.25} strokeDasharray="6 4" />
              {/* if_else -> llm (highlighted) */}
              <path d="M 296,176 C 320,176 308,114 332,114" fill="none" stroke="#8b5cf6" strokeWidth={2.25} strokeDasharray="6 4" />
              {/* llm -> end */}
              <path d="M 460,114 C 478,114 478,114 488,114" fill="none" stroke="#d6d3d1" strokeWidth={1.5} />
            </svg>

            {/* nodes */}
            {NODES.map(n => (
              <NodeCard key={n.label} node={n} />
            ))}

            {/* left-top palette collapsed + */}
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

            {/* right-top floating toolbar */}
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
                boxShadow: '0 1px 3px rgb(0 0 0/12%)',
                backdropFilter: 'blur(4px)',
                zIndex: 5,
              }}
            >
              <ToolBtn icon={Sparkles} />
              <ToolBtn icon={History} />
              <ToolBtn icon={MoreHorizontal} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', padding: '4px 8px', fontSize: 12, color: '#44403c' }}>
                <MessageSquare size={12} strokeWidth={2} /> 对话调试
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', padding: '4px 8px', fontSize: 12, color: '#44403c' }}>
                <Save size={12} strokeWidth={2} /> 保存
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#2563eb', padding: '4px 8px', fontSize: 12, color: '#fff' }}>
                <Rocket size={12} strokeWidth={2} /> 发布
              </span>
            </div>

            {/* right floating inspector */}
            <div
              style={{
                position: 'absolute',
                top: 56,
                right: 12,
                bottom: 12,
                width: 248,
                borderRadius: 12,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(244,243,238,0.95)',
                boxShadow: '0 8px 24px rgb(0 0 0/8%), 0 2px 8px rgb(0 0 0/4%)',
                backdropFilter: 'blur(4px)',
                zIndex: 6,
                padding: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ display: 'flex', height: 26, width: 26, alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: '#f5f3ff', boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)' }}>
                  <Bot size={14} strokeWidth={2} color="#6d28d9" />
                </span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#292524' }}>LLM 对话</div>
                  <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6d28d9' }}>大模型</div>
                </div>
              </div>
              <Inspect label="模型" value="qwen-max" />
              <Inspect label="系统提示词" value="你是耐心专业的客服助手…" />
              <Inspect label="温度" value="0.7" mono />
              <Inspect label="知识库引用" value="{{kb.context}}" mono />
            </div>

            {/* bottom-right zoom + minimap hint */}
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

function ToolBtn({ icon: Icon }: { icon: typeof Sparkles }) {
  return (
    <span style={{ display: 'flex', height: 24, width: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#57534e' }}>
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
        minWidth: 110,
        borderRadius: 14,
        border: node.selected ? '1px solid rgba(231,229,224,0.7)' : '1px solid rgba(231,229,224,0.7)',
        background: node.tint,
        padding: '8px 10px',
        boxShadow: node.selected
          ? '0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)'
          : '0 1px 2px rgb(0 0 0/4%), 0 4px 12px rgb(0 0 0/3%)',
        outline: node.selected ? `2px solid ${node.color}` : 'none',
        outlineOffset: node.selected ? 2 : 0,
        transform: node.selected ? 'translateY(-1px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'flex', height: 26, width: 26, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: node.bg, boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)' }}>
          <Icon size={14} strokeWidth={2} color={node.color} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>{node.label}</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: node.color }}>{node.type}</div>
        </div>
      </div>
      {/* handles */}
      {node.type !== '开始' && (
        <span style={{ position: 'absolute', left: -5, top: '50%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #d6d3d1' }} />
      )}
      {node.type !== '结束' && (
        <span style={{ position: 'absolute', right: -5, top: '50%', marginTop: -5, height: 10, width: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #a8c0ee' }} />
      )}
    </div>
  );
}

function Inspect({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ marginBottom: 3, fontSize: 10.5, color: '#78716c' }}>{label}</div>
      <div
        style={{
          borderRadius: 6,
          border: '1px solid #e7e5e0',
          background: '#fff',
          padding: '5px 8px',
          fontSize: 11.5,
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
