import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HomeHeroMessage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h2 className="display-4 fw-bold text-primary">
            Hacé tu pedido y recibilo sin moverte de tu casa
          </h2>
          <p className="lead text-muted">
            Tentate con las opciones más ricas y recibí tu producto en 48hs!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeHeroMessage;