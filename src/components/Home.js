import React from 'react';
import '../css/Home.css';
import {
  Timeline,
  TotalDays,
  TopLanguages,
  UsualCommitTime,
} from './HomeCards';

function Home() {
  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const openText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>welcome</span>
  );
  const closeText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/welcome</span>
  );

  return (
    <div className='home'>
      <h1>
        {leftAngleBrace}
        {openText}
        {rightAngleBrace}
        {localStorage.getItem('name')}
        {leftAngleBrace}
        {closeText}
        {rightAngleBrace}
      </h1>
      {/* <img src={localStorage.getItem('profilePic')} alt='profile pic' /> */}
      <div className='home-cards'>
        <Timeline />
        <TotalDays />
        <TopLanguages />
        <UsualCommitTime />
      </div>
    </div>
  );
}

export default Home;
