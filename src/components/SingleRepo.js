// import './css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { getSingleRepo, searchCommits, getRepoCollaborators } from './GithubAPITesting.js'
const token = localStorage.getItem('oAuthAccessToken');//
const screenName = localStorage.getItem('screenName');//


function SingleRepo() {

  const [repo, setRepo] = useState({})
  const [commits, setCommit] = useState([])
  const [collabs, setCollabs] = useState([])

  useEffect(() => {
    async function fetchRepoData() {
      const repoResult = await getSingleRepo('teampluto2201', 'grace-shopper');
      // const repoResult = await getSingleRepo('choi2010', '2201-GHP-NY-WEB-FT-JPFP');
      // const repoResult = await getSingleRepo(owner, repo);
      // const repoResult = await getSingleRepo(screenName, '2201-GHP-NY-WEB-FT-JPFP');
      setRepo(repoResult);

      const commitsInfo = await searchCommits('choi2010', 'teampluto2201/grace-shopper');
      // const commitsInfo = await searchCommits('choi2010', 'choi2010/2201-GHP-NY-WEB-FT-JPFP');
      // const commitsInfo = await searchCommits(screenName, repo.full_name);
      setCommit(commitsInfo);

      const collabsInfo = await getRepoCollaborators("teampluto2201", 'grace-shopper');
      // const collabsInfo = await getRepoCollaborators(repo.owner.login, repo.name);
      setCollabs(collabsInfo);

    }
    fetchRepoData();
  }, [])

  // useEffect(() => {

  //   async function fetchData() {
  //     // const commitsInfo = await searchCommits('choi2010', 'teampluto2201/grace-shopper');
  //     // const commitsInfo = await searchCommits('choi2010', 'choi2010/2201-GHP-NY-WEB-FT-JPFP');
  //     const commitsInfo = await searchCommits(screenName, repo.full_name);
  //     setCommit(commitsInfo);

  //     // const collabsInfo = await getRepoCollaborators("teampluto2201", 'grace-shopper');
  //     const collabsInfo = await getRepoCollaborators(repo.owner.login, repo.name);
  //     setCollabs(collabsInfo);
  //   }
  //   fetchData()

  // }, [repo])

  console.log("This is from the STATE Repo data", repo)
  console.log("this is STATE Commits info ", commits)
  console.log("This is the STATE Collabs info", collabs);


  return (
    <div className='single-repo'>
      <p>Single Repo</p>
      <br />
      <div>Repo Name: {repo.name}</div>
      <br />
      <div>Number of Commits: {commits.length}</div>
      <div>
        <br />

        <h3>Latest Commits</h3>
        {commits.slice(0, 7).map((item) => {
          return (<div key={item.sha}>
            <ul>date: {item.commit.author.date.toLocaleString()}</ul>
            <ul>Message: {item.commit.message}</ul>
            <br />
          </div>)
        })}
      </div>
      <div>
        <div>Number of Collaborators: {collabs.length}</div>
        names : {collabs.map((item) => { return <ul>{item.login}</ul> })}
      </div>

    </div>
  );
}


export default SingleRepo;
