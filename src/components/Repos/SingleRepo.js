import '../../css/SingleRepo.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  getSingleRepo,
  getCommitsforRepo,
  getRepoCollaborators,
  getCommitStatforRepo,
  deleteRepo,
  archiveRepo,
  getRepoLanguage,
  getRepoViews
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
  const [repoLang, setRepoLang] = useState({});
  const [repoViews, setRepoViews] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState('');
  const [dismiss, setDismiss] = useState(false);

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
        setRepoLang(repoLangData);

        const repoViewsData = await getRepoViews(screenName, repo.name);
        setRepoViews(repoViewsData);

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

  // Getting the average commit size in this repo
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

    if (commitsArray.length < 1) {
      return {
        totalAdditions,
        totalDeletions,
        totalCount,
        avgAdditions: 0,
        avgDeletions: 0,
      };
    }

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
      totalAdditions,
      totalDeletions,
      totalCount,
      avgAdditions: Math.round(totalAdditions / totalCount),
      avgDeletions: Math.round(totalDeletions / totalCount),
    };
  }

  // Getting the total view from the repo

  function deleteClickHandler() {
    deleteRepo(screenName, repo.name);
    window.location.href = '/repos';
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
      {modalOpen && (
        <SingleRepoModal
          setOpenModal={setModalOpen}
          deleteRepo={deleteClickHandler}
          archiveRepo={archiveClickHandler}
          buttonClicked={buttonClicked}
        />
      )}

      <div className='single-repo-header'>
        <div className='back-name'>
          <h2>
            <Link to='/repos'>&#171; Back</Link>
          </h2>
          <h1>
            {leftAngleBrace}
            {repoName}
            {rightAngleBrace}
          </h1>
        </div>

        {dismiss ? null : (
          <div>
            {daysSinceUpdate >= 60 && (
              <div className='delete-archive'>
                <h3>
                  It's been <span style={spanStyle}>{daysSinceUpdate}</span>{' '}
                  days since you've last made any changes.{' '}
                </h3>
                <h3>
                  Do you want to
                  <button
                    className='delete-btn'
                    value='Delete'
                    onClick={clickTest}
                  >
                    Delete
                  </button>
                  or
                  <button
                    className='archive-btn'
                    value='Archive'
                    onClick={clickTest}
                  >
                    Archive
                  </button>
                  this repo?
                </h3>
                <h3 className='dismiss-notif' onClick={() => setDismiss(true)}>
                  DISMISS FOR NOW
                </h3>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='single-repo-first-row'>
        <RepoInfo repo={repo} repoViews={repoViews} />
        <RepoActivity commits={commits} averageCommitSize={averageCommitSize} />
      </div>

      <div className='single-repo-second-row'>
        <RepoLanguages repoLang={repoLang} />
        <RepoCollaborators collabs={collabs} />
      </div>
    </div>
  );
}
export default SingleRepo;
