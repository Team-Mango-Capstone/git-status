// SingleRepo Donut File
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../../../css/SingleRepoLanguages.css';

ChartJS.register(ArcElement); //Tooltip removed
ChartJS.register(ChartDataLabels);
ChartJS.defaults.defaultFont = 'Georgia';

function languageLabels(obj) {
  let dataArr = [];
  let langArr = [];
  for (let language in obj) {
    langArr.push(language);
    dataArr.push(obj[language]);
  }
  dataArr = [langArr, dataArr];
  return dataArr;
}

const options = {
  responsive: true,
  plugins: {
    title: {
      font: {
        size: 20,
      },
      padding: {
        top: 30,
        bottom: 30,
      },
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
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  indexAxis: 'y',
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
      },
    },
  },
};

export default function horizontalBarChart(props) {
  const data = {
    labels: languageLabels(props.repoLang)[0],
    datasets: [
      {
        label: 'Languages in Repo',
        data: languageLabels(props.repoLang)[1],
        backgroundColor: ['#0074D9', '#FF4136', '#2ECC40'],
      },
    ],
  };

  return (
    <div className='horizontal-bar-chart'>
      <Bar data={data} options={options} />
    </div>
  );
}
