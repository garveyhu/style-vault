import { PreviewFrame } from '../../../_layout';
import {
  Code2,
  Globe,
  ImagePlus,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Workflow,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

const FILTERS = [
  { key: 'all', label: '全部', icon: LayoutGrid, count: 9 },
  { key: 'workflow', label: '流程型', icon: Workflow, count: 3 },
  { key: 'chatflow', label: '对话型', icon: MessageSquare, count: 4 },
  { key: 'code', label: '代码型', icon: Code2, count: 1 },
  { key: 'external', label: '外部', icon: Globe, count: 1 },
];

type Kind = 'code' | 'chatflow' | 'workflow' | 'external';
// KIND_META —— badge=[bg,text 700] / tile=[bg 50,icon 600]
const KIND_META: Record<Kind, { label: string; Icon: typeof Code2; badge: [string, string]; tile: [string, string] }> = {
  code: { label: '代码型', Icon: Code2, badge: ['#eef2ff', '#4338ca'], tile: ['#eef2ff', '#4f46e5'] },
  chatflow: { label: '对话型', Icon: MessageSquare, badge: ['#f0f9ff', '#0369a1'], tile: ['#f0f9ff', '#0284c7'] },
  workflow: { label: '流程型', Icon: Workflow, badge: ['#f5f3ff', '#6d28d9'], tile: ['#f5f3ff', '#7c3aed'] },
  external: { label: '外部', Icon: Globe, badge: ['#fffbeb', '#b45309'], tile: ['#fffbeb', '#d97706'] },
};

const CARDS: { name: string; key: string; desc: string; kind: Kind; status?: ['pub' | 'draft' | 'embed', string]; hovered?: boolean }[] = [
  { name: '智能客服助手', key: 'cs-assistant', desc: '多轮对话客服，挂接产品知识库，自动引导用户补充信息。', kind: 'chatflow', status: ['pub', 'v3'], hovered: true },
  { name: '订单数据清洗管线', key: 'order-etl', desc: '一次性管线：抽取 → 规则清洗 → 写回；支持批处理输入。', kind: 'workflow', status: ['draft', ''] },
  { name: 'SQL 生成器', key: 'text2sql', desc: '自然语言转可执行 SQL，绑定库表 schema 做语义对齐。', kind: 'chatflow', status: ['embed', ''] },
  { name: '产品海报生图', key: 'poster-gen', desc: '绑定本地 ComfyUI 生图模型，对话即出图，返回 Markdown 图片。', kind: 'workflow', status: ['pub', 'v1'] },
  { name: '财报摘要 Agent', key: 'fin-summary', desc: '用 @agent 装饰器在代码里定义，提交进 agents 目录自动注册。', kind: 'code' },
  { name: '外部审批回调', key: 'ext-approve', desc: '接入第三方审批系统，统一记账与溯源。', kind: 'external' },
];

type AppMethod = 'chatflow' | 'workflow' | 'comfyui' | 'code';
const METHOD_META: Record<AppMethod, { label: string; desc: string; icon: typeof MessageSquare }> = {
  chatflow: { label: '对话编排', desc: '聊天 I/O + 开场白 + 对话调试，可发布为可对话应用', icon: MessageSquare },
  workflow: { label: '流程编排', desc: '一次性管线：填输入跑、批处理；可视化拖拽节点', icon: Workflow },
  comfyui: { label: '生图应用', desc: '绑定本地 ComfyUI 生图模型，对话即出图（Markdown 图片）', icon: ImagePlus },
  code: { label: '代码应用', desc: '用 @agent 装饰器在代码里定义；提交进 agents 目录自动注册', icon: Code2 },
};

export default function AppCardLibrary() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '18px 22px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {FILTERS.map((f, i) => {
              const active = i === 0;
              return (
                <button
                  key={f.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    borderRadius: 6,
                    padding: '4px 10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 500,
                    background: active ? '#eff6ff' : 'transparent',
                    color: active ? '#1d4ed8' : '#78716c',
                  }}
                >
                  <f.icon size={14} strokeWidth={2} color={active ? '#2563eb' : '#a8a29e'} />
                  {f.label}
                  <span style={{ fontSize: 10, color: active ? '#60a5fa' : '#a8a29e' }}>{f.count}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <Search
              size={14}
              strokeWidth={2}
              color="#a8a29e"
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              placeholder="搜索应用…"
              style={{
                height: 32,
                width: 224,
                paddingLeft: 32,
                paddingRight: 10,
                borderRadius: 8,
                border: '1px solid #d6d3d1',
                background: '#fff',
                fontSize: 12.5,
                color: '#44403c',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* grid —— 宽屏 4 列（grid-cols-1 sm:2 lg:3 xl:4） */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {/* create card —— 圆形图标底 bg-stone-100 #f5f5f4 */}
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
            }}
          >
            <div
              style={{
                display: 'flex',
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: '#f5f5f4',
              }}
            >
              <Plus size={20} strokeWidth={1.75} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>新建应用</span>
            <span style={{ fontSize: 11, color: '#a8a29e' }}>对话 / 流程编排，或接入代码应用</span>
          </button>

          {CARDS.map(({ key, ...c }) => (
            <AppCard key={key} {...c} />
          ))}
        </div>

        {/* 新建应用 Modal —— 编排方式选择器（chatflow/workflow/comfyui/code） */}
        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#a8a29e' }}>
            新建应用 Modal · 编排方式
          </div>
          <div
            style={{
              maxWidth: 420,
              borderRadius: 16,
              border: '1px solid rgba(231,229,224,0.8)',
              background: '#fff',
              padding: 18,
              boxShadow: '0 20px 25px -5px rgb(0 0 0/10%), 0 8px 10px -6px rgb(0 0 0/10%)',
            }}
          >
            <div style={{ marginBottom: 12, fontSize: 15, fontWeight: 600, color: '#1c1917' }}>新建应用</div>
            <label style={{ marginBottom: 6, display: 'block', fontSize: 12, color: '#57534e' }}>编排方式</label>
            {/* grid sm:2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {(['chatflow', 'workflow', 'comfyui', 'code'] as AppMethod[]).map((m, i) => {
                const meta = METHOD_META[m];
                const Icon = meta.icon;
                const active = i === 0; // chatflow 选中态
                return (
                  <div
                    key={m}
                    style={{
                      borderRadius: 8,
                      padding: 10,
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: active ? '1px solid #1c1917' : '1px solid #e7e5e0',
                      background: active ? '#fafaf9' : '#fff',
                      boxShadow: active ? '0 0 0 1px #1c1917' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: '#1c1917' }}>
                      <Icon size={14} strokeWidth={2} />
                      {meta.label}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 10.5, lineHeight: 1.35, color: '#78716c' }}>{meta.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* 应用标识 */}
            <label style={{ marginTop: 12, marginBottom: 4, display: 'block', fontSize: 12, color: '#57534e' }}>应用标识</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ height: 32, flex: 1, display: 'flex', alignItems: 'center', borderRadius: 8, border: '1px solid #d6d3d1', background: '#fff', padding: '0 10px', fontFamily: MONO, fontSize: 12, color: '#a8a29e' }}>my-app</span>
              <span style={{ height: 32, display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 8, border: '1px solid #d6d3d1', background: '#fff', padding: '0 8px', fontSize: 12, color: '#44403c' }}>
                <Sparkles size={14} strokeWidth={2} /> 系统生成
              </span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function AppCard({
  name,
  key: appKey,
  desc,
  kind,
  status,
  hovered,
}: {
  name: string;
  key: string;
  desc: string;
  kind: Kind;
  status?: ['pub' | 'draft' | 'embed', string];
  hovered?: boolean;
}) {
  const meta = KIND_META[kind];
  const Icon = meta.Icon;
  return (
    <div
      style={{
        position: 'relative',
        height: 148,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        // hover 态：border-primary-200 #bfdbfe + shadow-md
        border: hovered ? '1px solid #bfdbfe' : '1px solid rgba(231,229,224,0.8)',
        background: '#fff',
        padding: 16,
        boxShadow: hovered
          ? '0 4px 6px -1px rgb(0 0 0/10%), 0 2px 4px -2px rgb(0 0 0/10%)'
          : '0 1px 2px 0 rgb(0 0 0/5%)',
      }}
    >
      {/* hover 顶部高光线 —— inset-x-4 top-0 h-0.5 via-primary-500 #3b82f6（默认 opacity-0，hover 出现） */}
      {hovered && (
        <span
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: 0,
            height: 2,
            borderRadius: 999,
            background: 'linear-gradient(to right, transparent, #3b82f6, transparent)',
          }}
        />
      )}

      {/* 三点菜单 —— 默认 opacity-0 group-hover:opacity-100，仅 hover 卡显示 */}
      {hovered && (
        <div style={{ position: 'absolute', right: 8, top: 8 }}>
          <span
            style={{
              display: 'flex',
              height: 28,
              width: 28,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              background: '#f5f5f4',
              color: '#78716c',
            }}
          >
            <MoreVertical size={16} strokeWidth={2} />
          </span>
        </div>
      )}

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
            background: meta.tile[0],
            color: meta.tile[1],
          }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div style={{ minWidth: 0, flex: 1, paddingRight: 28 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appKey}</div>
        </div>
      </div>

      {/* 描述 —— leading-relaxed 1.625 text-[11.5px] text-stone-500 #78716c */}
      <p
        style={{
          marginTop: 8,
          flex: 1,
          fontSize: 11.5,
          lineHeight: 1.625,
          color: '#78716c',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {desc}
      </p>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 10,
            fontWeight: 500,
            background: meta.badge[0],
            color: meta.badge[1],
          }}
        >
          {meta.label}
        </span>
        {status && status[0] === 'pub' && (
          <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: '#ecfdf5', color: '#047857' }}>
            已发布 {status[1]}
          </span>
        )}
        {status && status[0] === 'draft' && (
          <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: '#f5f5f4', color: '#78716c' }}>草稿</span>
        )}
        {status && status[0] === 'embed' && (
          <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 500, background: '#eff6ff', color: '#1d4ed8' }}>已嵌入</span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#a8a29e', whiteSpace: 'nowrap' }}>更新于 2 天前</span>
      </div>
    </div>
  );
}
