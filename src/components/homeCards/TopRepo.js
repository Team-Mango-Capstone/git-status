import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/TopRepo.css';
import { loadingCard } from '../Elements';
import TopRepoChart from '../homeCharts/TopRepoChart';

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
    const getTopRepoLanguages = async () => {
      // axios call to get the languages for the topRepo
      const { data } = await axios.get(
        `https://api.github.com/repos/${githubUsername}/${topRepo.name}/languages`
      );
      setTopRepoLanguages(data);
      setIsLoading(false);
    };
    getTopRepoLanguages();
  }, [topRepoStats, topRepo]); // this should run everytime the topRepo/Stats is updated

  const languageList = Object.entries(topRepoLanguages).map(([key, value]) => {
    return (
      <div className='top-repo-languages' key={value}>
        <p>
          {key} : {value.toString()}
        </p>
      </div>
    );
  });

  return (
    <div className='top-repo'>
      <h2>Top Repository</h2>

      {isLoading ? (
        loadingCard
      ) : (
        <div>
          <div className='top-right-fold'></div>
          <a
            href={`https://github.com/${githubUsername}/${topRepo.name}`}
            target='_blank'
            rel='noreferrer'
          >
            <div className='bottom-left-fold'></div>
          </a>
          <div className='top-repo-container'>
            <h2>
              <span style={spanStyle}>{topRepoStats.name}</span>
            </h2>
            <hr />

            <div className='views-stats'>
              <div className='views'>
                <h1>
                  <span style={spanStyle}>{topRepoStats.count}</span> views
                </h1>
                <p>
                  (<span style={spanStyle}> {topRepoStats.uniques}</span>{' '}
                  uniques )
                </p>
              </div>
              <div className='hr' />
              <div className='forks-stars-watchers'>
                <p>
                  <svg height='16' width='16' version='1.1'>
                    <path
                      fillRule='evenodd'
                      d='M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z'
                    ></path>
                  </svg>
                  {topRepo.forks} Forks
                </p>

                <p>
                  <svg height='16' width='16' version='1.1'>
                    <path
                      fillRule='evenodd'
                      d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z'
                    ></path>
                  </svg>
                  {topRepo.stargazers_count} Stars
                </p>

                <p>
                  <svg height='16' width='16' version='1.1'>
                    <path
                      fillRule='evenodd'
                      d='M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z'
                    ></path>
                  </svg>
                  {topRepo.watchers} Watchers
                </p>
              </div>
            </div>
            <hr />
            {languageList ? (
              languageList
            ) : (
              <h2>Trouble fetching language data.</h2>
            )}
            {/* <TopRepoChart /> */}
          </div>
        </div>
      )}
    </div>
  );
};
