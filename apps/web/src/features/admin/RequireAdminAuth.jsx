import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from './api/AdminAuthContext';

export function RequireAdminAuth() {
  const { loading, isAuthenticated } = useAdminAuth();

  if (loading) {
    return <p className="px-6 py-12 text-center font-mono text-sm text-faint">Loading…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
