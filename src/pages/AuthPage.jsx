import { useState } from 'react';
import { login, signup } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Input, Btn } from '../components/UI';

const AuthPage = () => {
  const { saveAuth } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError('');
    try {
      const fn = mode === 'login' ? login : signup;
      const data = await fn(form);
      saveAuth(data.token, data.user);
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,106,247,.12) 0%, transparent 70%)',
    }}>
      {/* Decorative grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: .3, pointerEvents: 'none' }} />

      <div className="fade-up" style={{
        position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 420,
        boxShadow: '0 0 60px rgba(124,106,247,.08)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: 'var(--accent)', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>▦</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 28, letterSpacing: '-.03em' }}>
            Kan<span style={{ color: 'var(--accent)' }}>ban</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
            {mode === 'login' ? 'Welcome back. Sign in to continue.' : 'Create your workspace.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: 4, marginBottom: 24 }}>
          {['login', 'signup'].map((m) => (
            <button key={m} onClick={() => { setMode(m); setErrors({}); setServerError(''); }}
              style={{
                padding: '8px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: mode === m ? 'var(--accent)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--muted)',
                fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13,
                transition: 'all .18s',
              }}
            >{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="John Doe" error={errors.name} onKeyDown={handleKey} />
          )}
          <Input label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} onKeyDown={handleKey} />
          <Input label="Password" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" error={errors.password} onKeyDown={handleKey} />

          {serverError && (
            <div style={{ background: 'rgba(248,113,113,.1)', border: '1px solid var(--danger)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--danger)' }}>
              {serverError}
            </div>
          )}

          <Btn loading={loading} onClick={handleSubmit} style={{ marginTop: 4, width: '100%', justifyContent: 'center', fontSize: 15, padding: '12px' }}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
