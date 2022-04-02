import React, { useState } from 'react';
import '../../css/Profile.css';
import { UserLifespan } from './UserLifespan';
import { updateBio } from '../GithubAPITesting';

export function Profile(props) {
  const user = props.userData;
  const spanStyle = { color: '#58a6ff' };

  const [bio, setBio] = useState(user.bio);
  const [editBio, setEditBio] = useState(false);

  const handleChangeBio = (e) => {
    e.preventDefault();
    if (editBio === false) {
      setBio(user.bio);
    } else {
      user.bio = '';
      setBio(e.target.value);
    }
  };

  let email;
  if (user.email) {
    email = <span>{user.email}</span>;
  } else {
    email = <span style={{ color: '#e34c26' }}>Private</span>;
  }

  let emptyBio = (
    <span style={{ color: '#8b949e' }}>Nothing about you yet!</span>
  );

  return (
    <div className='profile-card'>
      <div className='top-right-fold'></div>

      <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
        <div className='bottom-left-fold'></div>
      </a>

      <div className='profile'>
        <div className='profile-header'>
          <img src={`${user.avatar_url}`} alt='' />
          <div className='names'>
            <h1>{user.name}</h1>
            <h1>{user.login}</h1>
            <h3>
              <span style={spanStyle}>Email:</span> {email}
            </h3>
          </div>
        </div>

        <div className='bio'>
          <hr />

          <div className='bio-title-btn'>
            <h3>Bio</h3>
            {editBio ? (
              <button
                className='bio-btn'
                onClick={(e) => {
                  updateBio(bio);
                  setEditBio(false);
                  setBio(bio);
                }}
              >
                <i className='bi bi-check-lg'></i>
              </button>
            ) : (
              <button className='bio-btn' onClick={() => setEditBio(true)}>
                <i className='bi bi-pencil-square'></i>
              </button>
            )}
          </div>

          {editBio ? (
            <textarea
              type='text'
              defaultValue={user.bio === '' ? bio : user.bio}
              onChange={(e) => {
                handleChangeBio(e);
              }}
            ></textarea>
          ) : (
            <p>{user.bio === '' ? (bio === '' ? emptyBio : bio) : user.bio}</p>
          )}
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
      </div>
      <UserLifespan userData={props.userData} />
    </div>
  );
}
