export const API_URL_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ? String(body.message) : `Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const adminApi = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (path) => request(path, { method: 'DELETE' }),
};
