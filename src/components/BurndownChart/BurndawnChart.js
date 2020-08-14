import React, { Component } from "react";
import graphic from "./iconsBC/graphic-example.png";
import styles from "./BurndownChart.module.css";

class BurndawnChart extends Component {
  render() {
    return (
      <div className={styles.graphicWrapper}>
        <img
          className={styles.graphicImg}
          src={graphic}
          alt="Sprint burndown chart"
        />
      </div>
    );
  }
}

export default BurndawnChart;
