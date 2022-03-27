import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/TopRepo.css';
import { loadingCard } from '../Elements';

const githubUsername = localStorage.getItem('screenName');

export const TopRepo = () => {
  const spanStyle = { color: '#58a6ff' };
  const [topRepoStats, setTopRepoStats] = useState({
    name: '',
    count: 0,
    uniques: 0,
  });
  const [topRepo, setTopRepo] = useState({});
  const [topRepoLanguages, setTopRepoLanguages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findTopRepo = async () => {
      let allOwnedRepos;
      let repoTraffic = []; // initialize empty array for repo traffic objects
      try {
        const { data } = await axios.get(
          `https://api.github.com/search/repositories?q=user:${githubUsername}&per_page=100`
        );
        allOwnedRepos = data.items; // axios call to get all repos owned by the user in an array
      } catch (error) {
        console.log(error);
      }
      allOwnedRepos.map(async (repo) => {
        // map over all the repos to get the traffic data for each one
        try {
          const { data } = await axios.get(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/traffic/views`
          );
          data.name = repo.name; // assign a name: repo.name key value pair to each repo traffic object since they don't have one
          repoTraffic.push(data); // push the objects into an array
          repoTraffic.sort((a, b) => (b.count > a.count ? 1 : -1)); // then sort the array by count
          setTopRepoStats(repoTraffic[0]); // the first element has the highest count, setTopRepoStats
        } catch (error) {
          console.log(error);
        }
      });
    };
    findTopRepo();
  }, []);

  useEffect(() => {
    const getTopRepo = async () => {
      // axios call to get the data for the topRepo (taken from the name key-value pair set earlier)
      const { data } = await axios.get(
        `https://api.github.com/repos/${githubUsername}/${topRepoStats.name}`
      );
      setTopRepo(data);
    };
    getTopRepo();
  }, [topRepoStats]); // this should run everytime the topRepoStats are updated

  useEffect(() => {
    const getTopRepoLanguages = async () => {
      // axios call to get the languages for the topRepo
      const { data } = await axios.get(
        `https://api.github.com/repos/${githubUsername}/${topRepo.name}/languages`
      );
      setTopRepoLanguages(data);
      console.log(topRepoLanguages);
      setIsLoading(false);
    };
    getTopRepoLanguages();
  }, [topRepo]); // this should run everytime the topRepo is updated

  return (
    <div className='popular'>
      <h2>Top Repository</h2>
      {isLoading ? (
        loadingCard
      ) : (
        <div className='popular-container'>
          <h2>
            <span style={spanStyle}>{topRepoStats.name}</span>
          </h2>
          <h2>
            {topRepoStats.count} total views and {topRepoStats.uniques} uniques.
          </h2>
          <p>Created at: {topRepo.created_at}</p>
          <p>Forks: {topRepo.forks}</p>
          <p>Stars: {topRepo.stargazers_count}</p>
          <p>Watchers: {topRepo.watchers}</p>

          {/* {topRepoLanguages.map((language) => (
            <div className='top-repo-languages'>{language}</div>
          ))} */}
        </div>
      )}
    </div>
  );
};
