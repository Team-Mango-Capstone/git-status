import '../../css/Goals.css';
import SingleGoalCard from './SingleGoalCard';
import AddGoal from './AddGoal';
import { useState, useContext } from 'react';
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
  handleEditTitle,
  handleEditProgress,
} from '../../db/Firestore';
import { usePagination, PaginationGoals } from './GoalPagination';
import { GlobalContext } from '../../context/GlobalState';

function Goals() {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(true);
  let [page, setPage] = useState(1);

  const { currentGoals, completedGoals } = useContext(GlobalContext);
  // console.log('current', currentGoals);
  // console.log('completed', completedGoals);

  const PER_PAGE = 6;
  const countCurrent = Math.ceil(currentGoals.length / PER_PAGE);
  const countCompleted = Math.ceil(completedGoals.length / PER_PAGE);

  const DATA_CURRENT = usePagination(currentGoals, PER_PAGE);
  const DATA_COMPLETED = usePagination(completedGoals, PER_PAGE);
  let data = status ? DATA_CURRENT.currentData() : DATA_COMPLETED.currentData();

  return (
    <div className='goals-container'>
      <div className='goals'>
      <h5>My Goals</h5>  
      <br/>
        <div className='status-bar'>
        <button className='add-btn' onClick={() => setOpenModal(true)}>
           +
          </button>
          <button
            className={status ? 'status-btn-active' : 'status-btn'}
            onClick={() => setStatus(true)}
          >
            <h4>in progress</h4>
          </button>
          <h4>|</h4>
          <button
            className={!status ? 'status-btn-active' : 'status-btn'}
            onClick={() => setStatus(false)}
          >
            <h4>completed</h4>
          </button>
        </div>
        <div className='add-btn-container'>
        
        </div>
        {openModal && <AddGoal closeModal={setOpenModal} />}
        <div className={openModal === true ? 'goal-hover' : 'goal-container'}>
          {data.map((goal) => (
            <SingleGoalCard
              key={goal.id}
              goal={goal}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEditDesc={handleEditDesc}
              handleEditDeadline={handleEditDeadline}
              handleEditTitle={handleEditTitle}
              handleEditProgress={handleEditProgress}
            />
          ))}
          <PaginationGoals
            completedGoals={completedGoals}
            currentGoals={currentGoals}
            DATA_CURRENT={DATA_CURRENT}
            DATA_COMPLETED={DATA_COMPLETED}
            countCurrent={countCurrent}
            countCompleted={countCompleted}
            page={page}
            setPage={setPage}
            status={status}
            PER_PAGE={PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;