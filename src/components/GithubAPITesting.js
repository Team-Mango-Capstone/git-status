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
    // getRepos();
    // getSingleRepo();
    // getRepoCollaborators();
    // getOrgsforUser();
    // getCommitsforRepo();
    // searchRepos();
    // searchCommits('choi2010', 'teampluto2201/grace-shopper');
    // getCommitStatforRepo("choi2010", "2201-GHP-NY-WEB-FT-JPFP")
    archiveRepo("choi2010", "Test-Repo-3")
};

//Axios calls to github API endpoints

// getting user's repos
// NOTE: This function does not get the repos that are part of orgs
export async function getRepos() {
    try {
        const { data } = await axios.get(`https://api.github.com/user/repos`)
        // console.log("this is the data from get repos", data)
    }
    catch (err) {
        console.log("error")
    }
}

export async function getSingleRepo(owner, repo) {
    try {
        // const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers: { Authorization: `Bearer ${token}` } })
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
        // console.log("this is the data from get Single Repo", data)
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
        // console.log("this is the data from get Repo Collaborators", data)
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
        // console.log("this is the data from getOrgsforUser", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

// /repos/{owner}/{repo}/commits
export async function getCommitsforRepo(owner, repo) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
        // console.log("this is the data from getCommitsforRepo", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

// /repos/{owner}/{repo}/stats/contributors
export async function getCommitStatforRepo(owner, repoName) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/stats/contributors`)
        console.log("this is the data from getCommitStatforRepo", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

//API Route for Deleting a repo. 
export async function deleteRepo(owner, repoName) {
    try {
        const { data } = await axios.delete(`https://api.github.com/repos/${owner}/${repoName}`)
        console.log("this repo has been deleted", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

//API Route for Archiving a repo 
export async function archiveRepo(owner, repoName) {
    try {
        const { data } = await axios.patch(`https://api.github.com/repos/${owner}/${repoName}`, { archived: "true" })
        // data returns an array with list of commits. 
        console.log("this repo has been archived", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

//API Route for getting repo languages
export async function getRepoLanguage(owner, repoName) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/languages`)
        // data returns an object with languages. 
        console.log("Repo Languages", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

// API Route for getting views on repo. 
export async function getRepoViews(owner, repoName) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/traffic/views`)
        console.log("Repo Views", data)
        return data;
    }
    catch (err) {
        console.log("error")
    }
}

///////////////////////////

// searchrepo API route
// https://api.github.com/search/repositories?q=user%3Achoi2010
export async function searchRepos(user) {
    try {
        const { data } = await axios.get(`https://api.github.com/search/repositories?q=user:${user}}+fork:true+archived:false&per_page=100 `)
        // console.log("this is the data from Search Repos", data)
        return data.items;
    }
    catch (err) {
        console.log("error")
    }
}

export async function searchCommits(user, repo) {
    try {
        // const { data } = await axios.get(`https://api.github.com/search/commits?q=author:${user} repo:${repo} merge:false sort:author-date`)
        const { data } = await axios.get(`https://api.github.com/search/commits?q=author:${user} repo:${repo} merge:false fork:true sort:author-date`)
        return data.items;
    }
    catch (err) {
        console.log("error")
    }
}

////////////////////////////////////////////////////////////////

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


