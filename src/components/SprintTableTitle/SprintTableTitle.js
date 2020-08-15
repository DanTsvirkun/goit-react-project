import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import css from "./SprintTableTitle.module.css";
import animation from "./animation.module.css";

const SprintTableTitle = () => {
  const [taskFilter, setTaskFilter] = useState("");
  const [toggleInput, setToggleInput] = useState(false);
  const handleTaskFilter = ({ target }) => {
    setTaskFilter(target.value);
  };
  const handleToggle = () => {
    setToggleInput((state) => !state);
  };
  return (
    <div className={css.container}>
      <ul className={css["sprint__table-list"]}>
        <li className={css["sprint__table-item"]}>
          <p className={css["sprint__table-title"]}>Задача</p>
        </li>
        <li className={css["sprint__table-item"]}>
          <p className={css["sprint__table-title"]}>Заплановано годин</p>
        </li>
        <li className={css["sprint__table-item"]}>
          <p className={css["sprint__table-title"]}>Витрачено год / день</p>
        </li>
        <li className={css["sprint__table-item"]}>
          <p className={css["sprint__table-title"]}>Витрачено годин</p>
        </li>
        <li
          className={`${css["sprint__table-item--relative"]} ${css["sprint__table-item"]}`}
        >
          <button
            onClick={handleToggle}
            className={`${css["sprint__filter-task-btn"]}`}
          ></button>

          <CSSTransition
            classNames={animation}
            in={toggleInput}
            timeout={200}
            unmountOnExit
            mountOnEnter
          >
            <input
              className={css["sprint__filter-task"]}
              type="text"
              value={taskFilter}
              name="taskFilter"
              onChange={handleTaskFilter}
            />
          </CSSTransition>
        </li>
      </ul>
    </div>
  );
};

export default SprintTableTitle;
