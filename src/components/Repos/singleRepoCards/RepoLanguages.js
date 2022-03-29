import React from 'react';
import DonutChart from './SingleRepoDonut.js'


function RepoLanguages(props) {
  return (
    <div className='single-repo-languages'>
      <h2>RepoLanguages</h2>
      <div style={{ width: 250 }}>
        {/* language chart */}
        <DonutChart repoLang={props.repoLang} />
      </div>
    </div>
  );
}

export default RepoLanguages;
