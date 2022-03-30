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

  return (
    <div className='total-days'>
      <p>You have been a GitHub user for:</p>
      <p>
        <span style={spanStyle}>{totalYears.toString()}</span> {year} and{' '}
        <span style={spanStyle}>{remainderDays.toString()}</span> {days}
      </p>
    </div>
  );
}
