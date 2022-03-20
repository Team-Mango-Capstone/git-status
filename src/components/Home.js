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
  const [userData, setUserData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [userLanguages, setUserLanguages] = useState({});

  // Set default header for axios requests so that the oAuth access token will be included on all requests
  axios.defaults.headers.common[
    "Authorization"
  ] = `token ${localStorage.getItem("accessToken")}`;
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
    userRepos.map(async (repo) => {
      try {
        const { data } = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
        );
        for (const language in data) {
          let newObj = {};
          //if language is already in our userLanguages piece of state, increment it
          if (Object.keys(userLanguages).includes(language)) {
            newObj[language] = userLanguages[language] + data[language];
            let updatedLangs = Object.assign({}, userLanguages, newObj);
            setUserLanguages(updatedLangs);
          }
          // otherwise, add that language to userLanguages
          else {
            newObj[language] = data[language];
            let updatedLangs = Object.assign(userLanguages, newObj);
            setUserLanguages(updatedLangs);
          };
        };
        return;
      } catch (error) {
        console.log(error);
      };
    });
  };

  const checkRateLimit = async () => {
    try {
      const { data } = await axios.get("https://api.github.com/rate_limit");
      console.log("rate limit >>>>>", data);
    } catch (err) {
      console.log(err);
    }
  };

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
      <button onClick={calculateLanguages}>calculate languages</button>
      <button onClick={() => console.log('userLanguages >>>>>', userLanguages)}>see user languages</button>
      <button onClick={checkRateLimit}>check rate limit</button>
    </div>
  );
}

export default Home;
