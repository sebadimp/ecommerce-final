// src/pages/CartPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importa el hook del carrito

const CartPage = () => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart();

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Carrito de Compras - Mi Tienda React</title>
        <meta name="description" content="Revisa los productos en tu carrito de compras." />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Tu Carrito de Compras</h1>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío. ¡Añade algunos productos!</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.name}</h5>
                      <small>Cantidad: {item.quantity}</small>
                    </div>
                    <div>
                      <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-danger btn-sm ms-3"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center">
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                <button
                  onClick={clearCart}
                  className="btn btn-warning"
                  aria-label="Vaciar todo el carrito"
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;