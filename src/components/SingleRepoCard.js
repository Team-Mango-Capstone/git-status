import '../css/SingleRepoCard.css';
import { Link } from "react-router-dom";

const SingleRepoCard = ({ repo, name, clone_url, updated_at }) => {
  const updatedAt = repo.updated_at.slice(0, 10);
  return (
    <div className='single-repo-card'>
      <a href={`${clone_url}`} target='_blank' rel='noreferrer'>
        <h2>{repo.name}</h2>
      </a>
      <hr />
      <p>Last updated at:</p>
      <p>{updatedAt}</p>
      <Link to={`/repos/${repo.name}`}>link to repo</Link>
    </div>
  );
};

export default SingleRepoCard;
