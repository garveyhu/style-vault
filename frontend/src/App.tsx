import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import NotInstalledPage from './pages/NotInstalledPage';

export default function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/item/*" element={<DetailPage />} />
        <Route path="/not-installed" element={<NotInstalledPage />} />
      </Routes>
    </ConfigProvider>
  );
}
