// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword, // Para registrar nuevos usuarios
    signInWithEmailAndPassword,     // Para iniciar sesión
    signOut,                        // Para cerrar sesión
    onAuthStateChanged,             // Para escuchar cambios en el estado de autenticación
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // <-- Asegúrate de que esta ruta sea correcta para tu firebaseConfig.js

// Si quieres guardar roles o datos adicionales en Firestore para cada usuario:
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // <-- Si usas Firestore, descomenta esta línea y asegúrate de importarla en firebaseConfig.js

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // El usuario autenticado de Firebase
    const [loading, setLoading] = useState(true); // Estado para saber si la autenticación está inicializando

    // useEffect para manejar el estado de autenticación de Firebase
    useEffect(() => {
        // onAuthStateChanged es la forma recomendada para obtener el estado de autenticación actual
        // y para escuchar cualquier cambio en ese estado (login, logout, token refresh).
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Usuario autenticado en Firebase
                let userRole = 'user'; // Rol por defecto

                // === Lógica para asignar roles ===
                // Opción 1 (Más simple para empezar, pero NO recomendada para producción si la seguridad es clave):
                // Asignar rol de admin basado en el email
                if (firebaseUser.email === 'admin@taltech.com') { // <-- ¡IMPORTANTE! Cambia esto por el email que uses para tu admin
                    userRole = 'admin';
                }



                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    role: userRole, // Asignamos el rol al objeto user en el contexto
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); // Persistir en localStorage
            } else {
                // Usuario deslogueado
                setUser(null);
                localStorage.removeItem('user'); // Eliminar de localStorage
            }
            setLoading(false); // La inicialización de la autenticación ha terminado
        });

        // Limpia la suscripción cuando el componente se desmonte para evitar fugas de memoria
        return () => unsubscribe();
    }, []);

    // Función para registrar un nuevo usuario con email y contraseña
    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Firebase UserCredential contiene el objeto user.
            // onAuthStateChanged se encargará de actualizar el estado `user` en el contexto.
            return userCredential.user;
        } catch (error) {
            throw error; // Propagar el error para que el componente que llama lo maneje (ej. LoginPage o un componente de registro)
        }
    };

    // Función para iniciar sesión con email y contraseña
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged se encargará de actualizar el estado `user` en el contexto.
            return userCredential.user;
        } catch (error) {
            throw error; // Propagar el error
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);
            // onAuthStateChanged se encargará de establecer el estado `user` a null.
        } catch (error) {
            throw error;
        }
    };

    // Variables de conveniencia para consumir en los componentes
    const isAuthenticated = !!user;
    const isAdmin = user && user.role === 'admin'; // Verifica si el usuario logueado es administrador

    // Muestra un mensaje de carga mientras Firebase inicializa
    if (loading) {
        // Puedes reemplazar esto con un spinner o un componente de carga más sofisticado
        return <div>Cargando autenticación...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);