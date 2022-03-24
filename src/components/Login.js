import React from 'react';
import '../css/Login.css';
import { signInWithGitHub } from '../db/Firebase';
// import axios from 'axios'
const Login = () => {
  // const checkRateLimit = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       'https://api.github.com/rate_limit'
  //     );
  //     console.log('rate limit >>>>>', data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
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
        {/* <button
          onClick={() => {
           checkRateLimit()
          }}
        >
          test
        </button> */}
      </div>
      <footer>&#129389; Diana, Linda, May, Sarina &#129389;</footer>
    </div>
  );
};

export default Login;
