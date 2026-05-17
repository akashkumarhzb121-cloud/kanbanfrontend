import { useEffect, useState } from 'react';
import { Btn, Input, Select, Textarea, Modal } from './UI';

const EMPTY = { title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' };

const TaskForm = ({ open, onClose, onSubmit, initial = null }) => {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setForm(initial ? {
      title: initial.title,
      description: initial.description || '',
      status: initial.status,
      priority: initial.priority,
      dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '',
    } : EMPTY);
    setError('');
  }, [open, initial]);

  const setField = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      setForm(EMPTY);
      onClose();
    } catch (e) {
      setError(e.message || 'Unable to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit Task' : 'New Task'}>
      <div style={{ display: 'grid', gap: 18 }}>
        <Input
          label="Title"
          value={form.title}
          onChange={setField('title')}
          placeholder="What needs to be done?"
          error={!form.title.trim() && error ? error : ''}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={setField('description')}
          placeholder="Add more context and details..."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Select label="Status" value={form.status} onChange={setField('status')}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </Select>
          <Select label="Priority" value={form.priority} onChange={setField('priority')}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Select>
        </div>

        <Input label="Due Date" type="date" value={form.dueDate} onChange={setField('dueDate')} />

        {error && <p className="error-text">{error}</p>}

        <div className="button-row">
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn loading={loading} onClick={handleSubmit}>
            {initial ? 'Save Changes' : 'Create Task'}
          </Btn>
        </div>
      </div>
    </Modal>
  );
};

export default TaskForm;
