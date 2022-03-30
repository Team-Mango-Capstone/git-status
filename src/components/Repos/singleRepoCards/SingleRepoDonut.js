// SingleRepo Donut File
import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../../../css/DonutChart.css';
import Chart from 'react-apexcharts';

ChartJS.register(ArcElement, Legend); //Tooltip removed
ChartJS.register(ChartDataLabels);
// ChartJS.defaults.color = '#fff';
ChartJS.defaults.defaultFont = 'Georgia';

const dummyData = {
  CSS: 959,
  HTML: 221,
  JavaScript: 64845,
};
function languageLabels(obj) {
  let dataArr = [];
  let langArr = [];
  let valueArr = [];
  for (let language in obj) {
    langArr.push(language);
    dataArr.push(obj[language]);
  }
  dataArr = [langArr, dataArr];
  return dataArr;
}

for (let language in dummyData) {
  console.log('language', language);
}

const options = {
  plugins: {
    title: {
      font: {
        size: 20,
      },
      padding: {
        top: 30,
        bottom: 30,
      },
      responsive: true,
      animation: {
        animateScale: false,
      },
    },
  },

  tooltip: { enabled: false },

  plugins: [ChartDataLabels],
  plugins: {
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
  },
};
export default function DonutChart(props) {
  const data = {
    labels: languageLabels(props.repoLang)[0],
    datasets: [
      {
        label: 'Languages in Repo',
        data: languageLabels(props.repoLang)[1],
        // borderColor: ['rgba(255,206,86,0.2)'],
        backgroundColor: ['#0074D9', '#FF4136', '#2ECC40'],

        // backgroundColor: ['563d7c', '#fle05a', '#e34c26'],
        // pointBackgroundColor: 'rgba(255,206,86,0.2)',
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
