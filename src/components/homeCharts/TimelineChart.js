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
      display: false,
      min: -1,
      max: 1,
    },
    // plugins: {
    //   legend: {
    //     title: {
    //       display: false,
    //     },
    //   },
    // },
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
      backgroundColor: "rgba(35, 134, 54, 0.5)",
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
      <Bubble data={data} options={options} />
    </div>
  );
};
