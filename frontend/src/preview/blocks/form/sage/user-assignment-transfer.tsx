import { useState } from 'react';
import { Avatar, Button, ConfigProvider, Radio, Select, Transfer } from 'antd';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const USERS: TransferRecord[] = [
  { key: '1', title: 'admin', description: 'ID: 1', roles: ['管理员'] },
  { key: '2', title: 'archer', description: 'ID: 2', roles: ['数据分析师'] },
  { key: '3', title: 'lyna', description: 'ID: 3', roles: ['产品经理'] },
  { key: '4', title: 'wang', description: 'ID: 4', roles: ['开发'] },
  { key: '5', title: 'zhao', description: 'ID: 5', roles: ['财务'] },
  { key: '6', title: 'sun', description: 'ID: 6', roles: ['运营'] },
  { key: '7', title: 'li', description: 'ID: 7', roles: ['数据分析师'] },
  { key: '8', title: 'chen', description: 'ID: 8', roles: ['运营'] },
  { key: '9', title: 'liu', description: 'ID: 9', roles: ['开发'] },
  { key: '10', title: 'huang', description: 'ID: 10', roles: ['产品经理'] },
];

interface TransferRecord {
  key: string; title: string; description: string; roles: string[]; avatar?: string;
}

const ROLE_OPTIONS = [
  { label: 'Member', value: 'member' },
  { label: 'Admin', value: 'admin' },
];

const UNIQUE_ROLES = Array.from(new Set(USERS.flatMap(u => u.roles))).map(r => ({ label: r, value: r }));

export default function UserAssignmentTransferPage() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3']);
  const [selectedRole, setSelectedRole] = useState('member');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string[]>([]);

  const displayedUsers = selectedRoleFilter.length === 0
    ? USERS
    : USERS.filter(u => targetKeys.includes(u.key) || u.roles.some(r => selectedRoleFilter.includes(r)));

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        {/* Modal body 直接渲染 · width=700 */}
        <div className="bg-white rounded-lg" style={{ maxWidth: 700, margin: '0 auto', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Modal title */}
          <div className="px-6 py-4 border-b border-gray-200">
            <span className="text-base font-medium">添加成员</span>
          </div>

          <div className="px-6 pb-2 pt-2">
            <div className="space-y-4 py-2">
              <div className="text-slate-500 mb-2">为模型「GPT-4o」分配可见用户</div>

              <div>
                <div className="mb-2 font-medium text-slate-700">成员角色</div>
                <Radio.Group value={selectedRole} onChange={e => setSelectedRole(e.target.value)} className="w-full">
                  <div className="flex gap-4">
                    {ROLE_OPTIONS.map(opt => (
                      <Radio key={opt.value} value={opt.value} className="flex items-center">
                        <span className="text-sm">{opt.label}</span>
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
              </div>

              <div>
                <div className="mb-2 font-medium text-slate-700">按角色筛选</div>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '46%', marginBottom: 12 }}
                  placeholder="不筛选"
                  value={selectedRoleFilter}
                  onChange={setSelectedRoleFilter}
                  options={UNIQUE_ROLES}
                  maxTagCount="responsive"
                />

                <div className="mb-2 font-medium text-slate-700">选择用户</div>
                <Transfer
                  pagination={false}
                  dataSource={displayedUsers}
                  titles={['未分配', '已分配']}
                  targetKeys={targetKeys}
                  onChange={k => setTargetKeys(k as string[])}
                  showSearch
                  filterOption={(v, item: any) => item.title.toLowerCase().indexOf(v.toLowerCase()) > -1}
                  render={(item: any) => (
                    <div className="flex items-center gap-2">
                      <Avatar size="small" style={{ backgroundColor: HEX, fontSize: 10 }}>
                        {item.title[0]?.toUpperCase()}
                      </Avatar>
                      <span>{item.title}</span>
                    </div>
                  )}
                  styles={{ section: { width: 300, height: 350 } }}
                  selectAllLabels={[
                    ({ selectedCount, totalCount }) => (
                      <span>{selectedCount > 0 ? `${selectedCount}/${totalCount}` : ''}</span>
                    ),
                    ({ selectedCount, totalCount }) => (
                      <span>{selectedCount > 0 ? `${selectedCount}/${totalCount}` : ''}</span>
                    ),
                  ]}
                  showSelectAll
                  footer={({ direction }) => direction === 'right' ? (
                    <Button
                      size="small" type="link"
                      style={{ float: 'left', margin: 5 }}
                      onClick={() => setTargetKeys([])}
                      disabled={targetKeys.length === 0}
                    >清空</Button>
                  ) : null}
                />
              </div>
            </div>
          </div>

          {/* Modal footer */}
          <div className="px-6 py-3 border-t border-gray-100 flex justify-end gap-2">
            <Button>取消</Button>
            <Button type="primary" disabled={targetKeys.length === 0}>确定（{targetKeys.length} 人）</Button>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
