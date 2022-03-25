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
  handleEditProgress
}) => {
  const [newTitle, setNewTitle] = useState(goal.title);
  const [newDescription, setNewDescription] = useState(goal.description);
  const [newDeadline, setNewDeadline] = useState(goal.deadline);
  const [progress, setProgress ] = useState(goal.goalProgress); 

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
// let resultFromContext = useContext(GlobalContext)
// console.log('MY RESULTS FROM CONTEXT API',resultFromContext)
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
            handleEditProgress(goal, progress)
          }}
        >  
          {newTitle !== goal.title || progress !== goal.goalProgress || newDescription !== goal.description || newDeadline !== goal.deadline ? 'Save Changes' : 'Edit'}
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
      <label>Progression: {progress}%</label>
     <RangeSlider
      variant={'info'}
      size={'lg'}
      value={progress}
      tooltipLabel={currentValue => `${currentValue}%`}
      // tooltip='on'
      onChange={(e) => {
        setProgress(e.target.value)
      }}
    />
    <br/>

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
  );
};

export default SingleGoalCard;
