import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { authApi, getToken, setToken, type User } from '@/services';
import { requestGoogleAccessToken } from '@/services/google-oauth';

export type { User };

type AuthState = {
  user: User | null;
  loading: boolean;
  loggingIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    // authApi.me() 是 globalThis 单例 promise——即使本 effect 被触发多次、
    // Provider 被 HMR 重建多次，都只真正发一次请求。
    authApi
      .me()
      .then((d) => setUser(d.user))
      .catch(() => {
        setToken(null);
        authApi.invalidateMe();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async () => {
    setLoggingIn(true);
    try {
      const access_token = await requestGoogleAccessToken();
      const data = await authApi.google(access_token);
      setToken(data.token);
      setUser(data.user);
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* 忽略登出错误，本地清除即可 */
    }
    setToken(null);
    setUser(null);
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, loggingIn, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be inside AuthProvider');
  return v;
}
