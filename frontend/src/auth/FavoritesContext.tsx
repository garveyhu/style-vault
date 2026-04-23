import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { favoritesApi } from '@/services';
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

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;
    // favoritesApi.list 是 uid-bound singleton——同一 uid 的多次 list 调用
    // 复用同一 promise，只发一次真实请求。
    favoritesApi
      .list(user?.id ?? null)
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
      setSet((prev) => {
        const next = new Set(prev);
        if (wasFav) next.delete(id);
        else next.add(id);
        return next;
      });
      try {
        const r = await favoritesApi.toggle(id);
        setSet((prev) => {
          const next = new Set(prev);
          if (r.favorited) next.add(id);
          else next.delete(id);
          return next;
        });
        return r.favorited;
      } catch (e) {
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
