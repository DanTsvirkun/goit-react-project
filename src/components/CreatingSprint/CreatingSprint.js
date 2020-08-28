import React, { useState } from "react";
import moment from "moment";
import css from "./CreatingSprint.module.css";
import DatePicker from "react-datepicker";
import uk from "date-fns/locale/uk";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import { addSprintOperation } from "../../redux/operations/SprintOperation";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import "react-datepicker/dist/react-datepicker.css";
import "./overRidingStyles.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import momentDays from "moment-business-days";

registerLocale("uk", uk);

const NameTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "50px",
    },
    "& .MuiInputBase-root.Mui-error": {
      marginBottom: "0px",
    },
    "& label.Mui-focused": {
      color: "#ff6b08",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff6b08",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      marginBottom: "50px",
      fontFamily: "Montserrat",
      color: "red",
      fontSize: "12px",
    },
    "& > *": {
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
      width: "430px",
      margin: "0 50px",
    },
  },
})(TextField);

const DurationTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "60px",
    },
    "& .MuiInputBase-root.Mui-error": {
      marginBottom: "0px",
    },
    "& label.Mui-focused": {
      color: "#ff6b08",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff6b08",
      width: "200px",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      marginBottom: "60px",
      fontFamily: "Montserrat",
      color: "red",
      fontSize: "12px",
    },
    "& > *": {
      width: "200px",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
      outline: "none",
      marginLeft: "29px",
    },
  },
})(TextField);

const CreatingSprint = ({ addSprint, status, onClose }) => {
  const [hidePastDays, setHidePastDays] = useState(false);
  const [hint, setHint] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  const [duration, setDuration] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [durationErr, setDurationErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  let newLocation = useLocation();
  const projectId = newLocation.pathname.split("/")[2];
  const pastDaysToggle = () => {
    setHidePastDays((state) => !state);
  };

  const hintActivator = () => {
    setHint((state) => !state);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setDateErr("");
  };

  const onCustomClose = () => {
    setTitleErr("");
    setDurationErr("");
    setDateErr("");
    onClose();
    setStartDate(Date.now());
  };

  const handleTitle = ({ target }) => {
    const { value } = target;
    setTitle(value);
    setTitleErr("");
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const ifIsWeekEnd = (date) => {
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDay();
    if (day === 6) {
      return date + 172800000;
    } else if (day === 0) {
      return date + 86400000;
    }
    return date;
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

    if (title.length > 40) {
      setTitleErr(
        `Довжина назви спринта задовга: ${title.length} символів. Допустимо: 40.`
      );
      titleValid = false;
    }

    if (!Number(duration)) {
      setDurationErr("Будь ласка, оберіть тривалість спринта.");
      durationValid = false;
    }

    if (duration.length > 3) {
      setDurationErr("Тривалість спринта, має містити не більше 3-х символів.");
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
      const formatedStartDate = new Date(startDate);
      const endDate = momentDays(formatedStartDate, "DD-MM-YYYY").businessAdd(
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
    <ModalSidebar
      status={status}
      onClose={onCustomClose}
      onSubmit={handleSubmit}
    >
      <h2 className={css.sprint__window__header}> Створення спринта </h2>
      <form
        className={css.sprint__form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <NameTextField
          id="custom-css-standard-input"
          label="Назва спринта"
          name="title"
          onChange={handleTitle}
          error={titleErr ? true : undefined}
          helperText={titleErr}
        />

        <div className={css.input_gather}>
          <DatePicker
            selected={ifIsWeekEnd(startDate)}
            onChange={handleStartDate}
            locale="uk"
            dateFormat="dd.MM.yyyy"
            placeholderText="Дата початку"
            filterDate={isWeekday}
            minDate={!hidePastDays && moment().toDate()}
            showMonthPicker
            className={css.date_picker}
          />

          <input
            className={css.checkbox_past_date}
            onChange={pastDaysToggle}
            onMouseEnter={hintActivator}
            onMouseLeave={hintActivator}
            type="checkbox"
          />
          {hint && <p className={css.hint}>Вкл/Викл попереднi днi</p>}

          <DurationTextField
            id="custom-css-standard-input"
            label="Тривалість"
            name="duration"
            onChange={handleDuration}
            error={durationErr ? true : undefined}
            helperText={durationErr}
          />
        </div>
        {dateErr ? <div className={css.error}>{dateErr}</div> : ""}
      </form>
    </ModalSidebar>
  );
};

const mapDispatchToProps = {
  addSprint: addSprintOperation,
};

export default connect(null, mapDispatchToProps)(CreatingSprint);
