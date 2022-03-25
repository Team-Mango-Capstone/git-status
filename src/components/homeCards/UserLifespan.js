import React from 'react';
import '../../css/Profile.css';

export function UserLifespan(props) {
  const spanStyle = { color: '#58a6ff' };

  const totalDays =
    (new Date() - new Date(props.userData.created_at)) / 86400000;
  const totalYears = Math.floor(totalDays / 365);
  const remainderDays = Math.floor(totalDays % 365);
  const year = totalYears === 1 ? 'year' : 'years';
  const days = remainderDays === 1 ? 'day' : 'days';

  // ${totalYears} ${year} and ${remainderDays} ${days}

  return (
    <div className='total-days'>
      <h2>
        You have been a GitHub user for: <br />{' '}
        <span style={spanStyle}>{totalYears}</span> {year} and{' '}
        <span style={spanStyle}>{remainderDays}</span> {days}
      </h2>
    </div>
  );
}
