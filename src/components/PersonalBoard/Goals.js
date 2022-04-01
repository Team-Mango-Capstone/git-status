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
  handlePseudoDelete,
} from '../../db/Firestore';
import { usePagination, PaginationGoals } from './GoalPagination';
import { GlobalContext } from '../../context/GlobalState';
import { BadgeModal } from './BadgeModal';

function Goals() {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  let [page, setPage] = useState(1);

  const { currentGoals, completedGoals } = useContext(GlobalContext);

  const toggleModal = () => {
    setShowBadgeModal(!showBadgeModal);
  };

  const PER_PAGE = 6;
  const countCurrent = Math.ceil(currentGoals.length / PER_PAGE);
  const countCompleted = Math.ceil(
    completedGoals
      .filter((goal) => goal.deleted === false)
      .sort((a, b) => (a.created > b.created ? 1 : -1)).length / PER_PAGE
  );

  const DATA_CURRENT = usePagination(currentGoals, PER_PAGE);
  const DATA_COMPLETED = usePagination(completedGoals, PER_PAGE);
  let data = status ? DATA_CURRENT.currentData() : DATA_COMPLETED.currentData();

  return (
    <div className='goals-container'>
      {showBadgeModal ? (
        <BadgeModal isOpen={showBadgeModal} toggle={toggleModal} />
      ) : null}

      {/* MODAL */}
      {openModal && <AddGoal closeModal={setOpenModal} />}

      <div className='goals'>
        <h5>My Goals</h5>
        <div className='status-bar'>
          <div className='status-btns'>
            <button
              className={status ? 'status-btn-active' : 'status-btn'}
              onClick={() => setStatus(true)}
            >
              <h4>In Progress</h4>
            </button>
            <button
              className={!status ? 'status-btn-active' : 'status-btn'}
              onClick={() => setStatus(false)}
            >
              <h4>Completed</h4>
            </button>
          </div>
          <button className='add-btn' onClick={() => setOpenModal(true)}>
            Add a Goal
          </button>
        </div>

        <div className={openModal === true ? 'goal-hover' : 'goal-container'}>
          {data && data.length > 0 ? (
            data
              .filter((goal) => goal.deleted === false)
              .sort((a, b) => (b.created > a.created ? 1 : -1))
              .map((goal) => (
                <SingleGoalCard
                  key={goal.id}
                  goal={goal}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEditDesc={handleEditDesc}
                  handleEditDeadline={handleEditDeadline}
                  handleEditTitle={handleEditTitle}
                  handleEditProgress={handleEditProgress}
                  handlePseudoDelete={handlePseudoDelete}
                  isOpen={showBadgeModal}
                  toggle={toggleModal}
                />
              ))
          ) : (
            <h4>No goals yet!</h4>
          )}
        </div>
      </div>
      {data && data.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export default Goals;
