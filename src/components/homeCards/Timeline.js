import React from "react";
import { useQuery, gql } from "@apollo/client";

const screenName = localStorage.getItem("screenName");

const CONTRIBUTIONS_QUERY = gql`
query($userName:String!) { 
    user(login: $userName){
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
      variables: { "userName": screenName},
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  const useableData = data.user.contributionsCollection.contributionCalendar;
  const chartData = data.user.contributionsCollection.contributionCalendar.weeks;

  const testData = chartData.slice(50);

  /*
  using chartData:
  1) map over the initial array, which is all the weeks
  2) map over each individual week:
    a. add number of total contributions that week
    b. store the date of the first day of that week (aka index 0)
  3) put data into below format

  data needs to end up as an array of objects in this format:
  {
    x: "2022-08-22", // date
    y: 0, // must be 0!!!
    r: 10, // # of contributions
  },
  */

  console.log('DATA', data)

  const convertData = (arr) => {
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

    //   let allDaysInfo = currentElem.contributionDays.map((dayElement) => {
    //     if (currentElem.contributionDays.indexOf(dayElement) === 0) {
    //       daysArr.push(dayElement.date);
    //     }
    //     return daysArr;
    //   })
    //   finalElement.push(allDaysInfo);
    // }
  }
  return finalElement;
}

  console.log('ANSWER >>>>', convertData(testData));

  return (
    <div>
        You have made {useableData.totalContributions} contributions in the past year.
        <canvas id="myChart"></canvas>
    </div>
  );
}