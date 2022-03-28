import React, {useContext} from 'react';
import '../../../css/BarChart.css';
import { GlobalContext } from '../../../context/GlobalState';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

const labels = ['COMMITS'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Actual Commits',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Goal Commits',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function BarChart() {
  const { currentGoals, completedGoals } = useContext(GlobalContext);

  // console.log('current', currentGoals);
  // console.log('completed', completedGoals);

  const barChartData = {
    labels: ["Commits"],
    datasets: [
      {
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        data: [224],
        label: "Actual",
        backgroundColor: "rgba(204, 102, 211)",
      },
      {
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        data: [510],
        label: "Target",
        backgroundColor: "rgba(71, 72, 208)",
      }
    ]
  };

  // const options = {
  //   legend: {
  //     display: true, //Is the legend shown?
  //     position: "top" //Position of the legend.
  //   },
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           display: true,
  //         },
  //       },
  //     ],
  //     xAxes: {
  //       ticks: {
  //         display: true,
  //       },
  //     },
  //   }
  // }

  return (
    <div className="goals-bar-chart">
    <button className='status-btn'>Set commit target</button>
    <input></input>
    <Bar
      type="bar"
      width={60}
      height={60}
      // options={options}
      data={barChartData}
    />
   </div>
  )
}