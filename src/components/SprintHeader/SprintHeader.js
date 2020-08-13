import React from "react";
import css from "./SprintHeader.module.css";
const SprintHeader = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}> Sprint Burndown Chart </h1>
    </div>
  );
};

export default SprintHeader;
