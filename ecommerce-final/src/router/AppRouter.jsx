// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import About from '../pages/About';

// Importa tu componente de ruta protegida
import ProtectedRoute from './ProtectedRoute';

// Importa la barra de navegación (¡Esta es la línea que faltaba!)
import NavbarComponent from '../components/NavbarComponent'; // <-- ¡AGREGÁ ESTA LÍNEA!
import Footer from '../pages/Footer';

const AppRouter = () => {
    return (
        <Router>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} /> {/* <-- Nueva ruta para detalle */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<About />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;