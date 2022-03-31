import React from 'react';
import HorizontalBarChart from './SingleRepoHorizontal';

function RepoLanguages(props) {
  return (
    <div className='single-repo-languages'>
      <h2>Languages Used</h2>
      <HorizontalBarChart repoLang={props.repoLang} />
    </div>
  );
}

export default RepoLanguages;
