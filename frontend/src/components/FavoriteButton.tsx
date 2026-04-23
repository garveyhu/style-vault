import { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { message } from 'antd';
import { useAuth } from '../auth/AuthContext';
import { useFavorites } from '../auth/FavoritesContext';
import { LoginModal } from './LoginModal';

type Size = 'sm' | 'md' | 'lg';

export function FavoriteButton({
  entryId,
  size = 'md',
  variant = 'pill',
}: {
  entryId: string;
  size?: Size;
  variant?: 'pill' | 'icon';
}) {
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [loginOpen, setLoginOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [messageApi, ctx] = message.useMessage();

  const active = isFavorited(entryId);

  const dims: Record<Size, string> = {
    sm: variant === 'icon' ? 'h-7 w-7 text-[13px]' : 'h-8 px-3 text-[12px] gap-1.5',
    md: variant === 'icon' ? 'h-9 w-9 text-[15px]' : 'h-10 px-4 text-[13px] gap-2',
    lg: variant === 'icon' ? 'h-11 w-11 text-[17px]' : 'h-12 px-5 text-[14px] gap-2',
  };

  const handle = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setBump(true);
    setTimeout(() => setBump(false), 260);
    try {
      const nowFav = await toggleFavorite(entryId);
      messageApi.success({ content: nowFav ? '已收藏' : '已取消收藏', duration: 1.5 });
    } catch (err) {
      const e = err as Error;
      messageApi.error({ content: e.message || '操作失败', duration: 2 });
    }
  };

  return (
    <>
      {ctx}
      <button
        type="button"
        onClick={handle}
        title={active ? '取消收藏' : '收藏'}
        aria-label={active ? '取消收藏' : '收藏'}
        className={`inline-flex items-center justify-center rounded-full border transition-all duration-200
          ${dims[size]}
          ${
            active
              ? 'border-emerald-300 bg-emerald-50 text-emerald-600 shadow-[0_2px_12px_-4px_rgba(16,185,129,0.35)]'
              : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-500'
          }
          ${bump ? 'scale-110' : 'scale-100'}
        `}
      >
        {active ? <HeartFilled /> : <HeartOutlined />}
        {variant === 'pill' && (
          <span className="font-medium">{active ? '已收藏' : '收藏'}</span>
        )}
      </button>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default FavoriteButton;
