/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './pagination.module.css'
function Pagination({pageable: {totalPages, currentPage}, setPageable}){
    const pageNumbers = [];
    
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePaginationClick = (e, pageNum) => {
    e.preventDefault();
    //In case we hit prev button and returns -1 or something ..

    if(pageNum >= 1 && pageNum <= totalPages){
      setPageable((prev) => ({
        ...prev,
        currentPage: pageNum,
      }));
    }
  }

  return (
    <nav className={`${styles['pagination-nav']} center-block`}>
      <ul className='pagination'>
      <li onClick={(e) =>  handlePaginationClick(e, currentPage - 1)} className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? styles['active-item'] : ''}`}>
            <a onClick={(e) => handlePaginationClick(e, number)} href="#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li onClick={(e) => handlePaginationClick(e, currentPage + 1)} className="page-item">
      <a  className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
      </ul>
    </nav>
  );
};
export default Pagination;