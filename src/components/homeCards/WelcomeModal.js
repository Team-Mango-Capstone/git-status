import React, { useEffect } from "react";
import { markFirstLoginFalse } from "../../db/Firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

export const WelcomeModal = (props) => {
    console.log('props >>', props)

const closeModal = () => {
    // markFirstLoginFalse(); // updates isFirstLogin key in firestore to 'false'
    props.setShowWelcomeModal(false); // ensures that the welcome modal and badge will only be displayed once
    console.log('close the modal!!')
  };

  const checker = () => {
    markFirstLoginFalse();
    console.log('checker clicked...')
  }

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

useEffect(() => {
    createDummyGoal(); // creates a dummy goal so that bagde will display
}, []);

  return (
    <div className="badge-modal-content">
        <span
        className="close-badge-modal"
        onClick={checker}
      >
        &times;
      </span>
      <h2 className="modal-text">
        Welcome to git status! By creating your account, you've earned your
        first badge. Earn more badges by setting and completing goals.
      </h2>
      {/* <button onClick={checker}>Got it</button> */}
    </div>
  );
};
