// src/components/HomeCarousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';

// Importa tus imágenes locales
import carouselImage1 from '../assets/carousel1.jpg'; 
import carouselImage2 from '../assets/carousel2.jpg';
import carouselImage3 from '../assets/carousel3.jpg'; 
import carouselImage4 from '../assets/carousel4.jpg'; 

const HomeCarousel = () => {
    return (
        <Carousel fade controls={false} indicators={false} interval={3000}> 
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carouselImage1}
                    alt="Primer slide de pastelería"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carouselImage2}
                    alt="Segundo slide de pastelería"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carouselImage3}
                    alt="Tercer slide de pastelería"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carouselImage4}
                    alt="Tercer slide de pastelería"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;