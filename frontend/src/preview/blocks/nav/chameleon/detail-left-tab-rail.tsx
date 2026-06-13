import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft, FileText, Search, BarChart3, Tag, FlaskConical, ShieldCheck, KeyRound, Settings,
  ChevronLeft, ChevronsLeft, ChevronDown, MessageSquare, Workflow, Layers, Activity, Globe, Server,
  Code2, Copy, ExternalLink, Rocket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * detail-left-tab-rail · 详情页左窄栏竖向 tab + 应用级 rail
 * (A) KB 详情 176px 轻量 tab rail   (B) 编辑器 256px graph-app-rail（贴边整栏，仅 border-r）
 * 源码：kbs/pages/kb-detail-page.tsx + graphs/components/app-shell/graph-app-rail.tsx
 *
 * B 覆盖：chat(violet ring-violet-200/60) / workflow(sky) 两态、published(Rocket emerald)+draft(amber) 发布徽标、
 *   saving(blue)/dirty(amber)/saved(stone) 保存三态、KindSelect 带 ChevronDown、对话页打开用 ExternalLink。
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
      <div style={{ display: 'flex', gap: 28, padding: 24, fontFamily: 'Inter, system-ui, sans-serif', minHeight: 600, alignItems: 'flex-start' }}>

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
            <div style={{ width: 280, alignSelf: 'stretch', borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: 13 }}>
              文档 tab 内容区
            </div>
          </div>
        </div>

        {/* ════ (B) 重量 graph-app-rail（贴边整栏 h-screen w-64 border-r，无圆角无四边框） ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Tag2>B · 编辑器应用栏 graph-app-rail (w-64 / 256px · 贴边 border-r)</Tag2>
          <div style={{ display: 'flex', gap: 0 }}>
            {/* chatflow / 已发布 v3 / 未保存（违和：violet 图标 ring-violet-200/60） */}
            <GraphAppRail
              variant="chat"
              name="客服对话工作流"
              graphKey="graph-cs-9f2a"
              kindLabel="对话流"
              publish="published"
              save="dirty"
            />
            {/* workflow / 草稿 / 保存中（sky 图标 ring-sky-200/60） */}
            <GraphAppRail
              variant="workflow"
              name="日报生成流程"
              graphKey="graph-report-1c"
              kindLabel="工作流"
              publish="draft"
              save="saving"
            />
          </div>
          {/* 保存态第三态（已保存）补示意 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 2px' }}>
            <SaveIndicator state="saving" />
            <SaveIndicator state="dirty" />
            <SaveIndicator state="saved" />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Tag2({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e', fontWeight: 600 }}>{children}</div>;
}

function NavBtn({ label, icon: Icon, active }: { label: string; icon: LucideIcon; active: boolean }) {
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

/* graph-app-rail：aside h-screen w-64 shrink-0 border-r border-slate-200/80 bg-white（无圆角、仅右边框） */
function GraphAppRail({
  variant,
  name,
  graphKey,
  kindLabel,
  publish,
  save,
}: {
  variant: 'chat' | 'workflow';
  name: string;
  graphKey: string;
  kindLabel: string;
  publish: 'published' | 'draft';
  save: 'saving' | 'dirty' | 'saved';
}) {
  const isChat = variant === 'chat';
  const IconComp = isChat ? MessageSquare : Workflow;
  return (
    <aside style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(226,232,240,0.8)', background: '#fff', minHeight: 520 }}>
      {/* 应用头 p-3.5(14) border-b border-slate-200/80 */}
      <div style={{ borderBottom: '1px solid rgba(226,232,240,0.8)', padding: 14 }}>
        <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '2px 6px 2px 4px', fontSize: 11.5, fontWeight: 500, color: '#78716c', cursor: 'pointer' }}><ChevronLeft size={14} /> 返回应用</span>
          <span style={{ display: 'inline-flex', borderRadius: 6, padding: 6, color: '#a8a29e', cursor: 'pointer' }}><ChevronsLeft size={16} /></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {/* 图标块 h-9 w-9 rounded-xl(12) shadow-sm ring-1；chat=violet-50/violet-600/ring-violet-200/60(#ddd6fe@60%) workflow=sky-50/sky-600/ring-sky-200/60(#bae6fd@60%) */}
          <span
            style={{
              display: 'flex',
              width: 36,
              height: 36,
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              background: isChat ? '#f5f3ff' : '#f0f9ff',
              color: isChat ? '#7c3aed' : '#0284c7',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)',
              border: isChat ? '1px solid rgba(221,214,254,0.6)' : '1px solid rgba(186,230,253,0.6)',
            }}
          >
            <IconComp size={18} />
          </span>
          <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, lineHeight: 1.2, fontWeight: 600, color: '#1c1917' }}>{name}</div>
            <div style={{ marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>{graphKey}</div>
          </div>
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* KindSelect：h-6(24) w-88 px-2(8) text-[11.5px] rounded-md border-stone-300 + ChevronDown h-4 w-4 opacity-50 */}
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', height: 24, width: 88, padding: '0 8px', borderRadius: 6, border: '1px solid #d6d3d1', fontSize: 11.5, color: '#44403c', boxSizing: 'border-box', cursor: 'pointer' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{kindLabel}</span>
            <ChevronDown size={16} color="#44403c" style={{ opacity: 0.5, flexShrink: 0 }} />
          </span>
          {/* 发布徽标：published(emerald + Rocket) / draft(amber「草稿」) */}
          {publish === 'published' ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#ecfdf5', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#047857', boxShadow: 'inset 0 0 0 1px rgba(167,243,208,0.6)' }}><Rocket size={10} /> v3</span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 6, background: '#fffbeb', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#b45309', boxShadow: 'inset 0 0 0 1px rgba(253,230,138,0.6)' }}>草稿</span>
          )}
          <span style={{ marginLeft: 'auto' }}>
            <SaveIndicator state={save} />
          </span>
        </div>
      </div>

      {/* 二级导航 p-2 gap-0.5 */}
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

      {/* 应用卡片区 flex-1 space-y-2.5 border-t border-slate-200/80 bg-slate-50/40 p-2.5 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', borderTop: '1px solid rgba(226,232,240,0.8)', background: 'rgba(248,250,252,0.4)', padding: 10 }}>
        <AppCard icon={Globe} title="Web App" on={isChat}>
          <div style={{ display: 'flex', gap: 6 }}>
            {/* 对话页打开 = ExternalLink；嵌入式应用 = Code2 */}
            <RailAction icon={ExternalLink} label="对话页打开" />
            <RailAction icon={Code2} label="嵌入式应用" />
          </div>
        </AppCard>
        <AppCard icon={Server} title="后端服务 API" on={isChat}>
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
  );
}

/* 保存态：saving=text-blue-500 dot bg-blue-400 animate-pulse / dirty=text-amber-600 dot bg-amber-400 / saved=text-stone-400 dot bg-stone-300 */
function SaveIndicator({ state }: { state: 'saving' | 'dirty' | 'saved' }) {
  const map = {
    saving: { text: '#3b82f6', dot: '#60a5fa', label: '保存中', pulse: true },
    dirty: { text: '#d97706', dot: '#fbbf24', label: '未保存', pulse: false },
    saved: { text: '#a8a29e', dot: '#d6d3d1', label: '已保存', pulse: false },
  }[state];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 500, color: map.text }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: map.dot,
          animation: map.pulse ? 'cm-savepulse 1.4s ease-in-out infinite' : undefined,
        }}
      />
      {map.label}
      <style>{`@keyframes cm-savepulse { 0%,100% { opacity: 1 } 50% { opacity: .4 } }`}</style>
    </span>
  );
}

/* Card：rounded-xl(12) border-slate-200/80 bg-white p-3 shadow-sm ring-1 ring-stone-900/[0.02] */
function AppCard({ icon: Icon, title, on, children }: { icon: LucideIcon; title: string; on?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(226,232,240,0.8)', background: '#fff', padding: 12, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)' }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ display: 'flex', width: 20, height: 20, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#f5f5f4', color: '#78716c' }}><Icon size={12} /></span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#292524' }}>{title}</span>
        {/* tone on: bg-emerald-50 text-emerald-600 ring-emerald-200/50 dot emerald-500 / off: bg-stone-100 text-stone-400 dot stone-300 */}
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999, padding: '2px 6px', fontSize: 9.5, fontWeight: 500, background: on ? '#ecfdf5' : '#f5f5f4', color: on ? '#059669' : '#a8a29e', boxShadow: on ? 'inset 0 0 0 1px rgba(167,243,208,0.5)' : 'none' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: on ? '#10b981' : '#d6d3d1' }} />
          {on ? '可用' : '未启用'}
        </span>
      </div>
      {children}
    </div>
  );
}

/* RailAction：flex-1 rounded-lg(8) border-slate-200/70 bg-slate-50 px-2 py-1.5 text-[11px] font-medium text-stone-600 + Icon h-3 w-3 */
function RailAction({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 8, border: '1px solid rgba(226,232,240,0.7)', background: '#f8fafc', padding: '6px 8px', fontSize: 11, fontWeight: 500, color: '#57534e', cursor: 'pointer' }}>
      <Icon size={12} color="#a8a29e" />
      {label}
    </div>
  );
}
