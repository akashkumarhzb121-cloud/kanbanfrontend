import { useState } from 'react';

export const Btn = ({ children, variant = 'primary', size = 'md', loading, className = '', ...props }) => {
  const classes = ['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : '', className].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={loading} {...props}>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
};

export const Input = ({ label, error, ...props }) => (
  <div className="input-field">
    {label && <label>{label}</label>}
    <input aria-invalid={!!error} {...props} />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export const Select = ({ label, error, children, ...props }) => (
  <div className="select-field">
    {label && <label>{label}</label>}
    <select aria-invalid={!!error} {...props}>
      {children}
    </select>
    {error && <span className="error-text">{error}</span>}
  </div>
);

export const Textarea = ({ label, error, ...props }) => (
  <div className="textarea-field">
    {label && <label>{label}</label>}
    <textarea aria-invalid={!!error} rows={4} {...props} />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="text-muted" style={{ marginBottom: 6, letterSpacing: '.14em', textTransform: 'uppercase', fontSize: 12 }}>
              {title}
            </p>
            <h2 className="modal-title">{title}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const STYLE = {
  Pending: 'pending',
  'In Progress': 'in-progress',
  Completed: 'completed',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

export const Badge = ({ label, className = '' }) => {
  const baseClass = STYLE[label] ? `badge-pill ${STYLE[label]}` : 'badge-pill';
  return <span className={`${baseClass} ${className}`.trim()}>{label}</span>;
};

export const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
    <div className="btn-spinner" style={{ width: 40, height: 40, borderWidth: 4 }} />
  </div>
);

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const show = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const Toast = () =>
    toast ? (
      <div className="fade-up toast-pill" role="status" aria-live="polite">
        {toast.msg}
      </div>
    ) : null;

  return { show, Toast };
};
