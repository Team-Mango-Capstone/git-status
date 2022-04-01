import React, { useState, useEffect, useContext } from "react";
import { db } from "../db/Firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import "../css/Badges.css";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalProvider } from "../context/GlobalState";
import { GlobalContext } from "../context/GlobalState";
import { WelcomeModal } from "./homeCards/WelcomeModal";

export const BadgeContainer = () => {
  // const [showFirstBadge, setShowFirstBadge] = useState(false);
  const { navBarBadges } = useContext(GlobalContext);
  console.log("navBarBadges >>>", navBarBadges);

  return (
    <div className="badges-container">
      {navBarBadges.length === 0 ? (
        <WelcomeModal />
      ) : (
        navBarBadges
          .sort((a, b) => (a.created > b.created ? 1 : -1))
          .map((goal) => {
            const hoverText =
              goal.title === "Account created"
                ? goal.title
                : `Goal completed: ${goal.title}`;

            return (
              <div
                key={navBarBadges.indexOf(goal)}
                className="badge"
                data-hover={hoverText}
              >
                <FontAwesomeIcon icon={faAward} className="award-icon" />
              </div>
            );
          })
      )}
    </div>
  );
};
