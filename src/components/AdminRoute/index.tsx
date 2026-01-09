import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '@/utils/auth';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/projects" replace />;
  }
  return <>{children}</>;
};
