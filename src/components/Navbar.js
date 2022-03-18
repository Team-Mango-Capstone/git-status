import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='nav'>
      <h2>
        <Link to='/repos'>Repositories</Link>
        <Link to='/goals'>Goals</Link>
        Logout
      </h2>
    </div>
  );
};

export default Navbar;
