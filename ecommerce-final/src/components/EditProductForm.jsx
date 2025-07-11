// src/components/EditProductForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'; // Se quitó 'Alert'
import { toast } from 'react-toastify';
import axios from 'axios';
import styled from 'styled-components';

const ErrorText = styled.p`
    color: red;
    font-size: 0.85em;
    margin-top: 5px;
`;

// ** LA URL DE TU MOCKAPI (¡Confirmá de nuevo!) **
const API_URL = 'https://6827e04d6b7628c529119050.mockapi.io/productos';

const EditProductForm = ({ product, onProductUpdated, onCancel }) => {
    // Estos estados internos del formulario siguen usando 'name', 'price', etc.
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Cargar los datos del producto cuando se monta el componente o el `product` prop cambie
    useEffect(() => {
        if (product) {
            setId(product.id);
            // Aseguramos que los valores sean strings, ya que los inputs esperan strings
            setName(product.name || '');
            setPrice(product.price ? String(product.price) : ''); // Convertir a string para el input
            setDescription(product.description || '');
            setCategory(product.category || '');
            setImage(product.image || '');
        }
    }, [product]);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
        // Aseguramos que el precio sea un número y mayor a 0, y que no sea una cadena vacía
        if (Number(price) <= 0 || isNaN(Number(price)) || price.trim() === '') newErrors.price = 'El precio debe ser un número mayor a 0.';
        if (description.length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        if (!category.trim()) newErrors.category = 'La categoría es obligatoria.';
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
                nombre: name,
                precio: Number(price), // Convertir a número para la API
                detalle: description,
                categoria: category,
                imagen: image || 'https://via.placeholder.com/300',
            };

            // console.log("Enviando producto (PUT):", productToSend); // Para depurar

            const response = await axios.put(`${API_URL}/${id}`, productToSend); // <--- Usamos la nueva URL
            toast.success('Producto actualizado exitosamente!');

            // Llama al callback con el producto que MockAPI devuelve (ya tendrá su ID)
            // Y lo mapeamos de nuevo al formato 'name', 'price' para que ProductList lo entienda
            if (onProductUpdated) onProductUpdated({
                id: response.data.id,
                name: response.data.nombre,
                price: Number(response.data.precio),
                description: response.data.detalle,
                category: response.data.categoria,
                image: response.data.imagen,
            });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            if (error.response) {
                console.error('Datos de respuesta de error:', error.response.data);
                console.error('Estado HTTP:', error.response.status);
                toast.error(`Error al actualizar el producto: ${error.response.status} - ${error.response.data || error.message}`);
            } else {
                toast.error('Error al actualizar el producto. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4 text-center">Editar Producto</h3>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="editProductName">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="editProductPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number" // Asegura que el input sea numérico
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="editProductCategory">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Electrónica, Ropa"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        isInvalid={!!errors.category}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="editProductImage">
                    <Form.Label>URL de Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        isInvalid={!!errors.image}
                    />
                     <Form.Control.Feedback type="invalid">
                        {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="editProductDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descripción detallada del producto..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="success" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Guardando...</span>
                        </>
                    ) : (
                        'Guardar Cambios'
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default EditProductForm;