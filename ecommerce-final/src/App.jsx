// src/App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importa tus proveedores de contexto
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Importa tu componente de router
import AppRouter from './router/AppRouter';

function App() {
  return (
    // AuthProvider envuelve a CartProvider si el carrito depende de la autenticación
    // (aunque en este caso no es estrictamente necesario, es una buena práctica si en el futuro lo fuera)
    <AuthProvider>
      <CartProvider>
        {/* AppRouter contiene todas las rutas y componentes */}
        <AppRouter />

        {/* ToastContainer para mostrar notificaciones globales */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
