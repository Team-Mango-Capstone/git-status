import React from 'react';

function Activity(props) {
  const commits = props.commits;
  const averageCommitSize = props.averageCommitSize;
  return (
    <div className='single-repo-activity'>
      <h2>Activity</h2>

      {commits ? (
        commits.slice(0, 10).map((item) => {
          return (
            <div key={item.sha}>
              <ul>
                Date: {item.commit.author.date.slice(0, 10)} |{' '}
                {new Date(item.commit.author.date).toLocaleTimeString('en-US')}{' '}
              </ul>
              <ul>Message: {item.commit.message}</ul>
              <br />
            </div>
          );
        })
      ) : (
        <div>No commits yet!</div>
      )}

      <div>Number of Commits: {commits ? commits.length : 0}</div>
      <br />
      <div>
        {commits.length > 0 && (
          <>
            Did you know that your average commits consists of{' '}
            {averageCommitSize.avgAdditions} added lines of code and{' '}
            {averageCommitSize.avgDeletions} deleted lines of code.
          </>
        )}
      </div>
    </div>
  );
}

export default Activity;
