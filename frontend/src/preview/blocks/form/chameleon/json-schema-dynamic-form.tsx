import { PreviewFrame } from '../../../_layout';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * json-schema-dynamic-form · Chameleon JSONSchemaForm
 * 后端 Pydantic JSON Schema → 受控 React 表单：6 widget 派发 + 嵌套对象浅卡片
 * + array add/remove(含空态) + enum select + boolean switch 同行 + amber fallback
 * + error 态 + 空 schema / 空对象 占位
 * 源码：core/components/form/{json-schema-form,schema-field,widgets/*}.tsx
 *
 * Input/SelectTrigger 默认 token：h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px]
 * required 星号 text-rose-500(#f43f5e)；Switch checked bg-primary-600(#2563eb)
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

            {/* string + error 态（props.error → text-[11px] text-rose-500） */}
            <StringField title="API Base URL" required value="not-a-url" error="须是合法的 URL（http/https）" />

            {/* number / integer */}
            <NumberField title="最大 Token" required value="4096" />

            {/* enum → Select */}
            <EnumField title="温度策略" desc="采样温度档位" value="平衡" />

            {/* boolean → Switch 同行 */}
            <BooleanField title="启用流式输出" desc="开启后逐 token 返回" value={true} />

            {/* 嵌套 object（depth≥1 浅卡片） */}
            <ObjectField title="重试配置">
              <NumberField title="最大重试次数" value="3" />
              <NumberField title="退避基数（秒）" value="0.5" />
            </ObjectField>

            {/* 空对象（ObjectWidget entries 为空）占位 */}
            <ObjectFieldEmpty title="附加元数据" />

            {/* array add / remove */}
            <ArrayField title="停止词（stop sequences）" />

            {/* array 空列表态 */}
            <ArrayFieldEmpty title="预设示例（empty）" />

            {/* 不支持类型 fallback */}
            <FallbackField type="tuple" />

            {/* JSONSchemaForm 顶层空 schema 占位 */}
            <EmptySchema />
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

/* ── SchemaField 包装：label 上方 + desc 同行「· 」+ widget + 可选 error ── */
function FieldShell({
  title,
  desc,
  required,
  error,
  children,
}: {
  title: string;
  desc?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 12.5, color: '#44403c' }}>
          {title}
          {/* required 星号 text-rose-500 #f43f5e */}
          {required && <span style={{ marginLeft: 2, color: '#f43f5e' }}>*</span>}
        </span>
        {desc && <span style={{ fontSize: 11, color: '#a8a29e' }}>· {desc}</span>}
      </div>
      {children}
      {/* error 态 div text-[11px] text-rose-500 */}
      {error && <div style={{ fontSize: 11, color: '#f43f5e' }}>{error}</div>}
    </div>
  );
}

function StringField({
  title,
  desc,
  required,
  value,
  error,
}: {
  title: string;
  desc?: string;
  required?: boolean;
  value: string;
  error?: string;
}) {
  return (
    <FieldShell title={title} desc={desc} required={required} error={error}>
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

/* EnumWidget → SelectTrigger：h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px] + ChevronDown h-4 w-4 opacity-50 */
function EnumField({ title, desc, value }: { title: string; desc?: string; value: string }) {
  return (
    <FieldShell title={title} desc={desc}>
      <button
        style={{
          display: 'flex',
          height: 32,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: 13,
          borderRadius: 6,
          border: '1px solid #d6d3d1',
          background: '#fff',
          color: '#1c1917',
          cursor: 'pointer',
        }}
      >
        <span style={{ textAlign: 'left' }}>{value}</span>
        <ChevronDown size={16} color="#1c1917" style={{ opacity: 0.5 }} />
      </button>
    </FieldShell>
  );
}

/* boolean：label 与 Switch 同行（flex items-center justify-between gap-3 py-1）；
 * Switch checked bg-primary-600(#2563eb) / unchecked bg-stone-300(#d6d3d1)，thumb shadow-soft */
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
          background: on ? '#2563eb' : '#d6d3d1',
          padding: 2,
          border: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
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
            boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            transition: 'transform 200ms',
          }}
        />
      </button>
    </div>
  );
}

/* ObjectWidget depth≥1：浅卡片 rounded-md(6) border-stone-200/70 bg-stone-50/40 p-3 + label 上方 */
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

/* ObjectWidget entries 为空：text-[11px] italic text-stone-400 */
function ObjectFieldEmpty({ title }: { title: string }) {
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
        <span style={{ fontSize: 11, fontStyle: 'italic', color: '#a8a29e' }}>（此对象无字段定义）</span>
      </div>
    </FieldShell>
  );
}

/* ArrayWidget：每项 paper(#fffefb) 卡 + 删除按钮 + 底部「添加一项」（Button outline size=sm） */
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
        <AddItemButton onClick={() => setItems(arr => [...arr, ''])} />
      </div>
    </FieldShell>
  );
}

/* ArrayWidget 空列表：list 为空时只剩底部「添加一项」按钮 */
function ArrayFieldEmpty({ title }: { title: string }) {
  const [items, setItems] = useState<string[]>([]);
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
              style={{ marginTop: 2, borderRadius: 4, padding: 4, border: 'none', background: 'transparent', color: '#a8a29e', cursor: 'pointer', display: 'inline-flex' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <AddItemButton onClick={() => setItems(arr => [...arr, ''])} />
      </div>
    </FieldShell>
  );
}

/* Button variant=outline size=sm：h-7(28) px-2.5(10) rounded-md(6) border-stone-300(#d6d3d1) text-[11.5px] gap-1.5(6) + Plus h-3.5(14) */
function AddItemButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        height: 28,
        padding: '0 10px',
        fontSize: 11.5,
        fontWeight: 500,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        background: '#fff',
        color: '#44403c',
        cursor: 'pointer',
      }}
    >
      <Plus size={14} /> 添加一项
    </button>
  );
}

/* renderWidget default：不支持类型 fallback —— rounded border-amber-200 bg-amber-50/40 px-2 py-1 text-[11px] text-amber-700 */
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

/* JSONSchemaForm 顶层空 schema：rounded-md border-stone-200/70 bg-stone-50/30 px-3 py-2 text-[12px] text-stone-500 */
function EmptySchema() {
  return (
    <div
      style={{
        borderRadius: 6,
        border: '1px solid rgba(231,229,224,0.7)',
        background: 'rgba(250,250,249,0.3)',
        padding: '8px 12px',
        fontSize: 12,
        color: '#78716c',
      }}
    >
      Schema 内没有字段定义。
    </div>
  );
}

/* 基础 Input：h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px] */
function Input({ type, defaultValue }: { type?: string; defaultValue?: string }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      style={{
        height: 32,
        width: '100%',
        padding: '0 12px',
        fontSize: 13,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        outline: 'none',
        color: '#1c1917',
        boxSizing: 'border-box',
      }}
    />
  );
}
