import { PreviewFrame } from '../../../_layout';

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'Self-serve · 1 project · community support',
    cta: 'Start tracing',
    ctaVariant: 'ghost' as const,
    features: [
      '10,000 events / month',
      '7-day metric retention',
      '5 alert rules',
      'Single workspace',
      'Email support',
    ],
  },
  {
    name: 'Team',
    price: '$99',
    period: 'per workspace / month',
    desc: 'Production-grade observability for growing teams',
    cta: 'Start free trial',
    ctaVariant: 'cyan' as const,
    highlight: true,
    features: [
      '5M events / month',
      '90-day metric retention',
      'Unlimited alert rules',
      'PagerDuty / Slack integrations',
      'Priority email + chat support',
      'SSO via OIDC',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Contact',
    period: 'custom volume + SLA',
    desc: 'Dedicated infra · audit · SCIM · white-glove onboarding',
    cta: 'Talk to sales',
    ctaVariant: 'ghost' as const,
    features: [
      'Custom event volume',
      '12-month metric retention',
      'Dedicated support engineer',
      'SCIM / SAML / audit logs',
      'On-prem / VPC deploy',
      'Uptime SLA · 99.99%',
    ],
  },
];

const MATRIX_GROUPS = [
  {
    name: 'Volume',
    rows: [
      ['Events / month', '10K', '5M', 'Custom'],
      ['Metric retention', '7d', '90d', '12mo'],
      ['Alert rules', '5', 'Unlimited', 'Unlimited'],
    ],
  },
  {
    name: 'Integrations',
    rows: [
      ['PagerDuty', '–', '✓', '✓'],
      ['Slack / Teams', '✓', '✓', '✓'],
      ['Webhooks', '–', '✓', '✓'],
      ['Custom OIDC SSO', '–', '✓', '✓'],
      ['SCIM provisioning', '–', '–', '✓'],
    ],
  },
  {
    name: 'Support',
    rows: [
      ['Community forum', '✓', '✓', '✓'],
      ['Email response', '48h', '12h', '4h'],
      ['Chat support', '–', '✓', '✓'],
      ['Dedicated CSM', '–', '–', '✓'],
      ['Uptime SLA', '–', '–', '99.99%'],
    ],
  },
];

const FAQ = [
  { q: 'How is event volume measured?', a: 'Each ingest API call counts as one event. Internal computed metrics and synthetic checks do not count.' },
  { q: 'Can I switch plans mid-cycle?', a: 'Yes. Upgrades prorate immediately; downgrades take effect at the next billing cycle.' },
  { q: 'Do you offer non-profit / academic pricing?', a: 'Yes — verified non-profits get 50% off Team. Contact sales with proof.' },
  { q: 'Is there a self-hosted option?', a: 'Self-hosted (VPC / on-prem) is Enterprise-only and includes a dedicated deploy engineer.' },
];

export default function SaasColdPricingPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <div
        style={{
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#e2e8f0',
          padding: '80px 56px 96px',
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#22d3ee', textTransform: 'uppercase', marginBottom: 12 }}>
            Pricing
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Pay for what you observe.
          </h1>
          <p style={{ marginTop: 16, color: '#94a3b8', fontSize: 16, maxWidth: 520, marginInline: 'auto' }}>
            Plex Mono timestamps included. No credit card for Starter.
          </p>

          {/* monthly / yearly toggle */}
          <div style={{ display: 'inline-flex', marginTop: 28, background: '#0b1220', border: '1px solid #1e293b', borderRadius: 4 }}>
            {['Monthly', 'Yearly · -20%'].map((t, i) => (
              <div
                key={t}
                style={{
                  padding: '8px 18px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: i === 0 ? '#0f172a' : '#94a3b8',
                  background: i === 0 ? '#22d3ee' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Plans 3 column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 80 }}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              style={{
                background: '#0f172a',
                border: p.highlight ? '1px solid #22d3ee' : '1px solid #1e293b',
                borderRadius: 4,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {p.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 24,
                    background: '#22d3ee',
                    color: '#0f172a',
                    padding: '2px 8px',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: "'IBM Plex Mono', monospace",
                    borderRadius: 2,
                  }}
                >
                  Recommended
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#cbd5e1' }}>
                {p.name}
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 36, fontWeight: 500, color: '#f1f5f9', lineHeight: 1 }}>
                  {p.price}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.05em' }}>
                {p.period}
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 16, lineHeight: 1.55 }}>
                {p.desc}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 13,
                      color: '#cbd5e1',
                    }}
                  >
                    <span style={{ color: '#22d3ee', marginTop: 1 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                style={{
                  marginTop: 28,
                  height: 40,
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: p.ctaVariant === 'ghost' ? '1px solid #475569' : 'none',
                  background: p.ctaVariant === 'cyan' ? '#22d3ee' : 'transparent',
                  color: p.ctaVariant === 'cyan' ? '#0f172a' : '#e2e8f0',
                  fontFamily: 'inherit',
                  transition: 'all 150ms ease-out',
                }}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature matrix */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 24, color: '#e2e8f0' }}>
            Compare plans
          </h2>
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/* matrix header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                background: '#0b1220',
                borderBottom: '1px solid #1e293b',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#64748b',
                height: 36,
                alignItems: 'center',
              }}
            >
              <div style={{ padding: '0 16px' }}>Feature</div>
              <div style={{ padding: '0 16px', textAlign: 'center' }}>Starter</div>
              <div style={{ padding: '0 16px', textAlign: 'center', color: '#22d3ee' }}>Team</div>
              <div style={{ padding: '0 16px', textAlign: 'center' }}>Enterprise</div>
            </div>
            {MATRIX_GROUPS.map((g) => (
              <div key={g.name}>
                <div
                  style={{
                    background: 'rgba(15,23,42,0.7)',
                    borderTop: '1px solid #1e293b',
                    padding: '10px 16px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                  }}
                >
                  {g.name}
                </div>
                {g.rows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      borderTop: '1px solid rgba(30,41,59,0.4)',
                      height: 40,
                      alignItems: 'center',
                      fontSize: 13,
                    }}
                  >
                    <div style={{ padding: '0 16px', color: '#cbd5e1' }}>{row[0]}</div>
                    {row.slice(1).map((cell, j) => (
                      <div
                        key={j}
                        style={{
                          padding: '0 16px',
                          textAlign: 'center',
                          fontFamily: cell === '✓' || cell === '–' ? 'inherit' : "'IBM Plex Mono', monospace",
                          color: cell === '–' ? '#475569' : cell === '✓' ? '#22d3ee' : '#e2e8f0',
                          fontSize: cell === '✓' || cell === '–' ? 14 : 12,
                        }}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 24, color: '#e2e8f0' }}>
            Frequently asked
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQ.map((f, i) => (
              <div
                key={i}
                style={{
                  borderTop: '1px solid #1e293b',
                  borderBottom: i === FAQ.length - 1 ? '1px solid #1e293b' : 'none',
                  padding: '20px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#e2e8f0' }}>{f.q}</span>
                  <span style={{ color: '#64748b', fontSize: 18 }}>{i === 0 ? '−' : '+'}</span>
                </div>
                {i === 0 && (
                  <div style={{ marginTop: 12, color: '#94a3b8', fontSize: 14, lineHeight: 1.65, maxWidth: 720 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
