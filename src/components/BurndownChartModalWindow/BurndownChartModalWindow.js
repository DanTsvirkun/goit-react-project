import React, { Component } from "react";
import BurndawnChart from "../BurndownChart/BurndawnChart";
import styles from "./BurndownChartModalWindow.module.css";

class BurndownChartModalWindow extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    e.code === "Escape" && this.props.onClose();
  };

  handleClickOnOverlay = (e) => {
    e.target.nodeName === "DIV" && this.props.onClose();
  };

  handleClickOnCloseBtn = (e) => {
    e.target.nodeName === "BUTTON" && this.props.onClose();
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.handleClickOnOverlay}>
        <div className={styles.modal}>
          <BurndawnChart />
          <button
            type="button"
            className={styles.closeGraphicBtn}
            onClick={this.handleClickOnCloseBtn}
          ></button>
        </div>
      </div>
    );
  }
}

export default BurndownChartModalWindow;
