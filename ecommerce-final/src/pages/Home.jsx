// src/pages/Home.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5">
      <Helmet>
        <title>Inicio - Mi Tienda React</title>
        <meta name="description" content="Bienvenido a la página de inicio de nuestra tienda online." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>¡Bienvenido a Mi Tienda React!</h1>
          <p className="lead">Explora nuestros productos o inicia sesión para acceder a tu carrito.</p>
          {/* Aquí podrías añadir un botón para ver productos o iniciar sesión */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;