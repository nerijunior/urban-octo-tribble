import cx from "classnames";
import { DEFAULT_PER_PAGE } from "../constants";
import usePagination from "../hooks/usePagination";

export default function Pagination({
  currentPage,
  perPage = DEFAULT_PER_PAGE,
  maxPaginationButtons = 10,
  totalRecords,
  onPageChange,
}) {
  //   TODO: for page range 1,2,3...
  const [totalPages, _range] = usePagination(
    totalRecords,
    perPage,
    currentPage
  );
  //   const handlePageChange = (page) => () => {
  //     onPageChange(page);
  //   };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        className="pagination-previous"
        onClick={handlePreviousPage}
      >
        Previous
      </button>
      <button
        type="button"
        disabled={currentPage === totalPages}
        className="pagination-next"
        onClick={handleNextPage}
      >
        Next page
      </button>
      <ul className="pagination-list">
        {/* TODO: implement the range here */}
      </ul>
    </nav>
  );
}
