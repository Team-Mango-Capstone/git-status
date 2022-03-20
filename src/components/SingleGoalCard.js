// import './css/SingleGoalCard.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// delete and edit buttons inside single goal card

const SingleGoalCard = ({ goal, toggleComplete, handleDelete, handleEditDesc, handleEditDeadline }) => {
  const [newDescription, setNewDescription] = useState(goal.description);
  const [newDeadline, setNewDeadline] = useState(goal.deadline);

  const handleChangeDesc = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewDescription(goal.description);
    } else {
      goal.description = '';
      setNewDescription(e.target.value);
    }
  };

  const handleChangeDeadline = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewDeadline(goal.deadline);
    } else {
      goal.deadline = '';
      setNewDeadline(e.target.value);
    }
  };

  return (
    <div className='single-goal-card'>
      <input
        style={{ textDecoration: goal.completed && 'line-through' }}
        type='text'
        value={goal.description === '' ? newDescription : goal.description}
        className='list'
        onChange={handleChangeDesc}
      />
        <input
        type='date'
        value={goal.deadline === '' ? newDeadline : goal.deadline}
        className='list'
        onChange={handleChangeDeadline}
      />

      <button className='button-complete' onClick={() => toggleComplete(goal)}>
      <FontAwesomeIcon icon={faCircleCheck} />
      </button>

      <button
        className='button-edit'
        onClick={() => {
          handleEditDesc(goal, newDescription)
          handleEditDeadline(goal, newDeadline)
        }}
      >
       <FontAwesomeIcon icon={faPenToSquare}/>
      </button>

      <button className='button-delete' onClick={() =>handleDelete(goal.id)}>
      <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default SingleGoalCard;
