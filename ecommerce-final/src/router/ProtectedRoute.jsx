import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, redirectTo = '/login', allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth(); 

    if (loading) {
        return <div>Cargando...</div>;
    }


    if (!isAuthenticated) {
        toast.error('Necesitas iniciar sesión para acceder a esta página.');
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (!user || !user.role || !allowedRoles.includes(user.role)) {
            toast.error('No tienes permisos para acceder a esta sección.');
            return <Navigate to="/" replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;