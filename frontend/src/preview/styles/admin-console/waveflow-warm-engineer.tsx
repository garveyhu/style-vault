import { PreviewFrame } from '../../_layout';
import { LayoutDashboard, FolderOpen, ClipboardList } from 'lucide-react';

export default function WaveflowWarmEngineer() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>STYLE · ADMIN-CONSOLE</div>
        <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 8px' }}>Waveflow 暖工程师</h1>
        <p style={{ fontSize: 14, color: '#57534e', marginBottom: 32, maxWidth: 720, lineHeight: 1.6 }}>
          暖白基底 + 墨黑 + blue-600 单一 CTA + Inter/JetBrains Mono/Instrument Serif 三字体 + tnum 工程师细节 + editorial 性格出口（登录 Three.js + serif italic）
        </p>

        {/* color sample */}
        <div style={{ display: 'flex', gap: 0, height: 80, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          {[{ c: '#fafaf7', n: 'warm' }, { c: '#f4f3ee', n: 'warm-2' }, { c: '#fffefb', n: 'paper' }, { c: '#1c1917', n: 'ink' }, { c: '#2563eb', n: 'blue-600' }, { c: '#10b981', n: 'emerald' }, { c: '#ef4444', n: 'red' }, { c: '#f59e0b', n: 'amber' }].map(s => (
            <div key={s.n} style={{ flex: 1, background: s.c, display: 'flex', alignItems: 'end', padding: 8, color: ['#1c1917', '#2563eb', '#ef4444', '#10b981'].includes(s.c) ? '#fff' : '#1c1917', fontSize: 10.5, fontFamily: 'JetBrains Mono, monospace' }}>{s.n}</div>
          ))}
        </div>

        {/* type sample */}
        <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>Waveflow<span style={{ color: '#a8a29e' }}>.</span></div>
          <div style={{ fontSize: 16, marginTop: 4 }}>数据同步与任务调度平台</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#57534e', fontVariantNumeric: 'tabular-nums', marginTop: 12 }}>0 0/5 * * * ? · #12345 · 2026-05-21</div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, color: '#57534e', marginTop: 12 }}>自如流转。</div>
        </div>

        {/* component sample row */}
        <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>调度</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, background: '#fffefb', border: '1px solid #d6d3d1', fontSize: 12 }}><LayoutDashboard size={14} color="#2563eb" /> 运行报表</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, fontSize: 12, color: '#44403c' }}><FolderOpen size={14} color="#78716c" /> 项目管理</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, fontSize: 12, color: '#44403c' }}><ClipboardList size={14} color="#78716c" /> 任务管理</span>
          <button style={{ height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500 }}>primary</button>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgb(16 185 129 / 15%)' }} />
            <span style={{ fontSize: 12, color: '#059669' }}>running</span>
          </span>
        </div>
      </div>
    </PreviewFrame>
  );
}
