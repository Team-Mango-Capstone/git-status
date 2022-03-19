// import './css/SingleGoalCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

// delete and edit buttons inside single goal card

const SingleGoalCard = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = '';
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className='single-goal-card'>
      {/* single goal card
      <button>Delete</button>
      <Link to='/goals/edit/:id'>
        <button>Edit Goal</button>
      </Link> */}
      <input
        style={{ textDecoration: todo.completed && 'line-through' }}
        type='text'
        value={todo.title === '' ? newTitle : todo.title}
        className='list'
        onChange={handleChange}
      />
      <button className='button-complete' onClick={() => toggleComplete(todo)}>
        Completed?
      </button>
      <button
        className='button-edit'
        onClick={() => handleEdit(todo, newTitle)}
      >
        Edit
      </button>
      <button className='button-delete' onClick={() => handleDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
};

export default SingleGoalCard;
