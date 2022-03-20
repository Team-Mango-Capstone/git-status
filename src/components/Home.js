// import './css/Home.css';
import { signOut } from '../db/Firebase';
import Navbar from './Navbar';
import { createAda, getUsers, getSingleUser, makeDiana, deleteUser, getGoals } from '../db/Firebase';
import axios from 'axios'

// Getting the logged in user's access token from local storage. 
const token = localStorage.getItem('accessToken');//
// const token = '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'



function Home() {

  // Created a button to test the API routes, and to see if data was being returned. click handler which runs the http request. 
  const clickHandler = () => {
    // getSingleRepo();
    // getRepos();
    getRepoCollaborators();
  }

  //Axios calls to github API endpoints 

  // getting user's repos
  async function getRepos() {
    try {
      const { data } = await axios.get(`https://api.github.com/user/repos`, { headers: { Authorization: `Bearer ${token}` } })
      console.log("this is the DATA", data)
    }
    catch (err) {
      console.log("error")
    }
  }

  // getting user's single repo
  // /repos/{owner}/{repo}
  // teampluto2201/grace-shopper
  // choi2010/goodiebag

  async function getSingleRepo() {
    try {
      const { data } = await axios.get(`https://api.github.com/repos/teampluto2201/grace-shopper`, { headers: { Authorization: `Bearer ${token}` } })
      console.log("this is the data", data)
      const dateCreated = new Date(data.created_at)
      console.log("Repo was created", dateCreated)

    }
    catch (err) {
      console.log("error")
    }
  }

  // getting list of repository collaborators
  // /repos/{owner}/{repo}/collaborators

  async function getRepoCollaborators() {
    try {
      const { data } = await axios.get(`https://api.github.com/repos/teampluto2201/grace-shopper/collaborators`, { headers: { Authorization: `Bearer ${token}` } })
      console.log("this is the data", data)

    }
    catch (err) {
      console.log("error")
    }
  }




  /////////////////////////////////////////////////////////////////////////////


  return (
    <div className='Home'>
      <Navbar />
      <p>Homepage</p>
      <button onClick={signOut}>Sign Out</button>
      <h1>Welcome {localStorage.getItem('name')}</h1>
      <img src={localStorage.getItem('profilePic')} alt='profile pic' />
      <button onClick={createAda}>Create Ada!!</button>
      <button onClick={getUsers}>Get User</button>
      <button onClick={getSingleUser}>Get Single User</button>
      <button onClick={makeDiana}>Make Diana</button>
      <button onClick={deleteUser}>Delete User</button>
      <button onClick={getGoals}>Get goals</button>

      <button onClick={clickHandler}>Github API Test Button</button>
    </div>
  );
}

export default Home;
