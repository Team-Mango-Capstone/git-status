import React from 'react';

export function Timeline(props) {
  return (
    <div className='timeline'>
      <h2>Your timeline</h2>
    </div>
  );
}

export function TotalDays(props) {
  return (
    <div className='total-days'>
      <h2>You have been a user for X days.</h2>
    </div>
  );
}

export function UsualCommitTime(props) {
  return (
    <div className='usual-commit-time'>
      <h2>You seem commit the most on (day) at (time).</h2>
    </div>
  );
}

export function TopLanguages(props) {
  return (
    <div className='top-languages'>
      <h2>Most used languages</h2>
    </div>
  );
}
