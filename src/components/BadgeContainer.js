import React, { useState, useEffect } from "react";
import { db } from "../db/Firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import "../css/Badges.css";
import { BadgeHover } from "./BadgeHover";

export const BadgeContainer = () => {
  // query firestore to get all of the user's goals that are marked 'completed === true'
  const [completedGoals, setCompletedGoals] = useState([]);
  const [hover, setHover] = useState(false);
  const uid = window.localStorage.getItem("uid");

  useEffect(() => {
    const q = query(
      collection(db, "allUsers", uid, "userGoals"),
      where("completed", "==", true)
    );

    //   const isCompleted = onSnapshot(q, (element) => {
    // let completedArr = [];
    // element.forEach((doc) => {
    //     console.log('Here is doc.data()', doc.data())
    //     completedArr.push( { ...doc.data() } )
    // });
    // console.log('COMPLETED ARR >>>>', completedArr);
    // setCompletedGoals(completedArr);
    // });

    // const setCompletedSnapshot =
    onSnapshot(q, (doc) => {
      let completedArr = [];
      doc.forEach((element) => {
        // console.log("Current data: ", element.data());
        completedArr.push(element.data());
      });
      console.log("completedARR", completedArr);
      setCompletedGoals(completedArr);
    });

    // setCompletedSnapshot();
    console.log("useEffect ran....");
  }, []);

  console.log("completedGoals >>>>", completedGoals);

//   const onHover = () => {
//     console.log("onHover!!!");
//     setHover(true);
//   };

//   const onLeave = () => {
//     console.log("onLeave!!!");
//     setHover(false);
//   };

  return (
    <div className="badges-container">
      {completedGoals.map((goal) => {
        const hoverText = `Goal completed: ${goal.title}`;
        console.log('current goal >>>', goal)

        return (
            <div
              key={completedGoals.indexOf(goal)}
              className="badge"
            //   onMouseEnter={onHover}
            //   onMouseLeave={onLeave}
              data-hover={hoverText}
            >
                {/* {hover ? <BadgeHover goalName={goal.title}/> : ""} */}
                	
              &#11088;
            </div>

        );
      })}
    </div>
  );
};
