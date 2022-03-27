import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../db/Firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';

export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
    const [userData, setUserData] = useState([]);
    const [userRepos, setUserRepos] = useState([]);
    const githubUsername = localStorage.getItem('screenName');
    const [currentGoals, setCurrentGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const uid = window.localStorage.getItem('uid');

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
  
    const [userLanguages, setUserLanguages] = useState({});
    const repoArr = userRepos.items || [];

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

    }, [userRepos.items]);

    useEffect(() => {
      const q = query(
        collection(db, 'allUsers', uid, 'userGoals'),
        where('completed', '==', false)
      );
      const fetchData = onSnapshot(q, (querySnapshot) => {
        let goalsArray = [];
        querySnapshot.forEach((doc) => {
          goalsArray.push({ ...doc.data(), id: doc.id });
        });
        setCurrentGoals(goalsArray);
      });
  
      const q2 = query(
        collection(db, 'allUsers', uid, 'userGoals'),
        where('completed', '==', true)
      );
      const fetchCompletedData = onSnapshot(q2, (querySnapshot) => {
        let goalsArray = [];
        querySnapshot.forEach((doc) => {
          goalsArray.push({ ...doc.data(), id: doc.id });
        });
        setCompletedGoals(goalsArray);
      });
  
      return () => {
        fetchData();
        fetchCompletedData();
      };
    }, []);


    return (
      <GlobalContext.Provider
        value={{userRepos, userData, userLanguages, currentGoals, completedGoals}}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  };
  