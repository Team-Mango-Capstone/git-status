// import './css/Goals.css';
import { Link } from 'react-router-dom';
import SingleGoalCard from './SingleGoalCard';
import Insights from './Insights';
import { db } from "../db/Firebase";
import {useState, useEffect} from 'react'
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// links to add goal form
import AddGoal from './AddGoal';

function Goals() {
  const [goals, setGoals] = useState([]);
 
  useEffect(() => {
    const q = query(collection(db,"allUsers", window.localStorage.getItem('uid'), 'userGoals')
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

  const handleEditDesc = async (todo, description) => {
    await updateDoc(doc(db, "allUsers", window.localStorage.getItem('uid'),'userGoals', todo.id), { description: description });
  };
  const handleEditDeadline = async (todo, deadline) => {
    await updateDoc(doc(db, "allUsers", window.localStorage.getItem('uid'),'userGoals', todo.id), { deadline: deadline });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "allUsers", window.localStorage.getItem('uid'),'userGoals', todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db,"allUsers",  window.localStorage.getItem('uid'),'userGoals', id));
  };

  return ( 
    <div className='goals'>
      <p>goals</p>
      <AddGoal/>
      <div className="goal_container">
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
