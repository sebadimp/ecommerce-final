// src/components/Pagination.jsx
import React from 'react';
import styled from 'styled-components';
import { Pagination as BBPagination } from 'react-bootstrap'; // Renombramos para no confundir con nuestro componente

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 20px;
`;

const PaginationComponent = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationWrapper>
            <BBPagination>
                <BBPagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {pageNumbers.map(number => (
                    <BBPagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </BBPagination.Item>
                ))}
                <BBPagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
            </BBPagination>
        </PaginationWrapper>
    );
};

export default PaginationComponent;