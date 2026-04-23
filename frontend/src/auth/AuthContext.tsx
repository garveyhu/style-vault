import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { apiFetch, getToken, setToken } from '../utils/api';
import { requestGoogleAccessToken } from '../utils/googleAuth';

export type User = {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
};

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

  // 初始若本地有 token，尝试恢复会话
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    apiFetch<{ user: User }>('/api/auth/me')
      .then((d) => setUser(d.user))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async () => {
    setLoggingIn(true);
    try {
      const access_token = await requestGoogleAccessToken();
      const data = await apiFetch<{ token: string; user: User }>(
        '/api/auth/google',
        {
          method: 'POST',
          body: JSON.stringify({ access_token }),
        },
      );
      setToken(data.token);
      setUser(data.user);
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // 忽略登出 API 错误，本地清除即可
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
