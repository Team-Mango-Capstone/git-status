import '../../css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DonutChart from './singleRepoCards/SingleRepoDonut.js'

import {
  getSingleRepo,
  getCommitsforRepo,
  getRepoCollaborators,
  getCommitStatforRepo,
  deleteRepo,
  archiveRepo,
  getRepoLanguage
} from '../GithubAPITesting.js';
import SingleRepoModal from './SingleRepoModal.js';
import RepoCollaborators from './singleRepoCards/RepoCollaborators';
import RepoInfo from './singleRepoCards/RepoInfo';
import RepoActivity from './singleRepoCards/RepoActivity';
import RepoLanguages from './singleRepoCards/RepoLanguages';

const screenName = localStorage.getItem('screenName'); //

function SingleRepo(props) {
  const params = useParams();
  const [repo, setRepo] = useState({});
  const [commits, setCommit] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [commitSize, setcommitSize] = useState([]);
  const [averageCommitSize, setAverageCommitSize] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState('');
  const [repoLang, setRepoLang] = useState({})


  useEffect(() => {
    async function fetchRepoData() {
      // const repoResult = await getSingleRepo('teampluto2201', 'grace-shopper');
      const repoResult = await getSingleRepo(screenName, params.repoName);
      setRepo(repoResult);
    }
    fetchRepoData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (repo) {
        // const collabsInfo = await getRepoCollaborators("teampluto2201", 'grace-shopper');
        const collabsInfo = await getRepoCollaborators(
          repo.owner.login,
          repo.name
        );
        setCollabs(collabsInfo);

        const repoLangData = await getRepoLanguage(screenName, repo.name);
        setRepoLang(repoLangData)

        // const commitsInfo = await searchCommits('choi2010', 'teampluto2201/grace-shopper');
        const commitsInfo = await getCommitsforRepo(screenName, repo.name);
        if (commitsInfo) {
          const cleanedCommitsInfo = commitsInfo.filter((commit) => {
            return commit.author.login === screenName;
          });
          setCommit(cleanedCommitsInfo);

          const commitsStat = await getCommitStatforRepo(screenName, repo.name);
          const updatedCommitStat = commitsStat.filter((commit) => {
            return commit.author.login === screenName;
          });
          setcommitSize(updatedCommitStat);
        }
      }
    }
    fetchData();
  }, [repo]);

  useEffect(() => {
    avgCommitSize(commitSize);
    setAverageCommitSize(avgCommitSize(commitSize));
  }, [commitSize]);

  const daysSinceUpdate = Math.round(
    (new Date().getTime() - new Date(repo.updated_at).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  // Getting the average commit size in this repo
  function avgCommitSize(commitsArray) {
    let totalAdditions = 0;
    let totalDeletions = 0;
    let totalCount = 0;

    if (commitsArray.length === 1) {
      totalAdditions = commitsArray[0].weeks.reduce((accum, week) => {
        return accum + week.a;
      }, 0);
      totalDeletions = commitsArray[0].weeks.reduce((accum, week) => {
        return accum + week.d;
      }, 0);
      totalCount = commitsArray[0].weeks.reduce((accum, week) => {
        return accum + week.c;
      }, 0);
    }
    return {
      totalAdditions: totalAdditions,
      totalDeletions: totalDeletions,
      totalCount: totalCount,
      avgAdditions: Math.round(totalAdditions / totalCount),
      avgDeletions: Math.round(totalDeletions / totalCount),
    };
  }

  // console.log('Repo Data ', repo);
  // console.log('Commits Data ', commits);
  // console.log('CommitSize Data ', commitSize);

  function deleteClickHandler() {
    // let result = window.confirm("Are you sure you want to delete this repo?");
    // if (result) {
    deleteRepo(screenName, repo.name);
    window.location.href = '/repos';
    // }
  }

  function archiveClickHandler() {
    archiveRepo(screenName, repo.name);
    window.location.href = '/repos';
  }

  function clickTest(e) {
    setButtonClicked(e.target.value);
    setModalOpen(true);
  }

  const spanStyle = { color: '#58a6ff' };
  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}> /&gt;</span>
  );
  const repoName = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>{repo.name}</span>
  );

  return (
    <div className='single-repo'>
      <h2>
        <Link to='/repos'>&#171; Back</Link>
      </h2>
      <h1>
        {leftAngleBrace}
        {repoName}
        {rightAngleBrace}
      </h1>

      <a href={`${repo.clone_url}`} target='_blank' rel='noreferrer'>
        <h3>Link to Github Repo Page</h3>
      </a>

      <div>
        {/* If it's been greater than x days render button giving them an option to delete the repo.  */}

        {daysSinceUpdate >= 60 && (
          <div>
            <div>
              It's been {daysSinceUpdate} days since you've last made any
              changes.{' '}
            </div>
            <h3>Do you want to Delete or Archive this repo? </h3>
            <button value='Delete' onClick={clickTest}>
              Delete the Repo{' '}
            </button>
            <button value='Archive' onClick={clickTest}>
              Archive the Repo{' '}
            </button>
          </div>
        )}

        {modalOpen && (
          <SingleRepoModal
            setOpenModal={setModalOpen}
            deleteRepo={deleteClickHandler}
            archiveRepo={archiveClickHandler}
            buttonClicked={buttonClicked}
          />
        )}
      </div>

      <div className='single-repo-first-row'>
        <RepoInfo repo={repo} />
        <RepoActivity
          commits={commits}
          averageCommitSize={averageCommitSize}
        // date={commits.author.date}
        />
      </div>

      <div className='single-repo-second-row'>
        <RepoLanguages repoLang={repoLang} />
        {/* <div style={{ width: 250 }}>
          language chart
          <DonutChart repoLang={repoLang} />

        </div> */}

        <RepoCollaborators collabs={collabs} />
      </div>
    </div>
  );
}
export default SingleRepo;
