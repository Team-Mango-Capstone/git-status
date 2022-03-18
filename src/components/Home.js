// import './css/Home.css';
import {signInWithGitHub} from '../db/Firebase'

function Home() {
  return (
    <div className='Home'>
      <header className='Home-header'>
        <p>Homepage</p>
        <button onClick={signInWithGitHub}>Sign in with Github</button>
      </header>
    </div>
  );
}

export default Home;
