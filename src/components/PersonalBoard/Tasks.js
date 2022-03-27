import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../db/Firebase';
import { onSnapshot, query, addDoc, collection } from 'firebase/firestore';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
} from '../../db/Firestore';
import SingleTaskCard from './SingleTaskCard';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(
      collection(
        db,
        'allUsers',
        window.localStorage.getItem('uid'),
        'userTasks'
      ),
      { title }
    );
    setTitle('');
  };

  useEffect(() => {
    const q = query(
      collection(
        db,
        'allUsers',
        window.localStorage.getItem('uid'),
        'userTasks'
      )
    );
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
      <div className='task-title'>
      <button className={'status-btn-active'}>
        <h4>Tasks</h4>
      </button>
      </div>
    
      <form className='add-task-form' onSubmit={handleSubmit}>
        <button> add task</button>
        <input
          type='text'
          placeholder='Enter task...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </form>
      <div className='goal_container'>
        {tasks.map((task) => (
          <SingleTaskCard
            key={task.id}
            task={task}
            handleSubmit={handleSubmit}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditDesc={handleEditDesc}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
