// import './css/Goals.css';
import { Link } from 'react-router-dom';
import SingleGoalCard from './SingleGoalCard';
import Insights from './Insights';

// links to add goal form

function Goals() {
  return (
    <div className='goals'>
      <p>goals</p>
      <Link to='/goals/add'>
        <button>Add Goal</button>
      </Link>
      <SingleGoalCard />
      <Insights />
    </div>
  );
}

export default Goals;
