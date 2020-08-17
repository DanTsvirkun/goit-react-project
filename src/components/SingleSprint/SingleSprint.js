import React from "react";
import css from "./SingleSprint.module.css";

const SingleSprint = () => {
  return (
    <li className={css.single__item}>
      <div className={css.single__chart}>
        <h3 className={css.chart__header}>Sprint Burndown Chart 1</h3>
        <div className={css.sprint__wrapper}>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Дата початку
          </p>
          <p className={`${css.chart__content} ${css.chart__content_info}`}>
            10 лип
          </p>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Дата закінчення
          </p>
          <p className={`${css.chart__content} ${css.chart__content_info}`}>
            22 лип
          </p>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Тривалість
          </p>
          <p
            className={`${css.chart__content} ${css.chart__content_info} ${css.chart__content_duration}`}
          >
            226
          </p>
        </div>
        <button className={css.chart__button}></button>
      </div>
    </li>
  );
};

export default SingleSprint;
