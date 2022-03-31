import React from 'react';
import '../../../css/RepoInfo.css';

function RepoInfo(props) {
  const repo = props.repo;

  const red = { color: '#e34c26' };
  const green = { color: '#39d353' };

  const date = repo.created_at;
  const time = repo.created_at;
  const visibility = repo.visibility;

  return (
    <div className='single-repo-info'>
      <div className='top-right-fold'></div>

      <a href={`${repo.html_url}`} target='_blank' rel='noreferrer'>
        <div className='bottom-left-fold'></div>
      </a>

      <div className='single-repo-info-first-titles'>
        <h3>ID</h3>
        <hr />
        <h3>Created</h3>
        <hr />
        <h3>Size</h3>
      </div>
      <div className='single-repo-info-first-data'>
        <h3>{repo.id}</h3>
        <hr />
        <h3>
          {date ? date.slice(0, 10) : null}
          <br />
          {time ? time.slice(11, 19) : null}
        </h3>
        <hr />
        <h3>
          {repo.size} <span style={{ color: '#8b949e' }}>KB</span>
        </h3>
      </div>

      <hr />

      <div className='single-repo-info-second-titles'>
        <h3>Views</h3>
        <hr />
        <h3>Visibility</h3>
      </div>
      <div className='single-repo-info-second-data'>
        <h3>{props.repoViews.count}</h3>
        <hr />
        <h3 style={repo.visibility === 'private' ? red : green}>
          {visibility
            ? visibility[0].toUpperCase() + repo.visibility.substring(1)
            : null}
        </h3>
      </div>

      <hr />

      <div className='single-repo-info-third-titles'>
        <h3>Forks</h3>
        <hr />
        <h3>Stars</h3>
        <hr />
        <h3>Watchers</h3>
      </div>
      <div className='single-repo-info-third-data'>
        <h3>{repo.forks}</h3>
        <hr />
        <h3>{repo.stargazers_count}</h3>
        <hr />
        <h3>{repo.watchers}</h3>
      </div>
    </div>
  );
}

export default RepoInfo;
