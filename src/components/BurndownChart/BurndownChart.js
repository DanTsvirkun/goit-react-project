import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  findCurrentSprint,
  itemsSelector,
} from "../../redux/selectors/TasksSelectors";
import {
  sprintDurationSelector,
  chartDaysSelector,
  hoursPlannedSelector,
} from "../../redux/selectors/BurndownChartSelectors";
import {
  formatDateChanger,
  getBlueLineArr,
  getRedLineArr,
} from "../../helpers/datasetsForBurndownChart";
import styles from "./BurndownChart.module.css";

const BurndownChart = ({
  hoursPlanned,
  sprintDuration,
  chartDays,
  itemsArr,
  sprint,
}) => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: formatDateChanger(chartDays),
      datasets: [
        {
          label: "Запланований залишок трудовитрат",
          fill: false,
          lineTension: 0,
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgb(255, 0, 0)",
          data: getRedLineArr(hoursPlanned, sprintDuration),
        },
        {
          label: "Актуальний залишок трудовитрат",
          fill: false,
          lineTension: 0.3,
          borderColor: "rgb(0, 89, 255)",
          backgroundColor: "rgb(0, 89, 255)",
          data: getBlueLineArr(hoursPlanned, sprintDuration, itemsArr),
        },
      ],
    });
  };

  const chartOptions = {
    layout: {
      padding: {
        left: 0,
        right: 10,
        top: 20,
        bottom: 10,
      },
    },
    responsive: true,
    title: {
      display: true,
      text: sprint.title,
      fontColor: "#181C27",
      fontFamily: "'Montserrat', 'sans-serif'",
      fontSize: 20,
      padding: 0,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        pointStyle: "circle",
        borderWidth: 2,
        hoverRadius: 5,
        hoverBackgroundColor: "rgba(255, 255, 255, 0.2)",
        hoverBorderWidth: 2,
        radius: 2,
        hitRadius: 10,
      },
    },
    tooltips: {
      mode: "index",
      titleFontSize: 14,
      titleMarginBottom: 10,
      bodyFontFamily: "'Montserrat', 'sans-serif'",
      bodyFontSize: 14,
      bodySpacing: 5,
      bodyAlign: "center",
      xPadding: 8,
      yPadding: 8,
      caretPadding: 5,
      caretSize: 10,
      cornerRadius: 5,
      callbacks: {
        label: (tooltipItem) => {
          let label = tooltipItem.value;
          label = "  " + label;
          return label;
        },
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Людино-години",
            fontFamily: "'Montserrat', 'sans-serif'",
            fontSize: 14,
            fontColor: "#181C27",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontColor: "#181C27",
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
          ticks: {
            beginAtZero: false,
            fontSize: 14,
            fontColor: "#181C27",
          },
        },
      ],
    },
    legend: {
      display: true,
      fullWidth: false,
      labels: {
        fontColor: "#181C27",
        fontFamily: "'Montserrat', 'sans-serif'",
        fontSize: 14,
        boxWidth: 5,
        usePointStyle: true,
        padding: 20,
      },
    },
  };

  useEffect(() => chart(), []);

  return (
    <div className={styles.graphicWrapper}>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  hoursPlanned: hoursPlannedSelector(state),
  sprintDuration: sprintDurationSelector(state),
  chartDays: chartDaysSelector(state),
  itemsArr: itemsSelector(state),
  sprint: findCurrentSprint(state, ownProps.params),
});

export default connect(mapStateToProps)(BurndownChart);
