// src/pages/NotFound.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <Helmet>
        <title>Página no encontrada - Mi Tienda React</title>
        <meta name="description" content="La página que buscas no existe." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-1">404</h1>
          <h2>¡Página no encontrada!</h2>
          <p className="lead">Lo sentimos, la página que estás buscando no existe.</p>
          <Link to="/">
            <Button variant="primary">Volver al Inicio</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;