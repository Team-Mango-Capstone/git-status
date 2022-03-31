import React from "react";

export const HomeModal = (props) => {
  const setFirstLoginToFalse = () => {
     props.setFirstLogin(false);
  };

  return (
    <div className="home-modal">
      <div>
        Welcome to git status! By creating your account, you've earned your
        first badge. Set and complete goals to earn more badges.
      </div>
      <button onClick={setFirstLoginToFalse}>Got it</button>
    </div>
  );
};
