import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const PRESETS = [
  { name: 'menuPop', cls: 'fade-in zoom-in-95', dur: 100, use: '会话 hover 操作菜单' },
  { name: 'userMenuRise', cls: 'fade-in slide-in-from-bottom-4 zoom-in-95', dur: 300, use: '侧栏底部用户菜单' },
  { name: 'languagePop', cls: 'fade-in slide-in-from-left-2', dur: 150, use: '语言选择 portal' },
  { name: 'modalFade', cls: 'fade-in', dur: 200, use: '全屏 backdrop overlay' },
];

export default function AnimateInSuite() {
  const [tick, setTick] = useState(0);
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          TOKEN · MOTION
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Animate-In Suite
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          tailwindcss-animate 套件——sage 弹层标配 fade + zoom-95 100ms
        </p>
        <button
          onClick={() => setTick(t => t + 1)}
          style={{
            background: '#0f172a',
            color: '#fff',
            border: 'none',
            padding: '8px 18px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 24,
          }}
        >
          ▶ Replay
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {PRESETS.map(p => (
            <div key={p.name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20, position: 'relative', minHeight: 140 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5 }}>{p.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{p.use}</div>
              <div
                key={tick + p.name}
                className={`animate-in ${p.cls} duration-${p.dur === 100 ? '100' : p.dur === 150 ? '150' : p.dur === 200 ? '200' : '300'}`}
                style={{
                  marginTop: 16,
                  background: '#0ea5e9',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: 10,
                  fontSize: 12,
                  display: 'inline-block',
                  animationFillMode: 'both',
                }}
              >
                ⚡ animated · {p.dur}ms
              </div>
              <code style={{ display: 'block', marginTop: 12, fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#64748b' }}>
                animate-in {p.cls} duration-{p.dur}
              </code>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 12 }}>
            primitives
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ width: 24, height: 24, border: '3px solid #0ea5e9', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
            <code style={{ fontSize: 12, fontFamily: 'ui-monospace, monospace', color: '#475569' }}>animate-spin · 1s linear</code>
            <span style={{ width: 12, height: 12, background: '#0ea5e9', borderRadius: '50%' }} className="animate-pulse" />
            <code style={{ fontSize: 12, fontFamily: 'ui-monospace, monospace', color: '#475569' }}>animate-pulse · 2s</code>
            <span style={{ width: 12, height: 12, background: '#0ea5e9', borderRadius: '50%' }} className="animate-ping" />
            <code style={{ fontSize: 12, fontFamily: 'ui-monospace, monospace', color: '#475569' }}>animate-ping · 1s</code>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
