// import React from 'react'
// import { Pagination } from '@material-ui/lab'
// import {makeStyles} from '@material-ui/core'

// const useStyles = makeStyles(theme => ({
//   root: {
//     position: "fixed",
//     bottom: 0,
//     zIndex: 200,
//     backgroundColor: "gray",
//     borderRadius: '15px',
//     padding: "10px 80px",
//     color: "white",
//   },
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white"
//   }
// }))


// const PaginationGoals = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.container}>Pagination
//       <div className={classes.root}>
//         <Pagination style={{
//           display: "flex",
//           justifyContent: 'center'
//         }}variant='outlined' count={10}/>
//       </div>
//     </div>
//   )
// }

// export default PaginationGoals


import React, { useState } from "react";

function usePagination(data, itemsPerPage) {
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

export default usePagination;
