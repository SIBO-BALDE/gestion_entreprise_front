import React from 'react';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ currentPage, totalPaginationPages, setCurrentPage }) {
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPaginationPages; i++) {
      items.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <a className="page-link" onClick={() => setCurrentPage(i)} href="#" >
            {i}
          </a>
        </li>
      );
    }
    return items;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPaginationPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <nav aria-label="Page navigation example" id='navigation'>
        <ul className="pagination">
          <a 
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={handlePreviousPage} 
            href="#" 
            aria-label="Previous" 
            id='page-link1'
          >
            <FontAwesomeIcon icon={faChevronLeft} id='iconpagination' /> 
          </a>
          {renderPaginationItems()}
          <a 
            className={`page-link ${currentPage === totalPaginationPages ? 'disabled' : ''}`} 
            onClick={handleNextPage} 
            href="#" 
            aria-label="Next" 
            id='page-link1'
          >
            <FontAwesomeIcon icon={faChevronRight} id='iconpagination'/>
          </a>
        </ul>
      </nav>
    </div>
  );
}
