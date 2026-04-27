import { useState } from 'react';
import { Bot, Feather, MoreHorizontal, Send, Sparkles } from 'lucide-react';
import { PreviewFrame } from '../../_layout';

const THEMES = [
  { name: 'green',  hex: '#10b981', selection: '#a7f3d0' },
  { name: 'blue',   hex: '#60a5fa', selection: '#bfdbfe' },
  { name: 'cyan',   hex: '#22d3ee', selection: '#a5f3fc' },
  { name: 'rose',   hex: '#fb7185', selection: '#fecdd3' },
  { name: 'purple', hex: '#a78bfa', selection: '#ddd6fe' },
  { name: 'orange', hex: '#fb923c', selection: '#fed7aa' },
];

export default function SageMultiThemePreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ minHeight: 720, padding: 32, fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>STYLE · SAAS-TOOL</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>
            Sage Multi-Theme Data Platform
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 720 }}>
            12 主题色用户切换 + 9 阶手调 RGB 灰阶 + Inter 单字体 + tailwindcss-animate 动效套件 + 雪人飘雪 FAB 彩蛋 + 复古 CRT 404 — AI 数据分析平台的整套视觉语言
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>切换主题色:</span>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 26, height: 26, borderRadius: '50%',
                background: th.hex,
                border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Surface title="Chat 输入器">
            <div style={{
              background: '#fff',
              border: `1px solid ${t.hex}80`,
              borderRadius: 24,
              boxShadow: `0 0 4px ${t.hex}66, 0 0 15px ${t.hex}4D`,
              padding: 10,
            }}>
              <div style={{ width: '100%', padding: '4px 10px', fontSize: 16, color: '#94a3b8' }}>问点什么吧?</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', borderRadius: 16,
                  background: `${t.hex}1A`, color: t.hex,
                  fontSize: 12, fontWeight: 500,
                  border: `1px solid ${t.hex}4D`,
                }}>
                  <Sparkles size={12} /> 数据查询
                </span>
                <button style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: t.hex, color: '#fff', border: 'none',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Send size={14} style={{ marginLeft: -2, marginTop: 2 }} /></button>
              </div>
            </div>
          </Surface>

          <Surface title="侧栏会话项">
            <div style={{ background: 'rgb(249,249,249)', padding: 8, borderRadius: 8 }}>
              <div style={{
                padding: '6px 12px', borderRadius: 8,
                background: 'rgb(239,239,239)', color: t.hex,
                fontSize: 14, fontWeight: 500, marginBottom: 4,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>本月销售分析（active）</span>
                <MoreHorizontal size={14} color="#94a3b8" />
              </div>
              <div style={{ padding: '6px 12px', borderRadius: 8, color: '#475569', fontSize: 14, marginBottom: 4 }}>
                规则集 v3 评审
              </div>
              <div style={{ padding: '6px 12px', borderRadius: 8, color: '#475569', fontSize: 14 }}>
                权限审计
              </div>
            </div>
          </Surface>

          <Surface title="主题色 CTA + 圆形 ghost + 主题头像">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '8px 16px', borderRadius: 8,
                background: t.hex, color: '#fff', border: 'none',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>主题 CTA</button>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: t.hex, color: '#fff', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Send size={16} /></button>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'transparent', color: '#94a3b8',
                border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><MoreHorizontal size={16} /></button>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#fff', border: '1px solid #e2e8f0',
                color: t.hex,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Feather size={16} />
              </span>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#fff', border: '1px solid #e2e8f0',
                color: t.hex,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={16} />
              </span>
            </div>
          </Surface>

          <Surface title="9 阶 RGB 灰阶">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {[252, 251, 249, 246, 244, 242, 239, 237, 231].map(v => (
                <div key={v} title={`rgb(${v},${v},${v})`} style={{
                  width: 36, height: 24,
                  background: `rgb(${v},${v},${v})`,
                  border: '1px solid #f1f5f9',
                  fontSize: 9, color: '#64748b',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{v}</div>
              ))}
            </div>
          </Surface>

          <Surface title="动效套件 (animate-in)">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['fade-in', 'zoom-in-95', 'slide-in-from-bottom-4', 'animate-pulse', 'animate-spin'].map(a => (
                <span key={a} style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: `${t.hex}1A`, color: t.hex,
                  fontSize: 11, fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                }}>{a}</span>
              ))}
            </div>
          </Surface>

          <Surface title="字体 · Inter Stack">
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>The quick brown fox jumps over.</div>
            <div style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>这是一段中文内容，由系统 fallback 渲染。</div>
            <div style={{
              fontSize: 11, color: '#94a3b8', marginTop: 4,
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            }}>font-family: Inter, sans-serif</div>
          </Surface>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Surface({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
      <div style={{
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5,
        color: '#94a3b8', marginBottom: 12,
      }}>{title}</div>
      {children}
    </div>
  );
}
