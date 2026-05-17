import { useState } from 'react';
import { login, signup } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Input, Btn } from '../components/UI';

const AuthPage = () => {
  const { saveAuth } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const updateField = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const validate = () => {
    const nextErrors = {};
    if (mode === 'signup' && !form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.password || form.password.length < 8) nextErrors.password = 'Minimum 8 characters';
    setErrors(nextErrors);
    return !Object.keys(nextErrors).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      const fn = mode === 'login' ? login : signup;
      const data = await fn(form);
      saveAuth(data.token, data.user);
    } catch (error) {
      setServerError(error.message || 'Unable to complete request');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setServerError('');
  };

  return (
    <div className="page-shell" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '32px 0' }}>
      <div className="auth-card fade-up">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="brand-mark" style={{ width: 56, height: 56, margin: '0 auto 14px' }}>▦</div>
          <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Kanban</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>
            {mode === 'login' ? 'Welcome back. Sign in to continue.' : 'Create your workspace and manage tasks.'}
          </p>
        </div>

        <div className="auth-tabs">
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`auth-tab ${mode === tab ? 'active' : ''}`}
              onClick={() => switchMode(tab)}
            >
              {tab === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
          {mode === 'signup' && (
            <Input
              label="Full Name"
              value={form.name}
              onChange={updateField('name')}
              placeholder="John Doe"
              error={errors.name}
            />
          )}
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={updateField('email')}
            placeholder="you@example.com"
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={updateField('password')}
            placeholder="••••••••"
            error={errors.password}
          />

          {serverError && (
            <div style={{ background: 'rgba(251,113,113,.12)', border: '1px solid var(--danger)', borderRadius: 18, padding: 14, color: 'var(--danger)' }}>
              {serverError}
            </div>
          )}

          <Btn loading={loading} onClick={handleSubmit}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
