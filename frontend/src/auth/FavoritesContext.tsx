import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { favoritesApi } from '../utils/api';
import { useAuth } from './AuthContext';

type FavoritesState = {
  set: ReadonlySet<string>;
  isFavorited: (entryId: string) => boolean;
  /** 乐观更新 toggle；返回最终是否收藏。失败会回滚并 throw。 */
  toggleFavorite: (entryId: string) => Promise<boolean>;
};

const Ctx = createContext<FavoritesState | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [set, setSet] = useState<Set<string>>(() => new Set());

  // 登录态变化 → 拉取列表；登出清空。
  // 用 window 级缓存做跨 HMR / 组件重建的守卫
  useEffect(() => {
    if (authLoading) return;
    type W = Window & {
      __sv_fav_loaded_uid?: number | null;
      __sv_fav_set?: string[];
    };
    const w = window as W;

    if (!user) {
      w.__sv_fav_loaded_uid = null;
      setSet(new Set());
      return;
    }

    // 已经为同一用户加载过：直接复用缓存
    if (w.__sv_fav_loaded_uid === user.id && w.__sv_fav_set) {
      setSet(new Set(w.__sv_fav_set));
      return;
    }

    w.__sv_fav_loaded_uid = user.id;
    let cancelled = false;
    favoritesApi
      .list()
      .then((items) => {
        if (cancelled) return;
        w.__sv_fav_set = items;
        setSet(new Set(items));
      })
      .catch(() => {
        if (!cancelled) setSet(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const isFavorited = useCallback((id: string) => set.has(id), [set]);

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!user) throw new Error('未登录');
      const wasFav = set.has(id);
      // 乐观更新
      setSet((prev) => {
        const next = new Set(prev);
        if (wasFav) next.delete(id);
        else next.add(id);
        return next;
      });
      try {
        const r = await favoritesApi.toggle(id);
        // 以服务端为准（极端情况下 drift）；同时同步 window 缓存
        setSet((prev) => {
          const next = new Set(prev);
          if (r.favorited) next.add(id);
          else next.delete(id);
          (window as Window & { __sv_fav_set?: string[] }).__sv_fav_set =
            Array.from(next);
          return next;
        });
        return r.favorited;
      } catch (e) {
        // 回滚
        setSet((prev) => {
          const next = new Set(prev);
          if (wasFav) next.add(id);
          else next.delete(id);
          return next;
        });
        throw e;
      }
    },
    [user, set],
  );

  const value = useMemo<FavoritesState>(
    () => ({ set, isFavorited, toggleFavorite }),
    [set, isFavorited, toggleFavorite],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useFavorites must be inside FavoritesProvider');
  return v;
}
