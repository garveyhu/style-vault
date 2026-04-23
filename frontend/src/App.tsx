import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Suspense, lazy } from 'react';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import NotInstalledPage from './pages/NotInstalledPage';
import { AuthProvider } from './auth/AuthContext';
import { FavoritesProvider } from './auth/FavoritesContext';

// 动态收集 preview 页（排除 _layout / _templates）
const previewModules = import.meta.glob('./preview/**/*.tsx');
const previewRoutes = Object.entries(previewModules)
  .filter(([k]) => !k.includes('/_layout') && !k.includes('/_templates/'))
  .map(([k, loader]) => {
    // './preview/atoms/buttons/ghost-button.tsx' → 'atoms/buttons/ghost-button'
    const relId = k.replace(/^\.\/preview\//, '').replace(/\.tsx$/, '');
    const Lazy = lazy(loader as any);
    return { relId, Element: Lazy };
  });

export default function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <FavoritesProvider>
        <Suspense fallback={<div className="p-8">Loading…</div>}>
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/item/*" element={<DetailPage />} />
            <Route path="/not-installed" element={<NotInstalledPage />} />
            {previewRoutes.map(({ relId, Element }) => (
              <Route
                key={relId}
                path={`/preview/${relId}`}
                element={<Element />}
              />
            ))}
          </Routes>
        </Suspense>
        </FavoritesProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
