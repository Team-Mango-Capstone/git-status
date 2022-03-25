import React from "react";
import { useQuery, gql } from "@apollo/client";

const screenName = localStorage.getItem("screenName");

const CONTRIBUTIONS_QUERY = gql`
  query ($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export default function Timeline() {
  const { data, loading, error } = useQuery(CONTRIBUTIONS_QUERY, {
    variables: { userName: screenName },
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const useableData = data.user.contributionsCollection.contributionCalendar;
  const chartData =
    data.user.contributionsCollection.contributionCalendar.weeks;

  const testData = chartData.slice(50);

  // returns an array of arrays in the below format:
  // [date, number of contributions for the week starting on that date]
  const compileRawData = (arr) => {
    let finalElement = [];

    for (let i = 0; i < arr.length; i++) {
      let currentElem = arr[i];
      finalElement.push([currentElem.contributionDays[0].date]);
      let total = 0;
      for (let j = 0; j < currentElem.contributionDays.length; j++) {
        let dayCount = currentElem.contributionDays[j].contributionCount;
        total += dayCount;
      }
      finalElement[i].push(total);
    }
    return finalElement;
  };
  
  // returns an array of objects in the format needed for Chart.js:
  // {
  //   x: "YYYY-MM-DD",
  //   y: 0,
  //   r: # of contributions
  // },
  const prepDataForChart = (arr) => {
    const finalArr = arr.map((element) => {
      console.log("element >>>", element);
      return {
        x: element[0],
        y: 0,
        r: element[1],
      };
    });

    return finalArr;
  };

  console.log("ANSWER >>>>", prepDataForChart(compileRawData(chartData)));

  return (
    <div>
      You have made {useableData.totalContributions} contributions in the past
      year.
      <canvas id="myChart"></canvas>
    </div>
  );
}
