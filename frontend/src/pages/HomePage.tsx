import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRegistry } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';

/**
 * HomePage —— 纯宣传骨架，无功能入口、无客户评价、无定价模块。
 * 结构：Hero → Logo 墙 → 3 段价值点叙事 → Manifesto → Footer
 */
export default function HomePage() {
  const nav = useNavigate();
  const reg = useRegistry();

  // 从 registry 挑一组真实条目做 logo wall 展示（纯显示，不可点）
  const wallItems = (reg?.items ?? []).slice(0, 8).map((i) => i.name);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      {/* ============================================================
          Hero — 占满首屏，大标题 + 单一 CTA
         ============================================================ */}
      <section className="relative overflow-hidden border-b border-slate-100">
        {/* 冷感装饰 blobs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-100/50 blur-3xl sv-anim-blob" />
        <div className="pointer-events-none absolute -right-40 top-20 h-[440px] w-[440px] rounded-full bg-slate-200/55 blur-3xl sv-anim-blob-slow" />

        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1200px] flex-col items-center justify-center px-8 py-24 text-center">
          <div className="sv-anim-fade-up sv-delay-0 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Style Vault · v2
          </div>

          <h1 className="sv-anim-fade-up sv-delay-150 mt-8 max-w-[1000px] font-display text-[72px] font-semibold leading-[1.02] tracking-[-0.035em] text-slate-900 md:text-[96px]">
            A vault of distinctive UI styles,
            <br />
            <span className="bg-gradient-to-br from-cyan-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              from token to product.
            </span>
          </h1>

          <p className="sv-anim-fade-up sv-delay-300 mx-auto mt-8 max-w-[640px] text-[17px] leading-[1.7] text-slate-500">
            Six layers. Six clear categories. Built to feed AI coding with style
            that doesn't look AI-made.
          </p>

          <div className="sv-anim-fade-up sv-delay-500 mt-12">
            <button
              type="button"
              onClick={() => nav('/browse')}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-slate-900 px-9 text-[15px] font-medium text-white shadow-[0_20px_48px_-20px_rgba(15,23,42,0.6)] transition hover:bg-slate-800"
            >
              Browse the Vault
              <ArrowRightOutlined className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          Logo 墙 — 纯展示，不可点
         ============================================================ */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-[1200px] px-8 py-16 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
            Covering the full aesthetic range
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {wallItems.map((name) => (
              <span
                key={name}
                className="font-display text-[20px] font-medium tracking-[-0.01em] text-slate-600"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          价值点 3 段叙事
         ============================================================ */}
      <section className="mx-auto max-w-[1200px] px-8 py-32">
        <div className="space-y-36">
          <ValueBlock
            n="01"
            title="Six layers, from token to product."
            body="From the smallest color swatch to a complete product shell, every layer has a clear boundary. Tokens feed Components feed Blocks feed Pages feed Styles feed Products—each can stand alone or nest."
            illust={<LayerStack />}
          />
          <ValueBlock
            n="02"
            title="Built for AI coding."
            body="Every entry ships with a curated prompt payload. Copy it into your AI copilot and get style-faithful code out the other end—no generic 'AI-slop' aesthetic."
            illust={<PromptPayload />}
            flip
          />
          <ValueBlock
            n="03"
            title="Cross-platform by design."
            body="Browse by Web, iOS, or Android. Styles travel across surfaces; individual components may differ, but the vibe stays—by design."
            illust={<PlatformTrio />}
          />
        </div>
      </section>

      {/* ============================================================
          Manifesto
         ============================================================ */}
      <section className="border-y border-slate-100 bg-slate-900 text-white">
        <div className="relative mx-auto max-w-[1000px] px-8 py-32 text-center">
          <div className="pointer-events-none absolute -left-24 top-10 h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[200px] w-[200px] rounded-full bg-slate-500/15 blur-3xl" />

          <p className="relative font-display text-[44px] font-medium leading-[1.15] tracking-[-0.02em] md:text-[52px]">
            Good design is <span className="italic text-cyan-300">seen</span>.
            <br />
            Great design is <span className="italic text-cyan-300">remembered</span>.
          </p>
          <p className="relative mt-10 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
            Style Vault · Curated for makers
          </p>
        </div>
      </section>

      {/* ============================================================
          Footer
         ============================================================ */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-8 py-10 text-[12px] text-slate-400">
          <span className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-5 w-5 opacity-70" />
            <span className="font-display text-[14px] font-medium text-slate-500">
              Style Vault
            </span>
          </span>
          <span>© 2026 Style Vault</span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-700"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ---------- 局部组件 ---------- */

function ValueBlock({
  n,
  title,
  body,
  illust,
  flip = false,
}: {
  n: string;
  title: string;
  body: string;
  illust: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20 ${
        flip ? 'md:[&>*:first-child]:order-last' : ''
      }`}
    >
      <div>
        <div className="font-mono text-[13px] tracking-widest text-slate-400">{n}</div>
        <h2 className="mt-5 font-display text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] text-slate-900">
          {title}
        </h2>
        <p className="mt-6 max-w-[480px] text-[16px] leading-[1.75] text-slate-500">
          {body}
        </p>
      </div>
      <div className="relative">{illust}</div>
    </div>
  );
}

/* ---------- 小插图（纯 SVG/CSS，保持品牌调性） ---------- */

function LayerStack() {
  const layers = [
    { label: 'PRODUCTS', shade: 'bg-slate-900 text-white' },
    { label: 'STYLES', shade: 'bg-slate-800 text-white' },
    { label: 'PAGES', shade: 'bg-slate-700 text-white' },
    { label: 'BLOCKS', shade: 'bg-slate-500 text-white' },
    { label: 'COMPONENTS', shade: 'bg-slate-300 text-slate-900' },
    { label: 'TOKENS', shade: 'bg-slate-100 text-slate-700' },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {layers.map((l, i) => (
        <div
          key={l.label}
          className={`${l.shade} rounded-md px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em]`}
          style={{ marginLeft: `${i * 8}px`, marginRight: `${(layers.length - 1 - i) * 8}px` }}
        >
          {l.label}
        </div>
      ))}
    </div>
  );
}

function PromptPayload() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 font-mono text-[12px] leading-relaxed text-slate-300 shadow-[0_30px_60px_-24px_rgba(15,23,42,0.3)]">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[11px] text-slate-500">prompt.md</span>
      </div>
      <div className="px-5 py-5">
        <div className="text-slate-500">## Style Vault prompt</div>
        <div className="mt-2">
          <span className="text-cyan-300">use</span> styles/saas-tool/
          <span className="text-emerald-300">cold-industrial-saas</span>
        </div>
        <div className="mt-1">
          <span className="text-cyan-300">with</span> tokens/palettes/
          <span className="text-emerald-300">slate-cyan-ice</span>
        </div>
        <div className="mt-3 text-slate-500">→ build a pricing page</div>
        <div className="mt-2 text-slate-500">→ match block/pricing-table</div>
        <div className="mt-5 text-slate-500"># AI copilot writes …</div>
        <div className="mt-1">
          <span className="text-slate-400">export default</span>{' '}
          <span className="text-cyan-300">function</span>{' '}
          <span className="text-emerald-300">Pricing</span>() {`{`}
        </div>
        <div className="pl-4 text-slate-500">// style-faithful code</div>
        <div>{`}`}</div>
      </div>
    </div>
  );
}

function PlatformTrio() {
  const frames = [
    { label: 'WEB', w: 'w-[240px]', h: 'h-[160px]' },
    { label: 'IOS', w: 'w-[100px]', h: 'h-[180px]' },
    { label: 'ANDROID', w: 'w-[100px]', h: 'h-[180px]' },
  ];
  return (
    <div className="flex items-end gap-4">
      {frames.map((f) => (
        <div
          key={f.label}
          className={`${f.w} ${f.h} relative rounded-xl border border-slate-200 bg-slate-50`}
        >
          <div className="absolute inset-0 rounded-xl border border-white" />
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                'repeating-linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) 10px, transparent 10px, transparent 20px)',
            }}
          />
          <div className="absolute bottom-3 left-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {f.label}
          </div>
        </div>
      ))}
    </div>
  );
}
