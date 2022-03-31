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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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
    const checkIfFirstLogin = async () => {
        const currentUserQuery = query(
        collection(db, 'allUsers')
        // where('id', '==', uid)
      );
      onSnapshot(
        currentUserQuery,
        (element) => {
          element.forEach((doc) => {
            if (doc.id === uid) {
              setShowWelcomeModal(doc.data().isFirstLogin);
            };
          });
        }
      );
  
      // const docSnap = await getDoc(q);
      // console.log('docSnap >>>', docSnap)
  
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // };

    };
    checkIfFirstLogin();

  }, []);

  return (
    <div className='home'>
      {showWelcomeModal ?
        <WelcomeModal setShowWelcomeModal={setShowWelcomeModal}/> : null}
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
