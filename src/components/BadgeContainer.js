import React, { useState, useEffect } from "react";
import { db } from "../db/Firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import "../css/Badges.css";

export const BadgeContainer = () => {
  // query firestore to get all of the user's goals that are marked 'completed === true'
  const [completedGoals, setCompletedGoals] = useState([]);
  const uid = window.localStorage.getItem("uid");

  useEffect(() => {
    const q = query(
      collection(db, "allUsers", uid, "userGoals"),
      where("completed", "==", true)
    );

    onSnapshot(q, (doc) => {
      let completedArr = [];
      doc.forEach((element) => {
        completedArr.push(element.data());
      });
      setCompletedGoals(completedArr);
    });

  }, []);

  console.log("completedGoals >>>>", completedGoals);

  return (
    <div className="badges-container">
      {completedGoals.map((goal) => {
        const hoverText = `Goal completed: ${goal.title}`;

        return (
            <div
              key={completedGoals.indexOf(goal)}
              className="badge"
              data-hover={hoverText}
            >                	
              &#11088;
            </div>
        );
      })}
    </div>
  );
};
