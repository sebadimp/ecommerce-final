import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/products');
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Formato de correo electrónico inválido.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Correo electrónico o contraseña incorrectos.';
            break;
          case 'auth/invalid-credential': 
            errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
            break;
          default:
            errorMessage = error.message;
            break;
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Iniciar Sesión - Milo Pasteleria</title>
        <meta name="description" content="Inicia sesión en tu cuenta para acceder a tu carrito y más en Milo Pastelería." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4 text-center">Iniciar Sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail"> 
              <Form.Label>Correo Electrónico</Form.Label> 
              <Form.Control
                type="email" 
                placeholder="Ingresa tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Campo de correo electrónico"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
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

          <p className="mt-4 text-center">
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>

          <p className="mt-3 text-center text-muted small">
            Credenciales de prueba:<br/>
            Usuario: "admin@taltech.com", Contraseña: "admin123"<br/>
            Usuario: "usuario@taltech.com", Contraseña: "usurio123"
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;