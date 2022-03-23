// import './css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { getSingleRepo, searchCommits, getRepoCollaborators } from './GithubAPITesting.js'
const token = localStorage.getItem('oAuthAccessToken');//
const screenName = localStorage.getItem('screenName');//


function SingleRepo(props) {
  const params = useParams();
  // console.log("This is the params", params.repoName)
  // console.log("This is the screen Name", screenName)

  const [repo, setRepo] = useState({})
  const [commits, setCommit] = useState([])
  const [collabs, setCollabs] = useState([])

  useEffect(() => {
    async function fetchRepoData() {
      // const repoResult = await getSingleRepo('teampluto2201', 'grace-shopper');
      // const repoResult = await getSingleRepo('choi2010', '2201-GHP-NY-WEB-FT-JPFP');
      // const repoResult = await getSingleRepo(owner, repo);
      const repoResult = await getSingleRepo(screenName, params.repoName);
      setRepo(repoResult);
    }
    fetchRepoData();
  }, [])

  useEffect(() => {
    async function fetchData() {

      if (repo) {
        // console.log("!!!!!!!!!!!!!!!THIS IS THE REPO FULLNAME", repo.full_name)
        // const collabsInfo = await getRepoCollaborators("teampluto2201", 'grace-shopper');
        const collabsInfo = await getRepoCollaborators(repo.owner.login, repo.name);
        setCollabs(collabsInfo);

        // const commitsInfo = await searchCommits('choi2010', 'teampluto2201/grace-shopper');
        // const commitsInfo = await searchCommits('choi2010', 'choi2010/2201-GHP-NY-WEB-FT-JPFP');
        const commitsInfo = await searchCommits(screenName, repo.full_name);
        setCommit(commitsInfo);
      }

    }
    fetchData()
  }, [repo])

  console.log("This is from the STATE Repo data", repo)
  console.log("this is STATE Commits info ", commits)
  console.log("This is the STATE Collabs info", collabs);

  return (
    <div className='single-repo'>
      <p>Single Repo</p>
      <br />
      <div>Repo Name: {repo.name}</div>
      <br />
      <div>Number of Commits: {commits ? commits.length : 0}</div>
      <div>
        <br />
        {/* Capping the number of comments returned */}
        {commits ? commits.slice(0, 7).map((item) => {
          return (<div key={item.sha}>
            <ul>Date: {(new Date(item.commit.author.date)).toLocaleDateString("en-US")} | {(new Date(item.commit.author.date)).toLocaleTimeString("en-US")} </ul>
            <ul>Date: {item.commit.author.date.slice(0, 10)} | {(new Date(item.commit.author.date)).toLocaleTimeString("en-US")} </ul>
            <ul>Message: {item.commit.message}</ul>
            <br />
          </div>)
        }) : <div>Nothing exists</div>}

      </div>
      <div>
        <div>Number of Collaborators: {collabs.length}</div>
        names : {collabs.map((item) => { return <ul key={item.id}>{item.login}</ul> })}
      </div>

    </div>
  );
}
export default SingleRepo;
