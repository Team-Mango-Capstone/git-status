// import './css/Home.css';

import { signInWithGitHub, signOut } from '../db/Firebase';
import Navbar from './Navbar';

function Home() {
  return (
    <div className='Home'>
        <Navbar />
        <p>Homepage</p>
        <button onClick={signInWithGitHub}>Sign in with Github</button>
        <button onClick={signOut}>Sign Out</button>
        <h1>Welcome {localStorage.getItem('name')}</h1>
        <img src={localStorage.getItem('profilePic')} alt='profile pic' />
    </div>
  );
}

export default Home;
