import { AsyncGate } from '../components/AsyncGate';
import { useAdminToolboxGroups } from './useToolboxGroups';
import { TagChipInput } from './TagChipInput';

const CATEGORY_ORDER = ['languages', 'frameworks', 'tools'];
const CATEGORY_LABELS = { languages: 'Languages', frameworks: 'Frameworks', tools: 'Tools' };

export function ToolboxEditorPage() {
  const { groups, loading, error, savingId, saveError, saveItems } = useAdminToolboxGroups();

  const orderedGroups = groups
    ? [...groups].sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category))
    : null;

  return (
    <div>
      <h1 className="font-display mb-2 text-3xl font-semibold">
        Toolbox<span className="text-accent">.</span>
      </h1>
      <p className="mb-8 text-sm text-muted">
        These 3 categories are fixed — add or remove the skills listed under each one.
      </p>
      {saveError && (
        <p className="mb-6 rounded-lg border-2 border-ink bg-pink px-4 py-3 text-sm text-pink-ink">
          Couldn't save that change — {saveError.message}. Please try again.
        </p>
      )}
      <AsyncGate loading={loading} error={error}>
        <div className="flex flex-col gap-6">
          {orderedGroups?.map((group) => (
            <div key={group.id} className="raised-card flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">
                  {CATEGORY_LABELS[group.category] ?? group.category}
                </h2>
                {savingId === group.id && <span className="font-mono text-[11px] text-faint">Saving…</span>}
              </div>
              <TagChipInput
                items={group.items}
                disabled={savingId === group.id}
                onAdd={(item) => saveItems(group.id, [...group.items, item])}
                onRemove={(item) =>
                  saveItems(
                    group.id,
                    group.items.filter((existing) => existing !== item),
                  )
                }
              />
            </div>
          ))}
        </div>
      </AsyncGate>
    </div>
  );
}
