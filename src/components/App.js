import '../css/App.css';
import { signInWithGitHub, signOut } from '../db/Firebase';

function App() {
  return (
    <div className='app'>
      <div className='app-container'>
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
}
export default App;
