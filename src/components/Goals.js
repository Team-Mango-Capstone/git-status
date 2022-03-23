import '../css/Goals.css';
import SingleGoalCard from './SingleGoalCard';
import Insights from './Insights';
import { useState, useEffect } from 'react';
import { db } from '../db/Firebase';
import { onSnapshot, query, collection } from 'firebase/firestore';
import AddGoal from './AddGoal';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
  handleEditTitle,
} from '../db/Firestore';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const q = query(
      collection(
        db,
        'allUsers',
        window.localStorage.getItem('uid'),
        'userGoals'
      )
    );
    const fetchData = onSnapshot(q, (querySnapshot) => {
      let goalsArray = [];
      querySnapshot.forEach((doc) => {
        goalsArray.push({ ...doc.data(), id: doc.id });
      });
      setGoals(goalsArray);
    });
    return () => fetchData();
  }, []);

  return (
    <div className='goals'>
      <button className='add-btn' onClick={() => setOpenModal(true)}>
        Add Goal
      </button>
      {openModal && <AddGoal closeModal={setOpenModal}/>}
      {console.log(openModal)}
      <div className={openModal === true ? 'goal-hover' : 'goal-container'}>
        {goals.map((goal) => (
          <SingleGoalCard
            key={goal.id}
            goal={goal}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditDesc={handleEditDesc}
            handleEditDeadline={handleEditDeadline}
            handleEditTitle={handleEditTitle}
          />
        ))}
      </div>
      <Insights />
    </div>
  );
}

export default Goals;
