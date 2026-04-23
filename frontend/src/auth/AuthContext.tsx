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
  loading: boolean; // 初始 /me 恢复时
  loggingIn: boolean; // 点击登录按钮时
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  // 初始若本地有 token，尝试恢复会话。
  // 用 window 级 flag 做跨 HMR / StrictMode 的一次性守卫——Vite 模块重新
  // eval 时，useRef 会重置但 window 不会（只有浏览器真刷新才清）。
  useEffect(() => {
    type W = Window & { __sv_auth_booted?: boolean; __sv_auth_user?: User | null };
    const w = window as W;
    if (w.__sv_auth_booted) {
      if (w.__sv_auth_user) setUser(w.__sv_auth_user);
      setLoading(false);
      return;
    }
    w.__sv_auth_booted = true;

    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((d) => {
        w.__sv_auth_user = d.user;
        setUser(d.user);
      })
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async () => {
    setLoggingIn(true);
    try {
      const access_token = await requestGoogleAccessToken();
      const data = await authApi.google(access_token);
      setToken(data.token);
      setUser(data.user);
      (window as Window & { __sv_auth_user?: User }).__sv_auth_user = data.user;
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // 忽略登出 API 错误，本地清除即可
    }
    setToken(null);
    setUser(null);
    const w = window as Window & {
      __sv_auth_user?: User | null;
      __sv_fav_loaded_uid?: number | null;
    };
    w.__sv_auth_user = null;
    w.__sv_fav_loaded_uid = null;
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
