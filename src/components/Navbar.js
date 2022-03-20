import React from 'react';
import { signOut } from '../db/Firebase';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav'>
      <h2>
        <Link to='/repos'>Repositories</Link>
        <Link to='/goals'>Goals</Link>
        <Link to='/' onClick={signOut}>
          Logout
        </Link>
      </h2>
    </div>
  );
}

export default Navbar;
