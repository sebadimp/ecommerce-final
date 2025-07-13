import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; 


const API_URL = 'https://6827e04d6b7628c529119050.mockapi.io/productos';

const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addItem } = useCart(); 

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/${id}`);

                setProduct({
                    id: response.data.id,
                    name: response.data.nombre,
                    price: Number(response.data.precio),
                    description: response.data.detalle,
                    category: response.data.categoria,
                    image: response.data.imagen,
                });
            } catch (err) {
                console.error("Error fetching product details:", err);
                if (err.response && err.response.status === 404) {
                    setError('El producto solicitado no fue encontrado.');
                    toast.error('Producto no encontrado.');
                } else {
                    setError('No se pudo cargar el detalle del producto. Intenta de nuevo más tarde.');
                    toast.error('Error al cargar el producto.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); 


    const handleAddToCart = () => {
        if (product && quantity > 0) {
            addItem(product, quantity);
            toast.success(`${quantity} x ${product.name} agregado(s) al carrito!`);
        } else {
            toast.error('Por favor, selecciona una cantidad válida para agregar al carrito.');
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando producto...</span>
                </Spinner>
                <p>Cargando detalle del producto...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger">
                    {error}
                    <p className="mt-3">Por favor, <Link to="/products">vuelve a la lista de productos</Link>.</p>
                </Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="info">Producto no encontrado o no disponible.</Alert>
                <Link to="/products" className="btn btn-primary">Volver a Productos</Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Helmet>
                <title>Milo Pasteleria</title>
                <meta name="description" content={product?.description?.substring(0, 160) + "..."} />
                <meta property="og:title" content={product?.name} />
                <meta property="og:description" content={product?.description?.substring(0, 160) + "..."} />
                <meta property="og:image" content={product?.image || 'https://via.placeholder.com/400'} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="product" />
            </Helmet>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm">
                        <Row g={0}>
                            <Col md={5}>
                                <Card.Img
                                    src={product.image || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="img-fluid rounded-start"
                                    style={{ objectFit: 'cover', height: '100%', minHeight: '250px' }}
                                />
                            </Col>
                            <Col md={7}>
                                <Card.Body>
                                    <Card.Title as="h2">{product.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Categoría: {product.category || 'Sin Categoría'}</Card.Subtitle>
                                    <Card.Text className="lead fs-4 fw-bold mb-3">${product.price.toFixed(2)}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>

                                    <hr />

                                    <div className="d-flex align-items-center mb-3">
                                        <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Disminuir cantidad">-</Button>
                                        <span className="mx-2 fs-5">{quantity}</span>
                                        <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar cantidad">+</Button>
                                        <Button variant="primary" className="ms-3" onClick={handleAddToCart} aria-label="Agregar al carrito">
                                            Agregar al Carrito
                                        </Button>
                                    </div>

                                    <div className="d-flex justify-content-between mt-4">
                                        <Link to="/products" className="btn btn-secondary">Volver a Productos</Link>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;