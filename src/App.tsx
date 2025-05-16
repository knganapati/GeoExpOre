import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import PhaseOnePage from './pages/PhaseOnePage';
import PhaseTwoPage from './pages/PhaseTwoPage';
import PhaseThreePage from './pages/PhaseThreePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import PhaseFourPage from './pages/PhaseFourPage';
function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={
        !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard/phase1" replace />
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard/phase1" replace />} />
        <Route path="phase1" element={<PhaseOnePage />} />
        <Route path="phase2" element={<PhaseTwoPage />} />
        <Route path="phase3" element={<PhaseThreePage />} />
        <Route path="phase4" element={<PhaseFourPage />} />
      </Route>
      
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;