import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Suspense, lazy } from 'react';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import NotInstalledPage from './pages/NotInstalledPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { AuthProvider } from './auth/AuthContext';
import { FavoritesProvider } from './auth/FavoritesContext';
import { ScrollToTop } from './components/ScrollToTop';
import { GlobalLoading } from './components/GlobalLoading';

// 动态收集 preview 页（排除 _layout / _templates）
const previewModules = import.meta.glob('./preview/**/*.tsx');
const previewRoutes = Object.entries(previewModules)
  .filter(([k]) => !k.includes('/_layout') && !k.includes('/_templates/'))
  .map(([k, loader]) => {
    // './preview/components/buttons/ghost-button.tsx' → 'components/buttons/ghost-button'
    const relId = k.replace(/^\.\/preview\//, '').replace(/\.tsx$/, '');
    const Lazy = lazy(loader as any);
    return { relId, Element: Lazy };
  });

export default function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <FavoritesProvider>
        <ScrollToTop />
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/item/*" element={<DetailPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
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
