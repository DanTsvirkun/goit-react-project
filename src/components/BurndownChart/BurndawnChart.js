import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styles from "./BurndownChart.module.css";

class BurndawnChart extends Component {
  state = {
    data: {
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
          data: [151.0, 129, 107, 86, 64, 43, 21, 0],
        },
        {
          label: "Запланований залишок трудовитрат в годинах",
          borderColor: "rgb(0, 89, 255)",
          backgroundColor: "transparent",
          borderWidth: 2,
          data: [151, 123, 102, 84, 64, 40, 12, 0],
        },
      ],
    },
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.graphicWrapper}>
        <Line
          options={{
            responsive: true,
          }}
          data={data}
        />
      </div>
    );
  }
}

export default BurndawnChart;
