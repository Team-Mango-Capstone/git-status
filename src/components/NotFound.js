import React from 'react';
import '../css/NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const openText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>error</span>
  );
  const closeText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/error</span>
  );

  return (
    <div className='not-found'>
      <div className='not-found-container'>
        <h1>
          {leftAngleBrace}
          {openText}
          {rightAngleBrace}
          This page does not exist.
          {leftAngleBrace}
          {closeText}
          {rightAngleBrace}
        </h1>
        <button onClick={() => navigate(-1)}>GO BACK</button>
      </div>
    </div>
  );
};

export default NotFound;
