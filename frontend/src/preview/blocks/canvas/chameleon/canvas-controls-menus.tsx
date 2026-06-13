import { PreviewFrame } from '../../../_layout';
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  ClipboardPaste,
  Copy,
  CopyPlus,
  History,
  LayoutGrid,
  Maximize2,
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
 * 源码：graph-editor-page.tsx + zoom-control.tsx + checklist-badge.tsx
 * 1:1：白卡 bg-white/95 + shadow-md + backdrop-blur / 状态徽标 / split button / MENU_BTN
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const card: React.CSSProperties = {
  border: '1px solid rgba(231,229,224,0.8)',
  background: 'rgba(255,255,255,0.95)',
  boxShadow: '0 4px 12px rgb(0 0 0 / 8%)',
  backdropFilter: 'blur(6px)',
};

export default function CanvasControlsMenus() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 520,
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: FONT,
          background:
            'radial-gradient(circle, rgba(214,211,209,0.45) 1px, transparent 1px) 0 0 / 16px 16px, #fbfbf9',
        }}
      >
        {/* ── 左上：运行状态徽标 ── */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: 11.5,
            ...card,
            border: '1px solid rgba(231,229,224,0.7)',
            background: 'rgba(255,255,255,0.9)',
          }}
        >
          <span style={{ height: 6, width: 6, borderRadius: '50%', background: '#3b82f6', animation: 'cc-pulse 1.4s ease-in-out infinite' }} />
          <span style={{ color: '#2563eb' }}>运行中…</span>
        </div>

        {/* ── 右上：工具栏 ── */}
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
            ...card,
            border: '1px solid rgba(231,229,224,0.7)',
            background: 'rgba(255,255,255,0.85)',
          }}
        >
          {/* checklist 徽标：error 数字胶囊 */}
          <button style={iconBtn(28)} title="检查清单">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 16,
                minWidth: 16,
                borderRadius: 9999,
                background: '#f43f5e',
                padding: '0 4px',
                fontFamily: MONO,
                fontSize: 9.5,
                fontWeight: 600,
                color: '#fff',
              }}
            >
              2
            </span>
          </button>
          <button style={iconBtn(28)} title="AI 生成"><Sparkles size={12} color="#57534e" /></button>
          <button style={iconBtn(28)} title="运行日志"><History size={12} color="#57534e" /></button>
          <button style={iconBtn(28)} title="更多"><MoreHorizontal size={12} color="#57534e" /></button>
          <OutlineBtn icon={<Play size={12} />} label="运行" />
          <OutlineBtn icon={<Save size={12} />} label="保存" />
          {/* 发布 split button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                height: 28,
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
                height: 28,
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

        {/* ── 左下：撤销 / 重做 ── */}
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

        {/* ── 节点幽灵（跟随光标） ── */}
        <div
          style={{
            position: 'absolute',
            top: 90,
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
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%)',
          }}
        >
          <Sparkles size={14} />
          大模型
          <span style={{ fontSize: 10, fontWeight: 400, color: '#a8a29e' }}>点击画布放置 · Esc 取消</span>
        </div>

        {/* ── 节点态右键菜单 ── */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 230,
            minWidth: 176,
            overflow: 'hidden',
            borderRadius: 8,
            border: '1px solid #e7e5e4',
            background: '#fff',
            padding: '4px 0',
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
          }}
        >
          <MenuBtn icon={<Copy size={14} color="#a8a29e" />} label="复制" kbd="⌘C" />
          <MenuBtn icon={<ClipboardPaste size={14} color="#a8a29e" />} label="粘贴" kbd="⌘V" />
          <MenuBtn icon={<CopyPlus size={14} color="#a8a29e" />} label="创建副本" kbd="⌘D" />
          <Sep />
          <MenuBtn icon={<Play size={14} color="#a8a29e" />} label="测试此节点" />
          <Sep />
          <MenuBtn icon={<Trash2 size={14} color="#dc2626" />} label="删除节点" kbd="⌫" danger />
        </div>

        {/* ── 多选态右键菜单（对齐 / 分布） ── */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 440,
            minWidth: 176,
            overflow: 'hidden',
            borderRadius: 8,
            border: '1px solid #e7e5e4',
            background: '#fff',
            padding: '4px 0',
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
          }}
        >
          <MenuLabel>已选 3 个节点</MenuLabel>
          <MenuBtn icon={<Copy size={14} color="#a8a29e" />} label="复制" kbd="⌘C" />
          <MenuBtn icon={<CopyPlus size={14} color="#a8a29e" />} label="创建副本" kbd="⌘D" />
          <Sep />
          <MenuLabel>对齐</MenuLabel>
          <MenuBtn icon={<AlignStartVertical size={14} color="#a8a29e" />} label="左对齐" />
          <MenuBtn icon={<AlignCenterVertical size={14} color="#a8a29e" />} label="水平居中" />
          <MenuBtn icon={<AlignEndVertical size={14} color="#a8a29e" />} label="右对齐" />
        </div>
      </div>
      <style>{`@keyframes cc-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </PreviewFrame>
  );
}

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

function OutlineBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 28,
        padding: '0 10px',
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
        color: danger ? '#dc2626' : '#44403c',
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
    <div style={{ padding: '4px 12px 2px', fontSize: 10, fontWeight: 500, letterSpacing: '0.02em', color: '#a8a29e' }}>
      {children}
    </div>
  );
}
