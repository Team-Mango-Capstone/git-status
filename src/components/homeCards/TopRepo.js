import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/TopRepo.css';
import { getSingleRepo } from '../GithubAPITesting.js'

const githubUsername = localStorage.getItem('screenName');

export const TopRepo = () => {
  const spanStyle = { color: '#58a6ff' };
  // need to setState as topRepo to get more details about it
  // link the name, get languages, stars/forks/watching, etc.
  // can we map -> sort by view -> return first element to stop the loading?

  const [topRepoStats, setTopRepoStats] = useState({
    name: '',
    count: 0,
    uniques: 0,
  });
  const [topRepo, setTopRepo] = useState({})
  // Sarina the topRepo object in the local state is the single repo's information that you need. 

  useEffect(() => {
    const findTopRepo = async () => {
      let allOwnedRepos;
      try {
        const { data } = await axios.get(
          `https://api.github.com/search/repositories?q=user:${githubUsername}&per_page=100`
        );
        allOwnedRepos = data.items;
      } catch (error) {
        console.log(error);
      }
      allOwnedRepos.map(async (repo) => {
        try {
          const { data } = await axios.get(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/traffic/views`
          );
          if (data.count > topRepoStats.count) {
            setTopRepoStats({
              name: repo.name,
              count: data.count,
              uniques: data.uniques,
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    findTopRepo();
  }, [topRepoStats]);


  useEffect(() => {

    async function fetchRepoData() {
      if (topRepoStats) {
        const repoData = await getSingleRepo(githubUsername, topRepoStats.name)
        setTopRepo(repoData)
      }
    }
    fetchRepoData()
  }, [topRepoStats])

  // console.log('This it the top repos data!!!!!!!!!!!!!!!!!!!!', topRepoStats)
  console.log('This it the top repo Data', topRepoStats, topRepo)

  return (
    <div className='popular'>
      <h1>
        Most popular repo: <br />
        <span style={spanStyle}>{topRepoStats.name}</span>
      </h1>
      <h2>
        {topRepoStats.count} total views and {topRepoStats.uniques} uniques.
      </h2>
    </div>
  );
};
