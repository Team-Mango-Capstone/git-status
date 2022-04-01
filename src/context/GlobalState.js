import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../db/Firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';

export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  // const [userData, setUserData] = useState([]);
  // const [userRepos, setUserRepos] = useState([]);
  const [currentGoals, setCurrentGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  // const [userLanguages, setUserLanguages] = useState({});

  const uid = window.localStorage.getItem('uid');

  useEffect(() => {
    if (uid) {
      //fetch firebase data
      const currentGoalsQuery = query(
        collection(db, 'allUsers', uid, 'userGoals'),
        where('completed', '==', false)
      );
      const fetchCurrentGoals = onSnapshot(
        currentGoalsQuery,
        (querySnapshot) => {
          let goalsArray = [];
          querySnapshot.forEach((doc) => {
            goalsArray.push({ ...doc.data(), id: doc.id });
          });
          setCurrentGoals(goalsArray);
        }
      );

      const completedGoalsQuery = query(
        collection(db, 'allUsers', uid, 'userGoals'),
        where('completed', '==', true),
      );
      const fetchCompletedGoals = onSnapshot(
        completedGoalsQuery,
        (querySnapshot) => {
          let goalsArray = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().title !== 'Account created') {
              goalsArray.push({ ...doc.data(), id: doc.id });
            };
          });
          setCompletedGoals(goalsArray);
        }
      );

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
      };
    }
  }, []);

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const userData = await axios.get(
  //         `https://api.github.com/users/${githubUsername}`
  //       );
  //       setUserData(userData.data);

  //       const userRepos = await axios.get(
  //         `https://api.github.com/search/repositories?q=user:${githubUsername}+fork:true&per_page=100`
  //       );
  //       setUserRepos(userRepos.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   makeRequest();
  // }, []); 

  return (
    <GlobalContext.Provider
      value={{
        // userRepos,
        // userData,
        currentGoals,
        completedGoals,
        tasks,
        // userLanguages,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
