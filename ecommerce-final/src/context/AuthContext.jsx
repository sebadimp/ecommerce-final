// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Intentar cargar el usuario desde localStorage al iniciar
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Guardar el usuario en localStorage cada vez que el estado 'user' cambie
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user'); // Si el usuario es null (deslogueado), eliminarlo de localStorage
        }
    }, [user]);

    // Función de login simulada
    const login = async (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Credenciales simuladas: 'admin' / 'admin'
                if (username === 'admin' && password === 'admin') {
                    const userData = { username, role: 'admin' }; // Puedes añadir más datos del usuario si lo necesitas
                    setUser(userData);
                    resolve(userData);
                } else {
                    reject(new Error('Credenciales inválidas. Intenta con "admin" / "admin".'));
                }
            }, 500); // Simular un pequeño retardo de red
        });
    };

    // Función de logout
    const logout = () => {
        setUser(null);
    };

    // Conveniencia para saber si el usuario está autenticado
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);