import React, { useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
=======
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
import weekDays from "moment-business-days";
import moment from "moment";
import { connect } from "react-redux";
import { addTaskOperation } from "../../redux/operations/TasksOperatins";
import css from "./SprintAddTaskForm.module.css";
// import ModalTest from '../ModalTest/ModalTest';
import ModalSidebar from "../ModalSidebar/ModalSidebar";
<<<<<<< HEAD
=======

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

>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
const initialState = {
  title: "",
  hoursPlanned: "",
};

const oneDay = 86400000;
<<<<<<< HEAD
const SprintAddTaskForm = ({
  startDate = "12.07.2020",
  duration = 11,
  endDate = 1598002200000,
  addTask,
  status,
  onClose,
}) => {
=======
const SprintAddTaskForm = ({ addTask, status, onClose, sprint }) => {
>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
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
<<<<<<< HEAD
        "Будь ласка, введіть більше 6 символів для корректной назви задачі."
=======
        "Будь ласка, введіть більше 1 символа для корректной назви задачі."
>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
      );
      return false;
    }

    if (!num) {
      setNoValid(
        "Будь ласка, оберіть скільки годин вам потрібно для цієї задачі."
      );
      return false;
    }

<<<<<<< HEAD
    if (num.toString().length > 6) {
      setNoValid("Занадто велика цифра. Будь ласка, введіть менше 6 символів");
=======
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
>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
<<<<<<< HEAD
=======
    console.log(params.sprintId);

>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
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
<<<<<<< HEAD
            <label>
              <input
                className={css["sprint__form-field"]}
                type="text"
                value={taskItem.title}
                name="title"
                onChange={handleChangeInput}
                required
                placeholder="Назва задачі"
                minLength="1"
              />
            </label>
          </li>
          <li className={css["sprint__form-item"]}>
            <label>
              <input
                className={css["sprint__form-field"]}
                type="text"
                value={taskItem.hoursPlanned}
                name="hoursPlanned"
                onChange={handleChangeInput}
                required
                placeholder="Заплановано годин"
                minLength="1"
              />
            </label>
          </li>
          {noValidTitle && (
            <li className={css["sprint__form-field--validation-title"]}>
              {noValidTitle}
            </li>
          )}
          {noValid && (
            <li className={css["sprint__form-field--validation-plan"]}>
              {noValid}
            </li>
          )}
=======
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
>>>>>>> 9c49dd51bca9c0172e6923d970b0eeed4aa75b1d
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
