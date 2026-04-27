import { useState } from 'react';
import { Avatar, Button, ConfigProvider, Radio, Select, Transfer } from 'antd';
import { Bird, Cat, Crown, Dog, Feather, Star, User } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const ICONS = [Crown, Star, Feather, Cat, Dog, Bird, User];
const USERS = [
  { key: '1', title: 'admin', role: '管理员' },
  { key: '2', title: 'archer', role: '数据分析师' },
  { key: '3', title: 'lyna', role: '产品经理' },
  { key: '4', title: 'wang', role: '开发' },
  { key: '5', title: 'zhao', role: '财务' },
  { key: '6', title: 'sun', role: '运营' },
  { key: '7', title: 'li', role: '数据分析师' },
  { key: '8', title: 'chen', role: '运营' },
  { key: '9', title: 'liu', role: '开发' },
  { key: '10', title: 'huang', role: '产品经理' },
];

export default function UserAssignmentTransferPage() {
  const [targets, setTargets] = useState<string[]>(['1', '3']);
  const [role, setRole] = useState('admin_only');
  const [filter, setFilter] = useState<string[]>([]);

  const filtered = filter.length === 0 ? USERS : USERS.filter(u => filter.includes(u.role));

  return (
    <PreviewFrame bg="rgba(15,23,42,0.3)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 720, backdropFilter: 'blur(2px)' }}>
          <div style={{
            width: 700, background: '#fff', borderRadius: 12,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#1f2937' }}>分配用户到模型</h3>
            </div>

            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* 段 1：角色单选 */}
              <div>
                <p style={{ margin: '0 0 8px', fontWeight: 500, color: '#334155' }}>选择角色</p>
                <Radio.Group value={role} onChange={e => setRole(e.target.value)} style={{ display: 'flex', gap: 16 }}>
                  <Radio value="admin_only">仅管理员</Radio>
                  <Radio value="all_members">全体成员</Radio>
                  <Radio value="custom">自定义</Radio>
                </Radio.Group>
              </div>

              {/* 段 2：角色筛选 */}
              <div>
                <p style={{ margin: '0 0 8px', fontWeight: 500, color: '#334155' }}>按角色筛选</p>
                <Select
                  mode="multiple"
                  allowClear
                  maxTagCount="responsive"
                  style={{ width: '46%' }}
                  placeholder="不筛选"
                  value={filter}
                  onChange={setFilter}
                  options={Array.from(new Set(USERS.map(u => u.role))).map(r => ({ label: r, value: r }))}
                />
              </div>

              {/* 段 3：Transfer */}
              <div>
                <p style={{ margin: '0 0 8px', fontWeight: 500, color: '#334155' }}>用户分配</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Transfer
                    dataSource={filtered}
                    targetKeys={targets}
                    onChange={k => setTargets(k as string[])}
                    titles={['未分配', '已分配']}
                    showSearch
                    pagination={false}
                    filterOption={(v, item: any) => item.title.toLowerCase().includes(v.toLowerCase())}
                    render={(item: any) => {
                      const Ic = ICONS[parseInt(item.key) % ICONS.length];
                      return (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Avatar size="small" style={{ background: HEX }} icon={<Ic size={12} />} />
                          {item.title}
                        </span>
                      );
                    }}
                    listStyle={{ width: 300, height: 350 }}
                    selectAllLabels={[
                      ({ selectedCount, totalCount }) => <span>未分配 {selectedCount}/{totalCount}</span>,
                      ({ selectedCount, totalCount }) => <span>已分配 {selectedCount}/{totalCount}</span>,
                    ]}
                    showSelectAll
                    footer={({ direction }) => direction === 'right' ? (
                      <Button size="small" onClick={() => setTargets([])} style={{ float: 'left', margin: 5 }}>清空</Button>
                    ) : null}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 24px', borderTop: '1px solid #f1f5f9',
              display: 'flex', justifyContent: 'flex-end', gap: 8,
            }}>
              <Button>取消</Button>
              <Button type="primary" disabled={targets.length === 0}>确定（{targets.length} 人）</Button>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
