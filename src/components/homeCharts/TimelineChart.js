import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
      display: false,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "Dummy data",
      data: [
        {
          x: 3,
          y: 0,
          r: 14,
        },
        {
          x: 6,
          y: 0,
          r: 7,
        },
        {
          x: 5,
          y: 0,
          r: 11,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function TimelineChart(props) {
    console.log("PROPS >>>", props.chartData)
  return (
    <div>
      <Bubble data={data} options={options} />
    </div>
  );
};
