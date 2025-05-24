import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'; // No longer needed
// import { useAuth } from '../../context/AuthContext'; // No longer needed

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/admin/login'
}) => {
  // Authentication bypassed - always allow access to admin routes
  return <Outlet />;
  
  /*
  const { isAuthenticated, isAdmin } = useAuth();
  
  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If authenticated but not admin, redirect to login with access denied
  if (isAuthenticated && !isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If authenticated and admin, allow access
  return <Outlet />;
  */
};

export default ProtectedRoute;
