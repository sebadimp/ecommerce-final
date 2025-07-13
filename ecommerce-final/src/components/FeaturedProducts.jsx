// src/components/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaPlus } from 'react-icons/fa';

const API_URL = 'https://6827e04d6b7628c529119050.mockapi.io/productos';

const FeaturedProducts = () => {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL);
                const mappedProducts = response.data.map(p => ({
                    id: p.id,
                    name: p.nombre,
                    price: Number(p.precio),
                    description: p.detalle,
                    category: p.categoria,
                    image: p.imagen,
                }));

                // --- Lógica para seleccionar 6 productos aleatorios ---
                // 1. Clonar el array para no mutar el original si se usara en otro lado
                let shuffledProducts = [...mappedProducts];

                // 2. Algoritmo de Fisher-Yates para desordenar el array
                for (let i = shuffledProducts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]]; // Intercambiar elementos
                }

                // 3. Tomar los primeros 6 productos de la lista desordenada
                setProducts(shuffledProducts.slice(0, 6));
                // ----------------------------------------------------

            } catch (err) {
                console.error("Error fetching featured products:", err);
                setError('Error al cargar productos destacados.');
                toast.error('Error al cargar productos destacados.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []); // El efecto se ejecuta una sola vez al montar el componente

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status" />
                <p className="mt-2">Cargando productos destacados...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Algunos de nuestros productos</h2>
            {isAdmin && (
                <div className="text-center mb-4">
                    <Button as={Link} to="/admin/add-product" variant="success">
                        <FaPlus className="me-1" /> Agregar Nuevo Producto
                    </Button>
                </div>
            )}
            {products.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No hay productos destacados disponibles en este momento.
                </Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
                    {products.map(product => (
                        <Col key={product.id}>
                            <Card className="h-100 shadow-sm d-flex flex-column">
                                <Card.Img
                                    variant="top"
                                    src={product.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title as="h5">{product.name}</Card.Title>
                                    <Card.Text className="text-muted">${product.price.toFixed(2)}</Card.Text>
                                    <div className="mt-auto">
                                        <Button as={Link} to={`/products/${product.id}`} variant="primary" className="w-100">
                                            Ver Detalle
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            <div className="text-center mt-5">
                <Button as={Link} to="/products" variant="outline-primary" size="lg">
                    Ver todos los productos
                </Button>
            </div>
        </Container>
    );
};

export default FeaturedProducts;