import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

const dummyData = [
    {
        HTML: 1,
        CSS: 1,
        Javascript: 1,
    },
    {
        HTML: 1,
        CSS: 1,
        Javascript: 1,
    },
    {
        HTML: 1,
        CSS: 1,
        Javascript: 1,
    },
]


export function TopLanguages(props) {
    const [userLanguages, setUserLanguages] = useState({});
  
    //console.log("PROPS >>>>>", props.userRepos.items);
  
    useEffect(() => {
      const calculateLanguages = async () => {
        props.userRepos.items.map(async (repo) => {
            //dummyData.map(async (data) => {
          try {
            const { data } = await axios.get(
              `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
            );
            // console.log('DATA >>>>', data)
            for (const language in data) {
              console.log('LANGUAGE >>>>', language)  
              let newObj = {};
              //if language is already in our userLanguages piece of state, increment it
              if (Object.keys(userLanguages).includes(language)) {
                newObj[language] = userLanguages[language] + data[language];
                let updatedLangs = Object.assign(userLanguages, newObj);
                setUserLanguages(updatedLangs);
                console.log('user languages was set .....', userLanguages)
              }
              // otherwise, add that language to userLanguages
              else {
                newObj[language] = data[language];
                let updatedLangs = Object.assign(userLanguages, newObj);
                setUserLanguages(updatedLangs);
                console.log('user languages was set .....', userLanguages)
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
    }, [props.userRepos.items]);
  
    return (
      <div className="top-languages">
        <h2>Most used languages</h2>
        <div></div>
      </div>
    );
  }
  