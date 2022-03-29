import React, { useState } from 'react';
import Goals from './Goals';
import Tasks from './Tasks';
import '../../css/PersonalBoard.css';
import BarChart from './Goals-Charts/BarChart';
import DonutChart from './Goals-Charts/DonutChart';


function PersonalBoard() {

  return (
    <div className='personal-board-container'>
      <Goals />
      <div className='todo-list'>
      <Tasks/>
      </div>
      <div className='charts-container'>
      <h2>Status</h2>
        <DonutChart/>
        <br/>
        <br/>
        <BarChart />
      </div>
    </div>
  );
};

export default PersonalBoard;
