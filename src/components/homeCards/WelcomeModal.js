import React, { useEffect, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../db/Firebase";
import { GlobalContext } from "../../context/GlobalState";

export const WelcomeModal = (props) => {
  const { navBarBadges } = useContext(GlobalContext);

const createDummyGoal = async () => {
    await addDoc(
        collection(
          db,
          'allUsers',
          window.localStorage.getItem('uid'),
          'userGoals'
        ),
        {
          title: 'Account created',
          description: null,
          deadline: null,
          goalProgress: 0,
          completed: true,
          deleted: true,
          created: new Date().getTime()
        }
      );
};

const closeModal = () => {
  props.setShowWelcomeModal(false);
  console.log('close the modal!!')
};

if (navBarBadges.length === 0) {
  createDummyGoal();
};

// useEffect(() => {
    // createDummyGoal();
// }, []);

  return (
    <div className="badge-modal-content">
        <span
        className="close-badge-modal"
        onClick={closeModal}
      >
        &times;
      </span>
      <h2 className="modal-text">
        Welcome to git status! By creating your account, you've earned your
        first badge. Earn more badges by setting and completing goals.
      </h2>
    </div>
  );
};
