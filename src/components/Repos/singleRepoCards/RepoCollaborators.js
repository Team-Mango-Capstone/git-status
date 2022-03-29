import React from 'react';
import '../../../css/RepoCollaborators.css';

function RepoCollaborators(props) {
  const collabs = props.collabs;
  const spanStyle = { color: '#58a6ff' };
  return (
    <div className='single-repo-collaborators'>
      <div className='collaborators-total'>
        <h2>Collaborators</h2>
        <h2>
          <span style={spanStyle}>Total:</span> {collabs.length}
        </h2>
      </div>
      <div className='collaborators'>
        {collabs.map((item) => {
          return (
            <div className='collaborator' key={item.id}>
              <a href={`${item.html_url}`} target='_blank' rel='noreferrer'>
                <img src={`${item.avatar_url}`} alt='' />
              </a>
              <div className='collaborator-name'>{item.login}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RepoCollaborators;
