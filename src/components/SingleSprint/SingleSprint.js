import React from "react";
import { connect } from "react-redux";
import { deleteSprintsOperation } from "../../redux/operations/SprintOperation";
import css from "./SingleSprint.module.css";

const SingleSprint = ({ sprint, deleteSprint, match, history, id }) => {
  const openSprintPage = () => {
    history.push(`${match.url}/${id}`);
  };

  return (
    <li className={css.single__item}>
      <div className={css.single__chart}>
        <h3 className={css.chart__header}>{sprint.title}</h3>
        <div className={css.sprint__wrapper} onClick={openSprintPage}>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Дата початку
          </p>
          <p className={`${css.chart__content} ${css.chart__content_info}`}>
            {sprint.startDate}
          </p>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Дата закінчення
          </p>
          <p className={`${css.chart__content} ${css.chart__content_info}`}>
            {sprint.endDate}
          </p>
          <p className={`${css.chart__content} ${css.chart__content_header}`}>
            Тривалість
          </p>
          <p
            className={`${css.chart__content} ${css.chart__content_info} ${css.chart__content_duration}`}
          >
            {sprint.duration}
          </p>
        </div>
        <button
          className={css.chart__button}
          id={sprint.id}
          onClick={deleteSprint}
        ></button>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSprint: (e) => {
      dispatch(deleteSprintsOperation(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(SingleSprint);
