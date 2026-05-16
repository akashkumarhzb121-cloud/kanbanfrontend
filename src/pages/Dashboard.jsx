import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../components/UI';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Btn, Input, Select, Spinner } from '../components/UI';

const COLS = [
  { label: 'Pending',     status: 'Pending',     accent: 'var(--warning)' },
  { label: 'In Progress', status: 'In Progress',  accent: 'var(--accent)' },
  { label: 'Completed',   status: 'Completed',    accent: 'var(--success)' },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({ priority: '', search: '' });
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { tasks, loading, error, add, update, remove } = useTasks(filters);
  const { show, Toast } = useToast();

  const setFilter = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));

  const handleAdd = async (body) => {
    await add(body);
    show('Task created!');
  };

  const handleUpdate = async (body) => {
    await update(editTask._id, body);
    show('Task updated!');
  };

  const handleDelete = async (id) => {
    await remove(id);
    show('Task deleted!', 'error');
  };

  const handleStatusChange = async (id, status) => {
    await update(id, { status });
    show(`Moved to ${status}`);
  };

  const colTasks = (status) => tasks.filter((t) => t.status === status);

  return (
    <div style={{ padding: '28px 28px 60px', maxWidth: 1300, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em' }}>My Board</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
        </div>
        <Btn onClick={() => setFormOpen(true)}>+ New Task</Btn>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <Input
          placeholder="Search tasks…"
          value={filters.search}
          onChange={setFilter('search')}
          style={{ minWidth: 220 }}
        />
        <Select value={filters.priority} onChange={setFilter('priority')} style={{ minWidth: 140 }}>
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Select>
        {(filters.search || filters.priority) && (
          <Btn variant="ghost" size="sm" onClick={() => setFilters({ priority: '', search: '' })}>Clear</Btn>
        )}
      </div>

      {loading ? <Spinner /> : error ? (
        <div style={{ color: 'var(--danger)', padding: 20 }}>{error}</div>
      ) : (
        /* Kanban board */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {COLS.map((col) => (
            <div key={col.status} style={{ background: 'var(--surface2)', borderRadius: 14, padding: '18px 16px', border: '1px solid var(--border)', minHeight: 200 }}>
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.accent }} />
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: col.accent, letterSpacing: '.04em', textTransform: 'uppercase' }}>{col.label}</span>
                <span style={{ marginLeft: 'auto', background: 'var(--border)', color: 'var(--muted)', borderRadius: 99, padding: '1px 9px', fontSize: 11, fontFamily: 'var(--font-head)', fontWeight: 700 }}>
                  {colTasks(col.status).length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {colTasks(col.status).length === 0 ? (
                  <div style={{ color: 'var(--muted)', fontSize: 12, textAlign: 'center', padding: '30px 0' }}>No tasks here</div>
                ) : (
                  colTasks(col.status).map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={(t) => setEditTask(t)}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleAdd} />
      {editTask && (
        <TaskForm open={!!editTask} onClose={() => setEditTask(null)} onSubmit={handleUpdate} initial={editTask} />
      )}

      <Toast />
    </div>
  );
};

export default Dashboard;
