import { PreviewFrame } from '../../../_layout';

const UI = '-apple-system, "SF Pro Text", "Inter", "PingFang SC", sans-serif';
const MONO = '"SF Mono", "JetBrains Mono", ui-monospace, monospace';

function Kv({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '11px 0', fontSize: 12.5, lineHeight: 1.55, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <b style={{ color: '#76819c', minWidth: 64, fontWeight: 600, letterSpacing: '0.3px' }}>{k}</b>
      <span style={{ color: '#eef2fb' }}>{children}</span>
    </div>
  );
}

export default function GlassPanelModalPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ fontFamily: UI, color: '#eef2fb', padding: 40, background: 'radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%)', minHeight: 560, position: 'relative' }}>
        {/* scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,16,.56)' }} />

        <div style={{ position: 'relative', display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 20 }}>
          {/* 居中模态面板 */}
          <div style={{ width: 'min(420px, 100%)', background: 'rgba(22,29,50,.94)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,.46), 0 32px 96px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.10)', overflow: 'hidden' }}>
            <h2 style={{ fontSize: 16, fontWeight: 660, letterSpacing: '0.1px', padding: '22px 24px 6px' }}>
              晨报 <span style={{ color: '#8b94a6', fontWeight: 400, fontSize: 12 }}>昨晚结果</span>
            </h2>
            <div style={{ padding: '0 24px 14px', color: '#76819c', fontSize: 12, lineHeight: 1.6, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              公司过夜跑完的交付与待办
            </div>
            <div style={{ padding: '8px 24px 20px' }}>
              <Kv k="通过"><span style={{ color: '#7bc47e' }}>12 件</span> · main 是绿的</Kv>
              <Kv k="待办"><span style={{ color: '#f0b24a' }}>2 件</span> 等你拍板</Kv>
              {/* rev 行 */}
              <div style={{ fontSize: 12.5, padding: '11px 13px', marginTop: 8, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 11, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 1 }}>导出功能</span>
                <span style={{ color: '#7bc47e' }}>已验收</span>
                <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#76819c' }}>03:14</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '13px 20px', borderTop: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.05)' }}>
              <button style={{ fontFamily: UI, fontSize: 12.5, fontWeight: 500, borderRadius: 8, padding: '9px 14px', cursor: 'pointer', border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.05)', color: '#aab4cd' }}>关闭</button>
              <button style={{ fontFamily: UI, fontSize: 12.5, fontWeight: 600, borderRadius: 8, padding: '9px 14px', cursor: 'pointer', border: 0, color: '#0e1a10', background: 'linear-gradient(180deg, #a6eaa6, #6cc47a)', boxShadow: '0 4px 14px rgba(108,196,122,.26), inset 0 1px 0 rgba(255,255,255,.4)' }}>打回重做</button>
            </div>
          </div>

          {/* worksurf 工人详情卡 + mac 三灯 */}
          <div style={{ width: 'min(300px, 100%)', background: 'rgba(22,29,50,.94)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(143,208,255,.2)', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,.46), 0 0 56px rgba(143,208,255,.08), inset 0 1px 0 rgba(255,255,255,.10)', overflow: 'hidden', alignSelf: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px', background: 'rgba(143,208,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', fontSize: 12, color: '#eef2fb', fontFamily: MONO, letterSpacing: '0.2px' }}>
              <span style={{ display: 'inline-flex', gap: 5 }}>
                <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#e2604f', boxShadow: 'inset 0 0 0 .5px rgba(0,0,0,.25)' }} />
                <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffd27a' }} />
                <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#6cc47a' }} />
              </span>
              worker · 后端
            </div>
            <div style={{ padding: '12px 14px', fontSize: 12.5, color: '#aab4cd', lineHeight: 1.65 }}>
              正在跑：<span style={{ color: '#eef2fb' }}>做转写的导出功能</span>
              <div style={{ color: '#d9a86c', fontSize: 11, marginTop: 4 }}>spec · TypeScript / export</div>
            </div>
            <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,.06)', fontFamily: MONO, fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: '#8fd0ff' }}>tool · read src/export.ts</div>
              <div style={{ color: '#7bc47e' }}>ok · 写入 4 个文件</div>
              <div style={{ color: '#76819c' }}>meta · $0.42 · 38s</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', fontFamily: MONO, fontSize: 11, color: '#76819c', marginTop: 20, textAlign: 'center' }}>
          统一骨架 h2 / sub / body(kv·rev) / foot · 焦点环用琥珀 · worksurf 青边 + mac 三灯
        </div>
      </div>
    </PreviewFrame>
  );
}
