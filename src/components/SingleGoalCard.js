// import './css/SingleGoalCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

// delete and edit buttons inside single goal card

const SingleGoalCard = () => {
  return (
    <div className='single-goal-card'>
      single goal card
      <button>Delete</button>
      <Link to='/goals/edit/:id'>
        <button>Edit Goal</button>
      </Link>
    </div>
  );
};

export default SingleGoalCard;
