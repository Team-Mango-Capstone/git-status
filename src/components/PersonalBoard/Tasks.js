import '../../css/Tasks.css';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { db } from '../../db/Firebase';
import { onSnapshot, query, addDoc, collection } from 'firebase/firestore';
import {
  toggleComplete,
  handleEditTitle,
  handleDelete,
} from '../../db/Firestore';
import SingleTaskCard from './SingleTaskCard';
import { GlobalContext } from '../../context/GlobalState';

function Tasks() {
  // const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const { tasks } = useContext(GlobalContext);
  console.log(tasks)

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(
      collection(
        db,
        'allUsers',
        window.localStorage.getItem('uid'),
        'userTasks'
      ),
      { title, completed: false }
    );
    setTitle('');
  };

  return (
    <div>
      <div className='task-title'>
        <h2>Today's Tasks</h2>
      </div>
    
      <form className='add-task-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter task...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </form>
      <div className='task-container'>
        {tasks.map((task) => (
          <SingleTaskCard
            key={task.id}
            task={task}
            handleSubmit={handleSubmit}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditTitle={handleEditTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
