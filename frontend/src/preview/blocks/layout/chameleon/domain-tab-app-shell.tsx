import { PreviewFrame } from '../../../_layout';
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Settings,
  AppWindow,
  Workflow,
  FlaskConical,
  Code2,
  ListTree,
  MessageSquare,
} from 'lucide-react';

/**
 * domain-tab-app-shell · Chameleon MainLayout
 * 顶栏(h-14 域 tab) + 无边二级导航(w-56 warm 细 rail + 书签竖条) + main(px-6 py-4 full-bleed)
 * 源码：core/components/layout/{main-layout,top-bar,secondary-nav}.tsx
 */

const DOMAINS = [
  { key: 'workbench', label: '工作台', icon: LayoutDashboard, active: true },
  { key: 'kb', label: '知识库', icon: BookOpen, active: false },
  { key: 'obs', label: '观测', icon: Activity, active: false },
  { key: 'settings', label: '设置', icon: Settings, active: false },
];

const NAV_GROUPS = [
  {
    title: '应用',
    items: [
      { label: '应用', icon: AppWindow, active: false },
      { label: '工作流', icon: Workflow, active: true },
      { label: 'Playground', icon: Code2, active: false },
    ],
  },
  {
    title: '评测',
    items: [
      { label: '评测任务', icon: FlaskConical, active: false },
      { label: 'Datasets', icon: ListTree, active: false },
      { label: '会话', icon: MessageSquare, active: false },
    ],
  },
];

export default function DomainTabAppShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 560,
          background: '#fafaf7', // --color-warm
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* ── TopBar h-14 ── */}
        <header
          style={{
            display: 'flex',
            height: 56,
            flexShrink: 0,
            alignItems: 'center',
            gap: 16,
            borderBottom: '1px solid rgba(231,229,224,0.7)',
            background: '#fffefb', // --color-paper
            padding: '0 16px',
          }}
        >
          {/* 品牌 link：gap-2.5(10) ——  img /logo-sm.png h-7 w-7(28) object-contain + 文字 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* logo 图片占位（源码为 28px object-contain img，无渐变）—— 中性 mark 占位 */}
            <div
              style={{
                height: 28,
                width: 28,
                flexShrink: 0,
                borderRadius: 8,
                background: '#f4f3ee', // --color-warm-2 中性占位（不编造渐变）
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.04em', color: '#44403c' }}>C</span>
            </div>
            {/* text-[15px] font-semibold tracking-tight(-0.025em) text-stone-800 */}
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.025em', color: '#292524' }}>
              Chameleon
            </span>
          </div>

          <span style={{ height: 20, width: 1, background: '#e7e5e0' }} />

          {/* 域 tabs（左对齐）gap-1 */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {DOMAINS.map(d => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: 10,
                    padding: '8px 14px', // px-3.5 py-2
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: d.active ? '#eff6ff' : 'transparent',
                    color: d.active ? '#1d4ed8' : '#57534e',
                  }}
                >
                  <Icon size={17} color={d.active ? '#2563eb' : '#a8a29e'} />
                  {d.label}
                </div>
              );
            })}
          </nav>

          {/* 右侧账户 */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ height: 32, width: 32, borderRadius: '50%', background: '#d6d3d1' }} />
          </div>
        </header>

        {/* ── 主体 flex min-h-0 flex-1 ── */}
        <div style={{ display: 'flex', minHeight: 0, flex: 1 }}>
          {/* SecondaryNav w-56 无边细 rail（与内容同 warm 底色） */}
          <aside
            style={{
              display: 'flex',
              width: 224,
              flexShrink: 0,
              flexDirection: 'column',
              overflowY: 'auto',
              background: '#fafaf7', // --color-warm
              padding: '16px 12px',
            }}
          >
            {NAV_GROUPS.map((g, gi) => (
              <div key={g.title}>
                <div
                  style={{
                    padding: '0 12px 6px',
                    paddingTop: gi === 0 ? 0 : 20, // pt-0 / pt-5
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#a8a29e',
                  }}
                >
                  {g.title}
                </div>
                {g.items.map(it => {
                  const Icon = it.icon;
                  return (
                    <div
                      key={it.label}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: 13,
                        fontWeight: it.active ? 600 : 500,
                        cursor: 'pointer',
                        background: it.active ? '#eff6ff' : 'transparent',
                        color: it.active ? '#1d4ed8' : '#57534e',
                      }}
                    >
                      {/* 选中书签竖条 w-[3px] + 微光 */}
                      {it.active && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 8,
                            bottom: 8,
                            left: 0,
                            width: 3,
                            borderRadius: '0 3px 3px 0',
                            background: '#2563eb',
                            boxShadow: '0 0 8px rgba(59,130,246,0.45)',
                          }}
                        />
                      )}
                      <Icon size={16} color={it.active ? '#2563eb' : '#a8a29e'} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {it.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* main flex-1 overflow-auto px-6 py-4（full-bleed） */}
          <main style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
            <section
              style={{
                background: '#fffefb',
                border: '1px solid rgba(231,229,224,0.4)',
                borderRadius: 12,
                boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
                padding: 20,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: '#1c1917' }}>工作流列表</h3>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['客服意图分流', '文档摘要管线', '多轮检索增强'].map((n, i) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      borderRadius: 8,
                      border: '1px solid rgba(231,229,224,0.6)',
                      padding: '10px 12px',
                      fontSize: 12.5,
                    }}
                  >
                    <Workflow size={16} color="#a8a29e" />
                    <span style={{ flex: 1, color: '#292524', fontWeight: 500 }}>{n}</span>
                    <span style={{ fontSize: 11, color: i === 1 ? '#a8a29e' : '#047857' }}>
                      {i === 1 ? '草稿' : '已发布'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </PreviewFrame>
  );
}
