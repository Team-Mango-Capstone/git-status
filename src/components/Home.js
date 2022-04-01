import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../css/Home.css';
import Timeline from './homeCards/Timeline';
import { TopRepo } from './homeCards/TopRepo';
import { Profile } from './homeCards/Profile';
import DateTime from './homeCards/DateTime.js';
import { Activity } from './homeCards/Activity';
import { updateOrCreateUser } from '../db/Firebase.js';
import { WelcomeModal } from './homeCards/WelcomeModal';
import { collection, query, where, doc, onSnapshot, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../db/Firebase.js';


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
  // const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const githubUsername = localStorage.getItem('screenName');
  const uid = localStorage.getItem('uid');

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
    updateOrCreateUser();
  }, []);

  useEffect(() => {
    // const testerFxn = () => {
      
    const checkIfFirstLogin = async () => {
      let count = 0;
        const currentUserQuery = query(
        collection(db, 'allUsers', uid, 'userGoals')
        // where('id', '==', uid)
        // this query is not the most efficient but this is the only way I could get it to work
        // the code breaks when I include line 62
      );
      onSnapshot(
        currentUserQuery,
        (element) => {
          element.forEach((doc) => {
            if (doc.data().title === 'Account created') {
              count += 1
              console.log('count incremented >>', count)
            }

            // setShowWelcomeModal(true);
            // console.log('doc.data >>>', doc.data().title === null)
            // if (doc.id === uid && doc.data().hasLoggedInBefore === undefined) {
              // addIsFirstLoginField();
              // console.log('addIsFirstLoginField ran...')
              // setShowWelcomeModal(doc.data().isFirstLogin);
            // };
          });
        }
      );
      if (count === 0) {
        console.log('setShowWelcomeModal to be called ....')
        // setShowWelcomeModal(true)
      };
    };
    checkIfFirstLogin();
  // }
  }, []);

  // console.log('showWelcomeModal >>>', showWelcomeModal)

  return (
    <div className='home'>
      {/* <button onClick={testerFxn}>TESTER</button> */}
      {/* {showWelcomeModal ?
        <WelcomeModal setShowWelcomeModal={setShowWelcomeModal}/> : null} */}
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
          <DateTime />
        </div>
      </div>
      <div className='home-cards'>
        <Timeline />
        <div className='bottom-row-cards'>
          <Profile userData={userData} />
          <Activity />
          <TopRepo />
        </div>
      </div>
    </div>
  );
}

export default Home;
