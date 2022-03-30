import React, { useState } from 'react';
import { Pagination } from '@material-ui/lab';
import '../../css/Pagination.css';

export function PaginationGoals({
  DATA_CURRENT,
  DATA_COMPLETED,
  countCurrent,
  countCompleted,
  setPage,
  page,
  status,
}) {
  const handleChangeCurrent = (e, p) => {
    setPage(p);
    DATA_CURRENT.jump(p);
    console.log(p);
    console.log(status);
  };

  const handleChangeCompleted = (e, p) => {
    setPage(p);
    DATA_COMPLETED.jump(p);
    console.log(p);
    console.log(status);
  };

  return (
    <div className='goals-pagination'>
      <Pagination
        count={status ? countCurrent : countCompleted}
        size='small'
        page={page}
        variant='outlined'
        onChange={status ? handleChangeCurrent : handleChangeCompleted}
      />
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
