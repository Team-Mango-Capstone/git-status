import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../css/TopRepo.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopRepoChart(props) {
  let languageKeys = [];
  let languageValues = [];

  for (let key in props.languages) {
    languageKeys.push(key);
    languageValues.push(props.languages[key]);
  }

  const data = {
    labels: languageKeys,
    datasets: [
      {
        data: languageValues,
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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(0) + '%';
          return percentage;
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className='top-repo-chart'>
      <Bar data={data} options={options} />
    </div>
  );
}
