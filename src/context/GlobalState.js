import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../db/Firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';

export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
    const [userData, setUserData] = useState([]);
    const [userRepos, setUserRepos] = useState([]);
    const [currentGoals, setCurrentGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [tasks, setTasks] = useState([]);

    const githubUsername = localStorage.getItem('screenName');
    const uid = window.localStorage.getItem('uid');

    useEffect(() => {
      if(uid){
        const makeRequest = async () => {
         
              const userData = await axios.get(
                `https://api.github.com/users/${githubUsername}`
              );
              setUserData(userData.data);
      
              const userRepos = await axios.get(
                `https://api.github.com/search/repositories?q=user:${githubUsername}+fork:true+archived:false&per_page=100`
              );
              setUserRepos(userRepos.data);
             
          };
          //fetch firebase data
            const currentGoalsQuery = query(
              collection(db, 'allUsers', uid, 'userGoals'),
              where('completed', '==', false)
            );
            const fetchCurrentGoals = onSnapshot(currentGoalsQuery, (querySnapshot) => {
              let goalsArray = [];
              querySnapshot.forEach((doc) => {
                goalsArray.push({ ...doc.data(), id: doc.id });
              });
              setCurrentGoals(goalsArray);
            });
        
            const completedGoalsQuery = query(
              collection(db, 'allUsers', uid, 'userGoals'),
              where('completed', '==', true)
            );
            const fetchCompletedGoals = onSnapshot(completedGoalsQuery, (querySnapshot) => {
              let goalsArray = [];
              querySnapshot.forEach((doc) => {
                goalsArray.push({ ...doc.data(), id: doc.id });
              });
              setCompletedGoals(goalsArray);
            });
  
            const tasksQuery = query(
              collection(
                db,
                'allUsers',
                window.localStorage.getItem('uid'),
                'userTasks'
              )
            );
            const fetchTasks = onSnapshot(tasksQuery, (querySnapshot) => {
              let tasksArray = [];
              querySnapshot.forEach((doc) => {
                tasksArray.push({ ...doc.data(), id: doc.id });
              });
              setTasks(tasksArray);
            });

            return () => {
              fetchCurrentGoals();
              fetchCompletedGoals();
              fetchTasks();
              makeRequest();
            };
          }
          
    }, []); 
  
    // const [userLanguages, setUserLanguages] = useState({});
    // const repoArr = userRepos.items || [];

    // useEffect(() => {
    //   const calculateLanguages = async () => {
    //     repoArr.map(async (repo) => {
    //       try {
    //         const { data } = await axios.get(
    //           `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
    //         );
    //         for (const language in data) {
    //           let newObj = {};
    //           //if language is already in our userLanguages piece of state, increment it
    //           if (Object.keys(userLanguages).includes(language)) {
    //             newObj[language] = userLanguages[language] + data[language];
    //             let updatedLangs = Object.assign(userLanguages, newObj);
    //             setUserLanguages(updatedLangs);
    //           }
    //           // otherwise, add that language to userLanguages
    //           else {
    //             newObj[language] = data[language];
    //             let updatedLangs = Object.assign(userLanguages, newObj);
    //             setUserLanguages(updatedLangs);
    //           }
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     });
    //   };
    //   calculateLanguages();

    // }, [userRepos.items]);
    console.log(userRepos)

    return (
      <GlobalContext.Provider
        value={{userRepos, userData, currentGoals, completedGoals, tasks}}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  };
  