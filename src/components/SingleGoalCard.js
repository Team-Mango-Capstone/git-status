import '../css/SingleGoalCard.css';
import { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

// delete and edit buttons inside single goal card
const SingleGoalCard = ({
  goal,
  toggleComplete,
  handleDelete,
  handleEditDesc,
  handleEditDeadline,
  handleEditTitle,
}) => {
  const [newTitle, setNewTitle] = useState(goal.title);
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
      setNewDeadline(e.target.value);
    }
  };
  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewTitle(goal.title);
    } else {
      goal.title = '';
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className='single-goal-card'>
      <div className='goals-top-container'>
        <button
          className='goal-btn-delete'
          onClick={() => handleDelete(goal.id)}
        >
          <i className='bi bi-x-circle-fill'></i>
        </button>

        <button
          className='button-edit'
          onClick={() => {
            handleEditDesc(goal, newDescription);
            handleEditTitle(goal, newTitle);
            handleEditDeadline(goal, newDeadline);
          }}
        >
          {newTitle !== goal.title || newDescription !== goal.description || newDeadline !== goal.deadline ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      <div className='goal-title-container'>
        <input
          className='goal-title'
          type='text'
          style={{ textDecoration: goal.completed && 'line-through' }}
          value={goal.title === '' ? newTitle : goal.title}
          onChange={(e) => {
            handleChangeTitle(e);
          }}
        />
        <button
          className='goal-btn-complete'
          onClick={() => toggleComplete(goal)}
        >
          <i className='bi bi-check-circle-fill'></i>
        </button>
      </div>

      {/* Change bars */}
      <FormControl
        className='goal-desc-input'
        as='textarea'
        aria-label='With textarea'
        placeholder='Enter goal description....'
        style={{ fontSize: '18px' }}
        value={goal.description === '' ? newDescription : goal.description}
        onChange={(e) => {
          handleChangeDesc(e);
        }}
      />
      <input
        className='date-input'
        type='date'
        value={newDeadline}
        onChange={(e) => {
          handleChangeDeadline(e);
        }}
      />
    </div>
  );
};

export default SingleGoalCard;
