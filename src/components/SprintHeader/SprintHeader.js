import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import css from './SprintHeader.module.css';
import { showModalAddTaskAction } from '../../redux/actions/sprintTasksActions';
import {
  itemsSelector,
  showModalSelector,
} from '../../redux/selectors/TasksSelectors';
import SprintAddTaskForm from '../SprintAddTaskForm/SprintAddTaskForm';
const SprintHeader = ({
  title = 'Sprint Burndown Chart 1',
  tasks,
  isShowModal,
  showModalAction,
}) => {
  // const [modalToggle, setModalToggle] = useState(false);
  // const [isArrayTasksChanged, setisArrayTasksChanged] = useState(false);
  // useEffect(() => {
  //   setModalToggle(false);
  //   console.log('change array');
  // }, [tasks]);
  const showModal = () => {
    showModalAction(true);
  };
  return (
    <div className={css.container}>
      <div className={css['sprint__date']}>
        <p className={css['sprint__date-sprint']}>
          2
          <span span className={css['sprint__date-sprint--span']}>
            / 12
          </span>
        </p>
        <p className={css['sprint__current-date']}> 08.08 .2020 </p>
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
      {isShowModal && <SprintAddTaskForm />}
    </div>
  );
};
const mapStateToProps = state => ({
  tasks: itemsSelector(state),
  isShowModal: showModalSelector(state),
});
const mapDispatchToPorps = {
  showModalAction: showModalAddTaskAction,
};

export default connect(mapStateToProps, mapDispatchToPorps)(SprintHeader);
