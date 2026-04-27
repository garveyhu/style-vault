import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRegistry } from "../data/useRegistry";
import { TopBar } from "../components/TopBar";

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
            Style Vault · 风格库
          </div>

          <h1 className="sv-anim-fade-up sv-delay-150 mt-8 max-w-[1000px] font-display text-[64px] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 md:text-[88px]">
            为 AI 编码而造的
            <br />
            <span className="bg-gradient-to-br from-cyan-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              设计风格库
            </span>
          </h1>

          <p className="sv-anim-fade-up sv-delay-300 mx-auto mt-8 max-w-[560px] text-[17px] leading-[1.8] text-slate-500">
            六个层级，六道清晰边界。
            <br />让 AI 写出的代码，不再有千篇一律的"AI 味"。
          </p>

          <div className="sv-anim-fade-up sv-delay-500 mt-12">
            <button
              type="button"
              onClick={() => nav("/browse")}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-slate-900 px-9 text-[15px] font-medium text-white shadow-[0_20px_48px_-20px_rgba(15,23,42,0.6)] transition hover:bg-slate-800"
            >
              进入风格库
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
            覆盖完整的美学光谱 · Curated aesthetic range
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
            title="六层结构，从 Token 到 Product。"
            body="从最小的色卡到完整的产品外壳，每一层都有明确的边界。Tokens 喂 Components，Components 拼 Blocks，Blocks 组 Pages，Pages 成 Styles，Styles 汇聚为 Products——每层都能单独取用，也可层层嵌套。"
            illust={<LayerStack />}
          />
          <ValueBlock
            n="02"
            title="为 AI 编码而生。"
            body="每条资产都附带一份精心调好的 Prompt 模板。粘进你的 AI Copilot，产出的代码自带风格，不再有那种一眼就能认出的「AI slop」审美。"
            illust={<PromptPayload />}
            flip
          />
          <ValueBlock
            n="03"
            title="天生跨端，调性如一。"
            body="按 Web / iOS / Android 浏览。同一种风格在不同端之间流转——具体组件可以不同，但整体调性始终如一。"
            illust={<PlatformTrio />}
          />
        </div>
      </section>

      {/* ============================================================
          Manifesto
         ============================================================ */}
      <section className="border-y border-slate-100 bg-slate-900 text-white">
        <div className="relative mx-auto max-w-[1000px] px-8 py-20 text-center">
          <div className="pointer-events-none absolute -left-24 top-10 h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[200px] w-[200px] rounded-full bg-slate-500/15 blur-3xl" />

          <p className="relative font-display text-[40px] font-medium leading-[1.2] tracking-[-0.015em] md:text-[52px]">
            好设计会被<span className="italic text-cyan-300">看见</span>，
            <br />
            伟大的设计会被<span className="italic text-cyan-300">记住</span>。
          </p>
          <p className="relative mt-10 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
            Style Vault · 为设计精选
          </p>
        </div>
      </section>

      {/* ============================================================
          Footer
         ============================================================ */}
      <footer className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 px-12 py-5 text-[12px] text-slate-400">
          <span className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-5 w-5 opacity-80" />
            <span className="font-display text-[14px] font-medium text-slate-500">
              Style Vault · 风格库
            </span>
          </span>
          <div className="flex items-center gap-6">
            <span>© 2026 Style Vault</span>
            <span className="h-3 w-px bg-slate-200" />
            <a
              href="https://github.com/garveyhu/style-vault"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-700"
            >
              GitHub
            </a>
          </div>
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
        flip ? "md:[&>*:first-child]:order-last" : ""
      }`}
    >
      <div>
        <div className="font-mono text-[13px] tracking-widest text-slate-400">
          {n}
        </div>
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

/**
 * 01 · 六层结构 · isometric 立体盒透视
 * PRODUCT 顶部最宽（cyan 渐变高亮，"聚合"语义）→ TOKEN 底部最窄（"原子"语义）。
 * 6 个菱形面顶尾相接、按宽度递减整齐叠下。
 */
function LayerStack() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="h-auto w-full max-w-[440px]"
      aria-label="六层结构 · 从 Token 到 Product"
    >
      <defs>
        <linearGradient id="sv-product-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>

      {/* PRODUCT · 顶部最宽 · cyan 渐变高亮 */}
      <g>
        <path
          d="M40 40 L180 65 L320 40 L180 15 Z"
          fill="url(#sv-product-face)"
          stroke="#0891b2"
        />
        <text
          x="180"
          y="44"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fill="#fff"
        >
          PRODUCT
        </text>
      </g>

      {/* STYLES */}
      <g>
        <path
          d="M62 85 L180 107 L298 85 L180 63 Z"
          fill="#1e293b"
          stroke="#0f172a"
        />
        <text
          x="180"
          y="89"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fill="#fff"
        >
          STYLES
        </text>
      </g>

      {/* PAGES */}
      <g>
        <path
          d="M84 125 L180 143 L276 125 L180 107 Z"
          fill="#475569"
          stroke="#334155"
        />
        <text
          x="180"
          y="129"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fill="#fff"
        >
          PAGES
        </text>
      </g>

      {/* BLOCKS */}
      <g>
        <path
          d="M106 158 L180 173 L254 158 L180 143 Z"
          fill="#94a3b8"
          stroke="#64748b"
        />
        <text
          x="180"
          y="162"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fill="#fff"
        >
          BLOCKS
        </text>
      </g>

      {/* COMPONENTS */}
      <g>
        <path
          d="M126 187 L180 199 L234 187 L180 175 Z"
          fill="#cbd5e1"
          stroke="#94a3b8"
        />
        <text
          x="180"
          y="191"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2"
          fill="#0f172a"
        >
          COMPONENTS
        </text>
      </g>

      {/* TOKENS · 底部最窄 */}
      <g>
        <path
          d="M146 210 L180 220 L214 210 L180 200 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
        />
        <text
          x="180"
          y="213"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#475569"
        >
          TOKENS
        </text>
      </g>

      {/* 注释 · 顶部贴近 PRODUCT、底部贴近 TOKEN */}
      <text x="36" y="11" fontSize="11" fill="#64748b" fontStyle="italic">
        越上越聚合、越具象
      </text>
      <text x="36" y="240" fontSize="11" fill="#64748b" fontStyle="italic">
        越下越原子、越基础
      </text>
    </svg>
  );
}

/**
 * 02 · 为 AI 编码而生
 * Prompt 卡 → 真实 Pricing 渲染（双联）
 */
function PromptPayload() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      {/* Prompt 卡 */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.18)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Prompt
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-[11px]">
          <div className="text-slate-500">use:</div>
          <div className="rounded bg-slate-50 px-2 py-1 text-slate-800">
            styles/cold-saas
          </div>
          <div className="mt-2 text-slate-500">with:</div>
          <div className="rounded bg-slate-50 px-2 py-1 text-slate-800">
            tokens/slate-cyan-ice
          </div>
          <div className="mt-2 text-slate-500">build:</div>
          <div className="rounded bg-cyan-50 px-2 py-1 text-cyan-800">
            pricing-table
          </div>
        </div>
      </div>

      {/* 中间箭头 */}
      <div className="flex flex-col items-center">
        <div className="h-px w-10 bg-slate-300" />
        <div className="-mt-1.5 text-[18px] text-slate-400">▸</div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-slate-400">
          AI
        </div>
      </div>

      {/* 真实渲染输出 */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.18)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Pricing
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-1.5">
            <span className="text-[12px] font-semibold text-slate-900">
              Free
            </span>
            <span className="font-mono text-[11px] text-slate-400">$0</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-cyan-300 bg-cyan-50 px-3 py-1.5">
            <span className="text-[12px] font-semibold text-slate-900">
              Pro
            </span>
            <span className="font-mono text-[11px] font-semibold text-cyan-700">
              $24
            </span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-1.5">
            <span className="text-[12px] font-semibold text-slate-900">
              Team
            </span>
            <span className="font-mono text-[11px] text-slate-400">$99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 03 · 天生跨端，调性如一
 * 三屏交叠 · 渐变层叠（前 iPhone · 中 Browser · 后 Android）
 */
function PlatformTrio() {
  return (
    <div className="relative h-[280px] w-full">
      {/* 后 · Android */}
      <div className="absolute left-[6%] top-[18%] h-[180px] w-[110px] overflow-hidden rounded-[14px] border-2 border-slate-700 bg-white opacity-70 shadow-md">
        <div className="mx-auto mt-2 h-1 w-1 rounded-full bg-slate-700" />
        <div className="mt-3 flex flex-col items-center px-2">
          <div className="text-[9px] font-bold text-slate-900">Style</div>
          <div className="text-[9px] font-bold text-cyan-600">Vault</div>
        </div>
      </div>

      {/* 中 · Browser */}
      <div className="absolute left-[24%] top-[24%] flex h-[170px] w-[260px] flex-col rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-12px_rgba(15,23,42,0.3)]">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-[15px] font-bold text-slate-900">
            Style <span className="text-cyan-600">Vault</span>
          </div>
        </div>
      </div>

      {/* 前 · iPhone */}
      <div className="absolute right-[8%] top-[10%] flex h-[210px] w-[120px] flex-col overflow-hidden rounded-[22px] border-[3px] border-slate-900 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.4)]">
        <div className="mx-auto mt-1.5 h-2.5 w-14 rounded-b-xl bg-slate-900" />
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-3">
          <div className="text-[11px] font-bold text-slate-900">Style</div>
          <div className="text-[11px] font-bold text-cyan-600">Vault</div>
          <div className="mt-2 rounded-full bg-cyan-500 px-3 py-1 text-[9px] font-bold text-white">
            Open
          </div>
        </div>
      </div>
    </div>
  );
}
