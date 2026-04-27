import { useState } from 'react';
import { Button, ConfigProvider, Form, Input, Select, Tag, Typography } from 'antd';
import {
  ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlayCircleOutlined,
  PlusOutlined, SearchOutlined, StarFilled, StarOutlined, StopOutlined,
  ThunderboltOutlined, UserOutlined,
} from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const { Title, Text } = Typography;
const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type ViewMode = 'list' | 'new_select_supplier' | 'new_config';

interface AiModel {
  id: number; name: string; baseModel: string; supplier: string;
  modelType: 0 | 1 | 2; isActive: boolean; defaultModel?: boolean;
}

const MODELS: AiModel[] = [
  { id: 1, supplier: 'OpenAI', name: 'GPT-4o', baseModel: 'gpt-4o', modelType: 0, isActive: true, defaultModel: true },
  { id: 2, supplier: 'DashScope', name: '通义千问 Plus', baseModel: 'qwen-plus', modelType: 0, isActive: true },
  { id: 3, supplier: 'Anthropic', name: 'Claude Sonnet 4.5', baseModel: 'claude-sonnet-4', modelType: 0, isActive: true },
  { id: 4, supplier: 'OpenAI', name: 'text-embedding-3-large', baseModel: 'text-embedding-3-large', modelType: 1, isActive: true },
  { id: 5, supplier: 'BAAI', name: 'bge-large-zh', baseModel: 'bge-large-zh', modelType: 1, isActive: false },
  { id: 6, supplier: 'OpenAI', name: 'whisper-1', baseModel: 'whisper-1', modelType: 2, isActive: true },
];

const SUPPLIERS = [
  'OpenAI', 'Anthropic', 'DashScope', 'DeepSeek', 'Moonshot',
  'Zhipu', 'BAAI', 'Volc', 'Baidu', 'Tencent',
];

const TYPE_NAME = (t: number) => t === 0 ? 'LLM' : t === 1 ? 'Embedding' : 'Audio';

export default function AiModelConfigPage() {
  const [view, setView] = useState<ViewMode>('list');
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <div className="h-full bg-slate-50/50 relative overflow-hidden" style={{ minHeight: 720 }}>
          {view === 'list' && <ListView setView={setView} hovered={hovered} setHovered={setHovered} />}
          {view === 'new_select_supplier' && <SupplierView setView={setView} />}
          {view === 'new_config' && <ConfigFormView setView={setView} />}
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function ListView({ setView, hovered, setHovered }: {
  setView: (v: ViewMode) => void;
  hovered: number | null; setHovered: (v: number | null) => void;
}) {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3} style={{ margin: 0, color: '#1e293b' }}>模型管理</Title>
          <Text type="secondary">为空间配置可用的 AI 模型，控制谁可以使用哪个模型</Text>
        </div>
        <div className="flex gap-3">
          <Select
            placeholder="全部类型"
            allowClear
            style={{ width: 140 }}
            options={[
              { label: 'LLM', value: 0 },
              { label: 'Embedding', value: 1 },
              { label: 'Audio', value: 2 },
            ]}
          />
          <Input
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            placeholder="搜索"
            style={{ width: 200 }}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setView('new_select_supplier')}>新建模型</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MODELS.map(item => {
          const isHovered = hovered === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-lg relative group border"
              style={{
                borderColor: isHovered || item.defaultModel ? HEX : '#e2e8f0',
                borderWidth: 1,
              }}
            >
              {/* 第一行 Logo + 名称 + StarFilled */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 text-xs font-mono">{item.supplier.slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{item.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">{item.baseModel}</div>
                </div>
                {item.defaultModel && (
                  <div className="flex-shrink-0">
                    <StarFilled style={{ color: '#fbbf24', fontSize: 18 }} />
                  </div>
                )}
              </div>

              {/* Tag 行 */}
              <div className="flex flex-wrap gap-2 mb-2">
                <Tag color={item.modelType === 0 ? 'blue' : item.modelType === 1 ? 'purple' : 'orange'}>
                  {TYPE_NAME(item.modelType)}
                </Tag>
                {item.isActive ? (
                  <Tag color={HEX} bordered={false}>已启用</Tag>
                ) : (
                  <Tag color="default">已停用</Tag>
                )}
              </div>

              {/* Hover overlay */}
              <div
                className="absolute top-2 right-2 flex gap-1 bg-white/95 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-slate-100"
                style={{
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  transition: 'opacity 200ms',
                }}
              >
                <Button type="text" size="small" icon={<UserOutlined />} className="text-slate-500 hover:text-blue-500" />
                {!item.defaultModel && (
                  <Button type="text" size="small" icon={<StarOutlined />} className="hover:!text-yellow-500" />
                )}
                <Button type="text" size="small" icon={<EditOutlined />} className="text-slate-500 hover:text-blue-500" />
                <Button
                  type="text" size="small"
                  icon={item.isActive ? <StopOutlined /> : <PlayCircleOutlined />}
                  danger={item.isActive}
                  className={!item.isActive ? 'text-green-600 hover:text-green-700' : ''}
                />
                <Button type="text" size="small" icon={<DeleteOutlined />} danger />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SupplierView({ setView }: { setView: (v: ViewMode) => void }) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => setView('list')}
          className="border-none shadow-none px-0"
        />
        <Title level={4} style={{ margin: 0 }}>新建模型</Title>
      </div>
      <Steps current={0} />
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SUPPLIERS.map(s => (
            <div
              key={s}
              onClick={() => setView('new_config')}
              className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 rounded-xl p-6 flex flex-col items-center gap-4 cursor-pointer transition-all shadow-sm hover:shadow-md justify-center text-center group"
              style={{ height: 180 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                <span className="text-slate-500 font-mono text-lg">{s.slice(0, 3)}</span>
              </div>
              <div className="font-medium text-slate-700">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfigFormView({ setView }: { setView: (v: ViewMode) => void }) {
  return (
    <div className="p-6 h-full flex flex-col relative">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => setView('new_select_supplier')}
          className="hover:bg-slate-100 border-slate-200"
        />
        <div>
          <Title level={4} style={{ margin: 0 }}>配置参数</Title>
          <Text type="secondary" className="text-xs">OpenAI</Text>
        </div>
      </div>
      <Steps current={1} />

      <div className="flex-1 overflow-auto max-w-3xl mx-auto w-full pr-4 pb-20">
        <Form layout="vertical" initialValues={{ modelType: 0 }}>
          {/* 基础信息 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 mb-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="显示名称" required><Input placeholder="例如 GPT-4o" size="large" /></Form.Item>
              <Form.Item label="模型类型" required>
                <Select size="large" defaultValue={0}>
                  <Select.Option value={0}>LLM (大语言模型)</Select.Option>
                  <Select.Option value={1}>Embedding (向量模型)</Select.Option>
                  <Select.Option value={2}>Audio (语音模型)</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="基础模型" required>
              <Select showSearch size="large" placeholder="选择 base model"
                options={['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'].map(v => ({ label: v, value: v }))} />
            </Form.Item>
          </div>

          {/* API 配置 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 mb-6 shadow-sm">
            <Title level={5} className="mb-4 text-slate-600">API 配置</Title>
            <Form.Item label="API 域名" required><Input defaultValue="https://api.openai.com/v1" /></Form.Item>
            <Form.Item label="API Key"><Input.Password placeholder="sk-..." /></Form.Item>
          </div>

          {/* 自定义参数 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/60 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-slate-700">自定义参数</span>
              <Button type="dashed" size="small" icon={<PlusOutlined />}>添加参数</Button>
            </div>
            {[['temperature', '0.7'], ['top_p', '1'], ['max_tokens', '4096']].map(([k, v], i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <Input placeholder="Key" defaultValue={k} />
                <Input placeholder="Value" defaultValue={v} />
                <Button type="text" danger icon={<DeleteOutlined />} />
              </div>
            ))}
          </div>
        </Form>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-auto bg-white/80 backdrop-blur-sm absolute bottom-0 left-0 right-0 px-6 py-4">
        <Button size="large" onClick={() => setView('list')}>取消</Button>
        <Button type="primary" size="large">创建</Button>
      </div>
    </div>
  );
}

function Steps({ current }: { current: number }) {
  return (
    <div className="mb-6 mx-auto max-w-2xl px-4 w-full">
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
          style={{ backgroundColor: current >= 0 ? HEX : '#e5e7eb', color: current >= 0 ? '#fff' : '#6b7280' }}
        >1</div>
        <div className="ml-3 font-medium text-gray-900">选择厂商</div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200" />
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold"
          style={{ backgroundColor: current >= 1 ? HEX : '#e5e7eb', color: current >= 1 ? '#fff' : '#6b7280' }}
        >2</div>
        <div className="ml-3 font-medium text-gray-900">配置参数</div>
      </div>
    </div>
  );
}
