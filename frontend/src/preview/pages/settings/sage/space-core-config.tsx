import { useState } from 'react';
import { Button, Card, ConfigProvider, Form, Input, InputNumber, Select, Slider, Switch, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const { Title, Text } = Typography;
const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const LANG_OPTIONS = [
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁體中文', value: 'zh-TW' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
];

const MARKS = { 0: '0', 0.2: '0.2', 0.5: '0.5', 1: '1' };

export default function SpaceCoreConfigPage() {
  const [aiTitle, setAiTitle] = useState(true);
  const [excel, setExcel] = useState(true);
  const [customRole, setCustomRole] = useState(false);
  const [vecLiked, setVecLiked] = useState(true);
  const [vecFeedback, setVecFeedback] = useState(false);
  const [rewrite, setRewrite] = useState(true);

  return (
    <PreviewFrame bg="rgb(250,250,250)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <div className="h-full bg-neutral-50 overflow-auto" style={{ minHeight: 720 }}>
          <div className="w-full px-8 py-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Title level={3} style={{ margin: 0, color: '#1e293b' }}>空间配置</Title>
                <Text className="text-neutral-500">为当前空间配置 AI 问答 / 向量检索 / 安全等核心参数</Text>
              </div>
              <div className="flex gap-3">
                <Tooltip title="将所有参数恢复到推荐默认值">
                  <Button icon={<ReloadOutlined />} className="border-neutral-200">重置</Button>
                </Tooltip>
                <Button type="primary" icon={<SaveOutlined />}>保存</Button>
              </div>
            </div>

            <Form layout="vertical" initialValues={{ outputLanguage: 'zh-CN', sqlResultRowLimit: 200, aiTitleMaxLength: 20, quickQuestionDefaultCount: 3, dialogueMemoryLimit: 20, dataqaContextLimit: 10, textAnalysisSampleDataLimit: 50, chartAnalysisSampleDataLimit: 100, securityRetryLimit: 3, sqlExecuteTimeout: 30 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 左列 */}
                <div className="flex flex-col gap-3">
                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">输出配置</span>}>
                    <div className="grid grid-cols-2 gap-6">
                      <Form.Item name="outputLanguage" label="输出语言" tooltip="LLM 回答和系统提示词的语言">
                        <Select options={LANG_OPTIONS} />
                      </Form.Item>
                      <Form.Item name="sqlResultRowLimit" label="SQL 结果行数上限" tooltip="单次查询返回的最大行数">
                        <InputNumber min={1} max={1000} style={{ width: '100%' }} />
                      </Form.Item>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">AI 功能配置</span>}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                        <div>
                          <div className="font-medium text-neutral-700">AI 标题生成</div>
                          <div className="text-sm text-neutral-500">大模型自动总结对话首条问题为标题</div>
                        </div>
                        <Switch checked={aiTitle} onChange={setAiTitle} />
                      </div>
                      <div className={`grid grid-cols-2 gap-6 mt-4 transition-opacity ${!aiTitle ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Form.Item name="aiTitleMaxLength" label="标题最大字数">
                          <InputNumber min={5} max={100} style={{ width: '100%' }} disabled={!aiTitle} />
                        </Form.Item>
                        <Form.Item name="quickQuestionDefaultCount" label="快捷提问默认数量">
                          <InputNumber min={1} max={50} style={{ width: '100%' }} disabled={!aiTitle} />
                        </Form.Item>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">对话配置</span>}>
                    <div className="space-y-4">
                      <Banner label="允许下载 Excel" tooltip="允许用户在数据问答里下载结果为 Excel" checked={excel} onChange={setExcel} />
                      <div className="grid grid-cols-2 gap-6">
                        <Form.Item name="dialogueMemoryLimit" label="对话记忆长度" tooltip="保留最近 N 轮对话作为上下文">
                          <InputNumber min={2} max={50} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="dataqaContextLimit" label="DataQA 上下文限制">
                          <InputNumber min={1} max={20} style={{ width: '100%' }} />
                        </Form.Item>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">数据分析配置</span>}>
                    <div className="grid grid-cols-2 gap-6">
                      <Form.Item name="textAnalysisSampleDataLimit" label="文本分析采样行数">
                        <InputNumber min={0} max={1000} style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item name="chartAnalysisSampleDataLimit" label="图表分析采样行数">
                        <InputNumber min={0} max={1000} style={{ width: '100%' }} />
                      </Form.Item>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">模型角色配置</span>}>
                    <div className="space-y-4">
                      <Banner label="启用自定义角色" tooltip="覆盖默认 system prompt" checked={customRole} onChange={setCustomRole} />
                      <Form.Item label="角色提示词" className={!customRole ? 'opacity-50 pointer-events-none' : ''}>
                        <Input.TextArea rows={3} disabled={!customRole} placeholder="例如：你是数据分析助手，所有回答必须基于查询结果..." />
                      </Form.Item>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">安全配置</span>}>
                    <div className="grid grid-cols-2 gap-6">
                      <Form.Item name="securityRetryLimit" label="重试次数">
                        <InputNumber min={1} max={5} style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item name="sqlExecuteTimeout" label="SQL 执行超时" tooltip="超时后强制中断">
                        <InputNumber min={1} max={600} style={{ width: '100%' }} addonAfter="s" />
                      </Form.Item>
                    </div>
                  </Card>
                </div>

                {/* 右列 */}
                <div className="flex flex-col gap-3">
                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">向量搜索数量上限</span>}>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item label="表索引"><InputNumber min={1} max={100} style={{ width: '100%' }} defaultValue={10} /></Form.Item>
                      <Form.Item label="规则"><InputNumber min={1} max={50} style={{ width: '100%' }} defaultValue={5} /></Form.Item>
                      <Form.Item label="预制 SQL"><InputNumber min={1} max={50} style={{ width: '100%' }} defaultValue={5} /></Form.Item>
                      <Form.Item label="用户 SQL"><InputNumber min={1} max={50} style={{ width: '100%' }} defaultValue={3} /></Form.Item>
                      <Form.Item label="低质 SQL（黑名单）" className="col-span-2"><InputNumber min={1} max={50} style={{ width: '100%' }} defaultValue={5} /></Form.Item>
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">向量匹配阈值</span>}>
                    <Text className="text-neutral-500 text-sm block mb-3">距离 ≤ 阈值才会被采纳</Text>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {['表', '规则', '预制 SQL', '用户 SQL', '低质 SQL'].map((l, i) => (
                        <Form.Item key={l} label={l}>
                          <Slider min={0} max={1} step={0.05} marks={MARKS} defaultValue={[0.4, 0.3, 0.35, 0.4, 0.6][i]} />
                        </Form.Item>
                      ))}
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">向量化策略</span>}>
                    <div className="space-y-3">
                      <Banner label="点赞 SQL 入向量库" tooltip="用户点赞的 SQL 自动入库供检索" checked={vecLiked} onChange={setVecLiked} />
                      <Banner label="反馈 SQL 入向量库" tooltip="带反馈备注的 SQL 自动入库" checked={vecFeedback} onChange={setVecFeedback} />
                    </div>
                  </Card>

                  <Card className="border-neutral-200 shadow-sm" title={<span className="text-neutral-700 font-medium">查询重写</span>}>
                    <div className="space-y-4">
                      <Banner label="启用查询重写" tooltip="将用户问题改写为更精确的检索语句" checked={rewrite} onChange={setRewrite} />
                      <Form.Item label="改写次数" className={!rewrite ? 'opacity-50 pointer-events-none' : ''}>
                        <InputNumber min={1} max={10} defaultValue={3} style={{ width: '100%' }} disabled={!rewrite} />
                      </Form.Item>
                    </div>
                  </Card>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function Banner({ label, tooltip, checked, onChange }: { label: string; tooltip: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="font-medium text-neutral-700">{label}</div>
        <Tooltip title={tooltip}>
          <QuestionCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} className="cursor-help" />
        </Tooltip>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}
