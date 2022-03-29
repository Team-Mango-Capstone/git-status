import React from 'react';
import '../../../css/RepoActivity.css';

function RepoActivity(props) {
  const commits = props.commits;
  const averageCommitSize = props.averageCommitSize;

  return (
    <div className='single-repo-activity'>
      <div className='activity-left-container'>
        <h2>Activity</h2>
        <div className='commits'>
          {commits ? (
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
                  {item === commits[9] ? <div /> : <hr />}
                </div>
              );
            })
          ) : (
            <h2>No commits yet!</h2>
          )}
        </div>
      </div>
      {/* separator line */}
      <hr />
      <div className='activity-right-container'>
        <div className='average-commits'>
          <h3>Total Number of Commits: {commits ? commits.length : 0}</h3>
          <div>
            <h2>Average Commits</h2>
            {commits.length > 0 && (
              <>
                Did you know that your average commits consists of{' '}
                <div className='avg-additions'>
                  {averageCommitSize.avgAdditions} added lines of code and{' '}
                </div>
                <div className='avg-deletions'>
                  {averageCommitSize.avgDeletions} deleted lines of code.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoActivity;
