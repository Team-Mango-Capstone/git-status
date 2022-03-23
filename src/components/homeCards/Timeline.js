import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

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
        let lastYear = currentYear - 1
        let currentWeek = weekFinder();
        console.log('!!!!!!!')
        const allContributionsLastYear = await axios.get(
        //   `https://skyline.github.com/${githubUsername}/${lastYear}.json`,
        //   {
        //     //   headers: "Access-Control-Allow-Origin: http://localhost:3000",
        //     // method: 'GET',
        //     mode: 'no-cors',
        //     headers: { 'Access-Control-Allow-Origin': '*' },
        //   }
        `https://cors-anywhere.herokuapp.com/https://skyline.github.com/dviglucci/2022.json`
        );
        // const allContributionsThisYear = await axios.get(
        //   `https://skyline.github.com/${githubUsername}/${currentYear}.json`, {
        //     //   headers: "Access-Control-Allow-Origin: http://localhost:3000",
        //     // method: 'GET',
        //     // mode: 'cors',
        //     headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
        //    }
        // );
        console.log('allContributionsLastYear >>>>', allContributionsLastYear.data)
        // console.log('allContributionsThisYear >>>>', allContributionsThisYear.data)
        // allContributionsLastYear.filter(
        //   (element) => element.week > currentWeek
        // );
        // allContributionsThisYear.filter(
        //   (element) => element.week <= currentWeek
        // );
        // const contributionsPastYear = allContributionsLastYear.concat(
        //   allContributionsThisYear
        // );
        // setUserContributions(contributionsPastYear);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="timeline">
      <h2>Your timeline</h2>
    </div>
  );
}
