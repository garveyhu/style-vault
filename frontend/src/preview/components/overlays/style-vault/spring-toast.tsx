import { useEffect, useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const KEYFRAMES = `
@keyframes svtoast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

type Kind = 'success' | 'error' | 'info';
interface Item {
  id: number;
  kind: Kind;
  content: string;
}

const DOT: Record<Kind, string> = {
  success: '#10b981',
  error: '#f43f5e',
  info: '#94a3b8',
};

function Bubble({ item }: { item: Item }) {
  return (
    <div
      style={{
        animation: 'svtoast-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 9999,
        border: '1px solid #e2e8f0',
        background: '#fff',
        fontSize: 13,
        fontWeight: 500,
        color: '#0f172a',
        fontFamily: SANS,
        boxShadow: '0 12px 30px -12px rgba(15,23,42,0.18)',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: DOT[item.kind],
        }}
      />
      {item.content}
    </div>
  );
}

export default function SpringToastPreview() {
  const [items, setItems] = useState<Item[]>([]);

  const fire = (kind: Kind, content: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, kind, content }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  // 自动重放 demo：进入预览页 1s 后依次触发三态
  useEffect(() => {
    const timers = [
      setTimeout(() => fire('success', 'Prompt 已复制'), 800),
      setTimeout(() => fire('info', '已切换到 iOS 视图'), 1800),
      setTimeout(() => fire('error', '复制失败 · 请检查权限'), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      {/* fixed viewport for toast (relative to this preview frame, simulated) */}
      <div
        style={{
          position: 'relative',
          minHeight: 720,
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        {/* toast viewport */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {items.map((t) => (
            <Bubble key={t.id} item={t} />
          ))}
        </div>

        <div style={{ padding: '64px 56px' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 12,
            }}
          >
            components / overlays / style-vault
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            Spring Toast
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#64748b',
              maxWidth: 600,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            顶部居中胶囊回执 · cubic-bezier(0.34, 1.56, 0.64, 1) overshoot
            spring · 2s 自动消失 · 三态圆点（emerald success · rose error
            · slate info）
          </div>

          {/* trigger buttons */}
          <Section label="试一下 · 点按钮触发">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { kind: 'success' as Kind, label: 'Success', text: 'Prompt 已复制' },
                { kind: 'error' as Kind, label: 'Error', text: '复制失败 · 请检查权限' },
                { kind: 'info' as Kind, label: 'Info', text: '已切换到 iOS 视图' },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={() => fire(b.kind, b.text)}
                  style={{
                    height: 40,
                    padding: '0 16px',
                    border: '1.5px solid #cbd5e1',
                    background: '#fff',
                    borderRadius: 8,
                    fontFamily: SANS,
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition:
                      'border-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1), color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0f172a';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.color = '#334155';
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: DOT[b.kind],
                    }}
                  />
                  {b.label}
                </button>
              ))}
            </div>
          </Section>

          {/* state gallery */}
          <Section label="States · 三态对比（静态）">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {(
                [
                  { kind: 'success', text: 'Prompt 已复制' },
                  { kind: 'info', text: '已切换到 iOS 视图' },
                  { kind: 'error', text: '复制失败 · 请检查权限' },
                ] as { kind: Kind; text: string }[]
              ).map((s) => (
                <Bubble key={s.kind} item={{ id: 0, ...s }} />
              ))}
            </div>
          </Section>

          {/* spec */}
          <Section label="Spec">
            <div
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 16,
              }}
            >
              {[
                ['anchor', 'fixed inset-x-0 top-3 z-[10000]'],
                ['enter', 'cubic-bezier(0.34, 1.56, 0.64, 1) · 320ms · overshoot'],
                ['shadow', '0 12px 30px -12px rgba(15,23,42,0.18) · 中距离单层'],
                ['duration', '2000ms 默认 · 可 push(kind, content, ms) 覆盖'],
                ['z-index', '10000 · 凌驾全局'],
                ['pointer', '父 none / 子 auto · 不挡背后操作'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    gap: 16,
                    fontSize: 12,
                    padding: '6px 0',
                    borderBottom: '1px dashed #f1f5f9',
                  }}
                >
                  <span style={{ color: '#94a3b8', width: 100 }}>{k}</span>
                  <span
                    style={{
                      color: '#0f172a',
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 11,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 14,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
