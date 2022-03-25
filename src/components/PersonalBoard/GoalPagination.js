import React, { useState } from "react";
import { Pagination } from '@material-ui/lab'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "rgb(139, 139, 139)",
    borderRadius: '30px',
    padding: "7px 30px",
    color: "white",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  }
}))

export function PaginationGoals({_DATA, count, setPage, page, PER_PAGE}){
  const classes = useStyles();

  if(_DATA){
    console.log(_DATA.currentData())
  }
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    console.log(p)
  };
  console.log(PER_PAGE)

  return (
    <div className={classes.container}>
      <div className={classes.root}>
      <Pagination
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            count={count}
            size="small"
            page={page}
            variant="outlined"
            onChange={handleChange}
          />
      </div>
    </div>
  )
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
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}
