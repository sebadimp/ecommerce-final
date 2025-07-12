// src/components/NavbarComponent.jsx
import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'; // Añadimos NavDropdown
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaTools } from 'react-icons/fa'; // Añadimos FaTools para el icono de admin

const NavbarComponent = () => {
    // Importamos 'isAdmin' del contexto de autenticación
    const { isAuthenticated, user, isAdmin, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => { // Hacemos la función async para el await logout()
        try {
            await logout(); // Esperamos a que el logout de Firebase se complete
            navigate('/'); // Redirigir al inicio después de cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            // Opcional: toast.error("Error al cerrar sesión");
        }
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

                        /*** {/* Menú o Enlaces de ADMINISTRACIÓN - Visible SOLO para administradores */}
                        {isAdmin && (
                            <NavDropdown title={<><FaTools className="me-1" /> Administración</>} id="admin-nav-dropdown">
                                {/* Si tienes una página de listado de productos de admin que incluya edición/eliminación */}
                                <NavDropdown.Item as={Link} to="/products">
                                    Gestionar Productos {/* Esto podría ser una vista de tabla con acciones de CRUD */}
                                </NavDropdown.Item>
                                {/* Puedes añadir más enlaces de administración aquí */}
                                {/* <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard Admin</NavDropdown.Item> */}
                                {/* <NavDropdown.Divider /> */}
                                {/* <NavDropdown.Item as={Link} to="/admin/users-management">Gestión de Usuarios</NavDropdown.Item> */}
                            </NavDropdown>
                        )} *
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="me-3">
                                    {/* Muestra el email si user.email existe, de lo contrario 'Usuario' */}
                                    <FaUserCircle className="me-1" aria-label="Usuario" /> Hola, {user?.displayName || user?.email.split('@')[0]}!
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