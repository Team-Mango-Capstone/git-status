import React from 'react';
import DonutChart from './SingleRepoDonut.js';
import HorizontalBarChart from './SingleRepoHorizontal';

function RepoLanguages(props) {
  return (
    <div className='single-repo-languages'>
      <h2>RepoLanguages</h2>
      <div style={{ width: 500 }}>
        {/* language chart */}
        {/* <DonutChart repoLang={props.repoLang} /> */}
        <HorizontalBarChart repoLang={props.repoLang} />
      </div>
    </div>
  );
}

export default RepoLanguages;
