import { PreviewFrame } from '../_layout';
import {
  LayoutGrid, Database, Activity, Settings, Search, Workflow, MessageSquare,
  GitBranch, FlaskConical, Sparkles, Bookmark,
} from 'lucide-react';

const DOMAINS = [
  { icon: <LayoutGrid size={15} />, label: '工作台', active: true },
  { icon: <Database size={15} />, label: '知识库' },
  { icon: <Activity size={15} />, label: '观测' },
  { icon: <Settings size={15} />, label: '设置' },
];
const BOOKMARKS = [
  { icon: <Workflow size={16} />, active: true },
  { icon: <MessageSquare size={16} /> },
  { icon: <FlaskConical size={16} /> },
  { icon: <GitBranch size={16} /> },
];

export default function ChameleonProduct() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917', maxWidth: 940, margin: '0 auto' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>PRODUCT · AI</div>
        <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>Chameleon · LLM 应用编排平台</h1>
        <p style={{ fontSize: 13.5, color: '#57534e', margin: '0 0 22px' }}>工程师暖白控制台跑 LLM 编排全流程 · 工作流画布 / playground / Trace / KB / 评测 / embed</p>

        {/* app shell mock */}
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #e7e5e0', boxShadow: '0 8px 24px rgb(0 0 0/8%), 0 2px 8px rgb(0 0 0/4%)', background: '#fffefb' }}>
          {/* top bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 48, padding: '0 14px', background: '#f4f3ee', borderBottom: '1px solid rgb(0 0 0/8%)' }}>
            <span style={{ fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} style={{ color: '#2563eb' }} /> Chameleon
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {DOMAINS.map(d => (
                <span key={d.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 8, fontSize: 12.5,
                  background: d.active ? '#eff6ff' : 'transparent', color: d.active ? '#1d4ed8' : '#57534e', fontWeight: d.active ? 600 : 500,
                }}>{d.icon}{d.label}</span>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, height: 30, padding: '0 10px', borderRadius: 8, background: '#fffefb', border: '1px solid #e7e5e0', color: '#a8a29e', fontSize: 12 }}>
              <Search size={14} /> 搜索 <kbd style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, padding: '1px 5px', background: '#fff', border: '1px solid #e7e5e0', borderRadius: 4 }}>⌘K</kbd>
            </div>
          </div>

          <div style={{ display: 'flex', minHeight: 280 }}>
            {/* bookmark rail */}
            <div style={{ width: 52, background: '#fafaf7', borderRight: '1px solid rgb(0 0 0/8%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 10 }}>
              {BOOKMARKS.map((b, i) => (
                <span key={i} style={{
                  width: 34, height: 34, borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: b.active ? '#eff6ff' : 'transparent', color: b.active ? '#2563eb' : '#78716c',
                }}>{b.icon}</span>
              ))}
              <span style={{ marginTop: 'auto', marginBottom: 10, color: '#d6d3d1' }}><Bookmark size={16} /></span>
            </div>

            {/* canvas content */}
            <div style={{ flex: 1, padding: 20, background: 'radial-gradient(circle, #e7e5e0 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <NodeCard hue="#3b82f6" tint="#eff6ff" label="LLM 调用" sub="qwen-max" icon={<Sparkles size={15} />} />
                <Edge />
                <NodeCard hue="#10b981" tint="#ecfdf5" label="知识检索" sub="3 KB · top-5" icon={<Database size={15} />} />
                <Edge />
                <NodeCard hue="#8b5cf6" tint="#f5f3ff" label="条件分支" sub="if / else" icon={<GitBranch size={15} />} />
              </div>
              <div style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.05)', boxShadow: '0 0 0 1px rgba(139,92,246,0.22)' }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 9999,
                  background: 'conic-gradient(from 90deg, transparent 0%, #8b5cf6 35%, #d946ef 55%, #22d3ee 75%, transparent 100%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)',
                  animation: 'chm-p-spin 0.85s linear infinite',
                }} />
                <span style={{ fontSize: 13, fontWeight: 500, background: 'linear-gradient(90deg,#7c3aed,#d946ef,#22d3ee,#7c3aed)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'chm-p-sh 2.6s linear infinite' }}>运行工作流…</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes chm-p-spin{to{transform:rotate(360deg)}}@keyframes chm-p-sh{to{background-position:200% center}}`}</style>
      </div>
    </PreviewFrame>
  );
}

function NodeCard({ hue, tint, label, sub, icon }: { hue: string; tint: string; label: string; sub: string; icon: React.ReactNode }) {
  return (
    <div style={{ width: 168, borderRadius: 14, background: tint, border: `1px solid ${hue}33`, boxShadow: '0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)', padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: hue, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: 10.5, color: hue, fontFamily: 'JetBrains Mono, monospace' }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Edge() {
  return <span style={{ width: 26, height: 2, background: '#d6d3d1', borderRadius: 2 }} />;
}
