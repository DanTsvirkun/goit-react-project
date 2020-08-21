import React, { useState } from "react";
import moment from "moment";
import css from "./CreatingSprint.module.css";
import DatePicker from "react-datepicker";
import uk from "date-fns/locale/uk";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addSprintOperation } from "../../redux/operations/SprintOperation";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import "react-datepicker/dist/react-datepicker.css";
import "./overRidingStyles.css";

registerLocale("uk", uk);

const CreatingSprint = ({ addSprint, status, onClose }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  const [duration, setDuration] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [durationErr, setDurationErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  let newLocation = useLocation();
  const projectId = newLocation.pathname.split("/")[2];

  const handleStartDate = (date) => {
    setStartDate(date);
    setDateErr("");
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
    let dateValid = true;

    if (title.trim().length < 5) {
      setTitleErr("Будь ласка, введіть коректну назву спринту.");
      titleValid = false;
    }
    if (!Number(duration)) {
      setDurationErr("Будь ласка, оберіть тривалість спринта.");
      durationValid = false;
    }
    if (!startDate) {
      setDateErr("Будь ласка, введіть релевантний день початку спринта.");
      dateValid = false;
    }
    return titleValid && durationValid && dateValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      var moment = require("moment-business-days");
      const formatedStartDate = new Date(startDate);
      const endDate = moment(formatedStartDate, "DD-MM-YYYY").businessAdd(
        duration - 1
      )._d;
      const formatedEndDate = moment(endDate).format("DD.MM.YYYY");
      const sprint = {
        title,
        startDate: formatedStartDate,
        duration,
        endDate: formatedEndDate,
        projectId,
      };
      addSprint(sprint);
      onClose();
    }
    return !formValidation();
  };

  return (
    <ModalSidebar status={status} onClose={onClose} onSubmit={handleSubmit}>
      <h2 className={css.sprint__window__header}> Створення спринта </h2>
      <form className={css.sprint__form} noValidate>
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
          {dateErr ? <div className={css.error}>{dateErr}</div> : ""}
          <span className={css.highlight}> </span>
          <span className={css.bar}> </span>
          <label className={css.sprint_label}> </label>
        </div>
        <div className={`${css.group} ${css.group__inline}`}>
          <input
            type="text"
            required
            className={`${css.input__field} ${css.input__duration}`}
            maxLength="3"
            onChange={handleDuration}
          />
          {durationErr ? <div className={css.error}>{durationErr}</div> : ""}
          <span className={css.highlight}> </span>
          <span className={css.bar}> </span>
          <label className={css.sprint_label_duration}> Тривалість </label>
        </div>
      </form>
    </ModalSidebar>
  );
};

const mapDispatchToProps = {
  addSprint: addSprintOperation,
};

export default connect(null, mapDispatchToProps)(CreatingSprint);
