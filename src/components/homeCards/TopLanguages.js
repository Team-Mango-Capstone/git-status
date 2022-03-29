import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
const githubUsername = localStorage.getItem('screenName');

export function TopLanguages(props) {
  const [userLanguages, setUserLanguages] = useState({});

  let result = useContext(GlobalContext);
  console.log(result);

  // const repoArr = props.userRepos.items; // gets array of all users repos from props
  // useEffect(() => {
  //   const calculateLanguages = () => {
  //     repos &&
  //       repos.map(async (repo) => {
  //         // map over repos array
  //         try {
  //           const { data } = await axios.get(
  //             // axios call to retrieve all languages from every users repos
  //             `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
  //           );
  //           for (let language in data) {
  //             // loop within the object for language
  //             let newObj = {};
  //             //if language is already in our userLanguages piece of state, increment it
  //             if (Object.keys(userLanguages).includes(language)) {
  //               newObj[language] = userLanguages[language] + data[language];
  //               let updatedLangs = Object.assign(userLanguages, newObj);
  //               setUserLanguages(updatedLangs);
  //             }
  //             // otherwise, add that language to userLanguages
  //             else {
  //               newObj[language] = data[language];
  //               let updatedLangs = Object.assign(userLanguages, newObj);
  //               setUserLanguages(updatedLangs);
  //             }
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       });
  //   };
  //   calculateLanguages();
  //   // localStorage.setItem('userLanguages', JSON.stringify(userLanguages));
  // }, [repos]);

  // console.log('userLanguages >>>>>', userLanguages);
  // const langs = localStorage.getItem('userLanguages', userLanguages);
  // const userL = JSON.parse(langs);
  //   console.log(userL);

  // const languageList = Object.entries(userLanguages).map(([key, value]) => {
  //   return (
  //     <div className='top-user-languages' key={value}>
  //       <h3>
  //         {key} : {value.toString()}
  //       </h3>
  //     </div>
  //   );
  // });

  return (
    <div className='top-languages'>
      <h2>Most used languages</h2>
      {/* {userLanguages ? languageList : <div>Fuck</div>} */}
    </div>
  );
}
