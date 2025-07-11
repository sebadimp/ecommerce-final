// src/components/AddProductForm.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'; // Se quitó 'Alert' si no se usa
import { toast } from 'react-toastify';
import axios from 'axios';
import styled from 'styled-components';

// Styled-component para los mensajes de error
const ErrorText = styled.p`
    color: red;
    font-size: 0.85em;
    margin-top: 5px;
`;

// ** LA URL DE TU MOCKAPI (¡Confirmá de nuevo!) **
const API_URL = 'https://6827e04d6b7628c529119050.mockapi.io/productos';

const AddProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Función de validación
    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
        // Aseguramos que el precio sea un número y mayor a 0, y que no sea una cadena vacía
        if (Number(price) <= 0 || isNaN(Number(price)) || price.trim() === '') newErrors.price = 'El precio debe ser un número mayor a 0.';
        if (description.length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        if (!category.trim()) newErrors.category = 'La categoría es obligatoria.';
        // Puedes agregar validación para la URL de la imagen si lo deseas
        // if (image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(image)) newErrors.image = 'URL de imagen inválida.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Por favor, corrige los errores del formulario.');
            return;
        }

        setLoading(true);
        try {
            // ** OBJETO A ENVIAR A MOCKAPI - ¡AQUÍ ES CLAVE EL MAPEO DE NOMBRES! **
            const productToSend = {
                nombre: name,           // Mapea el estado 'name' a la propiedad 'nombre' de MockAPI
                precio: Number(price),  // Mapea el estado 'price' a 'precio' y asegura que sea un número
                detalle: description,   // Mapea el estado 'description' a 'detalle'
                categoria: category,    // Mapea el estado 'category' a 'categoria'
                imagen: image || 'https://via.placeholder.com/300', // Mapea 'image' a 'imagen'
            };

            // console.log("Enviando producto (POST):", productToSend); // Para depurar

            const response = await axios.post(API_URL, productToSend);
            toast.success('Producto agregado exitosamente!');

            // Limpiar formulario
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setImage('');
            setErrors({});

            // ** Llama al callback con el producto que MockAPI devuelve (ya tendrá su ID) **
            // Y lo mapeamos de nuevo al formato 'name', 'price' para que ProductList lo entienda
            if (onProductAdded) onProductAdded({
                id: response.data.id,
                name: response.data.nombre,
                price: Number(response.data.precio),
                description: response.data.detalle,
                category: response.data.categoria,
                image: response.data.imagen,
            });
        } catch (error) {
            console.error('Error al agregar producto:', error);
            // Mostrar un mensaje más específico si es posible
            if (error.response) {
                console.error('Datos de respuesta de error:', error.response.data);
                console.error('Estado HTTP:', error.response.status);
                toast.error(`Error al agregar el producto: ${error.response.status} - ${error.response.data || error.message}`);
            } else {
                toast.error('Error al agregar el producto. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4 text-center">Agregar Nuevo Producto</h3>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formProductName">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                        aria-label="Nombre del producto"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formProductPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number" // Asegura que el input sea numérico
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        isInvalid={!!errors.price}
                        aria-label="Precio del producto"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formProductCategory">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Electrónica, Ropa"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        isInvalid={!!errors.category}
                        aria-label="Categoría del producto"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formProductImage">
                    <Form.Label>URL de Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        isInvalid={!!errors.image} // Para validar URL de imagen si se agrega
                        aria-label="URL de la imagen del producto"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.image}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Opcional. Se usará una imagen por defecto si no se provee.
                    </Form.Text>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formProductDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descripción detallada del producto..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    isInvalid={!!errors.description}
                    aria-label="Descripción del producto"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Agregando...</span>
                    </>
                ) : (
                    'Agregar Producto'
                )}
            </Button>
        </Form>
    );
};

export default AddProductForm;