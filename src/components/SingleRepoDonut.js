import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../css/DonutChart.css';
import Chart from 'react-apexcharts';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.defaultFont = 'Georgia';

const dummyData = {
    'CSS': 959,
    "HTML": 221,
    "JavaScript": 64845
}
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
    console.log("language", language);
}

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
export default function DonutChart(props) {
    console.log("This is the props inside th Donut Chart", props)

    const data = {
        labels: languageLabels(props.repoLang)[0],
        datasets: [
            {
                label: 'Languages in Repo',
                data: languageLabels(props.repoLang)[1],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['#563d7c', '#e34c26', '#fle05a'],
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
