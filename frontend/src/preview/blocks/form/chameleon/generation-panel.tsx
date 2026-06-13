import { PreviewFrame } from '../../../_layout';
import { Dices, ImagePlus, X } from 'lucide-react';
import { useState } from 'react';

/**
 * generation-panel · Chameleon GenerationPanel
 * 声明式生图/视频参数面板：首帧上传 + 提示词 + 紫色风格 chip + aspect_ratio
 * (预设 chip + 自定义宽高) + select/seed(骰子) + 高级参数折叠
 * 源码：frontend/src/core/components/common/generation-panel.tsx
 *
 * Input/Textarea 默认 token：h-8 rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px]
 * chip idle border-stone-200(#e7e5e4)，active border-violet-500/bg-violet-50/text-violet-700
 * 高级参数折叠触发器用纯文本三角字形 ▾/▸（无 lucide icon）
 */

const STYLES = [
  { id: 'none', label: '无风格' },
  { id: 'cinematic', label: '电影感' },
  { id: 'anime', label: '动漫' },
  { id: 'watercolor', label: '水彩' },
];
const RATIOS = [
  { value: '1024*1024', label: '1:1' },
  { value: '1024*768', label: '4:3' },
  { value: '1280*720', label: '16:9' },
];

export default function GenerationPanelPreview() {
  const [styleId, setStyleId] = useState('cinematic');
  const [ratio, setRatio] = useState('1280*720');
  const [custom, setCustom] = useState(false);
  const [hasFrame, setHasFrame] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section
          style={{
            width: 380,
            background: '#fffefb',
            border: '1px solid rgba(231,229,224,0.4)',
            borderRadius: 12,
            boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            padding: 20,
          }}
        >
          {/* space-y-3 字段流 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* ── 首帧图（图生视频必填） ── */}
            <Field>
              <Label>首帧图（图生视频必填）</Label>
              {hasFrame ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {/* 源码 img h-24 w-auto rounded-md border border-stone-200(#e7e5e4) object-cover */}
                  <div
                    style={{
                      height: 96,
                      width: 128,
                      borderRadius: 6,
                      border: '1px solid #e7e5e4',
                      background:
                        'linear-gradient(135deg, #c7d2fe 0%, #93c5fd 50%, #a5f3fc 100%)',
                    }}
                  />
                  <button
                    onClick={() => setHasFrame(false)}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      display: 'flex',
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: '#44403c',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setHasFrame(true)}
                  style={{
                    display: 'flex',
                    height: 96,
                    width: 128,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    borderRadius: 6,
                    border: '1px dashed #d6d3d1',
                    background: 'transparent',
                    color: '#a8a29e',
                    cursor: 'pointer',
                  }}
                >
                  <ImagePlus size={20} />
                  <span style={{ fontSize: 11 }}>上传首帧图</span>
                </button>
              )}
            </Field>

            {/* ── 提示词（Textarea：border-stone-300 #d6d3d1 rounded-md(6) px-3 py-1.5 text-[12.5px] rows-3） ── */}
            <Field>
              <Label>提示词</Label>
              <textarea
                defaultValue="一只橘猫坐在窗台上，午后阳光"
                rows={3}
                style={{
                  fontSize: 12.5,
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #d6d3d1',
                  resize: 'none',
                  outline: 'none',
                  color: '#1c1917',
                  fontFamily: 'inherit',
                }}
              />
            </Field>

            {/* ── 风格 chip（紫色预设） ── */}
            <Field>
              <Label>风格</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {STYLES.map(s => (
                  <Chip key={s.id} active={styleId === s.id} onClick={() => setStyleId(s.id)}>
                    {s.label}
                  </Chip>
                ))}
              </div>
            </Field>

            {/* ── 比例（预设 chip + 自定义宽高） ── */}
            <Field>
              <Label>画面比例</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {RATIOS.map(r => (
                  <Chip
                    key={r.value}
                    active={!custom && ratio === r.value}
                    onClick={() => {
                      setCustom(false);
                      setRatio(r.value);
                    }}
                  >
                    {r.label}
                  </Chip>
                ))}
                <Chip active={custom} onClick={() => setCustom(true)}>
                  自定义
                </Chip>
              </div>
              {custom && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <NumInput placeholder="宽" defaultValue="1280" />
                  <span style={{ color: '#a8a29e' }}>×</span>
                  <NumInput placeholder="高" defaultValue="720" />
                  <span style={{ marginLeft: 4, flexShrink: 0, fontSize: 10.5, color: '#a8a29e' }}>
                    px（512–2048）
                  </span>
                </div>
              )}
            </Field>

            {/* ── seed（骰子随机） ── */}
            <Field>
              <Label>随机种子</Label>
              <div style={{ display: 'flex', gap: 6 }}>
                <NumInput placeholder="随机" flex />
                <button
                  title="随机种子"
                  style={{
                    display: 'flex',
                    height: 32,
                    width: 32,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    border: '1px solid #e7e5e4',
                    background: 'transparent',
                    color: '#78716c',
                    cursor: 'pointer',
                  }}
                >
                  <Dices size={14} />
                </button>
              </div>
            </Field>

            {/* ── 高级参数折叠（border-t border-stone-100 pt-2） ── */}
            <div style={{ borderTop: '1px solid #f5f4ee', paddingTop: 8 }}>
              {/* 源码用纯文本三角字形：▾ 收起高级参数 / ▸ 高级参数（text-[11.5px] text-stone-500，无 lucide） */}
              <button
                onClick={() => setShowAdvanced(s => !s)}
                style={{
                  fontSize: 11.5,
                  color: '#78716c',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showAdvanced ? '▾ 收起高级参数' : '▸ 高级参数'}
              </button>
              {showAdvanced && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                  <Field>
                    <Label>采样步数</Label>
                    <NumInput defaultValue="30" flex />
                  </Field>
                  <Field>
                    <Label>引导系数（CFG）</Label>
                    <NumInput defaultValue="7.5" flex />
                  </Field>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 12, color: '#57534e' }}>{children}</span>;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 9999,
        padding: '4px 10px', // px-2.5 py-1
        fontSize: 11.5,
        cursor: 'pointer',
        // idle border-stone-200(#e7e5e4) text-stone-600(#57534e)
        // active border-violet-500(#8b5cf6) bg-violet-50(#f5f3ff) text-violet-700(#6d28d9)
        border: active ? '1px solid #8b5cf6' : '1px solid #e7e5e4',
        background: active ? '#f5f3ff' : 'transparent',
        color: active ? '#6d28d9' : '#57534e',
        transition: 'all 120ms',
      }}
    >
      {children}
    </button>
  );
}

function NumInput({
  placeholder,
  defaultValue,
  flex,
}: {
  placeholder?: string;
  defaultValue?: string;
  flex?: boolean;
}) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      defaultValue={defaultValue}
      style={{
        height: 32, // h-8
        flex: flex ? 1 : undefined,
        width: flex ? undefined : 0,
        minWidth: 0,
        // 源码基础 Input：border-stone-300(#d6d3d1) rounded-md(6) px-3(12) text-[12px]（override）
        padding: '0 12px',
        fontSize: 12,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        outline: 'none',
        color: '#1c1917',
        boxSizing: 'border-box',
      }}
    />
  );
}
