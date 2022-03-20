// import './css/Home.css';
import { signOut } from "../db/Firebase";
import Navbar from "./Navbar";
import {
  createAda,
  getUsers,
  getSingleUser,
  makeDiana,
  deleteUser,
  getGoals,
} from "../db/Firebase";
import React, { useEffect, useState } from "react";
import axios from "axios";


function Home() {
  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState({});
  const [userLanguages, setUserLanguages] = useState({});
  
  // Set default header for axios requests so that the oAuth access token will be included on all requests
  axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem("accessToken")}`;
  const githubUsername = localStorage.getItem("screenName");

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
    const totalDays = (new Date() - new Date(userData.created_at)) / 86400000;
    const totalYears = Math.floor(totalDays / 365);
    const remainderDays = Math.floor(totalDays % 365);

    return `${totalYears} years and ${remainderDays} days`;
  };

  const calculateLanguages = async () => {
    console.log('USER LANGUAGES BEFORE >>>>>', userLanguages)
    const testingRepos = [userRepos[0].name, userRepos[1].name];
    console.log('testingRepos >>>>', testingRepos)

    // for each repo in all the user's repos...
    for (const repo in testingRepos) {
      // let repoName = repo.name;
      // console.log('repoName >>>>>', repoName)
      try {
        // get the languages in that repo
        const { data } = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${repo}/languages`
        );
        console.log("DATA >>>>", data)
        for (const language in data) {
          // if that language is already in our userLanguages piece of state, increment it
          if (Object.keys(userLanguages).includes(language)) {
            setUserLanguages({ ...userLanguages, [language]:  userLanguages[language] + data[language]});
          }
          // otherwise, add that language to userLanguages
          else {
            setUserLanguages({...userLanguages, [language]: data[language]})
          };
        };
      } catch (error) {
        console.log(error);
      };
    };
    console.log('USER LANGUAGES AFTER >>>>>', userLanguages)

    // const oneRepo = userRepos[0];
    // const repoLanguages = await axios.get(
    //   `https://api.github.com/repos/${githubUsername}/${oneRepo.name}/languages`
    // );

    // console.log('repo languages >>>', repoLanguages.data)
  }

  console.log('calculateLanguages >>>', calculateLanguages());

  // const checkRateLimit = async () => {
  //   try {
  //     const { data } = await axios.get("https://api.github.com/rate_limit");
  //     console.log("rate limit >>>>>", data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log("check rate limit: ", checkRateLimit());

  return (
    <div className="Home">
      <Navbar />
      <p>Homepage</p>
      <button onClick={signOut}>Sign Out</button>
      <h1>
        Welcome{" "}
        {localStorage.getItem("name") !== "null"
          ? localStorage.getItem("name")
          : localStorage.getItem("screenName")}
      </h1>
      <img src={localStorage.getItem("profilePic")} alt="profile pic" />
      <div>You have been a GitHub user for {makeDate()}.</div>
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
