import React from 'react';
import '../css/Navbar.css';
import { signOutGithub } from '../db/Firebase';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav'>
      <Link to='/'>
        <img src='/github.png' alt='' />
      </Link>
      <div className='links'>
        <h2>
          <Link to='/'>
            <span>Home</span>
          </Link>
          <Link to='/repos'>
            <span>Repositories</span>
          </Link>
          <Link to='/goals'>
            <span>Goals</span>
          </Link>
          <Link to='/' onClick={signOutGithub}>
            <span style={{ color: 'grey' }}>Logout</span>
          </Link>

          {/* add home link */}
        </h2>
      </div>
    </div>
  );
}

export default Navbar;
