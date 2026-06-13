import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';
import { Bot, Check, ChevronDown, Loader2, Search } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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
      <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · AGENT PICKER POPOVER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 20px' }}>
          分页类别智能体选择器
        </h1>

        {/* 触发器 */}
        <div style={{ marginBottom: 16 }}>
          <button
            style={{
              display: 'flex',
              width: 168,
              height: 28,
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              borderRadius: 6,
              border: '1px solid #e7e5e0',
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
        </div>

        {/* Popover 双栏 */}
        <div
          style={{
            width: 420,
            borderRadius: 8,
            border: '1px solid #e7e5e0',
            background: '#fff',
            boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
            overflow: 'hidden',
          }}
        >
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
              {CATEGORIES.map(c => (
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
                    background: category === c.value ? '#eff6ff' : 'transparent',
                    color: category === c.value ? '#1d4ed8' : '#57534e',
                    fontWeight: category === c.value ? 500 : 400,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* 右：搜索 + 列表 */}
            <div style={{ display: 'flex', minWidth: 0, flex: 1, flexDirection: 'column' }}>
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
              <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 6px 6px' }}>
                <Row icon={<Bot size={14} color="#a8a29e" />} title="全部应用" active={false} />
                {ITEMS.map(it => (
                  <Row
                    key={it.key}
                    icon={<Bot size={14} color="#a8a29e" />}
                    title={it.name}
                    sub={it.sub}
                    active={active === it.key}
                    onClick={() => setActive(it.key)}
                  />
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', fontSize: 11, color: '#a8a29e' }}>
                  <Loader2 size={12} style={{ animation: 'app-spin 1s linear infinite' }} /> 加载中…
                </div>
              </div>
            </div>
          </div>
          <style>{`@keyframes app-spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Row({
  icon,
  title,
  sub,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  active: boolean;
  onClick?: () => void;
}) {
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
        background: active ? '#eff6ff' : 'transparent',
      }}
    >
      <span style={{ flexShrink: 0, display: 'inline-flex' }}>{icon}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: '#292524', fontFamily: SANS }}>
          {title}
        </span>
        {sub && (
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 10, color: '#a8a29e' }}>
            {sub}
          </span>
        )}
      </span>
      {active && <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />}
    </button>
  );
}
