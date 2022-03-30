import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend } from 'chart.js';
import '../../css/TopRepo.css';

ChartJS.register(BarElement, Tooltip, Legend);

export default function TopRepoChart(props) {
  const [labelData, setLabelData] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);
  
  useEffect(() => {
    let languageKeys = [];
    let languageValues = [];

    for (let key in props.languages) {
      languageKeys.push(key);
      languageValues.push(props.languages[key]);
    };
    console.log('languageKeys >>>', languageKeys)
    console.log('languageValues >>>', languageValues)
  }, [props]);

const data = {
  labels: ['Javascript', 'HTML', 'CSS'],
  // labels: labelData,
  datasets: [
    {
      label: 'Attendance for Week 1',
      data: [8566, 1020, 72],
      // data: dataInputs,
      borderColor: ['rgba(255,206,86,0.2)'],
      backgroundColor: [
        'rgba(232,99,132,1)',
        'rgba(232,211,6,1)',
        'rgba(54,162,235,1)',
        'rgba(255,159,64,1)',
        'rgba(153,102,255,1)',
      ],
      pointBackgroundColor: 'rgba(255,206,86,0.2)',
    },
  ],
};

const options = {
  indexAxis: 'y',
  plugins: {
    title: {
      // display: true,
      // text: 'Doughnut Chart',
      // color:'blue',
      font: {
        size: 34,
      },
      padding: {
        top: 30,
        bottom: 30,
      },
      animation: {
        animateScale: true,
      },
      responsive: false,
    },
  },
};

  return (
    <div className='top-repo-chart'>
      <Bar data={data} options={options} />
    </div>
  );
}
