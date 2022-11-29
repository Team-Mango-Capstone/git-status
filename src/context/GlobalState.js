import React, { createContext, useEffect, useState } from 'react';
import { db } from '../db/Firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [currentGoals, setCurrentGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [tasks, setTasks] = useState([]);

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
        where('completed', '==', true)
      );
      const fetchCompletedGoals = onSnapshot(
        completedGoalsQuery,
        (querySnapshot) => {
          let goalsArray = [];
          querySnapshot.forEach((doc) => {
            goalsArray.push({ ...doc.data(), id: doc.id });
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

  return (
    <GlobalContext.Provider
      value={{
        currentGoals,
        completedGoals,
        tasks,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
