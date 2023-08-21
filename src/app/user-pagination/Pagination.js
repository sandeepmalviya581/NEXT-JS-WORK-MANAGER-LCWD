// components/Pagination.js

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
  
    return (
      <div className="flex items-center justify-center my-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isFirstPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLastPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  