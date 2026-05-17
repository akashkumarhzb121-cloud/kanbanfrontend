import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Btn } from './UI';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const initials = user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'KB';

  return (
    <header className="topbar">
      <div className="topbar-inner page-shell">
        <div className="brand">
          <div className="brand-mark">▦</div>
          <div className="brand-title">
            <strong>Kanban</strong>
            <span>Modern task workspace</span>
          </div>
        </div>

        <div className="nav-actions">
          <button type="button" className="action-button" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="profile-pill">
            <div className="profile-pill-avatar">{initials}</div>
            <div className="profile-pill-text">
              <strong>{user?.name}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
          <Btn variant="ghost" size="sm" onClick={logout}>Sign out</Btn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
