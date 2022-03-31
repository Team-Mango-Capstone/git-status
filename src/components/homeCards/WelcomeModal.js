import React from "react";

export const WelcomeModal = (props) => {
const closeModal = () => {
      props.setShowWelcomeModal(false);
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
