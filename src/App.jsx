import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { Spinner } from './components/UI';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <AuthPage />;

  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

export default App;
