import React from 'react';
import '../../css/Profile.css';
import { UserLifespan } from './UserLifespan';

export function Profile(props) {
  const user = props.userData;
  const spanStyle = { color: '#58a6ff' };

  return (
    <div className='profile'>
      <div className='top-right-fold'></div>

      <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
        <div className='bottom-left-fold'></div>
      </a>

      <div className='profile-header'>
        <img src={`${user.avatar_url}`} alt='' />
        <div className='names'>
          <h2>{user.name}</h2>
          <h2>{user.login}</h2>
          <h3>
            <span style={spanStyle}>Email:</span>{' '}
            {user.email ? user.email : 'Private'}
          </h3>
        </div>
      </div>
      <div className='bio'>
        <hr />
        <h3>{user.bio ? user.bio : 'Your bio is empty!'}</h3>
      </div>
      <hr />
      <div className='follow-type'>
        <h3>Following</h3>
        <hr />
        <h3>Followers</h3>
        <hr />
        <h3>Type</h3>
      </div>
      <div className='follow-type-info'>
        <h3>{user.following}</h3>
        <hr />
        <h3>{user.followers}</h3>
        <hr />
        <h3>{user.type}</h3>
      </div>
      <hr />
      <UserLifespan userData={props.userData} />
    </div>
  );
}
