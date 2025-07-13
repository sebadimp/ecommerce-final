import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, displayName);
      toast.success('¡Registro exitoso! Por favor, inicia sesión con tu email y contraseña.');
      navigate('/login'); 
    } catch (error) {

      let errorMessage = 'Error al registrarse. Intenta de nuevo.';
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está registrado.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico es inválido.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil (mínimo 6 caracteres).';
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
        <title>Milo Pasteleria</title>
        <meta name="description" content="Crea una nueva cuenta en Milo Pastelería." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4 text-center">Registrarse</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmailRegister">
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

            <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea tu contraseña (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Campo de contraseña"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPasswordRegister">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-label="Campo de confirmar contraseña"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </Form>

          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;