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

const CreatingSprint = ({ addSprint }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  const [duration, setDuration] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [durationErr, setDurationErr] = useState("");

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleTitle = ({ target }) => {
    const { value } = target;
    setTitle(value);
    setTitleErr("");
  };

  const isWeekday = (date) => {
    const day = date.getDay(date);
    return day !== 0 && day !== 6;
  };

  const handleDuration = ({ target }) => {
    const { value } = target;
    setDuration(value);
    setDurationErr("");
  };

  const formValidation = () => {
    let titleValid = true;
    let durationValid = true;

    if (title.trim().length < 5) {
      setTitleErr("Будь ласка, введіть коректну назву спринту.");
      titleValid = false;
    }
    if (!Number(duration)) {
      setDurationErr("Будь ласка, оберіть тривалість спринта.");
      durationValid = false;
    }
    return titleValid && durationValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      var moment = require("moment-business-days");
      const formatedStartDate = new Date(startDate);
      const endDate = moment(formatedStartDate, "DD-MM-YYYY").businessAdd(
        duration
      )._d;
      console.log(endDate);
      const formatedEndDate = moment(endDate).format("DD.MM.YYYY");
      const sprint = {
        title,
        startDate: formatedStartDate,
        duration,
        endDate: formatedEndDate,
      };
      addSprint(sprint);
    } else {
      return;
    }
  };

  return (
    <div className={css.sprint__window__overlay}>
      <div className={css.sprint__window}>
        <button className={css.close__sprint__window}> </button>
        <div className={css.sprint__window__content}>
          <h2 className={css.sprint__window__header}> Створення спринта </h2>
          <form className={css.sprint__form} onSubmit={handleSubmit} noValidate>
            <div className={css.group}>
              <input
                type="text"
                required
                className={`${css.input__field} ${css.input__name}`}
                onChange={handleTitle}
              />
              {titleErr ? <div className={css.error}>{titleErr}</div> : ""}
              <span className={css.highlight}> </span>
              <span className={css.bar}> </span>
              <label className={css.sprint_label}> Назва спринта </label>
            </div>
            <div
              className={`${css.group} ${css.group__inline} ${css.group__start}`}
            >
              <DatePicker
                selected={startDate}
                onChange={handleStartDate}
                locale="uk"
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата початку"
                filterDate={isWeekday}
                minDate={moment().toDate()}
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

              {durationErr ? (
                <div className={css.error}>{durationErr}</div>
              ) : (
                ""
              )}
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

const mapDispatchToProps = {
  addSprint: addSprintOperation,
};

export default connect(null, mapDispatchToProps)(CreatingSprint);
