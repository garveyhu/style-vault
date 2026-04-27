import { useState } from 'react';
import { PreviewFrame } from '../../_layout';
import { AgentChatStreamScene } from '../../pages/dashboard/sage/agent-chat-stream';

const THEMES = [
  { name: 'blue',   hex: '#60a5fa', light: '#93c5fd', selection: '#bfdbfe' },
  { name: 'green',  hex: '#10b981', light: '#34d399', selection: '#a7f3d0' },
  { name: 'yellow', hex: '#fbbf24', light: '#fcd34d', selection: '#fde68a' },
  { name: 'pink',   hex: '#f472b6', light: '#f9a8d4', selection: '#fbcfe8' },
  { name: 'orange', hex: '#fb923c', light: '#fdba74', selection: '#fed7aa' },
  { name: 'gray',   hex: '#64748b', light: '#94a3b8', selection: '#e2e8f0' },
  { name: 'purple', hex: '#a78bfa', light: '#c4b5fd', selection: '#ddd6fe' },
  { name: 'red',    hex: '#f87171', light: '#fca5a5', selection: '#fecaca' },
  { name: 'indigo', hex: '#818cf8', light: '#a5b4fc', selection: '#c7d2fe' },
  { name: 'teal',   hex: '#2dd4bf', light: '#5eead4', selection: '#99f6e4' },
  { name: 'cyan',   hex: '#22d3ee', light: '#67e8f9', selection: '#a5f3fc' },
  { name: 'rose',   hex: '#fb7185', light: '#fda4af', selection: '#fecdd3' },
];

// style 封面 = AgentChatStreamScene + 12 主题色切换 dot
// 切色时整个 chat 界面跟着变色，展示 sage 核心特征"12 主题色动态着色"
export default function SageMultiThemePreview() {
  const [themeIdx, setThemeIdx] = useState(1); // 默认 green
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ position: 'relative', minHeight: 720, fontFamily: 'Inter, sans-serif' }}>
        <AgentChatStreamScene
          themeHex={t.hex}
          themeLight={t.light}
          themeSelection={t.selection}
        />

        {/* 浮在右上角的 12 主题色 dot row · 演示 sage 整站 119 处主题色动态着色 */}
        <div
          style={{
            position: 'absolute',
            top: 16, right: 16,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.20)',
            borderRadius: 12,
            padding: '10px 14px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)',
            display: 'flex', alignItems: 'center', gap: 10,
            zIndex: 200,
          }}
        >
          <span style={{
            fontSize: 11, fontWeight: 600, color: '#64748b',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>主题色</span>
          <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
          <div style={{ display: 'flex', gap: 4, overflow: 'auto' }}>
            {THEMES.map((th, i) => (
              <button
                key={th.name}
                onClick={() => setThemeIdx(i)}
                title={th.name}
                style={{
                  flexShrink: 0,
                  width: 22, height: 22, borderRadius: '50%',
                  background: th.hex,
                  border: themeIdx === i ? '2px solid #475569' : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 200ms',
                  transform: themeIdx === i ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: themeIdx === i ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
