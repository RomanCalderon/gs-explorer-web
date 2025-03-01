interface PaginationProps {
  currentPage: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, maxPages, onPageChange }: PaginationProps) => {
  return (
    <div className='posts-nav'>
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
        title="First page"
      >
        ⟪
      </button>
      <button 
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        title="Previous page"
      >
        ⟨
      </button>
      <span className="page-number">{currentPage} / {maxPages}</span>
      <button 
        onClick={() => onPageChange(Math.min(currentPage + 1, maxPages))}
        disabled={currentPage >= maxPages}
        title="Next page"
      >
        ⟩
      </button>
      <button 
        onClick={() => onPageChange(maxPages)}
        disabled={currentPage >= maxPages}
        title="Last page"
      >
        ⟫
      </button>
    </div>
  );
}; 