// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Si el usuario no está autenticado, redirige a la página de login
        return <Navigate to={redirectTo} replace />;
    }

    // Si el usuario está autenticado, renderiza los componentes hijos o el Outlet
    return children ? children : <Outlet />;
};

export default ProtectedRoute;