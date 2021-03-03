import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  filterSelector,
  itemsSelector,
} from "../../redux/selectors/TasksSelectors";
import {
  filterTasksAction,
  toggleFilterAction,
} from "../../redux/actions/sprintTasksActions";
import css from "./SprintTableTitle.module.css";
import animation from "./animation.module.css";

const SprintTableTitle = ({
  filter,
  filterTasksAction,
  toggleFilterAction,
  filterToggle,
  tasks,
}) => {
  const history = useHistory();
  const location = useLocation();
  const handleTaskFilter = ({ target }) => {
    if (!target.value) {
      history.push({
        ...location,
        search: "",
      });
    }
    if (target.value) {
      history.push({
        ...location,
        search: `task=${target.value}`,
      });
    }

    filterTasksAction(target.value);
  };

  const handleToggle = () => {
    toggleFilterAction(!filterToggle);
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
          {tasks.length > 4 && (
            <>
              <button
                onClick={handleToggle}
                className={`${css["sprint__filter-task-btn"]}`}
                data-filter="filter"
              ></button>
              <CSSTransition
                classNames={animation}
                in={filterToggle}
                timeout={200}
                unmountOnExit
                mountOnEnter
              >
                <input
                  className={css["sprint__filter-task"]}
                  type="text"
                  value={filter}
                  name="taskFilter"
                  onChange={handleTaskFilter}
                  data-filter="filter"
                />
              </CSSTransition>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  filter: filterSelector(state),
  filterToggle: state.tasks.toggleFilter,
  tasks: itemsSelector(state),
});
const mapDispatchToProps = {
  filterTasksAction,
  toggleFilterAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SprintTableTitle);
