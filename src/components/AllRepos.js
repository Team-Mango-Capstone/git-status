import axios from 'axios';
import '../css/AllRepos.css';
import { useState, useEffect } from 'react';
import SingleRepoCard from './SingleRepoCard';


function AllRepos() {
  // MISSING: pagination, filter search

  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const openText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>all</span>
  );
  const closeText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/all</span>
  );

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('oAuthAccessToken');
  const screenName = localStorage.getItem('screenName');

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=user:${screenName}+fork:true&per_page=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // see what props we can pass down from each repo
    // console.log(data.items);
    setRepos(data.items);
    setIsLoading(false);
  };

  return (
    <div className='all-repos'>
      <div className='all-repos-header'>
        <h1>
          {leftAngleBrace}
          {openText}
          {rightAngleBrace}
          Repositories
          {leftAngleBrace}
          {closeText}
          {rightAngleBrace}
        </h1>
        <div className='filter'>
          <select defaultValue='last-updated'>
            <option value='last-updated'>Sort by: Last updated</option>
            <option value='alphabetical'>Sort by: Alphabetical</option>
            <option value='date-created'>Sort by: Date created</option>
          </select>
        </div>
      </div>

      <br />
      <div className='all-repos-container'>
        {isLoading ? (
          <h2>LOADING...</h2>
        ) : repos.length === 0 ? (
          <div>You have no repos!</div>
        ) : (
          repos
            // sort by last updated
            .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
            .map((repo) => (
              <SingleRepoCard
                key={repo.id}
                repo={repo}
                name={repo.name}
                clone_url={repo.clone_url}
                updated_at={repo.updated_at}
              />
            ))
        )}
      </div>
      <div className='invisible' />
    </div>
  );
}

export default AllRepos;
