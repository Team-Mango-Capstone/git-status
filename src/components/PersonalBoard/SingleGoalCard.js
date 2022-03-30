import '../../css/SingleGoalCard.css';
import { useState, useContext } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { GlobalContext } from '../../context/GlobalState';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

// delete and edit buttons inside single goal card
const SingleGoalCard = ({
  goal,
  toggleComplete,
  handleDelete,
  handleEditDesc,
  handleEditDeadline,
  handleEditTitle,
  handleEditProgress,
  handlePseudoDelete,
  toggle,
}) => {
  const [newTitle, setNewTitle] = useState(goal.title);
  const [newDescription, setNewDescription] = useState(goal.description);
  const [newDeadline, setNewDeadline] = useState(goal.deadline);
  const [progress, setProgress] = useState(goal.goalProgress);

  const handleChangeDesc = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewDescription(goal.description);
    } else {
      goal.description = '';
      console.log(e.target.value);
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

  const deleteHelper = (collection, goal) => {
    console.log('inside deleteHelper...');
    if (goal.completed === true) {
      handlePseudoDelete(goal.id);
    } else handleDelete(collection, goal.id);
  };

  return (
    <div className='single-goal-card'>
      <div className='goals-top-container'>
        <button
          className='goal-btn-delete'
          onClick={() => deleteHelper('userGoals', goal)}
        >
          <i className='bi bi-x-circle-fill'></i>
        </button>

        <button
          className='button-edit'
          onClick={() => {
            handleEditDesc('userGoals', goal, newDescription);
            handleEditTitle('userGoals', goal, newTitle);
            handleEditDeadline('userGoals', goal, newDeadline);
            handleEditProgress('userGoals', goal, progress);
          }}
        >
          {newTitle !== goal.title ||
          progress !== goal.goalProgress ||
          newDescription !== goal.description ||
          newDeadline !== goal.deadline
            ? 'Save Changes'
            : 'Edit'}
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
          onClick={() => {
            if (!goal.completed) {
              toggle();
            }
            toggleComplete('userGoals', goal);
          }}
        >
          <i className='bi bi-check-circle-fill'></i>
        </button>
      </div>

      <div className='progression'>
        {/* Change bars */}
        <label>Progression: {progress}%</label>
        <RangeSlider
          className='progression-slider'
          variant={'info'}
          size={'lg'}
          value={progress}
          tooltipLabel={(currentValue) => `${currentValue}%`}
          onChange={(e) => {
            setProgress(e.target.value);
          }}
        />
      </div>

      <div className='description'>
        <label>Description:</label>
        <FormControl
          className='goal-desc-input'
          as='textarea'
          aria-label='With textarea'
          placeholder='Enter goal description....'
          style={{ fontSize: '14px' }}
          value={goal.description === '' ? newDescription : goal.description}
          onChange={(e) => {
            handleChangeDesc(e);
          }}
        />
      </div>

      <div className='due-date'>
        <label>Due Date:</label>
        <input
          className='date-input'
          type='date'
          value={newDeadline}
          onChange={(e) => {
            handleChangeDeadline(e);
          }}
        />
      </div>
    </div>
  );
};

export default SingleGoalCard;
