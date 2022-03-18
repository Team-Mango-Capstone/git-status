// import './css/Home.css';
import { signInWithGitHub, signOut } from '../db/Firebase';

function Home() {
  return (
    <div className='Home'>
      <header className='Home-header'>
        <p>Homepage</p>
        <button onClick={signInWithGitHub}>Sign in with Github</button>
        <button onClick={signOut}>Sign Out</button>
        <h1>Welcome {localStorage.getItem('name')}</h1>
        <img src={localStorage.getItem('profilePic')} alt='profile pic' />
       
      </header>
    </div>
  );
}

export default Home;
