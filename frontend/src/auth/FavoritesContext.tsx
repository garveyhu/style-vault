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

  // 登录态变化 → 拉取列表；登出清空
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSet(new Set());
      return;
    }
    let cancelled = false;
    favoritesApi
      .list()
      .then((items) => {
        if (!cancelled) setSet(new Set(items));
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
        // 以服务端为准（极端情况下 drift）
        setSet((prev) => {
          const next = new Set(prev);
          if (r.favorited) next.add(id);
          else next.delete(id);
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
