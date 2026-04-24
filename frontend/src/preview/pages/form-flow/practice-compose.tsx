import { ArrowLeft, Send, X } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

export default function PracticeComposePreview() {
  const [title, setTitle] = useState('用 canvas-design 批量生成产品海报');
  const [content, setContent] = useState('最近接了个活，要给 200+ SKU 生成风格统一的产品海报。试了 canvas-design 之后发现结构化比 prompt 硬写好用多了。\n\n## 起手的核心 prompt\n\n```\n生成一个 1080×1620 的产品海报...\n```\n\n...');
  const [skills, setSkills] = useState(['canvas-design', 'brand-guidelines']);
  const [skillInput, setSkillInput] = useState('');

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        {/* Sticky 操作栏 */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(226,232,240,0.6)',
        }}>
          <div style={{ maxWidth: 768, margin: '0 auto', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', cursor: 'pointer' }}>
              <ArrowLeft size={16} /> 返回
            </a>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
              草稿已保存 · 10秒前
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '6px 16px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'transparent',
                fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                预览
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 16px', background: '#1a1a1a', color: '#fff',
                borderRadius: 12, border: 'none',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Send size={13} /> 发布
              </button>
            </div>
          </div>
        </div>

        {/* 编辑区 */}
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '32px 32px 64px' }}>
          {/* 标题输入 */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入标题..."
            maxLength={80}
            style={{
              width: '100%', fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em',
              color: '#0f172a', border: 'none', outline: 'none',
              background: 'transparent', marginBottom: 24,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />

          {/* 关联 skills */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af', marginBottom: 8 }}>
              关联 Skill
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8, alignItems: 'center' }}>
              {skills.map((s) => (
                <span key={s} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 600,
                  padding: '4px 10px', borderRadius: 999,
                  background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1',
                }}>
                  {s}
                  <button
                    onClick={() => setSkills(skills.filter((x) => x !== s))}
                    style={{ background: 'transparent', border: 'none', color: '#0d9488', cursor: 'pointer', padding: 0, display: 'inline-flex' }}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder="输入 skill slug 按 Enter 添加"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && skillInput.trim()) {
                  setSkills([...skills, skillInput.trim()]);
                  setSkillInput('');
                }
              }}
              style={{
                width: '100%', background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: 8, padding: '6px 12px', fontSize: 13,
                outline: 'none', fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Markdown 编辑器模拟 */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', background: '#fafafa', fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace', display: 'flex', gap: 12 }}>
              <span>B</span><span>I</span><span>H</span><span>{'{ }'}</span><span>"</span><span>·</span><span>预览 &lt;/&gt;</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%', height: 400, border: 'none', outline: 'none',
                padding: 16, fontSize: 14, lineHeight: 1.7,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#0f172a', resize: 'vertical',
              }}
            />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
