import React from 'react';
import HorizontalBarChart from './SingleRepoHorizontal';

function RepoLanguages(props) {
  return (
    <div className='single-repo-languages'>
      <h2>Languages Used</h2>
     
      {props.repoLang && Object.keys(props.repoLang).length > 0 ? (
      <HorizontalBarChart repoLang={props.repoLang} />
       ) : <h3>No languages available!</h3> }
   
    </div>
  );
}

export default RepoLanguages;
