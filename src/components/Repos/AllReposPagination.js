import React, { useState } from 'react';
import { Pagination } from '@material-ui/lab';

export function AllReposPagination({ _DATA, count, setPage, page, PER_PAGE }) {
  if (_DATA) {
    console.log(_DATA.currentData());
  }
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    console.log(p);
  };
  console.log(PER_PAGE);

  return (
    <div className='all-repos-pagination-container'>
      <div className='all-repos-pagination'>
        <Pagination
          count={count}
          size='small'
          page={page}
          variant='outlined'
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}
