import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';
import { Bot, Check, ChevronDown, Loader2, Search } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const STONE_200 = '#e7e5e4';

const CATEGORIES = [
  { value: '', label: '全部' },
  { value: 'local', label: '代码' },
  { value: 'graph-chatflow', label: '对话编排' },
  { value: 'graph-workflow', label: '流程编排' },
  { value: 'external', label: '外部' },
];

const ITEMS = [
  { key: 'agent-cs-bot', name: '智能客服助手', sub: 'agent-cs-bot' },
  { key: 'agent-rag-qa', name: '知识库问答', sub: 'agent-rag-qa' },
  { key: 'agent-code-rev', name: '代码评审智能体', sub: 'agent-code-rev' },
  { key: 'agent-sql-gen', name: 'SQL 生成器', sub: 'agent-sql-gen' },
  { key: 'agent-summarize', name: '长文摘要', sub: 'agent-summarize' },
];

export default function AgentPickerPopover() {
  const [category, setCategory] = useState('');
  const [active, setActive] = useState('agent-rag-qa');
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · AGENT PICKER POPOVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 20px' }}>
          分页类别智能体选择器
        </h1>

        {/* 触发器 两态：默认 / hover:border-stone-300 */}
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Trigger />
          <Trigger hover />
        </div>

        {/* Popover 双栏 — 主体：含 hover Row + 「没有更多了」到底态 */}
        <div style={shell}>
          <div style={{ display: 'flex', height: 340 }}>
            {/* 左：类别栏 */}
            <div
              style={{
                width: 96,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                overflowY: 'auto',
                borderRight: '1px solid #f5f5f4',
                padding: 6,
              }}
            >
              {CATEGORIES.map(c => {
                const on = category === c.value;
                // 「代码」演示非选 hover:bg-stone-100
                const hov = !on && c.value === 'local';
                return (
                  <button
                    key={c.value || 'all'}
                    onClick={() => setCategory(c.value)}
                    style={{
                      width: '100%',
                      borderRadius: 4,
                      padding: '6px 8px',
                      textAlign: 'left',
                      fontSize: 12,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: SANS,
                      // active bg-blue-50(#eff6ff) text-blue-700(#1d4ed8) font-medium
                      background: on ? '#eff6ff' : hov ? '#f5f5f4' : 'transparent',
                      color: on ? '#1d4ed8' : '#57534e',
                      fontWeight: on ? 500 : 400,
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* 右：搜索 + 列表 */}
            <div style={{ display: 'flex', minWidth: 0, flex: 1, flexDirection: 'column' }}>
              <SearchBar />
              <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 6px 6px' }}>
                <Row icon={<Bot size={14} color="#a8a29e" />} title="全部应用" active={false} />
                {ITEMS.map(it => (
                  <Row
                    key={it.key}
                    icon={<Bot size={14} color="#a8a29e" />}
                    title={it.name}
                    sub={it.sub}
                    active={active === it.key}
                    hover={it.key === 'agent-code-rev'}
                    onClick={() => setActive(it.key)}
                  />
                ))}
                {/* 到底态：py-2 text-center text-[10.5px] text-stone-300(#d6d3d1) */}
                <ListEnd />
              </div>
            </div>
          </div>
          <style>{`@keyframes app-spin { to { transform: rotate(360deg) } }`}</style>
        </div>

        {/* 列表底部三态变体 */}
        <div style={{ marginTop: 20, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>
          列表底部三态 — 加载中 / 空 / 到底
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <MiniPanel title="加载中"><ListLoading /></MiniPanel>
          <MiniPanel title="空"><ListEmpty /></MiniPanel>
          <MiniPanel title="到底"><ListEnd /></MiniPanel>
        </div>
      </div>
    </PreviewFrame>
  );
}

const shell: React.CSSProperties = {
  width: 420,
  borderRadius: 8,
  border: `1px solid ${STONE_200}`,
  background: '#fff',
  boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
  overflow: 'hidden',
};

// trigger h-7(28) w-168 rounded-md(6) border-stone-200(#e7e5e4) px-2(8) text-[12px] text-stone-700；hover:border-stone-300(#d6d3d1)
function Trigger({ hover }: { hover?: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        width: 168,
        height: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        borderRadius: 6,
        border: `1px solid ${hover ? '#d6d3d1' : STONE_200}`,
        background: '#fff',
        padding: '0 8px',
        fontSize: 12,
        color: '#44403c',
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>知识库问答</span>
      <ChevronDown size={14} color="#a8a29e" style={{ flexShrink: 0 }} />
    </button>
  );
}

function SearchBar() {
  // 容器 relative p-1.5(6)；Search left-3.5(14) h-3.5 w-3.5(14)；Input !h-7(28) pl-7(28) text-[12px] border-stone-300(#d6d3d1)
  return (
    <div style={{ position: 'relative', flexShrink: 0, padding: 6 }}>
      <Search size={14} color="#a8a29e" style={{ position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%)' }} />
      <input
        placeholder="搜索名称 / key"
        style={{
          height: 28,
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: 6,
          border: '1px solid #d6d3d1',
          background: '#fff',
          padding: '0 8px 0 28px',
          fontSize: 12,
          color: '#1c1917',
          outline: 'none',
          fontFamily: SANS,
        }}
      />
    </div>
  );
}

// 加载中：flex items-center justify-center gap-1.5 py-2 text-[11px] text-stone-400 + Loader2 h-3 w-3 spin
function ListLoading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', fontSize: 11, color: '#a8a29e' }}>
      <Loader2 size={12} style={{ animation: 'app-spin 1s linear infinite' }} /> 加载中…
    </div>
  );
}

// 空：py-6 text-center text-[12px] text-stone-400
function ListEmpty() {
  return <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 12, color: '#a8a29e' }}>无匹配应用</div>;
}

// 到底：py-2 text-center text-[10.5px] text-stone-300(#d6d3d1)
function ListEnd() {
  return <div style={{ padding: '8px 0', textAlign: 'center', fontSize: 10.5, color: '#d6d3d1' }}>没有更多了</div>;
}

function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 200 }}>
      <div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 6 }}>{title}</div>
      <div style={{ borderRadius: 8, border: `1px solid ${STONE_200}`, background: '#fff', boxShadow: '0 1px 3px rgb(0 0 0/0.05)' }}>{children}</div>
      <style>{`@keyframes app-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function Row({
  icon,
  title,
  sub,
  active,
  hover,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  active: boolean;
  hover?: boolean;
  onClick?: () => void;
}) {
  // rounded(4) px-2(8) py-1.5(6) gap-2(8) hover:bg-stone-100(#f5f5f4)；active bg-blue-50(#eff6ff)
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 8,
        borderRadius: 4,
        padding: '6px 8px',
        textAlign: 'left',
        border: 'none',
        cursor: 'pointer',
        background: active ? '#eff6ff' : hover ? '#f5f5f4' : 'transparent',
      }}
    >
      <span style={{ flexShrink: 0, display: 'inline-flex' }}>{icon}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        {/* 标题 text-[12px] text-stone-800(#292524) */}
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: '#292524', fontFamily: SANS }}>
          {title}
        </span>
        {/* 副 key font-mono text-[10px] text-stone-400(#a8a29e) */}
        {sub && (
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 10, color: '#a8a29e' }}>
            {sub}
          </span>
        )}
      </span>
      {/* Check h-3.5 w-3.5(14) text-blue-600(#2563eb) */}
      {active && <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />}
    </button>
  );
}
