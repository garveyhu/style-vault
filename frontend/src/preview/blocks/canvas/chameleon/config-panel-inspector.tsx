import { PreviewFrame } from '../../../_layout';
import {
  ChevronDown,
  Copy,
  GitBranch,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

/**
 * config-panel-inspector · 画布右侧节点配置 inspector + 条件 builder
 * 源码：node-inspector.tsx + panel-kit.tsx + panel-tabs.tsx + if-else-condition.tsx + node-toolbar.tsx
 * 1:1：h-9 图标块 / 纯文本名字输入 / 下划线 Tab / Section / IF-ELSE 卡 / AND-OR 胶囊 / hover 快捷条
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

export default function ConfigPanelInspector() {
  return (
    <PreviewFrame bg="#f4f3ee" padded>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', height: 640, fontFamily: FONT }}>
        {/* 节点 hover 快捷条（左侧示意，浮在节点上方） */}
        <div style={{ position: 'absolute', top: 40, left: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              height: 28,
              borderRadius: 8,
              border: '1px solid rgba(231,229,224,0.8)',
              background: 'rgba(255,255,255,0.95)',
              padding: '2px 4px',
              boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <button style={miniBtn} title="测试此节点"><Play size={14} color="#78716c" /></button>
            <button style={miniBtn} title="重命名"><Pencil size={14} color="#78716c" /></button>
            <button style={miniBtn} title="复制节点"><Copy size={14} color="#78716c" /></button>
            <span style={{ margin: '0 2px', height: 14, width: 1, background: '#e7e5e4' }} />
            <button style={miniBtn} title="删除节点"><Trash2 size={14} color="#dc2626" /></button>
          </div>
          <div
            style={{
              marginTop: 8,
              width: 168,
              borderRadius: 14,
              border: '1px solid rgba(245,158,11,0.25)',
              background: 'rgba(254,252,232,0.4)',
              padding: '8px 10px',
              boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 26,
                  width: 26,
                  borderRadius: 9,
                  background: '#fffbeb',
                  boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
                }}
              >
                <GitBranch size={14} color="#b45309" />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>分支判断</div>
                <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#b45309' }}>
                  条件分支
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧悬浮 inspector 外壳 */}
        <div
          style={{
            width: 360,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(231,229,224,0.7)',
            background: 'rgba(250,250,247,0.95)',
            boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <aside style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
            {/* 左缘拖拽把手 */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'col-resize' }}>
              <span style={{ height: 40, width: 1, borderRadius: 1, background: '#e2e8f0' }} />
            </div>

            {/* header */}
            <header
              style={{
                borderBottom: '1px solid rgba(226,232,240,0.8)',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 10px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                    borderRadius: 12,
                    background: '#fffbeb',
                    color: '#b45309',
                    boxShadow: '0 1px 2px rgb(0 0 0 / 6%), inset 0 0 0 1px #fde68a',
                  }}
                >
                  <GitBranch size={18} />
                </span>
                {/* 纯文本观感名字输入 */}
                <input
                  defaultValue="按分数路由"
                  style={{
                    marginLeft: -6,
                    height: 32,
                    flex: 1,
                    minWidth: 0,
                    borderRadius: 6,
                    border: 'none',
                    background: 'transparent',
                    padding: '0 6px',
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: '#1c1917',
                    outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: -4 }}>
                  <button style={hdrBtn} title="测试此节点"><Play size={15} color="#a8a29e" /></button>
                  <button style={hdrBtn} title="更多操作"><MoreHorizontal size={15} color="#a8a29e" /></button>
                  <span style={{ margin: '0 2px', height: 16, width: 1, background: '#e7e5e4' }} />
                  <button style={hdrBtn} title="关闭"><X size={15} color="#a8a29e" /></button>
                </div>
              </div>
              {/* 下划线 Tab */}
              <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <TabItem active>设置</TabItem>
                <TabItem>上次运行</TabItem>
              </div>
            </header>

            <div style={{ padding: '4px 20px 24px', overflowY: 'auto' }}>
              {/* if_else 条件 builder */}
              <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* ModeTab 行 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <label style={{ flex: 1, fontSize: 11.5, fontWeight: 500, color: '#57534e' }}>条件</label>
                  <ModeTab active>简单</ModeTab>
                  <ModeTab>多分支</ModeTab>
                  <ModeTab>高级 JSON</ModeTab>
                </div>

                {/* IF 卡 */}
                <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <CaseBadge>IF</CaseBadge>
                    <span style={{ fontSize: 10.5, color: '#a8a29e' }}>命中走 true 出边</span>
                  </div>
                  {/* 条件行 1 */}
                  <CondRow field="user.score" op="≥ 大于等于" value="80" />
                  {/* AND/OR 胶囊 */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
                    <button
                      style={{
                        borderRadius: 9999,
                        border: '1px solid #bfdbfe',
                        background: '#eff6ff',
                        padding: '1px 8px',
                        fontFamily: MONO,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#2563eb',
                        cursor: 'pointer',
                      }}
                    >
                      且 AND
                    </button>
                  </div>
                  {/* 条件行 2 */}
                  <CondRow field="user.vip" op="= 等于" value="true" />
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 6,
                      borderRadius: 6,
                      padding: '2px 6px',
                      fontSize: 10.5,
                      color: '#a8a29e',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={12} /> 添加条件（AND）
                  </button>
                </div>

                {/* ELSE 卡 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    borderRadius: 12,
                    border: '1px dashed #e2e8f0',
                    background: 'rgba(248,250,252,0.6)',
                    padding: '8px 10px',
                  }}
                >
                  <span
                    style={{
                      borderRadius: 6,
                      background: '#e2e8f0',
                      padding: '2px 6px',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#78716c',
                    }}
                  >
                    ELSE
                  </span>
                  <span style={{ fontSize: 10.5, lineHeight: 1.5, color: '#a8a29e' }}>以上条件不满足时，走 false 出边。</span>
                </div>
              </div>

              {/* 输出变量 Section */}
              <section style={{ paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ChevronDown size={12} color="#a8a29e" />
                  <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#78716c' }}>
                    输出变量
                  </span>
                </div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <OutputRow field="branch" type="string" />
                  <OutputRow field="value" type="any" />
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}

function TabItem({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        position: 'relative',
        marginBottom: -1,
        padding: '10px 0',
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: active ? '#2563eb' : '#a8a29e',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
      {active && (
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 9999, background: '#3b82f6' }} />
      )}
    </button>
  );
}

function ModeTab({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        borderRadius: 4,
        padding: '2px 6px',
        fontSize: 10.5,
        background: active ? '#dbeafe' : 'transparent',
        color: active ? '#1d4ed8' : '#a8a29e',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function CaseBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        borderRadius: 6,
        background: '#fef3c7',
        padding: '2px 6px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: '#b45309',
      }}
    >
      {children}
    </span>
  );
}

function CondRow({ field, op, value }: { field: string; op: string; value: string }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          defaultValue={field}
          style={{ height: 32, flex: 1, minWidth: 0, borderRadius: 6, border: '1px solid #d6d3d1', padding: '0 8px', fontFamily: MONO, fontSize: 12, color: '#1c1917', outline: 'none', boxSizing: 'border-box' }}
        />
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            width: 96,
            height: 32,
            flexShrink: 0,
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            background: '#fff',
            padding: '0 8px',
            fontSize: 11.5,
            color: '#44403c',
            cursor: 'pointer',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{op}</span>
          <ChevronDown size={12} color="#a8a29e" />
        </button>
      </div>
      <input
        defaultValue={value}
        style={{ height: 32, borderRadius: 6, border: '1px solid #d6d3d1', padding: '0 8px', fontFamily: MONO, fontSize: 12, color: '#1c1917', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

function OutputRow({ field, type }: { field: string; type: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        border: '1px solid #f1f5f9',
        background: 'rgba(248,250,252,0.7)',
        padding: '6px 10px',
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 10, color: '#c4b5fd' }}>{'{x}'}</span>
      <span style={{ fontFamily: MONO, fontSize: 11.5, color: '#44403c' }}>{field}</span>
      <span
        style={{
          marginLeft: 'auto',
          borderRadius: 4,
          background: '#f1f5f9',
          padding: '1px 6px',
          fontFamily: MONO,
          fontSize: 9.5,
          color: '#64748b',
        }}
      >
        {type}
      </span>
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 24,
  width: 24,
  borderRadius: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const hdrBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};
