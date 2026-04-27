import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const TYPE_DOT: Record<string, string> = {
  product: '#a855f7',
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const RELATED = {
  uses: [
    { type: 'token', name: 'Slate × Cyan Cool' },
    { type: 'token', name: 'Editorial Flow Motion' },
    { type: 'token', name: 'Inter Editorial Display' },
    { type: 'token', name: '冷感漂浮气泡装饰' },
    { type: 'block', name: '冷感漂浮 Hero' },
  ],
  usedBy: [
    { type: 'page', name: '编辑感冷调落地页' },
    { type: 'style', name: '冷感 Editorial 设计目录站' },
  ],
};

export default function SidebarPreviewDetailPreview() {
  const [viewport, setViewport] = useState<number | 'full'>(1024);

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* breadcrumb */}
        <div style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
          <div
            style={{
              maxWidth: 1600,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '12px 32px',
              fontSize: 13,
            }}
          >
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: SANS,
              }}
            >
              ← 返回
            </button>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#64748b' }}>组件</span>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ fontWeight: 500, color: '#0f172a' }}>
              深色胶囊主 CTA
            </span>
          </div>
        </div>

        {/* body */}
        <div
          style={{
            maxWidth: 1600,
            margin: '0 auto',
            display: 'flex',
            gap: 40,
            padding: '40px 32px',
          }}
        >
          {/* aside */}
          <aside style={{ width: 340, flexShrink: 0 }}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
            >
              {/* title */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: 4,
                      background: '#dcfce7',
                      color: '#166534',
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    组件
                  </span>
                  <span style={{ color: '#0f172a', fontSize: 16 }}>♥</span>
                </div>
                <h1
                  style={{
                    margin: '12px 0 0',
                    fontSize: 32,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                  }}
                >
                  深色胶囊主 CTA
                </h1>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#475569',
                  }}
                >
                  rounded-full bg-slate-900 + 深柔投影 + ArrowRight 位移的主操作按钮
                </p>
              </div>

              {/* CTA */}
              <button
                style={{
                  width: '100%',
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
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                ⧉ 复制 Prompt
              </button>

              {/* platform / theme */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    background: '#0f172a',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  Web
                </span>
                <span
                  style={{
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    color: '#475569',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                >
                  浅色
                </span>
              </div>

              {/* tags */}
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                {[
                  { label: '风格', values: ['极简', '编辑'] },
                  { label: '氛围', values: ['平静', '自信'] },
                  {
                    label: '技术栈',
                    values: ['React + Antd + Tailwind', 'HTML + Tailwind'],
                  },
                ].map((t) => (
                  <div
                    key={t.label}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                  >
                    <span
                      style={{
                        width: 56,
                        flexShrink: 0,
                        paddingTop: 2,
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#94a3b8',
                      }}
                    >
                      {t.label}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 6,
                      }}
                    >
                      {t.values.map((v) => (
                        <span
                          key={v}
                          style={{
                            padding: '2px 8px',
                            borderRadius: 6,
                            background: '#f1f5f9',
                            color: '#334155',
                            fontSize: 12,
                          }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* relations */}
              <RelationGroup title="依赖" items={RELATED.uses} />
              <RelationGroup title="被引用" items={RELATED.usedBy} />
            </div>
          </aside>

          {/* main · viewport + chrome */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* viewport toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <FakeSelect value={viewport} onChange={setViewport} />
                <button
                  style={{
                    height: 40,
                    padding: '0 16px',
                    border: '1.5px solid #cbd5e1',
                    background: '#fff',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#334155',
                    cursor: 'pointer',
                    fontFamily: SANS,
                  }}
                >
                  ⛶ 全屏预览
                </button>
                <div
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#94a3b8',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#10b981',
                    }}
                  />
                  桌面
                </div>
              </div>

              {/* chrome */}
              <div
                style={{
                  overflow: 'hidden',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderBottom: '1px solid #f1f5f9',
                    background: '#f8fafc',
                    padding: '10px 16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                      <span
                        key={c}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: c,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#64748b',
                    }}
                  >
                    深色胶囊主 CTA
                  </div>
                  <div style={{ width: 64 }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#f8fafc',
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      maxWidth:
                        viewport === 'full' ? '100%' : `${viewport}px`,
                      width: '100%',
                      maxHeight: '72vh',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 6,
                      overflow: 'auto',
                      transition: 'max-width 240ms ease',
                      padding: 64,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        marginBottom: 32,
                      }}
                    >
                      为 AI 编码而造的设计风格库
                    </div>
                    <button
                      style={{
                        height: 56,
                        padding: '0 36px',
                        borderRadius: 9999,
                        background: '#0f172a',
                        color: '#fff',
                        border: 'none',
                        fontSize: 15,
                        fontWeight: 500,
                        cursor: 'pointer',
                        boxShadow: '0 20px 48px -20px rgba(15,23,42,0.6)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      进入风格库 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PreviewFrame>
  );
}

function RelationGroup({
  title,
  items,
}: {
  title: string;
  items: { type: string; name: string }[];
}) {
  // group by type
  const groups: Record<string, typeof items> = {};
  items.forEach((it) => {
    (groups[it.type] ??= []).push(it);
  });
  const order = ['product', 'style', 'page', 'block', 'component', 'token'];
  const TYPE_LABEL: Record<string, string> = {
    product: '产品',
    style: '风格',
    page: '页面',
    block: '模块',
    component: '组件',
    token: '原语',
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#94a3b8',
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: 11,
            color: '#cbd5e1',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {items.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {order
          .filter((t) => groups[t])
          .map((t) => {
            const list = groups[t];
            return (
              <div key={t}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 4px',
                    fontSize: 11,
                    fontWeight: 500,
                    color: '#64748b',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: TYPE_DOT[t],
                      }}
                    />
                    {TYPE_LABEL[t]}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#cbd5e1',
                    }}
                  >
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {list.length}
                    </span>
                    <span style={{ fontSize: 9 }}>▾</span>
                  </span>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  {list.map((it, i) => (
                    <button
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 12px',
                        borderRadius: 12,
                        border: '1px solid transparent',
                        background: 'rgba(248,250,252,0.6)',
                        cursor: 'pointer',
                        fontFamily: SANS,
                        textAlign: 'left',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          'rgba(248,250,252,0.6)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          flexShrink: 0,
                          borderRadius: '50%',
                          background: TYPE_DOT[t],
                        }}
                      />
                      <span style={{ flex: 1 }}>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#0f172a',
                          }}
                        >
                          {it.name}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            marginTop: 2,
                            fontSize: 11,
                            color: '#94a3b8',
                          }}
                        >
                          {TYPE_LABEL[t]}
                        </span>
                      </span>
                      <span style={{ color: '#cbd5e1', fontSize: 12 }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function FakeSelect({
  value,
  onChange,
}: {
  value: number | 'full';
  onChange: (v: number | 'full') => void;
}) {
  const VIEWPORTS: { value: number | 'full'; label: string; desc: string; icon: string }[] = [
    { value: 375, label: '手机', desc: '375 px', icon: '▯' },
    { value: 768, label: '平板', desc: '768 px', icon: '▭' },
    { value: 1024, label: '桌面', desc: '1024 px', icon: '▢' },
    { value: 1440, label: '大屏', desc: '1440 px', icon: '◻' },
    { value: 'full', label: '全宽', desc: '响应式', icon: '⛶' },
  ];
  const [open, setOpen] = useState(false);
  const cur = VIEWPORTS.find((v) => v.value === value)!;
  return (
    <div style={{ position: 'relative', width: 200 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        style={{
          width: '100%',
          height: 40,
          padding: '0 12px',
          background: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: 8,
          fontFamily: SANS,
          fontSize: 13,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#0f172a',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            background: '#f1f5f9',
            borderRadius: 6,
            color: '#64748b',
            fontSize: 14,
          }}
        >
          {cur.icon}
        </span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
          {cur.label}
        </span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{cur.desc}</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: 200,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            boxShadow: '0 12px 32px -10px rgba(15,23,42,0.18)',
            zIndex: 10,
            padding: 4,
          }}
        >
          {VIEWPORTS.map((v) => (
            <div
              key={String(v.value)}
              onMouseDown={() => {
                onChange(v.value);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                background: v.value === value ? '#f1f5f9' : 'transparent',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  background: '#f1f5f9',
                  borderRadius: 6,
                  color: '#64748b',
                  fontSize: 14,
                }}
              >
                {v.icon}
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
                {v.label}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
