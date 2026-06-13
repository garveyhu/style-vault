import { PreviewFrame } from '../../../_layout';
import { FileText, Inbox } from 'lucide-react';

/**
 * flair-glow-empty-state · Chameleon EmptyState
 * 三形态：flair（辉光呼吸 + 漂浮 + 主色）/ 默认朴素 / compact 紧凑（表格内）
 * 源码：frontend/src/core/components/common/empty-state.tsx
 */

const PRIMARY_300 = '#93c5fd';
const PRIMARY_500 = '#3b82f6';

export default function FlairGlowEmptyState() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`
        @keyframes cm-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        @keyframes cm-halo { 0%,100% { transform: scale(1); opacity: .6 } 50% { transform: scale(1.12); opacity: 1 } }
        .cm-anim-float { animation: cm-float 3.4s ease-in-out infinite }
        .cm-anim-halo  { animation: cm-halo 3s ease-in-out infinite }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: 24,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* ── flair（辉光呼吸 + 漂浮 + 主色）大空态 ── */}
        <Card label="flair · 长留页惊喜感空态">
          <EmptyState
            variant="flair"
            icon={<FileText />}
            title="知识库还没有文档"
            description="上传 PDF / Markdown / 网页，系统会自动切分并向量化以供检索。"
            action={<PrimaryBtn>上传文档</PrimaryBtn>}
          />
        </Card>

        {/* ── 默认朴素大空态 ── */}
        <Card label="默认 · 朴素空态">
          <EmptyState
            variant="plain"
            icon={<Inbox />}
            title="暂无运行记录"
            description="发起一次 Test Run 或持久化执行后，这里会列出每次运行。"
          />
        </Card>

        {/* ── compact（表格内） ── */}
        <Card label="compact · 表格内紧凑空态" span={2}>
          <div
            style={{
              border: '1px solid rgba(231,229,224,0.6)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'rgba(244,243,238,0.4)',
                padding: '8px 12px',
                fontSize: 10.5,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#78716c',
                fontWeight: 500,
              }}
            >
              名称 · 状态 · 更新时间
            </div>
            <div style={{ borderTop: '1px solid #f5f4ee' }}>
              <EmptyState
                variant="compact"
                icon={<Inbox />}
                title="没有匹配的记录"
                description="试着调整筛选条件或清空搜索。"
              />
            </div>
          </div>
        </Card>
      </div>
    </PreviewFrame>
  );
}

/* ── EmptyState 本体（1:1 还原源码三形态） ── */
function EmptyState({
  variant,
  icon,
  title,
  description,
  action,
}: {
  variant: 'flair' | 'plain' | 'compact';
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const compact = variant === 'compact';
  const flair = variant === 'flair';
  const iconSize = compact ? 28 : 48; // [&>svg]:h-7/h-12

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: compact ? 6 : 12, // gap-1.5 / gap-3
        paddingTop: compact ? 8 : 40, // py-2 / py-10
        paddingBottom: compact ? 8 : 40,
      }}
    >
      {flair ? (
        <div
          style={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <span
            aria-hidden
            className="cm-anim-halo"
            style={{
              position: 'absolute',
              height: 80,
              width: 80,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${hexA(PRIMARY_300, 0.28)}, transparent 65%)`,
            }}
          />
          <div className="cm-anim-float" style={{ position: 'relative', color: PRIMARY_500 }}>
            <span style={{ display: 'inline-flex' }}>
              <Sized size={48}>{icon}</Sized>
            </span>
          </div>
        </div>
      ) : (
        <div style={{ color: '#d6d3d1' }}>
          <Sized size={iconSize}>{icon}</Sized>
        </div>
      )}

      <div
        style={{
          fontWeight: 500,
          color: '#57534e',
          fontSize: compact ? 12.5 : 14,
        }}
      >
        {title}
      </div>

      {description && (
        <div
          style={{
            maxWidth: 384, // max-w-sm
            lineHeight: 1.625, // leading-relaxed
            color: '#a8a29e',
            fontSize: compact ? 11.5 : 12.5,
          }}
        >
          {description}
        </div>
      )}

      {action && <div style={{ marginTop: compact ? 4 : 8 }}>{action}</div>}
    </div>
  );
}

/* 强制 lucide icon 渲染到指定 px（模拟 [&>svg]:h-/w-） */
function Sized({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <span
      style={{ display: 'inline-flex' }}
      ref={el => {
        const svg = el?.querySelector('svg');
        if (svg) {
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
        }
      }}
    >
      {children}
    </span>
  );
}

function Card({ label, span, children }: { label: string; span?: number; children: React.ReactNode }) {
  return (
    <section
      style={{
        gridColumn: span === 2 ? '1 / -1' : undefined,
        background: '#fffefb',
        border: '1px solid rgba(231,229,224,0.4)',
        borderRadius: 12,
        boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
        padding: 20,
      }}
    >
      <div style={{ fontSize: 10.5, color: '#a8a29e', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
        {label}
      </div>
      {children}
    </section>
  );
}

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        height: 32,
        padding: '0 14px',
        background: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
