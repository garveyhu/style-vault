import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';
import { Check, ChevronDown, Cpu, Search } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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
      <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · MODEL PICKER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>模型选择器双件</h1>

        {/* A · ModelPicker 双栏 popover */}
        <Section title="A · chat 模型双栏 popover (ModelPicker)">
          <div
            style={{
              width: 420,
              borderRadius: 8,
              border: '1px solid #e7e5e0',
              background: '#fff',
              boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
              overflow: 'hidden',
            }}
          >
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
                {PROVIDERS.map(p => (
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
                      background: provider === p ? '#eff6ff' : 'transparent',
                      color: provider === p ? '#1d4ed8' : '#57534e',
                      fontWeight: provider === p ? 500 : 400,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {/* 右：搜索 + 列表 */}
              <div style={{ display: 'flex', minWidth: 0, flex: 1, flexDirection: 'column' }}>
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
                <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 6px 6px' }}>
                  <ModelRow code="不指定（用默认模型）" active={false} noIcon />
                  {MODELS.filter(m => provider === '全部' || m.provider === provider).map(m => (
                    <ModelRow
                      key={m.code}
                      code={m.code}
                      provider={m.provider}
                      active={active === m.code}
                      onClick={() => setActive(m.code)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* B · ImageModelSelect 内联 Select */}
        <Section title="B · 生图模型内联 Select (ImageModelSelect)">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* trigger */}
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
                color: '#44403c',
                cursor: 'pointer',
                fontFamily: SANS,
              }}
            >
              <span style={{ fontFamily: MONO }}>qwen-image</span>
              <ChevronDown size={16} color="#1c1917" style={{ opacity: 0.5 }} />
            </button>
            {/* dropdown */}
            <div
              style={{
                width: 240,
                borderRadius: 6,
                border: '1px solid #e7e5e0',
                background: '#fff',
                boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
                padding: 4,
              }}
            >
              {IMAGE_MODELS.map((m, i) => (
                <div
                  key={m.code}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    padding: '6px 8px 6px 32px',
                    fontSize: 12,
                    background: i === 0 ? '#f5f5f4' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {i === 0 && (
                    <span style={{ position: 'absolute', left: 8, display: 'inline-flex' }}>
                      <Check size={16} color="#1c1917" />
                    </span>
                  )}
                  <span style={{ fontFamily: MONO, color: '#1c1917' }}>{m.code}</span>
                  <span style={{ marginLeft: 6, fontSize: 10, color: '#a8a29e' }}>{m.provider}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function ModelRow({
  code,
  provider,
  active,
  onClick,
  noIcon,
}: {
  code: string;
  provider?: string;
  active: boolean;
  onClick?: () => void;
  noIcon?: boolean;
}) {
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
        background: active ? '#eff6ff' : 'transparent',
      }}
    >
      {!noIcon && (
        <span style={{ flexShrink: 0, display: 'inline-flex' }}>
          <Cpu size={14} color="#a8a29e" />
        </span>
      )}
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: '#292524' }}>
          {code}
        </span>
        {provider && (
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 10, color: '#a8a29e' }}>
            {provider}
          </span>
        )}
      </span>
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
