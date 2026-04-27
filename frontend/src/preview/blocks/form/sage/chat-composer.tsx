import { useState } from 'react';
import { Mic, Send, Sparkles, X, Zap } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const THEMES = [
  { hex: '#10b981' }, { hex: '#22d3ee' }, { hex: '#fb7185' }, { hex: '#a78bfa' },
];

export default function ChatComposerPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [skill, setSkill] = useState<string | null>('数据查询');
  const [value, setValue] = useState('');
  const t = THEMES[themeIdx];

  const isInSkillMode = skill !== null;
  const glowing = isInSkillMode || focused;

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · FORM</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 4px' }}>Chat Composer</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          整体输入腰带 · glow border + skill bar + voice + send/stop
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={i} onClick={() => setThemeIdx(i)} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: th.hex,
              border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
              cursor: 'pointer',
            }} />
          ))}
        </div>

        <form
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            background: '#fff',
            border: '1px solid',
            borderColor: glowing ? `${t.hex}80` : '#e2e8f0',
            borderRadius: 24,
            boxShadow: glowing
              ? `0 0 4px ${t.hex}66, 0 0 15px ${t.hex}4D`
              : '0 0 4px rgba(148,163,184,0.15), 0 0 15px rgba(148,163,184,0.08)',
            padding: 10,
            transition: 'all 250ms',
          }}
        >
          <textarea
            value={value} onChange={e => setValue(e.target.value)}
            placeholder="问点什么吧?"
            rows={1}
            style={{
              width: '100%', padding: '4px 10px', resize: 'none',
              background: 'transparent', border: 'none', outline: 'none',
              fontSize: 16, color: '#1f2937',
              fontFamily: 'Inter, sans-serif',
              minHeight: 35, maxHeight: 200,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {skill ? (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', borderRadius: 16,
                  background: `${t.hex}1A`, color: t.hex,
                  fontSize: 12, fontWeight: 500,
                  border: `1px solid ${t.hex}4D`,
                }}>
                  <Sparkles size={12} /> {skill}
                  <X size={12} style={{ marginLeft: 4, cursor: 'pointer' }} onClick={() => setSkill(null)} />
                </span>
              ) : (
                <>
                  <ChipBtn onClick={() => setSkill('数据查询')}><Sparkles size={12} /> 数据查询</ChipBtn>
                  <ChipBtn><Zap size={12} /> 代码</ChipBtn>
                </>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'transparent', border: 'none', color: '#64748b',
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Mic size={16} /></button>
              <span style={{ width: 1, height: 20, background: '#e2e8f0' }} />
              <button
                disabled={!value.trim()}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: t.hex, color: '#fff',
                  border: 'none',
                  cursor: value.trim() ? 'pointer' : 'not-allowed',
                  opacity: value.trim() ? 1 : 0.4,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}
              ><Send size={16} style={{ marginLeft: -2, marginTop: 2 }} /></button>
            </div>
          </div>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 8, marginBottom: 8 }}>
          AI 也会出错 — 关键决策请二次确认
        </p>
      </div>
    </PreviewFrame>
  );
}

function ChipBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '4px 10px', borderRadius: 16,
        background: h ? '#f8fafc' : 'transparent',
        color: '#64748b', border: '1px solid #e2e8f0',
        fontSize: 12, fontWeight: 500, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </button>
  );
}
