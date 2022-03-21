import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");


export function TopLanguages(props) {
    const [userLanguages, setUserLanguages] = useState({});
  
    //console.log("PROPSSSSSSSS", props.userRepos.items);
    // console.log('LANGUAGES BEFORE>>>>>', userLanguages)
    let allRepos = props.userRepos.items;
    console.log('allRepos >>>>>', allRepos);
  
    useEffect(() => {
      const calculateLanguages = async () => {
        allRepos.map(async (repo) => {
          try {
            const { data } = await axios.get(
              `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
            );
            console.log('DATA >>>>', data)
            for (const language in data) {
              let newObj = {};
              //if language is already in our userLanguages piece of state, increment it
              if (Object.keys(userLanguages).includes(language)) {
                newObj[language] = userLanguages[language] + data[language];
                let updatedLangs = Object.assign({}, userLanguages, newObj);
                console.log('updatedLangs', updatedLangs)
                setUserLanguages(updatedLangs);
              }
              // otherwise, add that language to userLanguages
              else {
                newObj[language] = data[language];
                let updatedLangs = Object.assign(userLanguages, newObj);
                console.log('updatedLangs', updatedLangs)
                setUserLanguages(updatedLangs);
              }
            }
            // return;
          } catch (error) {
            console.log(error);
          }
        });
      };
      calculateLanguages();
      console.log('LANGUAGES AFTER>>>>>', userLanguages)
    }, []);
  
    return (
      <div className="top-languages">
        <h2>Most used languages</h2>
        <div></div>
      </div>
    );
  }
  