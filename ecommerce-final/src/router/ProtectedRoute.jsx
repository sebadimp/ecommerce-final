// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Importamos toast para notificaciones

// Agregamos la prop 'allowedRoles' que será un array de roles permitidos
// Por ejemplo: <ProtectedRoute allowedRoles={['admin']} />
const ProtectedRoute = ({ children, redirectTo = '/login', allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth(); // Ahora también necesitamos el 'user' y 'loading'

    // Si aún estamos cargando la autenticación, no hacemos nada y podemos mostrar un spinner
    if (loading) {
        return <div>Cargando...</div>; // O un spinner/componente de carga
    }

    // 1. Si el usuario NO está autenticado, redirige al login
    if (!isAuthenticated) {
        toast.error('Necesitas iniciar sesión para acceder a esta página.');
        return <Navigate to={redirectTo} replace />;
    }

    // 2. Si se especificaron roles permitidos para esta ruta
    if (allowedRoles && allowedRoles.length > 0) {
        // Verifica si el usuario actual tiene un rol Y si ese rol está incluido en 'allowedRoles'
        if (!user || !user.role || !allowedRoles.includes(user.role)) {
            // Si el usuario no tiene el rol necesario, redirige
            toast.error('No tienes permisos para acceder a esta sección.');
            return <Navigate to="/" replace />; // Redirige a la home o a una página de "Acceso Denegado"
        }
    }

    // Si el usuario está autenticado Y tiene el rol correcto (o no se especificaron roles),
    // renderiza los componentes hijos o el Outlet
    return children ? children : <Outlet />;
};

export default ProtectedRoute;