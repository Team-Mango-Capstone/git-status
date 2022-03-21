// import './css/Home.css';
import { signOut } from '../db/Firebase';
import Navbar from './Navbar';
import { createAda, getUsers, getSingleUser, makeDiana, deleteUser, getGoals } from '../db/Firebase';
import axios from 'axios'

// Getting the logged in user's access token from local storage. 
const token = localStorage.getItem('accessToken');//

function Home() {

  // Created a button to test the API routes, and to see if data was being returned. click handler which runs the http request. 
  const clickHandler = () => {
    // getRepos();
    // getSingleRepo();
    // getRepoCollaborators();
    // getOrgsforUser();
    // getCommitsforRepo();
    // searchRepos();
    searchCommits();
  }

  //Axios calls to github API endpoints 

  // getting user's repos
  // NOTE: This function does not get the repos that are part of
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
  // Team-Mango-Capstone/git-status
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
      const { data } = await axios.get(`https://api.github.com/repos/Team-Mango-Capstone/git-status/collaborators`, { headers: { Authorization: `Bearer ${token}` } })
      console.log("this is the data", data)
    }
    catch (err) {
      console.log("error")
    }
  }

  // List orgs for the authenticated user
  async function getOrgsforUser() {
    try {
      const { data } = await axios.get(`https://api.github.com/user/orgs`, { headers: { Authorization: `Bearer ${token}` } })
      console.log("this is the data", data)
    }
    catch (err) {
      console.log("error")
    }
  }

  // /repos/{owner}/{repo}/commits
  // Team-Mango-Capstone/git-status

  async function getCommitsforRepo() {
    try {
      const { data } = await axios.get(`https://api.github.com/repos/teampluto2201/grace-shopper/commits`, { headers: { Authorization: `Bearer ${token}` }, params: { author: 'choi2010', 'committer-date': '>2022-03-08' }, })
      // data returns an array with list of commits. 
      console.log("this is the author", data[0].commit.author.name)
      console.log("this is the date", data[0].commit.author.date)
      console.log("this is the message", data[0].commit.message)

      console.log("this is the data", data)
    }
    catch (err) {
      console.log("error")
    }
  }
  // searchrepo API route
  // https://api.github.com/search/repositories?q=user%3Achoi2010
  async function searchRepos() {
    try {
      const data = await axios.get(`https://api.github.com/search/repositories?q=user:choi2010`, { headers: { Authorization: `Bearer ${token}` } })
      // data returns an array with list of commits. 

      console.log("this is the data", data)
    }
    catch (err) {
      console.log("error")
    }
  }

  async function searchCommits() {
    try {
      const data = await axios.get(`https://api.github.com/search/commits?q=author:choi2010 org:teampluto2201`, { headers: { Authorization: `Bearer ${token}` } })
      // data returns an array with list of commits. 

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
