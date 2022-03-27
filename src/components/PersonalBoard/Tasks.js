import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../../db/Firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
  handleEditTitle,
  handleEditProgress,
} from '../../db/Firestore';
import SingleTaskCard from './SingleTaskCard';

function Tasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db,"allUsers", window.localStorage.getItem('uid'), 'userTasks'))
      const fetchData = onSnapshot(q, (querySnapshot) => {
        let tasksArray = [];
        querySnapshot.forEach((doc) => {
         tasksArray.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksArray);
      });
      return () => fetchData();
  }, []);


  return (
    <div>
        <div className='goal_container'>
        {tasks.map((task) => (
          <SingleTaskCard
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditDesc={handleEditDesc}
            handleEditDeadline={handleEditDeadline}
          />
        ))}
      </div>
    </div>

  )
}

export default Tasks