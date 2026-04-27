import { useState } from 'react';
import { Button, ConfigProvider, Empty, Input, Select, Tag } from 'antd';
import { ArrowLeft, Bot, Check, Database, Edit, Plus, Search, Star, Trash2, UserPlus } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type View = 'list' | 'select_supplier' | 'config';

const MODELS = [
  { id: '1', supplier: 'OpenAI', name: 'GPT-4o', baseModel: 'gpt-4o', type: 'LLM', isDefault: true, color: 'blue' },
  { id: '2', supplier: 'DashScope', name: '通义千问 Plus', baseModel: 'qwen-plus', type: 'LLM', color: 'blue' },
  { id: '3', supplier: 'Anthropic', name: 'Claude Sonnet 4.5', baseModel: 'claude-sonnet-4', type: 'LLM', color: 'blue' },
  { id: '4', supplier: 'OpenAI', name: 'text-embedding-3-large', baseModel: 'text-embedding-3-large', type: 'Embedding', color: 'purple' },
  { id: '5', supplier: 'BAAI', name: 'bge-large-zh', baseModel: 'bge-large-zh', type: 'Embedding', color: 'purple' },
  { id: '6', supplier: 'OpenAI', name: 'whisper-1', baseModel: 'whisper-1', type: 'Audio', color: 'orange' },
];

const SUPPLIERS = [
  'OpenAI', 'Anthropic', 'DashScope', 'DeepSeek', 'Moonshot',
  'Zhipu', 'BAAI', 'Volc', 'Baidu', 'Tencent',
];

export default function AiModelConfigPage() {
  const [view, setView] = useState<View>('list');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ height: '100%', minHeight: 720, padding: 24, fontFamily: SAGE_FONT }}>
          {view === 'list' && <ListView setView={setView} hovered={hovered} setHovered={setHovered} />}
          {view === 'select_supplier' && <SupplierView setView={setView} />}
          {view === 'config' && <ConfigView setView={setView} />}
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function ListView({ setView, hovered, setHovered }: { setView: (v: View) => void; hovered: string | null; setHovered: (s: string | null) => void }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>模型管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <Select defaultValue="all" style={{ width: 140 }}
            options={[
              { label: '全部类型', value: 'all' },
              { label: 'LLM', value: 'llm' },
              { label: 'Embedding', value: 'emb' },
              { label: 'Audio', value: 'audio' },
            ]} />
          <Input prefix={<Search size={14} color="#94a3b8" />} placeholder="搜索" style={{ width: 200 }} />
          <Button type="primary" icon={<Plus size={14} />} onClick={() => setView('select_supplier')}>新建模型</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {MODELS.map(m => (
          <div key={m.id}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: '#fff', borderRadius: 12,
              padding: 20, cursor: 'pointer',
              border: `1px solid ${m.isDefault ? HEX : '#e2e8f0'}`,
              position: 'relative',
              transition: 'all 200ms',
              boxShadow: hovered === m.id ? '0 10px 15px -3px rgba(0,0,0,0.10)' : 'none',
            }}>
            {/* Hover overlay */}
            {hovered === m.id && (
              <div style={{
                position: 'absolute', top: 8, right: 8,
                display: 'inline-flex', gap: 4,
                padding: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(4px)',
                borderRadius: 8,
              }}>
                <button style={iconBtn}><UserPlus size={14} color="#64748b" /></button>
                <button style={iconBtn}><Star size={14} color={m.isDefault ? HEX : '#64748b'} fill={m.isDefault ? HEX : 'none'} /></button>
                <button style={iconBtn}><Edit size={14} color="#64748b" /></button>
                <button style={iconBtn}><Trash2 size={14} color="#dc2626" /></button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#fff', border: '1px solid #e2e8f0',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: HEX, flexShrink: 0,
              }}><Bot size={16} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {m.name}
                  {m.isDefault && <Check size={12} color={HEX} />}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{m.supplier}</div>
              </div>
            </div>
            <Tag color={m.color}>{m.type}</Tag>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 8, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
              {m.baseModel}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SupplierView({ setView }: { setView: (v: View) => void }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button type="text" icon={<ArrowLeft size={16} />} onClick={() => setView('list')} />
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>选择供应商</h2>
      </div>
      <Steps current={0} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginTop: 24 }}>
        {SUPPLIERS.map(s => (
          <div key={s}
            onClick={() => setView('config')}
            style={{
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 12, padding: 24, height: 180,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = HEX; e.currentTarget.style.background = '#f8fafc'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: '#fff', border: '1px solid #f1f5f9',
              padding: 8, marginBottom: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: HEX,
            }}>
              <Database size={32} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>{s}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ConfigView({ setView }: { setView: (v: View) => void }) {
  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button type="text" icon={<ArrowLeft size={16} />} onClick={() => setView('select_supplier')} />
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>新建模型 · OpenAI</h2>
      </div>
      <Steps current={1} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24, paddingBottom: 80 }}>
        {/* 基础信息 */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, color: '#334155', margin: '0 0 16px' }}>基础信息</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <FormItem label="模型名称"><Input placeholder="例如 GPT-4o" /></FormItem>
            <FormItem label="模型类型"><Select defaultValue="LLM" options={['LLM', 'Embedding', 'Audio'].map(v => ({ label: v, value: v }))} /></FormItem>
            <FormItem label="基础模型"><Select showSearch defaultValue="gpt-4o" options={['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'].map(v => ({ label: v, value: v }))} /></FormItem>
          </div>
        </div>

        {/* API 配置 */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, color: '#334155', margin: '0 0 16px' }}>API 配置</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <FormItem label="API 域名"><Input defaultValue="https://api.openai.com/v1" /></FormItem>
            <FormItem label="API Key"><Input.Password placeholder="sk-..." /></FormItem>
          </div>
        </div>

        {/* 自定义参数 */}
        <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid rgba(226,232,240,0.6)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, color: '#334155', margin: '0 0 16px' }}>自定义参数</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['temperature: 0.7', 'top_p: 1', 'max_tokens: 4096'].map((kv, i) => {
              const [k, v] = kv.split(': ');
              return (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <Input defaultValue={k} placeholder="参数名" style={{ flex: 1 }} />
                  <Input defaultValue={v} placeholder="参数值" style={{ flex: 1 }} />
                  <Button type="text" icon={<Trash2 size={14} />} />
                </div>
              );
            })}
            <Button type="dashed" icon={<Plus size={14} />}>添加参数</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 24px',
        borderTop: '1px solid #f1f5f9',
        display: 'flex', justifyContent: 'flex-end', gap: 12,
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(8px)',
      }}>
        <Button onClick={() => setView('list')}>取消</Button>
        <Button type="primary">保存</Button>
      </div>
    </div>
  );
}

function FormItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

function Steps({ current }: { current: number }) {
  const titles = ['选择供应商', '配置模型'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {titles.map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < titles.length - 1 ? 1 : 'unset' }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            background: i <= current ? HEX : '#e5e7eb',
            color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600,
            flexShrink: 0,
          }}>{i + 1}</span>
          <span style={{ marginLeft: 8, fontSize: 14, color: i <= current ? '#0f172a' : '#94a3b8', fontWeight: i === current ? 500 : 400 }}>{t}</span>
          {i < titles.length - 1 && <span style={{ flex: 1, height: 1, background: i < current ? HEX : '#e5e7eb', margin: '0 16px' }} />}
        </div>
      ))}
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  width: 24, height: 24,
  background: 'transparent', border: 'none', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 4,
};
