// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'; 
import NotFound from '../pages/NotFound';
import About from '../pages/About';

import ProtectedRoute from './ProtectedRoute';

import NavbarComponent from '../components/NavbarComponent';
import Footer from '../pages/Footer';

import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';

const AppRouter = () => {
    return (
        <Router>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/about" element={<About />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/add-product" element={<AddProductForm />} />
                    <Route path="/admin/edit-product/:id" element={<EditProductForm />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;