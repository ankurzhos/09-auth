import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  );
}
