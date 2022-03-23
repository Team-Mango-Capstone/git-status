import axios from 'axios';

// Getting the logged in user's access token from local storage.
const token = localStorage.getItem('oAuthAccessToken'); //

export default function GithubTesting() {
  return (
    <div>
      <button onClick={clickHandler}> Testing Button</button>
    </div>
  );
}

// Created a button to test the API routes, and to see if data was being returned. click handler which runs the http request.
export const clickHandler = () => {
  getRepos();
  // getSingleRepo();
  // getRepoCollaborators();
  // getOrgsforUser();
  // getCommitsforRepo();
  // searchRepos();
  // searchCommits('choi2010', 'teampluto2201/grace-shopper');
};

//Axios calls to github API endpoints

// getting user's repos
// NOTE: This function does not get the repos that are part of
export async function getRepos() {
    try {
        const { data } = await axios.get(`https://api.github.com/user/repos`)
        console.log("this is the data from get repos", data)
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

export async function getSingleRepo(owner, repo) {
    // const owner = 'teampluto2201';
    // const repo = 'grace-shopper'
    try {
        // const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers: { Authorization: `Bearer ${token}` } })
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
        console.log("this is the data from get Single Repo", data)
        // const dateCreated = new Date(data.created_at)
        // console.log("Repo was created", dateCreated)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}
// getting list of repository collaborators
// /repos/{owner}/{repo}/collaborators
export async function getRepoCollaborators(owner, repo) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/collaborators`)
        console.log("this is the data from get Repo Collaborators", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

// List orgs for the authenticated user
export async function getOrgsforUser() {
    try {
        const { data } = await axios.get(`https://api.github.com/user/orgs`)
        console.log("this is the data from getOrgsforUser", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

// /repos/{owner}/{repo}/commits
// Team-Mango-Capstone/git-status

export async function getCommitsforRepo(owner, repo) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
        // data returns an array with list of commits. 
        // console.log("this is the author", data[0].commit.author.name)
        // console.log("this is the date", data[0].commit.author.date)
        // console.log("this is the message", data[0].commit.message)

        console.log("this is the data from getCommitsforRepo", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}
// searchrepo API route
// https://api.github.com/search/repositories?q=user%3Achoi2010
export async function searchRepos(user) {
    try {
        const { data } = await axios.get(`https://api.github.com/search/repositories?q=user:${user}}+fork:true&per_page=100 `)
        // data returns an array with list of commits. 

        console.log("this is the data from Search Repos", data)
    }
    catch (err) {
        console.log("error")
    }
}

export async function searchCommits(user, repo) {
    try {
        // const { data } = await axios.get(`https://api.github.com/search/commits?q=author:${user} repo:${repo} merge:false sort:author-date`)

        const { data } = await axios.get(`https://api.github.com/search/commits?q=author:${user} repo:${repo} merge:false fork:true sort:author-date`)
        // data returns an array with list of commits. 

        console.log("this is the data from searchCommits", data.items)
        // data.items.forEach(i => console.log(i.commit.author.date, i.commit.author.name, i.commit.message))
        return data.items;
    }
    catch (err) {
        console.log("error")
    }
}


///////////////////////////

let githubUsername = 'dviglucci';
let repoName = 'rats';

// returns an object with two arrays: how many commits each week of the year were made total, and how
// many commits each week of the year were made by the repo owner
const getWeeklyCommitStats = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/repos/${githubUsername}/${repoName}/stats/participation`)
      console.log('data from getWeeklyCommitStats >>>>', data)
    } catch (err) {
      console.log(err)
    }
  }


