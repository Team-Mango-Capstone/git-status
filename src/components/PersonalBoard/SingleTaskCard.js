import React, { useState } from 'react';
import { db } from '../../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../css/Tasks.css';

function SingleTaskCard({
  task,
  toggleComplete,
  handleDelete,
  handleEditDesc,
}) {
  const [newTitle, setNewTitle] = useState(task.title);

  const handleChangeDesc = (e) => {
    e.preventDefault();
    if (task.completed === true) {
      setNewTitle(task.title);
    } else {
      task.title = '';
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className=''>
      <input
        className=''
        style={{ textDecoration: task.completed && 'line-through' }}
        type='text'
        value={task.title === '' ? newTitle : task.title}
        onChange={(e) => {
          handleChangeDesc(e);
        }}
      />

      <button
        className='button-complete'
        onClick={() => toggleComplete('userTasks', task)}
      >
        done
      </button>

      <button
        className=''
        onClick={() => {
          handleEditDesc(task, newTitle);
        }}
      >
        edit
      </button>

      <button
        className='button-delete'
        onClick={() => handleDelete('userTasks', task.id)}
      >
        X
      </button>
    </div>
  );
}

export default SingleTaskCard;
