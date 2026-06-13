import { PreviewFrame } from '../../../_layout';
import { Bot, Database, GitBranch, Plus, Sparkles } from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 10.5,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#a8a29e',
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

export default function CanvasEdgeDashFlow() {
  return (
    <PreviewFrame bg="#f8fafc" padded={false}>
      <div style={{ padding: '22px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* edge variants on dot grid */}
        <Section title="连线三态 · 冷白点阵底">
          <div
            style={{
              position: 'relative',
              borderRadius: 12,
              border: '1px solid #e7e5e0',
              backgroundColor: '#f8fafc',
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              padding: 18,
            }}
          >
            <svg viewBox="0 0 540 168" style={{ width: '100%', height: 168, overflow: 'visible' }}>
              {/* normal edge */}
              <path
                d="M 70,32 C 150,32 170,32 250,32"
                fill="none"
                stroke="#d6d3d1"
                strokeWidth={1.5}
              />
              <polygon points="250,28 258,32 250,36" fill="#d6d3d1" />
              <text x="300" y="36" fontSize={11} fill="#78716c" fontFamily={MONO}>
                normal · stroke #d6d3d1 · w 1.5
              </text>

              {/* highlighted flowing dash (violet, follows focus node hue) */}
              <path
                d="M 70,84 C 150,84 170,84 250,84"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth={2.25}
                strokeDasharray="6 4"
              />
              <polygon points="250,79 259,84 250,89" fill="#8b5cf6" />
              <text x="300" y="88" fontSize={11} fill="#7c3aed" fontFamily={MONO}>
                highlighted · 6 4 · w 2.25
              </text>

              {/* fail static dash (rose) */}
              <path
                d="M 70,136 C 150,136 170,136 250,136"
                fill="none"
                stroke="#fb7185"
                strokeWidth={1.5}
                strokeDasharray="5 3"
              />
              <polygon points="250,132 258,136 250,140" fill="#fb7185" />
              <g>
                <rect x={150} y={120} width={36} height={15} rx={7.5} fill="#fff1f2" stroke="#fecdd3" />
                <text x={168} y={130.5} fontSize={9} fill="#fb7185" fontFamily={MONO} textAnchor="middle">
                  失败
                </text>
              </g>
              <text x="300" y="140" fontSize={11} fill="#e11d48" fontFamily={MONO}>
                fail · 5 3 静态虚线 · #fb7185
              </text>

              {/* handles */}
              <circle cx={64} cy={32} r={5} fill="#fff" stroke="#a8c0ee" strokeWidth={1.5} />
              <circle cx={64} cy={84} r={5} fill="#fff" stroke="#a8c0ee" strokeWidth={1.5} />
              <circle cx={64} cy={136} r={5} fill="#fff" stroke="#fb7185" strokeWidth={1.5} />
            </svg>
          </div>
        </Section>

        {/* node hover micro-lift + handle scale */}
        <Section title="节点 hover 微浮起 1px · handle 放大 10→14px">
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            {/* rest node */}
            <NodeCard label="LLM 对话" type="大模型" icon={Bot} tint="#f5f3ff" color="#7c3aed" lifted={false} />
            {/* hovered node */}
            <NodeCard label="知识检索" type="知识库" icon={Database} tint="#ecfdf5" color="#047857" lifted />
            <div style={{ flex: 1 }} />
            {/* handle scale */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#fff', border: '1.5px solid #d6d3d1', boxShadow: '0 1px 2px rgb(0 0 0/8%)' }} />
                <span style={{ fontSize: 11, color: '#78716c', fontFamily: MONO }}>默认 10px</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#fff', border: '1.5px solid #60a5fa', boxShadow: '0 1px 2px rgb(0 0 0/8%)' }} />
                <span style={{ fontSize: 11, color: '#2563eb', fontFamily: MONO }}>hover 14px</span>
              </div>
            </div>
          </div>
        </Section>

        {/* panel directional slide-in */}
        <Section title="面板方向滑入 · palette 从左 / copilot 从右">
          <div style={{ position: 'relative', height: 132, borderRadius: 12, border: '1px solid #e7e5e0', background: '#f8fafc', overflow: 'hidden' }}>
            {/* palette (left) */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                width: 168,
                borderRadius: 16,
                border: '1px solid #e7e5e0',
                background: '#fff',
                boxShadow: '0 8px 24px rgb(0 0 0/8%), 0 2px 8px rgb(0 0 0/4%)',
                padding: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#2563eb', borderRadius: 8, padding: '3px 7px', fontSize: 11.5, fontWeight: 500 }}>
                  <Plus size={14} strokeWidth={2} /> 节点
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#a8a29e', fontFamily: MONO, marginBottom: 2 }}>← from-left-2 · 200ms</div>
              <div style={{ height: 8 }} />
              <div style={{ height: 9, background: '#f4f3ee', borderRadius: 4, marginBottom: 5 }} />
              <div style={{ height: 9, width: '74%', background: '#f4f3ee', borderRadius: 4 }} />
            </div>

            {/* copilot (right, top z) */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                bottom: 12,
                width: 176,
                borderRadius: 16,
                border: '1px solid #e7e5e0',
                background: '#fff',
                boxShadow: '0 8px 24px rgb(0 0 0/8%), 0 2px 8px rgb(0 0 0/4%)',
                padding: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7, color: '#7c3aed', fontSize: 12, fontWeight: 600 }}>
                <Sparkles size={14} strokeWidth={2} /> AI 编排助手
              </div>
              <div style={{ fontSize: 10, color: '#a8a29e', fontFamily: MONO }}>from-right-2 · 200ms →</div>
              <div style={{ height: 10 }} />
              <div style={{ height: 9, background: '#f4f3ee', borderRadius: 4, marginBottom: 5 }} />
              <div style={{ height: 9, width: '88%', background: '#f4f3ee', borderRadius: 4 }} />
            </div>

            {/* yielded inspector behind copilot (offset corner) */}
            <div
              style={{
                position: 'absolute',
                top: 22,
                right: 26,
                bottom: 2,
                width: 176,
                borderRadius: 16,
                border: '1px solid #e7e5e0',
                background: 'rgba(244,243,238,0.95)',
                boxShadow: '0 8px 24px rgb(0 0 0/6%)',
                zIndex: -1,
              }}
            />
          </div>
        </Section>

        {/* ghost follow */}
        <Section title="放置态 · cursor-copy + 虚线幽灵跟随">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 6,
              border: '2px dashed #c4b5fd',
              background: 'rgba(255,255,255,0.95)',
              padding: '6px 10px',
              fontSize: 11.5,
              fontWeight: 500,
              color: '#7c3aed',
              boxShadow: '0 8px 24px rgb(0 0 0/8%)',
            }}
          >
            <GitBranch size={14} strokeWidth={2} />
            条件分支
            <span style={{ fontSize: 10, fontWeight: 400, color: '#a8a29e' }}>点击画布放置 · Esc 取消</span>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function NodeCard({
  label,
  type,
  icon: Icon,
  tint,
  color,
  lifted,
}: {
  label: string;
  type: string;
  icon: typeof Bot;
  tint: string;
  color: string;
  lifted: boolean;
}) {
  return (
    <div
      style={{
        position: 'relative',
        minWidth: 180,
        borderRadius: 14,
        border: '1px solid rgba(231,229,224,0.7)',
        background: tint,
        padding: '8px 10px',
        transform: lifted ? 'translateY(-1px)' : 'none',
        boxShadow: lifted
          ? '0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)'
          : '0 1px 2px rgb(0 0 0/4%), 0 4px 12px rgb(0 0 0/3%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            display: 'flex',
            height: 26,
            width: 26,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9,
            background: '#fff',
            boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
          }}
        >
          <Icon size={14} strokeWidth={2} color={color} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>{label}</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color }}>{type}</div>
        </div>
      </div>
      {lifted && (
        <span style={{ position: 'absolute', top: -14, left: 10, fontSize: 10, color: '#2563eb', fontFamily: MONO }}>
          ↑ hover -1px
        </span>
      )}
    </div>
  );
}
