// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Card, Button, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Componentes
import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';
import ConfirmationModal from '../components/ConfirmationModal';
import PaginationComponent from '../components/Pagination'; // Asegurate que el nombre del archivo es 'Pagination.jsx'

// Importamos Modal de react-bootstrap para los formularios en modales
import { Modal } from 'react-bootstrap';

// ** LA URL DE TU MOCKAPI (¡Verificá que sea esta!) **
const API_URL = 'https://6827e04d6b7628c529119050.mockapi.io/productos';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9); // 9 productos por página

    // Estados para el modal de eliminación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Estados para el modal de edición
    const [showEditModal, setShowEditModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null); // Contendrá el producto mapeado para el formulario

    // Estado para el modal de agregar producto
    const [showAddModal, setShowAddModal] = useState(false);


    // --- Carga inicial de productos desde MockAPI ---
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            // ** Mapeamos los datos de la API al formato que nuestro componente espera **
            const mappedProducts = response.data.map(p => ({
                id: p.id,
                name: p.nombre,
                price: Number(p.precio), // Aseguramos que sea número
                description: p.detalle,
                category: p.categoria,
                image: p.imagen,
            }));
            setProducts(mappedProducts);
            console.log("Productos cargados:", mappedProducts); // Para depuración
        } catch (err) {
            console.error("Error fetching products:", err);
            setError('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
            toast.error('Error al obtener productos desde la API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); // Se ejecuta una sola vez al montar el componente


    // --- Lógica de Búsqueda ---
    // Filtrar productos basados en el término de búsqueda
    const filteredProducts = products.filter(product => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        // Buscamos en las propiedades que recibimos y mapeamos (name, category, description)
        return (
            (product.name && product.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (product.category && product.category.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm))
        );
    });

    // Resetear la página a 1 cuando el término de búsqueda cambia
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    // --- Lógica de Paginación ---
    // Calcular los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // --- Lógica de Eliminación ---
    const handleDeleteClick = (product) => {
        setProductToDelete(product); // Guardamos el producto (con sus propiedades ya mapeadas)
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        setShowDeleteModal(false); // Cierra el modal de confirmación
        try {
            // Usamos el ID del producto original para eliminar
            await axios.delete(`${API_URL}/${productToDelete.id}`);
            // Actualiza la lista en UI filtrando el producto eliminado por su ID
            setProducts(products.filter(p => p.id !== productToDelete.id));
            toast.success(`Producto "${productToDelete.name}" eliminado exitosamente!`);
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            toast.error('Error al eliminar el producto. Intenta de nuevo.');
        } finally {
            setProductToDelete(null); // Limpia el producto a eliminar
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };


    // --- Lógica de Edición ---
    const handleEditClick = (product) => {
        // Cuando se hace clic en editar, product ya tiene las propiedades mapeadas (name, price, etc.)
        setProductToEdit(product);
        setShowEditModal(true);
    };

    const handleProductUpdated = (updatedProduct) => {
        // Recibimos el producto actualizado del formulario (ya está en el formato mapeado)
        // Actualizamos el producto en la lista 'products'
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setShowEditModal(false); // Cierra el modal
        setProductToEdit(null); // Limpia el producto a editar
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setProductToEdit(null);
    };


    // --- Lógica de Agregar Producto ---
    const handleProductAdded = (newProduct) => {
        // newProduct ya viene del formulario y del POST con las propiedades mapeadas
        setProducts([...products, newProduct]); // Añade el nuevo producto a la lista
        setShowAddModal(false); // Cierra el modal
    };


    // --- Renderizado Condicional ---
    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando productos...</span>
                </Spinner>
                <p className="mt-2">Cargando productos...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger" className="mx-auto" style={{ maxWidth: '600px' }}>
                    {error}
                    <p className="mt-2">Verifica tu conexión o el estado de la API.</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Helmet>
                <title>Nuestros Productos - Milo Pasteleria</title>
                <meta name="description" content="Explora nuestro catálogo de productos en línea." />
                <meta property="og:title" content="Productos de Mi Tienda" />
                <meta property="og:description" content="Descubre los mejores productos disponibles en nuestra tienda." />
                <meta property="og:type" content="website" />
            </Helmet>
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1>Catálogo de Productos</h1>
                </Col>
                <Col xs="auto">
                    <Button variant="success" onClick={() => setShowAddModal(true)} aria-label="Agregar nuevo producto">
                        <FaPlus className="me-1" /> Agregar Producto
                    </Button>
                </Col>
            </Row>

            {/* Barra de Búsqueda */}
            <InputGroup className="mb-4">
                <InputGroup.Text id="search-icon"><FaSearch /></InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Buscar por nombre, categoría o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Barra de búsqueda de productos"
                />
            </InputGroup>

            {/* Mensaje si no hay productos filtrados o no hay productos en absoluto */}
            {currentProducts.length === 0 && !loading && (
                <Alert variant="info" className="text-center">
                    {searchTerm ? 'No se encontraron productos que coincidan con tu búsqueda.' : 'No hay productos disponibles.'}
                </Alert>
            )}

            {/* Listado de Productos */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentProducts.map(product => (
                    <Col key={product.id}>
                        <Card className="h-100 shadow-sm d-flex flex-column">
                            <Card.Img
                                variant="top"
                                src={product.image || 'https://via.placeholder.com/300x200'} // Usamos 'image' (ya mapeado)
                                alt={product.name} // Usamos 'name' (ya mapeado)
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title as="h5">{product.name}</Card.Title> {/* Usamos 'name' */}
                                <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle> {/* Usamos 'category' */}

                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <span className="fs-5 fw-bold">${product.price.toFixed(2)}</span> {/* Usamos 'price' */}
                                    <div>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEditClick(product)}
                                            aria-label={`Editar ${product.name}`}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(product)}
                                            aria-label={`Eliminar ${product.name}`}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </div>
                                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm mt-3">Ver Detalles</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Paginación */}
            {filteredProducts.length > productsPerPage && (
                <PaginationComponent
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}

            {/* Modal para Agregar Producto */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* onProductAdded recibirá el producto ya mapeado */}
                    <AddProductForm onProductAdded={handleProductAdded} />
                </Modal.Body>
            </Modal>

            {/* Modal para Editar Producto */}
            <Modal show={showEditModal} onHide={handleCancelEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productToEdit && (
                        <EditProductForm
                            product={productToEdit} // productToEdit ya está mapeado con name, price, etc.
                            onProductUpdated={handleProductUpdated}
                            onCancel={handleCancelEdit}
                        />
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal de Confirmación de Eliminación */}
            <ConfirmationModal
                show={showDeleteModal}
                title="Confirmar Eliminación"
                message={productToDelete ? `¿Estás seguro de que quieres eliminar "${productToDelete.name}"? Esta acción es irreversible.` : '¿Estás seguro de que quieres eliminar este producto?'}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Container>
    );
};

export default ProductList;