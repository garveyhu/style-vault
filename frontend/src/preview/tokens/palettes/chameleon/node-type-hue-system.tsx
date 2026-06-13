import { PreviewFrame } from '../../../_layout';
import {
  PlayCircle, Flag, Bot, Image as ImageIcon, Database, Wrench, GitBranch, Users,
  Repeat, Split, UserCheck, Globe, Combine, Variable, Shuffle, ScanText,
  Workflow, ListFilter, FileText, Code2, Braces, CornerDownLeft, CircleDashed,
  type LucideIcon,
} from 'lucide-react';

interface NodeHue {
  type: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;   // bg-{hue}-50
  iconFg: string;   // text-{hue}-700
  cardTint: string; // bg-{hue}-50/40
  edge: string;     // #{hue}-500
}

const NODES: NodeHue[] = [
  { type: 'start', label: '开始', icon: PlayCircle, iconBg: '#ecfdf5', iconFg: '#047857', cardTint: 'rgba(236,253,245,0.4)', edge: '#10b981' },
  { type: 'llm', label: '大模型', icon: Bot, iconBg: '#f5f3ff', iconFg: '#6d28d9', cardTint: 'rgba(245,243,255,0.4)', edge: '#8b5cf6' },
  { type: 'image_gen', label: '生图', icon: ImageIcon, iconBg: '#faf5ff', iconFg: '#7e22ce', cardTint: 'rgba(250,245,255,0.4)', edge: '#a855f7' },
  { type: 'kb', label: '知识库', icon: Database, iconBg: '#ecfdf5', iconFg: '#047857', cardTint: 'rgba(236,253,245,0.4)', edge: '#10b981' },
  { type: 'tool', label: '工具', icon: Wrench, iconBg: '#fff7ed', iconFg: '#c2410c', cardTint: 'rgba(255,247,237,0.4)', edge: '#f97316' },
  { type: 'if_else', label: '条件分支', icon: GitBranch, iconBg: '#fffbeb', iconFg: '#b45309', cardTint: 'rgba(255,251,235,0.4)', edge: '#f59e0b' },
  { type: 'agent_debate', label: '多智能体辩论', icon: Users, iconBg: '#fdf4ff', iconFg: '#a21caf', cardTint: 'rgba(253,244,255,0.4)', edge: '#d946ef' },
  { type: 'iteration', label: '迭代', icon: Repeat, iconBg: '#f0f9ff', iconFg: '#0369a1', cardTint: 'rgba(240,249,255,0.4)', edge: '#0ea5e9' },
  { type: 'parallel', label: '并行', icon: Split, iconBg: '#eef2ff', iconFg: '#4338ca', cardTint: 'rgba(238,242,255,0.4)', edge: '#6366f1' },
  { type: 'human_input', label: '人工输入', icon: UserCheck, iconBg: '#fdf2f8', iconFg: '#be185d', cardTint: 'rgba(253,242,248,0.4)', edge: '#ec4899' },
  { type: 'http', label: 'HTTP请求', icon: Globe, iconBg: '#ecfeff', iconFg: '#0e7490', cardTint: 'rgba(236,254,255,0.4)', edge: '#06b6d4' },
  { type: 'aggregator', label: '变量聚合', icon: Combine, iconBg: '#fffbeb', iconFg: '#92400e', cardTint: 'rgba(255,251,235,0.4)', edge: '#f59e0b' },
  { type: 'assign', label: '变量赋值', icon: Variable, iconBg: '#fff1f2', iconFg: '#be123c', cardTint: 'rgba(255,241,242,0.4)', edge: '#f43f5e' },
  { type: 'classifier', label: '意图分类', icon: Shuffle, iconBg: '#f7fee7', iconFg: '#4d7c0f', cardTint: 'rgba(247,254,231,0.4)', edge: '#84cc16' },
  { type: 'param_extract', label: '参数提取', icon: ScanText, iconBg: '#eff6ff', iconFg: '#1d4ed8', cardTint: 'rgba(239,246,255,0.4)', edge: '#3b82f6' },
  { type: 'subflow', label: '子工作流', icon: Workflow, iconBg: '#eef2ff', iconFg: '#4338ca', cardTint: 'rgba(238,242,255,0.4)', edge: '#6366f1' },
  { type: 'list_op', label: '列表操作', icon: ListFilter, iconBg: '#ecfeff', iconFg: '#155e75', cardTint: 'rgba(236,254,255,0.4)', edge: '#06b6d4' },
  { type: 'doc_extract', label: '文档提取', icon: FileText, iconBg: '#fff7ed', iconFg: '#c2410c', cardTint: 'rgba(255,247,237,0.4)', edge: '#f97316' },
  { type: 'code', label: '代码', icon: Code2, iconBg: '#f8fafc', iconFg: '#334155', cardTint: 'rgba(248,250,252,0.5)', edge: '#64748b' },
  { type: 'template', label: '模板', icon: Braces, iconBg: '#f0fdfa', iconFg: '#0f766e', cardTint: 'rgba(240,253,250,0.4)', edge: '#14b8a6' },
  { type: 'answer', label: '回答', icon: CornerDownLeft, iconBg: '#f0fdf4', iconFg: '#15803d', cardTint: 'rgba(240,253,244,0.4)', edge: '#22c55e' },
  { type: 'noop', label: '空操作', icon: CircleDashed, iconBg: '#ffffff', iconFg: '#78716c', cardTint: 'rgba(250,250,249,0.5)', edge: '#78716c' },
  { type: 'end', label: '结束', icon: Flag, iconBg: '#fafaf9', iconFg: '#44403c', cardTint: 'rgba(250,250,249,0.5)', edge: '#78716c' },
];

const VAR_TYPES = [
  { name: 'string', bg: '#f0f9ff', fg: '#0284c7' },   // sky-50 / sky-600
  { name: 'number', bg: '#fffbeb', fg: '#d97706' },   // amber-50 / amber-600
  { name: 'boolean', bg: '#fff1f2', fg: '#e11d48' },  // rose-50 / rose-600
  { name: 'object', bg: '#f5f3ff', fg: '#7c3aed' },   // violet-50 / violet-600
  { name: 'array', bg: '#ecfdf5', fg: '#059669' },    // emerald-50 / emerald-600
  { name: 'any', bg: '#f5f5f4', fg: '#a8a29e' },      // stone-100 / stone-400
];

export default function NodeTypeHueSystem() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          TOKEN · PALETTE · SIGNATURE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
          Node Type Hue System
        </h1>
        <p style={{ color: '#57534e', fontSize: 13, marginBottom: 28 }}>
          23 节点类型各占一 hue · 5 槽咬合（700 前景 / 200 ring / 50 图标底 / 50/40 整卡色温 / 500 连线 hex）
        </p>

        {/* 节点卡矩阵 —— 整卡 cardTint 染色 + 图标块 */}
        <Section title="节点卡 · cardTint 整卡染色 + 图标块 + 连线 hex">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, width: '100%',
          }}>
            {NODES.map(n => {
              const Icon = n.icon;
              return (
                <div key={n.type} style={{
                  background: n.cardTint,
                  border: '1px solid #e7e5e0',
                  borderRadius: 12,
                  padding: 12,
                  boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: n.iconBg,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} strokeWidth={2} color={n.iconFg} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1917' }}>{n.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                      <span style={{ width: 14, height: 2, borderRadius: 2, background: n.edge }} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#78716c' }}>{n.edge}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 选中态 ring 演示 */}
        <Section title="选中态 ring-{hue}-200">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[NODES[1], NODES[6], NODES[10], NODES[18]].map(n => {
              const Icon = n.icon;
              return (
                <div key={n.type} style={{
                  background: n.cardTint, borderRadius: 12, padding: 12,
                  boxShadow: `0 0 0 2px ${n.edge}55`,
                  display: 'flex', alignItems: 'center', gap: 10, minWidth: 150,
                }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: n.iconBg, display: 'grid', placeItems: 'center' }}>
                    <Icon size={16} strokeWidth={2} color={n.iconFg} />
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{n.label}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 变量类型 chip */}
        <Section title="变量类型 chip · 6 色（独立于节点 hue）">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {VAR_TYPES.map(v => (
              <span key={v.name} style={{
                background: v.bg, color: v.fg, borderRadius: 4, padding: '1px 4px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 9, lineHeight: 1, letterSpacing: '0.025em',
              }}>
                {v.name}
              </span>
            ))}
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}
