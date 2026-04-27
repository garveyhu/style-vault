import { useState } from 'react';
import {
  BarChart3, Bot, Database, Feather, FolderOpen, Globe,
  MessageSquare, Send, Shield, Sparkles, Tv, Zap,
} from 'lucide-react';
import { PreviewFrame } from '../_layout';

const THEMES = [
  { name: 'blue',   hex: '#60a5fa' },
  { name: 'green',  hex: '#10b981' },
  { name: 'yellow', hex: '#fbbf24' },
  { name: 'pink',   hex: '#f472b6' },
  { name: 'orange', hex: '#fb923c' },
  { name: 'gray',   hex: '#64748b' },
  { name: 'purple', hex: '#a78bfa' },
  { name: 'red',    hex: '#f87171' },
  { name: 'indigo', hex: '#818cf8' },
  { name: 'teal',   hex: '#2dd4bf' },
  { name: 'cyan',   hex: '#22d3ee' },
  { name: 'rose',   hex: '#fb7185' },
];

export default function SageProductPreview() {
  const [themeIdx, setThemeIdx] = useState(1); // green default
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ minHeight: 720, padding: '40px 48px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        {/* Hero · brand block */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>
                AI · WEB
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <span style={{
                width: 64, height: 64, borderRadius: 16,
                background: t.hex, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, fontWeight: 800,
                boxShadow: `0 10px 25px -5px ${t.hex}66, 0 4px 6px -4px ${t.hex}4D`,
                transition: 'all 200ms',
              }}>S</span>
              <div>
                <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>Sage</h1>
                <p style={{ fontSize: 15, color: '#64748b', margin: '4px 0 0', maxWidth: 520 }}>
                  AI 数据分析平台 · 多智能体 NL→SQL · 12 主题色个性化
                </p>
              </div>
            </div>
          </div>

          {/* 12 主题色 dot picker · 演示 sage 核心特征 */}
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#64748b',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>12 主题色</span>
            <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
            <div style={{ display: 'flex', gap: 4 }}>
              {THEMES.map((th, i) => (
                <button
                  key={th.name}
                  onClick={() => setThemeIdx(i)}
                  title={th.name}
                  style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: th.hex,
                    border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                    cursor: 'pointer',
                    transform: themeIdx === i ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 200ms',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mini chat hero · 让用户一眼看到产品在做什么 */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 24,
          overflow: 'hidden',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        }}>
          <div style={{
            height: 44, padding: '0 20px',
            borderBottom: '1px solid rgba(226,232,240,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>本月销售 Top 10</span>
            <span style={{
              fontSize: 11, color: '#64748b',
              padding: '2px 8px', borderRadius: 4,
              background: '#f1f5f9', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            }}>GPT-4o</span>
          </div>

          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* user msg */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                maxWidth: '70%',
                padding: '8px 14px', borderRadius: 14,
                background: '#f1f5f9', color: '#1e293b',
                fontSize: 13, lineHeight: 1.5,
              }}>
                帮我查本月销量最高的 10 个产品
              </div>
            </div>
            {/* ai msg */}
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#fff', border: '1px solid #e2e8f0',
                color: t.hex, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Bot size={14} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#1e293b', marginBottom: 8 }}>
                  根据{' '}<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>sales_main</code>{' '}的本月数据：
                </div>
                <div style={{
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: 6, overflow: 'hidden',
                  fontSize: 12,
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                        <th style={miniTh}>#</th><th style={miniTh}>产品</th><th style={miniTh}>销量</th>
                        <th style={{ ...miniTh, textAlign: 'right' }}>销售额</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'AeroPress 手冲咖啡壶', '1,820', '¥218,400'],
                        ['2', 'Aeron 人体工学椅',     '624',   '¥1,872,000'],
                        ['3', 'Kindle Paperwhite',    '982',   '¥588,000'],
                      ].map(r => (
                        <tr key={r[0]} style={{ borderTop: '1px solid #f1f5f9' }}>
                          <td style={{ ...miniTd, color: '#94a3b8' }}>{r[0]}</td>
                          <td style={miniTd}>{r[1]}</td>
                          <td style={miniTd}>{r[2]}</td>
                          <td style={{ ...miniTd, textAlign: 'right', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* glow input */}
            <div style={{
              background: '#fff',
              border: `1px solid ${t.hex}80`,
              borderRadius: 18,
              boxShadow: `0 0 4px ${t.hex}66, 0 0 12px ${t.hex}33`,
              padding: 8,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Sparkles size={14} color={t.hex} style={{ marginLeft: 6 }} />
              <span style={{ flex: 1, fontSize: 13, color: '#94a3b8', padding: '0 6px' }}>问点什么吧?</span>
              <button style={{
                width: 26, height: 26, borderRadius: '50%',
                background: t.hex, color: '#fff', border: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Send size={12} style={{ marginLeft: -2 }} /></button>
            </div>
          </div>
        </div>

        {/* Capabilities · 4 张能力卡 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <Cap Icon={MessageSquare} title="多智能体 NL→SQL" desc="data_qa / general / Dify Apps" hex={t.hex} />
          <Cap Icon={FolderOpen} title="多空间多用户" desc="数据源 / 模型 / 规则隔离" hex={t.hex} />
          <Cap Icon={Database} title="12 数据库" desc="MySQL · PG · Oracle · CK · ES …" hex={t.hex} />
          <Cap Icon={Shield} title="行/列规则集" desc="管理员配规则 + 用户分配" hex={t.hex} />
        </div>

        {/* 沉淀组成 stats */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, marginTop: 0, marginBottom: 16, color: '#1e293b' }}>
            沉淀组成（Tier 3 · 38 条）
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {[
              { label: 'Tokens', n: 5 },
              { label: 'Components', n: 8 },
              { label: 'Blocks', n: 13 },
              { label: 'Pages', n: 10 },
              { label: 'Style', n: 1 },
              { label: 'Product', n: 1 },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8fafc', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: t.hex, lineHeight: 1.2 }}>{s.n}</div>
                <div style={{
                  fontSize: 10, color: '#64748b', marginTop: 4,
                  textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 双柱 · 严肃面 vs 彩蛋面 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Pillar
            hex={t.hex}
            title="严肃面"
            desc="chat / 仪表盘 / 表 / 表单 走极简——白底 + slate + 9 阶手调灰阶 + 1px 分割。视觉决策让位于信息密度和主题色个性化。"
          >
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              <Tag Icon={BarChart3} label="数据问答" />
              <Tag Icon={Database} label="数据源" />
              <Tag Icon={FolderOpen} label="空间管理" />
            </div>
          </Pillar>

          <Pillar
            hex={t.hex}
            title="彩蛋面"
            desc="雪人飘雪 RevolverMenu + 复古 CRT 404 — sage 的性格出口，告诉用户「我们写代码的人有体温」。"
            playful
          >
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              <Tag Icon={Globe} label="雪人 FAB" highlight={t.hex} />
              <Tag Icon={Tv} label="CRT 404" highlight={t.hex} />
              <Tag Icon={Zap} label="霓虹 focus" highlight={t.hex} />
              <Tag Icon={Feather} label="主题头像" highlight={t.hex} />
            </div>
          </Pillar>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Cap({ Icon, title, desc, hex }: {
  Icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
  hex: string;
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: `${hex}1A`, color: hex,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10,
      }}>
        <Icon size={16} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function Pillar({ hex, title, desc, playful, children }: {
  hex: string;
  title: string;
  desc: string;
  playful?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div style={{
      background: playful ? `linear-gradient(135deg, ${hex}1A, ${hex}05)` : '#fff',
      border: `1px solid ${playful ? `${hex}40` : '#e2e8f0'}`,
      borderRadius: 12, padding: 18,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      {children}
    </div>
  );
}

function Tag({ Icon, label, highlight }: {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  highlight?: string;
}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 999,
      background: highlight ? `${highlight}1A` : '#f1f5f9',
      color: highlight || '#475569',
      fontSize: 11, fontWeight: 500,
      border: `1px solid ${highlight ? `${highlight}33` : '#e2e8f0'}`,
    }}>
      <Icon size={11} />{label}
    </span>
  );
}

const miniTh = { padding: '6px 8px', fontSize: 10, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const miniTd = { padding: '6px 8px' };
