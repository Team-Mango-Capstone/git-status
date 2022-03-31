import React from "react";
import { firstLoginOver } from "../../db/Firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

export const WelcomeModal = (props) => {
const closeModal = () => {
      props.setShowWelcomeModal(false);
      firstLoginOver();
      createDummyGoal();
      console.log('close the modal!!')
  };

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

  return (
    <div>
      <h3>
        Welcome to git status! By creating your account, you've earned your
        first badge. Earn more badges by setting and completing goals.
      </h3>
      <button onClick={closeModal}>Got it</button>
    </div>
  );
};
