import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const maxPagesToShow = 3;

    const startPage = Math.max(currentPage - maxPagesToShow, 1);
    const endPage = Math.min(currentPage + maxPagesToShow, totalPages);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

    return (
        <div className={styles.pagination}>
            {currentPage !== 1 && <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>}
            
            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    <span>...</span>
                </>
            )}

            {pageNumbers.map(page => (
                <button key={page} className={page === currentPage ? styles.active : ''} onClick={() => onPageChange(page)}>
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    <span>...</span>
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            {currentPage !== totalPages && <button onClick={() => onPageChange(currentPage + 1)}>Next</button>}
        </div>
    );
};

export default Pagination;
