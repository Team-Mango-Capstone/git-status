import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
// import 'chartjs-adapter-date-fns';


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);


export default function TimelineChart(props) {
  console.log("PROPS >>>", props.chartData)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    // x: {
    //   type: 'time',
    //   time: {
    //       unit: 'day',
    //       displayFormats: {
    //         week: 'LLL do yyyy'
    //       }
    //   }
    // },
    // xAxes: [{
    //   type: 'time',
    //   time: {
    //     unit: 'day',
    //     tooltipFormat: 'YYYY-MM-DD'
    //   }
    // }],
    y: {
      // beginAtZero: true,
      display: false,
      min: -1,
      max: 1,
    },
  },
};

const timelineData = props.chartData.map((element) => {
  let dateElements = element.x.split('-')

  return {...element, x: Date.UTC(dateElements[0], dateElements[1], dateElements[2])}
});

console.log('TIMELINE DATA >>>>', timelineData)

const data = {
  datasets: [
    {
      label: "Your contributions",
      data: timelineData,
      // [
      //   {
      //     x: Date.UTC(2022, 3, 1),
      //     // x: 3,
      //     y: 0,
      //     r: 11,
      //   },
      //   {
      //     x: Date.UTC(2022, 3, 8),
      //     // x: 8,
      //     y: 0,
      //     r: 7,
      //   },
      //   {
      //     x: Date.UTC(2022, 3, 15),
      //     // x: 6,
      //     y: 0,
      //     r: 14,
      //   },
      // ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};



    // useEffect(() => {
    //   const script = document.createElement('script');
    //   script.src = "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js";
    //   script.async = true;
    //   document.body.appendChild(script);
    // return () => {
    //     document.body.removeChild(script);
    //   }
    // }, []);

  return (
    <div className='timeline-container'>
      <Bubble data={data} options={options} id='bubble-chart'/>
    </div>
  );
};
