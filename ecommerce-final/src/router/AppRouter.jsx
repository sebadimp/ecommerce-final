// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import About from '../pages/About';

// Importa tu componente de ruta protegida
import ProtectedRoute from './ProtectedRoute';

// Importa la barra de navegación y el footer
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../pages/Footer';

// --- Importa tus componentes/páginas de administración aquí ---
// Asegúrate de que las rutas sean correctas a dónde tengas estos componentes
// Si son páginas completas, impórtalas desde '../pages/'
import AddProductForm from '../components/AddProductForm'; // Ejemplo: un formulario para agregar productos
import EditProductForm from '../components/EditProductForm'; // Ejemplo: un formulario para editar productos

// Si tienes un dashboard de administrador, también lo importarías:
// import AdminDashboardPage from '../pages/AdminDashboardPage';
// import UserManagementPage from '../pages/AdminUserManagementPage';


const AppRouter = () => {
    return (
        <Router>
            <NavbarComponent /> {/* Navbar siempre visible */}
            <Routes>
                {/* Rutas públicas, accesibles para todos */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<About />} />

                {/*
                    Rutas protegidas para cualquier usuario autenticado (sin rol específico)
                    Por ejemplo: el carrito de compras, el perfil del usuario, historial de compras.
                */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                    {/* Añade más rutas que solo requieran que el usuario esté logueado */}
                    {/* <Route path="/profile" element={<UserProfilePage />} /> */}
                    {/* <Route path="/orders" element={<UserOrdersPage />} /> */}
                </Route>

                {/*
                    Rutas protegidas solo para administradores
                    Estas rutas usarán la prop 'allowedRoles={['admin']}' de ProtectedRoute.
                    Asegúrate de que 'admin' sea el rol que le asignas en AuthContext.jsx.
                */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    {/* Rutas para las funciones CRUD (Crear, Leer, Actualizar, Borrar) que son de admin */}
                    <Route path="/admin/add-product" element={<AddProductForm />} />
                    <Route path="/admin/edit-product/:id" element={<EditProductForm />} />
                    {/* Añade aquí todas las rutas específicas para la administración */}
                    {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> */}
                    {/* <Route path="/admin/users-management" element={<UserManagementPage />} /> */}
                </Route>

                {/* Ruta para cualquier otra URL no definida (404 Not Found) */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer /> {/* Footer siempre visible */}
        </Router>
    );
};

export default AppRouter;