import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';

import aboutImage1 from '../assets/about1.jpg';
import aboutImage2 from '../assets/about2.jpg';

const About = () => {
  return (
    <Container className="my-5 py-1">
      <Helmet>
        <title>Milo Pasteleria</title>
        <meta name="description" content="Conoce la historia y la pasión detrás de Milo Pastelería, tu fuente de delicias artesanales." />
      </Helmet>

      <Row className="justify-content-center text-center mb-5 pb-3">
        <Col md={9} lg={8}>
          <h1 className="display-6 fw-bold text-dark">Sobre Nosotros</h1>
          <div className="welcome-box">
            <p className="lead fs-4 text-muted mt-3 mb-0">
              ¡Bienvenidos a Milo Pastelería! Somos un emprendimiento apasionado por crear delicias artesanales que deleiten tus sentidos.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <p className="fs-5 text-dark mb-4">
            Nuestra historia comenzó en <span className="text-primary fw-semibold">2020, en plena época de pandemia en Ciudadela, Argentina</span>. Desde entonces, nos hemos dedicado a utilizar ingredientes frescos y de la más alta calidad para ofrecerte tortas, pasteles, galletas y mucho más, elaborados con amor y cuidado en cada detalle.
          </p>
          <p className="fs-5 text-dark mb-4">
            Creemos que cada celebración merece un toque especial. Por eso, nos esforzamos por crear productos únicos y personalizados que hagan de tus momentos algo inolvidable.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center g-4 mb-5">
        <Col md={6} lg={5} className="text-center"> 
          <img
            src={aboutImage1}
            alt="Mano horneando pan o pasteles"

            className="img-fluid rounded shadow-lg"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <p className="text-muted mt-2 small">
            Nuestra pasión por la repostería artesanal.
          </p>
        </Col>
        <Col md={6} lg={5} className="text-center">
          <img
            src={aboutImage2}
            alt="Mesa con pasteles y café"
            className="img-fluid rounded shadow-lg"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <p className="text-muted mt-2 small">
            Calidad y sabor en cada creación.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mt-5 pt-3">
        <Col md={9} lg={8}>
          <p className="lead fs-4 text-dark mb-0">
            ¡Gracias por elegirnos! Esperamos endulzar tu día con nuestras deliciosas creaciones.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;