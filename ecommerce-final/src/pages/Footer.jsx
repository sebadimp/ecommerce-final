import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaWallet,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 py-3">
            <Container>
                <Row className="justify-content-center text-center text-md-start">

                    <Col md={3} sm={6} className="mb-2 mb-md-0">
                        <h5 className="mb-3">Navegación</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/" className="text-white-50">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/products" className="text-white-50">Productos</Nav.Link>
                            <Nav.Link as={Link} to="/about" className="text-white-50">Nosotros</Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="text-white-50">Carrito</Nav.Link>
                        </Nav>
                    </Col>

                    <Col md={3} sm={6} className="mb-4 mb-md-0">
                        <h5 className="mb-3">Medios de Pago</h5>
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-start fs-3">
                            <FaCcVisa className="mx-2 mb-2" title="Visa" />
                            <FaCcMastercard className="mx-2 mb-2" title="Mastercard" />
                            <FaCcAmex className="mx-2 mb-2" title="American Express" />
                            <FaWallet className="mx-2 mb-2" title="Efectivo" />
                        </div>
                    </Col>

                    <Col md={3} sm={6} className="mb-4 mb-md-0">
                        <h5 className="mb-3">Contáctanos</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                                <FaMapMarkerAlt className="me-2" /> Dirección: Saavedra 123, Ciudadela
                            </li>
                            <li className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                                <FaPhone className="me-2" /> Teléfono: +54 9 11 1234-5678
                            </li>
                            <li className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                                <FaEnvelope className="me-2" /> Email: info@milopasteleria.com
                            </li>
                        </ul>
                    </Col>

                    <Col md={3} sm={6} className="mb-4 mb-md-0">
                        <h5 className="mb-3">Redes Sociales</h5>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <a href="https://facebook.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white-50 mx-2 fs-4" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white-50 mx-2 fs-4" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white-50 mx-2 fs-4" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="text-white-50 mx-2 fs-4" aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4 pt-4 border-top border-secondary text-center">
                    <Col>
                        <p className="mb-0 text-white-50">
                            &copy; 2025 Milo Pastelería. Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;