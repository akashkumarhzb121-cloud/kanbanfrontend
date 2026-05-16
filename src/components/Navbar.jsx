import { useAuth } from '../context/AuthContext';
import { Btn } from './UI';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,15,.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>▦</div>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 18, letterSpacing: '-.02em' }}>
          Kan<span style={{ color: 'var(--accent)' }}>ban</span>
        </span>
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13 }}>{user.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: 11 }}>{user.email}</div>
          </div>
          <Btn variant="ghost" size="sm" onClick={logout}>Sign Out</Btn>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
