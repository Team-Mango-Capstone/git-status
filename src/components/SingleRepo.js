// import './css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { getSingleRepo, getCommitsforRepo, searchCommits, getRepoCollaborators, getCommitStatforRepo, deleteRepo, archiveRepo, getRepoLanguage } from './GithubAPITesting.js'
import SingleRepoModal from './SingleRepoModal.js'
import { Link } from "react-router-dom";
import LineChart from './SingleRepoLineChart.js'
import DonutChart from './SingleRepoDonut.js'

const screenName = localStorage.getItem('screenName');//

// repoLanguage(owner, repoName) 

function SingleRepo(props) {
  const params = useParams();
  const [repo, setRepo] = useState({})
  const [commits, setCommit] = useState([])
  const [collabs, setCollabs] = useState([])
  const [commitSize, setcommitSize] = useState([])
  const [averageCommitSize, setAverageCommitSize] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [buttonClicked, setButtonClicked] = useState("")
  const [repoLang, setRepoLang] = useState({})

  useEffect(() => {
    async function fetchRepoData() {
      // const repoResult = await getSingleRepo('teampluto2201', 'grace-shopper');
      const repoResult = await getSingleRepo(screenName, params.repoName);
      setRepo(repoResult);
    }
    fetchRepoData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (repo) {
        // const collabsInfo = await getRepoCollaborators("teampluto2201", 'grace-shopper');
        const collabsInfo = await getRepoCollaborators(repo.owner.login, repo.name);
        setCollabs(collabsInfo);

        const repoLangData = await getRepoLanguage(screenName, repo.name);
        setRepoLang(repoLangData)

        // const commitsInfo = await searchCommits('choi2010', 'teampluto2201/grace-shopper');
        const commitsInfo = await getCommitsforRepo(screenName, repo.name);
        if (commitsInfo) {
          const cleanedCommitsInfo = commitsInfo.filter((commit) => { return (commit.author.login === screenName) })
          setCommit(cleanedCommitsInfo);

          const commitsStat = await getCommitStatforRepo(screenName, repo.name);
          const updatedCommitStat = commitsStat.filter((commit) => { return (commit.author.login === screenName) })
          setcommitSize(updatedCommitStat);
        }
      }
    }
    fetchData()
  }, [repo])

  useEffect(() => {
    avgCommitSize(commitSize);
    setAverageCommitSize(avgCommitSize(commitSize))
  }, [commitSize])

  const daysSinceUpdate = Math.round((new Date().getTime() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24));

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

  // console.log("Repo Data ", repo)
  // console.log("Collab Data on State", collabs)
  // console.log("Commits Data ", commits)
  // console.log("CommitSize Data ", commitSize)
  console.log("RepoLanguage Data ", repoLang)


  function deleteClickHandler() {
    // let result = window.confirm("Are you sure you want to delete this repo?");
    // if (result) {
    deleteRepo(screenName, repo.name);
    window.location.href = '/repos'
    // }
  }

  function archiveClickHandler() {
    archiveRepo(screenName, repo.name);
    window.location.href = '/repos'
  }

  function clickTest(e) {
    setButtonClicked(e.target.value)
    setModalOpen(true)
  }

  return (
    <div className='single-repo'>


      <p>Single Repo</p>
      <br />
      <div>Repo Name: {repo.name}</div>

      <a href={`${repo.clone_url}`} target='_blank' rel='noreferrer'>
        <h3>Link to Github Repo Page</h3>
      </a>
      <br />
      <div>
        {/* If it's been greater than x days render button giving them an option to delete the repo.  */}

        {daysSinceUpdate >= 60 && <div>
          <div>It's been {daysSinceUpdate} days since you've last made any changes. </div>
          <h3>Do you want to Delete or Archive this repo? </h3>
          <button value="Delete" onClick={clickTest}>Delete the Repo </button>
          <button value="Archive" onClick={clickTest}>Archive the Repo </button>
        </div>}

        {modalOpen && <SingleRepoModal
          setOpenModal={setModalOpen}
          deleteRepo={deleteClickHandler}
          archiveRepo={archiveClickHandler}
          buttonClicked={buttonClicked} />}

      </div>

      <br />
      <div>Number of Commits: {commits ? commits.length : 0}</div>
      <br />
      <div>{commits.length > 0 && <>Did you know that your average commits consists of {averageCommitSize.avgAdditions} added lines of code and {averageCommitSize.avgDeletions} deleted lines of code. You should try to commit more often </>}</div>

      <div>
        <br />
        {/* Capping the number of comments returned */}
        {commits ? commits.slice(0, 7).map((item) => {
          return (<div key={item.sha}>
            <ul>Date: {item.commit.author.date.slice(0, 10)} | {(new Date(item.commit.author.date)).toLocaleTimeString("en-US")} </ul>
            <ul>Message: {item.commit.message}</ul>
            <br />
          </div>)
        }) : <div>Nothing exists</div>}
      </div>

      {/* Testing the Line Chart
      <div style={{ height: 10 }}><LineChart /></div> */}

      <div>

        <div style={{ width: 250 }}>
          {/* language chart */}
          <DonutChart repoLang={repoLang} />

        </div>

        <div>Number of Collaborators: {collabs.length}</div>
        Names : {collabs.map((item) => { return <ul key={item.id}>{item.login}</ul> })}
      </div>
    </div>
  );
}
export default SingleRepo;
