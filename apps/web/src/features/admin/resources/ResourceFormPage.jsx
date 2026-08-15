import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../api/adminApiClient';
import { getResourceConfig } from './resourceConfigs';
import { useResourceMutations } from './useResourceMutations';
import { FieldInput } from './FieldInput';

function toFormValues(row, fields) {
  const values = {};
  for (const field of fields) {
    const raw = row?.[field.name];
    if (field.type === 'tags') {
      values[field.name] = Array.isArray(raw) ? raw.join(', ') : '';
    } else if (field.type === 'checkbox') {
      values[field.name] = Boolean(raw);
    } else {
      values[field.name] = raw ?? '';
    }
  }
  return values;
}

function toPayload(values, fields) {
  const payload = {};
  for (const field of fields) {
    const raw = values[field.name];
    if (field.type === 'tags') {
      payload[field.name] = raw
        ? raw
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    } else if (field.type === 'number') {
      payload[field.name] = raw === '' ? undefined : Number(raw);
    } else if (field.type === 'checkbox') {
      payload[field.name] = Boolean(raw);
    } else {
      payload[field.name] = raw === '' ? undefined : raw;
    }
  }
  return payload;
}

export function ResourceFormPage({ mode }) {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const config = getResourceConfig(resource);
  const { create, update, submitting, error } = useResourceMutations(resource);
  const [values, setValues] = useState(() => toFormValues(null, config.fields));
  const [loadingRow, setLoadingRow] = useState(mode === 'edit');

  useEffect(() => {
    if (mode !== 'edit') return;
    adminApi.get(`/${resource}/${id}`).then((row) => {
      setValues(toFormValues(row, config.fields));
      setLoadingRow(false);
    });
  }, [mode, resource, id, config.fields]);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = toPayload(values, config.fields);
    if (mode === 'create') {
      await create(payload);
    } else {
      await update(id, payload);
    }
    navigate(`/admin/${resource}`);
  }

  if (loadingRow) {
    return <p className="px-6 py-12 text-center font-mono text-sm text-faint">Loading…</p>;
  }

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-semibold">
        {mode === 'create' ? `New ${config.label}` : `Edit ${config.label}`}
        <span className="text-accent">.</span>
      </h1>
      <form onSubmit={handleSubmit} className="raised-card flex max-w-xl flex-col gap-5 p-8">
        {config.fields.map((field) => (
          <FieldInput key={field.name} field={field} value={values[field.name]} onChange={handleChange} />
        ))}
        {error && <p className="text-sm text-accent">{error.message}</p>}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full border-2 border-ink bg-accent px-6 py-3 text-sm font-semibold text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.96] disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
