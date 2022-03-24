var ctx = document.getElementById("myChart").getContext("2d");

// Define the data
var data = [
  {
    x: "2021-11-06 23:39:30", // date
    y: 0, // must be 0!!!
    r: 10, // # of contributions
  },
  {
    x: new Date(),
    y: 0,
    r: 3,
  },
  {
    x: new Date(),
    y: 0,
    r: 11,
  },
  {
    x: new Date(),
    y: 0,
    r: 7,
  },
  {
    x: new Date(),
    y: 0,
    r: 20,
  },
  {
    x: new Date(),
    y: 0,
    r: 2,
  },
  {
    x: new Date(),
    y: 0,
    r: 10,
  },
  {
    x: new Date(),
    y: 0,
    r: 5,
  },
]; // Add data values to array
// End Defining data
var options = {
  responsive: true, // Instruct chart js to respond nicely.
  maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
  scales: {
    yAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        type: "time",
        time: {
          displayFormats: {
            // 'millisecond': 'MMM DD',
            // 'second': 'MMM DD',
            // 'minute': 'MMM DD',
            // 'hour': 'MMM DD',
            // 'day': 'MMM DD',
            // 'week': 'MMM DD',
            // 'month': 'MMM DD',
            // 'quarter': 'MMM DD',
            year: "MMM DD, YYYY",
          },
        },
      },
    ],
  },
};

// End Defining data
var myChart = new Chart(ctx, {
  type: "bubble",
  data: {
    datasets: [
      {
        label: "Population", // Name the series
        data: data, // Specify the data values array
        borderColor: "#2196f3", // Add custom color border
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
      },
    ],
  },
  options: options,
});
