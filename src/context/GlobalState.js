import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
    const [userData, setUserData] = useState([]);
    const [userRepos, setUserRepos] = useState([]);
    const githubUsername = localStorage.getItem('screenName');

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
    }, []); //we pass state since we're accessing it
  
    return (
      <GlobalContext.Provider
        value={{userRepos, userData}}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  };
  