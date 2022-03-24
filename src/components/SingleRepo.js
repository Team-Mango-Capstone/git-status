// import './css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { getSingleRepo, getCommitsforRepo, searchCommits, getRepoCollaborators, getCommitStatforRepo, deleteRepo } from './GithubAPITesting.js'
import { Link } from "react-router-dom";

const token = localStorage.getItem('oAuthAccessToken');//
const screenName = localStorage.getItem('screenName');//

// deleteRepo(owner, repoName)

function SingleRepo(props) {
  const params = useParams();
  // console.log("This is the params", params.repoName)
  // console.log("This is the screen Name", screenName)
  const [repo, setRepo] = useState({})
  const [commits, setCommit] = useState([])
  const [collabs, setCollabs] = useState([])
  const [commitSize, setcommitSize] = useState([])
  const [averageCommitSize, setAverageCommitSize] = useState({})

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
        // const commitsInfo = await searchCommits(screenName, repo.full_name);
        const commitsInfo = await getCommitsforRepo(screenName, repo.name);
        const cleanedCommitsInfo = commitsInfo.filter((commit) => { return (commit.author.login === screenName) })
        setCommit(cleanedCommitsInfo);

        const commitsStat = await getCommitStatforRepo(screenName, repo.name);
        const updatedCommitStat = commitsStat.filter((commit) => { return (commit.author.login === screenName) })
        setcommitSize(updatedCommitStat);

      }
    }
    fetchData()
  }, [repo])

  useEffect(() => {
    avgCommitSize(commitSize);
    setAverageCommitSize(avgCommitSize(commitSize))
  }, [commitSize])

  console.log('This is from the STATE Repo data', repo);

  const daysSinceUpdate = Math.round((new Date().getTime() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24));

  console.log('The repo was last updated on', repo.updated_at);
  console.log('How many days has it been >>>>>>>>>>>>>>>>>>>', daysSinceUpdate);
  console.log('!!!!!!!!!!!!!!!!!This is updated Cmmits Size Data', commitSize);
  console.log('!!!!!!!!!!!!!!!!!This is your avg commit size', averageCommitSize);

  // Getting the average commit size in this repo
  function avgCommitSize(commitsArray) {
    let totalAdditions = 0;
    let totalDeletions = 0;
    let totalCount = 0;

    if (commitsArray.length === 1) {
      totalAdditions = commitsArray[0].weeks.reduce((accum, week) => { return accum + week.a }, 0);
      totalDeletions = commitsArray[0].weeks.reduce((accum, week) => { return accum + week.d }, 0);
      totalCount = commitsArray[0].weeks.reduce((accum, week) => { return accum + week.c }, 0);
    }
    return { "totalAdditions": totalAdditions, "totalDeletions": totalDeletions, "totalCount": totalCount, "avgAdditions": Math.round(totalAdditions / totalCount), "avgDeletions": Math.round(totalDeletions / totalCount) }
  }

  function deleteClickHandler() {
    console.log("delete button has been clicked")
    deleteRepo(screenName, repo.name);
    console.log("delete repo has been executed")
  }

  return (
    <div className='single-repo'>
      <p>Single Repo</p>
      <br />
      <div>Repo Name: {repo.name}</div>
      <br />
      <div>It's been {daysSinceUpdate} days since you've last made any changes. </div>
      <br />
      {daysSinceUpdate > 30}
      <Link to='/repos'><button onClick={deleteClickHandler}>Delete the Repo </button></Link>

      <div>Number of Commits: {commits ? commits.length : 0}</div>
      <br />
      <div>{commits.length > 0 ? <>Did you know that your average commits consists of {averageCommitSize.avgAdditions} added lines of code and {averageCommitSize.avgDeletions} deleted lines of code. You should try to commit more often </> : <></>}</div>

      <div>
        <br />
        {/* Capping the number of comments returned */}
        {commits ? commits.slice(0, 7).map((item) => {
          return (<div key={item.sha}>
            {/* <ul>Date: {(new Date(item.commit.author.date)).toLocaleDateString("en-US")} | {(new Date(item.commit.author.date)).toLocaleTimeString("en-US")} </ul> */}
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
