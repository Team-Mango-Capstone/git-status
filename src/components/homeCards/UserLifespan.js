import React from "react";

export function UserLifespan(props) {
    const makeDate = () => {
      const totalDays = (new Date() - new Date(props.userData.created_at)) / 86400000;
      const totalYears = Math.floor(totalDays / 365);
      const remainderDays = Math.floor(totalDays % 365);
  
      return `${totalYears} years and ${remainderDays} days`;
    };
  
    return (
      <div className="total-days">
        <h2>You have been a GitHub user for {makeDate()}.</h2>
      </div>
    );
  }