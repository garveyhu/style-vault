import { useState } from 'react';
import { Button, Card, Col, ConfigProvider, Divider, Form, Input, Radio, Row, Space, Steps, Switch, Tag, Transfer, Typography } from 'antd';
import { CheckCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const { Title, Text } = Typography;
const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const SUPPORTED = [
  { value: 'mysql', label: 'MySQL', port: 3306 },
  { value: 'postgresql', label: 'PostgreSQL', port: 5432 },
  { value: 'oracle', label: 'Oracle', port: 1521 },
  { value: 'kingbase', label: 'Kingbase', port: 54321 },
  { value: 'dm', label: 'DaMeng', port: 5236 },
];
const DEVELOPING = [
  { value: 'sqlserver', label: 'SQL Server', port: 1433 },
  { value: 'clickhouse', label: 'ClickHouse', port: 8123 },
  { value: 'doris', label: 'Doris', port: 9030 },
  { value: 'starrocks', label: 'StarRocks', port: 9030 },
  { value: 'elasticsearch', label: 'Elasticsearch', port: 9200 },
  { value: 'redshift', label: 'Redshift', port: 5439 },
  { value: 'excel', label: 'Excel', port: 0 },
];
const TABLES = ['users', 'orders', 'order_items', 'products', 'product_categories', 'channels', 'channel_metrics', 'campaigns', 'refunds', 'refund_reasons', 'inventory', 'warehouse', 'shipments', 'logistics', 'discount_codes', 'audit_logs', 'user_events', 'sessions', 'feedback', 'tickets'];

export default function DataSourceNewFormPage() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState('mysql');
  const [useProxy, setUseProxy] = useState(false);
  const [pattern, setPattern] = useState('');
  const [targets, setTargets] = useState<string[]>(['users', 'orders', 'products']);
  const [test, setTest] = useState<'success' | 'error' | null>('success');

  const isMatch = (p: string, t: string) => {
    if (!p) return false;
    try {
      return new RegExp('^' + p.split('*').join('.*').split('?').join('.') + '$', 'i').test(t);
    } catch { return false; }
  };

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <div className="p-6 h-full overflow-auto" style={{ minHeight: 720, fontFamily: SAGE_FONT }}>
          <div className="flex justify-between items-center mb-6">
            <Space>
              <Button>返回列表</Button>
              <Title level={3} style={{ margin: 0, color: '#1e293b' }}>新建数据源</Title>
            </Space>
          </div>

          <Card>
            <Steps
              current={step}
              className="mb-6"
              style={{ marginBottom: 24 }}
              items={[
                { title: '选择类型' },
                { title: '配置连接' },
                { title: '选择表' },
                { title: '确认' },
              ]}
            />

            <Form layout="vertical">
              {/* Step 0: 类型选择 */}
              <div style={{ display: step === 0 ? 'block' : 'none' }}>
                <div className="py-4">
                  <Title level={4} className="mb-4" style={{ color: '#1e293b' }}>选择数据库类型</Title>
                  <Radio.Group value={type} onChange={e => setType(e.target.value)} className="w-full">
                    <Row gutter={[16, 16]}>
                      {SUPPORTED.map(t => (
                        <Col key={t.value} xs={12} sm={8} md={6} lg={4}>
                          <Radio.Button value={t.value} className="w-full"
                            style={{
                              height: 96,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              borderColor: type === t.value ? HEX : undefined,
                              color: type === t.value ? HEX : undefined,
                            }}>
                            <div className="flex flex-col items-center justify-center">
                              <DatabaseOutlined style={{ fontSize: 28, color: type === t.value ? HEX : '#94a3b8' }} />
                              <span className="mt-1">{t.label}</span>
                            </div>
                          </Radio.Button>
                        </Col>
                      ))}
                    </Row>

                    <Divider className="!mt-6 !mb-4">
                      <Tag color="processing">开发中</Tag>
                    </Divider>

                    <Row gutter={[16, 16]}>
                      {DEVELOPING.map(t => (
                        <Col key={t.value} xs={12} sm={8} md={6} lg={4}>
                          <Radio.Button value={t.value} className="w-full" disabled
                            style={{
                              height: 96,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              opacity: 0.6,
                            }}>
                            <div className="flex flex-col items-center justify-center">
                              <DatabaseOutlined style={{ fontSize: 28, color: '#94a3b8' }} />
                              <span className="mt-1">{t.label}</span>
                            </div>
                          </Radio.Button>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </div>
              </div>

              {/* Step 1: 连接 */}
              <div style={{ display: step === 1 ? 'block' : 'none' }}>
                <div className="py-4">
                  <Title level={4} className="mb-4" style={{ color: '#1e293b' }}>配置连接参数</Title>
                  <Row gutter={24} className="mb-2">
                    <Col span={24}>
                      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-lg">
                        <Text strong>使用 HTTP 代理（无法直连数据库时启用）</Text>
                        <Switch checked={useProxy} onChange={setUseProxy} />
                      </div>
                    </Col>
                  </Row>
                  {useProxy ? (
                    <Row gutter={24}>
                      <Col span={12}><Form.Item label="代理 URL" required><Input placeholder="https://proxy.example.com" /></Form.Item></Col>
                      <Col span={12}><Form.Item label="代理 API Key"><Input.Password placeholder="proxy-key-..." /></Form.Item></Col>
                    </Row>
                  ) : (
                    <Row gutter={24}>
                      <Col span={16}><Form.Item label="主机" required><Input placeholder="localhost" /></Form.Item></Col>
                      <Col span={8}><Form.Item label="端口" required><Input defaultValue={String(SUPPORTED.find(s => s.value === type)?.port || '')} /></Form.Item></Col>
                      <Col span={12}><Form.Item label="用户名" required><Input /></Form.Item></Col>
                      <Col span={12}><Form.Item label="密码" required><Input.Password /></Form.Item></Col>
                      <Col span={12}><Form.Item label="数据库" required><Input /></Form.Item></Col>
                      <Col span={12}><Form.Item label="Schema"><Input placeholder="public" /></Form.Item></Col>
                    </Row>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <Button icon={<CheckCircleOutlined />} onClick={() => setTest('success')}>测试连接</Button>
                    {test === 'success' && <Tag color="success">连接成功</Tag>}
                    {test === 'error' && <Tag color="error">连接失败</Tag>}
                  </div>
                </div>
              </div>

              {/* Step 2: 选表 */}
              <div style={{ display: step === 2 ? 'block' : 'none' }}>
                <div className="py-4">
                  <Title level={4} className="mb-4 text-center" style={{ color: '#1e293b' }}>选择需要同步的表</Title>
                  <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
                    <div className="flex gap-2 items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-gray-600 font-medium whitespace-nowrap">通配符匹配:</span>
                      <Input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="如 order_*" style={{ width: 240 }} />
                      <Button onClick={() => setTargets(t => Array.from(new Set([...t, ...TABLES.filter(x => isMatch(pattern, x))])))}>选中匹配</Button>
                      <Button onClick={() => setTargets(t => t.filter(x => !isMatch(pattern, x)))}>取消匹配</Button>
                      <div className="ml-auto text-xs text-gray-400">* 任意 / ? 单字符</div>
                    </div>
                    <div className="flex justify-center">
                      <Transfer
                        dataSource={TABLES.map(n => ({ key: n, title: n }))}
                        titles={[`未选 (${TABLES.length - targets.length})`, `已选 (${targets.length})`]}
                        targetKeys={targets}
                        onChange={k => setTargets(k as string[])}
                        showSearch
                        render={(item: any) => item.title}
                        listStyle={{ width: 350, height: 400 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: 确认 */}
              <div style={{ display: step === 3 ? 'block' : 'none' }}>
                <div className="py-4 text-center">
                  <DatabaseOutlined style={{ fontSize: 64, color: HEX }} />
                  <Title level={4} className="mt-4" style={{ color: '#1e293b' }}>确认创建</Title>
                  <Text type="secondary" className="block mb-6">请检查以下信息</Text>
                  <Card className="text-left" style={{ maxWidth: 500, margin: '0 auto' }}>
                    <Row gutter={[16, 8]}>
                      <Col span={8}><Text strong>名称</Text></Col>
                      <Col span={16}>杭州数据库</Col>
                      <Col span={8}><Text strong>类型</Text></Col>
                      <Col span={16}>{type.toUpperCase()}</Col>
                      <Col span={8}><Text strong>主机</Text></Col>
                      <Col span={16}>{useProxy ? '代理模式' : 'localhost:3306'}</Col>
                      <Col span={8}><Text strong>表数量</Text></Col>
                      <Col span={16}>{targets.length}</Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </Form>

            <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
              <Button disabled={step === 0} onClick={() => setStep(s => s - 1)}>上一步</Button>
              {step < 3 ? (
                <Button type="primary" onClick={() => setStep(s => s + 1)} disabled={step === 1 && test !== 'success'}>下一步</Button>
              ) : (
                <Button type="primary">创建</Button>
              )}
            </div>
          </Card>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
