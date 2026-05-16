import { useState } from 'react';
import { Badge, Btn } from './UI';

const PRIORITY_DOT = { Low: '#6b6b8a', Medium: '#fbbf24', High: '#f87171' };

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(task._id); } finally { setDeleting(false); }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div
      className="fade-up"
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'border-color .18s, transform .18s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: PRIORITY_DOT[task.priority], flexShrink: 0, marginTop: 2 }} />
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 14, lineHeight: 1.4, color: task.status === 'Completed' ? 'var(--muted)' : 'var(--text)', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button onClick={() => onEdit(task)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, padding: 4, cursor: 'pointer', borderRadius: 6, transition: 'color .15s' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
          >✎</button>
          <button onClick={handleDelete} disabled={deleting} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, padding: 4, cursor: 'pointer', borderRadius: 6, transition: 'color .15s' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--danger)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
          >✕</button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
          {task.description.length > 100 ? task.description.slice(0, 100) + '…' : task.description}
        </p>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 2 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Badge label={task.status} />
          <Badge label={task.priority} />
        </div>
        {task.dueDate && (
          <span style={{ fontSize: 11, color: isOverdue ? 'var(--danger)' : 'var(--muted)', fontFamily: 'var(--font-head)', fontWeight: 500 }}>
            {isOverdue ? '⚠ ' : ''}Due {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {/* Quick status change */}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 8px', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', width: '100%' }}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default TaskCard;
