import React from 'react';
import '../../css/Profile.css';
import { UserLifespan } from './UserLifespan';

export function Profile(props) {
  const user = props.userData;
  const spanStyle = { color: '#58a6ff' };
  console.log(user);

  return (
    <div className='profile'>
      <div className='top-right-fold'></div>

      <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
        <div className='bottom-left-fold'></div>
      </a>

      <div className='profile-header'>
        <img src={`${user.avatar_url}`} alt='' />
        <div className='names'>
          <h1>{user.name}</h1>
          <h1>{user.login}</h1>
          <h2>
            <span style={spanStyle}>Email:</span>{' '}
            {user.email ? user.email : 'Private'}
          </h2>
        </div>
      </div>
      <div className='bio'>
        <hr />
        <h2>{user.bio ? user.bio : 'Your bio is empty!'}</h2>
      </div>
      <hr />
      <div className='follow-type'>
        <h2>Following</h2>
        <hr />
        <h2>Followers</h2>
        <hr />
        <h2>Type</h2>
      </div>
      <div className='follow-type-info'>
        <h2>{user.following}</h2>
        <hr />
        <h2>{user.followers}</h2>
        <hr />
        <h2>{user.type}</h2>
      </div>
      <hr />
      <UserLifespan userData={props.userData} />
    </div>
  );
}
