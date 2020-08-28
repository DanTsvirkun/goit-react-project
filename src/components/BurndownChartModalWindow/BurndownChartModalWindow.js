import React, { Component } from "react";
import BurndawnChart from "../BurndownChart/BurndownChart";
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
    this.changeScrollStyle();
  };

  handleClickOnOverlay = (e) => {
    e.target.nodeName === "DIV" && this.props.onClose();
    this.changeScrollStyle();
  };

  handleClickOnCloseBtn = (e) => {
    e.target.nodeName === "BUTTON" && this.props.onClose();
    this.changeScrollStyle();
  };

  changeScrollStyle = () => {
    document.querySelector("body").style.overflow = "unset";
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.handleClickOnOverlay}>
        <div className={styles.modal}>
          <BurndawnChart params={this.props.params} />
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
