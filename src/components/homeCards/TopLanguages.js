import React, { useState, useEffect } from 'react';
import axios from 'axios';

const githubUsername = localStorage.getItem('screenName');

export function TopLanguages(props) {
  const [userLanguages, setUserLanguages] = useState({});

  const repoArr = props.userRepos.items || [];

  useEffect(() => {
    const calculateLanguages = async () => {
      repoArr.map(async (repo) => {
        try {
          const { data } = await axios.get(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
          );
          for (const language in data) {
            let newObj = {};
            //if language is already in our userLanguages piece of state, increment it
            if (Object.keys(userLanguages).includes(language)) {
              newObj[language] = userLanguages[language] + data[language];
              let updatedLangs = Object.assign(userLanguages, newObj);
              setUserLanguages(updatedLangs);
            }
            // otherwise, add that language to userLanguages
            else {
              newObj[language] = data[language];
              let updatedLangs = Object.assign(userLanguages, newObj);
              setUserLanguages(updatedLangs);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    calculateLanguages();
    console.log('userLanguages >>>>>', userLanguages);
  }, [props.userRepos.items]);

  return (
    <div className='top-languages'>
      <h2>Most used languages</h2>
      <div></div>
    </div>
  );
}
