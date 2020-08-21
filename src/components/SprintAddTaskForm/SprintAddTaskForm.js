import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import weekDays from "moment-business-days";
import moment from "moment";
import { connect } from "react-redux";
import { addTaskOperation } from "../../redux/operations/TasksOperatins";
import css from "./SprintAddTaskForm.module.css";
// import ModalTest from '../ModalTest/ModalTest';
import ModalSidebar from "../ModalSidebar/ModalSidebar";

const TitleField = withStyles({
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
      width: "430px",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
    },
  },
})(TextField);

const PlanedDuration = withStyles({
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
    },
    "& .MuiFormHelperText-root.Mui-error": {
      marginBottom: "60px",
      fontFamily: "Montserrat",
      color: "red",
      fontSize: "12px",
    },
    "& > *": {
      width: " 220px;",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
      outline: "none",
    },
  },
})(TextField);

const initialState = {
  title: "",
  hoursPlanned: "",
};

const oneDay = 86400000;
const SprintAddTaskForm = ({ addTask, status, onClose, sprint }) => {
  const params = useParams();
  const [taskItem, setTaskItem] = useState(initialState);
  const [noValid, setNoValid] = useState("");
  const [noValidTitle, setNoValidTitle] = useState("");
  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setNoValid("");
    setNoValidTitle("");
    setTaskItem((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const durationSprint = (startDate, duration) => {
    let sprintDay = [];
    for (let i = 0; i < duration; i++) {
      const day = weekDays(startDate, "DD.MM.YYYY").businessAdd(i)._d;
      sprintDay.push({
        currentDay: moment(day).format("DD.MM.YYYY"),
        singleHoursWasted: 0,
      });
    }
    return sprintDay;
  };

  const validation = (value, title) => {
    const num = Number(value);

    if (title.trim().length < 2) {
      setNoValidTitle(
        "Будь ласка, введіть більше 1 символа для корректной назви задачі."
      );
      return false;
    }

    if (!num) {
      setNoValid(
        "Будь ласка, оберіть скільки годин вам потрібно для цієї задачі."
      );
      return false;
    }

    if (isNaN(num)) {
      setNoValid("введіть число");
      return false;
    }

    if (num <= 0) {
      setNoValid("введіть число більше 0");
      return false;
    }

    if (value.length > 1 && value[0] === "0") {
      setNoValid("введіть число більше 0");
      return false;
    }

    if (num.toString().length > 2) {
      setNoValid("Занадто велика цифра. Будь ласка, введіть менше 3 символів");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, hoursPlanned } = taskItem;
    const { sprintId } = params;
    if (!sprint) {
      return;
    }

    if (validation(hoursPlanned, title)) {
      const task = {
        sprintId: sprint.id,
        title,
        hoursPlanned,
        hoursWasted: 0,
        hoursWastedPerDay: durationSprint(sprint.startDate, sprint.duration),
      };
      console.log(task);
      addTask(task);
      setTaskItem(initialState);
    }
    return !validation(hoursPlanned, title);
  };
  return (
    <ModalSidebar status={status} onSubmit={handleSubmit} onClose={onClose}>
      <form className={css["sprint__form"]} onSubmit={handleSubmit}>
        <h3 className={css["sprint__form-title"]}> Створення задачі </h3>
        <ul className={css["sprint__form-list"]}>
          <li className={css["sprint__form-item"]}>
            <TitleField
              id="custom-css-standard-input"
              label="Назва задачі"
              name="title"
              value={taskItem.title}
              onChange={handleChangeInput}
              error={noValidTitle ? true : undefined}
              helperText={noValidTitle}
              required
            />
          </li>
          <li className={css["sprint__form-item"]}>
            <PlanedDuration
              id="custom-css-standard-input"
              label="Заплановано годин"
              name="hoursPlanned"
              value={taskItem.hoursPlanned}
              onChange={handleChangeInput}
              error={noValid ? true : undefined}
              helperText={noValid}
              required
            />
          </li>
        </ul>
      </form>
    </ModalSidebar>
  );
};

const mapStateToProps = (state) => ({
  sprints: state.sprints.items,
});

const mapDispatchToProps = {
  addTask: addTaskOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SprintAddTaskForm);
