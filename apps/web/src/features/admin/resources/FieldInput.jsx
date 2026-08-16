const baseInputClass =
  'w-full rounded-lg border-2 border-ink bg-paper px-3.5 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function FieldInput({ field, value, onChange }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">
        {field.label}
        {field.required ? ' *' : ''}
      </span>
      {field.type === 'readonly' ? (
        <span className={`${baseInputClass} cursor-not-allowed bg-[var(--color-border)] text-faint`}>
          {field.formatValue ? field.formatValue(value) : value}
        </span>
      ) : field.type === 'textarea' ? (
        <textarea
          className={baseInputClass}
          rows={4}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        />
      ) : field.type === 'checkbox' ? (
        <input
          type="checkbox"
          className="h-5 w-5 self-start accent-[var(--color-accent)]"
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
      ) : field.type === 'select' ? (
        <select
          className={baseInputClass}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        >
          <option value="">—</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
          className={baseInputClass}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        />
      )}
    </label>
  );
}
