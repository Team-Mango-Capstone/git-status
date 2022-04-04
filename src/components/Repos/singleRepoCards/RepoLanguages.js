import React from 'react';
import HorizontalBarChart from './SingleRepoHorizontal';
import { loadingCard } from '../../Elements';

function RepoLanguages(props) {
  const isLoading = props.isLoading;
  return (
    <div className='single-repo-languages'>
      <h2>Languages Used</h2>
      {isLoading ? (
        loadingCard
      ) : props.repoLang && Object.keys(props.repoLang).length > 0 ? (
        <HorizontalBarChart repoLang={props.repoLang} />
      ) : (
        <h3>No languages available!</h3>
      )}
    </div>
  );
}

export default RepoLanguages;
