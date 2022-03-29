import React, {useContext} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../../css/DonutChart.css';
import Chart from 'react-apexcharts';
import { GlobalContext } from '../../../context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.defaultFont = 'Georgia';

const options = {
  plugins: {
    title: {
    //   display: true,
    //   text: 'Doughnut Chart',
    //   color: 'blue',
      font: {
        size: 34,
      },
      padding: {
        top: 30,
        bottom: 30,
      },
      responsive: true,
      animation: {
        animateScale: true,
      },
    },
  },
};
export default function DonutChart() {
  const { currentGoals, completedGoals } = useContext(GlobalContext);
  // console.log('current', currentGoals);
  // console.log('completed', completedGoals);
  const data = {
    labels: ['In progress', 'Completed Goals'],
    datasets: [
      {
        label: 'Attendance for Week 1',
        data: [currentGoals.length, completedGoals.length],
        borderColor: ['rgba(255,206,86,0.2)'],
        backgroundColor: ['rgba(87,255,106)', 'rgba(58,135,198)'],
        pointBackgroundColor: 'rgba(255,206,86,0.2)',
      },
    ],
  };

  return (
    <div className='goals-donut-chart'>
        <div className='donut'>
       
        <Doughnut data={data} options={options} />
        </div>
      
    </div>
  );
}
