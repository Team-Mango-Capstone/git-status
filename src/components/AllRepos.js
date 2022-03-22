import axios from 'axios';
import '../css/AllRepos.css';
import { useState, useEffect } from 'react';
import SingleRepoCard from './SingleRepoCard';

function AllRepos() {
  // MISSING: pagination, filter search, hook to show isLoading

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
        {repos.length > 0 ? (
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
        ) : (
          <h2>Loading / No repos</h2>
        )}
      </div>
      <div className='invisible' />
    </div>
  );
}

export default AllRepos;
