import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import css from './SprintHeader.module.css';
import {
  showModalAddTaskAction,
  indexDayAction,
} from '../../redux/actions/sprintTasksActions';
import {
  itemsSelector,
  showModalSelector,
  currentIdxDaySelector,
} from '../../redux/selectors/TasksSelectors';
import SprintAddTaskForm from '../SprintAddTaskForm/SprintAddTaskForm';
const currentDate = moment().format('DD.MM.YYYY');
const SprintHeader = ({
  title = 'Sprint Burndown Chart 1',
  tasks,
  isShowModal,
  showModalAction,
  currentDayIdx,
  loader,
  indexDayAction,
}) => {
  const [rightArrow, setRightArrow] = useState(false);
  const [leftArrow, setLeftArrow] = useState(false);

  const taskDay = () => {
    if (tasks.length > 0) {
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
    console.log(newIdx);

    indexDayAction(newIdx);
  };

  const minusIdx = () => {
    setRightArrow(false);
    setLeftArrow(true);
    if (currentDayIdx === 0) {
      return;
    }
    const newIdx = currentDayIdx - 1;
    console.log(newIdx);

    indexDayAction(newIdx);
  };
  return (
    <>
      <div className={css.container}>
        <div className={css['sprint__date']}>
          {!loader && tasks.length > 0 && (
            <>
              <p className={css['sprint__date-sprint']}>
                {currentDayIdx !== 0 && (
                  <span
                    onClick={minusIdx}
                    className={
                      leftArrow
                        ? `${css['sprint__date-arrow']} ${css['sprint__date-arrow--active']}`
                        : css['sprint__date-arrow']
                    }
                  ></span>
                )}

                {tasks.length > 0 && currentDayIdx + 1}
                <span className={css['sprint__date-sprint--span']}>
                  {tasks.length > 0 && '/'}
                  {tasks.length > 0 && tasks[0].hoursWastedPerDay.length}
                </span>
                {tasks[0].hoursWastedPerDay.length !== currentDayIdx + 1 && (
                  <span
                    onClick={plusIdx}
                    className={
                      rightArrow
                        ? `${css['sprint__date-arrow']} ${css['sprint__date-arrow--active']}`
                        : css['sprint__date-arrow']
                    }
                  ></span>
                )}
              </p>
              <p className={css['sprint__current-date']}> {taskDay()} </p>
            </>
          )}
        </div>
        <div className={css['sprint__header-wrapper']}>
          <div className={css['sprint__title-wrapper']}>
            <h1 className={css['sprint__title']}> {title} </h1>
            <button className={css['sprint__change-name-btn']}> </button>
          </div>
          <div className={css['sprint__add-task-wrapper']}>
            <button
              onClick={showModal}
              className={css['sprint__add-task-btn']}
            ></button>
            <p className={css['sprint__add-task-offer']}> Створити задачу </p>
          </div>
        </div>
      </div>
      <SprintAddTaskForm status={isShowModal} onClose={showModal} />
    </>
  );
};
const mapStateToProps = state => ({
  tasks: itemsSelector(state),
  isShowModal: showModalSelector(state),
  currentDayIdx: currentIdxDaySelector(state),
  loader: state.loader,
  error: state.error,
});
const mapDispatchToPorps = {
  showModalAction: showModalAddTaskAction,
  indexDayAction,
};

export default connect(mapStateToProps, mapDispatchToPorps)(SprintHeader);
