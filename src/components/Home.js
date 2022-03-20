// import './css/Home.css';
import {signOut } from '../db/Firebase';
import Navbar from './Navbar';
import { createAda, getUsers, getSingleUser, makeDiana, deleteUser, getGoals } from '../db/Firebase';
import React, { useEffect, useState } from "react";
import axios from 'axios';


const githubUsername = 'dviglucci';

function Home() {
  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState({});
  const [userLanguages, setUserLanguages] = useState({});

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const userData = await axios.get(
          `https://api.github.com/users/${githubUsername}`
        );
        setUserData(userData.data);
        const userRepos = await axios.get(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        setUserRepos(userRepos.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const makeDate = () => {
    const totalDays = (new Date() - new Date(userData.created_at))/86400000;
    const totalYears = Math.floor(totalDays/365);
    const remainderDays = Math.floor(totalDays % 365);

    return (
      `${totalYears} years and ${remainderDays} days`
    )
  }

  // const calculateLanguages = async () => {
  //   console.log('USER LANGUAGES BEFORE >>>>>', userLanguages)
  //   // for each repo in all the user's repos...
  //   for (const repo in userRepos) {
  //     try {
  //       // get the languages in that repo
  //       const repoLanguages = await axios.get(
  //         `https://api.github.com/repos/${githubUsername}/${repo}/languages`
  //       );
  //       for (const language in repoLanguages) {
  //         // if that language is already in our userLanguages piece of state, increment it
  //         if (Object.keys(userLanguages).includes(language)) {
  //           setUserLanguages({ ...userLanguages, [language]:  userLanguages[language] + repoLanguages[language]});
  //         } 
  //         // otherwise, add that language to userLanguages
  //         else {
  //           setUserLanguages({...userLanguages, [language]: repoLanguages[language]})
  //         };
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     };
  //   };
  //   console.log('USER LANGUAGES AFTER >>>>>', userLanguages)
  // }

  // console.log('calculateLanguages >>>', calculateLanguages());

  const checkRateLimit = async () => {
    try {
      const { data } = await axios.get('https://api.github.com/rate_limit');
      console.log('rate limit >>>>>', data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log("check rate limit: ", checkRateLimit())

  return (
    <div className='Home'>
        <Navbar />
        <p>Homepage</p>
        <button onClick={signOut}>Sign Out</button>
        <h1>Welcome {localStorage.getItem('name') !== 'null' ? localStorage.getItem('name') : userData.login}</h1>
        <img src={localStorage.getItem('profilePic')} alt='profile pic' />
        <div>
          You have been a GitHub user for {makeDate()}.
        </div>
        <button onClick={createAda}>Create Ada!!</button>
        <button onClick={getUsers}>Get User</button>
        <button onClick={getSingleUser}>Get Single User</button>
        <button onClick={makeDiana}>Make Diana</button>
        <button onClick={deleteUser}>Delete User</button>
        <button onClick={getGoals}>Get goals</button>
    </div>
  );
}

export default Home;

