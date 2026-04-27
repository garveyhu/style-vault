import { useState } from 'react';
import { Mic, Send, Sparkles } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { name: 'cyan',   hex: '#22d3ee' },
  { name: 'green',  hex: '#10b981' },
  { name: 'rose',   hex: '#fb7185' },
  { name: 'violet', hex: '#a78bfa' },
];

export default function GlowBorderTextareaPreview() {
  const [themeIdx, setThemeIdx] = useState(1);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · INPUT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Glow Border Textarea
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          rounded-[24px] + 双层 box-shadow 主题色霓虹光晕 — 点 textarea 进入 focus
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button
              key={th.name}
              onClick={() => setThemeIdx(i)}
              style={{
                width: 24, height: 24, borderRadius: '50%',
                background: th.hex,
                border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms',
                transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
              title={th.name}
            />
          ))}
        </div>

        <div style={{ background: 'rgb(249,249,249)', padding: 40, borderRadius: 12 }}>
          <form
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column',
              background: '#fff',
              border: '1px solid',
              borderColor: focused ? `${t.hex}80` : '#e2e8f0',
              borderRadius: 24,
              boxShadow: focused
                ? `0 0 4px ${t.hex}66, 0 0 15px ${t.hex}4D`
                : '0 0 4px rgba(148, 163, 184, 0.15), 0 0 15px rgba(148, 163, 184, 0.08)',
              padding: 10,
              transition: 'all 250ms',
            }}
          >
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="问点什么吧?"
              rows={1}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                outline: 'none', resize: 'none',
                padding: '4px 10px',
                fontSize: 16, color: '#1f2937',
                fontFamily: 'Inter, sans-serif',
                minHeight: 35, maxHeight: 200,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', borderRadius: 16,
                  background: `${t.hex}1A`, color: t.hex,
                  fontSize: 12, fontWeight: 500,
                  border: `1px solid ${t.hex}4D`,
                }}>
                  <Sparkles size={12} /> 数据查询
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'transparent', border: 'none',
                  color: '#64748b', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Mic size={16} />
                </button>
                <span style={{ width: 1, height: 20, background: '#e2e8f0' }} />
                <button style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: t.hex, color: '#fff',
                  border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Send size={16} style={{ marginLeft: -2, marginTop: 2 }} />
                </button>
              </div>
            </div>
          </form>
          <div style={{ textAlign: 'center', marginTop: 16, color: '#94a3b8', fontSize: 11 }}>
            点 textarea 进入 focus 看主题色光晕
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
