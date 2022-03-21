import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

axios.defaults.headers.common[
    "Authorization"
  ] = `token ${localStorage.getItem("oAuthAccessToken")}`;

export function Timeline(props) {
  const [userContributions, setUserContributions] = useState([]);

  const weekFinder = () => {
    let currentdate = new Date();
    let oneJan = new Date(currentdate.getFullYear(), 0, 1);
    let numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    );
    let result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    return result;
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let currentYear = new Date().getFullYear();
        let currentWeek = weekFinder();
        const allContributionsLastYear = await axios.get(
          `https://skyline.github.com/${githubUsername}/${currentYear - 1}.json`
        );
        const allContributionsThisYear = await axios.get(
          `https://skyline.github.com/${githubUsername}/${currentYear}.json`
        );
        allContributionsLastYear.filter(
          (element) => element.week > currentWeek
        );
        allContributionsThisYear.filter(
          (element) => element.week <= currentWeek
        );
        const contributionsPastYear = allContributionsLastYear.concat(
          allContributionsThisYear
        );
        setUserContributions(contributionsPastYear);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
    console.log('userContributions >>>>>', userContributions)
  }, []);

  return (
    <div className="timeline">
      <h2>Your timeline</h2>
    </div>
  );
}
