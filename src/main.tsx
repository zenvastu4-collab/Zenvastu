import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { AdminApp } from './admin/AdminApp.tsx';
import { CmsProvider } from './context/CmsProvider.tsx';
import { SiteIdentity } from './components/SiteIdentity.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CmsProvider>
        <SiteIdentity />
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </CmsProvider>
    </BrowserRouter>
  </StrictMode>
);
