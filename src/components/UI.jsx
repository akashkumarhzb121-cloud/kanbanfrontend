import { useState } from 'react';

/* ── Button ── */
export const Btn = ({ children, variant = 'primary', size = 'md', loading, style, ...p }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    border: 'none', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-head)', fontWeight: 600, letterSpacing: '.02em',
    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .6 : 1,
    transition: 'all .18s',
  };
  const sizes = { sm: { padding: '6px 14px', fontSize: 12 }, md: { padding: '10px 20px', fontSize: 14 }, lg: { padding: '13px 28px', fontSize: 16 } };
  const variants = {
    primary:  { background: 'var(--accent)', color: '#fff' },
    danger:   { background: 'var(--danger)', color: '#fff' },
    ghost:    { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' },
    outline:  { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], ...style }} disabled={loading} {...p}>
      {loading && <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />}
      {children}
    </button>
  );
};

/* ── Input ── */
export const Input = ({ label, error, style, ...p }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {label && <label style={{ fontSize: 11, fontFamily: 'var(--font-head)', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</label>}
    <input
      style={{
        background: 'var(--surface2)', border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)', padding: '10px 14px', color: 'var(--text)',
        fontSize: 13, outline: 'none', transition: 'border-color .18s', ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
      onBlur={(e) => { e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)'; }}
      {...p}
    />
    {error && <span style={{ fontSize: 11, color: 'var(--danger)' }}>{error}</span>}
  </div>
);

/* ── Select ── */
export const Select = ({ label, error, children, style, ...p }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {label && <label style={{ fontSize: 11, fontFamily: 'var(--font-head)', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</label>}
    <select
      style={{
        background: 'var(--surface2)', border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)', padding: '10px 14px', color: 'var(--text)',
        fontSize: 13, outline: 'none', cursor: 'pointer', ...style,
      }}
      {...p}
    >{children}</select>
    {error && <span style={{ fontSize: 11, color: 'var(--danger)' }}>{error}</span>}
  </div>
);

/* ── Textarea ── */
export const Textarea = ({ label, error, style, ...p }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {label && <label style={{ fontSize: 11, fontFamily: 'var(--font-head)', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</label>}
    <textarea
      rows={3}
      style={{
        background: 'var(--surface2)', border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)', padding: '10px 14px', color: 'var(--text)',
        fontSize: 13, outline: 'none', resize: 'vertical', transition: 'border-color .18s', ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
      onBlur={(e) => { e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)'; }}
      {...p}
    />
    {error && <span style={{ fontSize: 11, color: 'var(--danger)' }}>{error}</span>}
  </div>
);

/* ── Modal ── */
export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-up"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, width: '100%', maxWidth: 500, padding: 28, boxShadow: 'var(--shadow)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ── Badge ── */
const BADGE_COLORS = {
  Pending:     { bg: 'rgba(251,191,36,.12)',  color: 'var(--warning)' },
  'In Progress':{ bg: 'rgba(124,106,247,.15)', color: 'var(--accent)' },
  Completed:   { bg: 'rgba(74,222,128,.12)',   color: 'var(--success)' },
  Low:    { bg: 'rgba(107,107,138,.15)', color: 'var(--muted)' },
  Medium: { bg: 'rgba(251,191,36,.12)',  color: 'var(--warning)' },
  High:   { bg: 'rgba(248,113,113,.15)', color: 'var(--danger)' },
};

export const Badge = ({ label }) => {
  const c = BADGE_COLORS[label] || { bg: 'var(--border)', color: 'var(--muted)' };
  return (
    <span style={{ ...c, padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-head)', letterSpacing: '.04em' }}>
      {label}
    </span>
  );
};

/* ── Spinner ── */
export const Spinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
  </div>
);

/* ── Toast ── */
export const useToast = () => {
  const [toast, setToast] = useState(null);
  const show = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  const Toast = () => toast ? (
    <div className="fade-up" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: toast.type === 'success' ? 'var(--success)' : 'var(--danger)',
      color: '#000', padding: '12px 20px', borderRadius: 'var(--radius)',
      fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13,
      boxShadow: 'var(--shadow)',
    }}>{toast.msg}</div>
  ) : null;
  return { show, Toast };
};
