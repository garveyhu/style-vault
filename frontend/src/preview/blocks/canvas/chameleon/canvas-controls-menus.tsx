import { PreviewFrame } from '../../../_layout';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  Bot,
  CheckCircle2,
  ClipboardPaste,
  Copy,
  CopyPlus,
  History,
  LayoutGrid,
  Maximize2,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Play,
  Plus,
  Redo2,
  Rocket,
  Save,
  Sparkles,
  Trash2,
  Undo2,
  ChevronDown,
} from 'lucide-react';

/**
 * canvas-controls-menus · 画布角落浮层控件 + 三态右键菜单
 * 源码：graph-editor-page.tsx + zoom-control.tsx + checklist-badge.tsx + subgraph-canvas.tsx
 * 1:1：白卡 bg-white/95 + shadow-md + backdrop-blur / 运行 4 态 / checklist 5 态 /
 *      split button(size=sm h-8) / MENU_BTN 全量对齐+分布+批量删除
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

// 白卡（shadow-md）—— ZoomControl / undo / 运行状态徽标 / palette + 通用
const card: React.CSSProperties = {
  border: '1px solid rgba(231,229,224,0.8)',
  background: 'rgba(255,255,255,0.95)',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)',
  backdropFilter: 'blur(6px)',
};

export default function CanvasControlsMenus() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 600,
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: FONT,
          // 画布底色：slate-50 + slate-200 点阵（对齐源码 BackgroundVariant.Dots gap 16）
          background:
            'radial-gradient(circle, #e2e8f0 1px, transparent 1px) 0 0 / 16px 16px, #f8fafc',
        }}
      >
        {/* ── 左上：运行状态徽标（border-stone-200/70 bg-white/90 shadow-md）4 态并排示意 ── */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <RunBadge>
            <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#3b82f6', animation: 'cc-pulse 1.4s ease-in-out infinite' }} />
            <span style={{ color: '#2563eb' }}>运行中…</span>
          </RunBadge>
          <RunBadge>
            <span style={{ color: '#059669' }}>✓ 运行成功 · 1280ms</span>
          </RunBadge>
          <RunBadge>
            <span style={{ color: '#e11d48' }}>✗ 运行失败</span>
          </RunBadge>
          <RunBadge>
            <span style={{ color: '#d97706' }}>⏸ 已暂停（回填见运行日志）</span>
          </RunBadge>
        </div>

        {/* ── 右上：工具栏 rounded-xl border-stone-200/70 bg-white/85 px-2 py-1.5 gap-1.5 ── */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 12,
            padding: '6px 8px',
            border: '1px solid rgba(231,229,224,0.7)',
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* checklist 徽标 5 态并排（实际是单按钮，这里全部示意） */}
          <button style={ghostBtn} title="检查清单（error）">
            <Pill bg="#f43f5e">2</Pill>
          </button>
          <button style={ghostBtn} title="检查清单（warning）">
            <Pill bg="#fbbf24">1</Pill>
          </button>
          <button style={ghostBtn} title="检查清单（ready）">
            <CheckCircle2 size={14} color="#10b981" />
          </button>
          <button style={ghostBtn} title="检查清单（checking）">
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: '#60a5fa', animation: 'cc-pulse 1.4s ease-in-out infinite' }} />
          </button>
          <button style={ghostBtn} title="检查清单（idle/unavailable）">
            <Minus size={12} color="#d6d3d1" />
          </button>

          <span style={{ margin: '0 1px', height: 16, width: 1, background: 'rgba(214,211,209,0.6)' }} />

          {/* ghost size=sm Button：AI / 日志 / 更多（h-8 = 32） */}
          <GhostSmBtn title="AI 生成工作流"><Sparkles size={12} color="#57534e" /></GhostSmBtn>
          <GhostSmBtn title="查看运行日志"><History size={12} color="#57534e" /></GhostSmBtn>
          <GhostSmBtn title="导入 / 导出配置"><MoreHorizontal size={12} color="#57534e" /></GhostSmBtn>

          {/* 对话调试（对话型）—— MessageSquare */}
          <OutlineBtn icon={<MessageSquare size={12} />} label="对话调试" />
          {/* 运行（流程型）—— Play */}
          <OutlineBtn icon={<Play size={12} />} label="运行" />
          <OutlineBtn icon={<Save size={12} />} label="保存" />

          {/* 发布 split button（size=sm h-8 = 32，rounded-r-none + rounded-l-none border-l border-white/25） */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                height: 32,
                padding: '0 10px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px 0 0 6px',
                fontSize: 11.5,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Rocket size={12} /> 发布
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 32,
                padding: '0 6px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderLeft: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '0 6px 6px 0',
                cursor: 'pointer',
              }}
            >
              <ChevronDown size={12} style={{ opacity: 0.8 }} />
            </button>
          </div>
        </div>

        {/* ── 左下：撤销 / 重做（rounded-lg border-stone-200/80 px-1 py-1 gap-0.5） ── */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 8, padding: 4, ...card }}>
          <button style={iconBtn(24)} title="撤销 (⌘Z)"><Undo2 size={14} color="#78716c" /></button>
          <button style={iconBtn(24)} title="重做 (⇧⌘Z)" disabled><Redo2 size={14} color="#78716c" style={{ opacity: 0.35 }} /></button>
        </div>

        {/* ── 右下：缩放栏 ── */}
        <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 8, padding: 4, ...card }}>
          <button style={iconBtn(24)} title="全屏自适应"><Maximize2 size={14} color="#78716c" /></button>
          <button style={iconBtn(24)} title="自动整理"><LayoutGrid size={14} color="#78716c" /></button>
          <div style={{ margin: '0 2px', height: 14, width: 1, background: 'rgba(214,211,209,0.8)' }} />
          <button style={iconBtn(24)} title="缩小"><Minus size={14} color="#78716c" /></button>
          <span style={{ minWidth: 40, textAlign: 'center', fontFamily: MONO, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: '#57534e' }}>
            85%
          </span>
          <button style={iconBtn(24)} title="放大"><Plus size={14} color="#78716c" /></button>
        </div>

        {/* ── 节点幽灵（跟随光标，llm = Bot 图标，violet-700 #6d28d9） ── */}
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 200,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 6,
            border: '2px dashed #8b5cf6',
            background: 'rgba(255,255,255,0.95)',
            padding: '6px 10px',
            fontSize: 11.5,
            fontWeight: 500,
            color: '#6d28d9',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%)',
          }}
        >
          <Bot size={14} />
          大模型
          <span style={{ fontSize: 10, fontWeight: 400, color: '#a8a29e' }}>点击画布放置 · Esc 取消</span>
        </div>

        {/* ── 节点态右键菜单（shadow-pop min-w-[176px] rounded-lg border-stone-200） ── */}
        <div style={{ ...menuShell, top: 220, left: 220 }}>
          <MenuBtn icon={<Copy size={14} color="#a8a29e" />} label="复制" kbd="⌘C" />
          <MenuBtn icon={<ClipboardPaste size={14} color="#a8a29e" />} label="粘贴" kbd="⌘V" />
          <MenuBtn icon={<CopyPlus size={14} color="#a8a29e" />} label="创建副本" kbd="⌘D" />
          <Sep />
          <MenuBtn icon={<Trash2 size={14} color="#e11d48" />} label="删除节点" kbd="⌫" danger />
        </div>

        {/* ── 多选态右键菜单（已选 N + 复制/副本 + 6 对齐 + 分布 + 批量删除） ── */}
        <div style={{ ...menuShell, top: 220, left: 430 }}>
          <MenuLabel>已选 3 个节点</MenuLabel>
          <MenuBtn icon={<Copy size={14} color="#a8a29e" />} label="复制" kbd="⌘C" />
          <MenuBtn icon={<CopyPlus size={14} color="#a8a29e" />} label="创建副本" kbd="⌘D" />
          <Sep />
          <MenuLabel>对齐</MenuLabel>
          <MenuBtn icon={<AlignStartVertical size={14} color="#a8a29e" />} label="左对齐" />
          <MenuBtn icon={<AlignCenterVertical size={14} color="#a8a29e" />} label="水平居中" />
          <MenuBtn icon={<AlignEndVertical size={14} color="#a8a29e" />} label="右对齐" />
          <MenuBtn icon={<AlignStartHorizontal size={14} color="#a8a29e" />} label="顶对齐" />
          <MenuBtn icon={<AlignCenterHorizontal size={14} color="#a8a29e" />} label="垂直居中" />
          <MenuBtn icon={<AlignEndHorizontal size={14} color="#a8a29e" />} label="底对齐" />
          <Sep />
          <MenuLabel>分布</MenuLabel>
          <MenuBtn icon={<AlignHorizontalDistributeCenter size={14} color="#a8a29e" />} label="水平均分" />
          <MenuBtn icon={<AlignVerticalDistributeCenter size={14} color="#a8a29e" />} label="垂直均分" />
          <Sep />
          <MenuBtn icon={<Trash2 size={14} color="#e11d48" />} label="批量删除" kbd="⌫" danger />
        </div>
      </div>
      <style>{`@keyframes cc-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </PreviewFrame>
  );
}

const menuShell: React.CSSProperties = {
  position: 'absolute',
  minWidth: 176,
  overflow: 'hidden',
  borderRadius: 8,
  border: '1px solid #e7e5e0',
  background: '#fff',
  padding: '4px 0',
  // shadow-pop
  boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
};

function RunBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        padding: '4px 10px',
        fontSize: 11.5,
        border: '1px solid rgba(231,229,224,0.7)',
        background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(6px)',
        width: 'fit-content',
      }}
    >
      {children}
    </div>
  );
}

function Pill({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        minWidth: 16,
        borderRadius: 9999,
        background: bg,
        padding: '0 4px',
        fontFamily: MONO,
        fontSize: 9.5,
        fontWeight: 600,
        color: '#fff',
      }}
    >
      {children}
    </span>
  );
}

const ghostBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  width: 28,
  borderRadius: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

function iconBtn(size: number): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: size,
    width: size,
    borderRadius: 6,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };
}

// ghost variant size=sm Button：h-8 = 32，方形（仅 icon）
function GhostSmBtn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        minWidth: 32,
        padding: '0 8px',
        background: 'transparent',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// outline variant size=sm Button：h-8 = 32
function OutlineBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 32,
        padding: '0 12px',
        background: '#fff',
        color: '#44403c',
        border: '1px solid #d6d3d1',
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function MenuBtn({ icon, label, kbd, danger }: { icon: React.ReactNode; label: string; kbd?: string; danger?: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '6px 12px',
        textAlign: 'left',
        fontSize: 12.5,
        color: danger ? '#e11d48' : '#44403c',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {icon}
      {label}
      {kbd && <span style={{ marginLeft: 'auto', fontSize: 10, color: '#d6d3d1' }}>{kbd}</span>}
    </button>
  );
}

function Sep() {
  return <div style={{ margin: '4px 0', height: 1, background: '#f5f5f4' }} />;
}

function MenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '4px 12px 2px', fontSize: 10, fontWeight: 500, letterSpacing: '0.025em', color: '#a8a29e' }}>
      {children}
    </div>
  );
}
