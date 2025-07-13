
import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'; // Añadimos NavDropdown
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaTools } from 'react-icons/fa'; 

const NavbarComponent = () => {
    const { isAuthenticated, user, isAdmin, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => { 
        try {
            await logout(); 
            navigate('/'); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);

        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Milo Pasteleria</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>

                        <Nav.Link as={Link} to="/cart">
                            <FaShoppingCart className="me-1" aria-label="Carrito de compras" /> Carrito ({getTotalItems()})
                        </Nav.Link>

                        {isAdmin && (
                            <NavDropdown title={<><FaTools className="me-1" /> Administración</>} id="admin-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/products">
                                    Gestionar Productos 
                                </NavDropdown.Item>
                            </NavDropdown>
                        )} *
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="me-3">
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