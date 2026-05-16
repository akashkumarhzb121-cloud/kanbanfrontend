const BASE_URL = 'https://kanbanbackend-eight.vercel.app';

const getToken = () => localStorage.getItem('token');

const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// Auth
export const signup = (body) =>
  request('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) });

export const login = (body) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const getMe = () => request('/api/auth/me');

// Tasks
export const getTasks = (params = {}) => {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v))
  ).toString();
  return request(`/api/tasks${qs ? `?${qs}` : ''}`);
};

export const createTask = (body) =>
  request('/api/tasks', { method: 'POST', body: JSON.stringify(body) });

export const updateTask = (id, body) =>
  request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(body) });

export const deleteTask = (id) =>
  request(`/api/tasks/${id}`, { method: 'DELETE' });
