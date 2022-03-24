import '../css/AddGoal.css';
import { useState } from 'react';
import { db } from '../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import FormControl from 'react-bootstrap/FormControl';

function AddGoal({ closeModal }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [title, setTitle] = useState('');
  const [goalProgress, setGoalProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description !== '') {
      await addDoc(
        collection(
          db,
          'allUsers',
          window.localStorage.getItem('uid'),
          'userGoals'
        ),
        { title, description, deadline, goalProgress: 0, completed: false }
      );
      setDescription('');
      setTitle('');
      setGoalProgress(0);
      setDeadline('');
      closeModal(false);
    }
  };
  return (
    <div className='add-form-container'>
      <button className='goal-btn-delete' onClick={() => closeModal(false)}>
        {' '}
        <i className='bi bi-x-circle-fill'></i>
      </button>
      <form className="form-container" onSubmit={handleSubmit}>
        <h4> Add a Goal</h4>
        <input
          type='text'
          placeholder='Enter goal...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <FormControl
        className='add-goal-desc-input'
        as='textarea'
        aria-label='With textarea'
        placeholder='Enter goal description....'
        style={{ fontSize: '16px' }}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

         <br/>
        <h4> Deadline</h4>
        <input
          type='date'
          placeholder='Enter deadline...'
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
        />
        <button className='add-btn'>Add Goal</button>
      </form>

    </div>
  );
}

export default AddGoal;
