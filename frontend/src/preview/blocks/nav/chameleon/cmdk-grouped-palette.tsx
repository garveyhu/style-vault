import { PreviewFrame } from '../../../_layout';
import {
  Search, Bot, Cpu, Cloud, Library, LayoutDashboard, Users, Shield,
  History, Plus, Download, LogOut, Code2,
} from 'lucide-react';

/**
 * cmdk-grouped-palette · 600px 四分组命令面板
 * 12vh 落下 + Search 输入(Esc kbd) + 四组(搜索结果/跳转/动作/最近访问) + footer 快捷键
 * 源码：src/core/components/command/command-palette.tsx + assets/styles/index.css(.cmdk-*)
 */

const RESULTS = [
  { icon: Bot, title: '客服问答助手', snippet: 'agent-cs-9f2a', type: '应用' },
  { icon: Cpu, title: 'qwen-chat', snippet: 'model · 通义千问', type: 'Model' },
  { icon: Library, title: '产品手册 KB', snippet: 'kbs-product', type: '知识库' },
];

const NAV = [
  { icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
  { icon: Users, label: '用户管理', path: '/users' },
  { icon: Shield, label: '角色管理', path: '/roles' },
  { icon: Cloud, label: 'Providers', path: '/providers' },
  { icon: Cpu, label: 'Models', path: '/models' },
];

const ACTIONS = [
  { icon: Plus, label: '创建 Agent' },
  { icon: Plus, label: '创建知识库' },
  { icon: Download, label: '导出全部配置' },
  { icon: LogOut, label: '退出登录' },
];

const RECENT = [
  { icon: History, label: '知识库', path: '/kbs' },
  { icon: History, label: 'API Key', path: '/api-keys' },
];

export default function CmdkGroupedPalette() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      {/* 遮罩 bg-stone-950/40 + backdrop-blur-sm */}
      <div style={{ position: 'relative', minHeight: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingBottom: 24, background: 'rgba(12,10,9,0.4)', backdropFilter: 'blur(4px)', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Command 容器 */}
        <div style={{ position: 'relative', marginTop: '10vh', width: 600, maxWidth: '90vw', overflow: 'hidden', borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
          {/* 输入行 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f5f5f4', padding: '0 16px' }}>
            <Search size={16} strokeWidth={1.75} color="#a8a29e" />
            <input
              defaultValue="qwen"
              placeholder="搜索 agent / model / KB / app / user，或输入命令"
              style={{ display: 'flex', height: 48, width: '100%', background: 'transparent', fontSize: 13.5, color: '#292524', border: 'none', outline: 'none' }}
            />
            <kbd style={{ borderRadius: 4, border: '1px solid #e7e5e0', padding: '2px 6px', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>Esc</kbd>
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            <Group heading="搜索结果">
              {RESULTS.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Item key={r.title} selected={i === 0}>
                    <Icon size={14} color="#a8a29e" />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {/* 标题有显式 text-stone-800，覆盖选中态蓝色——选中行标题仍恒为 #292524 */}
                      <span style={{ fontWeight: 500, color: '#292524' }}>{r.title}</span>
                      <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>{r.snippet}</span>
                    </span>
                    <span style={{ borderRadius: 4, background: '#f5f5f4', padding: '2px 6px', fontSize: 10, fontWeight: 500, color: '#78716c' }}>{r.type}</span>
                  </Item>
                );
              })}
            </Group>

            <Group heading="跳转">
              {NAV.map(n => {
                const Icon = n.icon;
                return (
                  <Item key={n.path}>
                    <Icon size={14} color="#a8a29e" />
                    <span style={{ flex: 1, color: '#44403c' }}>{n.label}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>{n.path}</span>
                  </Item>
                );
              })}
            </Group>

            <Group heading="动作">
              {ACTIONS.map(a => {
                const Icon = a.icon;
                return (
                  <Item key={a.label}>
                    <Icon size={14} color="#a8a29e" />
                    <span style={{ flex: 1, color: '#44403c' }}>{a.label}</span>
                  </Item>
                );
              })}
            </Group>

            <Group heading="最近访问">
              {RECENT.map(r => {
                const Icon = r.icon;
                return (
                  <Item key={r.path}>
                    <Icon size={14} color="#a8a29e" />
                    <span style={{ flex: 1, color: '#44403c' }}>{r.label}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#a8a29e' }}>{r.path}</span>
                  </Item>
                );
              })}
            </Group>
          </div>

          {/* footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #f5f5f4', background: 'rgba(244,243,238,0.3)', padding: '8px 12px', fontSize: 10.5, color: '#a8a29e' }}>
            <span><FootKbd>↑↓</FootKbd> 导航</span>
            <span><FootKbd>⏎</FootKbd> 选择</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Code2 size={12} />
              <FootKbd>⌘K</FootKbd>
            </span>
          </div>
        </div>

        {/* 空态变体：无匹配项时 Command.Empty（py-8 text-center text-[12.5px] text-stone-400） */}
        <div style={{ position: 'relative', width: 600, maxWidth: '90vw', overflow: 'hidden', borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #f5f5f4', padding: '0 16px' }}>
            <Search size={16} strokeWidth={1.75} color="#a8a29e" />
            <input
              defaultValue="zzzz"
              placeholder="搜索 agent / model / KB / app / user，或输入命令"
              style={{ display: 'flex', height: 48, width: '100%', background: 'transparent', fontSize: 13.5, color: '#292524', border: 'none', outline: 'none' }}
            />
            <kbd style={{ borderRadius: 4, border: '1px solid #e7e5e0', padding: '2px 6px', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>Esc</kbd>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            <div style={{ padding: '32px 0', textAlign: 'center', fontSize: 12.5, color: '#a8a29e' }}>
              没有匹配项。试试搜索 agent 名 / model 名 / app_key。
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ padding: '6px 10px 4px', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgb(120 113 108)' }}>{heading}</div>
      {children}
    </div>
  );
}

function Item({ selected, children }: { selected?: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 6, fontSize: 12.5, cursor: 'pointer',
      background: selected ? 'rgb(239 246 255)' : 'transparent',
      color: selected ? 'rgb(29 78 216)' : '#44403c',
    }}>{children}</div>
  );
}

function FootKbd({ children }: { children: React.ReactNode }) {
  return <kbd style={{ borderRadius: 4, border: '1px solid #e7e5e0', background: '#fffefb', padding: '2px 4px', fontFamily: 'JetBrains Mono, monospace' }}>{children}</kbd>;
}
