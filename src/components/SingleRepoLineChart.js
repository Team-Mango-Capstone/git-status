import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart() {
    // { chartData }
    const rawData = [
        { w: 1644105600, a: 13582, d: 178, c: 6 },
        { w: 1644710400, a: 158, d: 233, c: 1 },
        { w: 1645315200, a: 0, d: 0, c: 0 }];

    const revisedData = rawData.filter((week) => week.c > 0)
        .map((week) => { return { x: new Date(week.w * 1000), y: week.a - week.d } })

    console.log("This is the date from the revised Data Array", revisedData[0].x)

    /////////////////////
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                type: "time",
                time: {
                    displayFormats: {
                        day: "MMM dd yyyy",
                    },
                    tooltipFormat: 'MMM dd yyyy'
                },
            },

        },
    };

    ///////////////////////////

    const chartData = {
        labels: revisedData.map((week) => week.x),
        datasets: [
            {
                label: "Lines of Code",
                data: revisedData.map((week) => week.y),
                backgroundColor: [
                    "white"
                ],
                borderColor: "white",
                borderWidth: 2,
            },
        ],
    }


    return <Line width={10} height={10} data={chartData} options={options} />;

    // return <Line data={chartData} />;
}

export default LineChart;