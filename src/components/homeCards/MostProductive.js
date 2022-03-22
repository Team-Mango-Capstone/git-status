import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

export function MostProductive(props) {
  const [MostProductive, setMostProductive] = useState('');
  
  const repoArr = props.userRepos.items || [];

  const addArrs = (arrOfArrs) => {
    const finalArr = [];
    
    for (let i = 0; i < arrOfArrs[0].length; i++) {
      finalArr.push(0)
    };
      
    for (let i = 0; i < arrOfArrs.length; i++) {
      for (let j = 0; j < finalArr.length; j++) {
        finalArr[j] = finalArr[j] + arrOfArrs[i][j];
      };
    };
    
    console.log('FINAL ARR >>>>>>', finalArr);
  };

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
    addArrs(calculateMostProductive());
  }, [props.userRepos.items]);

  return (
    <div className="usual-commit-time">
      <h2>Your most productive week was x.</h2>
    </div>
  );
}

