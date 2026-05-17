import { useState } from 'react';
import { Badge } from './UI';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [deleting, setDeleting] = useState(false);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';
  const statusClass = task.status.toLowerCase().replace(/\s+/g, '-');
  const priorityClass = task.priority.toLowerCase();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  return (
    <article className="task-card fade-up">
      <div className="task-card-header">
        <span className={`priority-dot ${priorityClass}`} />
        <div style={{ flex: 1 }}>
          <h3 className={`task-card-title ${task.status === 'Completed' ? 'completed' : ''}`}>
            {task.title}
          </h3>
        </div>
        <div className="task-actions">
          <button type="button" className="task-action-button" onClick={() => onEdit(task)} aria-label="Edit task">
            ✎
          </button>
          <button
            type="button"
            className="task-action-button danger"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete task"
          >
            ×
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-card-description">
          {task.description.length > 120 ? `${task.description.slice(0, 120)}…` : task.description}
        </p>
      )}

      <div className="task-card-meta">
        <div className="task-badges">
          <Badge label={task.status} className={statusClass} />
          <Badge label={task.priority} className={priorityClass} />
        </div>
        {task.dueDate && (
          <span style={{ color: isOverdue ? 'var(--danger)' : 'var(--muted)', fontSize: 12, fontWeight: 600 }}>
            {isOverdue ? '⚠ ' : ''}Due {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <select
        className="status-select"
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </article>
  );
};

export default TaskCard;
