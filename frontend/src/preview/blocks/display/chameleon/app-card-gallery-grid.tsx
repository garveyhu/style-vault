import { PreviewFrame } from '../../../_layout';
import {
  Code2,
  MessageSquare,
  Workflow,
  Globe,
  MoreVertical,
  Plus,
  Library,
} from 'lucide-react';

/**
 * app-card-gallery-grid · Chameleon Dify 风应用卡片网格
 * 源码：system/agents/components/app-card.tsx
 *        + agents-page.tsx:259-290 + kbs-page.tsx:83-130
 */

const sans = 'Inter, system-ui, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, monospace';

type Kind = 'code' | 'chatflow' | 'workflow' | 'external';
const KIND: Record<
  Kind,
  { label: string; Icon: typeof Code2; tileBg: string; tileFg: string; badgeBg: string; badgeFg: string }
> = {
  code: { label: '代码型', Icon: Code2, tileBg: '#eef2ff', tileFg: '#4f46e5', badgeBg: '#eef2ff', badgeFg: '#4338ca' },
  chatflow: { label: '对话型', Icon: MessageSquare, tileBg: '#f0f9ff', tileFg: '#0284c7', badgeBg: '#f0f9ff', badgeFg: '#0369a1' },
  workflow: { label: '流程型', Icon: Workflow, tileBg: '#f5f3ff', tileFg: '#7c3aed', badgeBg: '#f5f3ff', badgeFg: '#6d28d9' },
  external: { label: '外部', Icon: Globe, tileBg: '#fffbeb', tileFg: '#d97706', badgeBg: '#fffbeb', badgeFg: '#b45309' },
};

const CARDS: {
  kind: Kind;
  name: string;
  key: string;
  desc: string;
  status?: { label: string; bg: string; fg: string };
  embedded?: boolean;
}[] = [
  {
    kind: 'code',
    name: '智能客服 Agent',
    key: 'app-svc-bot',
    desc: '基于工单知识库的多轮客服，含工具调用与人工审批转接。',
    status: { label: '已发布 v3', bg: '#ecfdf5', fg: '#047857' },
  },
  {
    kind: 'chatflow',
    name: '商品文案助手',
    key: 'app-copywriter',
    desc: '上传商品图，自动生成多平台营销文案。',
    status: { label: '草稿', bg: '#f5f5f4', fg: '#78716c' },
    embedded: true,
  },
  {
    kind: 'workflow',
    name: '财报抽取流程',
    key: 'flow-finance',
    desc: 'PDF 文档抽取 → 分类 → 结构化入库的编排流程。',
    status: { label: '已发布 v1', bg: '#ecfdf5', fg: '#047857' },
  },
  { kind: 'external', name: '外部检索 API', key: 'ext-search', desc: '接入第三方搜索服务，作为应用工具被调用。' },
];

// 知识库卡（h-132），与应用卡同款结构、不同高度/文案
const KB_CARDS: { name: string; key: string; desc: string; tag: { label: string; bg: string; fg: string } }[] = [
  {
    name: '产品手册库',
    key: 'kb-product-doc',
    desc: 'PDF / Markdown 混合语料，语义切分 + 向量化检索。',
    tag: { label: '就绪', bg: '#ecfdf5', fg: '#047857' },
  },
  {
    name: '客服工单库',
    key: 'kb-tickets',
    desc: '历史工单导入，按主题聚类后供客服 Agent 召回。',
    tag: { label: '索引中', bg: '#fffbeb', fg: '#b45309' },
  },
  {
    name: '法规条款库',
    key: 'kb-compliance',
    desc: '合规条款逐条切分，命中即引用原文段落。',
    tag: { label: '就绪', bg: '#ecfdf5', fg: '#047857' },
  },
];

export default function AppCardGalleryGrid() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: sans }}>
        {/* ============ 应用卡网格（h-148） ============ */}
        <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, color: '#a8a29e', textTransform: 'uppercase' }}>
          应用网格 · h-148
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {/* 虚线新建卡 */}
          <button
            style={{
              height: 148,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 12,
              border: '1px dashed #d6d3d1',
              background: 'rgba(255,255,255,0.6)',
              color: '#78716c',
              cursor: 'pointer',
              fontFamily: sans,
            }}
          >
            <div style={{ display: 'flex', height: 36, width: 36, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f5f5f4' }}>
              <Plus size={20} color="#78716c" strokeWidth={1.75} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>新建应用</span>
            <span style={{ fontSize: 11, color: '#a8a29e' }}>对话 / 流程编排，或接入代码应用</span>
          </button>

          {/* 应用卡（首张带 hover 高光线 + 旋转图标 演示态） */}
          {CARDS.map((c, i) => (
            <AppCard key={c.key} card={c} hovered={i === 0} />
          ))}

          {/* 骨架占位 */}
          <div style={{ height: 148, borderRadius: 12, opacity: 0.6, background: 'linear-gradient(100deg,#f4f3ee 30%,#faf9f5 50%,#f4f3ee 70%)' }} />

          {/* 补满 8 列 2 行栅格 */}
          <div style={{ height: 148, borderRadius: 12, opacity: 0.6, background: 'linear-gradient(100deg,#f4f3ee 30%,#faf9f5 50%,#f4f3ee 70%)' }} />
        </div>

        {/* ============ 知识库卡网格（h-132，同款结构、不同高度/文案） ============ */}
        <div style={{ margin: '22px 0 6px', fontSize: 11, fontWeight: 600, letterSpacing: 0.4, color: '#a8a29e', textTransform: 'uppercase' }}>
          知识库网格 · h-132
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {/* KB 虚线新建卡（132 高 + KB 文案） */}
          <button
            style={{
              height: 132,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 12,
              border: '1px dashed #d6d3d1',
              background: 'rgba(255,255,255,0.6)',
              color: '#78716c',
              cursor: 'pointer',
              fontFamily: sans,
            }}
          >
            <div style={{ display: 'flex', height: 36, width: 36, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f5f5f4' }}>
              <Plus size={20} color="#78716c" strokeWidth={1.75} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>创建知识库</span>
            <span style={{ fontSize: 11, color: '#a8a29e' }}>导入文档，自动分段 + 向量化</span>
          </button>

          {KB_CARDS.map((k, i) => (
            <KbCard key={k.key} card={k} hovered={i === 0} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function AppCard({ card, hovered }: { card: (typeof CARDS)[number]; hovered?: boolean }) {
  const m = KIND[card.kind];
  const Icon = m.Icon;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: 148,
        flexDirection: 'column',
        borderRadius: 12,
        border: `1px solid ${hovered ? '#bfdbfe' : 'rgba(231,229,224,0.8)'}`,
        background: '#fff',
        padding: 16,
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: hovered ? '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)' : '0 1px 2px 0 rgb(0 0 0 / 5%)',
      }}
    >
      {/* hover 顶部渐变高光线 */}
      <span
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 16,
          right: 16,
          top: 0,
          height: 2,
          borderRadius: 9999,
          background: 'linear-gradient(to right, transparent, #3b82f6, transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* 三点菜单（hover 浮现） */}
      <div style={{ position: 'absolute', right: 8, top: 8, opacity: hovered ? 1 : 0 }}>
        <button
          style={{
            display: 'flex',
            height: 28,
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            color: '#a8a29e',
            background: hovered ? '#f5f5f4' : 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <MoreVertical size={16} color={hovered ? '#44403c' : '#a8a29e'} strokeWidth={2} />
        </button>
      </div>

      {/* 图标块 + 名称 + key */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            height: 36,
            width: 36,
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            background: m.tileBg,
            color: m.tileFg,
            transform: hovered ? 'rotate(-6deg) scale(1.05)' : 'none',
          }}
        >
          <Icon size={20} color={m.tileFg} strokeWidth={1.75} />
        </div>
        <div style={{ minWidth: 0, flex: 1, paddingRight: 28 }}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13.5, fontWeight: 500, color: '#1c1917' }}>{card.name}</div>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: mono, fontSize: 10.5, color: '#a8a29e' }}>{card.key}</div>
        </div>
      </div>

      {/* 描述 */}
      <p style={{ margin: '8px 0 0', flex: 1, fontSize: 11.5, lineHeight: 1.625, color: '#78716c', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {card.desc}
      </p>

      {/* 底部徽标 + 更新时间 */}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', minWidth: 0, flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-flex', flexShrink: 0, borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: m.badgeBg, color: m.badgeFg }}>{m.label}</span>
          {card.status && (
            <span style={{ display: 'inline-flex', flexShrink: 0, borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: card.status.bg, color: card.status.fg }}>{card.status.label}</span>
          )}
          {card.embedded && (
            <span style={{ display: 'inline-flex', flexShrink: 0, borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: '#eff6ff', color: '#1d4ed8' }}>已嵌入</span>
          )}
        </div>
        <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 11, color: '#a8a29e', whiteSpace: 'nowrap' }}>更新于 2 天前</span>
      </div>
    </div>
  );
}

function KbCard({ card, hovered }: { card: (typeof KB_CARDS)[number]; hovered?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: 132,
        flexDirection: 'column',
        borderRadius: 12,
        border: `1px solid ${hovered ? '#d6d3d1' : 'rgba(231,229,224,0.8)'}`,
        background: '#fff',
        padding: 16,
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: hovered ? '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)' : '0 1px 2px 0 rgb(0 0 0 / 5%)',
      }}
    >
      {/* 三点菜单（hover 浮现） */}
      <div style={{ position: 'absolute', right: 8, top: 8, opacity: hovered ? 1 : 0 }}>
        <button
          style={{
            display: 'flex',
            height: 28,
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            color: '#a8a29e',
            background: hovered ? '#f5f5f4' : 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <MoreVertical size={16} color={hovered ? '#44403c' : '#a8a29e'} strokeWidth={2} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            height: 36,
            width: 36,
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            background: '#eef2ff',
            color: '#4f46e5',
          }}
        >
          <Library size={20} color="#4f46e5" strokeWidth={1.75} />
        </div>
        <div style={{ minWidth: 0, flex: 1, paddingRight: 28 }}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13.5, fontWeight: 500, color: '#1c1917' }}>{card.name}</div>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: mono, fontSize: 10.5, color: '#a8a29e' }}>{card.key}</div>
        </div>
      </div>

      <p style={{ margin: '8px 0 0', flex: 1, fontSize: 11.5, lineHeight: 1.625, color: '#78716c', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {card.desc}
      </p>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-flex', flexShrink: 0, borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: card.tag.bg, color: card.tag.fg }}>{card.tag.label}</span>
        <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 11, color: '#a8a29e', whiteSpace: 'nowrap' }}>更新于 1 天前</span>
      </div>
    </div>
  );
}
