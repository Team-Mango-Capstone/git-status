import '../css/Elements.css';

export const loading = (
  <div className='loading'>
    <div className='loading-container'>
      <img src='/loading-circle.gif' alt='' />
      <h2>Fetching data...</h2>
    </div>
  </div>
);

// RIP dummy thicc loader. u will be missed

// export const loading = (
//   <div className='loading'>
//     <div className='loading-container'>
//       <img src='capoo-blue.gif' alt='' />
//       <h2>
//         data too DUMMY THICC!!
//         <br /> PLZ WAIT
//       </h2>
//     </div>
//   </div>
// );

export const loadingCard = (
  <div className='loading-card'>
    <img src='/loading-circle.gif' alt='' />
  </div>
);
