// import './css/Home.css';
import Navbar from './Navbar';

function Home() {
  return (
    <div className='Home'>
      <h1>Welcome {localStorage.getItem('name')}</h1>
      <img src={localStorage.getItem('profilePic')} alt='profile pic' />
    </div>
  );
}

export default Home;
