import { Modal } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../auth/AuthContext';
import { toast } from './Toast';

export function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { login, loggingIn } = useAuth();

  const handle = async () => {
    try {
      await login();
      toast.success('登录成功');
      onClose();
    } catch (e) {
      const msg = e instanceof Error ? e.message : '登录失败';
      toast.error(msg);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      className="login-modal"
    >
      <div className="px-2 py-4 text-center">
        <h2 className="font-display text-[28px] font-semibold text-slate-900">
          登录 Style Vault
        </h2>
        <p className="mt-2 text-[13px] text-slate-500">
          登录后可收藏风格、添加个人笔记
        </p>
        <button
          disabled={loggingIn}
          onClick={handle}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-medium text-slate-700 transition hover:border-slate-300 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleOutlined className="text-[18px]" />
          <span>{loggingIn ? '登录中…' : '使用 Google 账号登录'}</span>
        </button>
        <p className="mt-5 text-[11px] text-slate-400">
          仅用于登录验证，不会获取邮箱以外的信息
        </p>
      </div>
    </Modal>
  );
}

export default LoginModal;
