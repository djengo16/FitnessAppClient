/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './pagination.module.css'
function Pagination({pageable: {totalPages, currentPage}, setPageable}){
    const pageNumbers = [];
    console.log(totalPages)
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePaginationClick = (pageNum) => {
    //In case we hit prev button and returns -1 or something ..

    if(pageNum >= 1 && pageNum <= totalPages){
      setPageable((prev) => ({
        ...prev,
        currentPage: pageNum,
      }));
    }
  }
  const handlePreviousPageClick = () => {
    handlePaginationClick(currentPage - 1);
  }
  const handleNextPageClick = () => {
    handlePaginationClick(currentPage + 1);
  }

  return (
    <nav className={`${styles['pagination-nav']} center-block`}>
      <ul className='pagination'>
      <li className="page-item">
      <a onClick={handlePreviousPageClick} className="page-link" href="#" aria-label="Previous">
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
        <li className="page-item">
      <a onClick={handleNextPageClick} className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
      </ul>
    </nav>
  );
};
export default Pagination;