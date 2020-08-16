import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./BurndownChart.module.css";

const BurndawnChart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: [
        "12 Aug",
        "13 Aug",
        "14 Aug",
        "17 Aug",
        "18 Aug",
        "19 Aug",
        "20 Aug",
        "21 Aug",
      ],
      datasets: [
        {
          label: "Актуальний залишок трудовитрат в годинах",
          backgroundColor: "transparent",
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 2,
          data: [151, 129, 107, 86, 64, 43, 21, 0],
        },
        {
          label: "Запланований залишок трудовитрат в годинах",
          borderColor: "rgb(0, 89, 255)",
          backgroundColor: "transparent",
          borderWidth: 2,
          data: [151, 123, 102, 84, 64, 40, 12, 0],
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className={styles.graphicWrapper}>
      <Line
        options={{
          responsive: true,
          title: { text: "Burndawn Chart (Calendar Team)", display: true },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Людино-години",
                  // fontFamily: "'Montserrat', 'sans-serif'",
                },
                ticks: {
                  beginAtZero: true,
                  // callback: function (value, index, values) {
                  //   console.log("value", value);
                  //   console.log("index", index);
                  //   console.log("values", values);

                  //   return value;
                  // },
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default BurndawnChart;

// class BurndawnChart extends Component {
//   state = {
//     data: {
//       labels: [
//         "12 Aug",
//         "13 Aug",
//         "14 Aug",
//         "17 Aug",
//         "18 Aug",
//         "19 Aug",
//         "20 Aug",
//         "21 Aug",
//       ],
//       datasets: [
//         {
//           label: "Актуальний залишок трудовитрат в годинах",
//           backgroundColor: "transparent",
//           borderColor: "rgb(255, 0, 0)",
//           borderWidth: 2,
//           data: [151.0, 129, 107, 86, 64, 43, 21, 0],
//         },
//         {
//           label: "Запланований залишок трудовитрат в годинах",
//           borderColor: "rgb(0, 89, 255)",
//           backgroundColor: "transparent",
//           borderWidth: 2,
//           data: [151, 123, 102, 84, 64, 40, 12, 0],
//         },
//       ],
//     },
//   };

//   render() {
//     const { data } = this.state;
//     return (
//       <div className={styles.graphicWrapper}>
//         <Line
//           options={{
//             responsive: true,
//             title: { text: "Burndawn Chart (Calendar Team)", display: true },
//           }}
//           data={data}
//         />
//       </div>
//     );
//   }
// }

// export default BurndawnChart;
