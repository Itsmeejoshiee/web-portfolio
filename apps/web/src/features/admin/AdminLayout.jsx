import { NavLink, Outlet } from 'react-router-dom';
import { useAdminAuth } from './api/AdminAuthContext';
import { API_URL_BASE } from './api/adminApiClient';
import { RESOURCE_CONFIGS } from './resources/resourceConfigs';

export function AdminLayout() {
  const { user } = useAdminAuth();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
        <NavLink to="/admin" className="font-display text-xl font-semibold">
          Admin<span className="text-accent">.</span>
        </NavLink>
        <div className="flex items-center gap-4">
          {user?.username && <span className="font-mono text-[11px] text-faint">{user.username}</span>}
          <a
            href={`${API_URL_BASE}/auth/logout`}
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            Log out
          </a>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1440px] gap-10 px-6 py-10">
        <nav className="flex w-48 flex-none flex-col gap-2">
          <NavLink
            to="/admin/toolbox"
            className={({ isActive }) =>
              `rounded-full border-2 border-ink px-4 py-2 text-sm font-medium transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] ${
                isActive ? 'bg-accent text-paper' : 'bg-paper text-ink'
              }`
            }
          >
            Toolbox
          </NavLink>
          {RESOURCE_CONFIGS.map((resource) => (
            <NavLink
              key={resource.key}
              to={`/admin/${resource.key}`}
              className={({ isActive }) =>
                `rounded-full border-2 border-ink px-4 py-2 text-sm font-medium transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] ${
                  isActive ? 'bg-accent text-paper' : 'bg-paper text-ink'
                }`
              }
            >
              {resource.label}
            </NavLink>
          ))}
        </nav>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
