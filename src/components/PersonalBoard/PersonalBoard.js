import React, { useState } from 'react';
import Goals from './Goals';
import Tasks from './Tasks';
import '../../css/PersonalBoard.css';
import DonutChart from './Goals-Charts/DonutChart';

function PersonalBoard() {
  return (
    <div className='personal-board-container'>
      <Goals />
      <div className='todo-charts'>
        <Tasks />
        <hr />
        <div className='charts-container'>
          <h2>Status</h2>
          <div className='charts'>
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalBoard;
