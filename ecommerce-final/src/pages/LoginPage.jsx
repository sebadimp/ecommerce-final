// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/products'); // Redirigir a una página protegida o a la lista de productos
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Iniciar Sesión - Mi Tienda React</title>
        <meta name="description" content="Inicia sesión en tu cuenta para acceder a tu carrito y más." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4 text-center">Iniciar Sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario (ej: admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Campo de usuario"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña (ej: admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Campo de contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Form>
          <p className="mt-3 text-center">
            <small>Credenciales de prueba: usuario "admin", contraseña "admin"</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;