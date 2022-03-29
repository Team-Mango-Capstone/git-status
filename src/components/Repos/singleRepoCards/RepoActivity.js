import React, { useState } from 'react';
import '../../../css/RepoActivity.css';

function RepoActivity(props) {
  const commits = props.commits;
  const averageCommitSize = props.averageCommitSize;

  return (
    <div className='single-repo-activity'>
      <div className='activity-left-container'>
        <h2>Activity</h2>
        <div className='commits'>
          {commits && commits.length > 0 ? (
            commits.slice(0, 10).map((item) => {
              return (
                <div className='commit' key={item.sha}>
                  <div className='test'>
                    <h2>{item.commit.author.date.slice(0, 10)}</h2>
                    <h2 style={{ color: '#8b949e' }}>
                      {new Date(item.commit.author.date).toLocaleTimeString(
                        'en-US'
                      )}
                    </h2>
                  </div>
                  <p>{item.commit.message}</p>
                  {item === commits[commits.length - 1] ? null : <hr />}
                </div>
              );
            })
          ) : (
            <h3>No commits yet!</h3>
          )}
        </div>
      </div>

      {/* separator line */}
      <hr />

      <div className='activity-right-container'>
        <div className='commit-stats'>
          <div className='total-commits'>
            <h2>Total Commits</h2>
            <h2>{commits ? commits.length : 0}</h2>
          </div>

          <hr />

          <div className='average-commits'>
            <h2>Average Commits</h2>
            <div className='avg-additions'>
              <h2>
                {averageCommitSize ? averageCommitSize.avgAdditions : '0'}
              </h2>
              <h3>added lines of code</h3>
            </div>
            <div className='avg-deletions'>
              <h2>
                {averageCommitSize ? averageCommitSize.avgDeletions : '0'}{' '}
              </h2>
              <h3> deleted lines of code</h3>
            </div>
          </div>
          <div className='commit-tip'>
            <p>
              <span style={{ color: '#58a6ff' }}>TIP:</span>{' '}
              <span style={{ color: '#8b949e' }}>
                Remember to commit often!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoActivity;
