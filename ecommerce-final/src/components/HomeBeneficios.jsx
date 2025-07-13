
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShippingFast, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

const HomeBeneficios = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center text-center g-4">
                <Col md={4}>
                    <Card className="h-100 shadow-sm p-4">
                        <Card.Body>
                            <FaShippingFast size={50} className="text-primary mb-3" />
                            <Card.Title as="h3">ENVIOS A DOMICILIO</Card.Title>
                            <Card.Text className="text-muted">
                                Recibí tu pedido cómodamente en la puerta de tu casa.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 shadow-sm p-4">
                        <Card.Body>
                            <FaCreditCard size={50} className="text-success mb-3" />
                            <Card.Title as="h3">PAGA COMO QUIERAS</Card.Title>
                            <Card.Text className="text-muted">
                                Múltiples opciones de pago para tu conveniencia.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 shadow-sm p-4">
                        <Card.Body>
                            <FaShieldAlt size={50} className="text-info mb-3" />
                            <Card.Title as="h3">COMPRA PROTEGIDA</Card.Title>
                            <Card.Text className="text-muted">
                                Tus datos y tu compra están siempre seguros con nosotros.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeBeneficios;