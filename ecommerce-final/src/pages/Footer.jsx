// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Iconos de redes sociales

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 py-4"> {/* mt-5 para margen superior, py-4 para padding vertical */}
            <Container>
                <Row className="justify-content-center text-center">

                    {/* Columna de Copyright */}
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Milo Pastelería</h5>
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Milo Pastelería. Todos los derechos reservados.
                        </p>
                    </Col>

                    {/* Columna de Redes Sociales */}
                    <Col md={4}>
                        <h5>Síguenos</h5>
                        <div className="d-flex justify-content-center">
                            <a href="https://facebook.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white mx-2 fs-4" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white mx-2 fs-4" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/milopasteleria" target="_blank" rel="noopener noreferrer" className="text-white mx-2 fs-4" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/numerodetelefono" target="_blank" rel="noopener noreferrer" className="text-white mx-2 fs-4" aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;