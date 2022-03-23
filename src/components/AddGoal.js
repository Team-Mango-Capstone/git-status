import '../css/AddGoal.css';
import { useState } from 'react';
import { db } from '../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddGoal({ closeModal }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [title, setTitle] = useState('');
  const [goalType, setGoalType] = useState('');

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
        { title, description, deadline, goalType, completed: false }
      );
      setDescription('');
      setTitle('');
      setGoalType('');
      setDeadline('');
      closeModal(false)
    }
  };
  return (
    <div className='add-form-container'>
      <button onClick={() => closeModal(false)}>x</button>
      <form onSubmit={handleSubmit}>
        <h2>My Goals</h2>
        <input
          type='text'
          placeholder='Enter goal...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Enter description...'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type='text'
          placeholder='Enter goal type...'
          value={goalType}
          onChange={(e) => {
            setGoalType(e.target.value);
          }}
        />

        <h3> Deadline</h3>
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
      <button onClick={() => closeModal(false)}>Cancel</button>
    </div>
  );
}

export default AddGoal;
