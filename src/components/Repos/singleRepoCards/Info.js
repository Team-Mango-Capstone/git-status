import React from 'react';

function Collaborators(props) {
  const repo = props.repo;
  return (
    <div className='single-repo-info'>
      <h3>Created at {repo.created_at}</h3>
      <h3>Size {repo.size} KB</h3>
      <h3>Visibility {repo.visibility}</h3>
      <h3>Views</h3>
      <h3>Forks {repo.forks}</h3>
      <h3>Stars {repo.stargazers_count}</h3>
      <h3>Watchers {repo.watchers}</h3>
    </div>
  );
}

export default Collaborators;
