import { useState } from 'react';
import { Btn, Input, Select, Textarea, Modal } from './UI';

const EMPTY = { title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' };

const TaskForm = ({ open, onClose, onSubmit, initial = null }) => {
  const [form, setForm] = useState(initial ? {
    title: initial.title,
    description: initial.description || '',
    status: initial.status,
    priority: initial.priority,
    dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '',
  } : EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      setForm(EMPTY);
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit Task' : 'New Task'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Title" value={form.title} onChange={set('title')} placeholder="What needs to be done?" error={!form.title && error ? error : ''} />
        <Textarea label="Description" value={form.description} onChange={set('description')} placeholder="Add details..." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Select label="Status" value={form.status} onChange={set('status')}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </Select>
          <Select label="Priority" value={form.priority} onChange={set('priority')}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Select>
        </div>
        <Input label="Due Date" type="date" value={form.dueDate} onChange={set('dueDate')} />
        {error && !error.includes('Title') && <p style={{ fontSize: 12, color: 'var(--danger)' }}>{error}</p>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn loading={loading} onClick={handleSubmit}>{initial ? 'Save Changes' : 'Create Task'}</Btn>
        </div>
      </div>
    </Modal>
  );
};

export default TaskForm;
