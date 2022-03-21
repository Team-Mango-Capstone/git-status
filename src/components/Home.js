// import './css/Home.css';
import {signOutGithub } from '../db/Firebase';
import Navbar from './Navbar';
import { createAda, getUsers, getSingleUser, makeDiana, deleteUser, getGoals } from '../db/test';
import axios from 'axios'
// Getting the logged in user's access token from local storage. 
const token = localStorage.getItem('accessToken');//


function Home() {

  return (
    <div className='Home'>
        <Navbar />
        <p>Homepage</p>
        <button onClick={signOutGithub}>Sign Out</button>
        <h1>Welcome {localStorage.getItem('name')}</h1>
        <img src={localStorage.getItem('profilePic')} alt='profile pic' />
        <button onClick={createAda}>Create Ada!!</button>
        <button onClick={getUsers}>Get User</button>
        <button onClick={getSingleUser}>Get Single User</button>
        <button onClick={makeDiana}>Make Diana</button>
        <button onClick={deleteUser}>Delete User</button>
        <button onClick={getGoals}>Get goals</button>
    </div>
  );
}

export default Home;