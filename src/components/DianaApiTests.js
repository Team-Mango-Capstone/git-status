// // import './css/Home.css';
// import { signOut } from "../db/Firebase";
// import Navbar from "./Navbar";
// import {
//   createAda,
//   getUsers,
//   getSingleUser,
//   makeDiana,
//   deleteUser,
//   getGoals,
// } from "../db/Firebase";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function NOTHome() {
//   const [userData, setUserData] = useState([]);
//   const [userRepos, setUserRepos] = useState([]);
//   const [userLanguages, setUserLanguages] = useState({});
//   // const [userContributions, setUserContributions] = useState([]);
//   const githubUsername = localStorage.getItem("screenName");

//   // Set default header for axios requests so that the oAuth access token will be included on all requests
//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `token ${localStorage.getItem("accessToken")}`;

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         const userData = await axios.get(
//           `https://api.github.com/users/${githubUsername}`
//         );
//         setUserData(userData.data);

//         const userRepos = await axios.get(
//           `https://api.github.com/users/${githubUsername}/repos`
//         );
//         setUserRepos(userRepos.data);

//         // let currentYear = new Date().getFullYear();
//         // let currentWeek = weekFinder();
//         // const allContributionsLastYear = await axios.get(
//         //   `https://skyline.github.com/${githubUsername}/${currentYear - 1}.json`
//         // );
//         // const allContributionsThisYear = await axios.get(
//         //   `https://skyline.github.com/${githubUsername}/${currentYear}.json`
//         // );
//         // allContributionsLastYear.filter(
//         //   (element) => element.week > currentWeek
//         // );
//         // allContributionsThisYear.filter(
//         //   (element) => element.week <= currentWeek
//         // );
//         // const contributionsPastYear = allContributionsLastYear.concat(
//         //   allContributionsThisYear
//         // );
//         // setUserContributions(contributionsPastYear);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     makeRequest();
//   }, []);

//   const weekFinder = () => {
//     let currentdate = new Date();
//     let oneJan = new Date(currentdate.getFullYear(), 0, 1);
//     let numberOfDays = Math.floor(
//       (currentdate - oneJan) / (24 * 60 * 60 * 1000)
//     );
//     let result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
//     return result;
//   };

//   const makeDate = () => {
//     const totalDays = (new Date() - new Date(userData.created_at)) / 86400000;
//     const totalYears = Math.floor(totalDays / 365);
//     const remainderDays = Math.floor(totalDays % 365);

//     return `${totalYears} years and ${remainderDays} days`;
//   };

//   async function searchRepos() {
//     try {
//       const { data } = await axios.get(`https://api.github.com/search/repositories?q=user:dviglucci is:public`)
//       // data returns an array with list of commits.
//       console.log("this is the data from Search Repos", data)
//     }
//     catch (err) {
//       console.log("error")
//     }
//   }

//   const calculateLanguages = async () => {
//     userRepos.map(async (repo) => {
//       try {
//         const { data } = await axios.get(
//           `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
//         );
//         for (const language in data) {
//           let newObj = {};
//           //if language is already in our userLanguages piece of state, increment it
//           if (Object.keys(userLanguages).includes(language)) {
//             newObj[language] = userLanguages[language] + data[language];
//             let updatedLangs = Object.assign({}, userLanguages, newObj);
//             setUserLanguages(updatedLangs);
//           }
//           // otherwise, add that language to userLanguages
//           else {
//             newObj[language] = data[language];
//             let updatedLangs = Object.assign(userLanguages, newObj);
//             setUserLanguages(updatedLangs);
//           }
//         }
//         return;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   };

//   const checkRateLimit = async () => {
//     try {
//       const { data } = await axios.get("https://api.github.com/rate_limit");
//       console.log("rate limit >>>>>", data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="Home">
//       <Navbar />
//       <p>Homepage</p>
//       <button onClick={signOut}>Sign Out</button>
//       <h1>
//         Welcome{" "}
//         {localStorage.getItem("name") !== "null"
//           ? localStorage.getItem("name")
//           : localStorage.getItem("screenName")}
//       </h1>
//       <img src={localStorage.getItem("profilePic")} alt="profile pic" />
//       <div>You have been a GitHub user for {makeDate()}.</div>
//       <button onClick={createAda}>Create Ada!!</button>
//       <button onClick={getUsers}>Get User</button>
//       <button onClick={getSingleUser}>Get Single User</button>
//       <button onClick={makeDiana}>Make Diana</button>
//       <button onClick={deleteUser}>Delete User</button>
//       <button onClick={getGoals}>Get goals</button>
//       <button onClick={calculateLanguages}>calculate languages</button>
//       <button onClick={() => console.log("userLanguages >>>>>", userLanguages)}>
//         see user languages
//       </button>
//       <button onClick={checkRateLimit}>check rate limit</button>
//       <button onClick={searchRepos}>search repos</button>
//     </div>
//   );
// }

// export default NOTHome;
