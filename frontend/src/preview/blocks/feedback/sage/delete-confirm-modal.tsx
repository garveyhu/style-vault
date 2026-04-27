import { AlertTriangle } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

export default function DeleteConfirmModalPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ position: 'relative', height: 600, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ position: 'absolute', inset: 0, padding: 24, color: '#94a3b8', fontSize: 13 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>BLOCK · FEEDBACK</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '8px 0 4px', color: '#0f172a' }}>Delete Confirm Modal</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>rounded-3xl · 红圆 AlertTriangle · slate-900/10 极淡蒙层</p>
          <div style={{ marginTop: 32, padding: 16, background: '#fff', borderRadius: 12, height: 200, opacity: 0.4 }}>
            <p>会话标题示例</p>
            <p>用户消息内容...</p>
            <p>AI 回复内容...</p>
          </div>
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15, 23, 42, 0.10)',
          backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            padding: 24,
            width: '90%', maxWidth: 384,
            border: '1px solid rgba(255,255,255,0.50)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#fef2f2',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <AlertTriangle size={24} color="#ef4444" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
                删除会话？
              </h3>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, lineHeight: 1.5 }}>
                此操作无法撤销 — 对话历史将被永久删除
              </p>
              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <button style={{
                  flex: 1, padding: '8px 16px',
                  background: '#f1f5f9', color: '#334155',
                  border: 'none', borderRadius: 8, fontWeight: 500,
                  cursor: 'pointer', fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 200ms',
                }}>取消</button>
                <button style={{
                  flex: 1, padding: '8px 16px',
                  background: '#dc2626', color: '#fff',
                  border: 'none', borderRadius: 8, fontWeight: 500,
                  cursor: 'pointer', fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 200ms',
                }}>删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
