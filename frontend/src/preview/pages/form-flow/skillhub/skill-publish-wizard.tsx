import { ArrowLeft, Check, CheckCircle, ChevronDown, GitBranch, Send, Upload, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

type Step = 'source' | 'preview' | 'done';
const STEPS: { key: Step; label: string; num: number }[] = [
  { key: 'source', label: '添加来源', num: 1 },
  { key: 'preview', label: '预览确认', num: 2 },
  { key: 'done', label: '完成', num: 3 },
];

const DISCOVERED = [
  { path: 'packages/req-to-ai-spec/SKILL.md', name: 'req-to-ai-spec', summary: '将零散的产品需求转化为结构化的 AI 友好规格文档', published: false },
  { path: 'packages/spechub-best-practices/SKILL.md', name: 'spechub-best-practices', summary: 'SpecHub 规约文档编写与跨 AI 交接工作流指南', published: false },
  { path: 'packages/docker-best-practices/SKILL.md', name: 'docker-best-practices', summary: '容器化 FastAPI + React 项目的最佳实践集合', published: true },
  { path: 'packages/fastapi-best-practices/SKILL.md', name: 'fastapi-best-practices', summary: 'FastAPI 项目初始化、开发指引与代码 review', published: false },
];

const TAGS = ['开发工具', '效率提升', '设计', 'AI', '前端', '后端'];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: i < STEPS.length - 1 ? '1 1 auto' : 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: active ? '#1a1a1a' : done ? '#e5e7eb' : '#f0f0f0',
              color: active ? '#fff' : done ? '#1f2937' : '#aaa',
            }}>
              {done ? <Check size={14} /> : s.num}
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: active ? '#111827' : done ? '#4b5563' : '#bbb' }}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: done ? '#e5e7eb' : '#f3f4f6', marginLeft: 8 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SourceStep({ onScan }: { onScan: () => void }) {
  const [tab, setTab] = useState<'git' | 'archive'>('git');
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>添加来源</h2>
      <p style={{ fontSize: 14, color: '#999', margin: '0 0 24px' }}>
        输入 Git 仓库地址或上传压缩包，系统将扫描其中的 SKILL.md 文件
      </p>

      {/* Source tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {([
          ['git', 'Git 仓库', <GitBranch size={15} />],
          ['archive', '上传压缩包', <svg key="a" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" /></svg>],
        ] as const).map(([k, l, icon]) => {
          const active = tab === k;
          return (
            <button key={k as string} onClick={() => setTab(k as 'git' | 'archive')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 12,
                fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer',
                background: active ? '#111827' : '#f5f5f5',
                color: active ? '#fff' : '#666',
                boxShadow: active ? '0 1px 2px rgba(107,114,128,0.2)' : 'none',
                fontFamily: 'inherit',
              }}>
              {icon}{l as string}
            </button>
          );
        })}
      </div>

      {/* Source input */}
      {tab === 'git' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#444', marginBottom: 6 }}>Git 仓库地址 *</label>
            <input placeholder="https://github.com/user/repo.git"
              style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 12, border: '1px solid #e5e7eb', outline: 'none', fontFamily: 'inherit' }}/>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#444', marginBottom: 6 }}>分支</label>
            <input defaultValue="main"
              style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 12, border: '1px solid #e5e7eb', outline: 'none', fontFamily: 'inherit' }}/>
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>来源标识 (source)</label>
            <input placeholder="upload" style={{ width: '100%', padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontFamily: 'inherit' }}/>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>只允许小写字母、数字和连字符</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>作者标识 (author)</label>
            <input placeholder="your-name" style={{ width: '100%', padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontFamily: 'inherit' }}/>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>默认为你的用户名，同一来源下同一作者的 Skill 不可重名</p>
          </div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 12, padding: 32, borderRadius: 12,
              border: `2px dashed ${dragOver ? '#9ca3af' : '#ddd'}`,
              background: dragOver ? 'rgba(249,250,251,0.5)' : '#fafafa',
              cursor: 'pointer', transition: 'all 200ms',
            }}
          >
            <UploadCloud size={32} color="#bbb" />
            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>拖拽文件到此处，或点击选择文件</p>
            <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>支持 .zip / .tar.gz，最大 50MB</p>
          </div>
        </>
      )}

      {/* Scan button */}
      <button onClick={onScan} style={{
        marginTop: 24, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '12px 24px', borderRadius: 12, background: '#111827', color: '#fff',
        fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        fontFamily: 'inherit',
      }}>
        <Upload size={16} /> 扫描来源
      </button>
    </div>
  );
}

function PreviewStep({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(DISCOVERED.filter((s) => !s.published).map((s) => s.path)));
  const [expanded, setExpanded] = useState<string | null>(DISCOVERED[0].path);
  const [remark, setRemark] = useState('');
  const selectableCount = DISCOVERED.filter((s) => !s.published).length;
  const allSelected = selected.size === selectableCount;

  const toggle = (p: string) => {
    const next = new Set(selected);
    if (next.has(p)) next.delete(p); else next.add(p);
    setSelected(next);
  };
  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(DISCOVERED.filter((s) => !s.published).map((s) => s.path)));
  };

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14,
        color: '#888', background: 'transparent', border: 'none', cursor: 'pointer',
        marginBottom: 16, padding: 0, fontFamily: 'inherit',
      }}>
        <ArrowLeft size={14} /> 返回
      </button>

      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>预览确认</h2>

      {/* Source info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#888', marginBottom: 12 }}>
        <GitBranch size={14} color="#aaa" />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          https://github.com/iktapp/ai-skills.git
        </span>
      </div>

      {/* Identity box */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, fontSize: 12,
        background: '#f8fafc', borderRadius: 8, padding: '8px 12px', marginBottom: 24,
        border: '1px solid rgba(226,232,240,0.6)',
      }}>
        <div>
          <span style={{ color: '#94a3b8', marginRight: 4 }}>来源标识:</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#334155' }}>iktapp</span>
        </div>
        <div>
          <span style={{ color: '#94a3b8', marginRight: 4 }}>作者标识:</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#334155' }}>ai-skills</span>
        </div>
      </div>

      {/* Select all toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#666', margin: 0 }}>
          发现 {DISCOVERED.length} 个 Skill
        </p>
        <button onClick={toggleAll} style={{
          fontSize: 12, fontWeight: 500, color: '#4b5563',
          background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {allSelected ? '全不选' : '全选'}
        </button>
      </div>

      {/* Skills list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DISCOVERED.map((skill) => {
          const isExpanded = expanded === skill.path;
          const isSelected = skill.published || selected.has(skill.path);
          return (
            <div key={skill.path}
              style={{
                padding: 16, borderRadius: 12,
                border: '1px solid',
                borderColor: skill.published ? '#e5e7eb' : isSelected ? '#d1d5db' : '#eee',
                background: skill.published ? 'rgba(243,244,246,0.6)' : isSelected ? 'rgba(249,250,251,0.4)' : '#fafafa',
                opacity: skill.published ? 0.6 : 1,
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}
                onClick={() => !skill.published && setExpanded(isExpanded ? null : skill.path)}>
                <input type="checkbox" checked={isSelected} disabled={skill.published}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => !skill.published && toggle(skill.path)}
                  style={{ marginTop: 4, accentColor: '#111827', cursor: skill.published ? 'not-allowed' : 'pointer' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: skill.published ? '#9ca3af' : '#1a1a1a' }}>
                      {skill.name}
                    </span>
                    {skill.published && (
                      <span style={{
                        fontSize: 10, fontWeight: 500, color: '#047857',
                        background: '#ecfdf5', border: '1px solid #a7f3d0',
                        padding: '2px 6px', borderRadius: 4,
                      }}>
                        已发布
                      </span>
                    )}
                    <span style={{
                      fontSize: 11, color: '#aaa',
                      fontFamily: 'JetBrains Mono, monospace',
                      background: '#f0f0f0',
                      padding: '2px 6px', borderRadius: 4,
                    }}>
                      {skill.path}
                    </span>
                  </div>
                  {skill.summary && (
                    <p style={{
                      fontSize: 12, color: '#888', marginTop: 4,
                      lineHeight: 1.5, margin: '4px 0 0',
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>{skill.summary}</p>
                  )}
                </div>
                <ChevronDown size={14} color="#aaa"
                  style={{ flexShrink: 0, marginTop: 4, transition: 'transform 200ms',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }} />
              </div>

              {isExpanded && !skill.published && (
                <div style={{
                  marginTop: 12, paddingLeft: 32, paddingTop: 12,
                  borderTop: '1px solid #f3f4f6',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>
                      显示名称
                    </label>
                    <input defaultValue={skill.name}
                      style={{ width: '100%', padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none', fontFamily: 'inherit' }}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>
                      描述
                    </label>
                    <input defaultValue={skill.summary}
                      style={{ width: '100%', padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none', fontFamily: 'inherit' }}/>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>
                      标签
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {TAGS.map((t) => {
                        const sel = ['开发工具', '效率提升'].includes(t);
                        return (
                          <button key={t} type="button"
                            style={{
                              padding: '4px 10px', borderRadius: 6,
                              fontSize: 12, fontWeight: 500,
                              border: '1px solid', cursor: 'pointer',
                              background: sel ? '#111827' : '#fff',
                              color: sel ? '#fff' : '#6b7280',
                              borderColor: sel ? '#111827' : '#e5e7eb',
                              fontFamily: 'inherit',
                            }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selected.size === 0 && (
        <p style={{ marginTop: 16, fontSize: 12, color: '#ea580c' }}>请至少选择一个 Skill</p>
      )}

      {/* Remark */}
      <div style={{ marginTop: 24 }}>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
          备注（可选）
        </label>
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)}
          placeholder="向管理员说明本次提交的目的或注意事项..." rows={3}
          style={{ width: '100%', padding: '8px 12px', fontSize: 14, borderRadius: 8,
            border: '1px solid #e5e7eb', outline: 'none', resize: 'none', fontFamily: 'inherit' }}/>
      </div>

      {/* Submit */}
      <button onClick={onSubmit} disabled={selected.size === 0}
        style={{
          marginTop: 24, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px 24px', borderRadius: 12,
          background: selected.size === 0 ? '#9ca3af' : '#111827', color: '#fff',
          fontSize: 14, fontWeight: 600, border: 'none',
          cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
          opacity: selected.size === 0 ? 0.6 : 1,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          fontFamily: 'inherit',
        }}>
        <Send size={16} /> 提交审核
      </button>
    </div>
  );
}

export default function SkillPublishWizardPreview() {
  const [step, setStep] = useState<Step>('preview');

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 768, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

        <StepBar current={step} />

        <div style={{
          background: '#fff', borderRadius: 16,
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.04)',
          padding: 32,
        }}>
          {step === 'source' && <SourceStep onScan={() => setStep('preview')} />}
          {step === 'preview' && <PreviewStep onBack={() => setStep('source')} onSubmit={() => setStep('done')} />}
          {step === 'done' && (
            <div style={{ padding: '32px 0', textAlign: 'center' }}>
              <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto' }} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginTop: 20, marginBottom: 8 }}>提交成功</h2>
              <p style={{ fontSize: 14, color: '#888', margin: '0 0 4px' }}>
                已成功提交 3 个 Skill 的审核申请
              </p>
              <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>审核通过后 Skill 将自动上架社区</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
                <button onClick={() => setStep('source')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px', borderRadius: 12,
                    background: '#111827', color: '#fff',
                    fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                  <Upload size={14} /> 继续提交
                </button>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 12,
                  background: 'transparent', color: '#555',
                  border: '1px solid #ddd', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  查看提交历史
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
          {STEPS.map((s) => (
            <button key={s.key} onClick={() => setStep(s.key)}
              style={{
                padding: '4px 10px', fontSize: 11, fontWeight: 500,
                background: step === s.key ? '#e5e7eb' : 'transparent',
                color: step === s.key ? '#111827' : '#9ca3af',
                border: '1px solid #e5e7eb', borderRadius: 6,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
              跳到 step {s.num}
            </button>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
