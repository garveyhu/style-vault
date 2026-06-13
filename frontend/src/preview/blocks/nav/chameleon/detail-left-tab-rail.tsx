import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft, FileText, Search, BarChart3, Tag, FlaskConical, ShieldCheck, KeyRound, Settings,
  ChevronLeft, ChevronsLeft, MessageSquare, Layers, Activity, Globe, Server, Code2, Copy, Rocket,
} from 'lucide-react';

/**
 * detail-left-tab-rail · 详情页左窄栏竖向 tab + 应用级 rail
 * (A) KB 详情 176px 轻量 tab rail   (B) 编辑器 256px graph-app-rail
 * 源码：kbs/pages/kb-detail-page.tsx + graphs/components/app-shell/graph-app-rail.tsx
 */

const PRIMARY = [
  { label: '文档', icon: FileText, active: true },
  { label: '召回测试', icon: Search, active: false },
  { label: '概览', icon: BarChart3, active: false },
];
const ADVANCED = [
  { label: '元数据', icon: Tag },
  { label: '评测', icon: FlaskConical },
  { label: '一致性', icon: ShieldCheck },
  { label: '服务 API', icon: KeyRound },
  { label: '设置', icon: Settings },
];
const APP_NAV = [
  { label: '编排', icon: Layers, active: true },
  { label: '监测', icon: Activity, active: false },
];

export default function DetailLeftTabRail() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', gap: 28, padding: 24, fontFamily: 'Inter, system-ui, sans-serif', minHeight: 600 }}>

        {/* ════ (A) 轻量 KB 详情 tab rail ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Tag2>A · KB 详情 (w-44 / 176px)</Tag2>
          <div style={{ display: 'flex', gap: 16 }}>
            <nav style={{ width: 176, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* 身份块 */}
              <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
                <span style={{ display: 'flex', width: 24, height: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#a8a29e', cursor: 'pointer' }}><ArrowLeft size={16} /></span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14, fontWeight: 600, color: '#1c1917' }}>产品手册 KB</div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>kbs-product-7f</div>
                </div>
              </div>
              {PRIMARY.map(t => <NavBtn key={t.label} {...t} />)}
              <div style={{ margin: '8px 0', borderTop: '1px solid rgba(231,229,224,0.6)' }} />
              <div style={{ padding: '0 12px 4px', fontSize: 10.5, letterSpacing: '0.05em', color: '#a8a29e', textTransform: 'uppercase' }}>进阶</div>
              {ADVANCED.map(t => <NavBtn key={t.label} label={t.label} icon={t.icon} active={false} />)}
            </nav>
            {/* 内容区 */}
            <div style={{ width: 280, borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: 13 }}>
              文档 tab 内容区
            </div>
          </div>
        </div>

        {/* ════ (B) 重量 graph-app-rail ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Tag2>B · 编辑器应用栏 graph-app-rail (w-64 / 256px)</Tag2>
          <aside style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(226,232,240,0.8)', border: '1px solid rgba(226,232,240,0.8)', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
            {/* 应用头 */}
            <div style={{ borderBottom: '1px solid rgba(226,232,240,0.8)', padding: 14 }}>
              <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '2px 6px 2px 4px', fontSize: 11.5, fontWeight: 500, color: '#78716c', cursor: 'pointer' }}><ChevronLeft size={14} /> 返回应用</span>
                <span style={{ display: 'inline-flex', borderRadius: 6, padding: 6, color: '#a8a29e', cursor: 'pointer' }}><ChevronsLeft size={16} /></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ display: 'flex', width: 36, height: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#f5f3ff', color: '#7c3aed', boxShadow: '0 1px 2px rgb(0 0 0 / 5%)', border: '1px solid rgba(196,181,253,0.6)' }}>
                  <MessageSquare size={18} />
                </span>
                <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, lineHeight: 1.2, fontWeight: 600, color: '#1c1917' }}>客服对话工作流</div>
                  <div style={{ marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>graph-cs-9f2a</div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, width: 88, padding: '0 8px', borderRadius: 6, border: '1px solid #d6d3d1', fontSize: 11.5, color: '#44403c', boxSizing: 'border-box' }}>对话流</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#ecfdf5', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#047857', border: '1px solid rgba(167,243,208,0.6)' }}><Rocket size={10} /> v3</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 500, color: '#d97706' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} /> 未保存
                </span>
              </div>
            </div>

            {/* 二级导航 */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 8 }}>
              {APP_NAV.map(n => {
                const Icon = n.icon;
                return (
                  <div key={n.label} style={{
                    position: 'relative', display: 'flex', alignItems: 'center', gap: 10,
                    borderRadius: 8, padding: '6px 10px 6px 12px', fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                    background: n.active ? '#eff6ff' : 'transparent', color: n.active ? '#1d4ed8' : '#57534e',
                  }}>
                    {n.active && <span style={{ position: 'absolute', top: 6, bottom: 6, left: 0, width: 3, borderRadius: 9999, background: '#3b82f6' }} />}
                    <Icon size={16} color={n.active ? '#2563eb' : '#a8a29e'} />
                    {n.label}
                  </div>
                );
              })}
            </nav>

            {/* 应用卡片区 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', borderTop: '1px solid rgba(226,232,240,0.8)', background: 'rgba(248,250,252,0.4)', padding: 10 }}>
              <AppCard icon={Globe} title="Web App" on>
                <div style={{ display: 'flex', gap: 6 }}>
                  <RailAction icon={Code2} label="对话页打开" />
                  <RailAction icon={Code2} label="嵌入式应用" />
                </div>
              </AppCard>
              <AppCard icon={Server} title="后端服务 API" on>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, border: '1px solid rgba(226,232,240,0.8)', background: '#f8fafc', padding: '6px 8px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c' }}>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://api.chameleon.dev/v1</span>
                  <Copy size={12} color="#a8a29e" />
                </div>
                <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                  <RailAction icon={Code2} label="API 文档" />
                  <RailAction icon={KeyRound} label="API 密钥" />
                </div>
              </AppCard>
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Tag2({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e', fontWeight: 600 }}>{children}</div>;
}

function NavBtn({ label, icon: Icon, active }: { label: string; icon: React.ComponentType<{ size?: number; color?: string }>; active: boolean }) {
  return (
    <div style={{
      display: 'flex', width: '100%', alignItems: 'center', gap: 10, borderRadius: 8,
      padding: '8px 12px', textAlign: 'left', fontSize: 13, fontWeight: 500, cursor: 'pointer',
      background: active ? '#eff6ff' : 'transparent', color: active ? '#1d4ed8' : '#57534e',
    }}>
      <Icon size={16} color={active ? '#1d4ed8' : '#57534e'} />
      {label}
    </div>
  );
}

function AppCard({ icon: Icon, title, on, children }: { icon: React.ComponentType<{ size?: number; color?: string }>; title: string; on?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(226,232,240,0.8)', background: '#fff', padding: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 5%)' }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ display: 'flex', width: 20, height: 20, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#f5f5f4', color: '#78716c' }}><Icon size={12} /></span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#292524' }}>{title}</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999, padding: '2px 6px', fontSize: 9.5, fontWeight: 500, background: on ? '#ecfdf5' : '#f5f5f4', color: on ? '#059669' : '#a8a29e', border: on ? '1px solid rgba(167,243,208,0.5)' : 'none' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: on ? '#10b981' : '#d6d3d1' }} />
          {on ? '可用' : '未启用'}
        </span>
      </div>
      {children}
    </div>
  );
}

function RailAction({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; color?: string }>; label: string }) {
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, border: '1px solid rgba(226,232,240,0.7)', background: '#f8fafc', padding: '6px 8px', fontSize: 11, fontWeight: 500, color: '#57534e', cursor: 'pointer' }}>
      <Icon size={12} color="#a8a29e" />
      {label}
    </div>
  );
}
