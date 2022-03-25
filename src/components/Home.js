import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { MostProductive } from './homeCards/MostProductive';
import { TopLanguages } from './homeCards/TopLanguages';
import { Timeline } from './homeCards/Timeline';
import { TopRepo } from './homeCards/TopRepo';
import { Profile } from './homeCards/Profile';
import { Notifications } from './homeCards/Notifications';

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

  const [userData, setUserData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const githubUsername = localStorage.getItem('screenName');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const userData = await axios.get(
          `https://api.github.com/users/${githubUsername}`
        );
        setUserData(userData.data);

        const userRepos = await axios.get(
          `https://api.github.com/search/repositories?q=user:${githubUsername}+fork:true&per_page=100`
        );
        setUserRepos(userRepos.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className='home'>
      <div className='welcome'>
        <h1>
          {leftAngleBrace}
          {openText}
          {rightAngleBrace}
          {localStorage.getItem('name') !== 'null'
            ? localStorage.getItem('name')
            : localStorage.getItem('screenName')}
          {leftAngleBrace}
          {closeText}
          {rightAngleBrace}
        </h1>
        <div className='time'>
          <h1>Day / Time</h1>
        </div>
      </div>
      <div className='home-cards'>
        <div className='timeline'>
          <h1>Your Timeline</h1>
        </div>
        {/* <Timeline /> */}

        {/* <MostProductive userRepos={userRepos}/> */}
        <div className='bottom-charts'>
          <Profile userData={userData} />
          <TopRepo />
          <TopLanguages userRepos={userRepos} />
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Home;
