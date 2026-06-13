import { PreviewFrame } from '../../../_layout';
import {
  Copy, Pencil, RefreshCw, ThumbsUp, ThumbsDown, MoreHorizontal,
  ArrowDownFromLine, Languages, Volume2, Split, Pin, Download, Share2, Trash2, Check, ChevronRight,
} from 'lucide-react';

/**
 * message-actions-bar · Chameleon 单条消息 hover 玻璃质感动作条
 * 源码：core/components/chat/message-actions.tsx:99-359 · resolve-actions.ts
 * 主操作内联（copy/edit/regenerate/👍/👎），次操作收进 ⋯ DropdownMenu。
 */

const sans = 'Inter, system-ui, sans-serif';

export default function MessageActionsBar() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>

        {/* ── 默认态（copied 高亮 emerald + 👍 active amber） ── */}
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11.5, color: '#a8a29e' }}>主条（hover 浮现）· copy 已复制 · 👍 已选</p>
          <Bar>
            <ActionBtn title="已复制"><Check size={12} color="#059669" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="重新生成"><RefreshCw size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="有帮助" active><ThumbsUp size={12} color="#92400e" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="没帮助"><ThumbsDown size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="更多" more><MoreHorizontal size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
          </Bar>
        </div>

        {/* ── user 消息主条（含 edit） ── */}
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11.5, color: '#a8a29e' }}>user 消息主条（含编辑）</p>
          <Bar>
            <ActionBtn title="复制"><Copy size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="编辑"><Pencil size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
            <ActionBtn title="更多" more><MoreHorizontal size={12} color="#78716c" strokeWidth={2} /></ActionBtn>
          </Bar>
        </div>

        {/* ── ⋯ 下拉菜单展开示意 ── */}
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11.5, color: '#a8a29e' }}>⋯ 下拉（align=end · min-w 9rem · delete 分隔 + 玫瑰）</p>
          <div style={{ width: 144, borderRadius: 8, border: '1px solid #e7e5e0', background: '#fffefb', boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', padding: 4 }}>
            <MenuRow icon={<ArrowDownFromLine size={12} color="#78716c" strokeWidth={2} />} label="继续生成" />
            <MenuRow icon={<Languages size={12} color="#78716c" strokeWidth={2} />} label="翻译" sub />
            <MenuRow icon={<Volume2 size={12} color="#78716c" strokeWidth={2} />} label="朗读" />
            <MenuRow icon={<Split size={12} color="#78716c" strokeWidth={2} />} label="从此分叉" />
            <MenuRow icon={<Pin size={12} color="#b45309" strokeWidth={2} />} label="取消置顶" active />
            <MenuRow icon={<Download size={12} color="#78716c" strokeWidth={2} />} label="导出 Markdown" />
            <MenuRow icon={<Share2 size={12} color="#78716c" strokeWidth={2} />} label="复制分享片段" />
            {/* Separator + delete */}
            <div style={{ height: 1, background: '#e7e5e0', margin: '4px -4px' }} />
            <MenuRow icon={<Trash2 size={12} color="#dc2626" strokeWidth={2} />} label="删除" danger />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Bar({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      borderRadius: 6, border: '1px solid rgba(231,229,224,0.7)',
      background: 'rgba(255,255,255,0.9)', padding: 2,
      boxShadow: '0 1px 2px rgb(0 0 0 / 5%)', backdropFilter: 'blur(4px)',
    }}>
      {children}
    </div>
  );
}

function ActionBtn({ title, children, active, danger }: { title: string; children: React.ReactNode; active?: boolean; more?: boolean; danger?: boolean }) {
  const bg = active ? (danger ? '#ffe4e6' : '#fef3c7') : 'transparent';
  return (
    <button
      title={title}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 4, padding: 4, border: 'none', cursor: 'pointer',
        background: bg, lineHeight: 0,
      }}
    >
      {children}
    </button>
  );
}

function MenuRow({ icon, label, active, danger, sub }: { icon: React.ReactNode; label: string; active?: boolean; danger?: boolean; sub?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px',
      borderRadius: 5, cursor: 'pointer',
      color: danger ? '#dc2626' : active ? '#b45309' : '#1c1917',
    }}>
      <span style={{ display: 'inline-flex', color: '#78716c' }}>{icon}</span>
      <span style={{ fontSize: 12.5, flex: 1 }}>{label}</span>
      {sub && <ChevronRight size={12} color="#a8a29e" strokeWidth={2} />}
    </div>
  );
}
