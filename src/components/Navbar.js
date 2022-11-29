import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import { signOutGithub } from '../db/Firebase';
import { Link } from 'react-router-dom';
import { BadgeContainer } from './BadgeContainer';

function Navbar() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [navOpen, setNavOpen] = useState(false);

  // listen for window width change to hide menu when resizing
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // event listener for width
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // automatically close the ham menu when screen width 770px and under
  useEffect(() => {
    if (width > 770) {
      setNavOpen(false);
    }
  }, [width]);

  const links = (
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
      </h2>
    </div>
  );

  const mobileLinks = (
    <div className='mobile-links'>
      <div className={`mobile-menu${navOpen ? '-visible' : ''}`}>
        <div className='m-links'>
          <h2>
            <Link to='/'>
              <span onClick={() => setNavOpen(false)}>Home</span>
            </Link>
            <hr />
            <Link to='/repos'>
              <span onClick={() => setNavOpen(false)}>Repositories</span>
            </Link>
            <hr />
            <Link to='/goals'>
              <span onClick={() => setNavOpen(false)}>Goals</span>
            </Link>
            <hr />
            <Link to='/' onClick={signOutGithub}>
              <span style={{ color: 'grey' }}>Logout</span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className='nav'>
      <div className='icon-badges'>
        <Link to='/'>
          <img
            src='/github.png'
            alt=''
            onClick={() => {
              setNavOpen(false);
            }}
          />
        </Link>
        <BadgeContainer />
      </div>
      {links}
      <h2 className='menu-toggle' onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? (
          <i className='bi bi-x-lg'></i>
        ) : (
          <i className='bi bi-list'></i>
        )}
      </h2>
      {mobileLinks}
    </div>
  );
}

export default Navbar;
