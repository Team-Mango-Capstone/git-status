import React from 'react';
import '../css/Login.css';
import { signInWithGitHub } from '../db/Firebase';

const Login = () => {
  return (
    <div className='login'>
      <div className='login-container'>
        <img src='/github.png' alt='' />
        <div className='container'>
          <div className='typed-out'>
            <p>git status</p>
          </div>
        </div>
        <button onClick={signInWithGitHub}>LOGIN</button>
      </div>
      <footer>&#129389; Diana, Linda, May, Sarina &#129389;</footer>
    </div>
  );
};

export default Login;
