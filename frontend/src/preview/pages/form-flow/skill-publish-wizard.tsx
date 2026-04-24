import { ArrowLeft, Check, CheckCircle, Send, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

type Step = 'source' | 'preview' | 'done';
const STEPS: { key: Step; label: string; num: number }[] = [
  { key: 'source', label: '添加来源', num: 1 },
  { key: 'preview', label: '预览确认', num: 2 },
  { key: 'done', label: '完成', num: 3 },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        const color = active ? '#0f172a' : done ? '#0d9488' : '#9ca3af';
        const bg = active ? '#0f172a' : done ? '#14b8a6' : '#f1f5f9';
        const textColor = active || done ? '#fff' : '#9ca3af';
        return (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i < STEPS.length - 1 ? '1 1 auto' : 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: bg, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                {done ? <Check size={12} /> : s.num}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: done ? '#14b8a6' : '#e2e8f0', margin: '0 4px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SkillPublishWizardPreview() {
  const [step, setStep] = useState<Step>('source');
  const [tab, setTab] = useState<'git' | 'archive'>('git');
  const [dragging, setDragging] = useState(false);

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 768, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', marginBottom: 24 }}>
          <ArrowLeft size={16} /> 返回我的
        </a>

        <StepBar current={step} />

        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(226,232,240,0.6)',
          padding: 32, marginTop: 24, minHeight: 300,
        }}>
          {step === 'source' && (
            <>
              {/* Tab 切换 */}
              <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: 10, padding: 4, marginBottom: 24, border: '1px solid rgba(226,232,240,0.6)' }}>
                {(['git', 'archive'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: '6px 18px', fontSize: 13, fontWeight: 600,
                      background: tab === t ? '#fff' : 'transparent',
                      color: tab === t ? '#0f172a' : '#64748b',
                      borderRadius: 8, border: 'none', cursor: 'pointer',
                      boxShadow: tab === t ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                      transition: 'all 200ms', fontFamily: 'inherit',
                    }}
                  >
                    {t === 'git' ? 'Git 仓库' : '压缩包'}
                  </button>
                ))}
              </div>

              {tab === 'git' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Git 仓库 URL</label>
                    <input placeholder="https://github.com/xxx/skills.git" style={{
                      width: '100%', padding: '12px 16px', fontSize: 14, borderRadius: 12,
                      border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit',
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>分支</label>
                    <input defaultValue="main" style={{
                      width: '100%', padding: '12px 16px', fontSize: 14, borderRadius: 12,
                      border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit',
                    }} />
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDragOver={(e) => e.preventDefault()}
                  style={{
                    borderRadius: 16, padding: 48, textAlign: 'center',
                    border: `2px dashed ${dragging ? '#2dd4bf' : '#cbd5e1'}`,
                    background: dragging ? 'rgba(240,253,250,0.5)' : 'transparent',
                    transition: 'all 200ms',
                  }}
                >
                  <UploadCloud style={{ width: 48, height: 48, color: '#94a3b8', margin: '0 auto 12px' }} />
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>拖拽文件到此处</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>支持 .zip / .tar.gz，≤ 50MB</div>
                  <button style={{
                    marginTop: 16, padding: '8px 16px', borderRadius: 12,
                    border: '1px solid #cbd5e1', background: '#fff',
                    fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    或选择文件
                  </button>
                </div>
              )}
            </>
          )}

          {step === 'preview' && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>SKILL.md 解析预览</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 12px' }}>canvas-design</h3>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Create beautiful visual art in .png and .pdf documents
              </p>
            </div>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <CheckCircle style={{ width: 64, height: 64, color: '#10b981', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>已提交审核</h3>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                管理员会在 24 小时内审核你的 skill
              </p>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <button
            disabled={step === 'source'}
            onClick={() => {
              if (step === 'preview') setStep('source');
              if (step === 'done') setStep('preview');
            }}
            style={{
              padding: '8px 16px', fontSize: 14, fontWeight: 500,
              background: 'transparent', border: 'none',
              color: step === 'source' ? '#cbd5e1' : '#64748b',
              cursor: step === 'source' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            上一步
          </button>
          {step !== 'done' && (
            <button
              onClick={() => setStep(step === 'source' ? 'preview' : 'done')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', background: '#1a1a1a', color: '#fff',
                borderRadius: 12, border: 'none',
                fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {step === 'preview' && <Send size={14} />}
              {step === 'preview' ? '提交审核' : '下一步'}
            </button>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
