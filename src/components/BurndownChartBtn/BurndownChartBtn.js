import React from "react";
import styles from "./BurndownChartBtn.module.css";

const BurndownChartBtn = ({ openModal }) => {
  const heandelClick = () => {
    openModal();
  };

  return (
    <button
      type="button"
      className={styles.graphicBtn}
      onClick={heandelClick}
    ></button>
  );
};

export default BurndownChartBtn;
