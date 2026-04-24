import { Heart, Star, Users } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
];
const RANK_COLORS = ['#FF6B6B', '#F7DC6F', '#45B7D1'];

const SAMPLES = [
  { name: 'claude-api', summary: '用 Claude API 或 Anthropic SDK 构建应用', tag: 'AI SDK', like: 888, used: 4200, rating: 4.9 },
  { name: 'react-best-practices', summary: 'React 项目初始化 + 代码 review 基线', tag: '前端', like: 660, used: 3100, rating: 4.8 },
  { name: 'systematic-debugging', summary: '先诊断再修，避免 shotgun debugging', tag: '工程', like: 502, used: 2150, rating: 4.7 },
  { name: 'canvas-design', summary: '用设计哲学创作海报 / 视觉稿', tag: '设计', like: 342, used: 1820, rating: 4.6 },
  { name: 'writing-plans', summary: '有 spec 时先写实现计划', tag: '规划', like: 218, used: 960, rating: 4.5 },
  { name: 'brainstorming', summary: '动手前先探索意图与需求', tag: '思维', like: 176, used: 640, rating: 4.4 },
  { name: 'mcp-builder', summary: '构建高质量 MCP server 的指南', tag: 'MCP', like: 141, used: 512, rating: 4.3 },
  { name: 'docx', summary: '读写 .docx 文档', tag: '文档', like: 118, used: 420, rating: 4.2 },
];

function Row({ idx, item }: { idx: number; item: typeof SAMPLES[number] }) {
  const [hover, setHover] = useState(false);
  const rankColor = idx < 3 ? RANK_COLORS[idx] : '#cbd5e1';
  const letter = item.name.charAt(0).toUpperCase();
  const bg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 100px 200px',
        alignItems: 'center',
        padding: '12px 16px',
        background: hover ? 'rgba(248, 250, 252, 0.6)' : 'transparent',
        borderBottom: '1px solid #f3f4f6',
        cursor: 'pointer',
        transition: 'background 200ms',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 800, color: rankColor }}>{idx + 1}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, paddingRight: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999, background: bg, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 16, flexShrink: 0,
        }}>
          {letter}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 700,
            color: hover ? '#64748b' : '#111827',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            transition: 'color 200ms',
          }}>
            {item.name}
          </div>
          <div style={{
            fontSize: 12, color: '#9ca3af',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            marginTop: 2,
          }}>
            {item.summary}
          </div>
        </div>
      </div>

      <div>
        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 600,
          padding: '2px 10px', borderRadius: 999,
          background: '#f0fdfa', color: '#0d9488',
          border: '1px solid #ccfbf1',
          maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.tag}
        </span>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end',
        fontSize: 12, color: '#9ca3af', fontWeight: 500,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Heart size={13} /> {item.like}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Users size={13} /> {item.used}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Star size={13} /> {item.rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function LeaderboardRowPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>BLOCK · DISPLAY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 8px', color: '#111827' }}>Leaderboard Row</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 24px' }}>Top 3 用红黄蓝 · 4+ 名用 slate-300</p>

        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          {/* 列头 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 100px 200px',
            alignItems: 'center', padding: '10px 16px',
            fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: 2, color: '#9ca3af',
            borderBottom: '1px solid #f3f4f6',
          }}>
            <span>#</span><span>Skill</span><span>分类</span>
            <span style={{ textAlign: 'right' }}>数据</span>
          </div>
          {SAMPLES.map((item, i) => (<Row key={item.name} idx={i} item={item} />))}
        </div>
      </div>
    </PreviewFrame>
  );
}
