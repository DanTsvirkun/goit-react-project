import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";
import styles from "./BurndownChart.module.css";
import { itemsSelector } from "../../redux/selectors/TasksSelectors";

const BurndawnChart = ({ hoursPlanned, hoursWastedPerDay, chartDays }) => {
  const [chartData, setChartData] = useState({});
  const duration = hoursWastedPerDay - 1;
  const sprinHoursPerDay = hoursPlanned / duration;
  console.log(chartDays);

  const getArrey = () => {
    const result = [hoursPlanned];
    let currentHours = hoursPlanned;
    for (let i = 0; i < duration; i += 1) {
      result.push((currentHours - sprinHoursPerDay).toFixed(1));
      currentHours -= sprinHoursPerDay;
    }
    return result;
  };

  // const getData = () => {
  //   const result = [];
  //   for (let i = 0; i < hoursWastedPerDay; i += 1) {
  //     result.push(moment(chartDays[0]).add(0, "day").format("dd"));
  //   }
  //   return result;
  // };

  // const daysFormat = moment().format("DD.MM");
  // console.log(getData());

  const chart = () => {
    setChartData({
      labels: [...chartDays],
      datasets: [
        {
          label: "Актуальний залишок трудовитрат в годинах",
          backgroundColor: "transparent",
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 2,
          data: getArrey(),
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

const mapStateToProps = (state, ownProps) => ({
  hoursPlanned: itemsSelector(state)
    .map((task) => Number(task.hoursPlanned))
    .reduce((acc, taskValue) => {
      return (acc += taskValue);
    }, 0),
  hoursWastedPerDay: itemsSelector(state)[0].hoursWastedPerDay.length,
  chartDays: itemsSelector(state)[0].hoursWastedPerDay.map((task) => {
    // const daysFormat = moment(task.currentDay);
    return task.currentDay;
  }),
});

export default connect(mapStateToProps)(BurndawnChart);

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
