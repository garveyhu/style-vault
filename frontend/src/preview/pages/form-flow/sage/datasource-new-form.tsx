import { useState } from 'react';
import { Button, Card, ConfigProvider, Form, Input, Radio, Steps, Switch, Tag, Transfer } from 'antd';
import { ArrowLeft, CheckCircle, Database } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const TYPES = [
  { v: 'mysql', label: 'MySQL', dev: false },
  { v: 'postgresql', label: 'PostgreSQL', dev: false },
  { v: 'oracle', label: 'Oracle', dev: false },
  { v: 'kingbase', label: '人大金仓', dev: false },
  { v: 'dm', label: '达梦', dev: false },
  { v: 'sqlserver', label: 'SQL Server', dev: true },
  { v: 'clickhouse', label: 'ClickHouse', dev: true },
  { v: 'doris', label: 'Doris', dev: true },
  { v: 'starrocks', label: 'StarRocks', dev: true },
  { v: 'es', label: 'Elasticsearch', dev: true },
];

const CANDIDATE_TABLES = [
  'users', 'orders', 'order_items', 'products', 'product_categories',
  'channels', 'channel_metrics', 'campaigns', 'refunds', 'refund_reasons',
  'inventory', 'warehouse', 'shipments', 'logistics', 'discount_codes',
  'audit_logs', 'user_events', 'sessions', 'feedback', 'tickets',
];

export default function DataSourceNewFormPage() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState('mysql');
  const [useProxy, setUseProxy] = useState(false);
  const [test, setTest] = useState<'success' | 'error' | null>('success');
  const [pattern, setPattern] = useState('');
  const [targets, setTargets] = useState<string[]>(['users', 'orders', 'products']);

  const next = () => setStep(s => Math.min(3, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));
  const tableData = CANDIDATE_TABLES.map(n => ({ key: n, title: n }));

  const isMatch = (p: string, t: string) => {
    if (!p) return false;
    const re = new RegExp('^' + p.split('*').join('.*').split('?').join('.') + '$', 'i');
    return re.test(t);
  };

  const matchAll = () => {
    if (!pattern) return;
    setTargets(t => Array.from(new Set([...t, ...CANDIDATE_TABLES.filter(x => isMatch(pattern, x))])));
  };
  const dematch = () => {
    if (!pattern) return;
    setTargets(t => t.filter(x => !isMatch(pattern, x)));
  };

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ height: '100%', minHeight: 720, padding: 24, overflow: 'auto', fontFamily: SAGE_FONT }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Button type="text" icon={<ArrowLeft size={16} />} />
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>新建数据源</h2>
          </div>

          <Card>
            <Steps
              current={step}
              className="mb-6"
              style={{ marginBottom: 24 }}
              items={[
                { title: '选择类型' },
                { title: '连接信息' },
                { title: '选择表' },
                { title: '确认' },
              ]}
            />

            <Form layout="vertical">
              {/* Step 0 · 类型 */}
              <div style={{ display: step === 0 ? 'block' : 'none', padding: '16px 0' }}>
                <Radio.Group value={type} onChange={e => setType(e.target.value)} style={{ width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                    {TYPES.map(t => {
                      const sel = type === t.v;
                      return (
                        <Radio.Button
                          key={t.v}
                          value={t.v}
                          disabled={t.dev}
                          style={{
                            height: 96,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            opacity: t.dev ? 0.6 : 1,
                            borderColor: sel ? HEX : undefined,
                            color: sel ? HEX : undefined,
                            position: 'relative',
                          }}
                        >
                          <Database size={28} style={{ color: sel ? HEX : '#94a3b8' }} />
                          <div style={{ marginTop: 4, fontSize: 12 }}>{t.label}</div>
                          {t.dev && <Tag color="processing" style={{ position: 'absolute', top: 4, right: 4, fontSize: 10, lineHeight: '14px', padding: '0 4px' }}>开发中</Tag>}
                        </Radio.Button>
                      );
                    })}
                  </div>
                </Radio.Group>
              </div>

              {/* Step 1 · 连接 */}
              <div style={{ display: step === 1 ? 'block' : 'none', padding: '16px 0' }}>
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#fafafa', borderRadius: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#404040' }}>使用 HTTP 代理</span>
                  <Switch checked={useProxy} onChange={setUseProxy} />
                  <span style={{ marginLeft: 8, fontSize: 12, color: '#737373' }}>无法直连数据库时启用</span>
                </div>
                {useProxy ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Form.Item label="代理 URL"><Input placeholder="https://proxy.example.com" /></Form.Item>
                    <Form.Item label="代理 API Key"><Input.Password placeholder="proxy-key-..." /></Form.Item>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                    <Form.Item label="主机"><Input placeholder="localhost" /></Form.Item>
                    <Form.Item label="端口"><Input defaultValue="3306" /></Form.Item>
                    <Form.Item label="用户名"><Input /></Form.Item>
                    <Form.Item label="密码"><Input.Password /></Form.Item>
                    <Form.Item label="数据库"><Input /></Form.Item>
                    <Form.Item label="Schema"><Input placeholder="public" /></Form.Item>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  <Button icon={<CheckCircle size={14} />} onClick={() => setTest('success')}>测试连接</Button>
                  {test === 'success' && <Tag color="success">连接成功</Tag>}
                  {test === 'error' && <Tag color="error">连接失败</Tag>}
                </div>
              </div>

              {/* Step 2 · 选表 */}
              <div style={{ display: step === 2 ? 'block' : 'none', padding: '16px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 800, margin: '0 auto' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: 12, background: '#fafafa', borderRadius: 8,
                    border: '1px solid #f1f5f9',
                  }}>
                    <span style={{ color: '#4b5563', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>通配符匹配</span>
                    <Input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="如 order_*" style={{ width: 200 }} />
                    <Button size="small" onClick={matchAll}>全选匹配</Button>
                    <Button size="small" onClick={dematch}>取消匹配</Button>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9ca3af' }}>* 任意 · ? 单字符</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Transfer
                      dataSource={tableData}
                      titles={[`未选 ${CANDIDATE_TABLES.length - targets.length}`, `已选 ${targets.length}`]}
                      targetKeys={targets}
                      onChange={k => setTargets(k as string[])}
                      showSearch
                      render={item => item.title}
                      listStyle={{ width: 350, height: 400 }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3 · 确认 */}
              <div style={{ display: step === 3 ? 'block' : 'none', padding: '24px 0', textAlign: 'center' }}>
                <Database size={64} color={HEX} />
                <h3 style={{ marginTop: 16, marginBottom: 8, color: '#1e293b' }}>确认创建</h3>
                <p style={{ color: '#64748b', marginBottom: 24 }}>请检查以下信息</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 720, margin: '0 auto', textAlign: 'left' }}>
                  <Card size="small" title="类型"><Tag color="blue">{TYPES.find(t => t.v === type)?.label}</Tag></Card>
                  <Card size="small" title="连接">{useProxy ? '代理模式' : '直连'}</Card>
                  <Card size="small" title="表数量">{targets.length} 张</Card>
                </div>
              </div>
            </Form>

            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9',
            }}>
              <Button onClick={prev} disabled={step === 0}>上一步</Button>
              {step < 3 ? (
                <Button type="primary" onClick={next} disabled={step === 1 && test !== 'success'}>下一步</Button>
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
