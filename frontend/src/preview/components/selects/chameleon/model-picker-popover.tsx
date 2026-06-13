import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';
import { Check, ChevronDown, Cpu, Loader2, Search } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const STONE_200 = '#e7e5e4';

const PROVIDERS = ['全部', 'openai', 'anthropic', 'qwen', 'deepseek'];

const MODELS = [
  { code: 'gpt-4o', provider: 'openai' },
  { code: 'gpt-4o-mini', provider: 'openai' },
  { code: 'claude-opus-4', provider: 'anthropic' },
  { code: 'qwen-max', provider: 'qwen' },
  { code: 'deepseek-chat', provider: 'deepseek' },
];

const IMAGE_MODELS = [
  { code: 'qwen-image', provider: 'comfyui' },
  { code: 'flux-dev', provider: 'comfyui' },
];

export default function ModelPickerPopover() {
  const [provider, setProvider] = useState('全部');
  const [active, setActive] = useState('gpt-4o-mini');
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 620, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · MODEL PICKER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>模型选择器双件</h1>

        {/* A · ModelPicker 双栏 popover */}
        <Section title="A · chat 模型双栏 popover (ModelPicker)">
          {/* trigger 两态：选中值 / 空值 text-stone-400 + hover:border-stone-300 */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
            <PickerTrigger label="gpt-4o-mini" />
            <PickerTrigger label="选择模型" empty />
            <PickerTrigger label="选择模型" empty hover />
          </div>

          <div style={shell(420)}>
            <div style={{ display: 'flex', height: 340 }}>
              {/* 左：provider 栏 */}
              <div
                style={{
                  width: 96,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  overflowY: 'auto',
                  borderRight: '1px solid #f5f5f4',
                  padding: 6,
                }}
              >
                {PROVIDERS.map(p => {
                  const on = provider === p;
                  // 「openai」演示非选 hover:bg-stone-100
                  const hov = !on && p === 'openai';
                  return (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      style={{
                        width: '100%',
                        borderRadius: 4,
                        padding: '6px 8px',
                        textAlign: 'left',
                        fontSize: 12,
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: SANS,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        // active bg-blue-50(#eff6ff) text-blue-700(#1d4ed8) font-medium
                        background: on ? '#eff6ff' : hov ? '#f5f5f4' : 'transparent',
                        color: on ? '#1d4ed8' : '#57534e',
                        fontWeight: on ? 500 : 400,
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {/* 右：搜索 + 列表 */}
              <div style={{ display: 'flex', minWidth: 0, flex: 1, flexDirection: 'column' }}>
                <SearchBar />
                <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 6px 6px' }}>
                  <ModelRow code="不指定（用默认模型）" active={false} noIcon />
                  {MODELS.filter(m => provider === '全部' || m.provider === provider).map(m => (
                    <ModelRow
                      key={m.code}
                      code={m.code}
                      provider={m.provider}
                      active={active === m.code}
                      hover={m.code === 'claude-opus-4'}
                      onClick={() => setActive(m.code)}
                    />
                  ))}
                  {/* 到底无额外态——A 仅 加载中 / 空 两态（见下方变体） */}
                </div>
              </div>
            </div>
          </div>

          {/* A 列表底部两态 */}
          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <MiniPanel title="加载中"><ListLoading /></MiniPanel>
            <MiniPanel title="空"><ListEmpty /></MiniPanel>
          </div>
        </Section>

        {/* B · ImageModelSelect 内联 Select */}
        <Section title="B · 生图模型内联 Select (ImageModelSelect)">
          {/* trigger 三态：已选 / 占位「选择生图模型」/ 加载中「加载中…」 */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <SelectTrigger><span style={{ fontFamily: MONO }}>qwen-image</span></SelectTrigger>
            <SelectTrigger placeholder>选择生图模型</SelectTrigger>
            <SelectTrigger placeholder>加载中…</SelectTrigger>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* dropdown：选中态靠 Check（ItemIndicator），背景仅 hover/focus 才变灰 */}
            <div
              style={{
                width: 240,
                borderRadius: 6,
                border: `1px solid ${STONE_200}`,
                background: '#fff',
                boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
                padding: 4,
              }}
            >
              {/* i=0 选中：有 Check，背景透明（非 hover） */}
              <SelectItem code={IMAGE_MODELS[0].code} provider={IMAGE_MODELS[0].provider} selected />
              {/* i=1 hover：data-highlighted bg-stone-100，无 Check */}
              <SelectItem code={IMAGE_MODELS[1].code} provider={IMAGE_MODELS[1].provider} hover />
            </div>

            {/* dropdown 空态 */}
            <div
              style={{
                width: 240,
                borderRadius: 6,
                border: `1px solid ${STONE_200}`,
                background: '#fff',
                boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
                padding: 4,
              }}
            >
              {/* 空态 px-2 py-1.5 text-[11px] text-stone-400 */}
              <div style={{ padding: '6px 8px', fontSize: 11, color: '#a8a29e', lineHeight: 1.4 }}>
                暂无生图模型，请先在「模型」页添加 image 模型
              </div>
            </div>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function shell(width: number): React.CSSProperties {
  return {
    width,
    borderRadius: 8,
    border: `1px solid ${STONE_200}`,
    background: '#fff',
    boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
    overflow: 'hidden',
  };
}

// ModelPicker trigger h-7(28) w-168 rounded-md(6) border-stone-200(#e7e5e4) px-2(8) text-[12px] text-stone-700
// 空值 text-stone-400(#a8a29e)；hover:border-stone-300(#d6d3d1)
function PickerTrigger({ label, empty, hover }: { label: string; empty?: boolean; hover?: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        width: 168,
        height: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        borderRadius: 6,
        border: `1px solid ${hover ? '#d6d3d1' : STONE_200}`,
        background: '#fff',
        padding: '0 8px',
        fontSize: 12,
        color: empty ? '#a8a29e' : '#44403c',
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <ChevronDown size={14} color="#a8a29e" style={{ flexShrink: 0 }} />
    </button>
  );
}

// SelectTrigger h-7(28) text-[12px] border-stone-300(#d6d3d1)；ChevronDown h-4 w-4(16) opacity-50；占位 text-stone-400
function SelectTrigger({ children, placeholder }: { children: React.ReactNode; placeholder?: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        width: 200,
        height: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        background: '#fff',
        padding: '0 12px',
        fontSize: 12,
        color: placeholder ? '#a8a29e' : '#44403c',
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
      <ChevronDown size={16} color="#1c1917" style={{ opacity: 0.5, flexShrink: 0 }} />
    </button>
  );
}

// SelectItem pl-8(32) py-1.5(6) text-[12px]；勾 Check h-4 w-4(16) left-2(8)；code font-mono；provider ml-1.5(6) text-[10px] text-stone-400
function SelectItem({ code, provider, selected, hover }: { code: string; provider: string; selected?: boolean; hover?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        padding: '6px 8px 6px 32px',
        fontSize: 12,
        background: hover ? '#f5f5f4' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {selected && (
        <span style={{ position: 'absolute', left: 8, display: 'inline-flex' }}>
          <Check size={16} color="#1c1917" />
        </span>
      )}
      <span style={{ fontFamily: MONO, color: '#1c1917' }}>{code}</span>
      <span style={{ marginLeft: 6, fontSize: 10, color: '#a8a29e' }}>{provider}</span>
    </div>
  );
}

function SearchBar() {
  // relative p-1.5(6)；Search left-3.5(14) h-3.5 w-3.5(14) text-stone-400；Input !h-7(28) pl-7(28) text-[12px] border-stone-300
  return (
    <div style={{ position: 'relative', flexShrink: 0, padding: 6 }}>
      <Search size={14} color="#a8a29e" style={{ position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%)' }} />
      <input
        placeholder="搜索模型名 / provider"
        style={{
          height: 28,
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: 6,
          border: '1px solid #d6d3d1',
          background: '#fff',
          padding: '0 8px 0 28px',
          fontSize: 12,
          color: '#1c1917',
          outline: 'none',
          fontFamily: SANS,
        }}
      />
    </div>
  );
}

// 加载中：flex items-center justify-center gap-1.5 py-2 text-[11px] text-stone-400 + Loader2 h-3 w-3 spin
function ListLoading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', fontSize: 11, color: '#a8a29e' }}>
      <Loader2 size={12} style={{ animation: 'mpp-spin 1s linear infinite' }} /> 加载中…
      <style>{`@keyframes mpp-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// 空：py-6 text-center text-[12px] text-stone-400
function ListEmpty() {
  return <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 12, color: '#a8a29e' }}>无匹配模型</div>;
}

function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 240 }}>
      <div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 6 }}>{title}</div>
      <div style={{ borderRadius: 8, border: `1px solid ${STONE_200}`, background: '#fff', boxShadow: '0 1px 3px rgb(0 0 0/0.05)' }}>{children}</div>
    </div>
  );
}

function ModelRow({
  code,
  provider,
  active,
  hover,
  onClick,
  noIcon,
}: {
  code: string;
  provider?: string;
  active: boolean;
  hover?: boolean;
  onClick?: () => void;
  noIcon?: boolean;
}) {
  // rounded(4) px-2(8) py-1.5(6) gap-2(8) hover:bg-stone-100(#f5f5f4)；active bg-blue-50(#eff6ff)
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 8,
        borderRadius: 4,
        padding: '6px 8px',
        textAlign: 'left',
        border: 'none',
        cursor: 'pointer',
        background: active ? '#eff6ff' : hover ? '#f5f5f4' : 'transparent',
      }}
    >
      {!noIcon && (
        <span style={{ flexShrink: 0, display: 'inline-flex' }}>
          {/* Cpu h-3.5 w-3.5(14) text-stone-400 */}
          <Cpu size={14} color="#a8a29e" />
        </span>
      )}
      <span style={{ minWidth: 0, flex: 1 }}>
        {/* 标题 text-[12px] text-stone-800(#292524) */}
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: '#292524' }}>
          {code}
        </span>
        {/* provider 副行 font-mono text-[10px] text-stone-400(#a8a29e) */}
        {provider && (
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 10, color: '#a8a29e' }}>
            {provider}
          </span>
        )}
      </span>
      {/* Check h-3.5 w-3.5(14) text-blue-600(#2563eb) */}
      {active && <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
