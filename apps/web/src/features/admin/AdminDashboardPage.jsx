import { Link } from 'react-router-dom';
import { RESOURCE_CONFIGS } from './resources/resourceConfigs';

export function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-semibold">
        Content<span className="text-accent">.</span>
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        {RESOURCE_CONFIGS.map((resource) => (
          <Link key={resource.key} to={`/admin/${resource.key}`} className="raised-card block p-6">
            <h2 className="font-display text-lg font-semibold">{resource.label}</h2>
            <p className="mt-1 text-sm text-muted">Manage {resource.label.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
