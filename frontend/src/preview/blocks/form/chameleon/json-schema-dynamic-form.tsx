import { PreviewFrame } from '../../../_layout';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * json-schema-dynamic-form · Chameleon JSONSchemaForm
 * 后端 Pydantic JSON Schema → 受控 React 表单：6 widget 派发 + 嵌套对象浅卡片
 * + array add/remove + enum select + boolean switch 同行 + amber fallback
 * 源码：core/components/form/{json-schema-form,schema-field,widgets/*}.tsx
 */

export default function JsonSchemaDynamicForm() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section
          style={{
            width: 420,
            background: '#fffefb',
            border: '1px solid rgba(231,229,224,0.4)',
            borderRadius: 12,
            boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            padding: 20,
          }}
        >
          {/* 顶层 object · space-y-3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* string */}
            <StringField title="模型名称" desc="供调用时引用的唯一标识" required value="qwen-max" />

            {/* number / integer */}
            <NumberField title="最大 Token" required value="4096" />

            {/* enum → Select */}
            <EnumField title="温度策略" desc="采样温度档位" options={['保守', '平衡', '发散']} value="平衡" />

            {/* boolean → Switch 同行 */}
            <BooleanField title="启用流式输出" desc="开启后逐 token 返回" value={true} />

            {/* 嵌套 object（depth≥1 浅卡片） */}
            <ObjectField title="重试配置">
              <NumberField title="最大重试次数" value="3" />
              <NumberField title="退避基数（秒）" value="0.5" />
            </ObjectField>

            {/* array add / remove */}
            <ArrayField title="停止词（stop sequences）" />

            {/* 不支持类型 fallback */}
            <FallbackField type="tuple" />
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

/* ── SchemaField 包装：label 上方 + desc 同行「· 」+ widget ── */
function FieldShell({
  title,
  desc,
  required,
  children,
}: {
  title: string;
  desc?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 12.5, color: '#44403c' }}>
          {title}
          {required && <span style={{ marginLeft: 2, color: '#ef4444' }}>*</span>}
        </span>
        {desc && <span style={{ fontSize: 11, color: '#a8a29e' }}>· {desc}</span>}
      </div>
      {children}
    </div>
  );
}

function StringField({ title, desc, required, value }: { title: string; desc?: string; required?: boolean; value: string }) {
  return (
    <FieldShell title={title} desc={desc} required={required}>
      <Input defaultValue={value} />
    </FieldShell>
  );
}

function NumberField({ title, value, required }: { title: string; value: string; required?: boolean }) {
  return (
    <FieldShell title={title} required={required}>
      <Input type="number" defaultValue={value} />
    </FieldShell>
  );
}

function EnumField({ title, desc, value }: { title: string; desc?: string; options?: string[]; value: string }) {
  return (
    <FieldShell title={title} desc={desc}>
      <button
        style={{
          display: 'flex',
          height: 36,
          width: '100%',
          alignItems: 'center',
          padding: '0 10px',
          fontSize: 13,
          borderRadius: 8,
          border: '1px solid #e7e5e0',
          background: '#fff',
          color: '#1c1917',
          cursor: 'pointer',
        }}
      >
        <span style={{ flex: 1, textAlign: 'left' }}>{value}</span>
        <ChevronDown size={14} color="#a8a29e" />
      </button>
    </FieldShell>
  );
}

/* boolean：label 与 Switch 同行（flex items-center justify-between gap-3 py-1） */
function BooleanField({ title, desc, value }: { title: string; desc?: string; value: boolean }) {
  const [on, setOn] = useState(value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '4px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12.5, color: '#44403c' }}>{title}</span>
        {desc && <div style={{ fontSize: 11, color: '#a8a29e' }}>{desc}</div>}
      </div>
      <button
        onClick={() => setOn(o => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: 36,
          height: 20,
          flexShrink: 0,
          borderRadius: 9999,
          background: on ? '#10b981' : '#d6d3d1',
          padding: 2,
          border: 'none',
          cursor: 'pointer',
          transition: 'background 200ms',
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#fff',
            transform: on ? 'translateX(16px)' : 'translateX(0)',
            boxShadow: '0 1px 2px rgb(0 0 0 / 10%)',
            transition: 'transform 200ms',
          }}
        />
      </button>
    </div>
  );
}

/* ObjectWidget depth≥1：浅卡片 stone-50/40 p-3 + label 上方 */
function ObjectField({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FieldShell title={title}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          borderRadius: 6,
          border: '1px solid rgba(231,229,224,0.7)',
          background: 'rgba(250,250,249,0.4)',
          padding: 12,
        }}
      >
        {children}
      </div>
    </FieldShell>
  );
}

/* ArrayWidget：每项 paper 卡 + 删除按钮 + 底部添加 */
function ArrayField({ title }: { title: string }) {
  const [items, setItems] = useState(['</s>', 'STOP']);
  return (
    <FieldShell title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              borderRadius: 6,
              border: '1px solid rgba(231,229,224,0.7)',
              background: '#fffefb',
              padding: 8,
            }}
          >
            <div style={{ flex: 1 }}>
              <Input defaultValue={it} />
            </div>
            <button
              onClick={() => setItems(arr => arr.filter((_, idx) => idx !== i))}
              title="删除该项"
              style={{
                marginTop: 2,
                borderRadius: 4,
                padding: 4,
                border: 'none',
                background: 'transparent',
                color: '#a8a29e',
                cursor: 'pointer',
                display: 'inline-flex',
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => setItems(arr => [...arr, ''])}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            alignSelf: 'flex-start',
            height: 28,
            padding: '0 10px',
            fontSize: 12,
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            background: '#fff',
            color: '#44403c',
            cursor: 'pointer',
          }}
        >
          <Plus size={14} /> 添加一项
        </button>
      </div>
    </FieldShell>
  );
}

function FallbackField({ type }: { type: string }) {
  return (
    <FieldShell title="坐标范围">
      <div
        style={{
          borderRadius: 4,
          border: '1px solid #fde68a',
          background: 'rgba(255,251,235,0.4)',
          padding: '4px 8px',
          fontSize: 11,
          color: '#b45309',
        }}
      >
        不支持的 schema 类型：{type}
      </div>
    </FieldShell>
  );
}

function Input({ type, defaultValue }: { type?: string; defaultValue?: string }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      style={{
        height: 36,
        width: '100%',
        padding: '0 10px',
        fontSize: 13,
        borderRadius: 8,
        border: '1px solid #e7e5e0',
        outline: 'none',
        color: '#1c1917',
        boxSizing: 'border-box',
      }}
    />
  );
}
