import { useState } from 'react';
import { Button, Card, ConfigProvider, Input, InputNumber, Select, Slider, Switch, Tooltip } from 'antd';
import { HelpCircle, RotateCcw, Save } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

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
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ height: '100%', minHeight: 720, overflow: 'auto', padding: '24px 32px', fontFamily: SAGE_FONT }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>空间配置</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button icon={<RotateCcw size={14} />}>重置</Button>
              <Button type="primary" icon={<Save size={14} />}>保存</Button>
            </div>
          </div>

          {/* Two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            {/* 左列 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>输出配置</span>}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <FormItem label="输出语言"><Select defaultValue="zh-CN" options={[{ label: '简体中文', value: 'zh-CN' }, { label: 'English', value: 'en' }]} /></FormItem>
                  <FormItem label="SQL 结果行数上限"><InputNumber defaultValue={200} min={10} max={10000} style={{ width: '100%' }} /></FormItem>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>AI 功能</span>}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Banner label="开启 AI 标题生成" desc="大模型自动总结对话首条问题为标题" checked={aiTitle} onChange={setAiTitle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, opacity: aiTitle ? 1 : 0.5, pointerEvents: aiTitle ? 'auto' : 'none' }}>
                    <FormItem label="标题最大字数"><InputNumber defaultValue={20} min={5} max={100} style={{ width: '100%' }} /></FormItem>
                    <FormItem label="快捷提问默认数量"><InputNumber defaultValue={3} min={1} max={50} style={{ width: '100%' }} /></FormItem>
                  </div>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>对话配置</span>}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Banner label="启用 Excel 下载" desc="允许在数据问答里下载结果为 Excel" checked={excel} onChange={setExcel} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <FormItem label="对话内存上限"><InputNumber defaultValue={20} min={1} max={100} style={{ width: '100%' }} /></FormItem>
                    <FormItem label="DataQA 上下文上限"><InputNumber defaultValue={10} min={1} max={50} style={{ width: '100%' }} /></FormItem>
                  </div>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>数据分析</span>}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <FormItem label="文本分析采样行数"><InputNumber defaultValue={50} min={10} max={500} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="图表分析采样行数"><InputNumber defaultValue={100} min={10} max={1000} style={{ width: '100%' }} /></FormItem>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>模型角色</span>}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Banner label="启用自定义角色" desc="覆盖默认 system prompt" checked={customRole} onChange={setCustomRole} />
                  <FormItem label="角色提示词">
                    <Input.TextArea rows={3} disabled={!customRole}
                      placeholder="例如：你是数据分析助手，所有回答必须基于查询结果..." />
                  </FormItem>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>安全</span>}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <FormItem label="重试次数"><InputNumber defaultValue={3} min={0} max={10} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="SQL 执行超时（秒）"><InputNumber defaultValue={30} min={5} max={300} style={{ width: '100%' }} /></FormItem>
                </div>
              </Card>
            </div>

            {/* 右列 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>向量检索数量</span>}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <FormItem label="表"><InputNumber defaultValue={10} min={1} max={50} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="规则"><InputNumber defaultValue={5} min={1} max={20} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="预制 SQL"><InputNumber defaultValue={5} min={1} max={20} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="用户 SQL"><InputNumber defaultValue={3} min={1} max={20} style={{ width: '100%' }} /></FormItem>
                  <FormItem label="低质 SQL（黑名单）"><InputNumber defaultValue={5} min={1} max={20} style={{ width: '100%' }} /></FormItem>
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>向量阈值</span>}>
                <p style={{ margin: '0 0 12px', color: '#737373', fontSize: 12 }}>距离 ≤ 阈值才会被采纳</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                  {['表', '规则', '预制 SQL', '用户 SQL', '低质 SQL'].map((l, i) => (
                    <FormItem key={l} label={l}>
                      <Slider min={0} max={1} step={0.05} marks={MARKS} defaultValue={[0.4, 0.3, 0.35, 0.4, 0.6][i]} />
                    </FormItem>
                  ))}
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>向量化</span>}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Banner label="点赞 SQL 入向量库" desc="用户点赞的 SQL 自动入库供检索" checked={vecLiked} onChange={setVecLiked} />
                  <Banner label="反馈 SQL 入向量库" desc="带反馈备注的 SQL 自动入库" checked={vecFeedback} onChange={setVecFeedback} />
                </div>
              </Card>

              <Card size="small" title={<span style={{ color: '#404040', fontWeight: 500 }}>查询重写</span>}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Banner label="启用查询重写" desc="将用户问题改写为更精确的检索语句" checked={rewrite} onChange={setRewrite} />
                  <div style={{ opacity: rewrite ? 1 : 0.5, pointerEvents: rewrite ? 'auto' : 'none' }}>
                    <FormItem label="改写次数"><InputNumber defaultValue={3} min={1} max={10} style={{ width: '100%' }} /></FormItem>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function Banner({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', background: '#fafafa', borderRadius: 8,
    }}>
      <div>
        <div style={{ fontWeight: 500, color: '#404040', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          {label}
          <Tooltip title={desc}><HelpCircle size={12} color="#94a3b8" /></Tooltip>
        </div>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#737373' }}>{desc}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
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
