import '../css/Goals.css';
import SingleGoalCard from './SingleGoalCard';
import Insights from './Insights';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
} from 'firebase/firestore';
import AddGoal from './AddGoal';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
  q,
} from '../db/Firestore';

function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
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
