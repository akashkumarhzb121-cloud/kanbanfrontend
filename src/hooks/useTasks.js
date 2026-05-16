import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/client';

export const useTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks(filters);
      setTasks(data.tasks);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetch(); }, [fetch]);

  const add = async (body) => {
    const data = await createTask(body);
    setTasks((prev) => [data.task, ...prev]);
    return data.task;
  };

  const update = async (id, body) => {
    const data = await updateTask(id, body);
    setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    return data.task;
  };

  const remove = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return { tasks, loading, error, refetch: fetch, add, update, remove };
};
