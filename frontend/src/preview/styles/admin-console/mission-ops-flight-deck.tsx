import { PreviewFrame } from '../../_layout';

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";

const TEXT_1 = 'rgba(255,255,255,0.96)';
const TEXT_2 = 'rgba(255,255,255,0.62)';
const TEXT_3 = 'rgba(255,255,255,0.38)';
const PANEL = '#0a0e1a';
const HAIR = 'rgba(255,255,255,0.07)';
const LINE = 'rgba(255,255,255,0.10)';

const OK = '#34d399';
const INFO = '#22d3ee';
const WARN = '#fbbf24';
const FAIL = '#fb7185';
const PURPLE = '#a78bfa';
const MUTE = '#94a3b8';

const STATE_SWATCHES = [
  { name: 'ok', hex: OK, use: '健康' },
  { name: 'info', hex: INFO, use: '中性' },
  { name: 'warn', hex: WARN, use: '警告' },
  { name: 'fail', hex: FAIL, use: '告警' },
  { name: 'purple', hex: PURPLE, use: '特殊源' },
  { name: 'mute', hex: MUTE, use: '离线' },
];

const BG_LADDER = [
  { name: 'page', hex: '#070a12' },
  { name: 'panel-1', hex: '#0a0e1a' },
  { name: 'panel-2', hex: '#0d1320' },
  { name: 'panel-3', hex: '#121a2c' },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: TEXT_3,
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      {children}
    </section>
  );
}

function MicroKpi({
  code,
  title,
  value,
  unit,
  accent,
}: {
  code: string;
  title: string;
  value: string;
  unit: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: PANEL,
        border: `1px solid ${LINE}`,
        borderLeft: `2px solid ${accent}`,
        padding: '12px 14px',
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: '0.08em',
          color: TEXT_3,
          textTransform: 'uppercase',
        }}
      >
        {code}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 11, color: TEXT_2, marginTop: 4 }}>{title}</div>
      <div
        style={{
          fontFamily: MONO,
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          marginTop: 6,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 500, color: TEXT_1, letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 11, color: TEXT_3 }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function MissionOpsFlightDeckPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <div
        style={{
          fontFamily: SANS,
          color: TEXT_1,
          padding: 40,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            color: OK,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          STYLE · ADMIN-CONSOLE
        </div>
        <h1
          style={{
            fontFamily: MONO,
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: TEXT_1,
          }}
        >
          Mission Ops Flight Deck
        </h1>
        <p
          style={{
            fontSize: 16,
            color: TEXT_2,
            margin: '0 0 12px',
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          把 NASA 任务控制室（MOCR） + Bloomberg Terminal + 量化交易终端的视觉语言抽象出来——给现代工程屏一套统一的"工业仪表盘"调子
        </p>
        <p
          style={{
            fontSize: 14,
            color: TEXT_3,
            margin: '0 0 40px',
            maxWidth: 820,
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: OK }}>信息密度优先</span>——所有视觉决策让位于"一屏看完更多"。
          <span style={{ color: OK }}>机器在跟你说话</span>——UI 主体用 mono 字体（80% 数据 / 标签 / 编号），让画面有"控制台"而不是"网站"的感觉。
          <span style={{ color: OK }}>模块化标识</span>——每个 panel 是独立的"工位"，有自己的 4 字母代号 + σ/max/min 微统计。
        </p>

        <Section label="Palette · 4 层底色 + 6 色严格语义">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              marginBottom: 12,
            }}
          >
            {BG_LADDER.map((b) => (
              <div
                key={b.name}
                style={{
                  background: b.hex,
                  border: `1px solid ${LINE}`,
                  padding: 14,
                  height: 64,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontFamily: MONO, fontSize: 11, color: TEXT_2 }}>{b.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 10.5, color: TEXT_3 }}>{b.hex}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 8,
            }}
          >
            {STATE_SWATCHES.map((s) => (
              <div
                key={s.name}
                style={{
                  background: PANEL,
                  border: `1px solid ${LINE}`,
                  padding: 10,
                }}
              >
                <div style={{ height: 32, background: s.hex, marginBottom: 8 }} />
                <div style={{ fontFamily: MONO, fontSize: 11, color: TEXT_1 }}>{s.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: TEXT_3, marginTop: 2 }}>
                  {s.hex}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: TEXT_2, marginTop: 4 }}>
                  {s.use}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Typography · Mono 主导 80% + Inter 副">
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: TEXT_3,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              EYEBROW · OVRV-MTRX
            </div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 12,
                color: TEXT_2,
                marginBottom: 12,
              }}
            >
              label · 今日总事件
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: TEXT_1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              12.4 <span style={{ fontSize: 14, color: TEXT_3 }}>M</span>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: TEXT_2,
                marginTop: 8,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              data · 142ms / 11/11 ok / σ 0.42
            </div>
          </div>
        </Section>

        <Section label="Component · KPI Card 4 色">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}
          >
            <MicroKpi code="KPI-01" title="今日总事件" value="12.4" unit="M" accent={OK} />
            <MicroKpi code="KPI-02" title="实时成功率" value="98.7" unit="%" accent={INFO} />
            <MicroKpi code="KPI-03" title="P95 延迟" value="142" unit="ms" accent={WARN} />
            <MicroKpi code="KPI-04" title="区域在线" value="11/11" unit="" accent={OK} />
          </div>
        </Section>

        <Section label="Block · Coded Panel Header">
          <div style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderBottom: `1px solid ${HAIR}`,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: OK,
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                OVRV-MTRX
              </span>
              <span style={{ width: 1, height: 11, background: 'rgba(255,255,255,0.18)' }} />
              <span style={{ fontFamily: SANS, fontSize: 12, color: TEXT_2 }}>总览矩阵</span>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  gap: 12,
                  fontFamily: MONO,
                  fontSize: 10.5,
                  color: TEXT_3,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span>
                  σ <span style={{ color: TEXT_2 }}>0.42</span>
                </span>
                <span>
                  max <span style={{ color: TEXT_2 }}>16.0M</span>
                </span>
                <span>
                  min <span style={{ color: TEXT_2 }}>8.2M</span>
                </span>
              </div>
              <span
                style={{
                  marginLeft: 8,
                  width: 4,
                  height: 4,
                  background: OK,
                  borderRadius: '50%',
                  boxShadow: `0 0 0 1px ${OK}66, 0 0 8px ${OK}66`,
                }}
              />
            </div>
            <div
              style={{
                padding: 18,
                fontFamily: MONO,
                fontSize: 11.5,
                color: TEXT_3,
                lineHeight: 1.8,
              }}
            >
              {'<panel-body /> — 这里塞 panel 内容（矩阵 / 列表 / 图表等）'}
            </div>
          </div>
        </Section>

        <Section label="Telemetry · 14 段底部状态栏">
          <div
            style={{
              height: 28,
              border: `1px solid ${LINE}`,
              background: '#070a12',
              display: 'flex',
              alignItems: 'center',
              fontFamily: MONO,
              fontSize: 10.5,
              fontVariantNumeric: 'tabular-nums',
              overflow: 'hidden',
            }}
          >
            {[
              { k: 'CTL', v: 'OPERATIONAL', color: OK, pulse: true },
              { k: 'REGIONS', v: '10/11', color: WARN },
              { k: 'FEED', v: '142/s', color: TEXT_2 },
              { k: 'P95', v: '142ms', color: TEXT_2 },
              { k: 'ALERTS', v: '3 OPEN', color: WARN, pulse: true },
              { k: 'BUILD', v: 'a3f8e21', color: TEXT_3 },
              { k: 'UPTIME', v: '42d 14h', color: TEXT_3 },
              { k: 'MODE', v: 'LIVE', color: OK },
            ].map((t, i) => (
              <div
                key={t.k}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '0 12px',
                  borderRight: i === 7 ? 'none' : `1px solid ${HAIR}`,
                  height: '100%',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.pulse && (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: t.color,
                      boxShadow: `0 0 6px ${t.color}`,
                    }}
                  />
                )}
                <span style={{ color: TEXT_3, letterSpacing: '0.04em' }}>{t.k}</span>
                <span style={{ color: t.color }}>{t.v}</span>
              </div>
            ))}
          </div>
        </Section>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: `1px solid ${HAIR}`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {[
            'react-tailwind',
            'ibm-plex-mono',
            'inter',
            'tabular-nums',
            'coded-panel-header',
            'coded-kpi-card',
            '4-layer-bg',
            '14-seg-telemetry',
          ].map((s) => (
            <span
              key={s}
              style={{
                padding: '4px 10px',
                background: PANEL,
                border: `1px solid ${LINE}`,
                color: TEXT_2,
                fontFamily: MONO,
                fontSize: 10.5,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
