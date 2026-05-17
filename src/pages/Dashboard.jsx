import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useToast, Spinner } from '../components/UI';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Btn, Input, Select } from '../components/UI';

const STATUS_META = [
  { label: 'Pending', status: 'Pending', accent: 'var(--warning)' },
  { label: 'In Progress', status: 'In Progress', accent: 'var(--accent)' },
  { label: 'Completed', status: 'Completed', accent: 'var(--success)' },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({ priority: '', search: '' });
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { tasks, loading, error, add, update, remove } = useTasks(filters);
  const { show, Toast } = useToast();

  const filteredTasks = useMemo(() => tasks, [tasks]);
  const colTasks = (status) => filteredTasks.filter((task) => task.status === status);
  const stats = useMemo(() => ({
    total: tasks.length,
    pending: colTasks('Pending').length,
    inProgress: colTasks('In Progress').length,
    completed: colTasks('Completed').length,
    highPriority: tasks.filter((task) => task.priority === 'High').length,
  }), [tasks]);

  const setFilter = (key) => (event) => setFilters((prev) => ({ ...prev, [key]: event.target.value }));

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

  return (
    <main className="page-shell main-shell">
      <section className="page-title">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h1>My Board</h1>
            <p>Overview of your tasks and project momentum.</p>
          </div>
          <div className="action-group">
            <Btn onClick={() => setFormOpen(true)}>+ New Task</Btn>
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel-card">
          <h3>Total tasks</h3>
          <div className="panel-value">{stats.total}</div>
        </div>
        <div className="panel-card">
          <h3>Active work</h3>
          <div className="panel-value">{stats.pending + stats.inProgress}</div>
        </div>
        <div className="panel-card">
          <h3>High priority</h3>
          <div className="panel-value">{stats.highPriority}</div>
        </div>
      </section>

      <section className="filter-panel">
        <div className="filter-row">
          <div className="field-group">
            <label htmlFor="task-search">Search</label>
            <Input
              id="task-search"
              placeholder="Search tasks…"
              value={filters.search}
              onChange={setFilter('search')}
            />
          </div>

          <div className="field-group">
            <label htmlFor="priority-filter">Priority</label>
            <Select id="priority-filter" value={filters.priority} onChange={setFilter('priority')}>
              <option value="">All priorities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Select>
          </div>

          <div className="button-row">
            {(filters.search || filters.priority) && (
              <Btn variant="ghost" size="sm" onClick={() => setFilters({ priority: '', search: '' })}>Clear</Btn>
            )}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ) : error ? (
        <div className="no-results-state">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="no-results-state">
          <strong>No tasks yet</strong>
          Start by creating your first task and organizing it across the board.
        </div>
      ) : (
        <section className="board-grid">
          {STATUS_META.map((column) => {
            const items = colTasks(column.status);
            return (
              <div key={column.status} className="board-column">
                <div className="column-header">
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: column.accent }} />
                  <strong>{column.label}</strong>
                  <span className="count-pill">{items.length}</span>
                </div>
                <div className="column-content">
                  {items.length === 0 ? (
                    <div className="empty-column">No tasks here yet</div>
                  ) : (
                    items.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={(taskData) => setEditTask(taskData)}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleAdd} />
      {editTask && (
        <TaskForm open={!!editTask} onClose={() => setEditTask(null)} onSubmit={handleUpdate} initial={editTask} />
      )}

      <Toast />
    </main>
  );
};

export default Dashboard;
