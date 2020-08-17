import React, { useState } from "react";
import moment from "moment";
import css from "./CreatingSprint.module.css";
import DatePicker from "react-datepicker";
import uk from "date-fns/locale/uk";
import { connect } from "react-redux";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addSprintOperation } from "../../redux/operations/SprintOperation";

import "react-datepicker/dist/react-datepicker.css";
import "./overRidingStyles.css";

registerLocale("uk", uk);

const CreatingSprint = (addSprint) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleTitle = ({ target }) => {
    const { value } = target;
    setTitle(value);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleDuration = ({ target }) => {
    const { value } = target;
    setDuration(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sprintsId = Date.now();
    //гет запрос от Вани (description, projectId)
    const sprint = { title, startDate, duration };
  };

  return (
    <div className={css.sprint__window__overlay}>
      <div className={css.sprint__window}>
        <button className={css.close__sprint__window}> </button>
        <div className={css.sprint__window__content}>
          <h2 className={css.sprint__window__header}> Створення спринта </h2>
          <form className={css.sprint__form}>
            <div className={css.group}>
              <input
                type="text"
                required
                className={`${css.input__field} ${css.input__name}`}
                onChange={handleTitle}
              />
              <span className={css.highlight}> </span>
              <span className={css.bar}> </span>
              <label className={css.sprint_label}> Назва спринта </label>
            </div>
            <div
              className={`${css.group} ${css.group__inline} ${css.group__start}`}
            >
              <DatePicker
                popperClassName={css.some_custom_class}
                selected={startDate}
                onChange={handleStartDate}
                locale="uk"
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата початку"
                showMonthPicker
              />
              <span className={css.highlight}> </span>
              <span className={css.bar}> </span>
              <label className={css.sprint_label}> </label>
            </div>
            <div className={`${css.group} ${css.group__inline}`}>
              <input
                type="text"
                required
                className={`${css.input__field} ${css.input__duration}`}
                onChange={handleDuration}
              />
              <span className={css.highlight}> </span>
              <span className={css.bar}> </span>
              <label className={css.sprint_label}> Тривалість </label>
            </div>
            <div className={css.button__wrapper}>
              <button className={css.button__ready}> </button>
            </div>
          </form>
          <button className={css.button__decline}> </button>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = {};

const mapDispatchToProps = {
  addSprint: addSprintOperation,
};

export default connect(null, mapDispatchToProps)(CreatingSprint);
