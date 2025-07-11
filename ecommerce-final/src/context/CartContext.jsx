// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Intentar cargar el carrito desde localStorage al iniciar
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guardar el carrito en localStorage cada vez que 'cartItems' cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Añadir un producto al carrito
    const addItem = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Si el producto ya existe, actualiza la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Si el producto no existe, añádelo
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Eliminar un producto del carrito
    const removeItem = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    // Vaciar todo el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Calcular el número total de ítems en el carrito (suma de cantidades)
    const getTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calcular el precio total del carrito
    const getTotalPrice = () => cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            clearCart,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para consumir el contexto del carrito fácilmente
export const useCart = () => useContext(CartContext);