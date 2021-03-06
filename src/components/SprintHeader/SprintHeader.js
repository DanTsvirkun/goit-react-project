import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import css from "./SprintHeader.module.css";
import {
  showModalAddTaskAction,
  indexDayAction,
} from "../../redux/actions/sprintTasksActions";
import {
  itemsSelector,
  showModalSelector,
  currentIdxDaySelector,
  findCurrentSprint,
} from "../../redux/selectors/TasksSelectors";
import SprintAddTaskForm from "../SprintAddTaskForm/SprintAddTaskForm";
import { changeSprintTitle } from "../../redux/operations/TasksOperatins";
import EditTitle from "../EditTitle/EditTitle";
const SprintHeader = ({
  tasks,
  isShowModal,
  showModalAction,
  currentDayIdx,
  loader,
  indexDayAction,
  params,
  sprint,
  changeSprintTitle,
}) => {
  const [rightArrow, setRightArrow] = useState(false);
  const [leftArrow, setLeftArrow] = useState(false);
  const { sprintId } = params;
  const taskDay = () => {
    if (tasks.length > 0 && currentDayIdx < tasks[0].hoursWastedPerDay.length) {
      return tasks[0].hoursWastedPerDay[currentDayIdx].currentDay;
    }
    return null;
  };

  const showModal = () => {
    showModalAction();
  };
  const plusIdx = () => {
    setLeftArrow(false);
    setRightArrow(true);
    if (tasks[0].hoursWastedPerDay.length === currentDayIdx + 1) {
      return;
    }
    const newIdx = currentDayIdx + 1;

    indexDayAction(newIdx);
  };

  const minusIdx = () => {
    setRightArrow(false);
    setLeftArrow(true);
    if (currentDayIdx === 0) {
      return;
    }
    const newIdx = currentDayIdx - 1;

    indexDayAction(newIdx);
    const setShowButton = () => {};
  };
  return (
    <>
      <div className={css.container}>
        {tasks.length > 0 && sprint && (
          <>
            <div className={css["sprint__date"]}>
              <p className={css["sprint__date-sprint"]}>
                {currentDayIdx !== 0 && (
                  <span
                    onClick={minusIdx}
                    className={
                      leftArrow
                        ? `${css["sprint__date-arrow"]} ${css["sprint__date-arrow--active"]}`
                        : css["sprint__date-arrow"]
                    }
                  ></span>
                )}
                {tasks.length > 0 && currentDayIdx + 1}
                {tasks.length > 0 && (
                  <span className={css["sprint__date-sprint--span"]}>
                    /{tasks[0].hoursWastedPerDay.length}
                  </span>
                )}
                {tasks[0].hoursWastedPerDay.length !== currentDayIdx + 1 && (
                  <span
                    onClick={plusIdx}
                    className={
                      rightArrow
                        ? `${css["sprint__date-arrow"]} ${css["sprint__date-arrow--active"]}`
                        : css["sprint__date-arrow"]
                    }
                  ></span>
                )}
              </p>
              <p className={css["sprint__current-date"]}> {taskDay()} </p>
            </div>
          </>
        )}
        <div className={css["sprint__header-wrapper"]}>
          <div className={css["sprint__title-wrapper"]}>
            {sprint && (
              <EditTitle
                valueTitle={sprint.title}
                editOperation={changeSprintTitle}
                elementID={sprintId}
              />
            )}
          </div>
          <div className={css["sprint__add-task-wrapper"]}>
            <button
              onClick={showModal}
              className={css["sprint__add-task-btn"]}
            ></button>
            <p className={css["sprint__add-task-offer"]}> Створити задачу </p>
          </div>
        </div>
      </div>
      <SprintAddTaskForm
        status={isShowModal}
        sprint={sprint}
        onClose={showModal}
      />
    </>
  );
};
const mapStateToProps = (state, ownProps) => ({
  tasks: itemsSelector(state),
  isShowModal: showModalSelector(state),
  currentDayIdx: currentIdxDaySelector(state),
  // loader: state.loader,
  // error: state.error,
  sprint: findCurrentSprint(state, ownProps.params),
});
const mapDispatchToPorps = {
  showModalAction: showModalAddTaskAction,
  indexDayAction,
  changeSprintTitle,
};

export default connect(mapStateToProps, mapDispatchToPorps)(SprintHeader);
