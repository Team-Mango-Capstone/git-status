import "../../css/Goals.css";
import SingleGoalCard from "./SingleGoalCard";
import AddGoal from "./AddGoal";
import { useState, useEffect } from "react";
import { db } from "../../db/Firebase";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import {
  toggleComplete,
  handleEditDesc,
  handleDelete,
  handleEditDeadline,
  handleEditTitle,
  handleEditProgress,
} from "../../db/Firestore";
import { usePagination, PaginationGoals } from "./GoalPagination";

function Goals() {
  const [currentGoals, setCurrentGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(true);
  const uid = window.localStorage.getItem("uid");
  let [page, setPage] = useState(1);

  useEffect(() => {
    const q = query(
      collection(db, "allUsers", uid, "userGoals"),
      where("completed", "==", false)
    );
    const fetchData = onSnapshot(q, (querySnapshot) => {
      let goalsArray = [];
      querySnapshot.forEach((doc) => {
        goalsArray.push({ ...doc.data(), id: doc.id });
      });
      setCurrentGoals(goalsArray);
    });

    const q2 = query(
      collection(db, "allUsers", uid, "userGoals"),
      where("completed", "==", true)
    );
    const fetchCompletedData = onSnapshot(q2, (querySnapshot) => {
      let goalsArray = [];
      querySnapshot.forEach((doc) => {
        goalsArray.push({ ...doc.data(), id: doc.id });
      });
      setCompletedGoals(goalsArray);
    });

    return () => {
      fetchData();
      fetchCompletedData();
    };
  }, []);

  const PER_PAGE = 6;
  const count = Math.ceil(currentGoals.length / PER_PAGE);
  const _DATA = usePagination(currentGoals, PER_PAGE);

  return (
    <div className="goals">
      <div className="status-bar">
        <button
          className={status ? "status-btn-active" : "status-btn"}
          onClick={() => setStatus(true)}
        >
          <h4>in progress</h4>
        </button>
        <h4>|</h4>
        <button
          className={!status ? "status-btn-active" : "status-btn"}
          onClick={() => setStatus(false)}
        >
          <h4>completed</h4>
        </button>
      </div>
      <div className="add-btn-container">
        <button className="add-btn" onClick={() => setOpenModal(true)}>
          Add Goal
        </button>
      </div>
      {openModal && <AddGoal closeModal={setOpenModal} />}
      <div className={openModal === true ? "goal-hover" : "goal-container"}>
        {status
          ? _DATA
              .currentData()
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
                />
              ))
          : completedGoals
              .filter((goal) => goal.deleted === false)
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
                />
              ))}
      </div>
      {/* <Insights /> */}
      <PaginationGoals
        completedGoals={completedGoals}
        currentGoals={currentGoals}
        _DATA={_DATA}
        count={count}
        page={page}
        setPage={setPage}
        PER_PAGE={PER_PAGE}
      />
    </div>
  );
}

export default Goals;
