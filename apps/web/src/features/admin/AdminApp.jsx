import { Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './api/AdminAuthContext';
import { AdminLoginPage } from './AdminLoginPage';
import { RequireAdminAuth } from './RequireAdminAuth';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardPage } from './AdminDashboardPage';
import { ResourceListPage } from './resources/ResourceListPage';
import { ResourceFormPage } from './resources/ResourceFormPage';

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<RequireAdminAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path=":resource" element={<ResourceListPage />} />
            <Route path=":resource/new" element={<ResourceFormPage mode="create" />} />
            <Route path=":resource/:id/edit" element={<ResourceFormPage mode="edit" />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
