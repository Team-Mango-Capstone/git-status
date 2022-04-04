import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

export default function TimelineChart(props) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            // day: 'MMM dd yyyy',
            day: 'MM-dd-yy',
          },
          tooltipFormat: 'MMM dd yyyy',
          // tooltipFormat: 'MM',
        },
        grid: {
          color: 'rgba(200, 0, 0, 0)',
          // display: false,
        },
      },
      y: {
        display: false,
        min: -1,
        max: 1,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            console.log('!!!!', context)
            return `${context.formattedValue.slice(1, 12)} - ${context.raw.r} contributions`;
          }
        }
      }
    },
  };

  const timelineData = props.chartData.map((element) => {
    let dateElements = element.x.split('-');

    return {
      ...element,
      x: Date.UTC(dateElements[0], dateElements[1] - 1, dateElements[2]),
    };
    // UTC time records months starting at zero, so I am decrementing the
    // month to account for that.
  });

  const data = {
    datasets: [
      {
        label: 'Contributions',
        data: timelineData,
        backgroundColor: 'rgb(57, 211, 83, 0.5)',
      },
    ],
  };

  return (
    <div className='timeline-container'>
      <Bubble data={data} options={options} />
    </div>
  );
}
