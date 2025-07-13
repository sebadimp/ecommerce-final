// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,     
    signOut,                        
    onAuthStateChanged,             
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {

                let userRole = 'user'; 

                if (firebaseUser.email === 'admin@taltech.com') {
                    userRole = 'admin';
                }

                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    role: userRole,
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); 
            } else {
                
                setUser(null);
                localStorage.removeItem('user'); 
            }
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, displayName = '') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            if (displayName) {
                await updateProfile(userCredential.user, { displayName: displayName });
            }
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };


    const isAuthenticated = !!user;
    const isAdmin = user && user.role === 'admin';


    if (loading) {
        return <div>Cargando autenticación...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);