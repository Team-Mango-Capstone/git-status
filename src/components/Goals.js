import '../css/Goals.css';
import SingleGoalCard from './SingleGoalCard';
import Insights from './Insights';
import { useState, useEffect } from 'react';
import { db } from '../db/Firebase';
import {
  onSnapshot,
  query,
  collection
} from 'firebase/firestore';
import AddGoal from './AddGoal';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
} from '../db/Firestore';

function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const q = query(collection(db,"allUsers", window.localStorage.getItem('uid'), 'userGoals'))
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
      <AddGoal />
      <div className='goal_container'>
        {goals.map((goal) => (
          <SingleGoalCard
            key={goal.id}
            goal={goal}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditDesc={handleEditDesc}
            handleEditDeadline={handleEditDeadline}
          />
        ))}
      </div>
      <Insights />
    </div>
  );
}

export default Goals;
