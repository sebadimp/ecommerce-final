// src/components/NavbarComponent.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Iconos

const NavbarComponent = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirigir al inicio después de cerrar sesión
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>
                        {/* El enlace al carrito ahora es público, pero su contenido es protegido por el ProtectedRoute */}
                        <Nav.Link as={Link} to="/cart">
                            <FaShoppingCart className="me-1" aria-label="Carrito de compras" /> Carrito ({getTotalItems()})
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="me-3">
                                    <FaUserCircle className="me-1" aria-label="Usuario" /> Hola, {user.username}!
                                </Navbar.Text>
                                <Button variant="outline-light" onClick={handleLogout} aria-label="Cerrar sesión">
                                    <FaSignOutAlt className="me-1" /> Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" variant="outline-light" aria-label="Iniciar sesión">
                                <FaSignInAlt className="me-1" /> Iniciar Sesión
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;