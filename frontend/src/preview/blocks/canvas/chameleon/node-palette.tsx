import { PreviewFrame } from '../../../_layout';
import {
  Bot,
  Boxes,
  Braces,
  ChevronsLeft,
  Code2,
  Database,
  GitBranch,
  Globe,
  Image,
  LayoutGrid,
  Repeat,
  ScanText,
  Search,
  Shuffle,
  Sparkles,
  Users,
} from 'lucide-react';

/**
 * node-palette · 左侧常驻节点面板（双列 + 顶部 Tab）
 * 源码：node-palette.tsx + lib/node-catalog.ts
 * 1:1：w-[21rem] rounded-2xl / 4 Tab / 搜索 h-8 / 分组 + 双列网格 / 27px 图标块
 */

const FONT = 'Inter, system-ui, sans-serif';

const TABS = [
  { key: 'all', label: '全部', Icon: LayoutGrid },
  { key: 'gen', label: '生成', Icon: Sparkles },
  { key: 'logic', label: '逻辑', Icon: GitBranch },
  { key: 'data', label: '数据', Icon: Boxes },
];

const GROUPS = [
  {
    name: '生成',
    items: [
      { label: '大模型', Icon: Bot, bg: '#f5f3ff', color: '#7c3aed' },
      { label: '意图分类', Icon: Shuffle, bg: '#f7fee7', color: '#65a30d' },
      { label: '参数提取', Icon: ScanText, bg: '#eff6ff', color: '#2563eb' },
      { label: '生图', Icon: Image, bg: '#faf5ff', color: '#9333ea' },
      { label: '多智能体辩论', Icon: Users, bg: '#fdf4ff', color: '#c026d3' },
    ],
  },
  {
    name: '检索 & 工具',
    items: [
      { label: '知识库', Icon: Database, bg: '#ecfdf5', color: '#059669' },
      { label: 'HTTP请求', Icon: Globe, bg: '#ecfeff', color: '#0891b2' },
      { label: '代码', Icon: Code2, bg: '#f1f5f9', color: '#475569' },
    ],
  },
  {
    name: '逻辑',
    items: [
      { label: '条件分支', Icon: GitBranch, bg: '#fffbeb', color: '#d97706' },
      { label: '迭代', Icon: Repeat, bg: '#f0f9ff', color: '#0284c7' },
    ],
  },
  {
    name: '变量 & 输出',
    items: [{ label: '模板', Icon: Braces, bg: '#f0fdfa', color: '#0d9488' }],
  },
];

export default function NodePalette() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 560,
          borderRadius: 12,
          fontFamily: FONT,
          padding: 12,
          background:
            'radial-gradient(circle, rgba(214,211,209,0.45) 1px, transparent 1px) 0 0 / 16px 16px, #fbfbf9',
        }}
      >
        {/* 常驻面板 */}
        <div
          style={{
            width: 336,
            maxHeight: 'calc(100% - 0px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid rgba(231,229,224,0.8)',
            background: '#fff',
            boxShadow: '0 12px 32px rgb(0 0 0 / 10%), 0 0 0 1px rgb(28 25 23 / 5%)',
          }}
        >
          {/* Tab 行 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 8px 0' }}>
            <div style={{ display: 'flex', flex: 1, minWidth: 0, alignItems: 'center', gap: 2 }}>
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    borderRadius: 8,
                    padding: '6px 8px',
                    fontSize: 11.5,
                    fontWeight: 500,
                    background: i === 0 ? '#eff6ff' : 'transparent',
                    color: i === 0 ? '#2563eb' : '#78716c',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <t.Icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
                width: 24,
                flexShrink: 0,
                borderRadius: 6,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              title="收起节点面板"
            >
              <ChevronsLeft size={14} color="#a8a29e" />
            </button>
          </div>

          {/* 搜索 */}
          <div style={{ padding: '8px 10px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={14}
                color="#a8a29e"
                style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                placeholder="搜索节点…"
                style={{
                  height: 32,
                  width: '100%',
                  borderRadius: 8,
                  border: '1px solid #e7e5e4',
                  background: '#fafaf9',
                  paddingLeft: 32,
                  paddingRight: 28,
                  fontSize: 12,
                  color: '#292524',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* 分组 + 双列网格 */}
          <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 8px 10px' }}>
            {GROUPS.map(g => (
              <div key={g.name} style={{ marginBottom: 12 }}>
                <div style={{ padding: '0 6px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.02em', color: '#a8a29e' }}>
                  {g.name}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {g.items.map(it => (
                    <button
                      key={it.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 0,
                        borderRadius: 12,
                        border: '1px solid transparent',
                        padding: '8px',
                        textAlign: 'left',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 28,
                          width: 28,
                          flexShrink: 0,
                          borderRadius: 8,
                          background: it.bg,
                          color: it.color,
                          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
                        }}
                      >
                        <it.Icon size={16} />
                      </span>
                      <span
                        style={{
                          minWidth: 0,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#44403c',
                        }}
                      >
                        {it.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
