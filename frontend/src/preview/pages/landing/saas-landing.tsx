import { PreviewFrame } from '../../_layout';

/**
 * SaaS Landing archetype preview
 * 仅结构，色字通过 CSS 变量 / Tailwind 占位展示，vibe 可覆盖。
 */
export default function SaasLandingPreview() {
  return (
    <PreviewFrame padded={false} bg="var(--color-bg, #0f172a)">
      <div
        style={{
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          color: 'var(--color-fg, #e2e8f0)',
          background: 'var(--color-bg, #0f172a)',
          minHeight: '100vh',
        }}
      >
        {/* 顶栏 */}
        <header className="max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
          <div className="text-lg font-semibold">Brand</div>
          <nav className="flex gap-6 text-sm opacity-80">
            <a>Features</a>
            <a>Pricing</a>
            <a>Docs</a>
            <a>Sign in</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <h1
            className="text-5xl md:text-6xl font-semibold leading-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ship faster with a toolkit
            <br />
            your team actually uses.
          </h1>
          <p className="text-lg opacity-70 max-w-xl mb-8">
            支撑副文两行，交代产品定位与目标受众。节奏紧凑但不拥挤，
            留白由 archetype 规定，色字由 vibe 注入。
          </p>
          <div className="flex gap-3">
            <button
              className="px-6 py-3 text-base font-medium rounded"
              style={{ background: 'var(--color-accent, #22d3ee)', color: '#0f172a' }}
            >
              Get started
            </button>
            <button
              className="px-6 py-3 text-base font-medium rounded border"
              style={{ borderColor: 'currentColor', background: 'transparent' }}
            >
              Read the docs
            </button>
          </div>
        </section>

        {/* Logo 墙 */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="text-xs uppercase tracking-widest opacity-50 mb-6">
            Trusted by teams at
          </div>
          <div className="flex flex-wrap gap-10 opacity-60">
            {['ACME', 'LOREM', 'IPSUM', 'DOLOR', 'SIT', 'AMET'].map((n) => (
              <div key={n} className="text-2xl font-semibold tracking-wider">
                {n}
              </div>
            ))}
          </div>
        </section>

        {/* Feature Grid 3x2 */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10">
          <h2 className="text-3xl font-semibold mb-12">Everything you need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'Composable', d: '按需组合的 atom/composite，不绑死一套 design system。' },
              { t: 'Themable', d: 'vibe 注入整站调性，archetype 保持结构不变。' },
              { t: 'Type-safe', d: '完整 TypeScript 类型，Ant Design 底座稳。' },
              { t: 'Ship ready', d: '真实 preview 可点，不止是截图或 Figma。' },
              { t: 'Open', d: '本地 Markdown + frontmatter，无平台锁定。' },
              { t: 'Traceable', d: 'uses / usedBy 双向索引，改一处知所有。' },
            ].map((f) => (
              <div key={f.t}>
                <div
                  className="w-10 h-10 mb-4 rounded"
                  style={{ background: 'var(--color-accent, #22d3ee)', opacity: 0.2 }}
                />
                <h3 className="text-lg font-semibold mb-2">{f.t}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10">
          <h2 className="text-3xl font-semibold mb-12 text-center">Simple pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Free', p: '$0', f: ['5 projects', 'Community support'] },
              { t: 'Pro', p: '$19', f: ['Unlimited projects', 'Priority support', 'Team seats'], hot: true },
              { t: 'Enterprise', p: 'Custom', f: ['SLA', 'SSO', 'Dedicated manager'] },
            ].map((tier) => (
              <div
                key={tier.t}
                className="border rounded p-8"
                style={{
                  borderColor: tier.hot ? 'var(--color-accent, #22d3ee)' : 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="text-sm uppercase tracking-widest opacity-60">{tier.t}</div>
                <div className="text-4xl font-semibold my-4">{tier.p}</div>
                <ul className="text-sm opacity-80 space-y-2 mb-6">
                  {tier.f.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>
                <button
                  className="w-full py-2 rounded font-medium"
                  style={{
                    background: tier.hot ? 'var(--color-accent, #22d3ee)' : 'transparent',
                    color: tier.hot ? '#0f172a' : 'currentColor',
                    border: tier.hot ? '0' : '1px solid currentColor',
                  }}
                >
                  {tier.t === 'Enterprise' ? 'Contact sales' : 'Choose'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10 text-center">
          <h2 className="text-4xl font-semibold mb-4" style={{ letterSpacing: '-0.01em' }}>
            Ready to ship?
          </h2>
          <p className="opacity-70 mb-8">Start with the free plan. No credit card required.</p>
          <button
            className="px-8 py-3 text-base font-medium rounded"
            style={{ background: 'var(--color-accent, #22d3ee)', color: '#0f172a' }}
          >
            Get started — free
          </button>
        </section>

        <footer className="max-w-6xl mx-auto px-6 py-10 text-xs opacity-50 border-t border-white/10">
          © 2026 Brand. All rights reserved.
        </footer>
      </div>
    </PreviewFrame>
  );
}
