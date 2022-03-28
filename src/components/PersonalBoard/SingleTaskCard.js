import React, { useState } from 'react';
import { db } from '../../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../css/Tasks.css';

function SingleTaskCard({
  task,
  toggleComplete,
  handleDelete,
  handleEditTitle,
}) {
  const [newTitle, setNewTitle] = useState(task.title);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (task.completed === true) {
      setNewTitle(task.title);
    } else {
      task.title = '';
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className='tasks'>
      <input
        className='task-input'
        style={{ textDecoration: task.completed && 'line-through' }}
        type='text'
        value={task.title === '' ? newTitle : task.title}
        onChange={(e) => {
          handleChangeTitle(e);
        }}
      />

      <button
        className='task-btn'
        onClick={() => toggleComplete('userTasks', task)}
      >
        <i className="bi bi-check-lg"></i>
      </button>

      <button
        className='task-btn'
        onClick={() => {
          handleEditTitle('userTasks',task, newTitle);
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </button>

      <button
        className='task-btn'
        onClick={() => handleDelete('userTasks', task.id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default SingleTaskCard;
