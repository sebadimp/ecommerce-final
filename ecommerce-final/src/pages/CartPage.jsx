import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info('Tu carrito está vacío. ¡Añade productos antes de comprar!');
      return;
    }
    toast.success('¡Compra realizada con éxito!');
    clearCart();
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Milo Pasteleria</title>
        <meta name="description" content="Revisa los productos en tu carrito de compras." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-4">Tu Carrito de Compras</h1>
          {cartItems.length === 0 ? (
            <p className="text-center lead">El carrito está vacío. ¡Añade algunos productos!</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center">
                      <img
                        src={item.image || 'https://via.placeholder.com/80x80?text=No+Image'} 
                        alt={item.nombre || item.name || 'Producto'}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }}
                        className="img-fluid"
                      />
                      <div>
                        <h5>{item.nombre || item.name}</h5>
                        <small>Cantidad: {item.quantity}</small>
                      </div>
                    </div>

                    <div>
                      <span className="fw-bold">${((item.precio || item.price || 0) * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-danger btn-sm ms-3"
                        aria-label={`Eliminar ${item.nombre || item.name} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                <div>
                  <Button
                    onClick={clearCart}
                    variant="warning"
                    className="me-2"
                    aria-label="Vaciar todo el carrito"
                  >
                    Vaciar Carrito
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    variant="success"
                    aria-label="Realizar compra"
                  >
                    Realizar Compra
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;