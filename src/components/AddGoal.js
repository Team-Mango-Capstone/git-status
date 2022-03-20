// import './css/AddGoal.css';
import { useState } from 'react';
import { db } from '../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddGoal() {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

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
        {
          description,
          deadline,
          completed: false,
        }
      );
      setDescription('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='input_container'>
        <h2>My Goals</h2>
        <input
          type='text'
          placeholder='Enter goal...'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
          <h2> Deadline</h2>
        <input
          type='date'
          placeholder='Enter deadline...'
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
        />
        <button>Add Goal</button>
      </div>

      {/* <div className='btn_container'></div> */}
   
    </form>
  );
}

export default AddGoal;
