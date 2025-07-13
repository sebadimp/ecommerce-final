// src/pages/Home.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import HomeCarousel from '../components/HomeCarousel';
import HomeHeroMessage from '../components/HomeHeroMessage';
import HomeBeneficios from '../components/HomeBeneficios';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <Container className="mt-5">
      <Helmet>
        <title>Milo Pasteleria</title>
        <meta name="description" content="Bienvenido a la página de inicio de nuestra tienda online." />
      </Helmet>
      <HomeCarousel/>
      <HomeHeroMessage/>
      <FeaturedProducts/>
      <HomeBeneficios/>
    </Container>
  );
};

export default Home;