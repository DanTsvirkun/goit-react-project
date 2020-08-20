import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { itemsSelector } from "../../redux/selectors/TasksSelectors";
import {
  chartDaysSelector,
  hoursPlannedSelector,
  sumHoursWastedSelector,
} from "../../redux/selectors/BurndownChartSelectors";
import {
  formatDateChanger,
  getBlueLineArr,
  getRedLineArr,
} from "../../helpers/datasetsForBurndownChart";
import styles from "./BurndownChart.module.css";

const BurndownChart = ({
  hoursPlanned,
  hoursWasted,
  sprintDuration,
  chartDays,
  itemsArr,
}) => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: formatDateChanger(chartDays),
      datasets: [
        {
          label: "Актуальний залишок трудовитрат в годинах",
          backgroundColor: "transparent",
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 2,
          data: getRedLineArr(hoursPlanned, sprintDuration),
        },
        {
          label: "Запланований залишок трудовитрат в годинах",
          borderColor: "rgb(0, 89, 255)",
          backgroundColor: "transparent",
          borderWidth: 2,
          data: getBlueLineArr(
            hoursPlanned,
            sprintDuration,
            itemsArr,
            hoursWasted
          ),
        },
      ],
    });
  };

  useEffect(() => chart(), []);

  return (
    <div className={styles.graphicWrapper}>
      <Line
        options={{
          responsive: true,
          title: { text: "Burndown Chart (Calendar Team)", display: true },
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

const mapStateToProps = (state) => ({
  hoursPlanned: hoursPlannedSelector(state),
  sprintDuration: itemsSelector(state)[0].hoursWastedPerDay.length,
  chartDays: chartDaysSelector(state),
  itemsArr: itemsSelector(state),
  hoursWasted: sumHoursWastedSelector(state),
});

export default connect(mapStateToProps)(BurndownChart);
