import React from "react";
import css from "./SprintHeader.module.css";
import BurndownChartBtn from "../BurndownChartBtn/BurndownChartBtn";

const SprintHeader = ({ title = "Sprint Burndown Chart 1" }) => {
  return (
    <div className={css.container}>
      <div className={css["sprint__date"]}>
        <p className={css["sprint__date-sprint"]}>
          2 <span className={css["sprint__date-sprint--span"]}> / 12 </span>
        </p>
        <p className={css["sprint__current-date"]}>08.08.2020</p>
      </div>
      <div className={css["sprint__header-wrapper"]}>
        <div className={css["sprint__title-wrapper"]}>
          <h1 className={css["sprint__title"]}> {title} </h1>
          <button className={css["sprint__change-name-btn"]}></button>
        </div>
        <div className={css["sprint__add-task-wrapper"]}>
          <button className={css["sprint__add-task-btn"]}></button>
          <p className={css["sprint__add-task-offer"]}>Створити задачу</p>
        </div>
      </div>
      <BurndownChartBtn />
    </div>
  );
};

export default SprintHeader;
