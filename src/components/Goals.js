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
  const [todos, setTodos] = useState([]);
 
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return ( 
    <div className='goals'>
      <p>goals</p>
      {/* <Link to='/goals/add'>
        <button>Add Goal</button>
      </Link> */}
      <AddGoal/>
      <div className="goal_container">
        {todos.map((todo) => (
          <SingleGoalCard
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      <Insights />
    </div>
  );
}

export default Goals;
