/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import styles from './pagination.module.css'
function Pagination({dataPerPage, totalData, paginate}){
    const pageNumbers = [];
    const totalPages = Math.ceil(totalData / dataPerPage);
    const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePaginationClick = (pageNum) => {
    //In case we hit prev button and returns -1 or something ..

    if(pageNum >= 1 && pageNum <= totalPages){
      setCurrentPage(pageNum);
      paginate(currentPage);
    }
  }

  return (
    <nav className={`${styles['pagination-nav']} center-block`}>
      <ul className='pagination'>
      <li class="page-item">
      <a onClick={() => handlePaginationClick(currentPage - 1)} class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? styles['active-item'] : ''}`}>
            <a onClick={() => handlePaginationClick(number)} href="#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li class="page-item">
      <a onClick={() => handlePaginationClick(currentPage + 1)} class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
      </ul>
    </nav>
  );
};
export default Pagination;