import { Link, useParams } from 'react-router-dom';
import { AsyncGate } from '../components/AsyncGate';
import { getResourceConfig } from './resourceConfigs';
import { useResourceList } from './useResourceList';
import { useResourceMutations } from './useResourceMutations';

export function ResourceListPage() {
  const { resource } = useParams();
  const config = getResourceConfig(resource);
  const { data, loading, error, refresh } = useResourceList(resource);
  const { remove } = useResourceMutations(resource);

  async function handleDelete(id) {
    if (!window.confirm('Delete this row? This cannot be undone.')) return;
    await remove(id);
    refresh();
  }

  const allowCreate = config.allowCreate !== false;
  const allowDelete = config.allowDelete !== false;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">
          {config.label}
          <span className="text-accent">.</span>
        </h1>
        {allowCreate && (
          <Link
            to={`/admin/${resource}/new`}
            className="rounded-full border-2 border-ink bg-accent px-5 py-2.5 text-sm font-semibold text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.96]"
          >
            + Add new
          </Link>
        )}
      </div>
      <AsyncGate loading={loading} error={error}>
        <div className="flex flex-col gap-3">
          {data?.length === 0 && <p className="text-sm text-muted">Nothing here yet.</p>}
          {data?.map((row) => (
            <div key={row.id} className="raised-card flex items-center justify-between gap-4 px-6 py-4">
              <span className="font-display font-semibold">
                {config.formatTitle ? config.formatTitle(row) : row[config.titleField]}
              </span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <Link to={`/admin/${resource}/${row.id}/edit`} className="text-accent hover:text-accent-hover">
                  edit
                </Link>
                {allowDelete && (
                  <button type="button" onClick={() => handleDelete(row.id)} className="text-muted hover:text-accent">
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </AsyncGate>
    </div>
  );
}
