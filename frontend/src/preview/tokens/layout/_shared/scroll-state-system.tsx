import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const SCENARIOS: Array<{
  badge: string;
  title: string;
  trigger: string;
  store: string;
  behavior: string;
  accent: string;
}> = [
  {
    badge: 'A',
    title: 'Tab 间记忆',
    trigger: '同域不同 pathname',
    store: 'byPath',
    behavior: '切回还原各自位置',
    accent: '#0891b2',
  },
  {
    badge: 'B',
    title: 'Click 入详情',
    trigger: 'PUSH · 新 pathname',
    store: 'top + 30 帧钉顶',
    behavior: '新页置顶不回弹',
    accent: '#f59e0b',
  },
  {
    badge: 'C',
    title: '浏览器后退/前进',
    trigger: 'POP · history.key 还原',
    store: 'byKey 优先',
    behavior: '精准回到历史位置',
    accent: '#a855f7',
  },
  {
    badge: 'D',
    title: '懒加载零位移',
    trigger: 'sentinel 触底',
    store: 'IO + overflow-anchor:none',
    behavior: '视口下方追加不跳',
    accent: '#10b981',
  },
];

/** 单场景卡 · viewport 模拟 + 行为示意 */
function ScenarioCard({ s }: { s: (typeof SCENARIOS)[number] }) {
  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* badge 头 */}
      <header
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 6,
            background: s.accent,
            color: '#fff',
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {s.badge}
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '-0.01em',
          }}
        >
          {s.title}
        </span>
      </header>

      {/* 视口示意：左旧右新，箭头表示行为 */}
      <div
        style={{
          padding: 18,
          background: '#fafafa',
          display: 'grid',
          gridTemplateColumns: '1fr 28px 1fr',
          gap: 8,
          alignItems: 'stretch',
        }}
      >
        <FakeViewport phase="before" badge={s.badge} accent={s.accent} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: s.accent,
            fontSize: 18,
          }}
        >
          →
        </div>
        <FakeViewport phase="after" badge={s.badge} accent={s.accent} />
      </div>

      {/* 三行 meta */}
      <dl
        style={{
          padding: '14px 18px',
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          rowGap: 6,
          columnGap: 12,
          fontFamily: SANS,
          fontSize: 12,
        }}
      >
        <dt style={{ color: '#94a3b8', fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>触发</dt>
        <dd style={{ margin: 0, color: '#475569' }}>{s.trigger}</dd>
        <dt style={{ color: '#94a3b8', fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>存储</dt>
        <dd style={{ margin: 0, color: '#475569', fontFamily: MONO, fontSize: 11 }}>{s.store}</dd>
        <dt style={{ color: '#94a3b8', fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>行为</dt>
        <dd style={{ margin: 0, color: '#0f172a', fontWeight: 500 }}>{s.behavior}</dd>
      </dl>
    </article>
  );
}

/** 迷你视口示意 · 用色块表示视口内容 + 高亮当前 scrollY 位置 */
function FakeViewport({
  phase,
  badge,
  accent,
}: {
  phase: 'before' | 'after';
  badge: string;
  accent: string;
}) {
  // 4 场景 × 2 phase = 8 个状态，硬编码每种的可视化
  const config = (() => {
    if (badge === 'A') {
      // tab 间记忆：before=tab1 滚到中间，after=切去 tab2 又切回还原
      return phase === 'before'
        ? { highlight: 50, opacity: 1, label: 'tab 1' }
        : { highlight: 50, opacity: 1, label: 'tab 1 ↻' };
    }
    if (badge === 'B') {
      // click 入详情：before 中间，after 顶部（钉顶）
      return phase === 'before'
        ? { highlight: 50, opacity: 1, label: '列表' }
        : { highlight: 5, opacity: 1, label: '详情 ↑' };
    }
    if (badge === 'C') {
      // 后退还原：before 顶部，after 还原到中间
      return phase === 'before'
        ? { highlight: 5, opacity: 0.5, label: '当前' }
        : { highlight: 60, opacity: 1, label: '历史 ↻' };
    }
    // D · 懒加载：before 中间，after 中间不动 + 下方有新内容
    return phase === 'before'
      ? { highlight: 60, opacity: 1, label: '渲染区', extraTail: false }
      : { highlight: 60, opacity: 1, label: '不位移', extraTail: true };
  })();

  return (
    <div
      style={{
        position: 'relative',
        height: 120,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* "页面内容"色阶 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(180deg, #f8fafc 0 12px, #f1f5f9 12px 24px)',
          opacity: config.opacity,
        }}
      />
      {/* 高亮 = 当前滚动条位置（视口内黄线） */}
      <div
        style={{
          position: 'absolute',
          left: 4,
          right: 4,
          top: `${config.highlight}%`,
          height: 14,
          borderRadius: 4,
          background: `${accent}33`,
          border: `1.5px solid ${accent}`,
          boxShadow: `0 4px 12px -4px ${accent}`,
        }}
      />
      {/* 懒加载 D · after 阶段下方 tail 区表示"新增的内容" */}
      {badge === 'D' && phase === 'after' && (
        <div
          style={{
            position: 'absolute',
            left: 4,
            right: 4,
            bottom: 4,
            height: '40%',
            borderRadius: 4,
            background:
              'repeating-linear-gradient(135deg, #d1fae5 0 6px, #a7f3d0 6px 12px)',
            border: '1px dashed #10b981',
          }}
        />
      )}
      {/* 状态标签 */}
      <span
        style={{
          position: 'absolute',
          left: 6,
          bottom: 4,
          fontFamily: MONO,
          fontSize: 9,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          background: 'rgba(255,255,255,0.85)',
          padding: '1px 5px',
          borderRadius: 3,
        }}
      >
        {config.label}
      </span>
    </div>
  );
}

export default function ScrollStateSystemPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        <header style={{ marginBottom: 24, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 8,
            }}
          >
            tokens / layout / _shared
          </div>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Scroll State System
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#64748b',
              margin: '12px auto 0',
              maxWidth: 640,
              lineHeight: 1.7,
            }}
          >
            一套 SPA 滚动行为契约 · 4 场景统一接管 · 双 Map (byKey + byPath)
            还原 + IO sentinel 懒加载零位移
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
        >
          {SCENARIOS.map((s) => (
            <ScenarioCard key={s.badge} s={s} />
          ))}
        </div>

        <footer
          style={{
            marginTop: 32,
            padding: '20px 24px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 10,
            }}
          >
            Glue · 全局挂载
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: MONO,
              fontSize: 12,
              color: '#0f172a',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}
          >
{`// App.tsx — 一次挂载
<ScrollToTop />        // ScrollToTop 接管 byKey/byPath 还原
<Routes>...</Routes>

// 列表页 — 接入 hook
const { visible, sentinelRef, hasMore } = useInfiniteList(items, cols, {
  cacheKey: \`browse:\${type}\`,   // 跨切换持久翻页位置
});`}
          </pre>
        </footer>
      </div>
    </PreviewFrame>
  );
}
