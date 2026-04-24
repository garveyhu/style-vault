import { Cascader, ConfigProvider, DatePicker } from 'antd';
import { ArrowLeft, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const ANT_THEME = { token: { colorPrimary: '#0f172a' } };

const REGIONS = [
  { value: 'zj', label: '浙江', children: [
    { value: 'hz', label: '杭州' },
    { value: 'nb', label: '宁波' },
    { value: 'wz', label: '温州' },
  ]},
  { value: 'bj', label: '北京', children: [
    { value: 'cy', label: '朝阳' },
    { value: 'hd', label: '海淀' },
  ]},
  { value: 'sh', label: '上海', children: [
    { value: 'pd', label: '浦东' },
    { value: 'xh', label: '徐汇' },
  ]},
];

type ModalKey = 'avatar' | 'nickname' | 'bio' | 'gender' | 'birthday' | 'location' | null;

type Row = {
  key: string;
  label: string;
  value: string;
  editable: boolean;
  mono?: boolean;
  greenTick?: boolean;
  empty?: boolean;
};

const ROWS: Row[] = [
  { key: 'uid',       label: 'UID',     value: '1024',               editable: false, mono: true },
  { key: 'nickname',  label: '名字',    value: 'links',              editable: true },
  { key: 'bio',       label: '简介',    value: '在构建 AI 技能社区', editable: true },
  { key: 'gender',    label: '性别',    value: '男',                 editable: true },
  { key: 'birthday',  label: '生日',    value: '1995-08-15',         editable: true },
  { key: 'location',  label: '所在地',  value: '浙江·杭州',          editable: true },
  { key: 'google',    label: 'Google',  value: '已绑定',             editable: true, greenTick: true },
];

export default function ProfileEditFormPreview() {
  const [modal, setModal] = useState<ModalKey>(null);

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a', background: '#fff', minHeight: 700, paddingBottom: 96 }}>

        {/* Sticky top bar · max-w-lg h-12 · 中间"编辑资料" · 右侧 w-12 占位保持对称 */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 20, background: '#fff',
          borderBottom: '1px solid #f1f5f9',
        }}>
          <div style={{ maxWidth: 512, margin: '0 auto', height: 48, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 14, color: '#475569', background: 'transparent', border: 'none',
              cursor: 'pointer', padding: 0, marginLeft: -4, fontFamily: 'inherit',
            }}>
              <ArrowLeft size={18} /> 返回
            </button>
            <h1 style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              编辑资料
            </h1>
            <div style={{ width: 48 }} />
          </div>
        </div>

        <div style={{ maxWidth: 512, margin: '0 auto' }}>
          {/* 头像 section · 可点击 button · 真实 hover:bg-slate-50/50 */}
          <button
            onClick={() => setModal('avatar')}
            style={{
              width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '32px 0', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'background 150ms',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,250,252,0.5)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 80, height: 80, borderRadius: 999,
                background: '#cbd5e1', color: '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 36,
                boxShadow: '0 0 0 4px #f1f5f9',
              }}>
                L
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>点击更换头像</span>
          </button>

          {/* iOS 风字段列表 · divide-y divide-slate-50 · border-t border-slate-100 */}
          <div style={{ borderTop: '1px solid #f1f5f9' }}>
            {ROWS.map((row, i) => {
              const isLast = i === ROWS.length - 1;
              const clickable = row.editable && row.key !== 'google';
              return (
                <div
                  key={row.key}
                  onClick={() => clickable && setModal(row.key as ModalKey)}
                  onMouseEnter={(e) => { if (row.editable) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                  onMouseLeave={(e) => { if (row.editable) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: isLast ? 'none' : '1px solid #f8fafc',
                    background: 'transparent',
                    cursor: clickable ? 'pointer' : 'default',
                    transition: 'background 150ms',
                  }}
                >
                  <span style={{
                    width: 80, fontSize: 14, color: '#64748b',
                    flexShrink: 0, textAlign: 'right', marginRight: 24,
                  }}>
                    {row.label}
                  </span>
                  <span style={{
                    flex: 1, fontSize: 14,
                    color: row.empty ? '#94a3b8' : '#0f172a',
                    fontFamily: row.mono ? 'JetBrains Mono, monospace' : 'inherit',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    textAlign: 'left',
                  }}>
                    {row.greenTick && (
                      <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    )}
                    <span style={{ color: row.greenTick ? '#16a34a' : (row.empty ? '#94a3b8' : '#0f172a') }}>
                      {row.value}
                    </span>
                  </span>
                  {row.editable && (
                    <ChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal 演示 */}
        {modal && (
          <>
            <div
              onClick={() => setModal(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 30 }}
            />
            <div style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: '#fff', borderRadius: 8, width: modal === 'avatar' ? 400 : 360,
              padding: 24, zIndex: 31, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: '#0f172a' }}>
                {modal === 'avatar' && '更换头像'}
                {modal === 'nickname' && '修改名字'}
                {modal === 'bio' && '修改简介'}
                {modal === 'gender' && '选择性别'}
                {modal === 'birthday' && '选择生日'}
                {modal === 'location' && '选择所在地'}
              </h3>

              {modal === 'avatar' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                  {['user', 'star', 'heart', 'palette', 'bell', 'search', 'book', 'rocket', 'zap', 'wrench'].map((k, i) => {
                    const selected = i === 0;
                    return (
                      <button key={k}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          padding: 8, borderRadius: 12,
                          background: selected ? 'rgba(238,242,255,0.5)' : 'transparent',
                          boxShadow: selected ? '0 0 0 2px #818cf8' : 'none',
                          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 999,
                          background: '#f1f5f9', color: '#64748b',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <User size={20} />
                        </div>
                        <span style={{ fontSize: 10, color: '#64748b' }}>{k}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {modal === 'gender' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 0' }}>
                  {[
                    { key: 'male', label: '男' },
                    { key: 'female', label: '女' },
                    { key: 'other', label: '其他' },
                  ].map((opt) => {
                    const selected = opt.key === 'male';
                    return (
                      <button key={opt.key} onClick={() => setModal(null)}
                        style={{
                          width: '100%', textAlign: 'left', padding: '12px 16px',
                          borderRadius: 8, fontSize: 14,
                          background: selected ? '#eef2ff' : 'transparent',
                          color: selected ? '#4338ca' : '#334155',
                          fontWeight: selected ? 600 : 400,
                          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                          transition: 'background 150ms',
                        }}
                        onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
                        onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {modal === 'nickname' && (
                <input defaultValue="links" maxLength={120}
                  style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }} />
              )}

              {modal === 'bio' && (
                <textarea defaultValue="在构建 AI 技能社区" rows={4} maxLength={200}
                  style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit', resize: 'none' }} />
              )}

              {modal === 'birthday' && (
                <ConfigProvider theme={ANT_THEME}>
                  <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'center' }}>
                    <DatePicker
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="选择你的生日"
                      onChange={() => setModal(null)}
                    />
                  </div>
                </ConfigProvider>
              )}

              {modal === 'location' && (
                <ConfigProvider theme={ANT_THEME}>
                  <div style={{ padding: '16px 0' }}>
                    <Cascader
                      options={REGIONS}
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="选择省份和城市"
                      expandTrigger="hover"
                      onChange={(value) => { if (value && value.length >= 2) setModal(null); }}
                    />
                  </div>
                </ConfigProvider>
              )}

              {(modal === 'nickname' || modal === 'bio') && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                  <button onClick={() => setModal(null)} style={{
                    padding: '6px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                    background: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  }}>取消</button>
                  <button onClick={() => setModal(null)} style={{
                    padding: '6px 16px', borderRadius: 6, border: 'none',
                    background: '#0f172a', color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  }}>保存</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PreviewFrame>
  );
}
