import { useState } from 'react';

export function TagChipInput({ items, onAdd, onRemove, disabled }) {
  const [draft, setDraft] = useState('');

  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const value = draft.trim();
    if (!value || items.includes(value)) return;
    onAdd(value);
    setDraft('');
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 font-mono text-[11.5px] tracking-[0.06em] shadow-[2px_2px_0_var(--color-ink)]"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              disabled={disabled}
              aria-label={`Remove ${item}`}
              className="text-faint hover:text-accent disabled:opacity-50"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a skill and press Enter…"
        className="w-full max-w-sm rounded-lg border-2 border-ink bg-paper px-3.5 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
      />
    </div>
  );
}
