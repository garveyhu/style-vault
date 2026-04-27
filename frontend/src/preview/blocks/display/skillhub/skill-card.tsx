import { Heart, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA',
];

const SAMPLES = [
  { name: 'canvas-design', summary: 'Create beautiful visual art in .png and .pdf documents using design philosophy.', version: '1.2.0', stats: { like: 342, used: 1820, comment: 56 } },
  { name: 'writing-plans', summary: '有 spec 或多步骤任务时，在动代码前先写实现计划。', version: '0.9.3', stats: { like: 218, used: 960, comment: 33 } },
  { name: 'systematic-debugging', summary: '遇到 bug / 测试失败 / 非预期行为时，先诊断再修。', version: '1.0.1', stats: { like: 502, used: 2150, comment: 88 } },
  { name: 'brainstorming', summary: '在动手做创造性工作前用，探索用户意图、需求与设计。', version: '1.1.0', stats: { like: 176, used: 640, comment: 21 } },
  { name: 'react-best-practices', summary: 'React 项目初始化 / 开发指导 / 代码 review（yarn+vite+ts+react+antd+tailwind）。', version: '2.0.0', stats: { like: 660, used: 3100, comment: 142 } },
  { name: 'claude-api', summary: '用 Claude API 或 Anthropic SDK 构建应用。', version: '1.3.2', stats: { like: 888, used: 4200, comment: 201 } },
];

function Card({ idx }: { idx: number }) {
  const s = SAMPLES[idx % SAMPLES.length];
  const [hover, setHover] = useState(false);
  const letter = s.name.charAt(0).toUpperCase();
  const bg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#fff', borderRadius: 16, padding: 20,
        border: `1px solid ${hover ? '#99f6e4' : '#e5e7eb'}`,
        boxShadow: hover ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 200ms ease-out',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999, background: bg, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 16, flexShrink: 0,
        }}>
          {letter}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h4 style={{
            fontSize: 14, fontWeight: 700, color: hover ? '#64748b' : '#111827',
            margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            transition: 'color 200ms',
          }}>
            {s.name}
          </h4>
          <span style={{
            display: 'inline-block',
            fontSize: 10, fontWeight: 600, color: '#64748b',
            background: '#f8fafc', padding: '2px 6px',
            borderRadius: 4, marginTop: 2,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            v{s.version}
          </span>
        </div>
      </div>

      <p style={{
        color: '#6b7280', fontSize: 13, lineHeight: 1.6,
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        margin: '0 0 16px', flex: 1,
      }}>
        {s.summary}
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        fontSize: 12, color: '#9ca3af', fontWeight: 500,
        paddingTop: 12, borderTop: '1px solid #f3f4f6',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Heart size={12} /> {s.stats.like}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {s.stats.used}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MessageCircle size={12} /> {s.stats.comment}</span>
      </div>
    </div>
  );
}

export default function SkillCardPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>BLOCK · DISPLAY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px', color: '#111827' }}>Skill Card</h1>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (<Card key={i} idx={i} />))}
        </div>
      </div>
    </PreviewFrame>
  );
}
