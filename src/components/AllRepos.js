import axios from 'axios';
import '../css/AllRepos.css';
import '../css/SingleRepoCard.css';
import { useState, useEffect } from 'react';
// import SingleRepoCard from './SingleRepoCard';

function AllRepos() {
  // MISSING: pagination
  const screenName = localStorage.getItem('screenName');

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
  const [filter, setFilter] = useState('last-updated');
  // date created will compare the same as updated at
  // alphabetical will compare by name
  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=user:${screenName}+fork:true&per_page=100`
    );
    // see what props we can pass down from each repo
    // console.log(data.items);
    setRepos(data.items);
    setIsLoading(false);
  };

  // calls the new updated state
  useEffect(() => {}, [filter]);

  // changes the state but doesn't reflect the change inside yet
  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const renderFilteredRepos = () => {
    if (filter === 'date-created') {
      return repos.sort((a, b) => b.created_at.localeCompare(a.created_at));
    } else if (filter === 'alphabetical') {
      return repos.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return repos.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    }
  };

  console.log(renderFilteredRepos());

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
          <select
            defaultValue='last-updated'
            onChange={(e) => {
              handleChangeFilter(e);
            }}
          >
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
          renderFilteredRepos().map((repo) => (
            <div className='single-repo-card' key={repo.id}>
              <a href={`${repo.clone_url}`} target='_blank' rel='noreferrer'>
                <h2>{repo.name}</h2>
              </a>
              <hr />

              {filter === 'date-created' ? (
                <div>
                  <p>Created at:</p>
                  <p>{repo.created_at.slice(0, 10)}</p>
                </div>
              ) : (
                <div>
                  <p>Last updated at:</p>
                  <p>{repo.updated_at.slice(0, 10)}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className='invisible' />
    </div>
  );
}

export default AllRepos;
