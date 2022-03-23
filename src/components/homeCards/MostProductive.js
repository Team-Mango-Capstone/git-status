import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

export function MostProductive(props) {
  const [MostProductive, setMostProductive] = useState('');
  
  const repoArr = props.userRepos.items || [];

  // const addArrs = (arrOfArrs) => {
  //   const finalArr = [];
    
  //   for (let i = 0; i < arrOfArrs[0].length; i++) {
  //     finalArr.push(0)
  //   };
      
  //   for (let i = 0; i < arrOfArrs.length; i++) {
  //     for (let j = 0; j < finalArr.length; j++) {
  //       finalArr[j] = finalArr[j] + arrOfArrs[i][j];
  //     };
  //   };
    
  //   console.log('FINAL ARR >>>>>>', finalArr);
  // };

  useEffect(() => {
    const calculateMostProductive = async () => {
      const allResponses = [];
      repoArr.map(async (repo) => {
        try {
          const { data } = await axios.get(`https://api.github.com/repos/${githubUsername}/${repo.name}/stats/participation`);
          allResponses.push(data.all);
        } catch(error) {
          console.log(error);
        };
      });
      return allResponses;
    };
    // calculateMostProductive();
    //let arrOfWeeklyCommits = calculateMostProductive();
    // console.log('arrOfWeeklyCommits >>>>', arrOfWeeklyCommits)
    // let consolidatedArr = addArrs(arrOfWeeklyCommits);
    // console.log('consolidatedArr >>>>', consolidatedArr)
    const addArrs = async (arrOfArrs) => {
      const myVar =  await arrOfArrs
      console.log('myvar >>>', myVar)
      const finalArr = [];
      
      for (let i = 0; i < 53; i++) {
        finalArr.push(0)
      };
        
      for (let i = 0; i < myVar.length; i++) {
        for (let j = 0; j < finalArr.length; j++) {
          // finalArr[j] = finalArr[j] + myVar[i][j];
          finalArr[j] += myVar[i][j];
        };
      };
      
      console.log('FINAL ARR >>>>>>', finalArr);
    };
    let arrAllWeeklyCommits = addArrs(calculateMostProductive());
    // find largest number in array, store in variable
    // find index of largest number, convert to week number
    // convert week number to speciic dates of the year
    // print out dates and largest number
  }, [props.userRepos.items]);

  return (
    <div className="usual-commit-time">
      <h2>Your most productive week was x.</h2>
    </div>
  );
}

