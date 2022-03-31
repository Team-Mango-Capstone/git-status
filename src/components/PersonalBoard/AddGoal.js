import '../../css/AddGoal.css';
import { useState } from 'react';
import { db } from '../../db/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import FormControl from 'react-bootstrap/FormControl';

function AddGoal({ closeModal }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [title, setTitle] = useState('');

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
          title,
          description,
          deadline,
          goalProgress: 0,
          completed: false,
          deleted: false,
          created: new Date().getTime(),
        }
      );
      setDescription('');
      setTitle('');
      setDeadline('');
      closeModal(false);
    }
  };
  return (
    <div className='add-form-background'>
      <div className='add-form-container'>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='add-goal-deadline'>
            <button
              className='goal-btn-delete'
              onClick={() => closeModal(false)}
            >
              <i className='bi bi-x-circle-fill'></i>
            </button>
            <h5 className='add-goal-title'>Add a Goal</h5>
            <input
              type='text'
              placeholder='Enter goal...'
              pattern='*'
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <FormControl
              className='add-goal-desc-input'
              as='textarea'
              aria-label='With textarea'
              placeholder='Enter goal description....'
              pattern='*'
              required
              style={{ fontSize: '14px' }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <br />
            <h5 className='add-goal-title'>Deadline</h5>
            <input
              type='date'
              placeholder='Enter deadline...'
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />
          </div>

          <button className='add-btn'>Add Goal</button>
        </form>
      </div>
    </div>
  );
}

export default AddGoal;
